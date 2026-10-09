import { NextRequest, NextResponse } from "next/server";
import {
  getAssistantConfig,
  isAssistantConfigured,
} from "../../lib/assistant/config";
import { buildSystemInstruction } from "../../lib/assistant/prompt";
import {
  ConcurrencyGate,
  SlidingWindowLimiter,
} from "../../lib/assistant/rateLimit";
import { streamCompletion } from "../../lib/assistant/provider/gemini";
import { validateAskBody } from "../../lib/assistant/validate";
import { ERROR_MESSAGES } from "../../lib/assistant/types";
import type { AssistantErrorCode, StreamFrame } from "../../lib/assistant/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const config = getAssistantConfig();

// Best-effort abuse control. In-memory = per-instance; see rateLimit.ts.
const minuteLimiter = new SlidingWindowLimiter(60_000, config.rateLimitPerMinute);
const hourLimiter = new SlidingWindowLimiter(3_600_000, config.rateLimitPerHour);
const concurrencyGate = new ConcurrencyGate(config.maxConcurrent);

const JSON_HEADERS = {
  "Cache-Control": "no-store, no-transform",
  "X-Content-Type-Options": "nosniff",
};

const NDJSON_HEADERS = {
  "Content-Type": "application/x-ndjson; charset=utf-8",
  "Cache-Control": "no-store, no-transform",
  "X-Content-Type-Options": "nosniff",
};

function jsonError(
  status: number,
  code: AssistantErrorCode,
  message: string,
  extraHeaders?: Record<string, string>,
): NextResponse {
  return NextResponse.json(
    { error: { code, message } },
    { status, headers: { ...JSON_HEADERS, ...extraHeaders } },
  );
}

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: NextRequest): Promise<Response> {
  try {
    if (!isAssistantConfigured()) {
      return jsonError(
        503,
        "not_configured",
        "The assistant is not configured on this deployment yet.",
      );
    }

    // Reject before reading the body if the size header already says too big.
    const contentLength = Number(request.headers.get("content-length") ?? "0");
    if (contentLength > config.maxBodyBytes) {
      return jsonError(413, "payload_too_large", "Request body is too large.");
    }

    const rawBody = await request.text().catch(() => "");
    if (rawBody.length > config.maxBodyBytes) {
      return jsonError(413, "payload_too_large", "Request body is too large.");
    }

    const validation = validateAskBody(rawBody, {
      maxMessages: config.maxMessages,
      maxMessageLength: config.maxMessageLength,
    });
    if (!validation.ok) {
      return jsonError(validation.status, validation.code, validation.message);
    }

    const ip = clientIp(request);

    // Per-visitor limits (both windows must pass).
    const minute = minuteLimiter.consume(ip);
    if (!minute.allowed) {
      return jsonError(
        429,
        "rate_limited",
        "Too many questions. Wait a moment and retry.",
        { "Retry-After": String(minute.retryAfterSec) },
      );
    }
    const hour = hourLimiter.consume(ip);
    if (!hour.allowed) {
      return jsonError(
        429,
        "rate_limited",
        "Question limit reached for this visitor. Try again later.",
        { "Retry-After": "3600" },
      );
    }

    if (!concurrencyGate.tryAcquire()) {
      return jsonError(
        429,
        "busy",
        "The assistant is at capacity right now. Retry in a few seconds.",
      );
    }

    // Combined abort: server timeout OR client disconnect.
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), config.requestTimeoutMs);
    const signal = AbortSignal.any([controller.signal, request.signal]);

    const systemInstruction = buildSystemInstruction();
    const encoder = new TextEncoder();

    const stream = new ReadableStream<Uint8Array>({
      async start(streamController) {
        const write = (frame: StreamFrame) =>
          streamController.enqueue(encoder.encode(`${JSON.stringify(frame)}\n`));

        let released = false;
        const release = () => {
          if (released) return;
          released = true;
          clearTimeout(timeout);
          concurrencyGate.release();
        };

        try {
          const startedAt = Date.now();
          for await (const delta of streamCompletion({
            systemInstruction,
            messages: validation.messages,
            signal,
          })) {
            if (signal.aborted) throw new DOMException("Aborted", "AbortError");
            write({ delta });
          }
          write({ done: true, elapsedMs: Date.now() - startedAt });
        } catch (error) {
          // The generator only ever throws ProviderError; fall through anyway.
          const code: AssistantErrorCode =
            error instanceof Error &&
            "code" in error &&
            typeof (error as { code?: unknown }).code === "string"
              ? (error as { code: AssistantErrorCode }).code
              : "internal";

          console.warn(
            `[ask] stream failed: code=${code} startedFor=${Date.now() % 100000}`,
          );
          // If the visitor closed the tab mid-stream, stop quietly.
          if (!signal.aborted) {
            write({ error: { code, message: ERROR_MESSAGES[code] } });
          }
        } finally {
          release();
          streamController.close();
        }
      },
    });

    return new Response(stream, { status: 200, headers: NDJSON_HEADERS });
  } catch (error) {
    // Never leak stack traces or provider internals to the client.
    console.error("[ask] unhandled error:", error);
    return jsonError(500, "internal", "An unexpected server error occurred.");
  }
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    { error: { code: "bad_request", message: "Method not allowed." } },
    { status: 405, headers: { ...JSON_HEADERS, Allow: "POST" } },
  );
}
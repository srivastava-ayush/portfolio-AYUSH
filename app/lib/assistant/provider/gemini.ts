/**
 * Gemini provider for the "Ask My Portfolio" assistant.
 *
 * All provider-specific logic lives here so the backend can be swapped to a
 * different model provider without touching the route, the chat UI, or the
 * knowledge base. Everything is read from server-side environment variables.
 *
 * Environment:
 *   GEMINI_API_KEY   (required)   Google AI Studio / Gemini API key.
 *   GEMINI_MODEL     (optional)   Defaults to a free-tier model with generous
 *                                 daily quota (verified available on the free
 *                                 tier at the time of writing).
 *   GEMINI_BASE_URL  (optional)   Override the API endpoint. Used for testing
 *                                 against a local mock or a proxy; leave unset
 *                                 in normal deployments.
 */

import { GoogleGenAI, ApiError } from "@google/genai";
import type { ChatMessage, AssistantErrorCode } from "../types";

export class ProviderError extends Error {
  readonly code: AssistantErrorCode;
  /** True when retrying the same request is likely to succeed later. */
  readonly retryable: boolean;
  /** Optional human-safe detail logged server-side only. */
  readonly detail?: string;

  constructor(code: AssistantErrorCode, message: string, retryable = false, detail?: string) {
    super(message);
    this.name = "ProviderError";
    this.code = code;
    this.retryable = retryable;
    this.detail = detail;
  }
}

interface StreamCompletionInput {
  systemInstruction: string;
  messages: ChatMessage[];
  signal: AbortSignal;
}

function createClient(config: {
  apiKey: string;
  baseUrl?: string;
  timeoutMs: number;
}): GoogleGenAI {
  return new GoogleGenAI({
    apiKey: config.apiKey,
    httpOptions: {
      ...(config.baseUrl ? { baseUrl: config.baseUrl } : {}),
      timeout: config.timeoutMs,
    },
  });
}

/** Maps SDK errors to a safe, client-friendly code without leaking internals. */
function mapError(error: unknown): ProviderError {
  if (error instanceof ProviderError) return error;

  if (error instanceof ApiError) {
    const status = typeof error.status === "number" ? error.status : 0;
    const detail = `HTTP ${status}`;
    switch (status) {
      case 429:
      case 403: // some quota modes surface as 403 with a quota reason
        return new ProviderError(
          "rate_limited",
          "The AI provider rate limit was reached.",
          true,
          detail,
        );
      case 400:
        return new ProviderError(
          "provider_error",
          "The AI provider rejected the request.",
          false,
          `${detail} — ${error.message}`,
        );
      case 401:
        return new ProviderError(
          "not_configured",
          "The configured API key was rejected.",
          false,
          `${detail} — invalid API key`,
        );
      case 502:
      case 503:
      case 504:
        return new ProviderError(
          "provider_error",
          "The AI provider is temporarily unavailable.",
          true,
          detail,
        );
      default:
        return new ProviderError(
          "provider_error",
          "The AI provider returned an unexpected response.",
          false,
          `${detail} — ${error.message}`,
        );
    }
  }

  if (error instanceof Error && error.name === "AbortError") {
    return new ProviderError(
      "timeout",
      "The request timed out.",
      true,
      "aborted by the request timeout",
    );
  }

  return new ProviderError(
    "provider_error",
    "The assistant could not reach the AI provider.",
    true,
    error instanceof Error ? error.message : "unknown provider error",
  );
}

/**
 * Streams an assistant reply from the configured Gemini model.
 *
 * The caller passes the full, bounded conversation history plus the latest
 * user message; nothing from the client is trusted beyond plain text content.
 */
export async function* streamCompletion({
  systemInstruction,
  messages,
  signal,
}: StreamCompletionInput): AsyncGenerator<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey?.trim()) {
    throw new ProviderError(
      "not_configured",
      "No GEMINI_API_KEY configured on the server.",
      false,
    );
  }

  const model = process.env.GEMINI_MODEL?.trim() || "gemini-3.5-flash-lite";
  const baseUrl = process.env.GEMINI_BASE_URL?.trim() || undefined;
  const timeoutMs = Number.parseInt(process.env.ASK_TIMEOUT_MS ?? "", 10) || 30_000;

  const ai = createClient({ apiKey: apiKey.trim(), baseUrl, timeoutMs });

  const contents = messages.reduce<
    Array<{ role: string; parts: Array<{ text: string }> }>
  >((acc, msg) => {
    // Merge consecutive messages of the same role; Gemini alternates roles.
    const prev = acc[acc.length - 1];
    const role = msg.role === "assistant" ? "model" : "user";
    if (prev && prev.role === role) {
      prev.parts.push({ text: msg.content });
    } else {
      acc.push({ role, parts: [{ text: msg.content }] });
    }
    return acc;
  }, []);

  try {
    const stream = await ai.models.generateContentStream({
      model,
      contents,
      config: {
        systemInstruction,
        temperature: 0.6,
        maxOutputTokens: 700,
        abortSignal: signal,
      },
    });

    let yieldedAny = false;
    for await (const chunk of stream) {
      if (signal.aborted) {
        throw new ProviderError("timeout", "The request was aborted.", true);
      }
      const text = chunk.text;
      if (text) {
        yieldedAny = true;
        yield text;
      }
      if (signal.aborted) {
        throw new ProviderError("timeout", "The request was aborted.", true);
      }
    }

    if (!yieldedAny) {
      throw new ProviderError(
        "provider_error",
        "The AI provider returned an empty response.",
        true,
      );
    }
  } catch (error) {
    throw mapError(error);
  }
}
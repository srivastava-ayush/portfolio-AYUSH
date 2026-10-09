import type { ChatMessage, AssistantErrorCode } from "./types";

export type ValidateResult =
  | { ok: true; messages: ChatMessage[] }
  | { ok: false; status: number; code: AssistantErrorCode; message: string };

export interface ValidateLimits {
  maxMessages: number;
  maxMessageLength: number;
}

const ROLES = new Set(["user", "assistant"]);

function fail(status: number, code: AssistantErrorCode, message: string): ValidateResult {
  return { ok: false, status, code, message };
}

/**
 * Parses and validates the raw request body. The client-supplied history is
 * only plain, length-bounded text — it is never treated as authoritative
 * portfolio information (the knowledge base is injected server-side instead).
 */
export function validateAskBody(rawBody: string, limits: ValidateLimits): ValidateResult {
  if (rawBody.length > limits.maxMessages * limits.maxMessageLength * 2 + 16_384) {
    return fail(413, "payload_too_large", "Request body is too large.");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawBody);
  } catch {
    return fail(400, "bad_request", "Request body must be valid JSON.");
  }

  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return fail(400, "bad_request", "Request body must be a JSON object.");
  }

  const { messages }: { messages?: unknown } = parsed as { messages?: unknown };

  if (!Array.isArray(messages) || messages.length === 0) {
    return fail(400, "bad_request", "A non-empty 'messages' array is required.");
  }

  if (messages.length > limits.maxMessages) {
    return fail(
      400,
      "bad_request",
      `Conversation history is too long (max ${limits.maxMessages} messages).`,
    );
  }

  const cleaned: ChatMessage[] = [];
  for (const entry of messages) {
    if (typeof entry !== "object" || entry === null || Array.isArray(entry)) {
      return fail(400, "bad_request", "Each message must be an object.");
    }
    const role = (entry as { role?: unknown }).role;
    const content = (entry as { content?: unknown }).content;
    if (typeof role !== "string" || !ROLES.has(role)) {
      return fail(400, "bad_request", "Each message needs a valid role ('user' or 'assistant').");
    }
    if (typeof content !== "string") {
      return fail(400, "bad_request", "Each message needs a string 'content'.");
    }
    const trimmed = content.trim();
    if (trimmed.length === 0) {
      return fail(400, "bad_request", "Message content cannot be empty.");
    }
    if (trimmed.length > limits.maxMessageLength) {
      return fail(
        413,
        "payload_too_large",
        `Messages are limited to ${limits.maxMessageLength} characters.`,
      );
    }
    cleaned.push({ role: role as ChatMessage["role"], content: trimmed });
  }

  // The latest turn must be the visitor's question.
  if (cleaned[cleaned.length - 1].role !== "user") {
    return fail(400, "bad_request", "The last message must come from the user.");
  }

  // Drop a leading assistant turn and collapse runs of the same role so the
  // provider receives well-formed alternating history starting with 'user'.
  const alternated: ChatMessage[] = [];
  for (const msg of cleaned) {
    const prev = alternated[alternated.length - 1];
    if (prev && prev.role === msg.role) continue;
    if (alternated.length === 0 && msg.role === "assistant") continue;
    alternated.push(msg);
  }

  if (alternated.length === 0) {
    return fail(400, "bad_request", "No usable message content was provided.");
  }

  return { ok: true, messages: alternated };
}
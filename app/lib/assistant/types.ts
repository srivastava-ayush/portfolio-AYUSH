/** Shared types for the "Ask My Portfolio" assistant (client + server). */

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export type AssistantErrorCode =
  | "bad_request"
  | "payload_too_large"
  | "rate_limited"
  | "busy"
  | "not_configured"
  | "provider_error"
  | "timeout"
  | "internal";

/** One newline-delimited JSON frame returned by POST /api/ask. */
export type StreamFrame =
  | { delta: string }
  | { done: true; elapsedMs?: number }
  | { error: { code: AssistantErrorCode; message: string } };

/** Human-facing copy for each error code. */
export const ERROR_MESSAGES: Record<AssistantErrorCode, string> = {
  bad_request: "That request wasn't valid. Try again with a shorter message.",
  payload_too_large:
    "That message is too long. Please keep questions under a couple of sentences.",
  rate_limited:
    "You're asking questions a little too quickly. Wait a moment and try again.",
  busy:
    "The assistant is handling a burst of questions right now. Try again in a few seconds.",
  not_configured:
    "The assistant isn't set up on this deployment yet. Add a GEMINI_API_KEY server environment variable to enable it.",
  provider_error:
    "The AI provider returned an unexpected response. Please try again shortly.",
  timeout: "That took too long to answer. Please try a shorter question.",
  internal: "Something went wrong on our end. Please try again.",
};

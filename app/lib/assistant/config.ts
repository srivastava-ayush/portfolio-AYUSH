/**
 * Server-side configuration for the "Ask My Portfolio" assistant.
 *
 * Every value is read from a non-public environment variable at request time.
 * Nothing here is ever exposed to the browser bundle.
 */

const DEFAULT_MODEL = "gemini-3.5-flash-lite";

function intFromEnv(name: string, fallback: number, min: number, max: number): number {
  const raw = process.env[name];
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

export interface AssistantConfig {
  model: string;
  baseUrl?: string;
  maxOutputTokens: number;
  temperature: number;
  requestTimeoutMs: number;
  maxMessages: number;
  maxMessageLength: number;
  maxBodyBytes: number;
  rateLimitPerMinute: number;
  rateLimitPerHour: number;
  maxConcurrent: number;
}

export function getAssistantConfig(): AssistantConfig {
  const baseUrl = process.env.GEMINI_BASE_URL?.trim();
  return {
    model: process.env.GEMINI_MODEL?.trim() || DEFAULT_MODEL,
    baseUrl: baseUrl && baseUrl.length > 0 ? baseUrl : undefined,
    maxOutputTokens: intFromEnv("ASK_MAX_OUTPUT_TOKENS", 700, 64, 4096),
    temperature: 0.6,
    requestTimeoutMs: intFromEnv("ASK_TIMEOUT_MS", 30_000, 5_000, 120_000),
    maxMessages: intFromEnv("ASK_MAX_MESSAGES", 16, 2, 60),
    maxMessageLength: intFromEnv("ASK_MAX_MESSAGE_LENGTH", 2_000, 200, 8_000),
    maxBodyBytes: 64 * 1024,
    rateLimitPerMinute: intFromEnv("ASK_RATE_LIMIT_PER_MINUTE", 6, 1, 600),
    rateLimitPerHour: intFromEnv("ASK_RATE_LIMIT_PER_HOUR", 40, 1, 10_000),
    maxConcurrent: intFromEnv("ASK_MAX_CONCURRENT", 4, 1, 64),
  };
}

/** True when the deployment has everything it needs to answer questions. */
export function isAssistantConfigured(): boolean {
  return Boolean(process.env.GEMINI_API_KEY?.trim());
}

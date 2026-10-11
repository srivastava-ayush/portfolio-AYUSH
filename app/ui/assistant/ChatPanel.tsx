"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowsClockwise,
  ArrowUp,
  Robot,
  Sparkle,
} from "@phosphor-icons/react";
import { cn } from "../utils/cn";
import { ERROR_MESSAGES } from "../../lib/assistant/types";
import type { AssistantErrorCode } from "../../lib/assistant/types";

/* ------------------------------------------------------------------ */
/* Copy / config                                                      */
/* ------------------------------------------------------------------ */

const WELCOME_TEXT =
  "I'm here to assist you, Ooooorange!";

const SUGGESTED_QUESTIONS = [
  "What are your most interesting projects?",
  "Tell me about your AI projects.",
  "Explain the architecture of Kodak.",
  "What backend technologies do you use?",
  "Which project shows the strongest engineering?",
  "How can I get in touch with Ayush?",
];

let messageSeq = 0;
function nextId(prefix: string): string {
  messageSeq += 1;
  return `${prefix}-${Date.now().toString(36)}-${messageSeq}`;
}

interface UiMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  /** True while the model reply is streaming into this message. */
  pending?: boolean;
  error?: { code: AssistantErrorCode; message: string };
  isWelcome?: boolean;
}

/* ------------------------------------------------------------------ */
/* Brand bits                                                         */
/* ------------------------------------------------------------------ */

function AssistantAvatar({ size = "sm" }: { size?: "sm" | "md" }) {
  return (
    <span
      className={cn(
        "shrink-0 flex items-center justify-center overflow-hidden rounded-full ring-2 ring-[var(--bg-color)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]",
        size === "sm" ? "size-7" : "size-8",
      )}
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icons/orange.svg" alt="" width={28} height={28} className="block h-full w-full object-contain" />
    </span>
  );
}

function ThinkingDots() {
  return (
    <span className="inline-flex items-center gap-1.5 py-1" aria-label="Orange is thinking">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="size-1.5 rounded-full bg-[var(--accent-color)] animate-[orangeTyping_1.2s_ease-in-out_infinite]"
          style={{ animationDelay: `${i * 0.18}s` }}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

function StreamingCursor() {
  return (
    <span
      className="ml-0.5 inline-block h-[14px] w-[3px] translate-y-[2px] rounded-full bg-[var(--accent-color)] animate-[orangeCursor_1s_steps(1)_infinite]"
      aria-hidden="true"
    />
  );
}

/* ------------------------------------------------------------------ */
/* Linkified text rendering                                           */
/* ------------------------------------------------------------------ */

type Segment = { text: string; url?: string };

function splitLinks(raw: string): Segment[] {
  const segments: Segment[] = [];
  const urlRe = /https?:\/\/[^\s<>"']+/gi;
  let pos = 0;
  for (const match of raw.matchAll(urlRe)) {
    const index = match.index ?? 0;
    if (index > pos) segments.push({ text: raw.slice(pos, index) });
    let url = match[0];
    const trailing = url.match(/[.,;:!?'")\]]+$/);
    if (trailing) url = url.slice(0, url.length - trailing[0].length);
    segments.push({ text: match[0], url });
    pos = index + match[0].length;
  }
  if (pos < raw.length) segments.push({ text: raw.slice(pos) });

  const routeRe = /\/(?:projects|slices|side-quests|build-logs|terminal)(?:\/[\w.-]+)*/gi;
  const out: Segment[] = [];
  for (const segment of segments) {
    if (segment.url) {
      out.push(segment);
      continue;
    }
    let p = 0;
    for (const match of segment.text.matchAll(routeRe)) {
      const index = match.index ?? 0;
      const before = index > 0 ? segment.text[index - 1] : " ";
      out.push({ text: segment.text.slice(p, index) });
      const insideWord = before === "/" || before === ":" || /\w/.test(before);
      out.push(insideWord ? { text: match[0] } : { text: match[0], url: match[0] });
      p = index + match[0].length;
    }
    if (p < segment.text.length) out.push({ text: segment.text.slice(p) });
  }
  return out;
}

function RichText({ text }: { text: string }) {
  const segments = useMemo(() => splitLinks(text), [text]);
  return (
    <>
      {segments.map((segment, i) =>
        segment.url ? (
          <a
            key={i}
            href={segment.url}
            target={segment.url.startsWith("http") ? "_blank" : undefined}
            rel={segment.url.startsWith("http") ? "noopener noreferrer" : undefined}
            className="text-[var(--accent-color)] underline decoration-[var(--accent-color)]/40 underline-offset-2 hover:decoration-[var(--accent-color)] break-all"
          >
            {segment.text.trim()}
          </a>
        ) : (
          <span key={i}>{segment.text}</span>
        ),
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Streaming client                                                   */
/* ------------------------------------------------------------------ */

async function readStream(
  response: Response,
  onDelta: (text: string) => void,
  signal: AbortSignal,
): Promise<void> {
  if (!response.body) throw new Error("provider_error");
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    let newline: number;
    while ((newline = buffer.indexOf("\n")) !== -1) {
      const line = buffer.slice(0, newline).trim();
      buffer = buffer.slice(newline + 1);
      if (!line) continue;
      let frame: {
        delta?: string;
        done?: boolean;
        error?: { code: AssistantErrorCode; message: string };
      };
      try {
        frame = JSON.parse(line);
      } catch {
        continue;
      }
      if (frame.delta) onDelta(frame.delta);
      else if (frame.error) throw new Error(frame.error.code);
      else if (frame.done) return;
      if (signal.aborted) return;
    }
  }
}

/* ------------------------------------------------------------------ */
/* Panel (embedded — lives inside the terminal frame)                 */
/* ------------------------------------------------------------------ */

export default function ChatPanel({
  active,
}: {
  /** True while this panel is the visible mode; drives focus. */
  active: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const [messages, setMessages] = useState<UiMessage[]>(() => [
    { id: "welcome", role: "assistant", content: WELCOME_TEXT, isWelcome: true },
  ]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "streaming">("idle");

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  const reduceMotionRef = useRef(reduceMotion);
  reduceMotionRef.current = reduceMotion ?? false;

  useEffect(() => {
    if (active) inputRef.current?.focus();
  }, [active]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: reduceMotionRef.current ? "auto" : "smooth",
      block: "end",
    });
  }, [messages, status]);

  /** API payload: full turns (no welcome bubble, no pending/errored replies). */
  const buildPayload = useCallback(
    (): Array<{ role: "user" | "assistant"; content: string }> =>
      messagesRef.current
        .filter((m) => !m.isWelcome && !m.pending && !m.error)
        .map((m) => ({ role: m.role, content: m.content })),
    [],
  );

  /** Runs one completion round-trip against /api/ask, streaming into a message. */
  const runCompletion = useCallback(
    async ({ botId, history, signal }: { botId: string; history: Array<{ role: "user" | "assistant"; content: string }>; signal: AbortSignal }) => {
      const append = (delta: string) => {
        setMessages((prev) =>
          prev.map((m) => (m.id === botId ? { ...m, content: m.content + delta } : m)),
        );
      };

      try {
        const res = await fetch("/api/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
          signal,
        });

        if (!res.ok) {
          let code: AssistantErrorCode = "provider_error";
          try {
            const payload = (await res.json()) as { error?: { code?: AssistantErrorCode } };
            if (payload?.error?.code) code = payload.error.code;
          } catch {
            /* fall through to default */
          }
          throw new Error(code);
        }

        await readStream(res, append, signal);
        if (!signal.aborted) {
          setMessages((prev) =>
            prev.map((m) => (m.id === botId ? { ...m, pending: false } : m)),
          );
        }
      } catch (error) {
        const raw = (error as Error)?.message;
        const code: AssistantErrorCode =
          typeof raw === "string" && raw in ERROR_MESSAGES ? (raw as AssistantErrorCode) : "provider_error";
        if (!signal.aborted) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === botId ? { ...m, pending: false, error: { code, message: ERROR_MESSAGES[code] } } : m,
            ),
          );
        }
        console.warn(`[ask] client streaming failed (code=${code})`);
      }
    },
    [],
  );

  const send = useCallback(
    (text?: string) => {
      const question = (text ?? input).trim();
      if (!question || status !== "idle") return;

      const history = buildPayload();
      const botId = nextId("bot");
      setMessages((prev) => [
        ...prev,
        { id: nextId("user"), role: "user", content: question },
        { id: botId, role: "assistant", content: "", pending: true },
      ]);
      setInput("");

      const controller = new AbortController();
      abortRef.current = controller;
      setStatus("streaming");

      void runCompletion({
        botId,
        history: [...history, { role: "user", content: question }],
        signal: controller.signal,
      }).finally(() => {
        abortRef.current = null;
        setStatus("idle");
        setTimeout(() => inputRef.current?.focus(), 0);
      });
    },
    [buildPayload, input, runCompletion, status],
  );

  /** Retry a failed question: re-ask the same question. */
  const retry = useCallback(
    (question: string) => {
      if (!question || status !== "idle") return;
      const history = buildPayload();
      const botId = nextId("bot");
      setMessages((prev) => [...prev, { id: botId, role: "assistant", content: "", pending: true }]);

      const controller = new AbortController();
      abortRef.current = controller;
      setStatus("streaming");

      void runCompletion({
        botId,
        history: [...history, { role: "user", content: question }],
        signal: controller.signal,
      }).finally(() => {
        abortRef.current = null;
        setStatus("idle");
        setTimeout(() => inputRef.current?.focus(), 0);
      });
    },
    [buildPayload, runCompletion, status],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        send();
      }
    },
    [send],
  );

  const autoResize = useCallback((element: HTMLTextAreaElement) => {
    element.style.height = "auto";
    element.style.height = `${Math.min(element.scrollHeight, 128)}px`;
  }, []);

  const showSuggestions = messages.length === 1 && status === "idle";
  const canSend = input.trim().length > 0 && status === "idle";

  return (
    <div className="flex h-full min-h-0 flex-col bg-[var(--bg-color)]">
      {/* Messages */}
      <div
        role="log"
        aria-live="polite"
        aria-relevant="additions"
        className="flex-1 overflow-y-auto px-3.5 pt-4 pb-5 flex flex-col gap-3.5"
      >
        {messages.map((message) => {
          const isUser = message.role === "user";
          const isEmptyPending = message.pending && message.content.length === 0;
          return (
            <motion.div
              key={message.id}
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.28, ease: "easeOut" }}
              className={cn("flex items-end gap-2.5", isUser ? "justify-end" : "justify-start")}
            >
              {!isUser && <AssistantAvatar size={message.isWelcome ? "md" : "sm"} />}

              <div
                className={cn(
                  "max-w-[82%] px-3.5 py-2.5 text-[13px] leading-relaxed font-mono whitespace-pre-wrap break-words",
                  message.isWelcome
                    ? "max-w-[85%] border border-[var(--border-color)] bg-[var(--glass-bg-color)] rounded-2xl rounded-bl-lg"
                    : isUser
                      ? "border border-[var(--accent-color)]/30 bg-gradient-to-br from-[#FFA53D] via-[#FE8808] to-[#F97316] text-white rounded-2xl rounded-br-lg shadow-[0_4px_18px_-8px_rgba(254,136,8,0.7)]"
                      : "border border-[var(--border-color)] bg-[var(--glass-bg-color)] rounded-2xl rounded-bl-lg",
                )}
                aria-busy={message.pending}
              >
                {message.isWelcome && (
                  <div className="mb-1.5 flex flex-wrap items-center gap-2">
                    <span className="flex items-center gap-1 text-xs font-bold tracking-wide text-[var(--text-color)]">
                      <span className="size-1.5 rounded-full bg-gradient-to-br from-[#FFB347] via-[#FE8808] to-[#F97316]" aria-hidden="true" />
                      Ask Orange
                    </span>
                  </div>
                )}

                <RichText text={message.content} />
                {isEmptyPending ? <ThinkingDots /> : message.pending && <StreamingCursor />}

                {message.error && (
                  <div className="mt-2 border-t border-dashed border-[var(--border-color)] pt-2" role="alert">
                    <p className="flex items-start gap-1.5 text-xs text-[var(--secondary-text)]">
                      <Robot size={14} weight="duotone" className="mt-0.5 shrink-0" />
                      <span>{message.error.message}</span>
                    </p>
                    <button
                      type="button"
                      onClick={() => retry(contentBefore(messages, message.id))}
                      className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-[var(--secondary-text)]/40 bg-[var(--glass-bg-color)] px-3 py-1.5 text-[11px] font-mono text-[var(--text-color)] transition-colors hover:border-[var(--secondary-text)]/70 hover:bg-[var(--hover-color)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--secondary-text)]/70"
                    >
                      <ArrowsClockwise size={12} weight="bold" />
                      Retry
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}

        {showSuggestions && (
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.28, ease: "easeOut" }}
            className="mt-1 flex flex-col gap-2 pl-10"
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--secondary-text)]/70">
              Try asking Orange
            </p>
            {SUGGESTED_QUESTIONS.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => send(question)}
                className="group flex items-center gap-2.5 w-full px-3.5 py-2.5 text-left text-xs font-mono text-[var(--secondary-text)] border border-[var(--border-color)] bg-[var(--glass-bg-color)] rounded-xl transition-all duration-200 hover:text-[var(--text-color)] hover:border-[var(--secondary-text)]/60 hover:shadow-[0_6px_20px_-10px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--secondary-text)]/70"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-[var(--secondary-text)]/10 text-[var(--secondary-text)]">
                  <Sparkle size={11} weight="fill" />
                </span>
                <span className="truncate">{question}</span>
                <ArrowUp
                  size={12}
                  weight="bold"
                  className="ml-auto rotate-45 shrink-0 text-[var(--secondary-text)]/50 transition-colors group-hover:text-[var(--text-color)]"
                />
              </button>
            ))}
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Composer */}
      <footer className="shrink-0 border-t border-[var(--border-color)] bg-[var(--glass-bg-color)] p-3">
        <div className="flex items-end gap-2 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-color)] p-1.5 pl-3 transition-all duration-200 focus-within:border-[var(--secondary-text)]/50 focus-within:ring-2 focus-within:ring-[var(--secondary-text)]/15 focus-within:shadow-[0_4px_24px_-12px_rgba(0,0,0,0.25)]">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              autoResize(e.target);
            }}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Ask Orange something…"
            aria-label="Ask Orange a question about the portfolio"
            className="flex-1 resize-none max-h-[128px] bg-transparent px-1 py-1.5 text-[13px] font-mono text-[var(--text-color)] placeholder:text-[var(--secondary-text)]/50 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => send()}
            disabled={!canSend}
            aria-label="Send message"
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-xl text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--secondary-text)]/70",
              canSend
                ? "bg-gradient-to-br from-[#FFA53D] via-[#FE8808] to-[#F97316] shadow-[0_2px_14px_-2px_rgba(254,136,8,0.6)] cursor-pointer hover:brightness-110 active:scale-95"
                : "bg-[var(--icon-btn-bg)] text-[var(--icon-btn-fg)] opacity-40 cursor-not-allowed",
            )}
          >
            {status === "streaming" ? (
              <ArrowsClockwise size={15} weight="bold" className="animate-spin" />
            ) : (
              <ArrowUp size={15} weight="bold" />
            )}
          </button>
        </div>
     
      </footer>
    </div>
  );
}

/** Find the user question that precedes an errored assistant message. */
function contentBefore(messages: UiMessage[], targetId: string): string {
  const index = messages.findIndex((m) => m.id === targetId);
  if (index <= 0) return "";
  return messages[index - 1]?.content ?? "";
}

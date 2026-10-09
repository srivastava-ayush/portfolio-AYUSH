import { Sparkle } from "@phosphor-icons/react";

/**
 * "Ask Orange" hero CTA — opens the terminal as a window overlaying the page.
 * Deliberately quiet/muted so it sits alongside the other hero actions.
 */
export default function AskMyPortfolio({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open Ask Orange in the AI terminal"
      className="group relative flex items-center justify-center gap-1.5 min-h-9 min-w-9 overflow-hidden px-2 sm:px-4 text-xs font-mono font-medium text-[var(--secondary-text)] border border-[var(--border-color)] bg-[var(--glass-bg-color)] rounded-lg transition-all duration-200 cursor-pointer hover:text-[var(--accent-color)] hover:border-[var(--accent-color)]/60 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-color)]"
    >
      <Sparkle
        size={13}
        weight="fill"
        className="shrink-0 text-[var(--accent-color)]/80 transition-colors group-hover:text-[var(--accent-color)]"
      />
      <span className="hidden sm:inline whitespace-nowrap">Ask Orange</span>
    </button>
  );
}

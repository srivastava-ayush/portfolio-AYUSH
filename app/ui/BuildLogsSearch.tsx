"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

type Props = {
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
};

export default function BuildLogsSearch({ value, onValueChange, className = "" }: Props) {
  const router = useRouter();
  const [internal, setInternal] = useState("");
  const controlled = onValueChange !== undefined;
  const query = controlled ? value ?? "" : internal;

  const setQuery = (next: string) => {
    if (controlled) onValueChange?.(next);
    else setInternal(next);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (controlled) return;
    const trimmed = internal.trim();
    router.push(trimmed ? `/build-logs?q=${encodeURIComponent(trimmed)}` : "/build-logs");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center gap-2 border-l border-[var(--border-color)]/60 pl-2.5 pr-2 py-1 transition-colors focus-within:border-[var(--accent-color)]/60 ${className}`}
    >
      <Search size={13} className="shrink-0 text-[var(--secondary-text)]/60" />
      <input
        type="search"
        name="q"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="search logs..."
        aria-label="Search build logs"
        className="w-32 bg-transparent font-mono text-[11px] text-[var(--text-color)] placeholder:text-[var(--secondary-text)]/40 focus:outline-none sm:w-44"
      />
    </form>
  );
}

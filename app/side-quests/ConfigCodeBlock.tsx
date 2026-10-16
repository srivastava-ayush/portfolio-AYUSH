"use client";

import { useEffect, useState } from "react";

export default function ConfigCodeBlock({ file }: { file: { label: string; href: string } }) {
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(file.href, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Config unavailable");
        return response.text();
      })
      .then(setContent)
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      });
    return () => controller.abort();
  }, [file.href]);

  return (
    <section className="min-w-0 border border-[var(--sq-line)] bg-[var(--sq-inset)]" aria-label={file.label}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--sq-line)] px-3 py-2 text-[10px]">
        <span className="text-[var(--tui-green)]">$ cat {file.label}</span>
        <a href={file.href} download className="text-[var(--tui-accent-muted)] hover:text-[var(--sq-fg)]">[↓ download]</a>
      </div>
      <pre className="max-h-80 overflow-auto p-3 text-[11px] leading-[1.65] text-[var(--sq-text-mid)]"><code>{error ? "Could not load config." : content ?? "Loading config..."}</code></pre>
    </section>
  );
}

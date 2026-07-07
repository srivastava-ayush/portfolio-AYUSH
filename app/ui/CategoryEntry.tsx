"use client";

export default function CategoryEntry({ title, para }: { title: string; para: string }) {
  return (
    <div className="border border-[var(--border-color)]/60 bg-[var(--glass-bg-color)] px-4 py-3 flex flex-col gap-1">
      <span className="text-xs font-mono text-[var(--text-color)] font-semibold">{title}</span>
      <p className="text-xs font-mono text-[var(--secondary-text)] leading-relaxed">{para}</p>
    </div>
  );
}

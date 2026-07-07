"use client";

export default function SideQuestCategory({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-center w-full border-t border-b border-[var(--border-color)] mb-3">
        <span className="px-2 border-r border-[var(--border-color)] h-6 flex items-center font-mono text-[10px] text-[var(--secondary-text)]">$</span>
        <span className="px-2 h-6 flex items-center font-mono text-[10px] text-[var(--secondary-text)]">{title.toLowerCase()} --list</span>
      </div>
      <div className="flex flex-col gap-2">
        {children}
      </div>
    </section>
  );
}

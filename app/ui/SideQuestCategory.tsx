"use client";

export default function SideQuestCategory({ title, banner, children }: { title: string; banner?: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-center w-full border-t border-b border-[var(--border-color)] mb-3">
        <span className="px-2 border-r border-[var(--border-color)] h-6 flex items-center font-mono text-[10px] text-[var(--secondary-text)]">$</span>
        <span className="px-2 h-6 flex items-center font-mono text-[10px] text-[var(--secondary-text)]">{title.toLowerCase()} --list</span>
      </div>
      {banner && (
        <div className="mb-3 border border-[var(--border-color)]/60 overflow-hidden">
          <img src={banner} alt="" className="w-full h-24 md:h-32 object-cover" />
        </div>
      )}
      <div className="flex flex-col gap-2">
        {children}
      </div>
    </section>
  );
}

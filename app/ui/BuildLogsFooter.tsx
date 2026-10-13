"use client";

import Image from "next/image";

export default function BuildLogsFooter({ lastEdit }: { lastEdit?: string }) {
  return (
    <div className="flex w-full items-center justify-between gap-3 border-b border-dotted border-[var(--border-color)] px-6 py-3 lg:pr-14">
      <div className="flex items-center gap-2.5">
        <Image
          unoptimized
          src="/avatars/avatar.png"
          alt="Ayush Srivastava"
          width={32}
          height={32}
          className="h-8 w-8 rounded-full border border-[var(--border-color)] object-cover"
        />
        <div className="flex flex-col leading-tight">
          <span className="text-[13px] font-semibold text-[var(--text-color)]">Ayush Srivastava</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--secondary-text)]/60">
            build logs
          </span>
        </div>
      </div>
      {lastEdit && (
        <div className="flex flex-col items-end leading-tight text-right">
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--secondary-text)]/60">
            last edit
          </span>
          <span className="font-mono text-[11px] text-[var(--secondary-text)]">
            {lastEdit}
          </span>
        </div>
      )}
    </div>
  );
}

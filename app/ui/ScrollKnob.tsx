"use client";

import { motion } from "motion/react";

export default function ScrollKnob({ progress, className = "" }: { progress: number; className?: string }) {
  const position = Math.max(0, Math.min(1, progress));

  return (
    <div className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-36 pointer-events-none ${className}`} aria-hidden="true">
      <div className="w-full h-full rounded-lg border border-[var(--border-color)]/60 bg-(--bg-color)/10 backdrop-blur-sm overflow-hidden relative shadow-[inset_0_1px_3px_rgba(255,255,255,0.05),0_4px_12px_rgba(0,0,0,0.2)]">
        <div className="absolute inset-0 flex flex-col justify-between py-1.5 px-1">
          {Array.from({ length: 12 }).map((_, i) => {
            const isActive = Math.abs(position * 11 - i) < 0.6;
            return (
              <motion.div
                key={i}
                className="w-full rounded-full"
                animate={{
                  height: isActive ? "1.5px" : "1px",
                  backgroundColor: isActive ? "var(--accent-color)" : "var(--text-color)",
                  opacity: isActive ? 0.7 : 0.12,
                }}
                transition={{ duration: 0.3 }}
              />
            );
          })}
        </div>
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.04] to-transparent rounded-t-lg pointer-events-none" />
        <motion.div
          className="absolute left-0 right-0 h-3 bg-[var(--accent-color)]/10 border-y border-[var(--accent-color)]/20"
          animate={{ top: `${position * 92.5}%` }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function SideQuestCategory({ title, banner, children }: { title: string; banner?: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between group cursor-pointer"
      >
        <h1 className="text-3xl md:text-[2.7rem] font-semibold font-mono bg-clip-text text-transparent bg-linear-to-b from-[var(--text-color)] to-[var(--text-color)]/50">
          <span>{title}</span>
          <span className="text-[var(--accent-color)]">.</span>
        </h1>
        <ChevronDown
          size={20}
          className="text-[var(--secondary-text)] transition-transform duration-200"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      {banner && (
        <div className="mb-3 mt-3 border border-[var(--border-color)]/60 overflow-hidden">
          <img src={banner} alt="" className="w-full h-24 md:h-32 object-cover" />
        </div>
      )}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="flex flex-col gap-2 mt-3"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function FlipText({ phrases }: { phrases: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % phrases.length), 3200);
    return () => clearInterval(t);
  }, [phrases.length]);

  return (
    <div className="relative px-4 h-6 overflow-hidden border-b border-[var(--border-color)]" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-sm md:text-base font-mono text-[var(--secondary-text)] leading-6"
        >
          {phrases[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import OrangeRollingGame from "../../OrangeRollingGame";
import AvatarFlip from "./AvatarFlip";
import FlipText from "./FlipText";
import { Heading } from "../primitives";

const taglines = [
  "Full-Stack Engineer from India.",
  "Building & shipping products from concept to deployment.",
  "I rice Linux.",
  "snack on oranges.",
];

export default function ProfileHeader({ gameOpen, onPlay, onCloseGame }: { gameOpen: boolean; onPlay: () => void; onCloseGame: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [gameBounds, setGameBounds] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!gameOpen) return;
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;
    const updateBounds = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setGameBounds(section.getBoundingClientRect()));
    };
    const observer = new ResizeObserver(updateBounds);
    observer.observe(section);
    window.addEventListener("scroll", updateBounds, { passive: true });
    window.addEventListener("resize", updateBounds);
    updateBounds();
    section.scrollIntoView({ behavior: "smooth", block: "center" });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", updateBounds);
      window.removeEventListener("resize", updateBounds);
    };
  }, [gameOpen]);

  const viewportHeight = typeof window === "undefined" ? 0 : window.innerHeight;
  const viewportWidth = typeof window === "undefined" ? 0 : window.innerWidth;
  const top = Math.min(viewportHeight, Math.max(0, gameBounds?.top ?? 0));
  const bottom = Math.max(top, Math.min(viewportHeight, gameBounds?.bottom ?? 0));
  const left = Math.min(viewportWidth, Math.max(0, gameBounds?.left ?? 0));
  const right = Math.max(left, Math.min(viewportWidth, gameBounds?.right ?? 0));

  return (
    <section ref={sectionRef} className={gameOpen ? "relative h-64 sm:h-56" : "relative"}>
      {gameOpen && gameBounds && createPortal(
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-[9998] pointer-events-none" aria-hidden="true">
          <div className="absolute inset-x-0 top-0 bg-black/70 pointer-events-auto" style={{ height: top }} onClick={onCloseGame} />
          <div className="absolute inset-x-0 bottom-0 bg-black/70 pointer-events-auto" style={{ top: bottom }} onClick={onCloseGame} />
          <div className="absolute left-0 bg-black/70 pointer-events-auto" style={{ top, height: bottom - top, width: left }} onClick={onCloseGame} />
          <div className="absolute right-0 bg-black/70 pointer-events-auto" style={{ top, height: bottom - top, left: right }} onClick={onCloseGame} />
        </motion.div>,
        document.body,
      )}
      <AnimatePresence mode="wait" initial={false}>
        {gameOpen ? (
          <motion.div
            key="game"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full"
            data-lenis-prevent
          >
            <OrangeRollingGame embedded onClose={onCloseGame} />
          </motion.div>
        ) : (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-[auto_1fr]"
          >
            <figure className="relative flex items-center justify-center sm:justify-start border-b sm:border-b-0 sm:border-r border-[var(--border-color)]">
              <button
                type="button"
                onClick={onPlay}
                title="Play Orange Rolling"
                aria-label="Play Orange Rolling"
                className="relative block cursor-pointer bg-transparent border-0 p-0 mt-4 sm:mt-0"
              >
                <AvatarFlip />
              </button>
            </figure>

            <div className="flex flex-col justify-center gap-(--landing-stack-tight) px-0 py-8 sm:py-10">
              <div className="border-y border-[var(--border-color)] flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <Heading as="h1" variant="display" className="font-mono px-4 font-bold leading-none text-[var(--text-color)]">
                  Ayush<span className="text-[var(--secondary-text)]"> Srivastava</span>
                </Heading>
                <span className="text-xs font-mono text-[var(--secondary-text)]/50">
                  आयुष श्रीवास्तव
                </span>
              </div>

              <FlipText phrases={taglines} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

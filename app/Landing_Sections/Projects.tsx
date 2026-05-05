'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../constants';

const DISPLAY_PROJECTS = PROJECTS.filter((p) =>
  ['Slices-UI', 'Boxlit', 'Mihika Arts','Kodak'].includes(p.projectName)
);

function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/click_sound.wav');
    audioRef.current.volume = 0.02;
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  }, [activeIndex]);

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 1 : -1;
      setActiveIndex((prev) =>
        Math.max(0, Math.min(DISPLAY_PROJECTS.length - 1, prev + delta))
      );
    },
    []
  );

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    list.addEventListener('wheel', handleWheel, { passive: false });
    return () => list.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  const project = DISPLAY_PROJECTS[activeIndex];

  return (
    <section className="relative w-full h-screen sticky top-0 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--border-color)]/50 to-transparent" />

      <div className="flex flex-col h-full py-16">
        <div className="flex justify-between items-center px-8 mb-12">
          <h1 className="text-3xl md:text-[2.7rem] font-semibold text-(--text-color)">
            Projects
            <span className="font-semibold text-[var(--accent-color)]">
              .
            </span>
          </h1>
          <Link href="/projects" className="text-xs text-(--text-color)/40 hover:text-(--text-color)/70 transition-colors">
            View all
          </Link>
        </div>

        <div className="flex-1 flex">
          <div
            ref={listRef}
            className="w-1/2 flex flex-col justify-center px-8 cursor-pointer select-none"
          >
        

          {DISPLAY_PROJECTS.map((p, index) => (
            <motion.div
              key={p.projectId}
              className="py-3 group"
              onPointerEnter={() => setActiveIndex(index)}
            >
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-(--text-color)/25 w-5">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <motion.h3
                  className={`text-lg md:text-2xl  font-medium tracking-tight transition-colors ${
                    index === activeIndex
                      ? 'text-[var(--accent-color)]'
                      : 'text-(--text-color)/40 group-hover:text-(--text-color)/60'
                  }`}
                  animate={{ x: index === activeIndex ? 4 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {p.projectName}
                </motion.h3>
                {index === activeIndex && (
                  <motion.div
                    layoutId="dot"
                    className="w-1 h-1 rounded-full bg-[var(--accent-color)]"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="w-1/2 flex items-center justify-center px-8 relative">
          <div className="absolute left-0 inset-y-0 w-px bg-gradient-to-b from-transparent via-[var(--border-color)]/40 to-transparent" />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="w-full"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              <div className="aspect-video w-full overflow-hidden rounded-md bg-(--border-color)/10">
                <img
                  src={project.projectImg.src}
                  alt={project.projectName}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono text-[var(--accent-color)]/70 bg-[var(--accent-color)]/5 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg font-medium text-(--text-color) mb-2">
                  {project.projectName}
                </h3>
                <p className="text-sm text-(--text-color)/50 leading-relaxed mb-5">
                  {project.projectDescriptionShort}
                </p>
                <div className="flex items-center gap-5">
                  <a
                    href={project.projectCode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-(--text-color)/40 hover:text-(--text-color) transition-colors flex items-center gap-1.5"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 2.046 1.073.6-.165 1.065-.313 2.042-.375.977-.062 1.973.155 2.744.155.771 0 1.767-.217 2.744-.155.977.062 1.442.21 2.042.375 1.038-1.395 2.046-1.073 2.046-1.073.652 1.652.165 2.873.04 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    Source
                  </a>
                  {project.projectLive && (
                    <a
                      href={project.projectLive}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-(--text-color)/40 hover:text-[var(--accent-color)] transition-colors flex items-center gap-1.5"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      Live demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      </div>
    </section>
  );
}

export default Projects;

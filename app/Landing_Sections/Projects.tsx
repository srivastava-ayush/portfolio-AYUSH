'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../constants';

const DISPLAY_PROJECTS = PROJECTS.filter((p) =>
  ['Slices-UI', 'Boxlit', 'Mihika Arts', 'Kodak'].includes(p.projectName)
);

const SCROLL_SECTIONS = DISPLAY_PROJECTS.length;

function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const containerTop = container.getBoundingClientRect().top + scrollTop;
      const scrollableHeight = container.offsetHeight - window.innerHeight;
      const scrolled = scrollTop - containerTop;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));
      const index = Math.min(SCROLL_SECTIONS - 1, Math.floor(progress * SCROLL_SECTIONS));
      
      if (index !== activeIndex) {
        setActiveIndex(index);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);

  const project = DISPLAY_PROJECTS[activeIndex];

  const handlePrev = useCallback(() =>
    setActiveIndex((prev) => Math.max(0, prev - 1)), []);
  const handleNext = useCallback(() =>
    setActiveIndex((prev) => Math.min(DISPLAY_PROJECTS.length - 1, prev + 1)), []);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: `${SCROLL_SECTIONS * 60}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--border-color)]/50 to-transparent" />

        {/* Desktop Layout */}
        <div className="hidden md:flex flex-col h-full py-16">
          <div className="flex justify-between items-center px-8 mb-12">
            <h1 className="text-3xl md:text-[2.7rem] font-semibold text-(--text-color)">
              Projects
              <span className="font-semibold text-[var(--accent-color)]">.</span>
            </h1>
            <Link href="/projects" className="text-xs text-(--text-color)/40 hover:text-(--text-color)/70 transition-colors">
              View all
            </Link>
          </div>

          <div className="flex-1 flex">
            <div className="w-1/2 flex flex-col justify-center px-8 cursor-pointer select-none relative">
              {DISPLAY_PROJECTS.map((p, index) => (
                <motion.div
                  key={p.projectId}
                  className="py-3 group"
                  onClick={() => {
                    const container = containerRef.current;
                    if (!container) return;
                    const containerTop = container.getBoundingClientRect().top + window.scrollY;
                    const scrollableHeight = container.offsetHeight - window.innerHeight;
                    const targetScroll = containerTop + (index / SCROLL_SECTIONS) * scrollableHeight;
                    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-(--text-color)/25 w-5">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <motion.h3
                      className={`text-lg md:text-2xl font-medium tracking-tight transition-colors ${
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

              {/* 2D Scroll Knob */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-36 pointer-events-none">
                <div
                  className="w-full h-full rounded-lg border border-[var(--border-color)]/30 bg-(--bg-color)/40 backdrop-blur-sm overflow-hidden relative shadow-[inset_0_1px_3px_rgba(255,255,255,0.05),0_4px_12px_rgba(0,0,0,0.2)]"
                >
                  {/* Horizontal ridges/stripes */}
                  <div className="absolute inset-0 flex flex-col justify-between py-1.5 px-1">
                    {Array.from({ length: 12 }).map((_, i) => {
                      const isActive = Math.abs((activeIndex / (SCROLL_SECTIONS - 1)) * 11 - i) < 0.6;
                      return (
                        <motion.div
                          key={i}
                          className="w-full rounded-full"
                          animate={{
                            height: isActive ? '1.5px' : '1px',
                            backgroundColor: isActive ? 'var(--accent-color)' : 'var(--text-color)',
                            opacity: isActive ? 0.7 : 0.12,
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      );
                    })}
                  </div>

                  {/* Glass reflection */}
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.04] to-transparent rounded-t-lg pointer-events-none" />

                  {/* Position indicator */}
                  <motion.div
                    className="absolute left-0 right-0 h-3 bg-[var(--accent-color)]/10 border-y border-[var(--accent-color)]/20"
                    animate={{
                      top: `${(activeIndex / (SCROLL_SECTIONS - 1)) * (100 - 7.5)}%`,
                    }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                </div>
              </div>
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

        {/* Mobile Layout */}
        <div className="flex md:hidden flex-col  py-16 px-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold text-(--text-color)">
              Projects
              <span className="font-semibold text-[var(--accent-color)]">.</span>
            </h1>
            <Link href="/projects" className="text-xs text-(--text-color)/40 hover:text-(--text-color)/70 transition-colors">
              View all
            </Link>
          </div>

          <div className="relative flex-1 flex items-center">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className="absolute left-0 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-(--bg-color)/80 border border-[var(--border-color)]/30 disabled:opacity-20 backdrop-blur-sm"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>

            <button
              onClick={handleNext}
              disabled={activeIndex === DISPLAY_PROJECTS.length - 1}
              className="absolute right-0 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-(--bg-color)/80 border border-[var(--border-color)]/30 disabled:opacity-20 backdrop-blur-sm"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>

            <div className="w-full overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col items-center"
                >
                  <div className="aspect-video w-full overflow-hidden rounded-md bg-(--border-color)/10">
                    <img
                      src={project.projectImg.src}
                      alt={project.projectName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="w-full mt-4">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-mono text-[var(--accent-color)]/70 bg-[var(--accent-color)]/5 px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-medium text-(--text-color) mb-1">
                      {project.projectName}
                    </h3>
                    <p className="text-sm text-(--text-color)/50 leading-relaxed mb-4">
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

          <div className="flex justify-center gap-2 py-6">
            {DISPLAY_PROJECTS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === activeIndex ? 'bg-[var(--accent-color)] scale-125' : 'bg-(--text-color)/20'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;

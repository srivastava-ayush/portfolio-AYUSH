import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import Image from "next/image";

function ProjectCard(props) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      key={props.projectName}
      className="relative overflow-hidden rounded-lg border border-[var(--border-color)]/30 shadow-[inset_0_1px_4px_rgba(255,255,255,0.08),inset_0_-1px_3px_rgba(0,0,0,0.2),0_8px_32px_rgba(0,0,0,0.3)]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <motion.div layout className="flex flex-col p-5">
        <div className="w-full aspect-video overflow-hidden rounded-md bg-(--border-color)/10 mb-4">
          <Image
            src={props.projectImg.src || null}
            alt={props.projectName}
            width={1280}
            height={720}
            className="w-full h-full object-cover"
          />
        </div>

        <motion.h1
          layout
          className="text-xl font-semibold text-(--text-color) tracking-tight"
        >
          {props.projectName}
        </motion.h1>

        <motion.p layout className="text-sm text-(--text-color)/50 leading-relaxed mt-2">
          {props.projectDescriptionShort}
        </motion.p>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.p
              key="expand"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-(--text-color)/50 leading-relaxed mt-2 overflow-hidden"
            >
              {props.projectDescriptionLong}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.button
          layout
          onClick={() => setIsExpanded((prev) => !prev)}
          className="text-xs text-(--text-color)/40 hover:text-[var(--accent-color)] transition-colors mt-3 w-fit self-start"
        >
          {isExpanded ? "Show Less" : "Read More"}
        </motion.button>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--border-color)]/30 to-transparent mt-4 mb-4" />

        <div className="flex items-center gap-5">
          <a
            href={props.projectCode}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-(--text-color)/40 hover:text-(--text-color) transition-colors flex items-center gap-1.5"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 2.046 1.073.6-.165 1.065-.313 2.042-.375.977-.062 1.973.155 2.744.155.771 0 1.767-.217 2.744-.155.977.062 1.442.21 2.042.375 1.038-1.395 2.046-1.073 2.046-1.073.652 1.652.165 2.873.04 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Source
          </a>
          {props.projectLive && (
            <a
              href={props.projectLive}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-(--text-color)/40 hover:text-[var(--accent-color)] transition-colors flex items-center gap-1.5"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Live demo
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ProjectCard;

"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "../../ui/Navbar";
import { CodeIcon, ArrowLeft } from "@phosphor-icons/react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "motion/react";
import { EXPERIENCE_SLUGS, EXPERIENCE_META } from "../constants";
import CodeModal from "./components/CodeModal";

export default function ExperiencesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const currentSlug = pathname.split("/").pop() || "parallax-reveal";
  const [codeOpen, setCodeOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(`/slices/experiences/${e.target.value}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col items-center bg-[var(--bg-color)]"
    >
      <Navbar />
      <div className="w-full flex-1 relative">
        {/* Floating controls */}
        <div className="fixed top-14 md:top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-color)]/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] bg-scanlines">
          <Link
            href="/slices/getting-started"
            className="flex items-center gap-1 text-xs font-mono text-[var(--secondary-text)] hover:text-[var(--text-color)] transition-colors px-2 py-1.5 rounded-lg hover:bg-[var(--hover-color)] border border-[var(--border-color)]/90 bg-white/10"
          >
            <ArrowLeft size={14} />
            back
          </Link>
          <span className="w-px h-4 bg-[var(--accent-color)]/80" />
          <select
            value={currentSlug}
            onChange={handleChange}
            className=" text-xs font-mono text-[var(--secondary-text)] rounded-lg px-3 py-1.5 outline-none cursor-pointer appearance-none hover:bg-[var(--hover-color)] hover:border-[var(--accent-color)]/40 transition-colors border bg-white/10 border-[var(--border-color)]/90"
          >
            {EXPERIENCE_SLUGS.map((slug) => (
              <option
                key={slug}
                value={slug}
                className="bg-[var(--bg-color)] text-[var(--text-color)]"
              >
                {EXPERIENCE_META[slug].name}
              </option>
            ))}
          </select>
          <span className="w-px h-4 bg-[var(--accent-color)]/80" />
          <motion.button
            layout
            layoutId="code-modal"
            onClick={() => setCodeOpen(true)}
            animate={{ opacity: codeOpen ? 0 : 1, scale: codeOpen ? 0.8 : 1 }}
            transition={{ duration: 0.2 }}
            style={{ pointerEvents: codeOpen ? "none" : "auto" }}
            className="flex items-center gap-1.5 text-xs font-mono text-[var(--secondary-text)] hover:text-[var(--text-color)] transition-colors px-2 py-1.5 rounded-lg hover:bg-[var(--hover-color)] border border-[var(--border-color)]/90 cursor-pointer bg-pixel-grid bg-scanlines text-orange-400 bg-white/10"
          >
            <CodeIcon size={14} />
            code
          </motion.button>
        </div>

        <CodeModal
          slug={currentSlug}
          open={codeOpen}
          onClose={() => setCodeOpen(false)}
        />

        {children}
      </div>
    </motion.div>
  );
}

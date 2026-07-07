"use client";
import Link from "next/link";
import Navbar from "../../ui/Navbar";
import { CodeIcon, CopyIcon, ArrowLeft } from "@phosphor-icons/react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "motion/react";

const options = [
  "parallax-reveal",
  "pop-blur",
  "reveal-slices",
  "stacked-cards",
  "grid-mosaic",
];

export default function ExperiencesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const currentSlug = pathname.split("/").pop() || "parallax-reveal";

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
        <nav className="fixed top-14 md:top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 rounded-xl border border-[var(--border-color)]/20 bg-[var(--bg-color)]/70 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          <Link
            href="/slices/getting-started"
            className="flex items-center gap-1 text-xs font-mono text-[var(--secondary-text)] hover:text-[var(--text-color)] transition-colors px-2 py-1.5 rounded-lg hover:bg-[var(--hover-color)]"
          >
            <ArrowLeft size={14} />
            back
          </Link>
          <span className="w-px h-4 bg-[var(--border-color)]/20" />
          <select
            value={currentSlug}
            onChange={handleChange}
            className="bg-transparent text-xs font-mono text-[var(--secondary-text)] border border-[var(--border-color)]/20 rounded-lg px-3 py-1.5 outline-none cursor-pointer appearance-none hover:border-[var(--accent-color)]/40 transition-colors"
          >
            {options.map((option) => (
              <option
                key={option}
                value={option}
                className="bg-[var(--bg-color)] text-[var(--text-color)]"
              >
                {option}
              </option>
            ))}
          </select>
          <span className="w-px h-4 bg-[var(--border-color)]/20" />
          <button className="flex items-center gap-1.5 text-xs font-mono text-[var(--secondary-text)] hover:text-[var(--text-color)] transition-colors px-2 py-1.5 rounded-lg hover:bg-[var(--hover-color)] cursor-pointer">
            <CodeIcon size={14} />
            code
          </button>
          <button className="flex items-center gap-1.5 text-xs font-mono text-[var(--secondary-text)] hover:text-[var(--text-color)] transition-colors px-2 py-1.5 rounded-lg hover:bg-[var(--hover-color)] cursor-pointer">
            <CopyIcon size={14} />
            copy
          </button>
        </nav>

        {children}
      </div>
    </motion.div>
  );
}

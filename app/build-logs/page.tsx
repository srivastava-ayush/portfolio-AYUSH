"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import Navbar from "../ui/Navbar";
import PageWithBorderStrips from "../ui/PageWithBorderStrips";

function Page() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="min-h-screen flex flex-col items-center">
      <PageWithBorderStrips>
        <motion.div className="w-full border border-[var(--border-color)] flex flex-col items-center">
          <Navbar />
          <main className="w-full flex flex-col px-6 pb-16">
            <div className="pt-[var(--section-gap)]" />

            <div className="border-t border-b border-[var(--border-color)]">
              <Link href="/#about" className="flex items-center gap-1.5 px-3 h-7 text-xs font-mono text-[var(--secondary-text)] hover:text-[var(--text-color)] hover:bg-[var(--hover-color)] transition-colors w-fit">
                <ArrowLeft size={14} />
                back
              </Link>
            </div>

            <div className="flex flex-col gap-8 pt-8">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-[1.8rem] md:text-[2.8rem] text-[var(--text-color)] font-bold">Build Logs</h1>
                <p className="text-md text-[var(--secondary-text)] mt-2 max-w-lg">
                  notes, ideas, observations and learnings
                </p>
              </div>

              <hr className="border-[var(--border-color)]/40" />

              <div className="text-left text-sm text-[var(--secondary-text)] font-mono leading-relaxed flex flex-col gap-4">
                <p className="text-[var(--text-color)] font-semibold">No entries yet.</p>
                <p>Every project has a story. This is where I log the build process — things that worked, things that didn&apos;t, and the detours that taught me the most.</p>
              </div>
            </div>
          </main>
        </motion.div>
      </PageWithBorderStrips>
    </motion.div>
  );
}

export default Page;

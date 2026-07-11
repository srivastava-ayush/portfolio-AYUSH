"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import Navbar from "../ui/Navbar";
import PageWithBorderStrips from "../ui/PageWithBorderStrips";
import SideQuestCategory from "../ui/SideQuestCategory";
import CategoryEntry from "../ui/CategoryEntry";
import { SIDE_QUESTS } from "../constants";

function Page() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col items-center"
    >
      <PageWithBorderStrips>
        <motion.div className="w-full border border-[var(--border-color)] flex flex-col items-center">
          <Navbar />
          <main className="w-full flex flex-col pb-16">
            <div className="pt-[var(--section-gap)]" />

            <div className="border-t border-b border-[var(--border-color)]">
              <Link
                href="/#about"
                className="flex items-center gap-1.5 px-3 h-7 text-xs font-mono text-[var(--secondary-text)] hover:text-[var(--text-color)] hover:bg-[var(--hover-color)] transition-colors w-fit"
              >
                <ArrowLeft size={14} />
                back
              </Link>
            </div>

            <div className="flex flex-col gap-8 pt-8 px-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-[1.8rem] md:text-[2.8rem] font-bold flex gap-3 items-baseline">
                  <span className="text-[var(--text-color)]">Side</span>
                  <span className="text-[var(--secondary-text)]">Quests</span>
                </h1>
                <p className="text-md text-[var(--secondary-text)] mt-2 max-w-lg">
                hobbies and random internet things that have
                  influenced how I think & feel about the world
                </p>
              </div>

              <hr className="border-[var(--border-color)]/40" />

              {SIDE_QUESTS.map((sq, i) => (
                <div key={sq.category}>
                  <SideQuestCategory title={sq.category} banner={sq.banner}>
                    {sq.entries.map((entry) => (
                      <CategoryEntry
                        key={entry.title}
                        title={entry.title}
                        para={entry.para}
                        imgs={(entry as { imgs?: any }).imgs}
                      />
                    ))}
                  </SideQuestCategory>
                  {i < SIDE_QUESTS.length - 1 && (
                    <hr className="border-[var(--border-color)]/40 mt-8" />
                  )}
                </div>
              ))}
            </div>
          </main>
        </motion.div>
      </PageWithBorderStrips>
    </motion.div>
  );
}

export default Page;

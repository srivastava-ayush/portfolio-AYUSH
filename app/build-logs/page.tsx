"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import Navbar from "../ui/Navbar";
import PageWithBorderStrips from "../ui/PageWithBorderStrips";
import {BUILD_LOGS} from "../constants";

function Page() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="min-h-screen flex flex-col items-center">
      <PageWithBorderStrips>
        <motion.div className="w-full border border-[var(--border-color)] flex flex-col items-center">
          <Navbar />
          <main className="w-full flex flex-col pb-16">
            <div className="pt-[var(--section-gap)]" />

            <div className="border-t border-b border-[var(--border-color)]">
              <Link href="/#about" className="flex items-center gap-1.5 px-3 h-7 text-xs font-mono text-[var(--secondary-text)] hover:text-[var(--text-color)] hover:bg-[var(--hover-color)] transition-colors w-fit">
                <ArrowLeft size={14} />
                back
              </Link>
            </div>

            <div className="flex flex-col gap-8 pt-8">
              <div className="flex flex-col items-center text-center px-6">
                <h1 className="text-[1.8rem] md:text-[2.8rem] font-bold flex gap-3 items-baseline">
                  <span className="text-[var(--text-color)]">Build</span>
                  <span className="text-[var(--secondary-text)]">Logs</span>
                </h1>
                <p className="text-md text-[var(--secondary-text)] mt-2 max-w-lg">
                  notes, ideas, observations and learnings
                </p>
              </div>

              <hr className="border-[var(--border-color)]/40" />

              <div className="text-left text-sm text-[var(--secondary-text)] px-6  font-mono leading-relaxed flex flex-col gap-4">
               
                <p>Every project has a story. This is where I log the build process - things that worked, things that didn&apos;t, and the detours that taught me the most.</p>
              </div>


              <div className="flex flex-col gap-8">
                
              {BUILD_LOGS.sort((a, b) => b.id - a.id).map((log) => (
                <Link key={log.id} href={`/build-logs/${log.id}`}>
                  <div className="flex justify-between items-center border-y px-6 py-2 border-[var(--border-color)]" key={log.id}>
                    <div className="flex justify-center items-center gap-2 "><h2 className="text-[var(--text-color)] font-semibold">{log.title}</h2><p className="text-[var(--secondary-text)] text-xs tracking-tighter">--  {log.desc}</p></div>
                  <p className="text-[var(--secondary-text)] text-xs tracking-tighter"> {log.date}</p>
                 </div>
                  </Link>
              ))}
              </div>
            </div>
          </main>
        </motion.div>
      </PageWithBorderStrips>
    </motion.div>
  );
}

export default Page;

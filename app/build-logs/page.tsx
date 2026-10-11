import Link from "next/link";
import { ArrowLeft, FileText, ArrowUpRight } from "lucide-react";
import Navbar from "../ui/Navbar";
import PageWithBorderStrips from "../ui/PageWithBorderStrips";
import Reveal from "../ui/Reveal";
import { getLogMeta } from "../lib/logs";

export default function Page() {
  const logs = getLogMeta();

  return (
    <Reveal className="min-h-screen flex flex-col items-center">
      <PageWithBorderStrips>
        <div className="w-full border border-[var(--border-color)] flex flex-col items-center">
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

              <div className="text-left text-sm text-[var(--secondary-text)] px-6 font-mono leading-relaxed flex flex-col gap-4">
                <p>Every project has a story. This is where I log the build process - things that worked, things that didn&apos;t, and the detours that taught me the most.</p>
              </div>

              <div className="flex flex-col px-6">
                {logs.length === 0 ? (
                  <p className="text-sm text-[var(--secondary-text)] font-mono">
                    nothing yet, still procrastinating or trying to articulate...
                  </p>
                ) : (
                  logs.map((log, index) => (
                    <Link
                      key={log.slug}
                      href={`/build-logs/${log.slug}`}
                      className="group flex flex-col gap-2 border-t border-[var(--border-color)] py-5 last:border-b hover:bg-[var(--hover-color)] transition-colors"
                      style={{ borderTopWidth: index === 0 ? 0 : undefined }}
                    >
                      <div className="flex items-start gap-4">
                        <span className="mt-0.5 text-[var(--secondary-text)]/50 group-hover:text-[var(--accent-color)] transition-colors">
                          <FileText size={18} />
                        </span>
                        <div className="flex flex-col gap-1 min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <h2 className="text-base font-semibold text-[var(--text-color)] group-hover:text-[var(--accent-color)] transition-colors">
                              {log.title}
                            </h2>
                            <span className="text-xs font-mono text-[var(--secondary-text)]/70 truncate">
                              {log.desc}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className="text-[11px] font-mono text-[var(--secondary-text)]/50">
                              {log.date}
                            </span>
                            {log.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] font-mono px-1.5 py-0.5 border border-[var(--border-color)]/50 text-[var(--secondary-text)]/60"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <ArrowUpRight
                          size={16}
                          className="mt-1 shrink-0 text-[var(--secondary-text)]/40 group-hover:text-[var(--accent-color)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                        />
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </main>
        </div>
      </PageWithBorderStrips>
    </Reveal>
  );
}

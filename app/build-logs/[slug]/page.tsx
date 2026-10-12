import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Calendar, Tag } from "lucide-react";
import PageWithBorderStrips from "../../ui/PageWithBorderStrips";
import Navbar from "../../ui/Navbar";
import Reveal from "../../ui/Reveal";
import BuildLogsScroll from "../../ui/BuildLogsScroll";
import Markdown from "../../ui/Markdown";
import { getLog, getAllLogs, getLogSlugs } from "../../lib/logs";

export function generateStaticParams() {
  return getLogSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const log = getLog(slug);
  if (!log) return { title: "Log not found" };
  return {
    title: `${log.title} | Build Logs`,
    description: log.desc,
    openGraph: { title: log.title, description: log.desc },
  };
}

export default async function BuildLogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const log = getLog(slug);

  if (!log) {
    return (
      <Reveal className="min-h-screen flex flex-col items-center">
        <PageWithBorderStrips>
          <div className="w-full mt-[3rem] border border-[var(--border-color)] flex flex-col items-center">
            <Navbar />
            <div className="w-full border-t border-b border-[var(--border-color)]">
              <Link href="/build-logs" className="flex items-center gap-1.5 px-3 h-7 text-xs font-mono text-[var(--secondary-text)] hover:text-[var(--text-color)] hover:bg-[var(--hover-color)] transition-colors w-fit">
                <ArrowLeft size={14} />
                back
              </Link>
            </div>
            <div className="flex-1 flex items-center justify-center py-20 font-mono text-sm text-[var(--secondary-text)]">
              log /{slug} not found
            </div>
          </div>
        </PageWithBorderStrips>
      </Reveal>
    );
  }

  const sorted = getAllLogs();
  const currIdx = sorted.findIndex((l) => l.slug === slug);
  const prevLog = currIdx < sorted.length - 1 ? sorted[currIdx + 1] : null;
  const nextLog = currIdx > 0 ? sorted[currIdx - 1] : null;

  const words = log.title.split(" ");
  const first = words.slice(0, -1).join(" ");
  const last = words[words.length - 1];

  return (
    <Reveal className="min-h-screen flex flex-col items-center">
      <PageWithBorderStrips>
        <div className="w-full border border-[var(--border-color)] flex flex-col items-center">
          <Navbar />

          {/* Top bar */}
          <div className="w-full flex mt-[3rem] items-center border-y border-[var(--border-color)] text-xs font-mono">
            <Link
              href="/build-logs"
              className="flex items-center gap-1.5 px-3 h-7 shrink-0 text-[var(--secondary-text)] hover:text-[var(--text-color)] hover:bg-[var(--hover-color)] transition-colors"
            >
              <ArrowLeft size={14} />
              back
            </Link>
            <div className="w-px h-7 bg-[var(--border-color)]" />
            <span className="px-3 h-7 flex items-center text-[var(--secondary-text)]/60 truncate">
              build-logs/{log.slug}
            </span>
            <div className="ml-auto flex items-center">
              {prevLog && (
                <Link
                  href={`/build-logs/${prevLog.slug}`}
                  className="flex items-center gap-1 px-3 h-7 text-[var(--secondary-text)]/60 hover:text-[var(--text-color)] hover:bg-[var(--hover-color)] transition-colors border-l border-[var(--border-color)]"
                >
                  <ArrowLeft size={12} />
                  prev
                </Link>
              )}
              {nextLog && (
                <Link
                  href={`/build-logs/${nextLog.slug}`}
                  className="flex items-center gap-1 px-3 h-7 text-[var(--secondary-text)]/60 hover:text-[var(--text-color)] hover:bg-[var(--hover-color)] transition-colors border-l border-[var(--border-color)]"
                >
                  next
                  <ArrowLeft size={12} className="rotate-180" />
                </Link>
              )}
            </div>
          </div>

          {/* Content */}
          <BuildLogsScroll contentClassName="max-w-2xl mx-auto px-6 py-12 md:py-16">
            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Image
                unoptimized
                src="/avatars/avatar.webp"
                alt=""
                width={28}
                height={28}
                className="rounded-sm opacity-70"
              />
              <span className="text-xs font-mono text-[var(--secondary-text)]/70">
                srivastava-ayush
              </span>
              <span className="text-[var(--secondary-text)]/20">/</span>
              <Calendar size={12} className="text-[var(--secondary-text)]/40" />
              <span className="text-xs font-mono text-[var(--secondary-text)]/40">
                {log.date}
              </span>
              <span className="text-[var(--secondary-text)]/20">/</span>
              <Tag size={12} className="text-[var(--accent-color)]/50" />
              <span className="text-xs font-mono text-[var(--accent-color)]/60">
                {log.slug}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-4xl font-bold flex gap-3 items-baseline leading-tight tracking-tight">
              {words.length > 1 && <span className="text-[var(--text-color)]">{first} </span>}
              <span className={words.length > 1 ? "text-[var(--secondary-text)]" : "text-[var(--text-color)]"}>
                {last}
              </span>
            </h1>

            {/* Tags */}
            {log.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-5">
                {log.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2.5 py-1 border border-[var(--border-color)]/50 text-[var(--secondary-text)]/60 hover:border-[var(--accent-color)]/30 hover:text-[var(--accent-color)]/70 transition-colors cursor-default"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Divider */}
            <hr className="border-[var(--border-color)]/30 my-8" />

            {/* Body - markdown */}
            <article>
              <Markdown content={log.content} />
            </article>

            {/* Links */}
            {log.links.length > 0 && (
              <div className="mt-12 pt-8 border-t border-[var(--border-color)]/20">
                <h3 className="text-xs font-mono text-[var(--secondary-text)]/40 uppercase tracking-widest mb-4">
                  References
                </h3>
                <div className="flex flex-col gap-3">
                  {log.links.map((link) => (
                    <a
                      key={link}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-sm text-[var(--accent-color)]/70 hover:text-[var(--accent-color)] transition-colors w-fit"
                    >
                      <span className="w-6 h-6 flex items-center justify-center border border-[var(--border-color)]/30 group-hover:border-[var(--accent-color)]/30 transition-colors">
                        <ArrowUpRight size={12} />
                      </span>
                      <span className="underline underline-offset-4 decoration-[var(--border-color)]/40 group-hover:decoration-[var(--accent-color)]/40 transition-colors">
                        {link}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </BuildLogsScroll>
        </div>
      </PageWithBorderStrips>
    </Reveal>
  );
}

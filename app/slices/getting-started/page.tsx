"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { VideoIcon, NewspaperIcon, ArrowRight, ArrowLeft } from "lucide-react";
import Navbar from "../../ui/Navbar";
import PageWithBorderStrips from "../../ui/PageWithBorderStrips";

const navLinks = [
  { label: "Getting Started", href: "/slices/getting-started" },
  { label: "Experiences", href: "/slices/experiences" },
  { label: "Resources", href: "/slices/resources" },
];

const exploreItems = [
  {
    title: "Experiences",
    description: "Interactive scroll-driven components and animations.",
    icon: VideoIcon,
    href: "/slices/experiences",
  },
  {
    title: "Resources",
    description: "Handpicked tools, channels, and assets I use daily.",
    icon: NewspaperIcon,
    href: "/slices/resources",
  },
];

function Page() {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col items-center"
    >
      <PageWithBorderStrips><motion.div className="w-full border border-[var(--border-color)] flex flex-col items-center">
        <Navbar />
        <main className="w-full flex flex-col px-6 pb-16">
          <div className="pt-[var(--section-gap)]" />

          <div className="border-t border-b border-[var(--border-color)]">
            <div className="flex text-xs font-mono">
              <Link
                href="/"
                className="flex items-center gap-1.5 px-3 h-7 shrink-0 text-[var(--secondary-text)] hover:text-[var(--text-color)] hover:bg-[var(--hover-color)] transition-colors"
              >
                <ArrowLeft size={14} />
                back
              </Link>
              <div className="w-px bg-[var(--border-color)] shrink-0" />
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/slices/getting-started" &&
                    pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 h-7 flex items-center border-r border-[var(--border-color)] last:border-r-0 transition-colors ${
                      isActive
                        ? "text-[var(--text-color)] bg-[var(--hover-color)]"
                        : "text-[var(--secondary-text)] hover:text-[var(--text-color)] hover:bg-[var(--hover-color)]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-8 pt-8">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-[1.8rem] md:text-[2.8rem] text-[var(--text-color)] font-bold">
                Slices
              </h1>
              <p className="text-md text-[var(--secondary-text)] mt-2">
                components &mdash; engineered, styled, shipped.
              </p>
            </div>

            <hr className="border-[var(--border-color)]/40" />

            <div className="text-left text-md text-[var(--secondary-text)] flex flex-col gap-4">
              <p>
                Welcome to Slices &mdash; a collection of reusable components,
                utilities, and templates I use as building blocks across my
                projects.
              </p>
              <p>
                It&apos;s a playground, not a polished framework. Meant for
                exploration, experimentation, and sharing ideas with other
                developers.
              </p>
              <p>
                Individually, these slices are small and useful on their own. Put
                enough of them together, and they form something whole. That whole
                is{" "}
                <span className="text-[var(--text-color)] font-semibold">
                  Orange
                </span>
                .
              </p>
            </div>

            <hr className="border-[var(--border-color)]/40" />

            <div>
              <h2 className="text-xl font-bold text-[var(--text-color)] mb-4">
                Explore
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {exploreItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="group relative overflow-hidden rounded-xl border border-[var(--border-color)]/30 bg-[var(--glass)] p-5 transition-all duration-300 hover:border-[var(--accent-color)]/40 hover:shadow-lg"
                    >
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/20 shrink-0">
                          <Icon size={20} className="text-[var(--accent-color)]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-[var(--text-color)] group-hover:text-[var(--accent-color)] transition-colors flex items-center gap-2">
                            {item.title}
                            <ArrowRight
                              size={14}
                              className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                            />
                          </h3>
                          <p className="text-sm text-[var(--secondary-text)] mt-1">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </motion.div></PageWithBorderStrips>
    </motion.div>
  );
}

export default Page;

"use client";
import "../slices.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { HomeIcon, NewspaperIcon, VideoIcon } from "lucide-react";
import { SidebarIcon } from "@phosphor-icons/react";
import ThemeToggleBtn from "../ui/ThemeBtn";
import Lenis from "lenis";

const demoItems = [
  { id: 1, title: "Getting Started", icon: HomeIcon, slug: "getting-started" },

  { id: 2, title: "Experiences", icon: VideoIcon, slug: "experiences" },

  { id: 3, title: "Resources", icon: NewspaperIcon, slug: "resources" },
];

export default function SlicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const currentSection = pathname.split("/")[2];

  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") return saved;
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const handleNavigation = (slug: string) => {
    router.push(`/slices/${slug}`);
    if (window.innerWidth < 768) setSidebarOpen(false);
  };
  useEffect(() => {
    const lenis = new Lenis();
    let rafId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75 }}
      className="min-h-screen flex flex-col bg-[var(--bg-color)] text-[var(--text-color)] relative"
    >
      {/* Navigation Bar */}
      <nav className="fixed flex w-full top-0 left-0 border-b border-[var(--border-color)]/20 justify-between items-center px-5 py-3 bg-[var(--bg-color)]/60 backdrop-blur-2xl z-50">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-xl hover:bg-[var(--hover-color)] rounded-xl transition-all duration-200"
            aria-label="Toggle sidebar"
          >
            <SidebarIcon size={22} />
          </button>
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, letterSpacing: "0em" }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center text-center gap-2"
          >
            <h1 className="text-[1.4rem] md:text-[1.6rem] text-[var(--text-color)] font-bold tracking-tight">
              Slices
            </h1>
            <Image
              src="/slices.svg"
              width={28}
              height={28}
              alt="Logo"
              className="w-6 h-fit rounded-full object-cover"
            />
          </motion.span>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-[.5rem] md:text-[.65rem] rounded-full border border-[var(--border-color)]/40 text-[var(--secondary-text)] tracking-wide font-mono uppercase">
            beta
          </span>
          <Link
            href="/"
            className="text-[.85rem] text-[var(--secondary-text)] hover:text-[var(--accent-color)] font-medium transition-all duration-300"
          >
            Portfolio
          </Link>
          <ThemeToggleBtn toggleTheme={toggleTheme} theme={theme} />
        </div>
      </nav>

      <div className="flex pt-[62px]">
        {/* Sidebar */}
        <motion.aside
          animate={{ width: sidebarOpen ? 220 : 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          className="fixed md:sticky top-[62px] left-0 h-[calc(100vh-62px)] z-40 overflow-hidden border-r border-[var(--border-color)]/10 bg-[var(--bg-color)]/30 backdrop-blur-xl"
        >
          <div className="py-5 px-2 overflow-y-auto h-full">
            <ul className="space-y-1">
              {demoItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentSection === item.slug;

                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavigation(item.slug)}
                      className={`w-full px-3 py-2 rounded-lg cursor-pointer transition-all duration-150 flex items-center gap-3 group ${
                        isActive
                          ? "bg-[var(--hover-color)]"
                          : "hover:bg-[var(--hover-color)]"
                      }`}
                    >
                      <span
                        className={`text-base transition-all duration-150 ${isActive ? "text-[var(--accent-color)]" : "text-[var(--secondary-text)] group-hover:text-[var(--text-color)]"}`}
                      >
                        <Icon size={20} />
                      </span>
                      <span
                        className={`text-sm font-medium tracking-tight ${isActive ? "text-[var(--text-color)]" : "text-[var(--secondary-text)]"}`}
                      >
                        {item.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden top-[62px]"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-62px)] relative">
          <div className="absolute inset-0 bg-grid pointer-events-none" />
          <div className="relative z-10 p-4 md:p-8 lg:p-10">{children}</div>
        </main>
      </div>
    </motion.div>
  );
}

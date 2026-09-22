"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import slices_logo from "../../public/icons/slices.svg";
import ThemeToggleBtn from "./ThemeBtn";

function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

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

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  const handleMenuToggle = () => setMenuOpen((prev) => !prev);

  const handleHashNavigation = (
    e: { preventDefault: () => void },
    hash: string,
  ) => {
    e.preventDefault();
    setMenuOpen(false);
    if (pathname === "/") {
      const element = document.querySelector(hash);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/${hash}`);
    }
  };

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    router.push(href);
  };

  const navItems = [
    {
      label: "Home",
      alt_label:"/Home",
      href: "/",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      label: "Projects",
      alt_label:"/Projects",
      href: "/projects",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
    },
    {
      label: "Slices",
      alt_label:"/Slices",
      href: "/slices",
      icon: <Image src={slices_logo} alt="Slices" width={24} height={24} />,
    },
    // {
    //   label: "Terminal",
    //   alt_label:"/Terminal",
    //   href: "/terminal",
    //   icon: (
    //     <svg
    //       width="24"
    //       height="24"
    //       viewBox="0 0 24 24"
    //       fill="none"
    //       stroke="currentColor"
    //       strokeWidth="2"
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //     >
    //       <polyline points="4 17 10 11 4 5" />
    //       <line x1="12" y1="19" x2="20" y2="19" />
    //     </svg>
    //   ),
    // },
    {
      label: "Side Quests",
      alt_label:"/Side Quests",
      href: "/side-quests",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      ),
    },
    {
      label: "Build Logs",
      alt_label:"/Build Logs",
      href: "/build-logs",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          <line x1="8" y1="7" x2="16" y2="7" />
          <line x1="8" y1="11" x2="13" y2="11" />
        </svg>
      ),
    },
  ];

  const getCurrentPage = (): string => {
    if (pathname === "/") return "About";
    if (pathname === "/projects") return "Projects";
    if (pathname === "/slices") return "Slices";
    if (pathname === "/terminal") return "Terminal";
    if (pathname === "/side-quests") return "Side Quests";
    if (pathname === "/build-logs") return "Build Logs";
    return "";
  };

  return (
    <>
      {/* Desktop Nav - metabar style */}
      <nav
        ref={navRef}
        className="hidden md:flex sticky font-mono  upe top-0 z-[99998] border-b border-[var(--border-color)] bg-[var(--bg-color)]/60 backdrop-blur-lg max-w-3xl mx-auto w-full"
      >
        <div className="w-full flex items-center h-7 font-mono text-[11px] text-[var(--secondary-text)]">
          <Link
            href="/terminal"
            className="px-3 h-full flex items-center border-r border-[var(--border-color)] text-[var(--text-color)] hover:bg-[var(--hover-color)] transition-colors"
          >
            आ<span className="text-[var(--accent-color)]">1.</span>
          </Link>


          {navItems.map(item => (
            <Link
              key={item.label}
              href={item.href}
              className={`px-3 h-full flex items-center border-r border-[var(--border-color)] hover:text-[var(--text-color)] hover:bg-[var(--hover-color)] transition-colors ${
                getCurrentPage() === item.label
                  ? "text-[var(--text-color)] bg-[var(--hover-color)]"
                  : ""
            }`}
          >

            <span>{item.alt_label}</span>
          </Link>))}




          <div className="ml-auto h-full flex items-center px-2 border-l border-[var(--border-color)]">
            <ThemeToggleBtn theme={theme} toggleTheme={toggleTheme} />
          </div>
        </div>
      </nav>

      {/* Mobile Top Bar - Logo + theme + minimal toggle */}
      <div className="fixed top-0 inset-x-0 z-[99997] md:hidden flex items-center justify-between px-6 py-4 backdrop-blur-xl bg-[var(--bg-color)]/60 border-b border-[var(--border-color)]/40">
        <Link
          href="/"
          className="flex items-center gap-1 text-[var(--text-color)] text-xl font-semibold hover:scale-105 transition-transform"
        >
          <span className="text-lg">आ</span>
          <span>1.</span>
        </Link>

        <div className="flex items-center gap-1">
          <ThemeToggleBtn theme={theme} toggleTheme={toggleTheme} mobile />
          <button
            onClick={handleMenuToggle}
            aria-label="Toggle menu"
            className="text-[var(--text-color)] flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: menuOpen ? 90 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="4" y1="8" x2="20" y2="8" />
                <line x1="4" y1="16" x2="20" y2="16" />
              </svg>
            </motion.div>
          </button>
        </div>
      </div>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.5 } }}
            className="fixed inset-0 z-[99999] md:hidden"
          >
            {/* Translucent grained glass backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.35 } }}
              className="absolute inset-0 bg-[var(--bg-color)]/70 backdrop-blur-2xl"
              onClick={handleMenuToggle}
            />
            <div className="absolute inset-0 bg-grain opacity-[0.05] mix-blend-overlay pointer-events-none" />
            <div className="absolute top-0 inset-x-0 flex items-center justify-between px-6 py-4 z-50 backdrop-blur-xl bg-[var(--bg-color)]/60 border-b border-[var(--border-color)]/40">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.2, delay: 0.1 } }}
                transition={{ delay: 0.15 }}
              >
                <Link
                  href="/"
                  onClick={handleMenuToggle}
                  className="flex items-center gap-1 text-[var(--text-color)] text-2xl font-semibold"
                >
                  आ<span>1.</span>
                </Link>
              </motion.div>
              <div className="flex items-center gap-1">
                <ThemeToggleBtn theme={theme} toggleTheme={toggleTheme} mobile />
                <motion.button
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0, transition: { duration: 0.15, delay: 0.1 } }}
                  transition={{ delay: 0.1 }}
                  onClick={handleMenuToggle}
                  aria-label="Close menu"
                  className="text-[var(--text-color)] flex items-center justify-center"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* Menu Content */}
            <div className="relative flex flex-col justify-center h-full px-6">
              {/* Terminal header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20, transition: { duration: 0.2, delay: 0.15 } }}
                transition={{ delay: 0.15 }}
                className="mb-4 flex items-center w-full border-t border-b border-[var(--border-color)]"
              >
                <span className="px-2 h-6 flex items-center font-mono text-[10px] text-[var(--secondary-text)] border-r border-[var(--border-color)]">$</span>
                <span className="px-2 h-6 flex items-center font-mono text-[10px] text-[var(--secondary-text)]">nav --list</span>
              </motion.div>

              {/* Nav list - terminal style */}
              <div className="relative border border-[var(--border-color)] bg-[var(--glass-bg-color)] divide-y divide-[var(--border-color)] backdrop-blur-md overflow-hidden">
                <div className="absolute inset-0 bg-scanlines pointer-events-none opacity-40" />
{navItems.map((item, index) => (
                    <motion.button
                      key={item.label}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => {
                        if (item.href.startsWith("#")) {
                          handleHashNavigation(
                            { preventDefault: () => {} },
                            item.href,
                          );
                        } else {
                          handleNavClick(item.href);
                        }
                      }}
                      className="relative w-full text-left group overflow-hidden"
                    >
                      {/* Cinematic sweep bar - synced, each starts pre-revealed */}
                      <motion.span
                        initial={{ scaleX: index * 0.2 }}
                        animate={{ scaleX: 1 }}
                        exit={{
                          scaleX: index * 0.2,
                          transition: {
                            duration: 0.25,
                            delay: (navItems.length - 1 - index) * 0.06,
                          },
                        }}
                        transition={{
                          duration: 0.5,
                          ease: [0.65, 0, 0.35, 1],
                          delay: 0.2,
                        }}
                        className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[var(--text-color)]/10 to-transparent group-hover:from-[var(--text-color)]/20 origin-left"
                      />
                      {/* Row content */}
                      <motion.div
                        initial={{ opacity: 0, x: -14 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{
                          opacity: 0,
                          x: -14,
                          transition: {
                            duration: 0.2,
                            delay: (navItems.length - 1 - index) * 0.06,
                          },
                        }}
                        transition={{ duration: 0.35, ease: "easeOut", delay: 0.26 + index * 0.07 }}
                        className="relative flex items-center justify-between px-5 py-4"
                      >
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-[10px] text-[var(--secondary-text)] group-hover:text-[var(--accent-color)] transition-colors w-6">
                            {String(index + 1).padStart(2, "0")}.
                          </span>
                          <span className="font-mono text-base text-[var(--text-color)] group-hover:text-[var(--accent-color)] transition-colors">
                            {item.label}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-[var(--secondary-text)]/60 group-hover:text-[var(--accent-color)] transition-colors">
                          {item.alt_label} →
                        </span>
                      </motion.div>
                    </motion.button>
                  ))}
              </div>

              {/* Footer meta */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2, delay: 0.1 } }}
                transition={{ delay: 0.15 + navItems.length * 0.07 + 0.1 }}
                className="mt-4 font-mono text-[10px] text-[var(--secondary-text)]/60 text-center"
              >
                github · linkedin · x · constayush@gmail.com
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      </>
  );
}

export default Navbar;

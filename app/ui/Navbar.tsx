"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "motion/react";

import ThemeToggleBtn from "./ThemeBtn";

function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { scrollYProgress } = useScroll();

  const [menuOpen, setMenuOpen] = useState(false);

  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") return saved;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        navRef.current?.classList.add("nav-active");
      } else {
        navRef.current?.classList.remove("nav-active");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  const handleMenuToggle = () => setMenuOpen((prev) => !prev);

  const borderTopBottom = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const handleHashNavigation = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
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
    { label: "About", href: "#about", icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    )},
    { label: "Projects", href: "/projects", icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
      </svg>
    )},
    { label: "Slices", href: "/slices", icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    )},
    { label: "Terminal", href: "/terminal", icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5"/>
        <line x1="12" y1="19" x2="20" y2="19"/>
      </svg>
    )},
  ];

  const getCurrentPage = () => {
    if (pathname === "/") return "About";
    if (pathname === "/projects") return "Projects";
    if (pathname === "/slices") return "Slices";
    if (pathname === "/terminal") return "Terminal";
    return "";
  };

  return (
    <>
      {/* Desktop Nav */}
      <nav
        ref={navRef}
        className="hidden md:flex px-6 md:px-6 m-2 w-full lg:w-4xl mx-auto pt-[2rem] nav-desktop-wrapper z-[99998] fixed top-0 left-0 right-0 items-center justify-between"
      >
        <motion.div
          style={{ width: borderTopBottom }}
          className="absolute bottom-0 left-1/2 h-[2px] bg-[var(--border-color)] -translate-x-1/2 origin-center"
        />

        <Link
          className="text-[var(--text-color)] text-[1.35rem] md:text-[2rem] hover:tracking-[1rem] logoNav"
          href="/terminal"
        >
          आ<span className="accent">1.</span>
        </Link>

        <ul className="hidden md:flex ml-5 gap-2 text-center items-center font-semibold justify-center">
          <li className="text-[var(--secondary-text)] text-[.95rem] md:text-[1.1rem] navLinks">
            <a href="#about" onClick={(e) => handleHashNavigation(e, "#about")}>
              About
            </a>
          </li>

          <li className="text-[var(--secondary-text)] text-[.95rem] md:text-[1.1rem] navLinks">
            <Link href="/projects">Projects</Link>
          </li>

          <li className="text-[var(--secondary-text)] text-[.95rem] md:text-[1.1rem] navLinks">
            <Link href="/slices">Slices</Link>
          </li>

          <li>
            <ThemeToggleBtn theme={theme} toggleTheme={toggleTheme} />
          </li>
        </ul>
      </nav>

      {/* Mobile Dock - Always visible at bottom */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[99998] md:hidden w-[90%] max-w-[400px]">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative"
        >
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent-color)]/20 via-transparent to-[var(--accent-color)]/20 rounded-3xl blur-xl" />
          
          <div className="relative flex items-center justify-between px-4 py-3 backdrop-blur-2xl bg-[var(--bg-color)]/90 border border-[var(--border-color)]/40 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.05)]">
            {/* Logo - Always visible */}
            <Link
              href="/terminal"
              className="flex items-center gap-1 text-[var(--text-color)] text-xl font-semibold hover:scale-105 transition-transform"
            >
              <span className="text-lg">आ</span>
              <span className="text-[var(--accent-color)]">1.</span>
            </Link>

            {/* Nav Items */}
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = getCurrentPage() === item.label;
                return (
                  <motion.button
                    key={item.label}
                    onClick={() => {
                      if (item.href.startsWith("#")) {
                        handleHashNavigation({ preventDefault: () => {} } as any, item.href);
                      } else {
                        handleNavClick(item.href);
                      }
                    }}
                    whileTap={{ scale: 0.9 }}
                    className={`relative w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-200 ${
                      isActive
                        ? "text-[var(--accent-color)] bg-[var(--accent-color)]/10"
                        : "text-[var(--secondary-text)] hover:text-[var(--text-color)] hover:bg-[var(--hover-color)]"
                    }`}
                  >
                    {item.icon}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--accent-color)]"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Theme Toggle */}
            <div className="pl-2 border-l border-[var(--border-color)]/30">
              <ThemeToggleBtn theme={theme} toggleTheme={toggleTheme} mobile dock />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[99999] md:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[var(--bg-color)]/95 backdrop-blur-3xl"
              onClick={handleMenuToggle}
            />

            {/* Glowing orbs */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="absolute top-[20%] left-[10%] w-[60%] h-[40%] bg-gradient-to-br from-[var(--accent-color)]/30 to-transparent rounded-full blur-[100px]"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: "spring" }}
              className="absolute bottom-[20%] right-[5%] w-[50%] h-[35%] bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-[80px]"
            />

            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              onClick={handleMenuToggle}
              className="absolute top-6 right-6 w-14 h-14 flex items-center justify-center rounded-full backdrop-blur-xl bg-[var(--bg-color)]/50 border border-[var(--border-color)]/30 z-50"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </motion.button>

            {/* Menu Content */}
            <div className="relative flex flex-col items-center justify-center h-full gap-8 px-6">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mb-4"
              >
                <Link
                  href="/terminal"
                  onClick={handleMenuToggle}
                  className="text-[var(--text-color)] text-4xl font-bold"
                >
                  आ<span className="accent">1.</span>
                </Link>
              </motion.div>

              {/* Navigation Links */}
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + index * 0.08 }}
                >
                  <button
                    onClick={() => {
                      if (item.href.startsWith("#")) {
                        handleHashNavigation({ preventDefault: () => {} } as any, item.href);
                      } else {
                        handleNavClick(item.href);
                      }
                    }}
                    className="flex items-center gap-4 text-3xl md:text-4xl font-semibold text-[var(--text-color)] hover:text-[var(--accent-color)] transition-colors"
                  >
                    <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--hover-color)]">
                      {item.icon}
                    </span>
                    {item.label}
                  </button>
                </motion.div>
              ))}

              {/* Theme toggle in menu */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + navItems.length * 0.08 }}
                className="mt-4"
              >
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-4 text-2xl font-semibold text-[var(--secondary-text)] hover:text-[var(--text-color)] transition-colors"
                >
                  <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--hover-color)]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {theme === "dark" ? (
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                      ) : (
                        <>
                          <circle cx="12" cy="12" r="5"/>
                          <line x1="12" y1="1" x2="12" y2="3"/>
                          <line x1="12" y1="21" x2="12" y2="23"/>
                          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                          <line x1="1" y1="12" x2="3" y2="12"/>
                          <line x1="21" y1="12" x2="23" y2="12"/>
                          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                        </>
                      )}
                    </svg>
                  </span>
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hamburger Button - Opens Full Menu */}
      <button
        onClick={handleMenuToggle}
        aria-label="Toggle menu"
        className="fixed top-6 right-6 md:hidden z-[99997] w-12 h-12 flex items-center justify-center backdrop-blur-xl bg-[var(--bg-color)]/80 border border-[var(--border-color)]/30 rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
      >
        <motion.div
          animate={{ rotate: menuOpen ? 90 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="4" y1="8" x2="20" y2="8"/>
            <line x1="4" y1="16" x2="20" y2="16"/>
          </svg>
        </motion.div>
      </button>
    </>
  );
}

export default Navbar;
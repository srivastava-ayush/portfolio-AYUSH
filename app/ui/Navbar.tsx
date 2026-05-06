"use client";

import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  motion,
  useScroll,
  useTransform,
  Transition,
  AnimatePresence,
} from "motion/react";

import ThemeToggleBtn from "./ThemeBtn";

function Navbar() {
  const nav = useRef<HTMLDivElement | null>(null);

  const pathname = usePathname();
  const router = useRouter();

  const { scrollYProgress } = useScroll();

  const [menuOpen, setMenuOpen] = useState(false);

  // Proper lazy initialization (prevents unnecessary flicker)
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");

      if (saved === "light" || saved === "dark") {
        return saved;
      }

      // fallback to system preference
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    return "dark";
  });

  const spring: Transition = {
    type: "spring",
    stiffness: 400,
    damping: 30,
  };

  // Single source of truth
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Scroll navbar effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        nav.current?.classList.add("nav-active");
      } else {
        nav.current?.classList.remove("nav-active");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const borderTopBottom = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  const handleHashNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash: string
  ) => {
    e.preventDefault();

    if (pathname === "/") {
      const element = document.querySelector(hash);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
        });
      }
    } else {
      router.push(`/${hash}`);
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <nav
        ref={nav}
        className="flex px-6 md:px-6 w-full lg:w-4xl sm:gap-9 gap-3 pt-[2rem] navbar-short z-[90000000009] fixed top-0 items-center justify-between"
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

        {/* Desktop */}
        <ul className="hidden md:flex ml-5 gap-2 text-center items-center font-semibold justify-center">
          <li className="text-[var(--secondary-text)] text-[.95rem] md:text-[1.1rem] navLinks">
            <a
              href="#about"
              onClick={(e) => handleHashNavigation(e, "#about")}
            >
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
            <ThemeToggleBtn
              theme={theme}
              toggleTheme={toggleTheme}
            />
          </li>
        </ul>

        {/* Hamburger */}
        <button
          onClick={handleMenuToggle}
          className="relative md:hidden ml-auto w-8 h-8 flex items-center justify-center z-[1000000]"
        >
          <motion.span
            className="absolute h-[2px] w-6 bg-[var(--text-color)]"
            animate={menuOpen ? { rotate: 45 } : { rotate: 0, y: -6 }}
            transition={spring}
          />

          <motion.span
            className="absolute h-[2px] w-6 bg-[var(--text-color)]"
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={spring}
          />

          <motion.span
            className="absolute h-[2px] w-6 bg-[var(--text-color)]"
            animate={menuOpen ? { rotate: -45 } : { rotate: 0, y: 6 }}
            transition={spring}
          />
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen &&
            createPortal(
              <motion.div
                initial={{ opacity: 0, y: 1000 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 1000 }}
                transition={{
                  ease: "easeInOut",
                  duration: 0.3,
                }}
                className="fixed inset-0 backdrop-blur-3xl bg-[#ffffff14] z-[999999]"
                onClick={handleMenuToggle}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.75 }}
                  className="absolute bg-amber-500 w-[30%] h-[10%] top-0 right-0 blur-[200px]"
                />

                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.75 }}
                  className="absolute bg-white w-[30%] h-[10%] bottom-0 left-0 blur-[100px]"
                />

                <ul className="flex flex-col w-full h-full gap-2 text-center items-center font-semibold justify-center">
                  <li className="text-[var(--text-color)] text-[2.5rem] underline underline-offset-2 navLinks">
                    <a
                      href="#about"
                      onClick={(e) =>
                        handleHashNavigation(e, "#about")
                      }
                    >
                      About
                    </a>
                  </li>

                  <li className="text-[var(--text-color)] text-[2.5rem] underline underline-offset-2 navLinks">
                    <Link href="/projects">Projects</Link>
                  </li>

                  <li className="text-[var(--text-color)] text-[2.5rem] underline underline-offset-2 navLinks">
                    <Link href="/slices">Slices</Link>
                  </li>

                  <li>
                    <ThemeToggle
                      theme={theme}
                      toggleTheme={toggleTheme}
                      mobile
                    />
                  </li>
                </ul>
              </motion.div>,
              document.body
            )}
        </AnimatePresence>
      </nav>
    </div>
  );
}

export default Navbar;
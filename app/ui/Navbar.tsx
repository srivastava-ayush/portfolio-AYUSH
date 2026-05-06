"use client";

import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, useScroll, useTransform, Transition, AnimatePresence } from "motion/react";
import { SunIcon , MoonIcon, } from "@phosphor-icons/react";

function Navbar() {
 const nav = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll();
  const pathname = usePathname();
  const router = useRouter();
  const spring: Transition = {
    type: "spring",
    stiffness: 400,
    damping: 30,
  };

  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);


  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };
  // Load theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
  }, []);

  
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    
    
    // Swap theme at 0.15s
    setTimeout(() => {
      setTheme(newTheme);
      document.documentElement.dataset.theme = newTheme;
      localStorage.setItem("theme", newTheme);
    }, 150);
    
   
  };

  // Scroll logic for naVbar
  useEffect(() => {
    const handleScroll = () => {
   
      if (window.scrollY > 80) {
        nav.current?.classList.add("nav-active");
      } else {
        nav.current?.classList.remove("nav-active");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const borderTopBottom = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Handle navigation with hash
  const handleHashNavigation = (e: React.MouseEvent<HTMLAnchorElement>, hash:string) => {
    e.preventDefault();

    // If we're on the home page, just scroll to the section
    if (pathname === "/") {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If we're on a different page, navigate to home first, then scroll
      router.push(`/${hash}`);
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <nav
        ref={nav}
        className="flex px-6 md:px-6 w-full lg:w-4xl sm:gap-9 gap-3 pt-[2rem] navbar-short z-[90000000009] fixed top-0 items-center justify-between "
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
            <Link href="/projects">Projects</Link>{" "}
          </li>
          <li className="text-[var(--secondary-text)] text-[.95rem] md:text-[1.1rem] navLinks">
               <Link href="/slices">Slices</Link>{" "}
            
          </li>
         <li>
  <button
    aria-label="theme-button"
    onClick={toggleTheme}
    className="relative w-11 h-6 mt-2  rounded-full border border-[var(--border-color)]/30 bg-(--bg-color)/50 backdrop-blur-sm overflow-hidden group shadow-[inset_0_1px_3px_rgba(0,0,0,0.2)]"
  >
    {/* Track background gradient */}
    <motion.div
      className="absolute inset-0"
      animate={{
        background: theme === 'dark' 
          ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
          : 'linear-gradient(135deg, #fff9e6 0%, #ffe4a8 100%)',
      }}
      transition={{ duration: 0.4 }}
    />

    {/* Sliding knob */}
    <motion.div
      className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full flex items-center justify-center shadow-lg"
      animate={{
        x: theme === 'dark' ? 0 : 20,
        backgroundColor: theme === 'dark' ? '#1a1a1a' : '#fff',
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      <AnimatePresence mode="wait">
        {theme === 'dark' ? (
          <motion.div
            key="moon"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            transition={{ duration: 0.3 }}
          >
            <MoonIcon size={10} weight="fill" className="text-blue-300" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            transition={{ duration: 0.3 }}
          >
            <SunIcon size={10} weight="fill" className="text-amber-400" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>

    {/* Stars for dark mode */}
    <AnimatePresence>
      {theme === 'dark' && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-1 right-2 w-0.5 h-0.5 bg-white rounded-full"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            className="absolute top-2.5 right-4 w-0.5 h-0.5 bg-white rounded-full"
          />
        </>
      )}
    </AnimatePresence>

    <AnimatePresence>
      {theme === 'light' && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 0.4, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
          className="absolute top-1.5 left-2 w-3 h-1 bg-white rounded-full"
        />
      )}
    </AnimatePresence>
  </button>
</li>
        </ul>

        <button
          onClick={handleMenuToggle}
          className="relative md:hidden ml-50 w-8 h-8 flex items-center justify-center z-[1000000]"
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

        {menuOpen &&
          createPortal(
            <motion.div
              initial={{ opacity: 0, y: 1000 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: "easeInOut", duration: 0.3 }}
              className="fixed inset-0 backdrop-blur-3xl bg-[#ffffff14] z-[999999]"
              onClick={handleMenuToggle}
            >
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{duration: .75}} className="absolute bg-amber-500 w-[30%] h-[10%] top-0 right-0 blur-[200px]">

              </motion.span>
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{duration: .75}} className="absolute bg-white w-[30%] h-[10%] bottom-0 left-0 blur-[100px]">

              </motion.span>
              <ul className="flex flex-col w-full h-full gap-2 text-center items-center font-semibold justify-center">
                <li className="text-[var(--text-color)] text-[2.5rem] underline underline-offset-2 navLinks">
                  <a
                    href="#about"
                    onClick={(e) => handleHashNavigation(e, "#about")}
                  >
                    About
                  </a>
                </li>
                <li className="text-[var(--text-color)] text-[2.5rem] underline underline-offset-2  navLinks">
                  <Link href="/projects">Projects</Link>{" "}
                </li>
                <li className="text-[var(--text-color)] text-[2.5rem] underline underline-offset-2  navLinks">
                  <Link
                    href="/slices"
             
                  >
                    Slices
                  </Link>
                </li>
                <li>
                  <button
                    aria-label="theme-button"
                    onClick={toggleTheme}
                    className="relative w-14 h-7 rounded-full border border-[var(--border-color)]/30 bg-(--bg-color)/50 backdrop-blur-sm overflow-hidden group shadow-[inset_0_1px_3px_rgba(0,0,0,0.2)]"
                  >
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        background: theme === 'dark' 
                          ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
                          : 'linear-gradient(135deg, #fff9e6 0%, #ffe4a8 100%)',
                      }}
                      transition={{ duration: 0.4 }}
                    />
                    <motion.div
                      className="absolute top-1 left-1 w-5 h-5 rounded-full flex items-center justify-center shadow-lg"
                      animate={{
                        x: theme === 'dark' ? 0 : 24,
                        backgroundColor: theme === 'dark' ? '#1a1a1a' : '#fff',
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    >
                      <AnimatePresence mode="wait">
                        {theme === 'dark' ? (
                          <motion.div
                            key="moon"
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 90 }}
                            transition={{ duration: 0.3 }}
                          >
                            <MoonIcon size={12} weight="fill" className="text-blue-300" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="sun"
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 90 }}
                            transition={{ duration: 0.3 }}
                          >
                            <SunIcon size={12} weight="fill" className="text-amber-400" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                    <AnimatePresence>
                      {theme === 'dark' && (
                        <>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0.5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute top-1 right-3 w-0.5 h-0.5 bg-white rounded-full"
                          />
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0.3, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                            className="absolute top-2.5 right-5 w-0.5 h-0.5 bg-white rounded-full"
                          />
                        </>
                      )}
                    </AnimatePresence>
                  </button>
                </li>
              </ul>
            </motion.div>,
            document.body,
          )}
      </nav>    
    </div>
  );
}

export default Navbar;

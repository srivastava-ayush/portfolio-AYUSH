"use client";
import { motion } from "motion/react";
import Lenis from "lenis";
import dynamic from "next/dynamic";
import Navbar from "./ui/Navbar";
import { useCustomCursor } from "./ui/utils/useCursor";
import { useEffect, useState } from "react";
import Hero from "./ui/Landing_Sections/Hero";
import Projects from "./ui/Landing_Sections/Projects";
import OrangeRollingGame from "./ui/OrangeRollingGame";

import AboutMe from "./ui/Landing_Sections/AboutMe";

const TerminalWindow = dynamic(() => import("./ui/terminal/TerminalWindow"), { ssr: false });

function PageClient() {

  const [theme, setTheme] = useState("dark");
  const [gameOpen, setGameOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const cursorRef = useCustomCursor(".orgLogo");

  useEffect(() => {
    document.body.style.overflow = gameOpen || terminalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [gameOpen, terminalOpen]);

  useEffect(() => {
    if (!terminalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setTerminalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [terminalOpen]);


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
    <div
      data-theme={theme}
      className="w-full min-h-screen relative flex bg-grid-[#000]/[.030] flex-col items-center text-(--text-color) bg-(--bg-color)"
    >
      <div ref={cursorRef} className="custom-cursor"></div>

      <div className="relative w-full max-w-3xl z-10">
        <div className="hidden md:block absolute right-full top-0 bottom-0 w-5 bg-slant-pattern border-y border-l border-[var(--border-color)]" />
        <div
          className="w-full relative border border-[var(--border-color)] flex flex-col items-center"
        >
          <Navbar />

          {!gameOpen && (
            <motion.div
              layoutId="orange-game"
              transition={{ type: "spring", stiffness: 200, damping: 26 }}
              className="pointer-events-none absolute rounded-full w-full h-0.5 top-7 inset-x-0 mx-auto z-10 bg-[var(--border-color)]"
            />
          )}

          <motion.div   initial={{ filter: "blur(10px)" }}
          animate={{ filter: "blur(0px)" }}
          transition={{ duration: 1 }} className="w-full flex flex-col divide-y divide-[var(--border-color)]">
            <section className="relative w-full mt-12 border-t border-[var(--border-color)]">
          
              <div className="relative z-10">
                <Hero onPlay={() => setGameOpen(true)} onAskOrange={() => setTerminalOpen(true)} />
              </div>
            </section>
            <section className="w-full pt-[var(--section-gap)]">
              <Projects/>
            </section>
            <section className="w-full py-[var(--section-gap)]">
              <AboutMe/>
            </section>
          </motion.div>

          {gameOpen && (
            <motion.div
              layoutId="orange-game"
              transition={{ type: "spring", stiffness: 200, damping: 26 }}
              className="fixed inset-x-0 top-0 md:top-7 bottom-0 z-[99999] overflow-hidden bg-[var(--bg-color)]"
            >
              <OrangeRollingGame onClose={() => setGameOpen(false)} />
            </motion.div>
          )}

          {terminalOpen && (
            <div
              className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-6"
              data-lenis-prevent
            >
              {/* Backdrop — click to close */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setTerminalOpen(false)}
              />

              {/* Window */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                className="relative w-full max-w-5xl h-[85vh] rounded-md overflow-hidden border border-[var(--border-color)] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
              >
                <TerminalWindow bare onClose={() => setTerminalOpen(false)} initialMode="ai" />
              </motion.div>
            </div>
          )}
         </div>
        <div className="hidden  md:block absolute left-full top-0 bottom-0 w-5 bg-slant-pattern border-y border-r border-[var(--border-color)]" />
       </div>

    </div>
  );
}

export default PageClient;
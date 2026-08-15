"use client";
import { motion } from "motion/react";
import Lenis from "lenis";
import Navbar from "./ui/Navbar";
import { useCustomCursor } from "./ui/utils/useCursor";
import { useEffect, useState } from "react";
import Hero from "./ui/Landing_Sections/Hero";
import Projects from "./ui/Landing_Sections/Projects";
import OrangeRollingGame from "./ui/OrangeRollingGame";

import AboutMe from "./ui/Landing_Sections/AboutMe";

function PageClient() {

  const [theme, setTheme] = useState("dark");
  const [gameOpen, setGameOpen] = useState(false);
  const cursorRef = useCustomCursor(".orgLogo");

  useEffect(() => {
    document.body.style.overflow = gameOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [gameOpen]);


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
              className="pointer-events-none absolute top-7 inset-x-0 mx-auto z-10 h-1 w-16 bg-[var(--accent-color)]"
            />
          )}

          <motion.div   initial={{ filter: "blur(10px)" }}
          animate={{ filter: "blur(0px)" }}
          transition={{ duration: 1 }} className="w-full flex flex-col divide-y divide-[var(--border-color)]">
            <section className="relative w-full mt-12 border-t border-[var(--border-color)]">
          
              <div className="relative z-10">
                <Hero onPlay={() => setGameOpen(true)} />
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
         </div>
        <div className="hidden  md:block absolute left-full top-0 bottom-0 w-5 bg-slant-pattern border-y border-r border-[var(--border-color)]" />
       </div>

    </div>
  );
}

export default PageClient;
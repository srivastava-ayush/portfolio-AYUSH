"use client";
import { motion } from "motion/react";
import Lenis from "lenis";
import Navbar from "./ui/Navbar";
import { useCustomCursor } from "./ui/utils/useCursor";
import { useEffect, useState } from "react";
import Hero from "./ui/Landing_Sections/Hero";
import Projects from "./ui/Landing_Sections/Projects";
import AboutMe from "./ui/Landing_Sections/AboutMe";
import DotMatrix from "./ui/DotMatrix";

function PageClient() {

 const [theme, setTheme] = useState("dark");
 const cursorRef = useCustomCursor(".orgLogo");


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

      {/* <motion.span
        initial={{ opacity: 0, top: "-100px" }}
        animate={{ opacity: 1, top: 0 }}
        transition={{ duration: 1 }}
        className="fixed opacity-10  pointer-events-none z-0 top-0 left-0 w-[60%] h-24 bg-(--blob-color) blur-[200px]"
      /> */}

      
      <div className="relative w-full max-w-3xl z-10">
        <div className="hidden md:block absolute right-full top-0 bottom-0 w-5 bg-slant-pattern border-y border-l border-[var(--border-color)]" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full border border-[var(--border-color)] flex flex-col items-center"
        >
          <Navbar />

          <div className="w-full flex flex-col divide-y divide-[var(--border-color)]">
            <section className="relative w-full py-[var(--section-gap)] overflow-hidden">
              <DotMatrix />
              <div className="relative z-10">
                <Hero />
              </div>
            </section>
            <section className="w-full pt-[var(--section-gap)]">
              <Projects/>
            </section>
            <section className="w-full py-[var(--section-gap)]">
              <AboutMe/>
            </section>
          </div>

         </motion.div>
        <div className="hidden md:block absolute left-full top-0 bottom-0 w-5 bg-slant-pattern border-y border-r border-[var(--border-color)]" />
       </div>

    </div>
  );
}

export default PageClient;

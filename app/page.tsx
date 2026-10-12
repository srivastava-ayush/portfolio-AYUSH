"use client";
import { motion } from "motion/react";
import Lenis from "lenis";
import dynamic from "next/dynamic";
import Navbar from "./ui/Navbar";
import { useCustomCursor } from "./ui/utils/useCursor";
import { useEffect, useState } from "react";
import Hero from "./ui/Landing_Sections/Hero";
import Projects from "./ui/Landing_Sections/Projects";

import AboutMe from "./ui/Landing_Sections/AboutMe";
import { Container, Section } from "./ui/Landing_Sections/primitives";
import "./ui/Landing_Sections/tokens.css";

const TerminalWindow = dynamic(() => import("./ui/terminal/TerminalWindow"), { ssr: false });

function PageClient() {

  const [gameOpen, setGameOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const cursorRef = useCustomCursor();

  useEffect(() => {
    document.body.style.overflow = terminalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [terminalOpen]);

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
      className="landing-page w-full min-h-screen relative flex bg-grid-[#000]/[.030] flex-col items-center text-(--text-color) bg-(--bg-color)"
    >
      <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
        <span className="cursor-axis cursor-axis-x" />
        <span className="cursor-axis cursor-axis-y" />
        <span className="coordinate-crosshair" />
        <span className="cursor-coordinates" data-cursor-coordinates />
      </div>

      <Container className="z-10">
        <div className="hidden md:block absolute right-full top-0 bottom-0 w-5 bg-slant-pattern border-y border-l border-[var(--border-color)]" />
        <div
          className="w-full relative border border-[var(--border-color)] flex flex-col items-center"
        >
          <Navbar />

          <div className="pointer-events-none absolute rounded-full w-full h-0.5 top-7 inset-x-0 mx-auto z-10 bg-[var(--border-color)]" />

          <motion.div   initial={{ filter: "blur(10px)" }}
          animate={{ filter: "blur(0px)" }}
          transition={{ duration: 1 }} className="w-full flex flex-col divide-y divide-[var(--border-color)]">
            <section className="relative w-full mt-12 border-t border-[var(--border-color)]">
          
              <div className="relative z-10">
                <Hero gameOpen={gameOpen} onPlay={() => setGameOpen(true)} onCloseGame={() => setGameOpen(false)} onAskOrange={() => setTerminalOpen(true)} />
              </div>
            </section>
            <Section>
              <Projects/>
            </Section>
            <Section space="both">
              <AboutMe/>
            </Section>
          </motion.div>

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
       </Container>

    </div>
  );
}

export default PageClient;

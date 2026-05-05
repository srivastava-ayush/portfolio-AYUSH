"use client";
import { motion } from "motion/react";
import "./heroStyles.css";
import Lenis from "lenis";
import Navbar from "./ui/Navbar";
import { useCustomCursor } from "./ui/utils/useCursor";
import { useEffect, useState } from "react";
import Hero from "./Landing_Sections/Hero";
import Projects from "./Landing_Sections/Projects";
import Activity from "./Landing_Sections/Activity";
import AboutMe from "./Landing_Sections/AboutMe";

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
      className="w-full min-h-screen relative flex bg-grid-[#000]/[.030] flex-col items-center pt-40 md:pt-44 pb-16 text-(--text-color) bg-(--bg-color)"
    >
      <div ref={cursorRef} className="custom-cursor"></div>

      <Navbar />

      <motion.span
        initial={{ opacity: 0, top: "-100px" }}
        animate={{ opacity: 1, top: 0 }}
        transition={{ duration: 1 }}
        className="fixed pointer-events-none z-0 top-0 left-0 w-[60%] h-24 bg-(--blob-color) blur-[200px]"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-5xl flex flex-col justify-center items-center gap-24 md:gap-32 px-6"
      >
        {/* Main Hero Section */}
        <Hero/>

        <div className="max-w-3xl w-full flex flex-col justify-center items-center gap-24 md:gap-32 ">
          {/* Projects */}
        <div className="w-full md:h-[200vh]">
          <Projects/>
        </div>

          {/* Activity */}
        <Activity />

          {/* About Me */}
       <AboutMe/>

        </div>

       </motion.div>

  
    </div>
  );
}

export default PageClient;

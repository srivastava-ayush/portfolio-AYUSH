import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import {TextGenerateEffect} from "../ui/text-generate-effect";
import { useCallback, useMemo, useRef} from "react";
import HighlightedLink from "../ui/HighlightedLink";
import { SOCIAL_LINKS } from "../constants";
import orange from "../../public/orange.svg";
function Hero() {
 const headingWords = " Hi I'm Ayush - A Full Stack Engineer from India";
  const org = useRef<HTMLImageElement>(null);
  const handleScrollArrow = useCallback(() => {
    window.scrollTo({
      top: 700,
      behavior: "smooth",
    });
  }, []);
  const renderSocialIcons = useMemo(
    () =>
      SOCIAL_LINKS.map(({ href, icon, alt }) => (
        <a key={href} target="_blank" rel="noopener noreferrer" href={href}>
          <Image
            className="w-10 heroSocialLogos"
            src={icon}
            alt={alt}
            width={40}
            height={40}
          />
        </a>
      )),
    [],
  );
    return (
   <main className="main-hero-section-container text-center items-center justify-center flex flex-col gap-4 md:gap-8">
          <h1 className="hero-heading text-[var(--text-color)] text-[1.8rem] md:text-[2.8rem] inline text-center">
            <TextGenerateEffect className="inline tracking-wide" words={headingWords} />
            <Link href="/orange_rolling">
              <motion.img
                style={{
                  shapeRendering: "geometricPrecision",
                  transformOrigin: "center center",
                  backfaceVisibility: "hidden",
                }}
                initial={{
                  opacity: 0,
                  scale: 0,
                  y: 100,
                  x: 100,
                  filter: "blur(10px)",
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  x: 0,
                  filter: "blur(0px)",
                  rotate: [0, 360],
                }}
                transition={{
                  opacity: { duration: 0.8 },
                  scale: { duration: 0.8 },
                  y: { duration: 0.8 },
                  x: { duration: 0.8 },
                  filter: { duration: 0.8 },
                  rotate: {
                    repeat: Infinity,
                    duration: 30,
                    ease: "linear",
                    repeatType: "loop",
                  },
                }}
                ref={org}
                className="ml-4 inline w-12 md:w-17 orgLogo"
                src={orange.src || orange}
                alt="o"
              />
            </Link>
          </h1>

          <p className="hero-para text-lg md:text-2xl md:max-w-full text-(--secondary-text) text-shadow font-normal">
          Creating UIs that pop with clean design and code, built using <br/>
            <HighlightedLink name="TypeScript" img="/typescript.svg" /> ,{" "}
            <HighlightedLink name="React" img="/react-2.svg" /> ,{" "}
            <HighlightedLink name="Next.js" img="/nextjs.svg" /> ,{" "}
            <HighlightedLink name="Bun.js" img="/bun.svg" /> , and{" "}
            <HighlightedLink name="PostgreSQL" img="/postgresql.svg" /> .
          </p>

          {/* Socials & Resume */}
          <div className="social-container flex mt-6 md:mt-6">
            <div className="networks flex flex-col lg:flex-row-reverse justify-center items-center gap-4">
               <div className="netbox relative overflow-hidden bg-[var(--netbox-bg-color)] border border-[var(--border-color)]/50 rounded-lg flex gap-4 p-3 shadow-[inset_0_2px_8px_rgba(255,255,255,0.12),inset_0_-2px_6px_rgba(0,0,0,0.25),0_4px_20px_rgba(0,0,0,0.15)]">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                {renderSocialIcons}
              </div>

        
                      
              <a
                  onClick={() => window.open('/ayush_resume_intern.pdf', '_blank')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative overflow-hidden p-4 h-full flex items-center border border-[var(--border-color)]/50 bg-[var(--resume-btn-color)] w-full lg:w-auto text-center justify-center hover:bg-[#fdb3682f] text-(--text-color) hover:text-[var(--button-hover-text)] cursor-pointer rounded-lg transition duration-300 shadow-[inset_0_2px_8px_rgba(255,255,255,0.12),inset_0_-2px_6px_rgba(0,0,0,0.25),0_4px_20px_rgba(0,0,0,0.15)]"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    viewBox="0 0 384 512"
                    className="mr-2"
                    height="18"
                    width="18"
                  >
                    <path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm76.45 211.36l-96.42 95.7c-6.65 6.61-17.39 6.61-24.04 0l-96.42-95.7C73.42 337.29 80.54 320 94.82 320H160v-80c0-8.84 7.16-16 16-16h32c8.84 0 16 7.16 16 16v80h65.18c14.28 0 21.4 17.29 11.27 27.36z" />
                  </svg>
                  Resume
                </a>

            </div>
          </div>

          {/* Scroll Button */}
          <button className="scrollDown-btn" onClick={handleScrollArrow}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth=".17"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide scrollDownArrow lucide-move-down size-10 hover:cursor-pointer text-(--text-color)"
            >
              <path d="M8 18L12 22L16 18" />
            </svg>
          </button>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border-color)]/50 to-transparent" />
        </main>
  )
}

export default Hero
import { motion } from "motion/react";
import Link from "next/link";
import {TextGenerateEffect} from "../text-generate-effect";
import { useCallback, useRef} from "react";
import HighlightedLink from "../HighlightedLink";
import orange from "../../../public/icons/orange.svg";
import {
  GithubLogo,
  LinkedinLogo,
  InstagramLogo,
  XLogo,
  Envelope,
} from "@phosphor-icons/react";

const socialLinks = [
  { href: "https://github.com/srivastava-ayush", icon: GithubLogo, label: "GitHub" },
  { href: "https://www.linkedin.com/in/constayush/", icon: LinkedinLogo, label: "LinkedIn" },
  { href: "https://www.instagram.com/maihoonayush/", icon: InstagramLogo, label: "Instagram" },
  { href: "https://www.x.com/srivastava-ayush/", icon: XLogo, label: "X" },
  { href: "mailto:srivastava-ayush@outlook.com", icon: Envelope, label: "Mail" },
];

function Hero() {
   const headingWords = " Hi I'm Ayush - A Full Stack Engineer from India";
  const org = useRef<HTMLImageElement>(null);
  const handleScrollArrow = useCallback(() => {
    window.scrollTo({
      top: 700,
      behavior: "smooth",
    });
  }, []);
    return (
   <main className="main-hero-section-container  text-center items-center justify-center flex flex-col gap-4 md:gap-8">
          <div className="w-full border-t px-6  border-[var(--border-color)] pt-[var(--section-gap)]">
            <h1 className="hero-heading text-[1.8rem] md:text-[2.5rem] inline text-center">
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
                  whileHover={{
                    y: [0, -20, 0],
                    scale: [1, 1.25, 1],
                    transition: { duration: 0.5, ease: "easeOut" },
                  }}
                  whileTap={{
                    scale: [1, 0.85, 1.1, 1],
                    transition: { duration: 0.4 },
                  }}
                />
              </Link>
            </h1>
          </div>

          <p className="hero-para text-md md:text-xl px-6   md:max-w-full text-(--secondary-text) text-shadow font-normal">
          Creating UIs that pop with clean design and code, built using <br/>
            <HighlightedLink name="TypeScript" img="/icons/typescript.svg" /> ,{" "}
            <HighlightedLink name="React" img="/icons/react-2.svg" /> ,{" "}
            <HighlightedLink name="Next.js" img="/icons/nextjs.svg" /> ,{" "}
            <HighlightedLink name="Bun.js" img="/icons/bun.svg" /> , and{" "}
            <HighlightedLink name="PostgreSQL" img="/icons/postgresql.svg" /> .
          </p>

          {/* Socials & Resume */}
          <div className="flex justify-center px-6 md:pt-6  pt-10">
            <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full sm:w-auto">
              <div className="relative flex items-center justify-center gap-2.5 px-6 py-4 flex-1 bg-[var(--netbox-bg-color)] border border-[var(--border-color)]/50 rounded-lg shadow-[inset_0_2px_8px_rgba(255,255,255,0.12),inset_0_-2px_6px_rgba(0,0,0,0.25),0_4px_20px_rgba(0,0,0,0.15)]">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <a key={href} target="_blank" rel="noopener noreferrer" href={href} title={label}>
                    <Icon size={20} weight="fill" className="text-[var(--text-color)] opacity-70 hover:opacity-100 hover:scale-130   transition-transform  transition-opacity" />
                  </a>
                ))}
              </div>

              <a
                onClick={() => window.open('/misc/ayush_resume_intern.pdf', '_blank')}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center gap-2 px-5 py-2 flex-1 border border-[var(--border-color)]/50 bg-[var(--resume-btn-color)] hover:bg-[#fdb3682f] text-[var(--text-color)] cursor-pointer rounded-lg transition duration-300 shadow-[inset_0_2px_8px_rgba(255,255,255,0.12),inset_0_-2px_6px_rgba(0,0,0,0.25),0_4px_20px_rgba(0,0,0,0.15)]"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                <svg stroke="currentColor" fill="currentColor" viewBox="0 0 384 512" className="size-3.5">
                  <path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm76.45 211.36l-96.42 95.7c-6.65 6.61-17.39 6.61-24.04 0l-96.42-95.7C73.42 337.29 80.54 320 94.82 320H160v-80c0-8.84 7.16-16 16-16h32c8.84 0 16 7.16 16 16v80h65.18c14.28 0 21.4 17.29 11.27 27.36z" />
                </svg>
                <span className="text-sm font-mono">Resume</span>
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
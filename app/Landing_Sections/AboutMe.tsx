'use client';

import Link from "next/link";
import Image from "next/image";
import { TECH_STACK, SOCIAL_LINKS } from "../constants";
import { motion } from "motion/react";
import { useRef } from "react";
import orange from "../../public/orange.svg";


function AboutMe() {
    const org = useRef<HTMLImageElement>(null);
  return (
    <section id="about" className="relative w-full">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--border-color)]/50 to-transparent" />

      <div className="py-16">
        <div className="flex justify-between items-center mb-16">
          <h1 className="text-3xl md:text-[2.7rem] font-semibold text-(--text-color)">
            About me
            <span className="font-semibold text-[var(--accent-color)]">.</span>
          </h1>
        
        </div>

        <div className="flex flex-col gap-12 md:gap-16 mb-16">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <Link href="/terminal" className="flex-shrink-0">
              <Image
                src="/avatar.png"
                alt="me"
                width={160}
                height={160}
                className="rounded-md border border-[var(--border-color)]/30 object-cover hover:opacity-80 transition-opacity"
              />
            </Link>

            <div>
              <div className="space-y-4 text-lg   font-medium tracking-tight text-(--text-color)/60 leading-relaxed">
                <p>
                  I'm Ayush Srivastava / आयुष श्रीवास्तव, an engineer from India. I build clean, scalable apps using TypeScript, React/Next.js, Node (and Bun), and PostgreSQL, with tools like Tailwind, Zustand, and Framer Motion.
                </p>
                <p>
                  I like breaking systems to understand them and rebuilding them better. Outside of dev, I tinker with Linux (arch btw), Raspberry Pi, and Arduino.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-medium text-(--text-color)/50 uppercase tracking-widest mb-4">
              Education
            </h2>
            <div className="space-y-3 text-base text-(--text-color)/60">
              <div className="flex justify-between">
                <span>B.Tech in Computer Science</span>
                <span className="text-(--text-color)/30 font-mono text-sm whitespace-nowrap ml-4">2025 – 2028 | expected</span>
              </div>
              <div className="flex justify-between">
                <span>Diploma in CSE</span>
                <span className="text-(--text-color)/30 font-mono text-sm whitespace-nowrap ml-4">2022 – 2025 | 8.5 CGPA</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-medium text-(--text-color)/50 uppercase tracking-widest mb-4">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {TECH_STACK.map(({ icon, name }) => (
                <motion.div
                  key={name}
                  className="flex items-center gap-2 px-3 py-2 border border-[var(--border-color)]/30 text-sm text-(--text-color)/60"
                  whileHover={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}
                  transition={{ duration: 0.2 }}
                >
                  <Image unoptimized src={icon} alt={name} width={16} height={16} />
                  {name}
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-medium text-(--text-color)/50 uppercase tracking-widest mb-4">
              Contact
            </h2>
            <div className="flex  justify-between items-center  flex-wrap gap-4">
            <div className="flex flex-wrap gap-4 text-sm text-(--text-color)/40">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.alt}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent-color)] transition-colors flex items-center gap-1.5"
                >
                  <Image unoptimized src={link.icon} alt={link.alt} width={14} height={14} className="dark:brightness-0 dark:invert opacity-60" />
                  {link.alt}
                </a>
              ))}
              <a
                href="mailto:srivastava-ayush@outlook.com"
                className="hover:text-[var(--accent-color)] transition-colors"
              >
                Resume
              </a>
            </div>
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
                  scale: 1.3,
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
            </div>
          </div>
        </div>

        <footer className="flex justify-between items-center text-sm text-(--text-color)/25 pt-8 border-t border-[var(--border-color)]/20">
          <span>© 2025 Ayush Srivastava</span>
          <Link href="/terminal" className="glitch-link relative text-(--text-color)/40 hover:text-[var(--accent-color)] transition-colors" data-text="/terminal">
            /terminal
          </Link>
        </footer>
      </div>

      <style jsx global>{`
        .glitch-link {
          position: relative;
          display: inline-block;
        }
        .glitch-link::before,
        .glitch-link::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          background: inherit;
          opacity: 0;
        }
        .glitch-link::before {
          color: #0ff;
          clip-path: inset(0 0 50% 0);
          animation: glitch-anim-1 3s infinite linear alternate-reverse;
        }
        .glitch-link::after {
          color: #f0f;
          clip-path: inset(50% 0 0 0);
          animation: glitch-anim-2 3s infinite linear alternate-reverse;
        }
        @keyframes glitch-anim-1 {
          0%, 100% { clip-path: inset(0 100% 0 0); opacity: 0; }
          10% { clip-path: inset(15% 0 30% 0); transform: translateX(-2px); opacity: 0.8; }
          12% { clip-path: inset(45% 0 10% 0); transform: translateX(2px); opacity: 0.8; }
          14% { clip-path: inset(0 100% 0 0); opacity: 0; }
          40% { clip-path: inset(60% 0 5% 0); transform: translateX(-1px); opacity: 0.6; }
          42% { clip-path: inset(0 100% 0 0); opacity: 0; }
          80% { clip-path: inset(20% 0 50% 0); transform: translateX(3px); opacity: 0.7; }
          82% { clip-path: inset(0 100% 0 0); opacity: 0; }
        }
        @keyframes glitch-anim-2 {
          0%, 100% { clip-path: inset(0 100% 0 0); opacity: 0; }
          15% { clip-path: inset(35% 0 20% 0); transform: translateX(2px); opacity: 0.8; }
          17% { clip-path: inset(5% 0 60% 0); transform: translateX(-2px); opacity: 0.8; }
          19% { clip-path: inset(0 100% 0 0); opacity: 0; }
          50% { clip-path: inset(70% 0 10% 0); transform: translateX(-3px); opacity: 0.6; }
          52% { clip-path: inset(0 100% 0 0); opacity: 0; }
          85% { clip-path: inset(10% 0 40% 0); transform: translateX(1px); opacity: 0.7; }
          87% { clip-path: inset(0 100% 0 0); opacity: 0; }
        }
      `}</style>
    </section>
  );
}

export default AboutMe;

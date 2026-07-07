'use client';

import {
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { GitHubCalendar } from "react-github-calendar";
import GitHubStreak from "../ui/GitHubStreak";
import { TECH_STACK } from "../constants";
import { 
  GithubLogo,
  LinkedinLogo,
  InstagramLogo,
  XLogo,
  Envelope,
  Play,
  Folder,
  Terminal,
  Copy,
} from "@phosphor-icons/react";

const socialLinks = [
  { href: "https://github.com/srivastava-ayush", icon: GithubLogo, label: "GitHub" },
  { href: "https://www.linkedin.com/in/constayush/", icon: LinkedinLogo, label: "LinkedIn" },
  { href: "https://www.instagram.com/maihoonayush/", icon: InstagramLogo, label: "Instagram" },
  { href: "https://www.x.com/srivastava-ayush/", icon: XLogo, label: "X" },
  { href: "mailto:srivastava-ayush@outlook.com", icon: Envelope, label: "Mail" },
];

function AboutMe() {
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    const update = () => setDateStr(new Date().toLocaleString("en-US"));
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `@keyframes breathe{0%,100%{border-color:var(--border-color)}20%,80%{border-color:var(--secondary-text)}}`;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  const debugInfo = [
    { label: "", value: "127.0.0.1" },
    { label: "", value: "3al6ms" },
    { label: "", value: "Unknown" },
    { label: "", value: "UP" },
    { label: "", value: "IN" },
    { label: "", value: "Arch Linux" },
    { label: "", value: dateStr, wide: true },
    { label: "", value: "1.082k visitors" },
  ];

  return (
    <section id="about" className="relative w-full scroll-mt-7">
      <div className="border border-[var(--border-color)]  relative">
       
       

        {/* Metadata bar - top right */}
        <div className="absolute z-99 top-0 right-0 text-xs bg-[var(--bg-color)]  text-[var(--secondary-text)] flex justify-end flex-wrap items-center z-10">
          {debugInfo.map((item, i) => (
            <span
              key={i}
              className={`px-2 border-l border-b border-[var(--border-color)] h-6 flex items-center font-mono text-[10px] ${item.wide ? "w-40" : "w-fit"}`}
            >
              {item.value}
            </span>
          ))}
          <Link
            href="/orange_rolling"
            className="px-2 border-l hover:cursor-crosshair  border-b border-[var(--border-color)] h-6 flex items-center justify-center gap-1 hover:opacity-80 transition-opacity"
          >
            <span className="size-3 text-[var(--accent-color)] flex items-center justify-center">
              <Play weight="fill" />
            </span>
            <span className="text-[10px] font-mono text-[var(--accent-color)]">Play</span>
          </Link>
        </div>

        {/* Main content */}
        <div className="p-4 md:px-6 flex flex-col justify-center z-10 relative pt-16 md:pt-16 overflow-hidden">
       

          {/* Name + Role + Bio + GitHub with dot matrix bg */}
          <div className="relative">
       
            {/* GitHub Activity Calendar */}
            <div className="mb-5 border border-[var(--border-color)] bg-[var(--glass-bg-color)] p-3 pt-8 relative z-[1] overflow-x-auto">
              <GitHubStreak username="srivastava-ayush" />
              <GitHubCalendar
                username="srivastava-ayush"
                theme={{
                  light: ["#fff", "#fff", "#fff", "#fff", "#fff"],
                  dark: ["#161b22", "#555555", "#888888", "#BBBBBB", "#F4F4F4"],
                }}
                fontSize={10}
                showTotalCount={false}
              />
              <GitHubStreak username="srivastava-ayush" />
            </div>
             {/* Status */}
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] animate-pulse" />
            <span className="text-xs font-mono text-[var(--text-color)]">
              Open to work
            </span>
          </div>  <div className="flex items-center gap-2 sm:gap-3 md:gap-4 relative z-[1]">
              <Link href="/terminal" className="shrink-0">
                <Image
                  unoptimized
                  src="/avatar.png"
                  alt="avatar"
                  width={48}
                  height={48}
                  className="rounded-sm opacity-60 hover:opacity-100 transition-opacity"
                />
              </Link>
              <h1 className="text-3xl md:text-6xl flex gap-2 sm:gap-3 md:gap-4 items-baseline font-mono font-bold">
                <span className="text-[var(--text-color)]">Ayush</span>
                <span className="text-[var(--secondary-text)]">Srivastava</span>
              </h1>
              <span className="text-xs font-mono text-[var(--secondary-text)]/50 mt-0.5 block">
                आयुष श्रीवास्तव
              </span>
            </div>

            {/* Role */}
            <h3 className="text-xl md:text-xl font-mono font-semibold mt-1 relative z-[1]">
              <span className="text-[var(--text-color)]">Full-Stack</span>
              <span className="text-[var(--secondary-text)] ml-2">Engineer</span>
            </h3>

            {/* Bio */}
            <p className="text-sm text-[var(--secondary-text)] mt-3 mb-2 leading-relaxed max-w-[600px] font-mono relative z-[1]">
              <span className="text-[var(--secondary-text)]">
                Engineer from India specializing in the{" "}
              </span>
              <span className="font-semibold text-[var(--text-color)]">
                TypeScript/Node.js ecosystem
              </span>
              <span className="text-[var(--secondary-text)]">
                , building scalable applications with a focus on clean code and
                developer experience. I work across the{" "}
              </span>
              <span className="font-semibold text-[var(--text-color)]">full stack</span>
              <span className="text-[var(--secondary-text)]"> — from </span>
              <span className="font-semibold text-[var(--text-color)]">
                backend APIs
              </span>
              <span className="text-[var(--secondary-text)]"> and </span>
              <span className="font-semibold text-[var(--text-color)]">database design</span>
              <span className="text-[var(--secondary-text)]">
                {" "}to responsive{" "}
              </span>
              <span className="font-semibold text-[var(--text-color)]">
                frontend interfaces
              </span>
              <span className="text-[var(--secondary-text)]">
                , using React, Next.js, Bun, and PostgreSQL.
              </span>
              <br />
              

          
                Most of what I build is shaped by one question:<span className="text-[var(--text-color)] italic"> does this stay fast and cost less as it scales?
              </span>  </p>
          </div>

       
        </div>
    {/* Education */}
          <div className="mt-10 mb-8">
            <div className="flex items-center w-full border-t border-b border-[var(--border-color)] mb-3">
              <span className="px-2 border-r border-[var(--border-color)] h-6 flex items-center font-mono text-[10px] text-[var(--secondary-text)]">$</span>
              <span className="px-2 h-6 flex items-center font-mono text-[10px] text-[var(--secondary-text)]">education --verbose</span>
            </div>
            <div className="border border-[var(--border-color)]/60 bg-[var(--glass-bg-color)] divide-y divide-[var(--border-color)]">
              <div className="flex justify-between items-center px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-mono text-[var(--secondary-text)]">◆</span>
                  <span className="text-xs font-mono text-[var(--text-color)]">B.Tech in Computer Science</span>
                </div>
                <span className="text-[10px] font-mono text-[var(--secondary-text)]/60 whitespace-nowrap ml-3">
                  2025 – 2028 | expected
                </span>
              </div>
              <div className="flex justify-between items-center px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-mono text-[var(--secondary-text)]">◆</span>
                  <span className="text-xs font-mono text-[var(--text-color)]">Diploma in CSE</span>
                </div>
                <span className="text-[10px] font-mono text-[var(--secondary-text)]/60 whitespace-nowrap ml-3">
                  2022 – 2025 | 8.5 CGPA
                </span>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mt-10 mb-10">
            <div className="flex items-center w-full border-t border-b border-[var(--border-color)] mb-3">
              <span className="px-2 border-r border-[var(--border-color)] h-6 flex items-center font-mono text-[10px] text-[var(--secondary-text)]">$</span>
              <span className="px-2 h-6 flex items-center font-mono text-[10px] text-[var(--secondary-text)]">tech-stack --list</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {TECH_STACK.map(({ icon, name }, i) => (
                <div
                  key={name}
                  style={{
                    animation: `breathe 4s ease-in-out infinite`,
                    animationDelay: `${i * 0.03}s`,
                  }}
                  className="border border-dotted border-[var(--border-color)]/60 bg-[var(--glass-bg-color)] px-3 py-1.5 flex items-center gap-2"
                >
                  {icon ? (
                    <Image unoptimized src={icon} alt={name} width={14} height={14} className="opacity-50 dark:brightness-0 dark:invert" />
                  ) : (
                    <span className="text-[10px] text-[var(--secondary-text)] opacity-50 font-mono">&gt;</span>
                  )}
                  <span className="text-[11px] font-mono text-[var(--secondary-text)]">{name}</span>
                </div>
              ))}
            </div>
          </div>
        {/* Social + Buttons section */}
        <div className="border-y border-[var(--border-color)] relative">
         
          <div className="flex items-center w-full">
            <div className="w-4 md:w-6 shrink-0" />
            <div className="flex items-center border-x border-[var(--border-color)]">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 text-[var(--text-color)] hover:text-[var(--text-color)] transition-all duration-200 border-r border-[var(--border-color)] last:border-r-0"
                  >
                    <Icon size={18} weight="fill" className="opacity-80  hover:opacity-100 transition-opacity" />
                  </a>
                );
              })}
            </div>
            <div className="absolute top-0 bottom-0 right-4 md:right-6 flex items-center">
              <Link
                href="/projects"
                className="flex items-center gap-1.5 px-3 h-full border-x border-[var(--border-color)] font-mono text-[11px] text-[var(--secondary-text)] hover:text-[var(--text-color)] hover:bg-[var(--hover-color)] transition-all duration-200"
              >
                <Folder size={14} />
                <span>Projects</span>
              </Link>
              <Link
                href="/terminal"
                className="hidden md:flex items-center gap-1.5 px-3 h-full border-x border-[var(--border-color)] font-mono text-[11px] text-[var(--secondary-text)] hover:text-[var(--text-color)] hover:bg-[var(--hover-color)] transition-all duration-200"
              >
                <Terminal size={14} />
                <span>Terminal</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom curl command */}
        <div className="border-y border-[var(--border-color)] relative">
          <div className="flex items-center w-full">
            <div className="w-4 md:w-6 shrink-0" />
            <div className="w-full flex justify-between items-center gap-4 py-2">
              <p className="px-3 py-1.5 h-9 flex items-center border-x border-[var(--border-color)] text-[var(--secondary-text)] font-mono text-xs">
                constayush@gmail.com
              </p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    "constayush@gmail.com"
                  );
                }}
                className="flex items-center justify-center gap-2 px-3 h-9 border-x border-[var(--border-color)] text-[var(--secondary-text)] hover:text-[var(--text-color)] hover:bg-[var(--hover-color)] transition-all duration-200 font-mono text-xs"
              >
                <Copy size={14} />
                <span className="hidden sm:inline">Copy</span>
              </button>
            </div>
            <div className="w-4 md:w-6 shrink-0" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;

"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import Lenis from "lenis";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowLeft, ArrowUp } from "lucide-react";
import { PROJECTS, SIDE_QUESTS } from "../constants";
import Navbar from "../ui/Navbar";
import CustomCursor from "../ui/CustomCursor";
import ProjectsGallery from "./ProjectsGallery";
import { playClickSound, unlockSound } from "../ui/sound";
import "./orange.css";

type QuestImage = { src: string; desc?: string };
type QuestEntry = { title: string; para?: string; imgs?: QuestImage[] };
type Quest = { category: string; banner?: string; entries: QuestEntry[]; number: string; kind?: "projects" };

const options: Quest[] = [
  ...SIDE_QUESTS.map((quest, index) => ({
    ...quest,
    number: String(index + 1).padStart(2, "0"),
  })),
  {
    category: "Projects",
    banner: PROJECTS[0]?.projectImg?.src,
    entries: [],
    number: String(SIDE_QUESTS.length + 1).padStart(2, "0"),
    kind: "projects",
  },
];

const total = options.length;
const projectsIndex = total - 1;
const visibleReach = 3.6;

function wrapped(index: number) {
  return ((index % total) + total) % total;
}

function offsetFrom(index: number, position: number) {
  let offset = (index - position) % total;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
}

export default function OrangeDial() {
  const [target, setTarget] = useState(0);
  const [position, setPosition] = useState(0);
  const [dialOpen, setDialOpen] = useState(false);
  const positionRef = useRef(0);
  const velocityRef = useRef(0);
  const shouldReduceMotion = useReducedMotion();
  const selected = wrapped(Math.round(position));
  const selectOption = (index: number) => {
    setTarget((current) => current + Math.round(offsetFrom(index, current)));
    setDialOpen(false);
    const hash = index === projectsIndex ? "#projects" : "";
    if (window.location.hash !== hash) {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}${hash}`);
    }
  };
  const dialRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const wheelAmount = useRef(0);
  const lastWheelStep = useRef(0);
  const dragRef = useRef<{ pointerId: number; startY: number; lastY: number; lastStep: number; moved: boolean } | null>(null);
  const suppressClickRef = useRef(false);
  const active = options[selected];

  useEffect(() => {
    const syncHash = () => {
      const index = window.location.hash === "#projects" ? projectsIndex : 0;
      setTarget((current) => current + Math.round(offsetFrom(index, current)));
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("popstate", syncHash);
    return () => {
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("popstate", syncHash);
    };
  }, []);

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [selected]);

  useEffect(() => {
    let frameId = 0;
    let last = 0;
    const frame = (time: number) => {
      const dt = last ? Math.min((time - last) / 1000, 0.05) : 1 / 60;
      last = time;
      const frequency = (2 * Math.PI) / 0.34;
      velocityRef.current += (frequency ** 2 * (target - positionRef.current) - 2 * frequency * velocityRef.current) * dt;
      positionRef.current += velocityRef.current * dt;
      if (Math.abs(target - positionRef.current) < 0.002 && Math.abs(velocityRef.current) < 0.01) {
        positionRef.current = target;
        velocityRef.current = 0;
      }
      setPosition(positionRef.current);
      if (positionRef.current !== target) frameId = requestAnimationFrame(frame);
    };
    if (positionRef.current !== target) frameId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(frameId);
  }, [target]);

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

  useEffect(() => {
    const dial = dialRef.current;
    if (!dial) return;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      unlockSound();
      const delta = event.deltaMode === 1 ? event.deltaY * 16 : event.deltaY;
      if (Math.sign(delta) !== Math.sign(wheelAmount.current)) wheelAmount.current = 0;
      wheelAmount.current += delta;
      const now = performance.now();
      if (Math.abs(wheelAmount.current) >= 1 && now - lastWheelStep.current > 40) {
        const direction = Math.sign(wheelAmount.current);
        setTarget((current) => current - direction);
        playClickSound();
        wheelAmount.current = 0;
        lastWheelStep.current = now;
      }
    };
    dial.addEventListener("wheel", onWheel, { passive: false });
    return () => dial.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      const element = event.target as HTMLElement;
      if (element.closest(".orange-content, input, textarea, select, [contenteditable], a")) return;
      if (element.closest("button") && !element.closest(".orange-dial")) return;
      if (event.key === "j" || event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        unlockSound();
        setTarget((current) => current - 1);
        playClickSound();
      } else if (event.key === "k" || event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        unlockSound();
        setTarget((current) => current + 1);
        playClickSound();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!dialOpen) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDialOpen(false);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [dialOpen]);

  useEffect(() => {
    if (dialOpen) return;
    let start: { x: number; y: number } | null = null;
    const onTouchStart = (event: TouchEvent) => {
      start = null;
      if (window.matchMedia("(min-width: 1024px)").matches || event.touches.length !== 1) return;
      if (event.target instanceof Element && event.target.closest(".overflow-x-auto")) return;
      const touch = event.touches[0];
      if (touch.clientX >= window.innerWidth - 64) start = { x: touch.clientX, y: touch.clientY };
    };
    const onTouchEnd = (event: TouchEvent) => {
      if (!start || event.changedTouches.length !== 1) return;
      const touch = event.changedTouches[0];
      const dx = touch.clientX - start.x;
      const dy = touch.clientY - start.y;
      if (dx < -60 && Math.abs(dx) > Math.abs(dy) * 1.5) setDialOpen(true);
      start = null;
    };
    const onTouchCancel = () => { start = null; };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchCancel);
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchCancel);
    };
  }, [dialOpen]);

  useEffect(() => {
    if (window.matchMedia("(min-width: 1024px)").matches) return;
    const id = requestAnimationFrame(() => setDialOpen(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const onPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    unlockSound();
    suppressClickRef.current = false;
    dragRef.current = { pointerId: event.pointerId, startY: event.clientY, lastY: event.clientY, lastStep: 0, moved: false };
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    drag.lastY = event.clientY;
    if (!drag.moved && Math.abs(drag.startY - event.clientY) > 8) {
      drag.moved = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    if (!drag.moved) return;
    const step = Math.trunc((drag.startY - event.clientY) / 48);
    if (step !== drag.lastStep) {
      const delta = step - drag.lastStep;
      drag.lastStep = step;
      setTarget((current) => current + delta);
      playClickSound();
    }
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    if (drag.moved) {
      if (drag.lastStep === 0 && Math.abs(drag.startY - drag.lastY) >= 24) {
        setTarget((current) => current + Math.sign(drag.startY - drag.lastY));
        playClickSound();
      }
      suppressClickRef.current = true;
      window.setTimeout(() => { suppressClickRef.current = false; }, 0);
    }
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    dragRef.current = null;
  };

  return (
    <main className="orange-page flex min-h-dvh flex-col items-center text-(--sq-fg)">
      <CustomCursor />
      <div className="w-full max-w-[57.6rem]">
      <Navbar onSectionNavigate={() => selectOption(0)} />

      <div className="orange-split flex flex-col pt-16 md:pt-0 lg:grid lg:grid-cols-[30%_70%]">
        <button
          type="button"
          aria-label={dialOpen ? "Close dial" : "Open dial"}
          aria-controls="side-quests-dial"
          aria-expanded={dialOpen}
          onClick={() => setDialOpen((open) => !open)}
          className="orange-dial-toggle fixed right-0 top-1/2 z-[60] flex h-14 w-10 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-l-md border border-r-0 border-[var(--sq-line-strong)] bg-[var(--bg-color)] font-mono text-[10px] text-[var(--sq-text-dim)] shadow-lg lg:hidden"
        >
          <ArrowLeft size={18} className={`text-[#ff8a23] transition-transform ${dialOpen ? "rotate-180" : ""}`} />
          <span>{active.number}</span>
        </button>
        {dialOpen && (
          <button type="button" aria-label="Close dial" onClick={() => setDialOpen(false)} className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" />
        )}
        <section
          id="side-quests-dial"
          aria-label="Rotating option selector"
          aria-roledescription="carousel"
          ref={dialRef}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={() => { dragRef.current = null; suppressClickRef.current = false; }}
          onClickCapture={(event) => {
            if (suppressClickRef.current) {
              event.preventDefault();
              event.stopPropagation();
              suppressClickRef.current = false;
            }
          }}
          className={`orange-dial h-[var(--dial-height)] lg:relative lg:block lg:border-r lg:border-dotted lg:border-[var(--sq-line-strong)] ${dialOpen ? "fixed inset-x-3 top-1/2 z-50 -translate-y-1/2 lg:inset-auto lg:top-auto lg:translate-y-0" : "hidden"}`}
        >
          <div className="orange-dial-clip">
          <motion.div
            className="orange-dial-spin"
            initial={{ rotate: 0 }}
            animate={{ rotate: shouldReduceMotion ? 0 : 360 }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          >
          <div className="orange-orbit" aria-hidden="true">
            <svg className="orange-orbit-arc" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 100 0 C 44.77 0 0 22.39 0 50 C 0 77.61 44.77 100 100 100" />
            </svg>
            <div className="orange-orbit-line orange-orbit-line-inner" />
          </div>
          <div className="orange-selection-line" aria-hidden="true" />
          {options.flatMap((option, index) => {
            const turn = Math.round(position / total);
            return [turn - 1, turn, turn + 1].map((loop) => {
            const offset = index + loop * total - position;
            if (Math.abs(offset) >= visibleReach) return null;
            const angle = offset * 0.32;
            const edgeOpacity = offset >= 0
              ? Math.min(1, Math.max(0, (visibleReach - offset) / 0.5))
              : Math.min(1, Math.max(0, (offset + 2.5) / 0.5));
            const isActive = index === selected && Math.abs(offset) < 0.5;
            const accessible = Math.abs(offset - offsetFrom(index, position)) < 0.001 && edgeOpacity > 0.1;
            return (
              <button
                key={`${option.number}-${loop}`}
                type="button"
                onClick={() => selectOption(index)}
                aria-label={`Select ${option.category}`}
                aria-current={isActive ? "true" : undefined}
                aria-hidden={!accessible}
                tabIndex={accessible ? 0 : -1}
                style={{
                  zIndex: isActive ? 5 : 3 - Math.abs(offset),
                  pointerEvents: edgeOpacity > 0.15 ? "auto" : "none",
                  opacity: (isActive ? 1 : 0.82) * edgeOpacity,
                  transform: `translate(-50%, -50%) translate(calc(var(--orbit-radius) * ${(-Math.cos(angle)).toFixed(5)}), calc(var(--orbit-step) * ${(Math.sin(angle) * 2.1).toFixed(5)})) rotate(${(-angle * 0.55 * 180 / Math.PI).toFixed(3)}deg) scale(${(isActive ? 1 : 0.92).toFixed(3)})`,
                }}
                className={`orange-card absolute left-[var(--orbit-origin)] top-1/2 flex aspect-video w-[var(--card-width)] flex-col justify-between overflow-hidden border p-2.5 text-left shadow-2xl transition-colors ${isActive ? "border-[#ff8a23] bg-[var(--sq-card-active)]" : "border-[var(--sq-line-strong)] bg-[var(--sq-card)] hover:border-[var(--sq-hover-border)]"}`}
              >
                {option.banner && (
                  <>
                    <Image unoptimized src={option.banner} alt="" fill sizes="150px" className="pointer-events-none object-cover" />
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25" />
                  </>
                )}
                <span className={`relative flex justify-between font-mono text-[9px] tracking-[0.1em] ${option.banner ? "text-white/75" : "text-[var(--sq-text-mid)]"}`}><span>{option.kind === "projects" ? "WORK" : "SIDE QUEST"}</span><span>{option.number}</span></span>
                <span className={`relative mt-1 text-sm font-semibold leading-tight tracking-tight capitalize ${option.banner ? "text-white" : "text-[var(--sq-text-strong)]"}`}>{option.category}</span>
              </button>
            );
            });
          })}
          </motion.div>
          </div>
          <Image
            src="/icons/orange.svg"
            alt=""
            width={56}
            height={56}
            aria-hidden="true"
            className="orange-orbit-center"
          />
        </section>

        <section ref={contentRef} data-lenis-prevent aria-live="polite" className="orange-content relative min-w-0 font-mono lg:h-[var(--dial-height)] lg:overflow-y-auto lg:overscroll-contain">
          <div className="sticky top-16 z-20 border-b border-[var(--sq-line)] bg-[var(--sq-surface-header)] px-4 backdrop-blur-md md:top-7 md:px-6 lg:top-0">
            <div className="flex h-9 items-center justify-between gap-3 text-[11px] text-[var(--sq-text-mid)]">
              <span className="truncate"><span className="text-[var(--tui-green)]">$</span> cat {active.category.toLowerCase().replaceAll(" ", "-")}.log</span>
              <span className="shrink-0 text-[var(--sq-text-faint)]">{active.number}/{String(total).padStart(2, "0")}</span>
            </div>
          </div>
          <div className="px-4 pb-8 pt-7 md:px-6">
            <AnimatePresence mode="wait">
              <motion.div key={active.number} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <h1 className="text-[clamp(1.2rem,2.4vw,1.7rem)] font-semibold leading-tight tracking-[-0.04em] text-[var(--sq-fg)]"><span className="mr-2.5 text-[#ff8a23]">&gt;</span>{active.category}</h1>
                {active.banner && active.kind !== "projects" && (
                  <figure className="mt-6 border border-[var(--sq-line-strong)] bg-[var(--sq-inset)]">
                    <figcaption className="border-b border-[var(--sq-line)] px-3 py-2 text-[10px] uppercase tracking-[0.12em] text-[var(--sq-text-faint)]">+ attachment / {active.category.toLowerCase().replaceAll(" ", "-")}.webp</figcaption>
                    <div className="relative aspect-[16/5] w-full overflow-hidden">
                      <Image unoptimized src={active.banner} alt={`${active.category} banner`} fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
                    </div>
                  </figure>
                )}
                {active.kind === "projects" ? <ProjectsGallery /> : (
                  <div className="mt-6 border-t border-[var(--sq-line-strong)]">
                    {active.entries.map((entry, index) => !entry.para && !entry.imgs ? (
                      <p key={entry.title} className="border-b border-[var(--sq-line)] py-4 text-xs leading-relaxed text-[var(--sq-text-dim)]"><span className="mr-2 text-[var(--tui-green)]">#</span>{entry.title}</p>
                    ) : (
                      <article key={entry.title} className="border-b border-[var(--sq-line)] py-5">
                        <div className="flex gap-3 text-sm leading-snug"><span className="shrink-0 text-[var(--tui-accent-muted)]">[{String(index + 1).padStart(2, "0")}]</span><h2 className="font-semibold text-[var(--sq-text-strong)]">{entry.title}</h2></div>
                        {entry.para && <p className="mt-3 pl-11 text-xs leading-[1.85] text-[var(--sq-text-mid)]">{entry.para}</p>}
                        {entry.imgs && entry.imgs.length > 0 && (
                          <div className="mt-4 grid grid-cols-2 gap-2 pl-0 sm:grid-cols-3 sm:pl-11">
                            {entry.imgs.map((image) => (
                              <figure key={image.src} className="min-w-0 border border-[var(--sq-line)] bg-[var(--sq-inset)]">
                                <div className="relative aspect-video overflow-hidden">
                                  <Image unoptimized src={image.src} alt={image.desc || entry.title} fill sizes="(min-width: 1024px) 200px, 45vw" className="object-cover" />
                                </div>
                                {image.desc && <figcaption className="border-t border-[var(--sq-line)] px-2 py-1.5 text-[10px] text-[var(--sq-text-faint)]">{image.desc}</figcaption>}
                              </figure>
                            ))}
                          </div>
                        )}
                      </article>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-t border-dotted border-[var(--sq-line-strong)] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--sq-text-faint)] md:px-5">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="flex flex-col rounded-full border border-[var(--sq-line-strong)] p-1"><ArrowUp size={11} /><ArrowDown size={11} /></span>
            <span className="lg:hidden">Open dial to swipe</span>
            <span className="hidden lg:inline">Scroll / drag / swipe</span>
            <span className="text-[#ff8a23]">{active.number} — {String(total).padStart(2, "0")}</span>
          </div>
          <div className="flex flex-col gap-1.5 pl-6 text-[var(--sq-text-dim)]">
            <div className="flex items-center gap-1.5">
              <kbd className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-[3px] border border-[var(--sq-line-strong)] bg-[var(--sq-header-tint)] px-1 text-[10px] leading-none text-[#9db78c]">J</kbd>
              <kbd className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-[3px] border border-[var(--sq-line-strong)] bg-[var(--sq-header-tint)] px-1 text-[10px] leading-none text-[#9db78c]">↓</kbd>
              <kbd className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-[3px] border border-[var(--sq-line-strong)] bg-[var(--sq-header-tint)] px-1 text-[10px] leading-none text-[#9db78c]">→</kbd>
              <span className="ml-1">rotate down</span>
            </div>
            <div className="flex items-center gap-1.5">
              <kbd className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-[3px] border border-[var(--sq-line-strong)] bg-[var(--sq-header-tint)] px-1 text-[10px] leading-none text-[#9db78c]">K</kbd>
              <kbd className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-[3px] border border-[var(--sq-line-strong)] bg-[var(--sq-header-tint)] px-1 text-[10px] leading-none text-[#9db78c]">↑</kbd>
              <kbd className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-[3px] border border-[var(--sq-line-strong)] bg-[var(--sq-header-tint)] px-1 text-[10px] leading-none text-[#9db78c]">←</kbd>
              <span className="ml-1">rotate up</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2" aria-label="Select option">
          {options.map((option, index) => (
            <button key={option.number} type="button" onClick={() => selectOption(index)} aria-label={`Select ${option.category}`} aria-current={index === selected ? "true" : undefined} className={`border px-2.5 py-1.5 text-[10px] uppercase tracking-wide transition-colors ${index === selected ? "border-[var(--sq-hover-border)] bg-[var(--sq-option-active-bg)] text-[var(--sq-option-active-fg)]" : "border-[var(--sq-line)] text-[var(--sq-text-dim)] hover:border-[var(--sq-hover-border)] hover:text-[var(--sq-fg)]"}`}>[{option.number}] {option.category}</button>
          ))}
        </div>
      </div>
      </div>
    </main>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import ScrollKnob from "./ScrollKnob";

export default function BuildLogsScroll({ children, contentClassName = "" }: { children: React.ReactNode; contentClassName?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const area = scrollRef.current;
    const content = contentRef.current;
    if (!area || !content) return;

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const available = area.scrollHeight - area.clientHeight;
        setProgress(available > 0 ? area.scrollTop / available : 0);
      });
    };
    const observer = new ResizeObserver(update);
    observer.observe(area);
    observer.observe(content);
    area.addEventListener("scroll", update, { passive: true });
    update();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      area.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <main className="w-full flex flex-col lg:h-[clamp(620px,calc(100dvh-4rem),680px)]">
      <div className="relative flex-1 min-h-0">
        <div ref={scrollRef} className="lg:h-full lg:overflow-y-auto lg:overscroll-contain">
          <div ref={contentRef} className={contentClassName}>{children}</div>
        </div>
        <ScrollKnob progress={progress} className="hidden lg:block" />
      </div>
    </main>
  );
}

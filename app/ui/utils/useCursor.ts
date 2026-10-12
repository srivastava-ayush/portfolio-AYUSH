import { useRef, useEffect } from "react";

export const useCustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const coordinates = cursor.querySelector<HTMLElement>("[data-cursor-coordinates]");
    let rafId: number | null = null;
    let currentX = 0;
    let currentY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      currentX = e.clientX;
      currentY = e.clientY;
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        cursor.style.setProperty("--cursor-x", `${currentX}px`);
        cursor.style.setProperty("--cursor-y", `${currentY}px`);
        cursor.classList.add("show");
        cursor.classList.toggle("flip-x", currentX > window.innerWidth - 130);
        cursor.classList.toggle("flip-y", currentY > window.innerHeight - 50);
        if (coordinates) coordinates.textContent = `X ${Math.round(currentX)}  Y ${Math.round(currentY)}`;
        rafId = null;
      });
    };

    const handleMouseLeave = () => cursor.classList.remove("show");

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return cursorRef;
};

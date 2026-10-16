"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

export type ExpandedImage = { src: string; alt: string; caption?: string };

export default function ImageLightbox({ image, onClose }: { image: ExpandedImage; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        event.preventDefault();
        closeRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.22 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-2 text-white sm:p-4"
    >
      <button
        ref={closeRef}
        type="button"
        aria-label="Close image"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full border border-white/30 bg-black/60 p-2 text-white hover:border-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff8a23] sm:right-8 sm:top-8"
      >
        <X size={22} />
      </button>
      <motion.figure
        onClick={(event) => {
          if (!(event.target instanceof HTMLImageElement)) return;
          const { naturalWidth, naturalHeight } = event.target;
          if (!naturalWidth || !naturalHeight) return;
          const bounds = event.target.getBoundingClientRect();
          const scale = Math.min(bounds.width / naturalWidth, bounds.height / naturalHeight);
          const width = naturalWidth * scale;
          const height = naturalHeight * scale;
          if (Math.abs(event.clientX - (bounds.left + bounds.width / 2)) <= width / 2 &&
              Math.abs(event.clientY - (bounds.top + bounds.height / 2)) <= height / 2) {
            event.stopPropagation();
          }
        }}
        initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.97 }}
        transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.2, 0.8, 0.2, 1] }}
        className="flex w-[min(88vw,960px)] max-h-full flex-col items-center gap-2"
      >
        <div className="relative h-[min(70dvh,650px)] w-full">
          <Image unoptimized src={image.src} alt={image.alt} fill sizes="100vw" className="object-contain" />
        </div>
        {image.caption && <figcaption className="max-w-3xl text-center font-mono text-xs text-white/70">{image.caption}</figcaption>}
      </motion.figure>
    </motion.div>,
    document.body,
  );
}

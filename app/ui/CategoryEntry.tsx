"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

type EntryImg = { src: string; desc?: string };

export default function CategoryEntry({ title, para, imgs }: { title: string; para: string; imgs?: EntryImg | EntryImg[] }) {
  const [selectedImg, setSelectedImg] = useState<EntryImg | null>(null);
  const images = imgs ? (Array.isArray(imgs) ? imgs : [imgs]) : [];
  return (
    <>
      <div className="border border-[var(--border-color)]/60 bg-[var(--glass-bg-color)] px-4 py-3 flex flex-col gap-2">
        
        <div className="flex flex-col gap-1">
          <span className="text-xs font-mono text-[var(--text-color)] font-semibold">{title}</span>
          <p className="text-xs font-mono text-[var(--secondary-text)] leading-relaxed">{para}</p>
        </div>{images.length > 0 && (
          <div className="flex gap-3 overflow-x-auto pb-1">
            {images.map((img, i) => (
              <div key={i} className="flex flex-col gap-1 shrink-0 w-28 md:w-32">
                <img
                  src={img.src}
                  alt=""
                  className="w-full h-20 md:h-24 object-cover border border-[var(--border-color)]/40 cursor-pointer"
                  onClick={() => setSelectedImg(img)}
                />
                {img.desc && (
                  <span className="text-[9px] md:text-[10px] font-mono text-[var(--secondary-text)] leading-tight">{img.desc}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
          >
            <button
              className="absolute top-4 right-4 text-white z-10 p-1 rounded hover:bg-white/10 transition-colors"
              onClick={() => setSelectedImg(null)}
            >
              <X size={24} />
            </button>
            <motion.img
              src={selectedImg.src}
              alt={selectedImg.desc || ""}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";

interface TileData {
  title: string;
  text: string;
  image: string;
}

const tileData: TileData[] = [
  {
    title: "Vision",
    text: "Seeing beyond the horizon — crafting ideas that shape tomorrow.",
    image: "/orangeBg.jpg",
  },
  {
    title: "Flow",
    text: "Where creativity meets rhythm and every motion tells a story.",
    image: "/sliced_org.jpg",
  },
  {
    title: "Structure",
    text: "Building foundations with precision and architectural elegance.",
    image: "/multiBg.jpg",
  },
  {
    title: "Texture",
    text: "Layers of depth that add richness to every experience.",
    image: "/whiteBg.jpg",
  },
  {
    title: "Rhythm",
    text: "The pulse that drives design forward in perfect cadence.",
    image: "/orangeBg.jpg",
  },
  {
    title: "Harmony",
    text: "Where all elements converge into a seamless whole.",
    image: "/sliced_org.jpg",
  },
];

const entranceDirs = [
  { x: -120, y: 0 },
  { x: 0, y: -120 },
  { x: 120, y: 0 },
  { x: -120, y: 0 },
  { x: 0, y: 120 },
  { x: 120, y: 0 },
];

export default function GridMosaic() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const anims = tileData.map((_, i) => {
    const progress = i / tileData.length;

    const opacity = useTransform(scrollYProgress, [progress, progress + 0.12], [0, 1]);
    const scale = useTransform(scrollYProgress, [progress, progress + 0.12], [0.8, 1]);
    const x = useTransform(scrollYProgress, [progress, progress + 0.12], [entranceDirs[i].x, 0]);

    return { opacity, scale, x };
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-6xl mx-auto px-4 py-20"
    >
      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {tileData.map((tile, i) => (
          <motion.div
            key={tile.title}
            className="group relative h-[280px] md:h-[320px] rounded-2xl overflow-hidden border border-[--border-color]/10 cursor-pointer"
            style={{
              opacity: anims[i].opacity,
              scale: anims[i].scale,
              x: anims[i].x,
            }}
          >
            <div className="absolute inset-0">
              <Image
                src={tile.image}
                alt={tile.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>

            <div className="relative z-10 h-full flex flex-col justify-end p-5">
              <span className="text-xs font-mono text-white/50 mb-1 tracking-widest uppercase">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-1 tracking-tight">
                {tile.title}
              </h3>
              <p className="text-xs md:text-sm text-white/70 leading-relaxed max-w-xs">
                {tile.text}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

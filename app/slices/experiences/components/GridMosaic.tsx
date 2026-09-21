"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import Image from "next/image";

interface TileData {
  title: string;
  text: string;
  image: string;
}

const tileData: TileData[] = [
  {
    title: "Vision",
    text: "Seeing beyond the horizon - crafting ideas that shape tomorrow.",
    image: "/backgrounds/orangeBg.webp",
  },
  {
    title: "Flow",
    text: "Where creativity meets rhythm and every motion tells a story.",
    image: "/projects/sliced_org.webp",
  },
  {
    title: "Structure",
    text: "Building foundations with precision and architectural elegance.",
    image: "/backgrounds/multiBg.webp",
  },
  {
    title: "Texture",
    text: "Layers of depth that add richness to every experience.",
    image: "/backgrounds/whiteBg.webp",
  },
  {
    title: "Rhythm",
    text: "The pulse that drives design forward in perfect cadence.",
    image: "/backgrounds/orangeBg.webp",
  },
  {
    title: "Harmony",
    text: "Where all elements converge into a seamless whole.",
    image: "/projects/sliced_org.webp",
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

function MosaicTile({
  data,
  index,
  scrollYProgress,
}: {
  data: TileData;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const progress = index / tileData.length;
  const dir = entranceDirs[index];

  const opacity = useTransform(scrollYProgress, [progress, progress + 0.12], [0, 1]);
  const scale = useTransform(scrollYProgress, [progress, progress + 0.12], [0.8, 1]);
  const x = useTransform(scrollYProgress, [progress, progress + 0.12], [dir.x, 0]);
  const y = useTransform(scrollYProgress, [progress, progress + 0.12], [dir.y, 0]);

  return (
    <motion.div
      className="group relative h-[280px] md:h-[320px] rounded-2xl overflow-hidden border border-[--border-color]/10 cursor-pointer"
      style={{ opacity, scale, x, y }}
    >
      <div className="absolute inset-0">
        <Image
          src={data.image}
          alt={data.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-end p-5">
        <span className="text-xs font-mono text-white/50 mb-1 tracking-widest uppercase">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="text-xl md:text-2xl font-bold text-white mb-1 tracking-tight">
          {data.title}
        </h3>
        <p className="text-xs md:text-sm text-white/70 leading-relaxed max-w-xs">
          {data.text}
        </p>
      </div>
    </motion.div>
  );
}

export default function GridMosaic() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-6xl mx-auto px-4 py-20"
    >
      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {tileData.map((tile, i) => (
          <MosaicTile
            key={tile.title}
            data={tile}
            index={i}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </motion.div>
    </div>
  );
}
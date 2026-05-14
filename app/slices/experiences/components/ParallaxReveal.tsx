"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";

interface CardData {
  title: string;
  text: string;
  image: string;
}

const cardData: CardData[] = [
  {
    title: "Discovery",
    text: "Every great journey begins with a single step. Explore the unknown and let curiosity be your compass through uncharted territories of innovation and creativity.",
    image: "/orangeBg.jpg",
  },
  {
    title: "Innovation",
    text: "Pushing boundaries and breaking molds — innovation thrives at the intersection of imagination and determination. Build what others haven't dared to dream.",
    image: "/sliced_org.jpg",
  },
  {
    title: "Craft",
    text: "Precision meets passion in the art of creation. Every detail matters, each line of code tells a story, and every pixel finds its purpose.",
    image: "/multiBg.jpg",
  },
  {
    title: "Impact",
    text: "The final piece of the puzzle — creating work that resonates, inspires, and leaves a lasting mark on the world around us.",
    image: "/whiteBg.jpg",
  },
];

const totalCards = cardData.length;

export default function ParallaxReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative">
      {cardData.map((data, i) => {
        const start = i / totalCards;
        const end = (i + 1) / totalCards;

        const scale = useTransform(
          scrollYProgress,
          [start, end],
          [0.6, 1],
        );

        const blur = useTransform(
          scrollYProgress,
          [start, end],
          ["blur(40px)", "blur(0px)"],
        );

        const opacity = useTransform(
          scrollYProgress,
          [start, start + 0.05, end - 0.05, end],
          [0.3, 1, 1, 0.3],
        );

        const y = useTransform(
          scrollYProgress,
          [start, end],
          [100, 0],
        );

        return (
          <section
            key={data.title}
            className="relative h-screen w-full flex items-center justify-center overflow-hidden"
          >
            <motion.div
              className="absolute inset-0"
              style={{ scale, filter: blur }}
            >
              <Image
                src={data.image}
                alt={data.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
            </motion.div>

            <motion.div
              className="relative z-10 text-center max-w-2xl px-6"
              style={{ opacity, y }}
            >
              <span className="text-xs font-mono text-white/60 mb-2 tracking-widest uppercase block">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                {data.title}
              </h2>
              <p className="text-sm md:text-base text-white/80 leading-relaxed">
                {data.text}
              </p>
            </motion.div>
          </section>
        );
      })}
    </div>
  );
}

"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";

const cards = [
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

const n = cards.length;

export default function StackedCards() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${(n - 1) * 100}vw`]);

  const anims = cards.map((_, i) => {
    const mid = i / (n - 1);
    const half = 1 / (n - 1) / 2;
    const scale = useTransform(scrollYProgress, [mid - half, mid, mid + half], [0.5, 1, 0.5]);
    const blur = useTransform(scrollYProgress, [mid - half, mid, mid + half], ["blur(40px)", "blur(0px)", "blur(40px)"]);
    return { scale, blur };
  });

  return (
    <div ref={ref} className="relative h-[400vh] -m-4 md:-m-8 lg:-m-10">
      <div className="sticky top-[62px] h-[calc(100vh-62px)] overflow-hidden">
        <motion.div className="flex h-full" style={{ x }}>
          {cards.map((card, i) => (
            <div
              key={card.title}
              className="relative w-screen h-full flex-shrink-0 flex flex-col md:flex-row items-stretch"
            >
              <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
                <motion.div
                  className="relative w-full h-full"
                  style={{ scale: anims[i].scale, filter: anims[i].blur }}
                >
                  <Image src={card.image} alt={card.title} fill className="object-cover" />
                </motion.div>
              </div>
              <div className="w-full md:w-1/2 h-1/2 md:h-full p-6 md:p-14 flex flex-col justify-center bg-[--bg-color]">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">{card.title}</h2>
                <p className="text-sm md:text-base text-[--secondary-text] leading-relaxed max-w-md">{card.text}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

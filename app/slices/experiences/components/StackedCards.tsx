"use client";
import { motion } from "motion/react";
import Image from "next/image";

const cards = [
  { title: "Discovery", text: "Every great journey begins with a single step. Explore the unknown and let curiosity be your compass through uncharted territories of innovation and creativity.", image: "/backgrounds/orangeBg.webp" },
  { title: "Innovation", text: "Pushing boundaries and breaking molds - innovation thrives at the intersection of imagination and determination. Build what others haven't dared to dream.", image: "/projects/sliced_org.webp" },
  { title: "Craft", text: "Precision meets passion in the art of creation. Every detail matters, each line of code tells a story, and every pixel finds its purpose.", image: "/backgrounds/multiBg.webp" },
  { title: "Impact", text: "The final piece of the puzzle - creating work that resonates, inspires, and leaves a lasting mark on the world around us.", image: "/backgrounds/whiteBg.webp" },
  { title: "Rhythm", text: "The pulse that drives design forward in perfect cadence - each element moving in harmony to create a symphony of visual delight.", image: "/projects/project-img1.webp" },
  { title: "Flow", text: "Where creativity meets motion and every interaction feels like a natural extension of thought, seamless and intuitive.", image: "/projects/project-img2.webp" },
  { title: "Depth", text: "Layers of meaning beneath the surface - exploring the rich textures that give every experience its weight and substance.", image: "/projects/project-img3.webp" },
  { title: "Horizon", text: "Looking ahead to what's next - the endless frontier of possibility waiting to be shaped by imagination and will.", image: "/projects/project-img4.webp" },
];

export default function StackedCards() {
  return (
    <div className="w-full">
      {cards.map((card, i) => (
        <motion.div
          key={card.title}
          className="flex flex-col md:flex-row items-stretch h-screen w-full"
          initial={{ opacity: 0, y: 120, scale: 0.85, filter: "blur(30px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
            <Image src={card.image} alt={card.title} fill className="object-cover" />
          </div>
          <div className="w-full md:w-1/2 h-1/2 md:h-full p-6 md:p-14 flex flex-col justify-center bg-[--bg-color]">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">{card.title}</h2>
            <p className="text-sm md:text-base text-[--secondary-text] leading-relaxed max-w-md">{card.text}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

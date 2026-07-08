"use client";
import { motion } from "motion/react";
import Image from "next/image";

const items = [
  { title: "Discovery", text: "Every great journey begins with a single step. Explore the unknown and let curiosity be your compass through uncharted territories of innovation and creativity.", image: "https://images.unsplash.com/photo-1777903675826-069af4c6cf49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1M3x8fGVufDB8fHx8fA%3D%3D" },
  { title: "Innovation", text: "Pushing boundaries and breaking molds — innovation thrives at the intersection of imagination and determination. Build what others haven't dared to dream.", image: "/projects/sliced_org.webp" },
  { title: "Craft", text: "Precision meets passion in the art of creation. Every detail matters, each line of code tells a story, and every pixel finds its purpose.", image: "/backgrounds/multiBg.webp" },
  { title: "Impact", text: "The final piece of the puzzle — creating work that resonates, inspires, and leaves a lasting mark on the world around us.", image: "https://images.unsplash.com/photo-1778557403328-24ccdcc2a820?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2NXx8fGVufDB8fHx8fA%3D%3D" },
];

export default function PopBlur() {
  return (
    <div className="w-full">
      {items.map((item, i) => (
        <motion.div
          key={item.title}
          className="relative h-screen w-full flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.4, filter: "blur(40px)" }}
            whileInView={{ scale: 1, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image src={item.image} alt={item.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>

          <motion.div
            className="relative z-10 text-center max-w-2xl px-6"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <span className="text-xs font-mono text-white/60 mb-2 tracking-widest uppercase block">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">{item.title}</h2>
            <p className="text-sm md:text-base text-white/80 leading-relaxed">{item.text}</p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

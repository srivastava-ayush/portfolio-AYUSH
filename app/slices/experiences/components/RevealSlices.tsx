"use client";
import { motion } from "motion/react";
import Image from "next/image";

const items = [
  { title: "Cascade", text: "Ideas flowing down like water, each drop carrying ripples of creative potential.", image: "/backgrounds/orangeBg.jpg" },
  { title: "Fusion", text: "Elements colliding and combining — the heat of creation forging something entirely new.", image: "/projects/sliced_org.jpg" },
  { title: "Pulse", text: "The steady rhythm of progress, each beat marking another step toward the horizon.", image: "/backgrounds/multiBg.jpg" },
  { title: "Radiance", text: "Light emanating from within — the glow of inspiration that illuminates the path forward.", image: "/backgrounds/whiteBg.jpg" },
  { title: "Drift", text: "Surrendering to the current of creativity, trusting the journey to reveal its destination.", image: "https://images.unsplash.com/photo-1778336110797-0deff0dd4b39?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3MXx8fGVufDB8fHx8fA%3D%3D" },
];

export default function RevealSlices() {
  return (
    <div className="w-full">
      {items.map((item, i) => (
        <motion.div
          key={item.title}
          className="relative h-screen w-full overflow-hidden"
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scaleX: 1.5, filter: "blur(20px)" }}
            whileInView={{ scaleX: 1, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image src={item.image} alt={item.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>

          <motion.div
            className="relative z-10 h-full flex items-center justify-center"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <div className="text-center max-w-2xl px-6">
              <span className="text-xs font-mono text-white/60 mb-2 tracking-widest uppercase block">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">{item.title}</h2>
              <p className="text-sm md:text-base text-white/80 leading-relaxed">{item.text}</p>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";

export default function AvatarFlip() {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setFlipped((f) => !f), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="relative size-32 sm:size-36"
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="relative size-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
      >
        {/* front: avatar */}
        <div
          className="absolute inset-0 rounded-full overflow-hidden ring-1 ring-[var(--border-color)]"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <Image
            unoptimized
            src="/avatars/avatar.webp"
            alt="Ayush Srivastava avatar"
            width={144}
            height={144}
            className="size-full object-cover opacity-90"
          />
        </div>

        {/* back: orange */}
        <div
          className="absolute inset-0 rounded-full overflow-hidden ring-[var(--border-color)] bg-[var(--bg-color)] flex items-center justify-center p-4"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <Image
            unoptimized
            src="/icons/orange.svg"
            alt="orange"
            width={96}
            height={96}
            className="size-full object-contain"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function AvatarFlip() {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setFlipped((f) => !f), 5000);
    return () => clearInterval(t);
  }, []);

  const isFlipped = hovered ? !flipped : flipped;

  return (
    <div
      className="relative size-32 sm:size-36 cursor-pointer"
      style={{ perspective: 1000 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative size-full"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateY(${isFlipped ? 180 : 0}deg)`,
          transition: "transform 1s",
        }}
      >
        {/* front: avatar */}
        <div
          className="absolute inset-0 rounded-full overflow-hidden ring-1 ring-[var(--border-color)]"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <Image
            unoptimized
            src="/avatars/avatar.png"
            alt="Ayush Srivastava avatar"
            width={144}
            height={144}
            className="size-full object-cover opacity-90"
          />
        </div>

        {/* back: orange */}
        <div
          className="absolute inset-0 rounded-full overflow-hidden ring-[var(--border-color)] flex items-center justify-center p-4"
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
      </div>
    </div>
  );
}
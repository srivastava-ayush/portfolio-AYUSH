"use client";

import { useId, useState } from "react";
import Image from "next/image";
import type { ExpandedImage } from "./ImageLightbox";

type GalleryImage = { src: string; desc?: string };

export default function QuestImageGallery({
  title,
  images,
  poster = false,
  contain = false,
  collapsible = false,
  onImageClick,
}: {
  title: string;
  images: GalleryImage[];
  poster?: boolean;
  contain?: boolean;
  collapsible?: boolean;
  onImageClick: (image: ExpandedImage) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const gridId = useId();

  return (
    <div className="mt-4 pl-0 sm:pl-11">
      <div id={gridId} className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {images.map((image, index) => (
          <figure
            key={image.src}
            className={`min-w-0 border border-[var(--sq-line)] bg-[var(--sq-inset)] ${collapsible && !expanded ? index >= 3 ? "hidden" : index === 2 ? "hidden sm:block" : "" : ""}`}
          >
            <button
              type="button"
              aria-label={`Expand ${image.desc || title} image`}
              onClick={() => onImageClick({ src: image.src, alt: image.desc || title, caption: image.desc })}
              className={`relative block w-full cursor-zoom-in overflow-hidden ${poster ? "aspect-[2/3]" : "aspect-video"}`}
            >
              <Image unoptimized src={image.src} alt={image.desc || title} fill sizes="(min-width: 1024px) 200px, 45vw" className={contain ? "object-contain" : "object-cover"} />
            </button>
            {image.desc && <figcaption className="border-t border-[var(--sq-line)] px-2 py-1.5 text-[10px] text-[var(--sq-text-faint)]">{image.desc}</figcaption>}
          </figure>
        ))}
      </div>
      {collapsible && images.length > 2 && (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={gridId}
          onClick={() => setExpanded((value) => !value)}
          className="mt-3 border border-[var(--sq-line)] px-3 py-2 text-[10px] text-[var(--tui-green)] transition-colors hover:border-[var(--sq-hover-border)] hover:text-[var(--sq-fg)]"
        >
          {expanded ? "[-] Show first row" : `[+] View all ${images.length} images`}
        </button>
      )}
    </div>
  );
}

"use client";

type EntryImg = { src: string; desc?: string };

export default function CategoryEntry({ title, para, imgs }: { title: string; para: string; imgs?: EntryImg | EntryImg[] }) {
  const images = imgs ? (Array.isArray(imgs) ? imgs : [imgs]) : [];
  return (
    <div className="border border-[var(--border-color)]/60 bg-[var(--glass-bg-color)] px-4 py-3 flex flex-col gap-2">
      {images.length > 0 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <div key={i} className="flex flex-col gap-1 shrink-0 w-28 md:w-32">
              <img src={img.src} alt="" className="w-full h-20 md:h-24 object-cover border border-[var(--border-color)]/40" />
              {img.desc && (
                <span className="text-[9px] md:text-[10px] font-mono text-[var(--secondary-text)] leading-tight">{img.desc}</span>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-mono text-[var(--text-color)] font-semibold">{title}</span>
        <p className="text-xs font-mono text-[var(--secondary-text)] leading-relaxed">{para}</p>
      </div>
    </div>
  );
}

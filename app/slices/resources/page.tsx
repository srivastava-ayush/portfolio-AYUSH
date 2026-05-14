"use client";
import { motion } from "motion/react";
import { Newspaper, Youtube, Box, ExternalLink } from "lucide-react";

const yt_channels = [
  {
    name: "Manu Paaji",
    url: "https://www.youtube.com/@manuarora",
    for: "UI Design",
    description: "I idealise his design process and the way he craft his designs.",
    category: "youtube",
  },
  {
    name: "Web Dev Simplified",
    url: "https://www.youtube.com/@WebDevSimplified",
    for: "Web Development",
    description: "He makes complex development concepts easy, and his tuts are very practical.",
    category: "youtube",
  },
  {
    name: "Wes Bos",
    url: "https://www.youtube.com/@wesbos",
    for: "Web Development",
    description: "Who dont kown him.",
    category: "youtube",
  },
  {
    name: "Akshay Saini",
    url: "https://www.youtube.com/@akshaymarch7",
    for: "JavaScript",
    description: "he explains JS in depth and with absolute clarity, Namaste JavaScript is a masterpiece.",
    category: "youtube",
  },
];

const textures = [
  {
    title: "Atmosphere pattern",
    href: "https://texturelabs.org/wp-content/uploads/Texturelabs_Atmosphere_145S.jpg",
    category: "textures",
  },
  {
    title: "Grid pattern",
    href: "https://www.toptal.com/designers/subtlepatterns/uploads/grid.png",
    category: "textures",
  },
  {
    title: "Vintage pattern",
    href: "https://texturelabs.org/wp-content/uploads/Texturelabs_Grunge_189S.jpg",
    category: "textures",
  },
  {
    title: "Spray paint pattern",
    href: "https://texturelabs.org/wp-content/uploads/Texturelabs_InkPaint_232S.jpg",
    category: "textures",
  },
];


const allResources = [...yt_channels, ...textures] as const;

function ResourceCard({ item }: { item: (typeof allResources)[number] }) {
  const href = "url" in item ? item.url : (item as any).href;
  const title = "name" in item ? item.name : (item as any).title;
  const subtitle = "for" in item ? item.for : null;
  const description = "description" in item ? item.description : null;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-xl border border-[var(--border-color)]/20 bg-[var(--glass)] p-5 transition-all duration-300 hover:border-[var(--accent-color)]/40 hover:shadow-lg"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-[var(--text-color)] group-hover:text-[var(--accent-color)] transition-colors">
            {title}
          </h3>
          <ExternalLink size={14} className="shrink-0 text-[var(--secondary-text)] opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        {subtitle && (
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-color)]/80">
            {subtitle}
          </span>
        )}
        {description && (
          <p className="text-sm text-[var(--secondary-text)] leading-relaxed line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </motion.a>
  );
}

const sectionIcons = {
  youtube: Youtube,
  textures: Box,
  tools: Newspaper,
} as const;

function ResourceSection({
  title,
  items,
  icon: Icon,
}: {
  title: string;
  items: readonly any[];
  icon: any;
}) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/20">
          <Icon size={18} className="text-[var(--accent-color)]" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-[var(--text-color)]">{title}</h2>
          <p className="text-xs text-[var(--secondary-text)]">{items.length} resources</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item: any, i: number) => (
          <ResourceCard key={i} item={item} />
        ))}
      </div>
    </section>
  );
}

export default function ResourcesPage() {
  return (
    <main className="flex-1 relative min-h-screen w-full max-w-4xl mx-auto px-4 md:px-8 py-12">
      <motion.span
        initial={{ opacity: 0, top: "-100px" }}
        animate={{ opacity: 1, top: 0 }}
        transition={{ duration: 1 }}
        className="fixed pointer-events-none z-0 top-0 right-0 w-[60%] h-24 bg-(--blob-color) blur-[200px]"
      />

      <div className="flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
        
          </motion.div>
          <h1 className="text-[2rem] md:text-[2.8rem] text-[var(--text-color)] font-bold">
            Resources
          </h1>
          <p className="text-md text-[var(--secondary-text)] mt-2 max-w-lg">
            Handpicked tools, channels, and assets I use daily for design &
            development.
          </p>
        </div>

        <hr className="w-full border-[var(--border-color)]/40" />

        {/* YouTube Channels */}
        <ResourceSection
          title="YouTube Channels"
          icon={sectionIcons.youtube}
          items={yt_channels}
        />

        <hr className="w-full border-[var(--border-color)]/40" />

        {/* Textures */}
        <ResourceSection
          title="Texture Assets"
          icon={sectionIcons.textures}
          items={textures}
        />

        <hr className="w-full border-[var(--border-color)]/40" />


      </div>
    </main>
  );
}

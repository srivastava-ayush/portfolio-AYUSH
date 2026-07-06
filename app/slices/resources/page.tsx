"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, Newspaper, Youtube, Box, ExternalLink } from "lucide-react";
import Navbar from "../../ui/Navbar";

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col items-center"
    >
      <motion.div className="w-full max-w-3xl border border-[var(--border-color)] flex flex-col items-center">
        <Navbar />
        <main className="w-full flex flex-col px-6 pb-16">
          <div className="pt-[var(--section-gap)]" />

          <div className="border-t border-b border-[var(--border-color)]">
            <Link
              href="/slices/getting-started"
              className="flex items-center gap-1.5 px-3 h-7 text-xs font-mono text-[var(--secondary-text)] hover:text-[var(--text-color)] hover:bg-[var(--hover-color)] transition-colors w-fit"
            >
              <ArrowLeft size={14} />
              back
            </Link>
          </div>

          <div className="flex flex-col gap-8 pt-8">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-[1.8rem] md:text-[2.8rem] text-[var(--text-color)] font-bold">
              Resources
            </h1>
            <p className="text-md text-[var(--secondary-text)] mt-2 max-w-lg">
              Handpicked tools, channels, and assets I use daily for design &amp;
              development.
            </p>
          </div>

          <hr className="border-[var(--border-color)]/40" />

          <ResourceSection
            title="YouTube Channels"
            icon={sectionIcons.youtube}
            items={yt_channels}
          />

          <hr className="border-[var(--border-color)]/40" />

          <ResourceSection
            title="Texture Assets"
            icon={sectionIcons.textures}
            items={textures}
          />
        </div>
        </main>
      </motion.div>
    </motion.div>
  );
}

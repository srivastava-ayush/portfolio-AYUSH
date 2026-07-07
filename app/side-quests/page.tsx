"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import Navbar from "../ui/Navbar";
import PageWithBorderStrips from "../ui/PageWithBorderStrips";
import SideQuestCategory from "../ui/SideQuestCategory";
import CategoryEntry from "../ui/CategoryEntry";

const sideQuests = [
  {
    category: "linux",
    banner: "/backgrounds/blackBg.jpg",
    entries: [
      { title: "Distribution", para: "Arch Linux — rolling release, pacman, AUR. Took a weekend to install, years to appreciate.", imgs: { src: "/projects/project-img1.png", desc: "neofetch" } },
      { title: "Window Manager", para: "Hyprland — Wayland-native, wlroots-based. Tiling, animations, and a config file that keeps growing." },
      { title: "Terminal", para: "Kitty — GPU-accelerated, ligature support, splits and tabs out of the box." },
    ],
  },
  {
    category: "music",
    entries: [
      { title: "Genre", para: "Synthwave, lo-fi hip hop, ambient electronic, and the occasional metal deep cut.", imgs: [{ src: "/projects/project-img2.png", desc: "midnight drive vibes" }, { src: "/projects/project-img3.png", desc: "lo-fi session" }] },
      { title: "Artist", para: "HOME, Carpenter Brut, Mac DeMarco — depends on the mood." },
    ],
  },
  {
    category: "anime",
    entries: [
      { title: "All-Time", para: "Serial Experiments Lain — captured the internet's existential dread before it was mainstream." },
      { title: "Recent", para: "Dandadan — chaotic, heartfelt, and visually unhinged in the best way.", imgs: [{ src: "/projects/project-img4.png", desc: "opening scene" }, { src: "/projects/project-img5.png", desc: "character art" }, { src: "/projects/project-img6.png", desc: "key visual" }] },
    ],
  },
];

function Page() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="min-h-screen flex flex-col items-center">
      <PageWithBorderStrips>
        <motion.div className="w-full border border-[var(--border-color)] flex flex-col items-center">
          <Navbar />
          <main className="w-full flex flex-col px-6 pb-16">
            <div className="pt-[var(--section-gap)]" />

            <div className="border-t border-b border-[var(--border-color)]">
              <Link href="/#about" className="flex items-center gap-1.5 px-3 h-7 text-xs font-mono text-[var(--secondary-text)] hover:text-[var(--text-color)] hover:bg-[var(--hover-color)] transition-colors w-fit">
                <ArrowLeft size={14} />
                back
              </Link>
            </div>

            <div className="flex flex-col gap-8 pt-8">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-[1.8rem] md:text-[2.8rem] text-[var(--text-color)] font-bold">Side Quests</h1>
                <p className="text-md text-[var(--secondary-text)] mt-2 max-w-lg">
                  movies, music, anime, and random internet things that have influenced how I think
                </p>
              </div>

              <hr className="border-[var(--border-color)]/40" />

              {sideQuests.map((sq, i) => (
                <div key={sq.category}>
                  <SideQuestCategory title={sq.category} banner={sq.banner}>
                    {sq.entries.map((entry) => (
                      <CategoryEntry key={entry.title} title={entry.title} para={entry.para} imgs={entry.imgs} />
                    ))}
                  </SideQuestCategory>
                  {i < sideQuests.length - 1 && <hr className="border-[var(--border-color)]/40 mt-8" />}
                </div>
              ))}
            </div>
          </main>
        </motion.div>
      </PageWithBorderStrips>
    </motion.div>
  );
}

export default Page;

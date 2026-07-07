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
    entries: [
      { title: "Distribution I am using", para: "Arch Linux, yeah mainly because of memes. Took a weekend to install, years to appreciate." },
      { title: "Window Manager", para: "Hyprland The Tiling, animations are so goated, and a config file that keeps growing till the end of time" },
      { title: "Terminal", para: "Kitty with powerlvl10k and starship prompt, look kinda trash but yeah works" },
    ],
  },
  {
    category: "music",
    entries: [
      { title: "Genre", para: "HipHop mostly, chill and lowkey hip hop, at workouts hardcore dhh, and the occasional 2010 bollywood." },
      { title: "Artists", para: "J Cole, Kanye West, Babu Mann, Eminem, Karma, Bella, Logic, Lil Wayne, Jagjit Singh, wolfcryman, Big Scratch, Farak. " },
    ],
  },
  {
    category: "anime",
    entries: [
      { title: "My favourites", para: "Attack On Titan (none of em can top this), Naruto, Vinland Saga, Hajime no Ippo ,Code Geass, Silent Voice." },
      { title: "Recent", para: "none, I'm too lazy now" },
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
                  <SideQuestCategory title={sq.category}>
                    {sq.entries.map((entry) => (
                      <CategoryEntry key={entry.title} title={entry.title} para={entry.para} />
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

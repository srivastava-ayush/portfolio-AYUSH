import type { Metadata } from "next";
import OrangeDial from "./OrangeDial";

export const metadata: Metadata = {
  title: "Side Quests",
  description: "Projects, philosophy, Linux, music, and anime: work and interests shaping how I think and feel about the world.",
};

export default function SideQuestsPage() {
  return <OrangeDial />;
}

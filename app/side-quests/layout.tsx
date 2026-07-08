import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Side Quests",
  description:
    "Hobbies, philosophy, music, anime, and random internet things that influence how Ayush Srivastava thinks about the world and builds software.",
  openGraph: {
    title: "Side Quests | Ayush Srivastava",
    description:
      "Philosophy, music, anime, Linux, and other interests of Ayush Srivastava.",
  },
  alternates: {
    canonical: "https://srivastava-ayush.vercel.app/side-quests",
  },
};

export default function SideQuestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

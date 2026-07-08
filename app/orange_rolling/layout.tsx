import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orange Rolling — Dino Runner Game",
  description:
    "Play Orange Rolling, a dino-runner game built by Ayush Srivastava. Jump over obstacles, set high scores, and enjoy this fun browser game.",
  openGraph: {
    title: "Orange Rolling — Dino Runner Game | Ayush Srivastava",
    description:
      "Play Orange Rolling — a fun dino-runner browser game by Ayush Srivastava.",
  },
  alternates: {
    canonical: "https://srivastava-ayush.vercel.app/orange_rolling",
  },
};

export default function OrangeRollingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

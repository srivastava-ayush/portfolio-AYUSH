import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terminal Portfolio",
  description:
    "Interactive terminal-based portfolio of Ayush Srivastava. Explore projects, skills, and contact info through a command-line interface built with React.",
  openGraph: {
    title: "Terminal Portfolio | Ayush Srivastava",
    description:
      "Interactive terminal portfolio - explore Ayush Srivastava's projects and skills via CLI.",
  },
  alternates: {
    canonical: "https://srivastava-ayush.vercel.app/terminal",
  },
};

export default function TerminalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

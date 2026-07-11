import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore projects by Ayush Srivastava - full-stack applications, landing pages, AI/ML experiments, and UI components built with React, Next.js, TypeScript, Node.js, and more.",
  openGraph: {
    title: "Projects | Ayush Srivastava",
    description:
      "Full-stack apps, landing pages, AI/ML experiments, and UI components by Ayush Srivastava.",
  },
  alternates: {
    canonical: "https://srivastava-ayush.vercel.app/projects",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

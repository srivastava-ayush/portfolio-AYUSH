import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Slices UI - Getting Started",
  description:
    "Slices UI by Ayush Srivastava - a curated collection of reusable UI components, utilities, and templates built with React, Tailwind CSS, and Motion. Explore interactive components and scroll-driven animations.",
  keywords: [
    "Slices UI",
    "slices ui ayush",
    "slices library",
    "slices ui library",
    "reusable UI components",
    "React components",
    "Tailwind CSS components",
    "Ayush Srivastava UI",
    "UI library",
    "component library",
  ],
  openGraph: {
    title: "Slices UI - Getting Started | Ayush Srivastava",
    description:
      "Slices UI by Ayush Srivastava - reusable React components, utilities, and templates built with Tailwind CSS and Motion.",
  },
  alternates: {
    canonical: "https://srivastava-ayush.vercel.app/slices/getting-started",
  },
};

export default function SlicesGettingStartedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Slices UI - Resources",
  description:
    "Handpicked tools, YouTube channels, textures, and design assets recommended by Ayush Srivastava for UI development and design workflows.",
  openGraph: {
    title: "Slices UI - Resources | Ayush Srivastava",
    description:
      "Curated tools, YouTube channels, and assets for UI development by Ayush Srivastava.",
  },
  alternates: {
    canonical: "https://srivastava-ayush.vercel.app/slices/resources",
  },
};

export default function SlicesResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

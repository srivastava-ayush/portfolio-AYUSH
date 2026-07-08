import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Build Logs",
  description:
    "Development notes, ideas, observations, and learnings from Ayush Srivastava's project builds and experiments.",
  openGraph: {
    title: "Build Logs | Ayush Srivastava",
    description:
      "Development logs, ideas, and learnings from Ayush Srivastava.",
  },
  alternates: {
    canonical: "https://srivastava-ayush.vercel.app/build-logs",
  },
};

export default function BuildLogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

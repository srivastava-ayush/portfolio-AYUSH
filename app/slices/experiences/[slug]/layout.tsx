import type { Metadata } from "next";
import { EXPERIENCE_META, CANONICAL_BASE } from "../../constants";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meta = EXPERIENCE_META[slug as keyof typeof EXPERIENCE_META];
  const name = meta?.name || slug.replace(/-/g, " ");
  const description =
    meta?.description ||
    `Interactive ${name} component built with React and Motion. Explore Slices UI by Ayush Srivastava - a collection of reusable UI components with scroll-driven animations.`;

  return {
    title: `${name} - Slices UI Experience`,
    description,
    keywords: [
      "Slices UI",
      `slices ui ${slug}`,
      "slices library",
      "slices ui library",
      `${name}`,
      "React animation component",
      "scroll-driven animation",
      "Ayush Srivastava",
    ],
    openGraph: {
      title: `${name} - Slices UI Experience | Ayush Srivastava`,
      description,
    },
    alternates: {
      canonical: `${CANONICAL_BASE}/slices/experiences/${slug}`,
    },
  };
}

export default function ExperiencesSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

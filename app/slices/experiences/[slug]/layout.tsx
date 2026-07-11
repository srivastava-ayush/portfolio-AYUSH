import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

const experienceNames: Record<string, string> = {
  "parallax-reveal": "Parallax Reveal",
  "pop-blur": "Pop Blur",
  "reveal-slices": "Reveal Slices",
  "stacked-cards": "Stacked Cards",
  "grid-mosaic": "Grid Mosaic",
};

const experienceDescriptions: Record<string, string> = {
  "parallax-reveal":
    "Interactive Parallax Reveal component - a scroll-driven animation experience built with React and Motion. Part of the Slices UI library by Ayush Srivastava.",
  "pop-blur":
    "Interactive Pop Blur component - a smooth blur reveal animation built with React and Motion. Part of the Slices UI library by Ayush Srivastava.",
  "reveal-slices":
    "Interactive Reveal Slices component - a slice-based scroll reveal animation built with React and Motion. Part of the Slices UI library by Ayush Srivastava.",
  "stacked-cards":
    "Interactive Stacked Cards component - a card stacking animation built with React and Motion. Part of the Slices UI library by Ayush Srivastava.",
  "grid-mosaic":
    "Interactive Grid Mosaic component - a grid-based reveal animation built with React and Motion. Part of the Slices UI library by Ayush Srivastava.",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const name = experienceNames[slug] || slug.replace(/-/g, " ");
  const description =
    experienceDescriptions[slug] ||
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
      canonical: `https://srivastava-ayush.vercel.app/slices/experiences/${slug}`,
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

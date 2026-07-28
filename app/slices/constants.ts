export const CANONICAL_BASE = "https://srivastava-ayush.vercel.app";

export const EXPERIENCE_SLUGS = [
  "parallax-reveal",
  "pop-blur",
  "reveal-slices",
  "stacked-cards",
  "grid-mosaic",
] as const;

export type ExperienceSlug = (typeof EXPERIENCE_SLUGS)[number];

export const EXPERIENCE_META: Record<
  ExperienceSlug,
  { name: string; description: string }
> = {
  "parallax-reveal": {
    name: "Parallax Reveal",
    description:
      "Interactive Parallax Reveal component - a scroll-driven animation experience built with React and Motion. Part of the Slices UI library by Ayush Srivastava.",
  },
  "pop-blur": {
    name: "Pop Blur",
    description:
      "Interactive Pop Blur component - a smooth blur reveal animation built with React and Motion. Part of the Slices UI library by Ayush Srivastava.",
  },
  "reveal-slices": {
    name: "Reveal Slices",
    description:
      "Interactive Reveal Slices component - a slice-based scroll reveal animation built with React and Motion. Part of the Slices UI library by Ayush Srivastava.",
  },
  "stacked-cards": {
    name: "Stacked Cards",
    description:
      "Interactive Stacked Cards component - a card stacking animation built with React and Motion. Part of the Slices UI library by Ayush Srivastava.",
  },
  "grid-mosaic": {
    name: "Grid Mosaic",
    description:
      "Interactive Grid Mosaic component - a grid-based reveal animation built with React and Motion. Part of the Slices UI library by Ayush Srivastava.",
  },
};

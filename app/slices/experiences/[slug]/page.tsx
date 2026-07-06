"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import StackedCards from "../components/StackedCards";
import ParallaxReveal from "../components/ParallaxReveal";
import GridMosaic from "../components/GridMosaic";
import PopBlur from "../components/PopBlur";
import RevealSlices from "../components/RevealSlices";

const components: Record<string, React.FC> = {
  "stacked-cards": StackedCards,
  "parallax-reveal": ParallaxReveal,
  "grid-mosaic": GridMosaic,
  "pop-blur": PopBlur,
  "reveal-slices": RevealSlices,
};

export default function SlugPage() {
  const params = useParams();
  const slug = params.slug as string;
  const Component = components[slug];

  if (!Component) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-[var(--secondary-text)] gap-4">
        <p className="text-sm font-mono">Experience &quot;{slug}&quot; not found.</p>
        <Link
          href="/slices/experiences"
          className="text-xs font-mono text-[var(--accent-color)] hover:underline"
        >
          Back to experiences
        </Link>
      </div>
    );
  }

  return <Component />;
}

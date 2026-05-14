"use client";
import { useParams } from "next/navigation";
import StackedCards from "../components/StackedCards";
import ParallaxReveal from "../components/ParallaxReveal";
import GridMosaic from "../components/GridMosaic";
import PopBlur from "../components/PopBlur";
import RevealSlices from "../components/RevealSlices";
import { Link } from "lucide-react";

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
      <div className="p-8 text-center text-[--secondary-text]">
        Experience &quot;{slug}&quot; not found.
    
        <Link  className="inline-flex items-center gap-1 mt-4 text-sm text-[--primary-color] hover:underline" href="/slices/">
          Back to all experiences
        </Link>
      </div>
    );
  }

  return <Component />;
}

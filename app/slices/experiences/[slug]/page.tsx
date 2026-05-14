"use client";
import { useParams } from "next/navigation";
import StackedCards from "../components/StackedCards";
import ParallaxReveal from "../components/ParallaxReveal";
import GridMosaic from "../components/GridMosaic";

const components: Record<string, React.FC> = {
  apple: StackedCards,
  banana: ParallaxReveal,
  orange: GridMosaic,
};

export default function SlugPage() {
  const params = useParams();
  const slug = params.slug as string;
  const Component = components[slug];

  if (!Component) {
    return (
      <div className="p-8 text-center text-[--secondary-text]">
        Experience &quot;{slug}&quot; not found.
      </div>
    );
  }

  return <Component />;
}

import { readFileSync } from "fs";
import { join } from "path";

const componentsDir = join(process.cwd(), "app/slices/experiences/components");

function readSource(filename: string): string {
  return readFileSync(join(componentsDir, filename), "utf-8");
}

export const EXPERIENCE_SOURCE: Record<string, string> = {
  "parallax-reveal": readSource("ParallaxReveal.tsx"),
  "pop-blur": readSource("PopBlur.tsx"),
  "reveal-slices": readSource("RevealSlices.tsx"),
  "stacked-cards": readSource("StackedCards.tsx"),
  "grid-mosaic": readSource("GridMosaic.tsx"),
};

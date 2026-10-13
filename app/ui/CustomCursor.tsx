"use client";

import { useCustomCursor } from "./utils/useCursor";

export default function CustomCursor() {
  const cursorRef = useCustomCursor();

  return (
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
      <span className="cursor-axis cursor-axis-x" />
      <span className="cursor-axis cursor-axis-y" />
      <span className="coordinate-crosshair" />
      <span className="cursor-coordinates" data-cursor-coordinates />
    </div>
  );
}

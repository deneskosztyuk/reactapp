import { useEffect, useState } from "react";

const BOARD_WIDTH = 160;
const MAX_CSS_SCALE = 4;

// Device pixels per art pixel; integer so every art pixel covers the same device pixels.
export function pixelScale(viewportWidth: number, dpr: number): number {
  const availableWidth = Math.min(viewportWidth - 48, 912);
  const fit = Math.floor((availableWidth * dpr) / BOARD_WIDTH);
  return Math.max(1, Math.min(fit, Math.floor(MAX_CSS_SCALE * dpr)));
}

if (import.meta.env?.DEV) {
  console.assert(pixelScale(1280, 1) === 4, "pixelScale(1280, 1)");
  console.assert(pixelScale(1280, 1.25) === 5, "pixelScale(1280, 1.25)");
  console.assert(pixelScale(375, 1) === 2, "pixelScale(375, 1)");
  console.assert(pixelScale(375, 3) === 6, "pixelScale(375, 3)");
  console.assert(pixelScale(320, 1) === 1, "pixelScale(320, 1)");
}

const cssPixel = () => pixelScale(window.innerWidth, window.devicePixelRatio) / window.devicePixelRatio;

// CSS pixels per art pixel.
export default function usePixelScale(): number {
  const [scale, setScale] = useState(cssPixel);

  useEffect(() => {
    let dprQuery: MediaQueryList;
    const update = () => {
      setScale(cssPixel());
      dprQuery?.removeEventListener("change", update);
      dprQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
      dprQuery.addEventListener("change", update);
    };

    update();
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("resize", update);
      dprQuery.removeEventListener("change", update);
    };
  }, []);

  return scale;
}

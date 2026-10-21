import { useEffect, useRef } from "react";
import tile from "../assets/board-tile.png";
import usePixelScale from "../lib/usePixelScale";
import useReducedMotion from "../lib/useReducedMotion";
import { parallaxOffset, TILE } from "../lib/parallax";

const POWERED_ON_KEY = "board-powered-on";

// First page view of a session gets the power-on reveal; storage errors count as already powered on.
const shouldPowerOn = () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    if (sessionStorage.getItem(POWERED_ON_KEY) !== null) return false;
    sessionStorage.setItem(POWERED_ON_KEY, "1");
    return true;
  } catch {
    return false;
  }
};

// Decided once per page load, not per render, so StrictMode double renders cannot consume it.
const POWER_ON = typeof window !== "undefined" && shouldPowerOn();

export default function BoardBackground() {
  const px = usePixelScale();
  const reducedMotion = useReducedMotion();
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    if (reducedMotion) {
      layer.style.transform = "";
      return;
    }

    let frameId = 0;
    const update = () => {
      frameId = 0;
      layer.style.transform = `translate3d(0, ${-parallaxOffset(window.scrollY, px)}px, 0)`;
    };
    const handleScroll = () => {
      if (frameId === 0) frameId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(frameId);
    };
  }, [px, reducedMotion]);

  return (
    <>
      <div
        ref={layerRef}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 right-0 top-0 ${POWER_ON ? "board-power-on" : ""}`}
        style={{
          zIndex: -1,
          height: `calc(100vh + ${TILE * px}px)`,
          backgroundImage: `url(${tile})`,
          backgroundSize: `${TILE * px}px`,
          imageRendering: "pixelated",
        }}
      />
      {/* Darkening layer over the parallax traces, under the page content. */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 bg-black/40" style={{ zIndex: -1 }} />
    </>
  );
}

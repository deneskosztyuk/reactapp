import { useEffect, useRef } from "react";
import usePixelScale from "../lib/usePixelScale";
import useReducedMotion from "../lib/useReducedMotion";
import { diamond } from "../lib/pixelSpark";

const STEP_MS = 16;
// Spark radius is floor(frame / 2), so 12 frames grow it from 0 to 5.
const SPARK_FRAMES = 12;
const GOLD = "#C9A44A";

interface Spark {
  x: number;
  y: number;
  frame: number;
}

export default function ClickSpark() {
  const reducedMotion = useReducedMotion();
  const px = usePixelScale();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let sparks: Spark[] = [];
    let frameId = 0;
    let previous = 0;
    let pending = 0;

    const resize = () => {
      canvas.width = Math.ceil(window.innerWidth / px);
      canvas.height = Math.ceil(window.innerHeight / px);
      canvas.style.width = `${canvas.width * px}px`;
      canvas.style.height = `${canvas.height * px}px`;
      sparks = [];
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = GOLD;
      sparks.forEach(({ x, y, frame }) =>
        diamond(x, y, Math.floor(frame / 2)).forEach(([sparkX, sparkY]) => ctx.fillRect(sparkX, sparkY, 1, 1))
      );
    };

    const frame = (time: number) => {
      // Fixed steps keep the spark speed the same on 60 Hz and 120 Hz screens; the clamp skips long pauses.
      pending += Math.min(time - (previous || time), 250);
      previous = time;
      while (pending >= STEP_MS) {
        sparks = sparks
          .map((spark) => ({ ...spark, frame: spark.frame + 1 }))
          .filter((spark) => spark.frame < SPARK_FRAMES);
        pending -= STEP_MS;
      }
      draw();

      if (sparks.length > 0) {
        frameId = requestAnimationFrame(frame);
      } else {
        frameId = 0;
        previous = 0;
        pending = 0;
      }
    };

    const handleDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      sparks.push({ x: Math.floor(event.clientX / px), y: Math.floor(event.clientY / px), frame: 0 });
      if (frameId === 0) frameId = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointerdown", handleDown, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerdown", handleDown);
      cancelAnimationFrame(frameId);
    };
  }, [px, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-50"
      style={{ imageRendering: "pixelated" }}
    />
  );
}

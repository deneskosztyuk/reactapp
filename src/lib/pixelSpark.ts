import type { Point } from "./pixelLine";

// Pixels at Manhattan distance r: a pixel-art ring.
export function diamond(cx: number, cy: number, r: number): Point[] {
  if (r === 0) return [[cx, cy]];
  const points: Point[] = [];
  for (let dx = -r; dx <= r; dx++) {
    const dy = r - Math.abs(dx);
    points.push([cx + dx, cy + dy]);
    if (dy !== 0) points.push([cx + dx, cy - dy]);
  }
  return points;
}

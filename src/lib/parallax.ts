export const TILE = 128;
const RATE = 0.4;

// Background offset in CSS px: snapped to whole art pixels and wrapped at one tile so the layer never runs out.
export function parallaxOffset(scrollY: number, px: number): number {
  return (Math.round((scrollY * RATE) / px) * px) % (TILE * px);
}

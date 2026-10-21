export type Point = [number, number];

// Bresenham line, both ends included.
export function pixelLine([x0, y0]: Point, [x1, y1]: Point): Point[] {
  const points: Point[] = [];
  const dx = Math.abs(x1 - x0);
  const dy = -Math.abs(y1 - y0);
  const stepX = x0 < x1 ? 1 : -1;
  const stepY = y0 < y1 ? 1 : -1;
  let error = dx + dy;
  let x = x0;
  let y = y0;

  for (;;) {
    points.push([x, y]);
    if (x === x1 && y === y1) return points;
    const doubled = 2 * error;
    if (doubled >= dy) {
      error += dy;
      x += stepX;
    }
    if (doubled <= dx) {
      error += dx;
      y += stepY;
    }
  }
}

// Joins the segments between vertices without repeating the shared joints.
export function route(vertices: Point[]): Point[] {
  return vertices.slice(1).flatMap((vertex, index) => {
    const segment = pixelLine(vertices[index], vertex);
    return index === 0 ? segment : segment.slice(1);
  });
}

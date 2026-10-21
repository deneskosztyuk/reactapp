// 3x5 uppercase bitmap glyphs for text drawn inside pixel scenes.
const GLYPHS: Record<string, string[]> = {
  B: ["XX.", "X.X", "XX.", "X.X", "XX."],
  D: ["XX.", "X.X", "X.X", "X.X", "XX."],
  E: ["XXX", "X..", "XX.", "X..", "XXX"],
  G: [".XX", "X..", "X.X", "X.X", ".XX"],
  H: ["X.X", "X.X", "XXX", "X.X", "X.X"],
  I: ["XXX", ".X.", ".X.", ".X.", "XXX"],
  K: ["X.X", "X.X", "XX.", "X.X", "X.X"],
  L: ["X..", "X..", "X..", "X..", "XXX"],
  N: ["X.X", "XXX", "XXX", "XXX", "X.X"],
  R: ["XX.", "X.X", "XX.", "X.X", "X.X"],
  T: ["XXX", ".X.", ".X.", ".X.", ".X."],
  U: ["X.X", "X.X", "X.X", "X.X", "XXX"],
  "1": [".X.", "XX.", ".X.", ".X.", "XXX"],
  "2": ["XX.", "..X", ".X.", "X..", "XXX"],
};

const ADVANCE = 4;

export function textWidth(text: string): number {
  return text.length * ADVANCE - 1;
}

export function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  color: string
): void {
  ctx.fillStyle = color;
  [...text].forEach((char, index) => {
    const glyph = GLYPHS[char];
    console.assert(glyph !== undefined, `pixelFont: no glyph for "${char}"`);
    for (let column = 0; column < 3; column++) {
      for (let row = 0; row < 5; row++) {
        if (glyph?.[row][column] === "X") ctx.fillRect(x + index * ADVANCE + column, y + row, 1, 1);
      }
    }
  });
}

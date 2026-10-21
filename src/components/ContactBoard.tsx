import { useEffect, useRef, useState } from "react";
import usePixelScale from "../lib/usePixelScale";
import { drawText, textWidth } from "../lib/pixelFont";
import { pixelLine, route, type Point } from "../lib/pixelLine";

type ContactChannel = "linkedin" | "github";

interface ContactBoardProps {
  reducedMotion: boolean;
}

const WIDTH = 160;
const HEIGHT = 48;
const TICK_MS = 30;

const COLORS = {
  paper: "#ECEDEA",
  ink: "#1C1D1A",
  graphite: "#5E605B",
  rule: "#B9BBB5",
  red: "#C1272D",
  redPale: "#E9B3B5",
};

const TARGETS: Record<ContactChannel, Point> = { linkedin: [114, 16], github: [114, 33] };

const ROUTE_VERTICES: Array<{ channel: ContactChannel; vertices: Point[] }> = [
  { channel: "linkedin", vertices: [[30, 19], [70, 19], [73, 16], [114, 16]] },
  { channel: "linkedin", vertices: [[30, 25], [84, 25], [93, 16], [114, 16]] },
  { channel: "github", vertices: [[30, 31], [60, 31], [62, 33], [114, 33]] },
  { channel: "github", vertices: [[30, 25], [84, 25], [92, 33], [114, 33]] },
];

const ROUTES = ROUTE_VERTICES.map(({ channel, vertices }) => ({ channel, vertices, points: route(vertices) }));

if (import.meta.env.DEV) {
  ROUTES.forEach(({ channel, vertices, points }) => {
    vertices.slice(1).forEach(([x, y], index) => {
      const dx = Math.abs(x - vertices[index][0]);
      const dy = Math.abs(y - vertices[index][1]);
      console.assert(dx === 0 || dy === 0 || dx === dy, "ContactBoard: route segment not at 0/45/90 degrees");
    });
    points.slice(2).forEach(([x, y], index) => {
      const [beforeX, beforeY] = points[index];
      console.assert(
        Math.abs(x - beforeX) > 1 || Math.abs(y - beforeY) > 1,
        `ContactBoard: doubled corner pixel on ${channel} route at ${points[index + 1]}`
      );
    });
    const [lastX, lastY] = points[points.length - 1];
    console.assert(
      lastX === TARGETS[channel][0] && lastY === TARGETS[channel][1],
      `ContactBoard: ${channel} route does not end on its pin`
    );
  });
}

interface Chip {
  channel: ContactChannel;
  marking: string;
  x: number;
  y: number;
  pinRows: number[];
  href: string;
  label: string;
  // Click area in art pixels: chip, pins and designator, at least 16 tall so it stays 24 CSS px at the smallest scale.
  hit: { x: number; y: number; w: number; h: number };
}

const CHIPS: Chip[] = [
  {
    channel: "linkedin",
    marking: "LINKEDIN",
    x: 104,
    y: 2,
    pinRows: [0, 14],
    href: "https://www.linkedin.com/in/deneskosztyuk/",
    label: "LinkedIn profile",
    hit: { x: 90, y: 0, w: 62, h: 16 },
  },
  {
    channel: "github",
    marking: "GITHUB",
    x: 104,
    y: 36,
    pinRows: [34],
    href: "https://github.com/deneskosztyuk",
    label: "GitHub profile",
    hit: { x: 90, y: 30, w: 62, h: 18 },
  },
];

interface Electron {
  points: Point[];
  channel: ContactChannel;
  step: number;
}

interface BoardState {
  electrons: Electron[];
  flash: Record<ContactChannel, number>;
  ticks: number;
}

const fill = (ctx: CanvasRenderingContext2D, color: string, x: number, y: number, w: number, h: number) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
};

// 2px traces: the second pixel sits below horizontal and diagonal runs, beside vertical ones.
const drawTrace = (ctx: CanvasRenderingContext2D, vertices: Point[], color: string) => {
  ctx.fillStyle = color;
  vertices.slice(1).forEach((end, index) => {
    const start = vertices[index];
    const vertical = start[0] === end[0];
    pixelLine(start, end).forEach(([x, y]) => {
      ctx.fillRect(x, y, 1, 1);
      ctx.fillRect(vertical ? x + 1 : x, vertical ? y : y + 1, 1, 1);
    });
  });
};

const drawBoard = (ctx: CanvasRenderingContext2D, active: ContactChannel | null, state: BoardState) => {
  fill(ctx, COLORS.paper, 0, 0, WIDTH, HEIGHT);

  [...ROUTES]
    .sort((a, b) => Number(a.channel === active) - Number(b.channel === active))
    .forEach(({ channel, vertices }) => drawTrace(ctx, vertices, channel === active ? COLORS.ink : COLORS.rule));

  fill(ctx, COLORS.ink, 47, 23, 3, 4);
  fill(ctx, COLORS.ink, 55, 23, 3, 4);
  fill(ctx, COLORS.rule, 46, 21, 13, 1);
  fill(ctx, COLORS.rule, 46, 28, 13, 1);
  fill(ctx, COLORS.rule, 46, 21, 1, 8);
  fill(ctx, COLORS.rule, 58, 21, 1, 8);

  fill(ctx, COLORS.ink, 83, 24, 4, 4);
  fill(ctx, COLORS.paper, 84, 25, 2, 2);

  fill(ctx, COLORS.ink, 8, 16, 20, 20);
  [19, 25, 31].forEach((y) => fill(ctx, COLORS.ink, 28, y, 2, 2));
  [11, 15, 19, 23].forEach((x) => {
    fill(ctx, COLORS.ink, x, 14, 2, 2);
    fill(ctx, COLORS.ink, x, 36, 2, 2);
  });
  [19, 23, 27, 31].forEach((y) => fill(ctx, COLORS.ink, 6, y, 2, 2));
  fill(ctx, COLORS.paper, 9, 17, 1, 1);
  drawText(ctx, "DK", 8 + Math.floor((20 - textWidth("DK")) / 2), 16 + Math.floor((20 - 5) / 2), COLORS.paper);

  CHIPS.forEach(({ channel, marking, x, y, pinRows }) => {
    fill(ctx, COLORS.ink, x, y, 48, 12);
    const hot = channel === active || state.flash[channel] > 0;
    pinRows.forEach((pinY) => {
      for (let pinX = 108; pinX <= 146; pinX += 6) fill(ctx, hot ? COLORS.red : COLORS.ink, pinX, pinY, 2, 2);
    });
    fill(ctx, COLORS.paper, x + 1, y + 1, 1, 1);
    drawText(ctx, marking, x + Math.floor((48 - textWidth(marking)) / 2), y + Math.floor((12 - 5) / 2), COLORS.paper);
  });

  drawText(ctx, "U1", 92, 3, COLORS.graphite);
  drawText(ctx, "U2", 92, 38, COLORS.graphite);
  drawText(ctx, "R1", 47, 36, COLORS.graphite);

  state.electrons.forEach(({ points, step }) => {
    [3, 6].forEach((behind) => {
      const trail = points[step - behind];
      if (trail) fill(ctx, COLORS.redPale, trail[0], trail[1], 2, 2);
    });
    const [x, y] = points[Math.min(step, points.length - 1)];
    fill(ctx, COLORS.redPale, x - 1, y - 1, 4, 4);
    fill(ctx, COLORS.red, x, y, 2, 2);
  });
};

const tick = (state: BoardState, active: ContactChannel | null) => {
  state.ticks++;
  const spawnEvery = active ? 7 : 16;
  const maxElectrons = active ? 6 : 4;

  if (state.ticks % spawnEvery === 0 && state.electrons.length < maxElectrons) {
    const pool = active ? ROUTES.filter((r) => r.channel === active) : ROUTES;
    const { points, channel } = pool[Math.floor(Math.random() * pool.length)];
    state.electrons.push({ points, channel, step: 0 });
  }

  state.electrons.forEach((electron) => electron.step++);
  state.electrons = state.electrons.filter((electron) => {
    if (electron.step < electron.points.length) return true;
    state.flash[electron.channel] = 8;
    return false;
  });
  state.flash.linkedin = Math.max(0, state.flash.linkedin - 1);
  state.flash.github = Math.max(0, state.flash.github - 1);
};

export default function ContactBoard({ reducedMotion }: ContactBoardProps) {
  const px = usePixelScale();
  const [hovered, setHovered] = useState<ContactChannel | null>(null);
  const [focused, setFocused] = useState<ContactChannel | null>(null);
  const activeChannel = hovered ?? focused;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeRef = useRef(activeChannel);
  const stateRef = useRef<BoardState>({ electrons: [], flash: { linkedin: 0, github: 0 }, ticks: 0 });

  useEffect(() => {
    activeRef.current = activeChannel;
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx && reducedMotion) drawBoard(ctx, activeChannel, stateRef.current);
  }, [activeChannel, reducedMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const state = stateRef.current;
    if (reducedMotion) {
      state.electrons = [];
      state.flash = { linkedin: 0, github: 0 };
      drawBoard(ctx, activeRef.current, state);
      canvas.dataset.running = "false";
      return;
    }

    let frameId = 0;
    let last = 0;
    let pending = 0;

    const frame = (time: number) => {
      // Clamp so a long pause does not replay hundreds of ticks at once.
      pending += Math.min(time - (last || time), 250);
      last = time;
      while (pending >= TICK_MS) {
        tick(state, activeRef.current);
        pending -= TICK_MS;
      }
      drawBoard(ctx, activeRef.current, state);
      frameId = requestAnimationFrame(frame);
    };

    const stop = () => {
      cancelAnimationFrame(frameId);
      frameId = 0;
      canvas.dataset.running = "false";
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && frameId === 0) {
        last = 0;
        frameId = requestAnimationFrame(frame);
        canvas.dataset.running = "true";
      } else if (!entry.isIntersecting && frameId !== 0) {
        stop();
      }
    });

    drawBoard(ctx, activeRef.current, state);
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      stop();
    };
  }, [reducedMotion]);

  return (
    <div className="relative" style={{ width: WIDTH * px, height: HEIGHT * px }}>
      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        aria-hidden="true"
        data-running="false"
        className="block"
        style={{ width: WIDTH * px, height: HEIGHT * px, imageRendering: "pixelated" }}
      />
      {CHIPS.map(({ channel, href, label, hit }) => (
        <a
          key={channel}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          onMouseEnter={() => setHovered(channel)}
          onMouseLeave={() => setHovered(null)}
          onFocus={() => setFocused(channel)}
          onBlur={() => setFocused(null)}
          className="absolute"
          style={{ left: hit.x * px, top: hit.y * px, width: hit.w * px, height: hit.h * px }}
        />
      ))}
    </div>
  );
}

# Motion and pixel cursor — design spec

Date: 2026-10-21
Builds on: `docs/superpowers/specs/2026-10-21-quiet-redesign-design.md` (dark matte black PCB theme, live).

## Brief

- Add life to the page without making it busy: a pixel-art cursor with an electron trail, a faint parallax PCB background, animated project sprites, and motion that answers user actions.
- Overall intensity: subtle. Content stays the focus; motion is noticed when looked for.
- Every addition must read as part of the same PCB world, and must not slow the page.

Success:

- With the page idle (no mouse movement, no scroll, contact board off-screen), no animation loop runs.
- Scrolling shows no long tasks (>50 ms) in Chrome's Performance panel at 1440×900.
- JS bundle grows by at most 6 KB gzipped; new images total under 15 KB.
- Under `prefers-reduced-motion: reduce`, nothing moves except what the user directly drags (the system scroll).
- On touch and coarse-pointer devices, the system pointer is untouched and no trail is drawn.

## Global rules

- Palette from the dark theme spec, plus one new token: `trace-faint #202325` (background tile only, never text).
- Pixel-perfect rules 1–7 from the redesign spec apply. All pixel art uses the shared art-pixel size from `usePixelScale` (CSS px per art px, called `px` below), except the cursor image (see 1).
- Motion moves in whole art pixels or stepped CSS animations (`steps()`); no smooth tweening of pixel art.
- Loops run only while something animates and stop on their own; listeners are passive.
- No new dependencies.

## 1. Pixel pointer and electron trail

### Pointer

- Two cursor images drawn in Aseprite, 8×8 art px, hotspot at the top-left tip (0,0):
  - `arrow`: classic arrow, `silk` outline, `board` fill.
  - `arrow-link`: same shape, `gold` outline.
- Exported at 4 CSS px per art px: 1x = 32×32 PNG, 2x = 64×64 PNG, in `src/assets/cursors/`.
- CSS, scoped to `html.pixel-cursor`:
  - `body`: `cursor: url(arrow.png) 0 0, auto;` then `cursor: image-set(url(arrow.png) 1x, url(arrow@2x.png) 2x) 0 0, auto;` (fallback first for browsers without `image-set` in `cursor`).
  - `a, button:not(:disabled), [role="tab"]`: the same with `arrow-link`.
- The `pixel-cursor` class is added by `CursorTrail` on mount only when `matchMedia("(hover: hover) and (pointer: fine)")` matches, and removed on unmount or when the query stops matching. If JS fails, the system cursor stays.
- The pointer is not motion, so it stays under reduced motion.
- Known limit: the cursor is always 4 CSS px per art px, which equals the site scale only at viewports ≥ 688 px (all fine-pointer desktops in practice). At 125%/150% OS scaling the browser resamples cursor images and they may look slightly soft.

### Trail

- `src/components/CursorTrail.tsx`: one `<canvas>` fixed at the top-left, `pointer-events: none`, `aria-hidden`, `z-index: 50`.
- Backing store `ceil(innerWidth / px) × ceil(innerHeight / px)` art px; CSS size = backing × `px`; `image-rendering: pixelated`. Resized on `resize` and when `px` changes.
- On `mousemove` (passive): convert to art coords `floor(clientX / px)`, `floor(clientY / px)`; push every pixel of the Bresenham line from the last position (excluding the start) with age 0. Keep at most 48 points (drop oldest). Start the loop if stopped.
- On `mouseleave` of the window: forget the last position (no line drawn across the gap on re-entry).
- Loop: fixed 16 ms step (accumulator, clamped to 250 ms) so fade speed is the same on 60 Hz and 120 Hz screens. Each step ages points by 1; draw age 0–4 in `led`, 5–13 in `glow`; drop at 14. Clear with `clearRect` (transparent canvas), then draw with `fillRect` only.
- Click spark: on `pointerdown` with a mouse, add a spark at the art position. Each step `frame++`; radius `floor(frame / 2)` from 0 to 5; draw the diamond ring (`|dx| + |dy| = r`) in `gold`; drop after radius 5.
- The loop stops when there are no points and no sparks.
- Disabled entirely (component renders nothing) when the fine-pointer query fails. Under reduced motion the trail and sparks are off, the pointer stays.

## 2. Background parallax

- `src/components/BoardBackground.tsx`: one fixed layer behind everything (`position: fixed`, `left: 0`, `right: 0`, `top: 0`, `z-index: -1`, `pointer-events: none`, `aria-hidden`).
- Tile: `src/assets/board-tile.png`, 128×128 art px, transparent background, traces (2 px wide, 0°/45°/90°, no doubled corners) and vias in `trace-faint`. Traces that leave one edge enter the opposite edge at the same position so the tile repeats seamlessly. Drafted by the Aseprite Lua script; the user can refine it.
- Layer: `background-image` = tile, `background-size: 128·px`, `image-rendering: pixelated`, repeat; height `100vh + 128·px` so a full tile of slack exists for the offset.
- Parallax: on `scroll` (passive), schedule one `requestAnimationFrame`; in it set `transform: translate3d(0, -offset, 0)` where `offset = (round(scrollY × 0.4 / px) × px) mod (128 · px)`. One style write per frame; no loop when not scrolling.
- Power-on (the page's one orchestrated moment): on the first page view of a browser session (`sessionStorage` key `board-powered-on`; storage errors treated as "already powered on"), the layer reveals top to bottom with `clip-path: inset(0 0 X 0)` animated over 480 ms with `steps(8)`. Page content is not delayed or hidden.
- Reduced motion: no parallax updates and no power-on; the layer is static.

## 3. Sprite animations

- Each project sprite becomes a 64×16 sheet of four 16×16 frames, exported to `src/assets/sprites/<name>.png` (replacing the single frames), same inks as now (`silk`, `outline #5A5D5F`, `led`):
  - robot: f0 base; f1 eyes closed (eye pixels become outline grey); f2 base; f3 antenna LED off.
  - satellite: f0 base; f1 body window LED off; f2 base; f3 antenna LED off.
  - arm: gripper open, half, closed, half (red cluster changes shape, stays within its 2×3 area).
  - forklift: f0 base; f1 warning light off and forks 1 px up; f2 light on, forks 1 px up; f3 light off, forks down.
- Rendered as `<span aria-hidden="true">` (replacing `<img alt="">`) sized `16·px × 16·px`, `background-image` = sheet, `background-size: 64·px 16·px`, `image-rendering: pixelated`, CSS var `--px` set inline.
- Animation on `:hover` or `:focus-within` of the project `article`: `sprite-cycle 600ms steps(4) infinite` moving `background-position-x` from `0` to `calc(-64 * var(--px) * 1px)`. Otherwise frame 0.
- Reduced motion: no animation (frame 0).

## 4. Timeline current

- In `WorkExperience.tsx`, switching roles (arrow buttons, marker click or arrow keys) sends a `gold` 6×6 px square along the timeline line from the previous marker's centre to the new one's.
- Positions measured from the tab elements (`offsetLeft + offsetWidth / 2`); movement via `transform: translateX()` with `transition: transform 300ms steps(10)`; hidden (`visibility: hidden`) before start and after `transitionend`.
- The role panel still switches instantly; the pulse never delays content.
- Reduced motion: no pulse.

## Files

- New: `src/components/CursorTrail.tsx`, `src/components/BoardBackground.tsx`, `src/assets/cursors/{arrow,arrow@2x,arrow-link,arrow-link@2x}.png`, `src/assets/board-tile.png`, Aseprite sources in `design/sprites/`.
- Changed: `src/App.tsx` (mount `BoardBackground` and `CursorTrail`), `src/index.css` (cursor rules, `sprite-cycle` keyframes, power-on keyframes, reduced-motion overrides), `tailwind.config.js` (`trace-faint`), `src/components/Projects.tsx` (sprite spans), `src/components/WorkExperience.tsx` (pulse), `design/sprites/draft-sprites.lua` (sheets, tile, cursors).
- `src/lib/usePixelScale.ts` unchanged; all new pixel art reads `px` from it.

## Verification

- `pnpm typecheck`, `pnpm build`; JS gzip delta ≤ 6 KB, new PNGs < 15 KB total.
- Idle check: with the mouse still and the board off-screen, a `requestAnimationFrame` counter patched in DevTools stays flat for 3 s.
- Scroll check: Chrome Performance recording while scrolling the full page shows no long tasks; parallax offset values are multiples of `px`.
- Trail and background canvases/images contain only palette colors (pixel scan, as done for the contact board).
- Pointer: arrow on text and background, gold arrow on links, buttons and timeline markers; system cursor on touch emulation.
- Reduced motion (OS setting, checked manually by the user): no trail, spark, parallax, power-on, sprite cycle or pulse.
- Keyboard: focusing a project animates its sprite; arrow keys on the timeline trigger the pulse; focus ring unchanged.

## Out of scope

- Ambient electrons on the background, custom text-selection cursor, touch-specific effects, scroll-triggered section reveals.

## Risks

- Cursor `image-set` support differs by browser; the plain `url()` fallback keeps a 1x pixel arrow everywhere.
- A cursor image larger than 32×32 CSS px can be ignored on some platforms; 32×32 is the chosen size for that reason.
- The fixed background layer must not create horizontal overflow; it is `width: 100%` of the viewport, not `100vw`.

## Revisions (2026-10-21, after first build)

- Pixel pointer and electron trail removed at the user's request; the system cursor stays. The click spark remains (`ClickSpark.tsx`, mouse clicks only, off under reduced motion; diamond helper in `src/lib/pixelSpark.ts`).
- A black layer at 40% opacity (`bg-black/40`, fixed, `z-index: -1`) sits above the parallax traces and below the content. The contact board canvas background and via hole are transparent so the board matches the darkened page.
- Sprite cycle triggers on `:hover` (inside `@media (hover: hover)`) and `article:has(:focus-visible)`, not `:focus-within`, so a link that keeps focus after a mouse click does not loop forever.

# Quiet redesign — design spec

Date: 2026-10-21
Branch: `redesign-quiet`

## Brief

- Audience: hiring managers and recruiters for embedded, IoT and web roles. Positioning: IoT as the bridge, device to cloud.
- Direction: quiet, content-first. The page reads as a tri-color e-paper display (the black/white/red panels used on IoT devices). Pixel art is the one memorable element.
- No project images exist. Each project gets a 16×16 pixel sprite instead.
- No public email. Contact is LinkedIn and GitHub only.
- Out of scope: dark mode, email, CV download, project photos, translations.

Success:

- Reads as current and deliberate; nothing left from the old template.
- Role, experience, projects and contact links are findable without hunting.
- Clean at 375px wide with no `overflow-x: hidden` workarounds.
- All pixel art is pixel perfect at 100%, 125% and 150% browser zoom.

## Visual system

### Color

| Token | Hex | Use |
|---|---|---|
| `paper` | `#ECEDEA` | Page background, chip markings |
| `ink` | `#1C1D1A` | Text, sprite and board outlines, active traces |
| `graphite` | `#5E605B` | Secondary text, designators (5.4:1 on paper) |
| `rule` | `#B9BBB5` | Idle traces, sprite midtone. Never text |
| `red` | `#C1272D` | Links, focus ring, sprite accents, electrons (5.0:1 on paper) |
| `red-pale` | `#E9B3B5` | Electron halo and trail only |

Red in sprites: at most one or two small clusters per sprite.

### Type

- Schibsted Grotesk (variable, self-hosted via `@fontsource-variable/schibsted-grotesk`) for all page text. Weights 400, 500, 700.
- Pixel scenes use a bitmap font defined in code (3×5 uppercase glyphs). No webfont inside canvas.
- Scale:
  - Intro sentence (`h1`): `clamp(30px, 4.5vw, 44px)`, line-height 1.15, weight 500.
  - Section heading (`h2`): 24px, line-height 1.25, weight 500.
  - Body: 18px, line-height 1.6.
  - Small (dates, tech lists, footer): 15px, `graphite`.
  - Header name: 17px, weight 700.
- No monospace, no all-caps labels, no `01` numbering, no eyebrow labels, no `→` on links.

### Layout

- One left-aligned column. Container max 64rem, side padding 1.5rem. Prose max 40rem (about 70 characters).
- Section spacing: 6rem desktop, 4rem mobile. Separation by space, not rules or cards.
- Links: `red`, underline offset 4px; hover thickens the underline to 2px. Focus: 2px `red` outline, offset 3px.
- Smooth scrolling for `#anchor` links in CSS, off under `prefers-reduced-motion`.

### Motion

- Only the contact board moves. No section fade-ins, no load sequence, no hover lifts.
- Reduced motion: the board is static; hover highlight still works.

## Page structure and copy

All copy below is a draft for review. Content stays as constants in each component (existing pattern).

### Header (`Navbar.tsx`)

`Denes Kosztyuk` (links to top) on the left; `Work`, `Projects`, `Contact` on the right. Static, not sticky. No hamburger: three short links fit at 375px.

### Intro (`Hero.tsx`)

- `h1`: "I'm Denes Kosztyuk. I build firmware and the software around it, from the sensor to the cloud."
- About paragraph: "Right now I'm an IoT software engineer at Invig in Stavanger, working on an industrial IoT platform: Rust services, a Vue front end, and the devices that report into it. Before that I freelanced on web apps and backend APIs, and earlier spent two years on a PCB production line at Jabil, maintaining and calibrating automated machines. I'm based in Stavanger, Norway, and open to remote work."
- Links: `LinkedIn`, `GitHub`.

### Work (`WorkExperience.tsx`)

- `h2` "Work". Each entry: dates and location left (10rem column on desktop, stacked on mobile); title, company, one-line summary, achievements list, tech as a plain comma-separated line.
- Text unchanged except:
  - Freelance entry: title "Freelance software engineer", company "Self-employed" (was the same phrase twice).
  - Jabil: ">15 autonomous robotic machines" becomes "more than 15 autonomous robotic machines".
- Icons, meta icons and tag pills are removed.

### Projects (`Projects.tsx`)

`h2` "Projects". Each row: sprite (16×16 at the site pixel scale), title, one-line description, tech line, `Code` link to GitHub. Order:

1. Self-navigating robot — "Autonomous robot on an ATmega328P with custom firmware, sensors, and PID control for obstacle avoidance and terrain navigation." Tech: Embedded C, Arduino, KiCad, PID control.
2. Satellite probe simulator — "Hardware and software system that simulates a satellite: environmental data collection, RF telemetry, and a desktop monitoring app." Tech: C/C++, ESP32, RF, Python, Flask.
3. Three-link robotic arm — "Simulated three-link arm in CoppeliaSim with forward and inverse kinematics for precise end-effector control." Tech: Python, NumPy, CoppeliaSim.
4. Warehouse navigation agent — "Neural network trained with reinforcement learning in Unity to navigate a 3D warehouse." Tech: C#, Unity, TensorFlow.

The portfolio project and the featured flag are dropped.

### Skills (`Skills.tsx`, new)

`h2` "Skills". Two groups, each a short heading plus a comma-separated line:

- Device: Rust, C, C++, embedded systems, firmware, microcontrollers, real-time systems, signal processing, FPGA, PCB design (KiCad).
- Cloud and web: Vue.js, React, TypeScript, Node.js, Python, Java, Spring Boot, PostgreSQL, Lua, AWS, GitHub Actions.

### Contact (`Contact.tsx`)

`h2` "Contact", one line: "The quickest way to reach me is a message on LinkedIn." Then the contact board, with `LinkedIn` and `GitHub` as real text links beside it (below it on mobile).

### Footer (`App.tsx`)

"© {current year} Denes Kosztyuk" in small `graphite`.

## Pixel art

### Pixel-perfect rules

1. One art-pixel size site-wide. Scale N is in device pixels: `N = max(1, min(floor(availableWidth × dpr / 160), floor(4 × dpr)))`, where `availableWidth = min(viewportWidth − 48, 1024)` (the content column) and 160 is the board's logical width. Sprites and board share N.
2. Rendered CSS size = logical size × N ÷ `devicePixelRatio`, so 125% and 150% Windows scaling stay crisp. Recompute on resize and on DPR change (`matchMedia('(resolution: …dppx)')`).
3. `image-rendering: pixelated`. Canvas backing store at logical size. No CSS transforms, no fractional positions.
4. No anti-aliasing: draw only with `fillRect` on integer coordinates. No `fillText`, strokes or arcs.
5. Lines only at 0°, 45°, 90°. No doubled corner pixels. Traces 2px wide; diagonals are two adjacent 1px lines.
6. Palette colors only. No alpha, opacity, blur or shadows.
7. Motion moves whole art pixels per step. No tweening.

### Sprites

- Four 16×16 sprites: robot, satellite, robotic arm, warehouse agent. Palette: `ink`, `rule`, `red`, transparent.
- Sources: `design/sprites/<name>.aseprite`. Exports: `src/assets/sprites/<name>.png` at 1×.
- Drafts generated with Aseprite Lua scripts via CLI (`Aseprite.exe -b --script`), then refined by hand in Aseprite with the pixel-perfect brush. PNGs are committed (Vercel cannot run Aseprite).
- Rendered as `<img alt="">` (decorative; the title sits beside it), sized by `usePixelScale`.

### Contact board (`ContactBoard.tsx`, replaces `ContactConstellationScene.tsx`)

- Logical size 160×48. Canvas `aria-hidden`.
- Parts (logical coordinates, origin top left; all pins 2×2 `ink`):
  - U0 chip marked "DK": body at (8,16), 20×20. Pins: right at x=28, y=19/25/31; top at y=14 and bottom at y=36, x=11/15/19/23; left at x=6, y=19/23/27/31.
  - U1 chip marked "LINKEDIN": body at (104,2), 48×12. Pins every 6px from x=108, at y=0 and y=14.
  - U2 chip marked "GITHUB": body at (104,36), 48×12. Pins every 6px from x=108, at y=34.
  - Chip markings in `paper`, centered; pin-1 dot (1px `paper`) at body corner +1,+1.
  - R1: pads 3×4 at (47,23) and (55,23); outline 13×8 at (46,21) in `rule`.
  - Via: 4×4 `ink` at (83,24) with 2×2 `paper` center.
  - Designators in `graphite`: "U1" at (92,3), "U2" at (92,38), "R1" at (47,36).
- Routes (vertex lists, segments at 0°/45°/90°):
  - To U1: `[[30,19],[70,19],[73,16],[114,16]]` and `[[30,25],[84,25],[92,17],[92,16],[114,16]]`.
  - To U2: `[[30,31],[60,31],[62,33],[114,33]]` and `[[30,25],[84,25],[92,33],[114,33]]`.
- Idle traces `rule`; traces of the hovered net `ink`.
- Electrons: 2×2 `red` head, 1px `red-pale` halo, two `red-pale` trail pixels. Idle: spawn every 16 ticks, max 4, random route. Hover or focus on a link: only that chip's routes, spawn every 7 ticks, max 6; that chip's pins turn `red`. Arrival flashes the destination pins `red` for 8 ticks.
- Tick: 30 ms fixed step driven by `requestAnimationFrame`. Paused when off-screen (IntersectionObserver).
- `activeChannel` state lives in `Contact.tsx` (existing pattern) and is passed to the board.

## Code changes

### Files

- Delete: `BackgroundLayout.tsx`, `ContactConstellationScene.tsx`, `TechnologyTags.tsx`, `lib/useInView.ts`, `public/*.glb`, unused types in `types/index.ts`.
- Rewrite: `Navbar.tsx`, `Hero.tsx`, `Contact.tsx`.
- Restyle: `WorkExperience.tsx`, `Projects.tsx`.
- New: `Skills.tsx`, `ContactBoard.tsx`, `lib/usePixelScale.ts`, `lib/pixelFont.ts` (glyph table and draw helper), `design/sprites/*`, `src/assets/sprites/*`.
- `App.tsx`: new section order, footer, drop the overflow wrapper.

### Dependencies

- Remove: `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three`, `react-scroll`, `@types/react-scroll`, `react-icons`.
- Add: `@fontsource-variable/schibsted-grotesk`.
- Keep: `@vercel/analytics`, `@vercel/speed-insights`.

### Config

- `tailwind.config.js`: color tokens above, `fontFamily.sans`; remove `wave` keyframes and safelist.
- `index.css`: remove overflow hacks, hidden scrollbar and `wave`; add base `paper`/`ink`, link and focus styles, guarded smooth scroll.
- `index.html`: real meta description, `theme-color` `#ECEDEA`.
- `public/manifest.json`: real name and short name, theme and background `#ECEDEA`.

## Verification

- `pnpm typecheck` and `pnpm build` pass; bundle is smaller than before (three.js gone).
- Screenshots at 375, 768 and 1280px wide.
- Screenshots at 100%, 125% and 150% browser zoom; zoomed crops of sprites and board show no grey anti-aliased pixels and uniform art-pixel size.
- Keyboard: tab through every link; focus ring visible; focusing a contact link drives the board.
- Reduced motion emulated: board static, no electrons.
- No test runner exists and none is added. The line routine carries a dev-only `console.assert` that each route ends on its target pin.

## Risks

- The `pixellab` Aseprite extension errors in batch mode. Confirm exports still succeed; otherwise run with extensions disabled.
- Fractional DPR values (1.25, 1.5) need the device-pixel formula above, or pixels will be uneven.
- Removing three.js deletes recent work on the 3D scene; it stays in git history.

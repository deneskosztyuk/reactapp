# Quiet Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the dated dark portfolio with the quiet e-paper design: plain typographic sections, four pixel-art project sprites, and a pixel PCB contact board.

**Architecture:** Same single-page Vite + React app and same component-per-section pattern with content constants inside each component. Pixel art shares one scale from `usePixelScale`; the board is a logical-size canvas drawn only with `fillRect`. three.js, react-scroll and react-icons are removed.

**Tech Stack:** Vite 5, React 19, TypeScript, Tailwind 3, `@fontsource-variable/schibsted-grotesk`, Aseprite CLI (Lua) for sprite drafts.

**Spec:** `docs/superpowers/specs/2026-10-21-quiet-redesign-design.md`

## Global Constraints

- Branch `redesign-quiet`. Commits use the existing Git identity; no co-author trailers or AI/tool credits anywhere.
- Palette only: `paper #ECEDEA`, `ink #1C1D1A`, `graphite #5E605B`, `rule #B9BBB5`, `red #C1272D`, `red-pale #E9B3B5`. `rule` and `red-pale` never used for text.
- Schibsted Grotesk only on the page; weights 400/500/700. No monospace, no all-caps labels, no `01` numbering, no eyebrow labels, no `→` on links.
- Type scale, layout widths and spacing exactly as the spec's Visual system section.
- Pixel-perfect rules 1–7 from the spec apply to every sprite and the board.
- Only the board moves. No fade-ins, hover lifts or load sequences. Board static under `prefers-reduced-motion`.
- No test runner is added. Checks are `pnpm typecheck`, `pnpm build`, dev-only `console.assert`, and browser checks on `http://localhost:5173` (launch config `vite-dev`).
- No public email anywhere.

## Review Focus

1. Browser zoom changed to 125% or 150% after load: sprites and board re-scale without reload and stay crisp (Task 3, Task 4).
2. 320px-wide viewport: no horizontal scroll; board shrinks to N ≥ 1 and both contact links stay reachable (Task 4).
3. Keyboard-only visitor: focusing a contact link drives the board exactly like hover; focus ring visible on every link (Task 4).
4. Reduced motion switched on while the page is open: electrons stop without reload (Task 4).
5. Board scrolled off-screen: animation loop stops, restarts when visible (Task 4).

---

### Task 1: Foundation and page shell

**Files:**
- Modify: `tailwind.config.js`, `src/index.css`, `index.html`, `public/manifest.json`, `src/main.tsx`, `src/App.tsx`, `package.json` (add font)
- Rewrite: `src/components/Navbar.tsx`, `src/components/Hero.tsx`
- Create: `src/components/Skills.tsx`
- Delete: `src/components/BackgroundLayout.tsx`

**Interfaces:**
- Produces: Tailwind colors `paper`, `ink`, `graphite`, `rule`, `red`, `red-pale`; `fontFamily.sans` = Schibsted Grotesk Variable; section ids `top`, `work`, `projects`, `skills`, `contact`.

- [ ] **Step 0: Record baseline bundle size**

Before any change, run: `pnpm build`, then `du -cb dist/assets/*.js | tail -1`. Note the byte total for Task 5.

- [ ] **Step 1: Add font and tokens**

Run: `pnpm add @fontsource-variable/schibsted-grotesk`. Import it in `src/main.tsx`. In `tailwind.config.js` add the six colors and `fontFamily.sans: ["Schibsted Grotesk Variable", "system-ui", "sans-serif"]`; remove `wave` keyframes, animation and safelist.

- [ ] **Step 2: Replace `src/index.css` base**

Keep the three `@tailwind` lines. Remove every overflow rule, the hidden-scrollbar rules and `wave`. Add in `@layer base`: `body` = `bg-paper text-ink font-sans text-[18px] leading-[1.6]`; `a` = `text-red underline underline-offset-4 hover:decoration-2`; `:focus-visible` = `outline 2px solid #C1272D, outline-offset 3px`; `h2` = `text-[24px] leading-[1.25] font-medium`; `html { scroll-behavior: smooth }` inside `@media (prefers-reduced-motion: no-preference)`.

- [ ] **Step 3: Meta and manifest**

`index.html`: `theme-color` `#ECEDEA`; description "Denes Kosztyuk, IoT software engineer in Stavanger, Norway. Firmware, embedded systems and the software around them." `manifest.json`: `name` "Denes Kosztyuk", `short_name` "Denes K.", `theme_color` and `background_color` `#ECEDEA`.

- [ ] **Step 4: Rewrite `Navbar.tsx`**

Static `<header>`: `<a href="#top">Denes Kosztyuk</a>` (17px, 700, `text-ink no-underline`) left; `<nav aria-label="Sections">` with `Work`, `Projects`, `Contact` linking `#work`, `#projects`, `#contact` right. Links in this header use `text-ink`. No state, no hamburger, no `react-scroll`.

- [ ] **Step 5: Rewrite `Hero.tsx`**

`<section id="top">` with `h1` and About paragraph copied verbatim from spec "Intro"; then `LinkedIn` (`https://www.linkedin.com/in/deneskosztyuk/`) and `GitHub` (`https://github.com/deneskosztyuk`) links, `target="_blank" rel="noopener noreferrer"`. `h1` uses `text-[clamp(30px,4.5vw,44px)] leading-[1.15] font-medium`; paragraph `max-w-[40rem]`.

- [ ] **Step 6: Create `Skills.tsx`**

`<section id="skills">`, `h2` "Skills", two groups ("Device", "Cloud and web") each a short `h3` plus one comma-separated line, values verbatim from spec.

- [ ] **Step 7: Update `App.tsx` and delete `BackgroundLayout.tsx`**

Order: `Navbar`, `<main>` (`Hero`, `WorkExperience`, `Projects`, `Skills`, `Contact`), footer `© {new Date().getFullYear()} Denes Kosztyuk` in 15px `text-graphite`. Wrapper: `mx-auto max-w-[64rem] px-6`; sections spaced `mt-16 md:mt-24`. Remove the overflow wrapper div and `BackgroundLayout`. Keep `Analytics` and `SpeedInsights`. In `WorkExperience.tsx` change only `id="work-experience"` to `id="work"`.

- [ ] **Step 8: Verify**

Run: `pnpm typecheck` → exits 0. Run: `pnpm build` → "built in". Browser at 1280 and 375: paper background, header links jump to sections, no hamburger, no starfield or custom cursor, `h1` copy matches spec.

- [ ] **Step 9: Commit**

```bash
git add -A src index.html public/manifest.json tailwind.config.js package.json pnpm-lock.yaml
git commit -m "feat: e-paper tokens, font and plain page shell"
```

### Task 2: Pixel scale and project sprites

**Files:**
- Create: `src/lib/usePixelScale.ts`, `design/sprites/draft-sprites.lua`, `design/sprites/{robot,satellite,arm,forklift}.aseprite`, `src/assets/sprites/{robot,satellite,arm,forklift}.png`

**Interfaces:**
- Produces: `pixelScale(viewportWidth: number, dpr: number): number` (device px per art px) and default `usePixelScale(): number` returning CSS px per art px (`N / devicePixelRatio`). Sprite PNGs, 16×16, imported by path in Task 3.

- [ ] **Step 1: Implement `pixelScale` and `usePixelScale` in `src/lib/usePixelScale.ts`**

Formula verbatim from spec rule 1 with logical width 160 and `availableWidth = min(viewportWidth − 48, 1024)`. Hook recomputes on `resize` and on `matchMedia(\`(resolution: ${dpr}dppx)\`)` change (re-subscribe after each change). Dev-only asserts: `pixelScale(1280, 1) === 4`, `pixelScale(1280, 1.25) === 5`, `pixelScale(375, 1) === 2`, `pixelScale(375, 3) === 6`, `pixelScale(320, 1) === 1`.

- [ ] **Step 2: Write `design/sprites/draft-sprites.lua`**

Creates four 16×16 RGB sprites from string maps (`k` ink, `g` rule, `r` red, `.` transparent), saves each as `design/sprites/<name>.aseprite` and exports `src/assets/sprites/<name>.png` with `saveCopyAs`. Robot and satellite maps from the approved draft; arm (three links, red end-effector) and forklift (red warning light) drawn new. Max two red clusters each; no doubled corner pixels.

- [ ] **Step 3: Run the script**

Run: `"/c/Program Files (x86)/Steam/steamapps/common/Aseprite/Aseprite.exe" -b --script design/sprites/draft-sprites.lua`
Expected: four `.aseprite` and four `.png` files written. The `pixellab` extension may print `handle-pose.lua` errors; if files are missing, rerun after disabling the extension in Aseprite.

- [ ] **Step 4: Verify PNG size**

Run: `node -e "for (const n of ['robot','satellite','arm','forklift']) { const b = require('fs').readFileSync('src/assets/sprites/'+n+'.png'); console.log(n, b.readUInt32BE(16), b.readUInt32BE(20)) }"`
Expected: each line ends `16 16`.

- [ ] **Step 5: Commit**

```bash
git add src/lib/usePixelScale.ts design/sprites src/assets/sprites
git commit -m "feat: pixel scale hook and draft project sprites"
```

### Task 3: Work and Projects restyle

**Files:**
- Modify: `src/components/WorkExperience.tsx`, `src/components/Projects.tsx`, `src/types/index.ts`
- Delete: `src/components/TechnologyTags.tsx`, `src/lib/useInView.ts`

**Interfaces:**
- Consumes: `usePixelScale()` and sprite PNGs from Task 2.

- [ ] **Step 1: Restyle `WorkExperience.tsx`**

Section id `work`, `h2` "Work". Grid `md:grid-cols-[10rem_minmax(0,1fr)]`; left: period and location in 15px `graphite`; right: title (500), company, description, achievements `ul`, tech as one 15px `graphite` comma-joined line. Apply the two copy fixes from spec. Remove icons, `type`, meta icons, timeline marker, `useInView`, `TechnologyTags`. Drop `icon` and `type` from the `WorkExperience` type.

- [ ] **Step 2: Restyle `Projects.tsx`**

Section id `projects`, `h2` "Projects". Remove `TECH_STACK`, `TechStackSection`, featured flag, react-icons. Four projects in spec order with spec copy and tech; each row: `<img src={sprite} alt="" width={16 * px} height={16 * px} style={{ imageRendering: "pixelated" }}>` where `px = usePixelScale()`, then title, description, tech line, `Code` link. Update the `Project` type (`sprite: string`, drop `subtitle`, `featured`, `liveUrl`).

- [ ] **Step 3: Delete `TechnologyTags.tsx` and `useInView.ts`**

- [ ] **Step 4: Verify**

Run: `pnpm typecheck` → exits 0. Browser at 1280, 100% zoom: `img.getBoundingClientRect().width === 64` (4 device px per art px). Zoom to 125% without reload: width still 64 CSS px = 80 device px (5 per art px). Zoomed screenshot of one sprite at each zoom: no grey in-between pixels.

- [ ] **Step 5: Commit**

```bash
git add -A src
git commit -m "feat: plain work and project sections with sprites"
```

### Task 4: Contact board

**Files:**
- Create: `src/lib/pixelFont.ts`, `src/components/ContactBoard.tsx`
- Rewrite: `src/components/Contact.tsx`
- Delete: `src/components/ContactConstellationScene.tsx`, `public/linkedin+logo+3d+model.glb`, `public/octocat+cartoon+3d+model.glb`

**Interfaces:**
- Consumes: `usePixelScale()`; `useReducedMotion()` (existing).
- Produces: `textWidth(text: string): number` and `drawText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color: string): void` (3×5 uppercase glyphs, 1px spacing; glyphs `D K L I N E G T H U B R 1 2`; unknown glyph fails a dev assert); `export type ContactChannel = "linkedin" | "github"`; `ContactBoard({ activeChannel, reducedMotion }: { activeChannel: ContactChannel | null; reducedMotion: boolean })`.

- [ ] **Step 1: Implement `src/lib/pixelFont.ts`**

Glyph table as 5 strings of 3 chars each; `drawText` uses only `fillRect(x, y, 1, 1)`. Dev assert: `textWidth("LINKEDIN") === 31`.

- [ ] **Step 2: Implement board geometry in `ContactBoard.tsx`**

Parts, pins, designators and routes verbatim from spec "Contact board". `pixelLine(a: Point, b: Point): Point[]` is Bresenham; `route(vertices: Point[]): Point[]` concatenates segments without repeating joints. Trace width 2: second pixel at `(x, y+1)` on horizontal and diagonal segments, `(x+1, y)` on vertical ones. Dev asserts: every segment is 0°, 45° or 90°; each route's last point equals its target (`[114,16]` for LinkedIn, `[114,33]` for GitHub).

- [ ] **Step 3: Implement rendering and electrons**

Canvas `width=160 height=48`, CSS size `160 * px` × `48 * px`, `image-rendering: pixelated`, `aria-hidden`. Draw order: paper fill, idle traces (`rule`), active-net traces (`ink`), R1, via, chips with markings via `drawText`, designators, electrons. Electron and spawn numbers verbatim from spec (16/4 idle, 7/6 targeted, 8-tick flash, 30 ms fixed step via `requestAnimationFrame` accumulator). IntersectionObserver starts/stops the loop; expose `data-running="true|false"` on the canvas. With `reducedMotion`, no loop: redraw once per `activeChannel` change.

- [ ] **Step 4: Rewrite `Contact.tsx`**

Section id `contact`, `h2` "Contact", line verbatim from spec. Keep `activeChannel` state and `useReducedMotion`. Board, then `LinkedIn` and `GitHub` text links (`flex-col md:flex-row`), each setting `activeChannel` on `mouseenter`/`focus` and clearing on `mouseleave`/`blur`. Remove `lazy`/`Suspense` and react-icons.

- [ ] **Step 5: Delete the constellation scene and both `.glb` files**

- [ ] **Step 6: Verify**

Run: `pnpm typecheck` → exits 0. Browser checks, each must pass:
- 1280 at 100%: canvas 640×192 CSS px; no console assert failures.
- Hover `LinkedIn`: U1 net traces turn ink, electrons go only to U1. Same via Tab focus; focus ring visible.
- 320 wide: `document.documentElement.scrollWidth === 320`; canvas 160×48 CSS px; both links visible.
- Zoom to 125% without reload: canvas CSS width becomes `160 * 5 / 1.25 = 640`; zoomed screenshot shows uniform pixels, no grey anti-aliasing on chip text.
- Scroll board off-screen: `data-running="false"`; back on-screen: `"true"`.
- Emulate reduced motion while open: no electrons; hover still recolors.

- [ ] **Step 7: Commit**

```bash
git add -A src public
git commit -m "feat: pixel PCB contact board"
```

### Task 5: Dependency cleanup and final pass

**Files:**
- Modify: `package.json`, `pnpm-lock.yaml`, `src/types/index.ts`

- [ ] **Step 1: Remove dependencies**

Run: `pnpm remove three @react-three/fiber @react-three/drei @types/three react-scroll @types/react-scroll react-icons`

- [ ] **Step 2: Remove unused types**

Delete `NavigationItem`, `SocialLink`, `TechStackItem`, `Star`, `Position` and any other type no file imports (`grep` each name in `src`).

- [ ] **Step 3: Verify**

Run: `pnpm typecheck` → exits 0. Run: `pnpm build` → "built in"; `du -cb dist/assets/*.js | tail -1` smaller than the Task 1 Step 0 baseline. `grep -rE "react-icons|react-scroll|three|useInView" src` → no matches. Screenshots at 375, 768, 1280 (100%) and 1280 at 150% zoom reviewed against the spec.

- [ ] **Step 4: Commit**

```bash
git add package.json pnpm-lock.yaml src/types/index.ts
git commit -m "chore: drop three.js, react-scroll and react-icons"
```

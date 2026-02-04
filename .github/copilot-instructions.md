# Copilot Instructions — Personal Portfolio React App

## Architecture Overview

Single-page portfolio application built with **React 19**, **Tailwind CSS 3.4**, and deployed on **Vercel**. The app features smooth scrolling navigation, animated backgrounds with parallax effects, and a contact form integrated with Web3Forms.

### Component Structure
```
App.tsx                 → Root: SmoothScroll wrapper + BackgroundLayout container
├─ Navbar.tsx           → Fixed nav with react-scroll links + mobile menu
├─ Hero.tsx             → Animated intro with rotating titles, tech skill marquee
├─ WorkExperience.tsx   → Career timeline section
├─ Projects.tsx         → Responsive carousel (1/2/3 items based on viewport)
└─ Contact.tsx          → Form with Web3Forms API, math captcha anti-spam
```

## Key Patterns & Conventions

### Custom Hooks Pattern
Components extract logic into `use*` hooks at the top of each file. Follow this pattern:
```javascript
// Hero.tsx example
const useDelayedVisibility = (delay) => { /* ... */ };
const useTitleRotation = (titlesCount, interval, shouldStart) => { /* ... */ };
```

### Configuration Objects
Define constants at file top for animation timings, breakpoints, and content:
```javascript
// Projects.tsx
const BREAKPOINTS = { MOBILE: 640, TABLET: 1024 };
const PROJECTS_PER_VIEW = { MOBILE: 1, TABLET: 2, DESKTOP: 3 };
```

### Navigation with react-scroll
All internal links use `react-scroll`'s `<Link>` component. Section targets must have matching `id` attributes:
```javascript
<Link to="projects" smooth={true} duration={600}>
// Target: <section id="projects">
```

## Styling Approach

- **Tailwind utility-first** — avoid custom CSS files except for global styles in `src/index.css`
- **Gradient themes** — use `from-cyan-*/to-blue-*` gradients consistently for brand colors
- **Responsive prefixes** — follow mobile-first: `text-sm md:text-base lg:text-lg`
- **Animations** — define keyframes in `tailwind.config.js` under `theme.extend`

## External Integrations

| Service | Purpose | Config Location |
|---------|---------|-----------------|
| Web3Forms | Contact form submission | `VITE_WEB3FORMS_ACCESS_KEY` env var |
| Vercel Analytics | Page analytics | Auto-imported in `App.tsx` |
| Vercel Speed Insights | Performance monitoring | Auto-imported in `App.tsx` |

### API Route (Vercel Serverless)
`api/submit-form.ts` handles form submissions server-side. Uses `WEB3FORMS_ACCESS_KEY` (note: different env var name than client).

## Development Commands

```bash
npm start        # Dev server at localhost:3000
npm run build    # Production build → /build
npm test         # Jest with React Testing Library
```

## Important Implementation Details

1. **Horizontal overflow prevention** — Global styles in `index.css` enforce `overflow-x: hidden` and `max-width: 100%` to prevent mobile scrolling issues

2. **Desktop-only cursor effects** — `BackgroundLayout.tsx` checks for hover capability + pointer + screen size before enabling custom cursor/parallax

3. **Math captcha** — Contact form uses client-side arithmetic challenge instead of reCAPTCHA for simpler UX (see `useMathChallenge` hook)

4. **Icon library** — Use `react-icons` for all icons. Import from specific packs:
   ```javascript
   import { FaGithub } from "react-icons/fa";      // Font Awesome
   import { SiTypescript } from "react-icons/si";  // Simple Icons
   ```

## Adding New Sections

1. Create component in `src/components/` using `.tsx` extension (not `.jsx` except BackgroundLayout)
2. Add navigation item in `Navbar.tsx` → `NAVIGATION_ITEMS` array
3. Import and place inside `<BackgroundLayout>` in `App.tsx`
4. Ensure root element has `id` matching the nav item's `to` property

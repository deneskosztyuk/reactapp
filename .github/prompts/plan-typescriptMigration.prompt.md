## Plan: Refactor JavaScript/CSS to TypeScript/Tailwind

Migrate the entire React portfolio from JavaScript to TypeScript while ensuring all styling uses Tailwind CSS utilities. The migration preserves all existing logic, hooks, and functionality by converting files incrementally from least to most complex, adding proper type definitions throughout.

### Steps

1. **Install TypeScript and type dependencies** — Add `typescript`, `@types/react`, `@types/react-dom`, `@types/react-scroll`, `@types/three`, `@types/node` to `package.json`, then run `npm install`.

2. **Create TypeScript configuration** — Add a new `tsconfig.json` at project root with React 19 JSX support, strict mode enabled, and proper include/exclude paths for `src/` and `api/`.

3. **Create type declarations** — Add `src/types/index.ts` with shared interfaces (`NavigationItem`, `Project`, `WorkExperience`, `FormValues`, `Star`, etc.) and `src/types/react-smooth-scrolll.d.ts` for the untyped library, plus `src/env.d.ts` for environment variables.

4. **Convert entry points** — Rename and type `src/index.js` → `index.tsx`, `src/reportWebVitals.js` → `reportWebVitals.ts`, `src/setupTests.js` → `setupTests.ts` with proper callback and DOM types.

5. **Convert components in dependency order** — Migrate each component (rename `.js` → `.tsx`), adding prop interfaces and hook return types:
   - `BackgroundLayout.jsx` → `.tsx` (children prop, Star/Position types)
   - `AstronautModel.js` → `.tsx` (GLTF types from `@react-three/fiber`)
   - `Navbar.js` → `.tsx` (NavigationItem, event handlers)
   - `Hero.js` → `.tsx` (Skill types, animation configs)
   - `WorkExperience.js` → `.tsx` (WorkExperience interface)
   - `Projects.js` → `.tsx` (Project, TechStackItem interfaces)
   - `Contact.js` → `.tsx` (FormValues, MathChallenge, API response types)

6. **Convert App and API route** — Rename `App.js` → `App.tsx`, delete `App.css` (unused boilerplate), rename `api/submit-form.js` → `submit-form.ts` with Vercel `VercelRequest`/`VercelResponse` types.

### Further Tasks

1. **Unused dependencies cleanup?** — Remove `devicon`, `@devicon/react`, `@coreui/icons*`, `swiper`, `react-google-recaptcha*` before migration to reduce package conflicts.

2. **Inline `<style>` tags in components** — Keep as-is for now (animation keyframes), or extract to `tailwind.config.js` under `theme.extend.keyframes`? Extracting is cleaner but requires more refactoring.

3. **Broken test file** — `App.test.js` tests for non-existent text. Delete it, or rewrite with proper assertions for actual rendered content?

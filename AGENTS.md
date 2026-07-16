# AGENTS.md

## Project

React SPA exported from Google AI Studio. Music artist portfolio with Gemini AI integration.

## Stack

- React 19, TypeScript 5.8, Vite 6, Tailwind CSS 4 (`@tailwindcss/vite` plugin)
- `motion` (v12, successor to framer-motion), `lucide-react`, `@google/genai`
- Express (runtime dependency, likely for AI Studio server deployment)

## Commands

- `npm run dev` — Vite dev server on port 3000
- `npm run build` — production build to `dist/`
- `npm run lint` — `tsc --noEmit` (type-check only, no ESLint)
- No test framework is configured.

## Path Alias

`@/` maps to the project root (both tsconfig and vite alias). Example: `import X from '@/src/components/Foo'`.

## Environment

- `GEMINI_API_KEY` — required for AI features. Set in `.env.local`.
- `DISABLE_HMR` — set to `true` to disable HMR and file watching (used by AI Studio during agent edits). Do not override in `vite.config.ts`.

## Style Conventions

- All components are in `src/components/` (flat, no nesting).
- Heavy use of Tailwind utility classes directly in JSX. Dark theme (`bg-[#07080e]`, `slate-*` palette).
- Lucide icons imported individually. Tab icons are small (`w-3.5 h-3.5`).
- TypeScript strict-ish: `isolatedModules`, `noEmit`, `skipLibCheck`.

## Gotchas

- Tailwind CSS 4 does not use `tailwind.config.js`. Configuration is via `@tailwindcss/vite` plugin and CSS directives in `src/index.css`.
- `npm run clean` removes `dist/` and `server.js` — not idempotent if `server.js` doesn't exist.
- No lockfile committed (`package-lock.json` is gitignored). Run `npm install` before assuming deps are correct.

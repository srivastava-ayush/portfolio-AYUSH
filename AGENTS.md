# AGENTS.md

## Quick start

```sh
pnpm install
pnpm dev          # next dev
pnpm build        # next build
pnpm lint         # eslint
pnpm start        # next start
```

Both `pnpm-lock.yaml` and `package-lock.json` exist — use `pnpm`.

## Framework & tooling

- **Next.js 16** App Router, **React 19**, **TypeScript 5**
- **Tailwind CSS v4** via `@tailwindcss/postcss` (no `tailwind.config.js` needed)
- **Motion** (not `framer-motion`) — import from `"motion/react"`
- Smooth scroll via **Lenis**
- `@/*` path alias → project root (e.g. `@/app/ui/cn`)
- Icons: `lucide-react`, `@phosphor-icons/react`

## Architecture

```
app/
  page.tsx           # Landing page (Hero, Projects, AboutMe sections)
  layout.tsx         # Root layout — fonts, SEO, ThemeInitializer, SoundProvider, ClarityProvider
  globals.css        # Tailwind v4 import + CSS custom properties for theming
  constants.js       # All static data: PROJECTS, SIDE_QUESTS, TECH_STACK
  sitemap.ts         # Dynamic sitemap
  robots.ts          # Robots config
  ui/                # Reusable components, Landing_Sections/, utils/
  ui/utils/cn.js     # cn() = clsx + tailwind-merge
  ui/utils/useCursor.ts  # RAF-throttled custom cursor hook
  side-quests/       # Interactive dial for Projects, Philosophy, Linux, Music, Anime
  terminal/          # Terminal-style page
  build-logs/
  orange_rolling/    # Fun page
```

## Theming

- Dark/light via `data-theme` attribute on `<html>`
- CSS custom properties (`--bg-color`, `--text-color`, `--accent-color`, etc.) in `globals.css`
- `ThemeInitializer` inline script prevents FOUC
- No external theming library

## Slices UI

The standalone project lives at `/vol1/PROJECTS/slice`. Legacy `/slices/*` URLs redirect to `https://slices-ui.vercel.app/slices/*` via `next.config.ts`.

## No tests, no CI

- No test framework exists in the repo
- No typecheck in scripts — run `tsc --noEmit` manually if needed
- No GitHub Actions / CI workflows
- Deployed on Vercel

## Conventions

- `"use client"` on interactive components; server components by default
- Mixed `.tsx` and `.js` files — both in active use
- Fonts via `next/font/google` with CSS variable strategy

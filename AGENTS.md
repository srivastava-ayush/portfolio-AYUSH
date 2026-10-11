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
- Markdown logs: `react-markdown` + `remark-gfm` + `rehype-highlight`, frontmatter via `gray-matter`

## Architecture

```
app/
  page.tsx           # Landing page (Hero, Projects, AboutMe sections)
  layout.tsx         # Root layout — fonts, SEO, ThemeInitializer, SoundProvider, ClarityProvider
  globals.css        # Tailwind v4 import + CSS custom properties for theming
  constants.js       # All static data: PROJECTS, SIDE_QUESTS, TECH_STACK
  lib/logs.ts        # Server-only reader for logs/*.md (fs + gray-matter)
  sitemap.ts         # Dynamic sitemap
  robots.ts          # Robots config
  ui/                # Reusable components, Landing_Sections/, utils/
  ui/Markdown.tsx    # react-markdown renderer (server component) + ui/markdown.css
  ui/Reveal.tsx      # Client fade-in wrapper for server pages
  ui/utils/cn.js     # cn() = clsx + tailwind-merge
  ui/utils/useCursor.ts  # RAF-throttled custom cursor hook
  side-quests/       # Interactive dial for Projects, Philosophy, Linux, Music, Anime
  terminal/          # Terminal-style page
  build-logs/        # Listing + [slug] pages, rendered from logs/*.md
  orange_rolling/    # Fun page
logs/                # Build-log posts as .md (frontmatter: title, desc, date, tags, links)
```

## Build logs

- Posts live in `logs/*.md` (root) and are the source of truth for `/build-logs`.
- Frontmatter fields: `title`, `desc`, `date` (ISO), `tags[]`, `links[]` — body is Markdown.
- `app/lib/logs.ts` reads them (`node:fs`, server-only); `[slug]` pages are statically generated via `generateStaticParams`.
- Adding a post = drop a new `.md` file in `logs/`; no code changes needed.
- `outputFileTracingIncludes` in `next.config.ts` bundles `logs/**` into the `/api/ask` function (assistant reads log metadata).

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

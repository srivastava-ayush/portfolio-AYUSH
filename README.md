# Ayush Srivastava — portfolio

Personal portfolio built with Next.js 16, React 19, TypeScript, Tailwind CSS 4, and Motion.

```sh
pnpm install
pnpm dev
pnpm lint
pnpm build
```

The portfolio includes projects and Side Quests in `/side-quests` (open `/side-quests#projects` for the project gallery), build logs, a terminal, and the Ask Orange assistant. To enable Ask Orange, set `GEMINI_API_KEY` in `.env` (see `.env.example`); `GEMINI_MODEL` is optional.

Slices UI lives in the sibling project `/vol1/PROJECTS/slice`. The portfolio links and legacy `/slices/*` redirects target [slices-ui.vercel.app/slices](https://slices-ui.vercel.app/slices).

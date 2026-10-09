# 🍊 Slices UI

---

Welcome to **Slices UI** — a living document of my latest explorations and experiments. This is my personal playground for testing new ideas, documenting learnings, and sharing discoveries with other developers.

**Fair warning:** this is *not* a polished framework. It's not production-ready. It's not trying to be the next shadcn or Radix. It's a playground — intentionally rough around the edges, always evolving.

---

##  What are Slices?

Slices are reusable **components**, **utilities**, and **templates** that I use as building blocks across my projects.

Each slice is:
- **Small** — focused on doing one thing well
- **Useful** — practical enough to drop into real projects
- **Composable** — designed to work with other slices

Individually, a slice is just a slice. But put enough of them together, and they form something whole.

That whole is **Orange**. 🍊

---

##  Ask Orange (AI assistant)

An on-site AI chat that answers questions about this portfolio — grounded in the site's own data (`app/constants.js`). It introduces itself as **Orange**.

### Setup

1. Create `.env` from `.env.example` and set a Gemini API key:
   ```
   GEMINI_API_KEY=your_key_here
   GEMINI_MODEL=gemini-3.5-flash-lite
   ```
2. Install: `pnpm install`
3. Run: `pnpm dev`

Click "Ask Orange" in the hero (or press `/`) to open the chat. The key is read only in the server-side API route (`app/api/ask/route.ts`) — it never reaches the browser.

### How it works

- **`app/api/ask/route.ts`** — streams Gemini replies as NDJSON (`{"delta": …}` frames). Validates input, enforces per-IP rate limits (in-memory), caps payloads, and aborts on timeout/client disconnect.
- **`app/lib/assistant/`** — knowledge base (serialized from `constants.js`), prompt builder (Orange persona), sanitizer, sliding-window rate limiter, and the Gemini provider (`@google/genai`).
- **`app/ui/assistant/`** — `AskMyPortfolio.tsx` (hero CTA + `/` shortcut) and `ChatPanel.tsx` (streaming chat UI). The same `ChatPanel` also embeds into the `/terminal` page as an "AI mode" (toggle `>_` / `AI` in the title bar).

### Free-tier notes

- `gemini-3.5-flash-lite` (default): ~15 requests/min, ~500 requests/day.
- `gemini-3.5-flash` / `gemini-3.8-flash`: ~5 requests/min, ~20 requests/day (switch `GEMINI_MODEL` if you want bigger answers).
- Rate limits are in-memory per server instance — fine for a portfolio, not precise across many serverless instances.

### Serverless deployment

Set `GEMINI_API_KEY` (and optionally `GEMINI_MODEL`, `GEMINI_BASE_URL`) as environment variables on your host. No build config needed.

---

##  Philosophy

```
exploration > perfection
sharing > polishing
learning > shipping
```

This repo exists because I believe in building in public. Every slice represents a problem I ran into, an idea I wanted to try, or a pattern I kept reaching for. Documenting them here keeps me honest and hopefully saves someone else a headache.

---

##  Structure

```
slices/
├── components/     # UI building blocks
├── utilities/      # Helper functions & hooks
└── templates/      # Starter layouts & patterns
```

---

##  Usage

Slices aren't installed via npm. You browse, you copy, you adapt. Think of it like a recipe book — take what you need, make it yours.

1. Browse the slices
2. Find something useful
3. Copy it into your project
4. Tweak to taste

---

##  Contributing

This is a personal playground first, but pull requests that add useful slices or improve existing ones are always welcome. Open an issue if you spot something broken or have an idea worth exploring.

---

##  License

MIT — take what's useful, build something cool.

---

*Built with curiosity. Shared with care. Powered by orange.*

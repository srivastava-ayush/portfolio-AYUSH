---
title: "Building the side-quests dial"
desc: "a rotating dial, way too much Math.sin"
date: "2026-10-05"
tags: ["frontend", "motion", "design"]
links:
  - "https://motion.dev"
  - "https://github.com/srivastava-ayush"
---

The side-quests page needed a selector that felt like a physical dial instead of
a boring list. Here's how the rotating carousel came together.

## The idea

Options sit on an arc on the right edge of a box. Rotating the dial slides them
along the arc, and whichever card reaches the centre becomes active.

## The math

Each option gets an `offset` from the current `position`. The angle is just the
offset scaled down, and the card position comes from **cosine** and **sine**:

```tsx
const angle = offset * 0.32;
const x = -Math.cos(angle) * radius;
const y = Math.sin(angle) * step * 2.1;
```

The `-cos` keeps the active card furthest from the hub, and `sin` fans the rest
up and down along the arc.

## The physics

Rather than snapping, the dial uses a critically damped spring so it eases into
place without bouncing:

```ts
velocity += (freq ** 2 * (target - position) - 2 * freq * velocity) * dt;
position += velocity * dt;
```

## Details worth keeping

- **Intro spin** — the whole dial does one `360deg` rotation on first render.
- **Inputs** — wheel, drag, swipe, and `j` / `k` keys all drive the same target.
- **Reduced motion** — the spin is skipped when the user asks for less motion.

> The best part of building this was that every interaction collapses into a
> single `target` value. Change the target, and the dial figures out the rest.

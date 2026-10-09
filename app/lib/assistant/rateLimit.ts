/**
 * Lightweight in-memory sliding-window rate limiter for the assistant API.
 *
 * IMPORTANT (deployment trade-off): the counter lives in process memory, so on
 * serverless platforms (e.g. Vercel) it is per-instance, not global across
 * instances. It is a best-effort abuse control that is cheap and dependency-free
 * — appropriate for a small portfolio. For a hard global quota, replace this
 * module with a shared store (Redis / Upstash / D1) keeping the same interface.
 *
 * The Gemini free tier is the real budget; per-IP limits here are deliberately
 * smaller than the provider's daily allowance so the free quota is never burned
 * by a single visitor.
 */

interface Entry {
  timestamps: number[];
  lastSeen: number;
}

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSec: number;
}

export class SlidingWindowLimiter {
  private readonly buckets = new Map<string, Entry>();
  private readonly windowMs: number;
  private readonly maxHits: number;
  private readonly maxKeys: number;

  constructor(windowMs: number, maxHits: number, maxKeys = 2000) {
    this.windowMs = windowMs;
    this.maxHits = maxHits;
    this.maxKeys = maxKeys;
  }

  consume(key: string): RateLimitResult {
    const now = Date.now();
    let entry = this.buckets.get(key);
    if (!entry) {
      entry = { timestamps: [], lastSeen: now };
      this.buckets.set(key, entry);
    }
    entry.lastSeen = now;

    const cutoff = now - this.windowMs;
    entry.timestamps = entry.timestamps.filter((ts) => ts > cutoff);

    if (entry.timestamps.length >= this.maxHits) {
      const oldest = entry.timestamps[0];
      return {
        allowed: false,
        retryAfterSec: Math.max(1, Math.ceil((oldest + this.windowMs - now) / 1000)),
      };
    }

    entry.timestamps.push(now);
    this.prune(now);
    return { allowed: true, retryAfterSec: 0 };
  }

  /** Bound memory: drop stale keys, evict least-recently-seen if over budget. */
  private prune(now: number): void {
    if (this.buckets.size <= this.maxKeys) return;
    for (const [k, v] of this.buckets) {
      if (v.lastSeen < now - this.windowMs) this.buckets.delete(k);
    }
    if (this.buckets.size <= this.maxKeys) return;
    const sorted = [...this.buckets.entries()].sort((a, b) => a[1].lastSeen - b[1].lastSeen);
    while (this.buckets.size > this.maxKeys) {
      const [oldestKey] = sorted.shift() ?? [];
      if (oldestKey) this.buckets.delete(oldestKey);
    }
  }
}

/** Global concurrency gate so a traffic burst can't exhaust the provider quota. */
export class ConcurrencyGate {
  private active = 0;
  private readonly maxActive: number;

  constructor(maxActive: number) {
    this.maxActive = maxActive;
  }

  tryAcquire(): boolean {
    if (this.active >= this.maxActive) return false;
    this.active += 1;
    return true;
  }

  release(): void {
    this.active = Math.max(0, this.active - 1);
  }

  get current(): number {
    return this.active;
  }
}
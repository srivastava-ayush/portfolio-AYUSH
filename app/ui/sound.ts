'use client';

const CLICK_SRC = '/audio/click_sound.mp3';
const POOL_SIZE = 6;
const VOLUME = 0.02;

let pool: HTMLAudioElement[] = [];
let index = 0;
let unlocked = false;

function ensurePool() {
  if (typeof window === 'undefined' || pool.length) return;
  pool = Array.from({ length: POOL_SIZE }, () => {
    const audio = new Audio(CLICK_SRC);
    audio.volume = VOLUME;
    return audio;
  });
}

/** Prime the audio elements on the first user gesture so later plays aren't blocked. */
export function unlockSound() {
  if (unlocked) return;
  unlocked = true;
  ensurePool();
  for (const audio of pool) {
    audio
      .play()
      .then(() => {
        audio.pause();
        audio.currentTime = 0;
      })
      .catch(() => {});
  }
}

/** Play the shared click/scroll effect. */
export function playClickSound() {
  ensurePool();
  if (!pool.length) return;
  const audio = pool[index % pool.length];
  index++;
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

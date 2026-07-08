'use client';

import { useEffect, useRef } from 'react';

export function SoundProvider() {
  const audioPool = useRef<HTMLAudioElement[]>([]);
  const poolIndex = useRef(0);
  const unlocked = useRef(false);

  useEffect(() => {
    audioPool.current = Array.from({ length: 6 }, () => {
      const a = new Audio('/audio/click_sound.mp3');
      a.volume = 0.02;
      return a;
    });
  }, []);

  useEffect(() => {
    const unlock = async () => {
      if (unlocked.current) return;
      for (const audio of audioPool.current) {
        try { await audio.play(); audio.pause(); audio.currentTime = 0; } catch {}
      }
      unlocked.current = true;
      document.removeEventListener('click', unlock);
    };
    document.addEventListener('click', unlock);
    return () => document.removeEventListener('click', unlock);
  }, []);

  useEffect(() => {
    const playClickSound = () => {
      const pool = audioPool.current;
      if (!pool.length) return;
      const audio = pool[poolIndex.current % pool.length];
      poolIndex.current++;
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const clickable = target.closest(
        ['button', 'a', '[role="button"]', '[role="tab"]', '[role="menuitem"]',
         '[role="option"]', 'input[type="button"]', 'input[type="submit"]',
         'input[type="checkbox"]', 'input[type="radio"]', 'select', 'label',
         'summary', '[data-clickable]', '[onclick]',
         '[tabindex]:not([tabindex="-1"])'].join(', ')
      );
      if (clickable) playClickSound();
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
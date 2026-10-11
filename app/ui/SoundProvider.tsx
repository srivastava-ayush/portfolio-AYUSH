'use client';

import { useEffect } from 'react';
import { playClickSound, unlockSound } from './sound';

export function SoundProvider() {
  useEffect(() => {
    const unlock = () => unlockSound();
    document.addEventListener('click', unlock);
    return () => document.removeEventListener('click', unlock);
  }, []);

  useEffect(() => {
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

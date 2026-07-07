'use client';

import Clarity from '@microsoft/clarity';
import { useEffect } from 'react';

export function ClarityProvider() {
  useEffect(() => { Clarity.init("xisdx068tj");
    
  }, []);

  return null;
}

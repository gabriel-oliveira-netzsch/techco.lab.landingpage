'use client';

import { useTimeOnPage } from '@/hooks/useTimeOnPage';

export function PageTracking() {
  useTimeOnPage();
  return null;
}

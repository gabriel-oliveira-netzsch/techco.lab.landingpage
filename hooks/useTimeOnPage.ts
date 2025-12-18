'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { trackTimeOnPage, hasStatisticsConsent } from '@/lib/analytics';

export function useTimeOnPage() {
  const pathname = usePathname();
  const startTimeRef = useRef<number>(Date.now());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!hasStatisticsConsent()) return;

    // Reset start time when pathname changes
    startTimeRef.current = Date.now();

    // Track time every 30 seconds
    intervalRef.current = setInterval(() => {
      const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
      if (timeSpent > 0) {
        trackTimeOnPage(pathname, timeSpent);
      }
    }, 30000);

    // Track time when leaving the page
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
      if (timeSpent > 0) {
        trackTimeOnPage(pathname, timeSpent);
      }
    };
  }, [pathname]);
}

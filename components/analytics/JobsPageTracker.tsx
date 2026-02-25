'use client';

import { useEffect } from 'react';
import { trackJobsPageView } from '@/lib/analytics';
import { hasStatisticsConsent } from '@/lib/analytics';

export function JobsPageTracker() {
  useEffect(() => {
    if (hasStatisticsConsent()) {
      trackJobsPageView();
    }
  }, []);

  return null;
}

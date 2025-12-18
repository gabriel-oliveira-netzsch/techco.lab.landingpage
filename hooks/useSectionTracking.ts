'use client';

import { useEffect, useRef } from 'react';
import { trackSectionView, trackScrollToSection, hasStatisticsConsent } from '@/lib/analytics';

interface UseSectionTrackingOptions {
  sectionId: string;
  threshold?: number;
}

export function useSectionTracking({ sectionId, threshold = 0.5 }: UseSectionTrackingOptions) {
  const sectionRef = useRef<HTMLElement>(null);
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!hasStatisticsConsent() || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
            const percentVisible = Math.round(entry.intersectionRatio * 100);
            
            // Track section view (only once)
            if (!hasTracked.current) {
              trackSectionView(sectionId);
              hasTracked.current = true;
            }
            
            // Track scroll to section
            trackScrollToSection(sectionId, percentVisible);
          }
        });
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, [sectionId, threshold]);

  return sectionRef;
}

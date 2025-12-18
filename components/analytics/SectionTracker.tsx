'use client';

import { useRef, ReactNode } from 'react';
import { useSectionTracking } from '@/hooks/useSectionTracking';

interface SectionTrackerProps {
  sectionId: string;
  children: ReactNode;
  className?: string;
  threshold?: number;
}

export function SectionTracker({ 
  sectionId, 
  children, 
  className,
  threshold = 0.5 
}: SectionTrackerProps) {
  const sectionRef = useSectionTracking({ sectionId, threshold });

  return (
    <section 
      ref={sectionRef as React.RefObject<HTMLElement>}
      className={className}
      data-section={sectionId}
    >
      {children}
    </section>
  );
}

'use client';

import Link from 'next/link';
import { trackExternalLink, hasStatisticsConsent } from '@/lib/analytics';

interface ExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  linkText?: string;
}

export function ExternalLink({ href, children, linkText, ...props }: ExternalLinkProps) {
  const handleClick = () => {
    if (hasStatisticsConsent()) {
      trackExternalLink(href, linkText || (typeof children === 'string' ? children : href));
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  );
}

'use client';

import { useLocale } from 'next-intl';

interface ServiceSchemaProps {
  name: string;
  description: string;
  serviceType?: string;
  areaServed?: string;
}

export function ServiceSchema({
  name,
  description,
  serviceType,
  areaServed,
}: ServiceSchemaProps) {
  const locale = useLocale();
  const baseUrl = 'https://ntechcolab.com';
  const prefix = locale === 'en' ? '/en' : `/${locale}`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: 'Techco.lab',
      url: baseUrl + prefix,
      parentOrganization: {
        '@type': 'Organization',
        name: 'NETZSCH Group',
        url: 'https://www.netzsch.com',
      },
    },
    ...(serviceType && { serviceType }),
    ...(areaServed && { areaServed }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

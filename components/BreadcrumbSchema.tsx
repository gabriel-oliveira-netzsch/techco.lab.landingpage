'use client';

import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  customItems?: BreadcrumbItem[];
}

export function BreadcrumbSchema({ customItems }: BreadcrumbSchemaProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('Navigation');

  const baseUrl = 'https://ntechcolab.com';
  const prefix = locale === 'en' ? '' : `/${locale}`;

  // Route name mappings
  const routeNames: Record<string, string> = {
    'what-we-do': t('whatWeDo'),
    'our-culture': t('ourCulture'),
    'open-positions': t('openPositions'),
    'positions': t('openPositions'),
    'imprint': 'Legal Notice',
    'aviso-legal': 'Aviso Legal',
  };

  // Generate breadcrumb items from pathname
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (customItems) return customItems;

    const items: BreadcrumbItem[] = [
      { name: t('home'), url: baseUrl + (prefix || '/') },
    ];

    // Remove locale prefix and split path
    const pathWithoutLocale = pathname.replace(`/${locale}`, '').replace(/^\//, '');
    const segments = pathWithoutLocale.split('/').filter(Boolean);

    let currentPath = prefix;
    for (const segment of segments) {
      // Skip dynamic segments like job IDs
      if (segment.match(/^[a-f0-9-]{36}$/i)) continue;

      currentPath += `/${segment}`;
      const name = routeNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
      items.push({ name, url: baseUrl + currentPath });
    }

    return items;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't render if only home
  if (breadcrumbs.length <= 1) return null;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

import type { MetadataRoute } from 'next';

const baseUrl = 'https://ntechcolab.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/what-we-do',
    '/our-culture',
    '/open-positions',
    '/imprint',
    '/privacy-policy',
  ];

  const locales = ['en', 'pt-BR'];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate entries for each locale
  for (const route of routes) {
    for (const locale of locales) {
      const url =
        locale === 'en'
          ? `${baseUrl}${route || '/'}`
          : `${baseUrl}/${locale}${route || ''}`;

      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}${route || '/'}`,
            'pt-BR': `${baseUrl}/pt-BR${route || ''}`,
          },
        },
      });
    }
  }

  // Add position detail pages
  const positionIds = ['1', '2', '3'];
  for (const id of positionIds) {
    for (const locale of locales) {
      const url =
        locale === 'en'
          ? `${baseUrl}/positions/${id}`
          : `${baseUrl}/${locale}/positions/${id}`;

      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }
  }

  return sitemapEntries;
}


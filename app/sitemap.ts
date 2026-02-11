import type { MetadataRoute } from 'next';

const baseUrl = 'https://ntechcolab.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Routes that are the same in both languages
  const sharedRoutes = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/what-we-do', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/our-culture', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/open-positions', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/positions', priority: 0.7, changeFrequency: 'weekly' as const },
  ];

  // Add shared routes for both locales
  for (const route of sharedRoutes) {
    // English version
    sitemapEntries.push({
      url: `${baseUrl}/en${route.path || ''}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          en: `${baseUrl}/en${route.path || ''}`,
          'pt-BR': `${baseUrl}/pt-BR${route.path || ''}`,
        },
      },
    });

    // Portuguese version
    sitemapEntries.push({
      url: `${baseUrl}/pt-BR${route.path || ''}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          en: `${baseUrl}/en${route.path || ''}`,
          'pt-BR': `${baseUrl}/pt-BR${route.path || ''}`,
        },
      },
    });
  }

  // Imprint - localized route names
  sitemapEntries.push({
    url: `${baseUrl}/en/imprint`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.5,
    alternates: {
      languages: {
        en: `${baseUrl}/en/imprint`,
        'pt-BR': `${baseUrl}/pt-BR/aviso-legal`,
      },
    },
  });

  sitemapEntries.push({
    url: `${baseUrl}/pt-BR/aviso-legal`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.5,
    alternates: {
      languages: {
        en: `${baseUrl}/en/imprint`,
        'pt-BR': `${baseUrl}/pt-BR/aviso-legal`,
      },
    },
  });

  // Privacy Policy - same route name for both languages
  sitemapEntries.push({
    url: `${baseUrl}/en/privacy-policy`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.5,
    alternates: {
      languages: {
        en: `${baseUrl}/en/privacy-policy`,
        'pt-BR': `${baseUrl}/pt-BR/privacy-policy`,
      },
    },
  });

  sitemapEntries.push({
    url: `${baseUrl}/pt-BR/privacy-policy`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.5,
    alternates: {
      languages: {
        en: `${baseUrl}/en/privacy-policy`,
        'pt-BR': `${baseUrl}/pt-BR/privacy-policy`,
      },
    },
  });

  return sitemapEntries;
}


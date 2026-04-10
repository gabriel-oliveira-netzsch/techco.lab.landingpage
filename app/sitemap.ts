import type { MetadataRoute } from "next";
import { getPublicJobs } from "@/lib/smartrecruiters";

const baseUrl = "https://ntechcolab.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Static routes (localePrefix: as-needed — en has no prefix)
  const staticRoutes = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/what-we-do", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/our-culture", priority: 0.8, changeFrequency: "monthly" as const },
    {
      path: "/open-positions",
      priority: 0.9,
      changeFrequency: "daily" as const,
    },
  ];

  for (const route of staticRoutes) {
    sitemapEntries.push({
      url: `${baseUrl}${route.path || "/"}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          en: `${baseUrl}${route.path || "/"}`,
          "pt-BR": `${baseUrl}/pt-BR${route.path || ""}`,
        },
      },
    });

    sitemapEntries.push({
      url: `${baseUrl}/pt-BR${route.path || ""}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          en: `${baseUrl}${route.path || "/"}`,
          "pt-BR": `${baseUrl}/pt-BR${route.path || ""}`,
        },
      },
    });
  }

  // Imprint / Aviso Legal
  sitemapEntries.push({
    url: `${baseUrl}/imprint`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.3,
    alternates: {
      languages: {
        en: `${baseUrl}/imprint`,
        "pt-BR": `${baseUrl}/pt-BR/aviso-legal`,
      },
    },
  });

  sitemapEntries.push({
    url: `${baseUrl}/pt-BR/aviso-legal`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.3,
    alternates: {
      languages: {
        en: `${baseUrl}/imprint`,
        "pt-BR": `${baseUrl}/pt-BR/aviso-legal`,
      },
    },
  });

  // Privacy Policy
  sitemapEntries.push({
    url: `${baseUrl}/privacy-policy`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.5,
    alternates: {
      languages: {
        en: `${baseUrl}/privacy-policy`,
        "pt-BR": `${baseUrl}/pt-BR/privacy-policy`,
      },
    },
  });

  sitemapEntries.push({
    url: `${baseUrl}/pt-BR/privacy-policy`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.5,
    alternates: {
      languages: {
        en: `${baseUrl}/privacy-policy`,
        "pt-BR": `${baseUrl}/pt-BR/privacy-policy`,
      },
    },
  });

  // Dynamic job positions
  const jobs = await getPublicJobs();
  for (const job of jobs) {
    sitemapEntries.push({
      url: `${baseUrl}/positions/${job.id}`,
      lastModified: new Date(job.updatedOn || job.createdOn),
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/positions/${job.id}`,
          "pt-BR": `${baseUrl}/pt-BR/positions/${job.id}`,
        },
      },
    });

    sitemapEntries.push({
      url: `${baseUrl}/pt-BR/positions/${job.id}`,
      lastModified: new Date(job.updatedOn || job.createdOn),
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/positions/${job.id}`,
          "pt-BR": `${baseUrl}/pt-BR/positions/${job.id}`,
        },
      },
    });
  }

  return sitemapEntries;
}

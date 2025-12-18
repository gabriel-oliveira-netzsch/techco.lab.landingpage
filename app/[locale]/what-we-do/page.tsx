import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { GlobalFooter } from '@/components/GlobalFooter';
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import {
  WhatWeDoHeroSection,
  ProjectsSection,
  WhatWeDoTestimonialsSection,
  WhatWeDoPreFooterSection,
} from "@/components/sections";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "WhatWeDo" });

  return {
    title: `${t("title")} ${t("titleHighlight")} | Techco.lab`,
    description: t("subtitle"),
    alternates: {
      canonical:
        locale === "en"
          ? "https://ntechcolab.com/what-we-do"
          : `https://ntechcolab.com/${locale}/what-we-do`,
      languages: {
        en: "https://ntechcolab.com/what-we-do",
        "pt-BR": "https://ntechcolab.com/pt-BR/what-we-do",
      },
    },
  };
}

export default async function WhatWeDoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div data-name="WhatWeDo" className="flex flex-col min-h-screen bg-white">
      <BreadcrumbSchema />
      <Header currentPage="what-we-do" />
      <main className="flex-1">
        <WhatWeDoHeroSection />
        <ProjectsSection />
        <WhatWeDoTestimonialsSection />
        <WhatWeDoPreFooterSection />
      </main>
      <GlobalFooter />
    </div>
  );
}

import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { GlobalFooter } from '@/components/GlobalFooter';
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { ServiceSchema } from "@/components/ServiceSchema";
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
    title: t("pageTitle"),
    description: t("pageDescription"),
    alternates: {
      canonical: `https://ntechcolab.com/${locale}/what-we-do`,
      languages: {
        en: "https://ntechcolab.com/en/what-we-do",
        "pt-BR": "https://ntechcolab.com/pt-BR/what-we-do",
      },
    },
  };
}

export default async function WhatWeDoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "WhatWeDo" });

  return (
    <div data-name="WhatWeDo" className="flex flex-col min-h-screen bg-white">
      <BreadcrumbSchema />
      <ServiceSchema
        name={t("serviceName")}
        description={t("serviceDescription")}
        serviceType="Professional Service"
        areaServed="Worldwide"
      />
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

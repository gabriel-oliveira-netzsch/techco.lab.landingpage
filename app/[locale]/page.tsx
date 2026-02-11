import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { GlobalFooter } from '@/components/GlobalFooter';
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import {
  HeroSection,
  TechHubSection,
  CapabilitiesSection,
  TurningIdeasSection,
  LocationsSection,
  StatsSection,
  TestimonialsSection,
  PreFooterSection,
} from "@/components/sections";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SEO.home" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    alternates: {
      canonical: `https://ntechcolab.com/${locale}`,
      languages: {
        en: "https://ntechcolab.com/en",
        "pt-BR": "https://ntechcolab.com/pt-BR",
      },
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div data-name="Home" className="flex flex-col min-h-screen bg-white">
      <BreadcrumbSchema />
      <Header currentPage="home" />
      <main className="flex-1">
        <HeroSection />
        <TechHubSection />
        <CapabilitiesSection />
        <TurningIdeasSection />
        <LocationsSection />
        <StatsSection />
        <TestimonialsSection />
        <PreFooterSection />
      </main>
      <GlobalFooter />
    </div>
  );
}

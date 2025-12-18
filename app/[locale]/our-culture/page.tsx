import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { GlobalFooter } from '@/components/GlobalFooter';
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import {
  CultureHeroSection,
  GPTWSection,
  MilestonesSection,
  BenefitsSection,
  RealDealSection,
  CultureTestimonialsSection,
  CulturePreFooterSection,
} from "@/components/sections";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "OurCulture" });

  return {
    title: `${t("hero.title")} ${t("hero.titleHighlight")} | Techco.lab`,
    description: t("hero.subtitle"),
    alternates: {
      canonical:
        locale === "en"
          ? "https://ntechcolab.com/our-culture"
          : `https://ntechcolab.com/${locale}/our-culture`,
      languages: {
        en: "https://ntechcolab.com/our-culture",
        "pt-BR": "https://ntechcolab.com/pt-BR/our-culture",
      },
    },
  };
}

export default async function OurCulturePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div data-name="OurCulture" className="flex flex-col min-h-screen bg-white">
      <BreadcrumbSchema />
      <Header currentPage="our-culture" />
      <main className="flex-1">
        <CultureHeroSection />
        <GPTWSection />
        <MilestonesSection />
        <BenefitsSection />
        <RealDealSection />
        <CultureTestimonialsSection />
        <CulturePreFooterSection />
      </main>
      <GlobalFooter />
    </div>
  );
}

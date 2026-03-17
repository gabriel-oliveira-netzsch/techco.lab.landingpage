import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { GlobalFooter } from '@/components/GlobalFooter';
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { ServiceSchema } from "@/components/ServiceSchema";
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

  const baseUrl = "https://ntechcolab.com";
  const canonical =
    locale === "en"
      ? `${baseUrl}/our-culture`
      : `${baseUrl}/${locale}/our-culture`;
  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
    alternates: {
      canonical,
      languages: {
        en: `${baseUrl}/our-culture`,
        "pt-BR": `${baseUrl}/pt-BR/our-culture`,
      },
    },
  };
}

export default async function OurCulturePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "OurCulture" });

  return (
    <div data-name="OurCulture" className="flex flex-col min-h-screen bg-white">
      <BreadcrumbSchema />
      <ServiceSchema
        name={t("serviceName")}
        description={t("serviceDescription")}
        serviceType="Professional Service"
        areaServed="Worldwide"
      />
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

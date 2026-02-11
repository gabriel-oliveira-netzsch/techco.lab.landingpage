import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from "next/link";
import { Header } from "@/components/Header";
import { GlobalFooter } from "@/components/GlobalFooter";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { ServiceSchema } from "@/components/ServiceSchema";
import { JobsList, TalentPoolCTA } from "@/components/jobs";
import { ArrowRightIcon } from "@/components/icons";
import { JobsPageTracker } from "@/components/analytics/JobsPageTracker";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "OpenPositions" });

  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
    alternates: {
      canonical: `https://ntechcolab.com/${locale}/open-positions`,
      languages: {
        en: "https://ntechcolab.com/en/open-positions",
        "pt-BR": "https://ntechcolab.com/pt-BR/open-positions",
      },
    },
  };
}

export default async function OpenPositionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "OpenPositions" });
  const tCommon = await getTranslations({ locale, namespace: "Common" });

  const translations = {
    searchPlaceholder: t("searchPlaceholder"),
    locationPlaceholder: t("locationPlaceholder"),
    clearFilters: t("clearFilters"),
    noPositions: t("noPositions"),
    applyNow: t("applyNow"),
    loading: tCommon("loading"),
    error: tCommon("error"),
    hybrid: t("hybrid"),
    remote: t("remote"),
    onsite: t("onsite"),
    workTypeHybrid: t("workTypeHybrid"),
    workTypeRemote: t("workTypeRemote"),
    workTypeOnsite: t("workTypeOnsite"),
  };

  const talentPoolCTATranslations = {
    title: t("talentPoolCTA.title"),
    subtitle: t("talentPoolCTA.subtitle"),
    buttonText: t("talentPoolCTA.buttonText"),
    modalTitle: t("talentPoolCTA.modalTitle"),
  };

  return (
    <div
      data-name="OpenPositions"
      className="flex flex-col min-h-screen bg-white"
    >
      <BreadcrumbSchema />
      <ServiceSchema
        name={t("serviceName")}
        description={t("serviceDescription")}
        serviceType="Employment Service"
        areaServed="Brazil"
      />
      <Header currentPage="open-positions" />
      <main className="flex-1">
        {/* Page Hero */}
        <section className="bg-[#4c4d58] relative w-full py-[48px] md:py-[64px] lg:py-[80px]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-8">
            <h1 className="text-[32px] md:text-[42px] lg:text-[48px] font-bold leading-[1.2] text-white mb-4">
              {t("title")}{" "}
              <span className="text-[#00B894]">{t("titleHighlight")}</span>
            </h1>
            <p className="text-[15px] md:text-[17px] leading-[1.7] text-white/80">
              {t("subtitle")}
            </p>
          </div>
          <div className="max-w-[1200px] mx-auto mt-10 px-6 md:px-8">
            <div className="bg-white rounded-[8px] py-8 px-6 md:px-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-[15px] md:text-[16px] text-[#4c4d58] text-center md:text-left">
                {t("cultureQuestion")}
              </p>
              <Link
                href={`/${locale === "en" ? "en" : locale}/our-culture`}
                className="flex items-center gap-2 text-[#00B894] font-semibold text-[15px] hover:gap-3 transition-all whitespace-nowrap group"
              >
                {t("cultureLink")}
                <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Jobs List Section */}
        <section className="bg-[#fafafa] py-[48px] md:py-[64px]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-8">
            <JobsPageTracker />
            <JobsList translations={translations} locale={locale} />
          </div>
        </section>

        {/* Talent Pool CTA Section */}
        <TalentPoolCTA translations={talentPoolCTATranslations} />
      </main>
      <GlobalFooter />
    </div>
  );
}

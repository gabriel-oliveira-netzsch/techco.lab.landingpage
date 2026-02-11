import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { GlobalFooter } from '@/components/GlobalFooter';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Imprint' });

  return {
    title: `${t('title')} | Techco.lab`,
    description: t('subtitle'),
    alternates: {
      canonical:
        locale === 'en'
          ? 'https://ntechcolab.com/en/imprint'
          : `https://ntechcolab.com/${locale}/aviso-legal`,
      languages: {
        en: 'https://ntechcolab.com/en/imprint',
        'pt-BR': 'https://ntechcolab.com/pt-BR/aviso-legal',
      },
    },
  };
}

export default async function ImprintPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Imprint' });

  return (
    <div data-name="Imprint" className="flex flex-col min-h-screen bg-white">
      <Header currentPage="imprint" />
      <main className="flex-1">
        {/* Content */}
        <section className="bg-white py-[48px] md:py-[64px]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-8">
            {/* Title */}
            <h1 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#4c4d58] mb-8">
              {t("title")}
            </h1>

            {/* Company Info */}
            <div className="mb-8 text-[15px] text-[#4c4d58] leading-[1.8]">
              <p>{t("company.name")}</p>
              <p>{t("company.street")}</p>
              <p>{t("company.city")}</p>
              <p>{t("company.phone")}</p>
              <p>{t("company.fax")}</p>
              <p>{t("company.email")}</p>
              <p>{t("company.website")}</p>
            </div>

            {/* Directors */}
            <div className="mb-8 text-[15px] text-[#4c4d58] leading-[1.8]">
              <p className="font-bold">{t("directors.title")}</p>
              <p>{t("directors.names")}</p>
              <p>{t("directors.court")}</p>
              <p>{t("directors.registerNumber")}</p>
              <p>{t("directors.taxNumber")}</p>
            </div>

            {/* Responsible */}
            <div className="mb-8 text-[15px] text-[#4c4d58] leading-[1.8]">
              <p className="font-bold">{t("responsible.title")}</p>
              <p className="font-bold">{t("responsible.subtitle")}</p>
              <p>{t("responsible.name")}</p>
              <p>{t("responsible.company")}</p>
              <p>{t("responsible.street")}</p>
              <p>{t("responsible.city")}</p>
            </div>

            <hr className="border-gray-200 my-8" />

            {/* Liability */}
            <div className="mb-8">
              <h2 className="text-[20px] md:text-[22px] font-bold text-[#4c4d58] mb-4">
                {t("liability.title")}
              </h2>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8] mb-4">
                {t("liability.content1")}
              </p>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8]">
                {t("liability.content2")}
              </p>
            </div>

            <hr className="border-gray-200 my-8" />

            {/* Copyright */}
            <div className="mb-8">
              <h2 className="text-[20px] md:text-[22px] font-bold text-[#4c4d58] mb-4">
                {t("copyright.title")}
              </h2>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8] mb-4">
                {t("copyright.content1")}
              </p>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8]">
                {t("copyright.content2")}
              </p>
            </div>

            <hr className="border-gray-200 my-8" />

            {/* Advertising */}
            <div className="mb-8">
              <h2 className="text-[20px] md:text-[22px] font-bold text-[#4c4d58] mb-4">
                {t("advertising.title")}
              </h2>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8]">
                {t("advertising.content")}
              </p>
            </div>
          </div>
        </section>
      </main>
      <GlobalFooter />
    </div>
  );
}

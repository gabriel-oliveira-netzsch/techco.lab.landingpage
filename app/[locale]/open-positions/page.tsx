import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { GlobalFooter } from '@/components/GlobalFooter';
import { JobsList } from '@/components/jobs';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'OpenPositions' });

  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      canonical:
        locale === 'en'
          ? 'https://ntechcolab.com/open-positions'
          : `https://ntechcolab.com/${locale}/open-positions`,
      languages: {
        en: 'https://ntechcolab.com/open-positions',
        'pt-BR': 'https://ntechcolab.com/pt-BR/open-positions',
      },
    },
  };
}

export default async function OpenPositionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'OpenPositions' });
  const tCommon = await getTranslations({ locale, namespace: 'Common' });

  const translations = {
    searchPlaceholder: t('searchPlaceholder'),
    locationPlaceholder: t('locationPlaceholder'),
    clearFilters: t('clearFilters'),
    noPositions: t('noPositions'),
    applyNow: t('applyNow'),
    loading: tCommon('loading'),
    error: tCommon('error'),
    hybrid: t('hybrid'),
  };

  return (
    <div data-name="OpenPositions" className="flex flex-col min-h-screen bg-white">
      <Header currentPage="open-positions" />
      <main className="flex-1">
        {/* Page Hero */}
        <section className="bg-[#4c4d58] relative w-full py-[48px] md:py-[64px] lg:py-[80px]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-8 text-center">
            <h1 className="text-[32px] md:text-[42px] lg:text-[48px] font-bold leading-[1.2] text-white mb-3">
              {t('title')}
            </h1>
            <p className="text-[15px] md:text-[17px] leading-[1.6] text-white/80 max-w-[550px] mx-auto">
              {t('subtitle')}
            </p>
          </div>
        </section>

        {/* Jobs List Section */}
        <section className="bg-[#fafafa] py-[48px] md:py-[64px]">
          <div className="max-w-[900px] mx-auto px-6 md:px-8">
            <JobsList translations={translations} locale={locale} />
          </div>
        </section>
      </main>
      <GlobalFooter />
    </div>
  );
}

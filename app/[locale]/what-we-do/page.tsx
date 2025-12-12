import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { GlobalFooter } from '@/components/GlobalFooter';
import { WhatWeDeliverSection, PreFooterSection } from '@/components/sections';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'WhatWeDo' });

  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      canonical:
        locale === 'en'
          ? 'https://ntechcolab.com/what-we-do'
          : `https://ntechcolab.com/${locale}/what-we-do`,
      languages: {
        en: 'https://ntechcolab.com/what-we-do',
        'pt-BR': 'https://ntechcolab.com/pt-BR/what-we-do',
      },
    },
  };
}

export default async function WhatWeDoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'WhatWeDo' });

  return (
    <div data-name="WhatWeDo" className="flex flex-col min-h-screen bg-white">
      <Header currentPage="what-we-do" />
      <main className="flex-1">
        {/* Page Hero */}
        <section className="bg-[#4c4d58] relative w-full py-[64px] md:py-[80px] lg:py-[120px]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-8 text-center">
            <h1 className="text-[32px] md:text-[48px] lg:text-[56px] font-bold leading-[1.2] text-white mb-4">
              {t('title')}
            </h1>
            <p className="text-[16px] md:text-[18px] leading-[1.6] text-white/80 max-w-[600px] mx-auto">
              {t('subtitle')}
            </p>
          </div>
        </section>

        <WhatWeDeliverSection />
        <PreFooterSection />
      </main>
      <GlobalFooter />
    </div>
  );
}


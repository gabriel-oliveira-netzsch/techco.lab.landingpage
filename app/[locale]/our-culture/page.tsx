import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { GlobalFooter } from '@/components/GlobalFooter';
import { PreFooterSection } from '@/components/sections';
import { images } from '@/lib/images';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'OurCulture' });

  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      canonical:
        locale === 'en'
          ? 'https://ntechcolab.com/our-culture'
          : `https://ntechcolab.com/${locale}/our-culture`,
      languages: {
        en: 'https://ntechcolab.com/our-culture',
        'pt-BR': 'https://ntechcolab.com/pt-BR/our-culture',
      },
    },
  };
}

export default async function OurCulturePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'OurCulture' });

  return (
    <div data-name="OurCulture" className="flex flex-col min-h-screen bg-white">
      <Header currentPage="our-culture" />
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

        {/* Culture Content */}
        <section className="bg-gradient-to-b from-[#f9fafb] to-white py-[64px] md:py-[80px]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Culture Cards - Placeholder content */}
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-[16px] p-[24px] shadow-md"
                >
                  <div className="h-[200px] bg-[#f3f4f6] rounded-[12px] mb-4 overflow-hidden relative">
                    <Image
                      src={images[`asset${i}` as keyof typeof images]}
                      alt={`Culture image ${i}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <h3 className="text-[18px] font-bold text-[#4c4d58] mb-2">
                    {locale === 'en' ? 'Innovation' : 'Inovação'}
                  </h3>
                  <p className="text-[14px] text-[#6b7280] leading-[1.6]">
                    {locale === 'en'
                      ? 'We foster a culture of continuous innovation and learning.'
                      : 'Fomentamos uma cultura de inovação e aprendizado contínuos.'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PreFooterSection />
      </main>
      <GlobalFooter />
    </div>
  );
}


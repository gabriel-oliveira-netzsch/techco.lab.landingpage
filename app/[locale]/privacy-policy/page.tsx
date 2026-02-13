import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { GlobalFooter } from '@/components/GlobalFooter';
import { ServiceSchema } from '@/components/ServiceSchema';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PrivacyPolicy' });

  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
    alternates: {
      canonical: `https://ntechcolab.com/${locale}/privacy-policy`,
      languages: {
        en: 'https://ntechcolab.com/en/privacy-policy',
        'pt-BR': 'https://ntechcolab.com/pt-BR/privacy-policy',
      },
    },
  };
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'PrivacyPolicy' });

  return (
    <div data-name="PrivacyPolicy" className="flex flex-col min-h-screen bg-white">
      <ServiceSchema
        name={t('serviceName')}
        description={t('serviceDescription')}
        serviceType="Professional Service"
        areaServed="Worldwide"
      />
      <Header currentPage="privacy-policy" />
      <main className="flex-1">
        {/* Content */}
        <section className="bg-white py-[48px] md:py-[64px]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-8">
            {/* Title */}
            <h1 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#4c4d58] mb-4">
              {t('title')}
            </h1>
            <p className="text-[14px] text-[#6b7280] mb-8">
              {t('lastUpdated')}
            </p>

            {/* Intro */}
            <p className="text-[15px] text-[#4c4d58] leading-[1.8] mb-8">
              {t('intro')}
            </p>

            <hr className="border-gray-200 my-8" />

            {/* I. Controller */}
            <div className="mb-8">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#4c4d58] mb-4">
                {t('controller.title')}
              </h2>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8] mb-4">
                {t('controller.description')}
              </p>
              <div className="bg-[#f9fafb] p-6 rounded-lg mb-4">
                <p className="font-bold text-[15px] text-[#4c4d58]">
                  {t('controller.company.name')}
                </p>
                <p className="text-[15px] text-[#4c4d58]">{t('controller.company.street')}</p>
                <p className="text-[15px] text-[#4c4d58]">{t('controller.company.city')}</p>
                <p className="text-[15px] text-[#4c4d58]">{t('controller.company.phone')}</p>
                <p className="text-[15px] text-[#4c4d58]">{t('controller.company.fax')}</p>
                <p className="text-[15px] text-[#4c4d58]">{t('controller.company.email')}</p>
                <p className="text-[15px] text-[#4c4d58]">{t('controller.company.website')}</p>
              </div>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8] mb-2">
                {t('controller.contact.description')}
              </p>
              <div className="bg-[#f9fafb] p-6 rounded-lg">
                <p className="font-bold text-[15px] text-[#4c4d58]">
                  {t('controller.contact.title')}
                </p>
                <p className="text-[15px] text-[#4c4d58]">{t('controller.contact.email')}</p>
              </div>
            </div>

            <hr className="border-gray-200 my-8" />

            {/* II. Data Processing */}
            <div className="mb-8">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#4c4d58] mb-4">
                {t('dataProcessing.title')}
              </h2>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8] mb-4">
                {t('dataProcessing.description')}
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-[15px] text-[#4c4d58]">
                {t.raw('dataProcessing.items').map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8] mb-2">
                {t('dataProcessing.purpose')}
              </p>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8] mb-2">
                {t('dataProcessing.legalBasis')}
              </p>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8]">
                {t('dataProcessing.note')}
              </p>
            </div>

            <hr className="border-gray-200 my-8" />

            {/* III. Cookies */}
            <div className="mb-8">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#4c4d58] mb-4">
                {t('cookies.title')}
              </h2>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8] mb-4">
                {t('cookies.description')}
              </p>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8] mb-4">
                {t('cookies.usercentrics')}
              </p>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8] mb-4">
                {t('cookies.purpose')}
              </p>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8]">
                {t('cookies.revoke')}
              </p>
            </div>

            <hr className="border-gray-200 my-8" />

            {/* IV. Analytics */}
            <div className="mb-8">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#4c4d58] mb-4">
                {t('analytics.title')}
              </h2>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8] mb-4">
                {t('analytics.description')}
              </p>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8] mb-2">
                {t('analytics.purpose')}
              </p>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8] mb-2">
                {t('analytics.legalBasis')}
              </p>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8] mb-2">
                {t('analytics.activation')}
              </p>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8] mb-2">
                {t('analytics.retention')}
              </p>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8]">
                {t('analytics.signals')}
              </p>
            </div>

            <hr className="border-gray-200 my-8" />

            {/* V. Google Search Console */}
            <div className="mb-8">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#4c4d58] mb-4">
                {t('searchConsole.title')}
              </h2>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8] mb-4">
                {t('searchConsole.description')}
              </p>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8] mb-4 whitespace-pre-line">
                {t('searchConsole.details')}
              </p>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8] mb-4">
                {t('searchConsole.aggregated')}
              </p>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8] mb-4">
                {t('searchConsole.noCookies')}
              </p>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8] mb-2">
                {t('searchConsole.purpose')}
              </p>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8] mb-4">
                {t('searchConsole.legalBasis')}
              </p>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8] whitespace-pre-line">
                {t('searchConsole.privacyLink')}
              </p>
            </div>

            <hr className="border-gray-200 my-8" />

            {/* VI. Maps */}
            <div className="mb-8">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#4c4d58] mb-4">
                {t('maps.title')}
              </h2>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8] mb-4">
                {t('maps.description')}
              </p>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8] mb-2">
                {t('maps.purpose')}
              </p>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8] mb-2">
                {t('maps.loading')}
              </p>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8]">
                {t('maps.legalBasis')}
              </p>
            </div>

            <hr className="border-gray-200 my-8" />

            {/* VII. Contact */}
            <div className="mb-8">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#4c4d58] mb-4">
                {t('contact.title')}
              </h2>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8] mb-4">
                {t('contact.description')}
              </p>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8] mb-2 font-semibold">
                {t('contact.categories')}
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-[15px] text-[#4c4d58]">
                {t.raw('contact.items').map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8] mb-4">
                {t('contact.voluntary')}
              </p>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8] mb-2">
                {t('contact.purpose')}
              </p>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8]">
                {t('contact.legalBasis')}
              </p>
            </div>

            <hr className="border-gray-200 my-8" />

            {/* VIII. Recruitment */}
            <div className="mb-8">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#4c4d58] mb-4">
                {t('recruitment.title')}
              </h2>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8] mb-4">
                {t('recruitment.description')}
              </p>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8]">
                {t('recruitment.redirect')}
              </p>
            </div>

            <hr className="border-gray-200 my-8" />

            {/* IX. Recipients */}
            <div className="mb-8">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#4c4d58] mb-4">
                {t('recipients.title')}
              </h2>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8] mb-4">
                {t('recipients.description')}
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-[15px] text-[#4c4d58]">
                {t.raw('recipients.items').map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8]">
                {t('recipients.note')}
              </p>
            </div>

            <hr className="border-gray-200 my-8" />

            {/* X. Transfers */}
            <div className="mb-8">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#4c4d58] mb-4">
                {t('transfers.title')}
              </h2>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8] mb-4">
                {t('transfers.description')}
              </p>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8]">
                {t('transfers.safeguards')}
              </p>
            </div>

            <hr className="border-gray-200 my-8" />

            {/* XI. Security */}
            <div className="mb-8">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#4c4d58] mb-4">
                {t('security.title')}
              </h2>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8]">
                {t('security.description')}
              </p>
            </div>

            <hr className="border-gray-200 my-8" />

            {/* XII. Rights */}
            <div className="mb-8">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#4c4d58] mb-4">
                {t('rights.title')}
              </h2>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8] mb-4">
                {t('rights.description')}
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-[15px] text-[#4c4d58]">
                {t.raw('rights.items').map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8] mb-4">
                {t('rights.exercise')}
              </p>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8]">
                {t('rights.complaint')}
              </p>
            </div>

            <hr className="border-gray-200 my-8" />

            {/* Contact Section */}
            <div className="mb-8">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#4c4d58] mb-4">
                {t('contactSection.title')}
              </h2>
              <p className="text-[15px] text-[#4c4d58] leading-[1.8] mb-4">
                {t('contactSection.description')}
              </p>
              <div className="bg-[#f9fafb] p-6 rounded-lg">
                <p className="font-bold text-[15px] text-[#4c4d58]">
                  {t('contactSection.title2')}
                </p>
                <p className="text-[15px] text-[#4c4d58]">{t('contactSection.email')}</p>
                <p className="text-[15px] text-[#4c4d58]">{t('contactSection.address')}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <GlobalFooter />
    </div>
  );
}

import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { GlobalFooter } from '@/components/GlobalFooter';
import { JobDetails } from '@/components/jobs';

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const t = await getTranslations({ locale, namespace: 'PositionDetails' });

  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
    alternates: {
      canonical:
        locale === 'en'
          ? `https://ntechcolab.com/positions/${id}`
          : `https://ntechcolab.com/${locale}/positions/${id}`,
    },
  };
}

export default async function PositionDetailsPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'PositionDetails' });
  const tCommon = await getTranslations({ locale, namespace: 'Common' });

  const translations = {
    backToPositions: t('backToPositions'),
    loading: tCommon('loading'),
    error: tCommon('error'),
    notFound: t('notFound'),
    viewAllPositions: t('viewAllPositions'),
    applyNow: t('applyNow'),
    interested: t('interested'),
    interestedDescription: t('interestedDescription'),
    notAcceptingApplications: t('notAcceptingApplications'),
  };

  return (
    <div data-name="PositionDetails" className="flex flex-col min-h-screen bg-white">
      <Header currentPage="open-positions" />
      <main className="flex-1">
        <JobDetails jobId={id} locale={locale} translations={translations} />
      </main>
      <GlobalFooter />
    </div>
  );
}

import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { GlobalFooter } from '@/components/GlobalFooter';
import { JobDetails } from '@/components/jobs';

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

interface JobData {
  id: string;
  title: string;
  refNumber: string;
  status: string;
  createdOn: string;
  department?: {
    id: string;
    label: string;
  };
  location: {
    countryCode: string;
    country: string;
    region: string;
    city: string;
    remote: boolean;
    hybrid: boolean;
    regionCode: string;
  };
  typeOfEmployment?: {
    id: string;
    label: string;
  };
  experienceLevel?: {
    id: string;
    label: string;
  };
  jobAd?: {
    sections: {
      companyDescription?: {
        title: string;
        text: string;
      };
      jobDescription?: {
        title: string;
        text: string;
      };
      qualifications?: {
        title: string;
        text: string;
      };
      additionalInformation?: {
        title: string;
        text: string;
      };
    };
  };
}

async function fetchJob(jobId: string): Promise<JobData | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/jobs/${jobId}`, {
      next: { revalidate: 3600 }, // Cache por 1 hora
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return data.error ? null : data.job;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const t = await getTranslations({ locale, namespace: 'PositionDetails' });

  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
    alternates: {
      canonical: `https://ntechcolab.com/${locale}/positions/${id}`,
      languages: {
        en: `https://ntechcolab.com/en/positions/${id}`,
        'pt-BR': `https://ntechcolab.com/pt-BR/positions/${id}`,
      },
    },
  };
}

export default async function PositionDetailsPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'PositionDetails' });
  const tCommon = await getTranslations({ locale, namespace: 'Common' });

  const translations = {
    backToPositions: t("backToPositions"),
    loading: tCommon("loading"),
    error: tCommon("error"),
    notFound: t("notFound"),
    viewAllPositions: t("viewAllPositions"),
    applyNow: t("applyNow"),
    interested: t("interested"),
    interestedDescription: t("interestedDescription"),
    notAcceptingApplications: t("notAcceptingApplications"),
    hybrid: t("hybrid"),
    remote: t("remote"),
    onsite: t("onsite"),
  };

  // Buscar dados da vaga no servidor
  const job = await fetchJob(id);

  // Renderizar estado de erro no servidor
  if (!job) {
    const prefix = locale === "en" ? "" : `/${locale}`;
    
    return (
      <div data-name="PositionDetails" className="flex flex-col min-h-screen bg-white">
        <Header currentPage="open-positions" />
        <main className="flex-1">
          <div className="flex flex-col items-center justify-center py-24">
            <h1 className="text-[28px] font-bold text-[#4c4d58] mb-4">
              {translations.notFound}
            </h1>
            <Link
              href={`${prefix}/open-positions`}
              className="text-[#00B894] hover:underline font-medium"
            >
              {translations.viewAllPositions}
            </Link>
          </div>
        </main>
        <GlobalFooter />
      </div>
    );
  }

  return (
    <div data-name="PositionDetails" className="flex flex-col min-h-screen bg-white">
      <Header currentPage="open-positions" />
      <main className="flex-1">
        <JobDetails initialJob={job} jobId={id} locale={locale} translations={translations} />
      </main>
      <GlobalFooter />
    </div>
  );
}

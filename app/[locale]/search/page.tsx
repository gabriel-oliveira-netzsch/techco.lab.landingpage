import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { SearchPage } from '@/components/SearchPage';
import { sanitizeSearchQuery } from '@/lib/searchValidation';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Search' });

  const baseUrl = 'https://ntechcolab.com';
  const canonical =
    locale === 'en'
      ? `${baseUrl}/search`
      : `${baseUrl}/${locale}/search`;

  return {
    title: t('pageTitle'),
    alternates: {
      canonical,
      languages: {
        en: `${baseUrl}/search`,
        'pt-BR': `${baseUrl}/pt-BR/search`,
      },
    },
  };
}

export default async function SearchRoute({ params, searchParams }: Props) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  setRequestLocale(locale);

  const initialQuery = sanitizeSearchQuery(resolvedSearchParams.q ?? null);

  return <SearchPage initialQuery={initialQuery} />;
}

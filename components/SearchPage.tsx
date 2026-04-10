'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Header } from '@/components/Header';
import { GlobalFooter } from '@/components/GlobalFooter';
import { Search, Loader2, Briefcase, FileText } from 'lucide-react';
import { toSafeInternalPath, sanitizeSearchQuery } from '@/lib/searchValidation';

interface SearchResult {
  jobs: Array< { id: string; title: string; city: string; url: string }>;
  pages: Array<{ title: string; url: string }>;
  totalJobs: number;
  totalPages: number;
}

interface SearchPageProps {
  initialQuery: string;
}

export function SearchPage({ initialQuery }: SearchPageProps) {
  const locale = useLocale();
  const t = useTranslations('Search');
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(!!initialQuery);

  const performSearch = useCallback(async (q: string) => {
    const sanitized = sanitizeSearchQuery(q);
    if (!sanitized) {
      setResults({ jobs: [], pages: [], totalJobs: 0, totalPages: 0 });
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const params = new URLSearchParams({ q: sanitized, locale });
      const res = await fetch(`/api/search?${params}`);
      const data = await res.json();
      setResults(data);
    } catch {
      setResults({ jobs: [], pages: [], totalJobs: 0, totalPages: 0 });
    } finally {
      setIsLoading(false);
    }
  }, [locale]);

  useEffect(() => {
    const q = searchParams.get('q') || '';
    setQuery(q);
    if (q) {
      performSearch(q);
    } else {
      setResults(null);
    }
  }, [searchParams, performSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sanitized = sanitizeSearchQuery(query);
    const prefix = locale === 'en' ? '' : `/${locale}`;
    router.push(`${prefix}/search${sanitized ? `?q=${encodeURIComponent(sanitized)}` : ''}`);
  };

  const hasResults = results && (results.totalJobs > 0 || results.totalPages > 0);
  const hasSearched = results !== null;

  return (
    <div data-name="Search" className="flex flex-col min-h-screen bg-white">
      <Header currentPage="search" />
      <main className="flex-1">
        <section className="bg-[#4c4d58] py-12 md:py-16">
          <div className="max-w-[1200px] mx-auto px-6 md:px-8">
            <h1 className="text-[28px] md:text-[36px] font-bold text-white mb-6">
              {t('title')}
            </h1>
            <form onSubmit={handleSubmit} className="relative max-w-[600px]">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[#6b7280]"
                aria-hidden
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('placeholder')}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-white text-[#4c4d58] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#00B894]"
                aria-label={t('placeholder')}
                autoFocus
              />
            </form>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="max-w-[1200px] mx-auto px-6 md:px-8">
            {isLoading && (
              <div className="flex items-center gap-2 text-[#6b7280]">
                <Loader2 className="size-5 animate-spin" />
                <span>{t('loading')}</span>
              </div>
            )}

            {!isLoading && hasSearched && !hasResults && (
              <div className="text-center py-12">
                <p className="text-[#4c4d58] text-lg mb-2">{t('noResults')}</p>
                <p className="text-[#6b7280]">{t('tryDifferent')}</p>
              </div>
            )}

            {!isLoading && hasResults && results && (
              <div className="flex flex-col gap-10">
                {results.totalJobs > 0 && (
                  <div>
                    <h2 className="flex items-center gap-2 text-[20px] font-semibold text-[#4c4d58] mb-4">
                      <Briefcase className="size-5 text-[#00B894]" />
                      {t('jobs')} ({results.totalJobs})
                    </h2>
                    <ul className="flex flex-col gap-3">
                      {results.jobs.map((job) => {
                        const safeHref = toSafeInternalPath(job.url);
                        if (!safeHref) return null;
                        return (
                        <li key={job.id}>
                          <Link
                            href={safeHref}
                            className="block p-4 rounded-lg bg-[#fafafa] hover:bg-[#f0f0f0] transition-colors"
                          >
                            <span className="font-medium text-[#4c4d58]">{job.title}</span>
                            {job.city && (
                              <span className="block text-sm text-[#6b7280] mt-1">
                                {job.city}
                              </span>
                            )}
                          </Link>
                        </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {results.totalPages > 0 && (
                  <div>
                    <h2 className="flex items-center gap-2 text-[20px] font-semibold text-[#4c4d58] mb-4">
                      <FileText className="size-5 text-[#00B894]" />
                      {t('pages')} ({results.totalPages})
                    </h2>
                    <ul className="flex flex-col gap-3">
                      {results.pages.map((page) => {
                        const safeHref = toSafeInternalPath(page.url);
                        if (!safeHref) return null;
                        return (
                        <li key={page.url}>
                          <Link
                            href={safeHref}
                            className="block p-4 rounded-lg bg-[#fafafa] hover:bg-[#f0f0f0] transition-colors"
                          >
                            <span className="font-medium text-[#4c4d58]">{page.title}</span>
                          </Link>
                        </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      <GlobalFooter />
    </div>
  );
}

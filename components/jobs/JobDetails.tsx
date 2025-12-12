'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, ArrowLeft, MapPin, Briefcase, Clock, AlertCircle, X } from 'lucide-react';

interface JobAdSection {
  title: string;
  text: string;
}

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
      companyDescription?: JobAdSection;
      jobDescription?: JobAdSection;
      qualifications?: JobAdSection;
      additionalInformation?: JobAdSection;
    };
  };
}

interface PublicationData {
  postingId: string;
  publishedOn: string;
  sourceName: string;
}

interface JobDetailsProps {
  jobId: string;
  locale: string;
  translations: {
    backToPositions: string;
    loading: string;
    error: string;
    notFound: string;
    viewAllPositions: string;
    applyNow: string;
    interested: string;
    interestedDescription: string;
    notAcceptingApplications: string;
  };
}

export function JobDetails({ jobId, locale, translations }: JobDetailsProps) {
  const [job, setJob] = useState<JobData | null>(null);
  const [publication, setPublication] = useState<PublicationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPublication, setIsLoadingPublication] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  const prefix = locale === 'en' ? '' : `/${locale}`;

  // Fetch job details
  useEffect(() => {
    const fetchJob = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/jobs/${jobId}`);
        const data = await response.json();

        if (data.error) {
          setError(data.error);
        } else {
          setJob(data.job);
        }
      } catch {
        setError(translations.error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [jobId, translations.error]);

  // Fetch publication when user clicks apply
  const handleApplyClick = useCallback(async () => {
    // If we already have publication data, redirect immediately
    if (publication) {
      const applyUrl = `https://jobs.smartrecruiters.com/oneclick-ui/company/NETZSCHGroup/publication/${publication.postingId}?dcr_ci=NETZSCHGroup`;
      window.open(applyUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    setIsLoadingPublication(true);

    try {
      const response = await fetch(`/api/jobs/${jobId}/publication`);
      const data = await response.json();

      if (data.publication) {
        setPublication(data.publication);
        const applyUrl = `https://jobs.smartrecruiters.com/NETZSCH/${data.publication.postingId}`;
        window.open(applyUrl, '_blank', 'noopener,noreferrer');
      } else {
        // No publication found - show alert
        setShowAlert(true);
      }
    } catch {
      setShowAlert(true);
    } finally {
      setIsLoadingPublication(false);
    }
  }, [jobId, publication]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Loader2 className="size-10 text-[#00B894] animate-spin mb-4" />
        <p className="text-[#6b7280] text-[15px]">{translations.loading}</p>
      </div>
    );
  }

  if (error || !job) {
    return (
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
    );
  }

  const sections = job.jobAd?.sections;

  return (
    <>
      {/* Alert Modal */}
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
            onClick={() => setShowAlert(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[16px] p-6 max-w-[400px] w-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 size-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="size-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[18px] font-semibold text-[#1a1a2e] mb-2">
                    {locale === 'pt-BR' ? 'Vaga indisponível' : 'Position unavailable'}
                  </h3>
                  <p className="text-[14px] text-[#6b7280] leading-relaxed">
                    {translations.notAcceptingApplications}
                  </p>
                </div>
                <button
                  onClick={() => setShowAlert(false)}
                  className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="size-5" />
                </button>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowAlert(false)}
                  className="px-4 py-2 bg-[#00B894] text-white font-medium rounded-[8px] hover:bg-[#009874] transition-colors"
                >
                  OK
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Hero */}
      <section className="bg-[#4c4d58] relative w-full py-[48px] md:py-[64px]">
        <div className="max-w-[1000px] mx-auto px-6 md:px-8">
          <Link
            href={`${prefix}/open-positions`}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span>{translations.backToPositions}</span>
          </Link>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-[28px] md:text-[40px] lg:text-[48px] font-bold leading-[1.2] text-white mb-4"
          >
            {job.title}
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-wrap gap-3 text-[14px]"
          >
            {job.department && (
              <span className="bg-white/20 text-white px-3 py-1.5 rounded-full flex items-center gap-2">
                <Briefcase className="size-4" />
                {job.department.label}
              </span>
            )}
            <span className="bg-white/20 text-white px-3 py-1.5 rounded-full flex items-center gap-2">
              <MapPin className="size-4" />
              {job.location.city}, {job.location.regionCode}
            </span>
            {job.typeOfEmployment && (
              <span className="bg-white/20 text-white px-3 py-1.5 rounded-full flex items-center gap-2">
                <Clock className="size-4" />
                {job.typeOfEmployment.label}
              </span>
            )}
          </motion.div>
        </div>
      </section>

      {/* Position Content */}
      <section className="bg-white py-[48px] md:py-[64px]">
        <div className="max-w-[1000px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Company Description */}
              {sections?.companyDescription && (
                <div>
                  <h2 className="text-[22px] font-bold text-[#1a1a2e] mb-4">
                    {sections.companyDescription.title}
                  </h2>
                  <div
                    className="prose prose-gray max-w-none text-[15px] leading-[1.8] text-[#4a4a4a]"
                    dangerouslySetInnerHTML={{ __html: sections.companyDescription.text }}
                  />
                </div>
              )}

              {/* Job Description */}
              {sections?.jobDescription && (
                <div>
                  <h2 className="text-[22px] font-bold text-[#1a1a2e] mb-4">
                    {sections.jobDescription.title}
                  </h2>
                  <div
                    className="prose prose-gray max-w-none text-[15px] leading-[1.8] text-[#4a4a4a] [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-2"
                    dangerouslySetInnerHTML={{ __html: sections.jobDescription.text }}
                  />
                </div>
              )}

              {/* Qualifications */}
              {sections?.qualifications && (
                <div>
                  <h2 className="text-[22px] font-bold text-[#1a1a2e] mb-4">
                    {sections.qualifications.title}
                  </h2>
                  <div
                    className="prose prose-gray max-w-none text-[15px] leading-[1.8] text-[#4a4a4a] [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-2"
                    dangerouslySetInnerHTML={{ __html: sections.qualifications.text }}
                  />
                </div>
              )}

              {/* Additional Information */}
              {sections?.additionalInformation && (
                <div>
                  <h2 className="text-[22px] font-bold text-[#1a1a2e] mb-4">
                    {sections.additionalInformation.title}
                  </h2>
                  <div
                    className="prose prose-gray max-w-none text-[15px] leading-[1.8] text-[#4a4a4a] [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-2"
                    dangerouslySetInnerHTML={{ __html: sections.additionalInformation.text }}
                  />
                </div>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="lg:col-span-1"
            >
              <div className="bg-[#f9fafb] rounded-[16px] p-6 sticky top-8">
                <h3 className="text-[18px] font-bold text-[#1a1a2e] mb-3">
                  {translations.interested}
                </h3>
                <p className="text-[14px] text-[#6b7280] mb-6 leading-relaxed">
                  {translations.interestedDescription}
                </p>
                <button
                  type="button"
                  onClick={handleApplyClick}
                  disabled={isLoadingPublication}
                  className="w-full bg-[#00B894] hover:bg-[#009874] disabled:opacity-70 disabled:cursor-wait text-white font-semibold py-3 px-6 rounded-[8px] inline-flex items-center justify-center gap-2 transition-colors"
                >
                  {isLoadingPublication ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      {translations.loading}
                    </>
                  ) : (
                    translations.applyNow
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

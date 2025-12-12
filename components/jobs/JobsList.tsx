'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { JobCard } from './JobCard';
import { JobFilters } from './JobFilters';

interface Job {
  id: string;
  title: string;
  refNumber: string;
  status: string;
  createdOn: string;
  department?: {
    label: string;
  };
  location: {
    countryCode: string;
    country: string;
    city: string;
    remote: boolean;
    regionCode: string;
  };
  customField?: Array<{
    fieldId: string;
    fieldLabel: string;
    valueId?: string;
    valueLabel?: string;
  }>;
}

interface JobsApiResponse {
  totalFound: number;
  jobs: Job[];
  cities: string[];
  error?: string;
}

interface JobsListProps {
  translations: {
    searchPlaceholder: string;
    locationPlaceholder: string;
    clearFilters: string;
    noPositions: string;
    applyNow: string;
    loading: string;
    error: string;
    hybrid: string;
  };
  locale: string;
}

export function JobsList({ translations, locale }: JobsListProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [locationValue, setLocationValue] = useState('all');

  // Fetch jobs from API
  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/jobs');
      const data: JobsApiResponse = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setJobs(data.jobs);
        setCities(data.cities);
      }
    } catch {
      setError(translations.error);
    } finally {
      setIsLoading(false);
    }
  }, [translations.error]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Filter jobs client-side
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Search filter
      const searchLower = searchValue.toLowerCase();
      const matchesSearch =
        !searchValue ||
        job.title.toLowerCase().includes(searchLower) ||
        job.department?.label.toLowerCase().includes(searchLower) ||
        job.location.city.toLowerCase().includes(searchLower);

      // Location filter
      const matchesLocation =
        locationValue === 'all' || job.location.city === locationValue;

      return matchesSearch && matchesLocation;
    });
  }, [jobs, searchValue, locationValue]);

  const handleClearFilters = () => {
    setSearchValue('');
    setLocationValue('all');
  };

  // Generate work type text
  const getWorkType = (job: Job): string => {
    const city = job.location.city;
    const regionCode = job.location.regionCode;
    const cityDisplay = `${city}${regionCode ? `, ${regionCode}` : ''}`;
    
    if (job.location.remote) {
      return `Remote - ${cityDisplay}`;
    }
    return `${translations.hybrid} - Hybrid work in ${cityDisplay}.`;
  };

  // Generate description from job
  const getDescription = (job: Job): string => {
    const isPT = locale === 'pt-BR';
    const lookingFor = isPT ? 'Procuramos por uma pessoa que gostaria de atuar como' : 'We are looking for someone who would like to work as';
    const team = isPT ? 'junto ao nosso time internacional' : 'in our international team';
    const englishRequired = isPT ? 'portanto o inglês é essencial' : 'therefore English is essential';
    
    return `${lookingFor} ${job.title} ${team}, ${englishRequired}.`;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="size-8 text-[#00B894] animate-spin mb-4" />
        <p className="text-[#6b7280] text-[14px]">{translations.loading}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-red-500 text-[14px]">{error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Filters */}
      <JobFilters
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        locationValue={locationValue}
        onLocationChange={setLocationValue}
        locations={cities}
        onClearFilters={handleClearFilters}
        placeholders={{
          search: translations.searchPlaceholder,
          location: translations.locationPlaceholder,
          clearFilters: translations.clearFilters,
        }}
      />

      {/* Jobs List */}
      <AnimatePresence mode="wait">
        {filteredJobs.length === 0 ? (
          <motion.div
            key="no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <p className="text-[#6b7280] text-[16px]">{translations.noPositions}</p>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="divide-y divide-gray-200"
          >
            {filteredJobs.map((job, index) => (
              <JobCard
                key={job.id}
                id={job.id}
                title={job.title}
                location={`${job.location.city}, ${job.location.country}`}
                workType={getWorkType(job)}
                description={getDescription(job)}
                applyText={translations.applyNow}
                index={index}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


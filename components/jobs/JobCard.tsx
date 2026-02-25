'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRightIcon } from '@/components/icons';

interface JobCardProps {
  id: string;
  title: string;
  location: string;
  workType: string;
  description?: string;
  applyText: string;
  locale?: string;
  department?: string;
  index?: number;
}

export function JobCard({
  id,
  title,
  location,
  workType,
  description,
  applyText,
  locale,
  department,
  index = 0,
}: JobCardProps) {
  const prefix = locale === "en" ? "" : `/${locale}`;
  const detailsUrl = `${prefix}/positions/${id}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-white p-4 rounded-lg shadow-md py-4 mb-4"
    >
      <div className="flex flex-col gap-3">
        {/* Work Type Badge */}
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-[#00B894] rounded-full" />
          <span className="text-[13px] text-[#6b7280]">{workType}</span>
          <span className="text-[13px] px-2 bg-[#00B894] rounded-full text-[#ffffff]">
            {department}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-[18px] md:text-[20px] font-semibold text-[#4c4d58] leading-tight">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-[14px] text-[#6b7280] leading-relaxed line-clamp-2">
            {description}
          </p>
        )}

        {/* Apply Link */}
        <Link
          href={detailsUrl}
          className="inline-flex items-center gap-2 text-[#00B894] font-medium text-[14px] hover:underline transition-all group mt-1"
        >
          {applyText}
          <ArrowRightIcon
            className="size-4 group-hover:translate-x-1 transition-transform"
            stroke="#00B894"
          />
        </Link>
      </div>
    </motion.article>
  );
}

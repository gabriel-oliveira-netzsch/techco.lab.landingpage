'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

interface ProjectItem {
  tags: string[];
  title: string;
  description: string;
  results: string[];
}

export function ProjectsSection() {
  const t = useTranslations('WhatWeDo.projects');
  const projects = t.raw('items') as ProjectItem[];

  return (
    <section className="bg-white py-[64px] md:py-[80px]">
      <div className="max-w-[1000px] mx-auto px-6 md:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold leading-[1.2] text-[#4c4d58] mb-3">
            {t('title')}{' '}
            <span className="text-[#00B894]">{t('titleHighlight')}</span>
          </h2>
          <p className="text-[15px] md:text-[16px] leading-[1.6] text-[#6b7280]">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Projects List */}
        <div className="space-y-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-[12px] p-6 md:p-8"
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="text-[12px] text-[#6b7280] bg-[#f3f4f6] px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h3 className="text-[18px] md:text-[20px] font-bold text-[#4c4d58] mb-3">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-[14px] md:text-[15px] text-[#6b7280] leading-[1.7] mb-5">
                {project.description}
              </p>

              {/* Results */}
              <ul className="space-y-2">
                {project.results.map((result, resultIndex) => (
                  <li
                    key={resultIndex}
                    className="flex items-start gap-2 text-[13px] md:text-[14px] text-[#00B894]"
                  >
                    <span className="mt-1">•</span>
                    <span>{result}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


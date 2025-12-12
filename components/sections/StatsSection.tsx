'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';

interface StatItemProps {
  value: string;
  label: string;
  delay: number;
}

function StatItem({ value, label, delay }: StatItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center text-center"
    >
      <span className="text-[48px] md:text-[64px] lg:text-[72px] font-bold text-[#00B894] leading-none">
        {value}
      </span>
      <span className="text-[14px] md:text-[16px] text-[#6b7280] mt-2">
        {label}
      </span>
    </motion.div>
  );
}

export function StatsSection() {
  const t = useTranslations('Home.stats');

  return (
    <section className="bg-[#f8f9fa] relative w-full py-[48px] md:py-[64px] lg:py-[80px]">
      <div className="max-w-[1000px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
          <StatItem
            value={t('users')}
            label={t('usersLabel')}
            delay={0}
          />
          <StatItem
            value={t('countries')}
            label={t('countriesLabel')}
            delay={0.1}
          />
          <StatItem
            value={t('projects')}
            label={t('projectsLabel')}
            delay={0.2}
          />
        </div>
      </div>
    </section>
  );
}


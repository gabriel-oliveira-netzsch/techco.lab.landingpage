'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';

interface DifferentiatorCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

function DifferentiatorCard({ icon, title, description, index }: DifferentiatorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
    >
      <div className="w-14 h-14 rounded-xl bg-[#1E7264]/10 flex items-center justify-center mb-5 text-[#1E7264]">
        {icon}
      </div>
      <h3 className="text-[18px] md:text-[20px] font-bold text-[#2D2D2D] mb-3">
        {title}
      </h3>
      <p className="text-[14px] md:text-[16px] text-gray-600 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

// Icon components
function GlobalIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function IndustryIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
    </svg>
  );
}

function GrowthIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function TeamIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function InnovationIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4" />
      <path d="m6.34 7.34-2.83 2.83" />
      <path d="M2 12h4" />
      <path d="m6.34 16.66-2.83-2.83" />
      <path d="M12 18v4" />
      <path d="m17.66 16.66 2.83-2.83" />
      <path d="M18 12h4" />
      <path d="m17.66 7.34 2.83 2.83" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

function StabilityIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function DifferentiatorsSection() {
  const t = useTranslations('Differentiators');

  const differentiators = [
    {
      icon: <GlobalIcon />,
      title: t('items.global.title'),
      description: t('items.global.description'),
    },
    {
      icon: <IndustryIcon />,
      title: t('items.industry.title'),
      description: t('items.industry.description'),
    },
    {
      icon: <GrowthIcon />,
      title: t('items.growth.title'),
      description: t('items.growth.description'),
    },
    {
      icon: <TeamIcon />,
      title: t('items.team.title'),
      description: t('items.team.description'),
    },
    {
      icon: <InnovationIcon />,
      title: t('items.innovation.title'),
      description: t('items.innovation.description'),
    },
    {
      icon: <StabilityIcon />,
      title: t('items.stability.title'),
      description: t('items.stability.description'),
    },
  ];

  return (
    <section data-name="Differentiators" className="bg-white py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-[#1E7264]/10 text-[#1E7264] text-[12px] font-semibold uppercase tracking-wider rounded-full mb-4">
            {t('badge')}
          </span>
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#2D2D2D] mb-4">
            {t('title')} <span className="text-[#1E7264]">{t('titleHighlight')}</span>
          </h2>
          <p className="text-[16px] md:text-[18px] text-gray-600 max-w-[700px] mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentiators.map((item, index) => (
            <DifferentiatorCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

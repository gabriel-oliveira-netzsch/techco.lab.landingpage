'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Lightbulb, Code, BarChart3, Palette } from 'lucide-react';

const categories = [
  {
    key: 'strategy',
    icon: Lightbulb,
    color: 'bg-[#00B894]',
  },
  {
    key: 'development',
    icon: Code,
    color: 'bg-[#00B894]',
  },
  {
    key: 'data',
    icon: BarChart3,
    color: 'bg-[#00B894]',
  },
  {
    key: 'design',
    icon: Palette,
    color: 'bg-[#00B894]',
  },
];

export function WhatWeDoHeroSection() {
  const t = useTranslations('WhatWeDo');

  return (
    <section className="bg-[#4c4d58] relative w-full py-[48px] md:py-[64px] lg:py-[80px]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-[32px] md:text-[42px] lg:text-[48px] font-bold leading-[1.2] text-white mb-4">
            {t('title')}{' '}
            <span className="text-[#00B894]">{t('titleHighlight')}</span>
          </h1>
          <p className="text-[15px] md:text-[17px] leading-[1.7] text-white/80 max-w-[700px] mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Category Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className={`${category.color} rounded-[12px] p-5 flex flex-col`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-[16px] md:text-[17px] font-bold text-white leading-tight max-w-[140px]">
                    {t(`categories.${category.key}.title`)}
                  </h3>
                  <div className="bg-white/20 rounded-full p-2 flex-shrink-0">
                    <Icon className="size-5 text-white" />
                  </div>
                </div>
                <p className="text-[13px] text-white/90 leading-[1.5]">
                  {t(`categories.${category.key}.description`)}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}


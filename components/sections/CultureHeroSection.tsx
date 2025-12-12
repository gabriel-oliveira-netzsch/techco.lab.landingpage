'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Target, Users, TrendingUp, Shield, Trophy } from 'lucide-react';

const valueIcons = [Target, Users, TrendingUp, Shield, Trophy];

interface ValueItem {
  title: string;
  description: string;
}

export function CultureHeroSection() {
  const t = useTranslations('OurCulture.hero');
  const values = t.raw('values') as ValueItem[];

  return (
    <section className="bg-[#00B894] relative w-full py-[48px] md:py-[64px] lg:py-[80px]">
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
            <span className="text-[#1a1a2e]">{t('titleHighlight')}</span>
          </h1>
          <p className="text-[15px] md:text-[17px] leading-[1.7] text-white/90 max-w-[700px] mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Values Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
        >
          {values.map((value, index) => {
            const Icon = valueIcons[index];
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="bg-[#009874] rounded-[12px] p-5 flex flex-col items-center text-center"
              >
                <div className="bg-white/20 rounded-full p-3 mb-3">
                  <Icon className="size-6 text-white" />
                </div>
                <h3 className="text-[14px] md:text-[15px] font-bold text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-[12px] text-white/80 leading-[1.5]">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}


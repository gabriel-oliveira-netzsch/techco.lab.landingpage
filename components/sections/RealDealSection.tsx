'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

export function RealDealSection() {
  const t = useTranslations('OurCulture.realDeal');

  return (
    <section className="bg-[#4c4d58] py-[64px] md:py-[80px]">
      <div className="max-w-[800px] mx-auto px-6 md:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[32px] md:text-[40px] lg:text-[46px] font-bold leading-[1.2] text-white mb-6"
        >
          {t('title')}{' '}
          <span className="text-[#00B894]">{t('titleHighlight')}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[16px] md:text-[18px] text-white/90 leading-[1.8] mb-8"
        >
          {t('description')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[16px] md:text-[20px] font-medium text-[#00B894] leading-[1.6]"
        >
          <p>{t('highlight')}</p>
          <p>{t('highlight2')}</p>
        </motion.div>
      </div>
    </section>
  );
}


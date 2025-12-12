'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function GPTWSection() {
  const t = useTranslations('OurCulture.gptw');

  return (
    <section className="bg-[#f5f5f5] py-[64px] md:py-[80px]">
      <div className="max-w-[1000px] mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
        >
          {/* Text Content */}
          <div className="flex-1">
            <h2 className="text-[24px] md:text-[32px] lg:text-[36px] font-bold leading-[1.2] text-[#4c4d58] mb-4">
              {t('title')}{' '}
              <span className="text-[#00B894]">{t('titleHighlight')}</span>
            </h2>
            <p className="text-[14px] md:text-[15px] text-[#6b7280] leading-[1.8]">
              {t('description')}
            </p>
          </div>

          {/* GPTW Badge */}
          <div className="flex-shrink-0">
            <Image
              src="/images/1a891033b140f013daed427c3793e9af5c926d73.png"
              alt="Great Place to Work Certified - Jan 2025 - Jan 2026 - Brasil"
              width={160}
              height={200}
              className="w-[120px] md:w-[140px] lg:w-[160px] h-auto"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}


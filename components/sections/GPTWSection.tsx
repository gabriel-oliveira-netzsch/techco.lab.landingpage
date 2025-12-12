'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

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

          {/* GPTW Badge Placeholder */}
          <div className="flex-shrink-0">
            <div className="w-[140px] h-[180px] md:w-[160px] md:h-[200px] bg-white rounded-[12px] shadow-lg flex items-center justify-center p-4">
              <div className="text-center">
                <div className="text-[#8B2332] font-bold text-[18px] leading-tight mb-1">
                  Great
                </div>
                <div className="text-[#8B2332] font-bold text-[18px] leading-tight mb-1">
                  Place
                </div>
                <div className="text-[#8B2332] font-bold text-[18px] leading-tight mb-1">
                  To
                </div>
                <div className="text-[#8B2332] font-bold text-[18px] leading-tight mb-2">
                  Work.
                </div>
                <div className="text-[10px] text-[#8B2332] font-semibold bg-[#8B2332]/10 px-2 py-1 rounded">
                  Certificada
                </div>
                <div className="text-[9px] text-gray-500 mt-1">
                  JAN 2025 - JAN 2026
                </div>
                <div className="text-[9px] text-gray-500">
                  BRASIL
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


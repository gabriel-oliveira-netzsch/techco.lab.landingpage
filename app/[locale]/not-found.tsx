'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { ArrowRightIcon } from '@/components/icons';
import { Header } from '@/components/Header';
import { GlobalFooter } from '@/components/GlobalFooter';

export default function NotFound() {
  const locale = useLocale();
  const t = useTranslations('NotFound');
  
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header currentPage="not-found" />
      <main className="flex-1 flex items-center justify-center bg-[#4c4d58] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#00B894]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#00B894]/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-[64px] py-[80px] md:py-[120px] relative z-10">
          <div className="flex flex-col items-center text-center gap-8">
            {/* 404 Number */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <span className="text-[120px] md:text-[180px] lg:text-[220px] font-bold text-white/10 leading-none select-none">
                404
              </span>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[60px] md:text-[80px] lg:text-[100px] font-bold text-[#00B894] leading-none">
                  404
                </span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[28px] md:text-[36px] lg:text-[42px] font-bold text-white leading-tight"
            >
              {t('title')}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[16px] md:text-[18px] text-white/80 max-w-[500px] leading-relaxed"
            >
              {t('description')}
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 mt-4 justify-center"
            >
              <Link href={prefix || '/'}>
                <motion.div
                  whileHover={{ backgroundColor: '#009874' }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#00B894] inline-flex gap-2 items-center justify-center px-6 py-3.5 rounded-lg cursor-pointer"
                >
                  <span className="font-semibold text-[16px] text-white">
                    {t('backHome')}
                  </span>
                  <ArrowRightIcon />
                </motion.div>
              </Link>

              <Link href={`${prefix}/open-positions`}>
                <motion.div
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  transition={{ duration: 0.2 }}
                  className="border-2 border-white/30 inline-flex gap-2 items-center justify-center px-6 py-3.5 rounded-lg cursor-pointer"
                >
                  <span className="font-semibold text-[16px] text-white">
                    {t('viewPositions')}
                  </span>
                </motion.div>
              </Link>
            </motion.div>

            {/* Helpful links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-6 mt-8 text-[14px] text-white/60"
            >
              <Link 
                href={`${prefix}/what-we-do`}
                className="hover:text-[#00B894] transition-colors"
              >
                {t('links.whatWeDo')}
              </Link>
              <span className="text-white/20">|</span>
              <Link 
                href={`${prefix}/our-culture`}
                className="hover:text-[#00B894] transition-colors"
              >
                {t('links.ourCulture')}
              </Link>
              <span className="text-white/20">|</span>
              <Link 
                href={`${prefix}/open-positions`}
                className="hover:text-[#00B894] transition-colors"
              >
                {t('links.openPositions')}
              </Link>
            </motion.div>
          </div>
        </div>
      </main>
      <GlobalFooter />
    </div>
  );
}


'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { ArrowRightIcon } from '@/components/icons';
import { images } from '@/lib/images';

export function TechHubSection() {
  const locale = useLocale();
  const t = useTranslations('Home.techHub');
  
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <section className="bg-white relative w-full py-[64px] md:py-[80px] lg:py-[100px]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="flex flex-col lg:flex-row gap-[48px] lg:gap-[64px] items-center">
          {/* Text Content */}
          <div className="flex-1 flex flex-col gap-[24px]">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[#00B894] text-[12px] md:text-[14px] font-semibold tracking-[0.1em] uppercase"
            >
              {t('badge')}
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[28px] md:text-[36px] lg:text-[42px] font-bold leading-[1.2] text-[#1a1a2e]"
            >
              {t('titleLine1')}
              <br />
              {t('titleLine2')} <span className="text-[#00B894]">{t('titleHighlight')}</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[15px] md:text-[16px] leading-[1.7] text-[#6b7280] max-w-[480px]"
            >
              {t('description')}
            </motion.p>

            {/* Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-[24px] mt-2"
            >
              <Link 
                href={`${prefix}/what-we-do`}
                className="inline-flex items-center gap-[8px] text-[#00B894] font-medium hover:underline transition-all"
              >
                {t('linkProjects')}
                <ArrowRightIcon className="size-4" stroke="#00B894" />
              </Link>
              
              <Link 
                href={`${prefix}/open-positions`}
                className="inline-flex items-center gap-[8px] text-[#00B894] font-medium hover:underline transition-all"
              >
                {t('linkCareers')}
                <ArrowRightIcon className="size-4" stroke="#00B894" />
              </Link>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 w-full max-w-[500px]"
          >
            <div className="relative rounded-[16px] overflow-hidden shadow-xl aspect-[4/3]">
              <Image
                src={images.heroImage}
                alt="Techco.lab Office"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


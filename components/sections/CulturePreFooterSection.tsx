'use client';

import { motion } from 'motion/react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowRightIcon } from '@/components/icons';

export function CulturePreFooterSection() {
  const t = useTranslations('OurCulture.preFooter');
  const locale = useLocale();
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <section className="bg-[#4c4d58] py-[64px] md:py-[80px]">
      <div className="max-w-[800px] mx-auto px-6 md:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[24px] md:text-[32px] lg:text-[36px] font-bold leading-[1.3] text-white mb-4"
        >
          {t('title')}{' '}
          <span className="text-[#00B894]">{t('titleHighlight')}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[15px] md:text-[16px] text-white/70 mb-8"
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            href={`${prefix}/open-positions`}
            className="inline-flex items-center gap-2 bg-[#00B894] hover:bg-[#009874] text-white font-semibold py-3 px-6 rounded-[8px] transition-colors group"
          >
            {t('cta')}
            <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}


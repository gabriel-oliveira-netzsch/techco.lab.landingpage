'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { ArrowRightIcon } from '@/components/icons';
import { trackCTAClick, hasStatisticsConsent } from "@/lib/analytics";

export function PreFooterSection() {
  const locale = useLocale();
  const t = useTranslations("Home.preFooter");

  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <section className="bg-[#4c4d58] relative w-full py-[64px] md:py-[80px] lg:py-[100px]">
      <div className="max-w-[800px] mx-auto px-6 md:px-8">
        <div className="flex flex-col items-center text-center gap-[20px]">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[28px] md:text-[36px] lg:text-[42px] font-bold leading-[1.2] text-white"
          >
            {t("title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[15px] md:text-[16px] leading-[1.6] text-white"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4"
          >
            <Link
              href={`${prefix}/open-positions`}
              onClick={() => {
                if (hasStatisticsConsent()) {
                  trackCTAClick(t("cta"), "pre-footer");
                }
              }}
            >
              <motion.div
                whileHover={{ backgroundColor: "#009874" }}
                transition={{ duration: 0.2 }}
                className="bg-[#00B894] inline-flex gap-[8px] items-center justify-center px-[28px] py-[14px] rounded-[8px] cursor-pointer"
              >
                <span className="font-semibold text-[16px] text-white">
                  {t("cta")}
                </span>
                <ArrowRightIcon />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

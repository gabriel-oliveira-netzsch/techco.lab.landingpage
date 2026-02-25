'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { ArrowRightIcon } from '@/components/icons';
import { TypewriterEffect } from '@/components/ui/TypewriterEffect';
import { trackCTAClick, hasStatisticsConsent } from "@/lib/analytics";

export function HeroSection() {
  const locale = useLocale();
  const t = useTranslations("Home.hero");

  const prefix = locale === "en" ? "" : `/${locale}`;

  // Get typing words from translations
  const typingWords = [
    t("typingWords.0"),
    t("typingWords.1"),
    t("typingWords.2"),
  ];

  return (
    <section
      data-name="Hero 1"
      className="bg-[#4c4d58] relative w-full overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-[64px] py-[64px] md:py-[100px] lg:py-[120px]">
        <div className="flex flex-col gap-[24px] max-w-[850px]">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[36px] md:text-[48px] lg:text-[56px] font-bold leading-[1.15] min-h-[2.4em]"
          >
            <span className="text-white">{t("titleLine1")}</span>
            <br />
            <TypewriterEffect
              words={typingWords}
              typingSpeed={70}
              deletingSpeed={40}
              pauseDuration={2500}
              className="text-[#00B894]"
            />
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[18px] md:text-[20px] leading-[1.6] text-white max-w-[600px] border-l-4 border-[#00B894] pl-4"
          >
            {t("subtitle")}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-[16px] mt-2"
          >
            <Link
              href={`${prefix}/open-positions`}
              onClick={() => {
                if (hasStatisticsConsent()) {
                  trackCTAClick(t("cta"), "hero");
                }
              }}
            >
              <motion.div
                whileHover={{ backgroundColor: "#009874" }}
                transition={{ duration: 0.2 }}
                className="bg-[#00B894] inline-flex gap-[8px] items-center justify-center px-[24px] py-[14px] rounded-[8px] cursor-pointer"
              >
                <span className="font-semibold text-[16px] text-white">
                  {t("cta")}
                </span>
                <ArrowRightIcon />
              </motion.div>
            </Link>

            <Link
              href={`${prefix}/what-we-do`}
              onClick={() => {
                if (hasStatisticsConsent()) {
                  trackCTAClick(t("cta2"), "hero");
                }
              }}
            >
              <motion.div
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                transition={{ duration: 0.2 }}
                className="border border-white/50 inline-flex gap-[8px] items-center justify-center px-[24px] py-[14px] rounded-[8px] cursor-pointer"
              >
                <span className="font-semibold text-[16px] text-white">
                  {t("cta2")}
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

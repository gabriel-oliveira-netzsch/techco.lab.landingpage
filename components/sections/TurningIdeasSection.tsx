'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { ArrowRightIcon } from '@/components/icons';
import { images } from '@/lib/images';
import {
  trackCTAClick,
  trackExploreWork,
  hasStatisticsConsent,
} from "@/lib/analytics";

export function TurningIdeasSection() {
  const locale = useLocale();
  const t = useTranslations("Home.turningIdeas");

  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <section
      data-section="turning-ideas-rebuilt"
      className="bg-[#4c4d58] relative w-full py-[64px] md:py-[80px] lg:py-[100px]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="flex flex-col lg:flex-row gap-[48px] lg:gap-[64px] items-center">
          {/* Text Content */}
          <div className="flex-1 flex flex-col gap-[24px] order-2 lg:order-1">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[28px] md:text-[36px] lg:text-[42px] font-bold leading-[1.2]"
            >
              <span className="text-white">{t("title")}</span>
              <br />
              <span className="text-[#00B894]">{t("titleHighlight")}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[15px] md:text-[16px] leading-[1.7] text-white/70 max-w-[500px]"
            >
              {t("description")}
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-[16px] mt-2"
            >
              <Link
                href={`${prefix}/our-culture`}
                onClick={() => {
                  if (hasStatisticsConsent()) {
                    trackExploreWork("turning-ideas-section");
                  }
                }}
              >
                <motion.div
                  whileHover={{ backgroundColor: "#009874" }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#00B894] inline-flex gap-[8px] items-center justify-center px-[20px] py-[12px] rounded-[8px] cursor-pointer"
                >
                  <span className="font-semibold text-[14px] md:text-[15px] text-white">
                    {t("cta")}
                  </span>
                  <ArrowRightIcon />
                </motion.div>
              </Link>

              <Link
                href={`${prefix}/open-positions`}
                onClick={() => {
                  if (hasStatisticsConsent()) {
                    trackCTAClick(t("cta2"), "turning-ideas-section");
                  }
                }}
              >
                <motion.div
                  whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  transition={{ duration: 0.2 }}
                  className="border border-white/50 inline-flex gap-[8px] items-center justify-center px-[20px] py-[12px] rounded-[8px] cursor-pointer"
                >
                  <span className="font-semibold text-[14px] md:text-[15px] text-white">
                    {t("cta2")}
                  </span>
                  <ArrowRightIcon />
                </motion.div>
              </Link>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 w-full max-w-[500px] order-1 lg:order-2"
          >
            <div className="relative rounded-[16px] overflow-hidden shadow-xl aspect-[4/3]">
              <Image
                src={images.heroImageAlt}
                alt="Team collaboration"
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

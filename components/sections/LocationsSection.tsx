'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { ArrowRightIcon } from '@/components/icons';
import { images } from '@/lib/images';

interface LocationCardProps {
  image: string;
  city: string;
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
  delay: number;
}

function LocationCard({ image, city, title, description, linkText, linkUrl, delay }: LocationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative rounded-[16px] overflow-hidden group"
    >
      {/* Background Image */}
      <div className="relative h-[320px] md:h-[380px]">
        <Image
          src={image}
          alt={title}
          title={`${city} - ${title}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <span className="text-white text-[11px] md:text-[12px] font-semibold tracking-[0.15em] uppercase mb-2 block">
          {city}
        </span>
        <h3 className="text-white text-[22px] md:text-[26px] font-bold mb-2">
          {title}
        </h3>
        <p className="text-white/80 text-[14px] md:text-[15px] leading-[1.6] mb-4 max-w-[300px]">
          {description}
        </p>
        <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-[6px] text-[#00B894] text-[14px] font-medium hover:underline transition-all"
        >
          {linkText}
          <ArrowRightIcon className="size-4" stroke="#00B894" />
        </a>
      </div>
    </motion.div>
  );
}

export function LocationsSection() {
  const t = useTranslations('Home.locations');

  return (
    <section className="bg-white relative w-full py-[64px] md:py-[80px] lg:py-[100px]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-[600px] mx-auto mb-[48px]">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[28px] md:text-[36px] lg:text-[42px] font-bold leading-[1.2] text-[#4c4d58] mb-4"
          >
            {t("title")}{" "}
            <span className="text-[#00B894]">{t("titleHighlight")}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[15px] md:text-[16px] leading-[1.6] text-[#6b7280]"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Location Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <LocationCard
            image={images.frame107}
            city={t("curitiba.city")}
            title={t("curitiba.title")}
            description={t("curitiba.description")}
            linkText={t("linkCuritiba")}
            linkUrl="https://maps.google.com/?q=Nex+Coworking+Curitiba"
            delay={0}
          />
          <LocationCard
            image={images.frame108}
            city={t("pomerode.city")}
            title={t("pomerode.title")}
            description={t("pomerode.description")}
            linkText={t("linkPomerode")}
            linkUrl="https://maps.google.com/?q=NETZSCH+Pomerode"
            delay={0.1}
          />
        </div>
      </div>
    </section>
  );
}


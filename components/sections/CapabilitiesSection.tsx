'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { Brain, Network, MonitorSmartphone } from 'lucide-react';

interface CapabilityCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

function CapabilityCard({
  icon,
  title,
  description,
  delay,
}: CapabilityCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col gap-[16px] p-[24px] bg-white rounded-[12px]"
    >
      <div className="size-[48px] rounded-[10px] bg-[#00B894]/10 flex items-center justify-center">
        <div className="text-[#00B894]">{icon}</div>
      </div>
      <h3 className="text-[18px] font-bold text-[#4c4d58]">{title}</h3>
      <p className="text-[14px] leading-[1.6] text-[#6b7280]">{description}</p>
    </motion.div>
  );
}

export function CapabilitiesSection() {
  const t = useTranslations("Home.capabilities");

  const capabilities = [
    {
      icon: <Brain className="size-6" />,
      titleKey: "items.ai.title",
      descKey: "items.ai.description",
    },
    {
      icon: <Network className="size-6" />,
      titleKey: "items.platforms.title",
      descKey: "items.platforms.description",
    },
    {
      icon: <MonitorSmartphone className="size-6" />,
      titleKey: "items.interfaces.title",
      descKey: "items.interfaces.description",
    },
  ];

  return (
    <section className="bg-[#f8f9fa] relative w-full py-[64px] md:py-[80px] lg:py-[100px]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mx-auto mb-[48px]">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-[#00B894] text-[12px] md:text-[14px] font-semibold tracking-[0.1em] uppercase mb-4"
          >
            {t("badge")}
          </motion.span>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[14px] md:text-[16px] leading-[1.6] text-[#6b7280] mb-6"
          >
            {t("subtitle")}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[28px] md:text-[36px] lg:text-[42px] font-bold leading-[1.2] text-[#4c4d58]"
          >
            {t("titleLine1")}{" "}
            <span className="text-[#00B894]">{t("titleHighlight")}</span>
          </motion.h2>
        </div>

        {/* Featured Card */}
        <div className="flex flex-col gap-6 mb-6 px-0 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-capabilities lg:col-span-1 rounded-[12px] p-[24px] flex items-center bg-gradient-to-br from-[#faf5ff] via-[#effeff] to-[#f0fdf4]"
          >
            <p className="text-[#4c4d58] text-[16px] leading-[1.7]">
              {t("featuredText")}
            </p>
          </motion.div>
        </div>

        {/* Featured Text Card + Capability Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Capability Cards */}
          {capabilities.map((item, index) => (
            <CapabilityCard
              key={item.titleKey}
              icon={item.icon}
              title={t(item.titleKey)}
              description={t(item.descKey)}
              delay={0.3 + (index + 1) * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { Monitor, BarChart3, Layers, Activity } from 'lucide-react';

interface DeliverableCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

function DeliverableCard({ icon, title, description, delay }: DeliverableCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-[16px] p-[24px] md:p-[32px] shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <div className="size-[48px] md:size-[56px] rounded-[12px] bg-[#00B894]/10 flex items-center justify-center mb-4">
        <div className="text-[#00B894]">{icon}</div>
      </div>
      <h3 className="text-[18px] md:text-[20px] font-bold text-[#4c4d58] mb-2">
        {title}
      </h3>
      <p className="text-[14px] md:text-[16px] text-[#6b7280] leading-[1.6]">
        {description}
      </p>
    </motion.div>
  );
}

export function WhatWeDeliverSection() {
  const t = useTranslations('Home.whatWeDeliver');

  const deliverables = [
    {
      icon: <Monitor className="size-6" />,
      titleKey: 'items.platforms.title',
      descKey: 'items.platforms.description',
    },
    {
      icon: <BarChart3 className="size-6" />,
      titleKey: 'items.analytics.title',
      descKey: 'items.analytics.description',
    },
    {
      icon: <Layers className="size-6" />,
      titleKey: 'items.interfaces.title',
      descKey: 'items.interfaces.description',
    },
    {
      icon: <Activity className="size-6" />,
      titleKey: 'items.realtime.title',
      descKey: 'items.realtime.description',
    },
  ];

  return (
    <section
      data-name="Section"
      className="bg-gradient-to-b from-[#f9fafb] to-white relative w-full py-[64px] md:py-[80px] lg:py-[120px]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-[600px] mx-auto mb-[48px] md:mb-[64px]">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[28px] md:text-[40px] lg:text-[48px] font-bold leading-[1.2] text-[#4c4d58] mb-4"
          >
            {t('title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[16px] md:text-[18px] leading-[1.6] text-[#6b7280]"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {deliverables.map((item, index) => (
            <DeliverableCard
              key={item.titleKey}
              icon={item.icon}
              title={t(item.titleKey)}
              description={t(item.descKey)}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


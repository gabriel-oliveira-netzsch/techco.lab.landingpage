'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import {
  FileText,
  Coins,
  Award,
  Lightbulb,
  Heart,
  Activity,
  Pill,
  Fuel,
  GraduationCap,
  Languages,
  Monitor,
  Home,
  Users,
  Utensils,
  Scale,
  Laptop,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'file-text': FileText,
  coins: Coins,
  award: Award,
  lightbulb: Lightbulb,
  heart: Heart,
  activity: Activity,
  pill: Pill,
  fuel: Fuel,
  'graduation-cap': GraduationCap,
  languages: Languages,
  monitor: Monitor,
  home: Home,
  users: Users,
  utensils: Utensils,
  scale: Scale,
  laptop: Laptop,
};

interface BenefitItem {
  title: string;
  icon: string;
}

export function BenefitsSection() {
  const t = useTranslations('OurCulture.benefits');
  const items = t.raw('items') as BenefitItem[];

  return (
    <section className="bg-[#f5f5f5] py-[64px] md:py-[80px]">
      <div className="max-w-[1000px] mx-auto px-6 md:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold leading-[1.2] text-[#4c4d58] mb-3">
            {t('title')}{' '}
            <span className="text-[#00B894]">{t('titleHighlight')}</span>
          </h2>
          <p className="text-[14px] md:text-[15px] leading-[1.6] text-[#6b7280] max-w-[700px] mx-auto mb-6">
            {t('subtitle')}
          </p>
          <p className="text-[15px] md:text-[16px] font-medium text-[#4c4d58]">
            {t('discoverTitle')}
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        >
          {items.map((item, index) => {
            const Icon = iconMap[item.icon] || FileText;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="bg-white rounded-[12px] p-4 flex flex-col items-center text-center hover:shadow-md transition-shadow"
              >
                <div className="size-10 rounded-full flex items-center justify-center mb-3">
                  <Icon className="size-8 text-[#00B894]" />
                </div>
                <p className="text-[14px] font-medium text-[#4c4d58] leading-tight">
                  {item.title}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}


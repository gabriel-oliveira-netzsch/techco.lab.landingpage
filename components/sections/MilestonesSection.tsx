'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Rocket, Award, PartyPopper } from 'lucide-react';

const milestoneIcons = [Rocket, Award, PartyPopper];

interface MilestoneItem {
  title: string;
  description: string;
}

export function MilestonesSection() {
  const t = useTranslations('OurCulture.milestones');
  const items = t.raw('items') as MilestoneItem[];

  return (
    <section className="bg-white py-[64px] md:py-[80px]">
      <div className="max-w-[1000px] mx-auto px-6 md:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold leading-[1.2] text-[#4c4d58] mb-3">
            {t('title')}{' '}
            <span className="text-[#00B894]">{t('titleHighlight')}</span>
          </h2>
          <p className="text-[15px] md:text-[16px] leading-[1.6] text-[#6b7280] max-w-[600px] mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Milestone Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, index) => {
            const Icon = milestoneIcons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-[16px] p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center size-12 bg-[#00B894]/10 rounded-full mb-4">
                  <Icon className="size-10 p-2 text-[#00B894]" />
                </div>
                <h3 className="text-[16px] md:text-[17px] font-bold text-[#00B894] mb-3">
                  {item.title}
                </h3>
                <p className="text-[13px] md:text-[14px] text-[#6b7280] leading-[1.6]">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


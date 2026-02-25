'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDownIcon } from '@/components/icons';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onClick}
        className="flex items-center justify-between w-full py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-[16px] md:text-[18px] font-semibold text-[#2D2D2D] pr-4">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDownIcon className="w-5 h-5 text-[#1E7264]" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[14px] md:text-[16px] text-gray-600 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection() {
  const t = useTranslations('FAQ');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems = [
    { question: t('items.0.question'), answer: t('items.0.answer') },
    { question: t('items.1.question'), answer: t('items.1.answer') },
    { question: t('items.2.question'), answer: t('items.2.answer') },
    { question: t('items.3.question'), answer: t('items.3.answer') },
    { question: t('items.4.question'), answer: t('items.4.answer') },
    { question: t('items.5.question'), answer: t('items.5.answer') },
  ];

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section data-name="FAQ" className="bg-[#F8F9FA] py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#2D2D2D] mb-4">
            {t('title')} <span className="text-[#1E7264]">{t('titleHighlight')}</span>
          </h2>
          <p className="text-[16px] md:text-[18px] text-gray-600 max-w-[600px] mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="max-w-[800px] mx-auto bg-white rounded-2xl p-6 md:p-8 shadow-sm">
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

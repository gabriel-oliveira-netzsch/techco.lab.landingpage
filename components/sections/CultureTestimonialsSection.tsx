'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Image from 'next/image';

interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  image: string;
}

export function CultureTestimonialsSection() {
  const t = useTranslations('OurCulture.testimonials');
  const testimonials = t.raw('items') as TestimonialItem[];
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  }, [totalPages]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  }, [totalPages]);

  const visibleTestimonials = testimonials.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  return (
    <section className="bg-[#f5f5f5] py-[64px] md:py-[80px]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
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
          <p className="text-[15px] md:text-[16px] leading-[1.6] text-[#6b7280]">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Testimonials Cards */}
        <div className="relative">
          {/* Navigation */}
          {totalPages > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 z-10 size-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#4c4d58] hover:text-[#00B894] transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 z-10 size-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#4c4d58] hover:text-[#00B894] transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {visibleTestimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-[16px] p-6 flex flex-col"
                >
                  {/* Quote Icon */}
                  <Quote className="size-8 text-[#00B894] mb-4" />

                  {/* Quote Text */}
                  <p className="text-[13px] md:text-[14px] text-[#4c4d58] leading-[1.7] mb-6 flex-1">
                    {testimonial.quote}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="size-12 rounded-full bg-gray-200 overflow-hidden relative flex-shrink-0">
                      {testimonial.image ? (
                        <Image
                          src={testimonial.image}
                          alt={testimonial.author}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="size-full bg-gradient-to-br from-[#00B894] to-[#4c4d58] flex items-center justify-center text-white text-[16px] font-bold">
                          {testimonial.author.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-[#00B894]">
                        {testimonial.author}
                      </p>
                      <p className="text-[12px] text-[#6b7280]">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-[#00B894] w-6'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


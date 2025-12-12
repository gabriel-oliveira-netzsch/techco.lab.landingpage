'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { images } from '@/lib/images';

export function TestimonialsSection() {
  const t = useTranslations('Home.testimonials');
  const [currentIndex, setCurrentIndex] = useState(0);

  // For now, we have a single testimonial - can be extended
  const testimonials = [
    {
      quote: t('quote'),
      author: t('author'),
      role: t('role'),
      image: images.jensNiesner,
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="bg-white relative w-full py-[64px] md:py-[80px] lg:py-[100px]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-[900px] mx-auto mb-[48px]">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[28px] md:text-[42px] lg:text-[52px] font-bold leading-[1.2] text-[#1a1a2e]"
          >
            {t('title')} <span className="text-[#00B894]">{t('titleHighlight')}</span>
          </motion.h2>
        </div>

        {/* Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          <div className="bg-gradient-cards rounded-[20px] p-8 md:p-12 lg:p-16 relative overflow-hidden">
            {/* Quote */}
            <div className="max-w-[800px] mx-auto text-center">
              <p className="text-black text-[15px] md:text-[17px] lg:text-[18px] leading-[1.8] italic mb-8">
                &ldquo;{currentTestimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex flex-col items-center gap-4">
                
                <div>
                  <p className="text-gray-600 font-semibold text-[16px]">
                    {currentTestimonial.author}
                  </p>
                  <p className="text-gray-400 text-[14px]">
                    {currentTestimonial.role}
                  </p>
                </div>
                <div className="size-[64px] rounded-full overflow-hidden border-2 border-[#00B894]">
                  <Image
                    src={currentTestimonial.image}
                    alt={currentTestimonial.author}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2">
              <button
                onClick={handlePrev}
                className="size-10 md:size-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="size-5 md:size-6" />
              </button>
            </div>
            <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2">
              <button
                onClick={handleNext}
                className="size-10 md:size-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight className="size-5 md:size-6" />
              </button>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`size-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-[#00B894] w-6' : 'bg-[#00B894]/30'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


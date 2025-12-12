'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  image: string;
}

export function WhatWeDoTestimonialsSection() {
  const t = useTranslations('WhatWeDo.testimonials');
  const testimonials = t.raw('items') as TestimonialItem[];
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="bg-[#f5f5f5] py-[64px] md:py-[80px]">
      <div className="max-w-[1000px] mx-auto px-6 md:px-8">
        <div className="relative">
          {/* Navigation Arrows */}
          {testimonials.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 size-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#4c4d58] hover:text-[#00B894] transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 size-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#4c4d58] hover:text-[#00B894] transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}

          {/* Testimonial Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-[16px] flex flex-col md:flex-row overflow-hidden"
              style={{ minHeight: 300 }}
            >
              {/* Quote */}
              <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                <blockquote className="text-[15px] md:text-[16px] leading-[1.8] text-[#4c4d58] mb-6 italic">
                  &ldquo;{currentTestimonial.quote}&rdquo;
                </blockquote>
                <div>
                  <p className="text-[14px] font-semibold text-[#4c4d58]">
                    {currentTestimonial.author}
                  </p>
                  <p className="text-[13px] text-[#6b7280]">
                    {currentTestimonial.role}
                  </p>
                </div>
              </div>

              {/* Image */}
              <div className="w-full md:w-[250px] h-[300px] md:h-auto relative shrink-0">
                <Image
                  src={currentTestimonial.image}
                  alt={currentTestimonial.author}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          {testimonials.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex
                      ? "bg-[#00B894] w-6"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


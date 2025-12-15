'use client';

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";

interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  image: string;
}

// Variantes de animação - offset muda conforme quantidade de itens visíveis
const createSlideVariants = (itemsVisible: number) => {
  // Mobile: 1 item = 100%, Desktop: 3 itens = 35%
  const offset = itemsVisible === 1 ? "100%" : "35%";

  return {
    enter: (direction: number) => ({
      x: direction > 0 ? offset : `-${offset.replace("%", "")}%`,
      zIndex: 0,
    }),
    center: {
      x: 0,
      zIndex: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? `-${offset.replace("%", "")}%` : offset,
      zIndex: 0,
    }),
  };
};

export function CultureTestimonialsSection() {
  const t = useTranslations("OurCulture.testimonials");
  const testimonials = t.raw("items") as TestimonialItem[];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [[page, direction], setPage] = useState([0, 0]);
  const [isMobile, setIsMobile] = useState(false);
  const totalItems = testimonials.length;

  // Detectar breakpoint mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 1 item no mobile, 3 no desktop
  const itemsVisible = isMobile ? 1 : 3;
  const slideVariants = useMemo(
    () => createSlideVariants(itemsVisible),
    [itemsVisible]
  );

  // Navegação circular: avança 1 item por vez
  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? totalItems - 1 : currentIndex - 1;
    setPage([page - 1, -1]);
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex === totalItems - 1 ? 0 : currentIndex + 1;
    setPage([page + 1, 1]);
    setCurrentIndex(newIndex);
  };

  const goToIndex = (index: number) => {
    const dir = index > currentIndex ? 1 : -1;
    setPage([index, dir]);
    setCurrentIndex(index);
  };

  // Retornar itens consecutivos de forma circular (1 no mobile, 3 no desktop)
  const visibleTestimonials = useMemo(() => {
    if (totalItems === 0) return [];

    const items: { testimonial: TestimonialItem; originalIndex: number }[] = [];
    for (let i = 0; i < itemsVisible; i++) {
      const index = (currentIndex + i) % totalItems;
      items.push({ testimonial: testimonials[index], originalIndex: index });
    }
    return items;
  }, [testimonials, currentIndex, totalItems, itemsVisible]);

  const showNavigation = totalItems > itemsVisible;

  return (
    <section className="bg-[#f5f5f5] py-[64px] md:py-[80px]">
      <div className="max-w-[1300px] mx-auto px-6 md:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold leading-[1.2] text-[#4c4d58] mb-3">
            {t("title")}{" "}
            <span className="text-[#00B894]">{t("titleHighlight")}</span>
          </h2>
          <p className="text-[15px] md:text-[16px] leading-[1.6] text-[#6b7280]">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Carousel Container - posição relativa para os botões */}
        <div className="relative">
          {/* Navigation Buttons - FORA do overflow */}
          {showNavigation && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute -left-4 md:-left-14 top-1/2 -translate-y-1/2 z-20 size-10 md:size-12 rounded-full bg-white shadow-lg flex items-center justify-center text-[#4c4d58] hover:text-[#00B894] hover:shadow-xl transition-all"
                aria-label="Previous"
              >
                <ChevronLeft className="size-5 md:size-6" />
              </button>
              <button
                onClick={goToNext}
                className="absolute -right-4 md:-right-14 top-1/2 -translate-y-1/2 z-20 size-10 md:size-12 rounded-full bg-white shadow-lg flex items-center justify-center text-[#4c4d58] hover:text-[#00B894] hover:shadow-xl transition-all"
                aria-label="Next"
              >
                <ChevronRight className="size-5 md:size-6" />
              </button>
            </>
          )}

          {/* Cards Container - com overflow hidden para clip do slide */}
          <div className="overflow-hidden relative">
            <AnimatePresence
              initial={false}
              custom={direction}
              mode="popLayout"
            >
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: {
                    type: "tween",
                    duration: 0.4,
                    ease: [0.25, 0.1, 0.25, 1], // cubic-bezier suave
                  },
                }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
                style={{
                  willChange: "transform",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "translateZ(0)", // força GPU layer
                }}
              >
                {visibleTestimonials.map(({ testimonial, originalIndex }) => (
                  <div
                    key={originalIndex}
                    className="bg-white rounded-[16px] p-6 flex flex-col min-h-[400px]"
                  >
                    {/* Quote Icon */}
                    <Quote className="size-8 text-[#00B894] mb-4 flex-shrink-0" />

                    {/* Quote Text */}
                    <p className="text-[14px] min-h-[320px] md:text-[14px] text-[#4c4d58] leading-[1.8] mb-6 flex-1">
                      {testimonial.quote}
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 mt-auto flex-shrink-0">
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
          </div>

          {/* Dots - abaixo do carousel */}
          {showNavigation && (
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-[#00B894] w-6"
                      : "bg-gray-300 hover:bg-gray-400 w-2"
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

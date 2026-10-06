'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/testimonials';

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const current = TESTIMONIALS[currentIndex];

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Decorative luxury quote icon */}
      <div className="flex justify-center mb-6">
        <div className="w-12 h-12 rounded-full bg-[#1E1C1C] border border-[#C9A96E]/30 flex items-center justify-center text-[#C9A96E]">
          <Quote className="w-5 h-5 fill-[#C9A96E]/20" />
        </div>
      </div>

      {/* Main Quote Card */}
      <div className="text-center px-4 sm:px-12 min-h-[220px] flex flex-col justify-between">
        <div>
          {/* Star rating */}
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#C9A96E] text-[#C9A96E]" />
            ))}
          </div>

          <p className="font-serif-luxury text-xl sm:text-2xl md:text-3xl text-white font-normal italic leading-relaxed">
            &ldquo;{current.quote}&rdquo;
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-[#262424]">
          <div className="text-base font-semibold text-white tracking-wide">
            {current.author}
          </div>
          <div className="text-xs text-[#C9A96E] mt-0.5">
            {current.role} &bull; <span className="text-white/60">{current.location}</span>
          </div>
          <div className="text-[11px] text-[#807B75] mt-1 uppercase tracking-wider font-medium">
            Transaction: {current.transactionType}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          type="button"
          onClick={prev}
          className="w-10 h-10 rounded-sm bg-[#1A1818] hover:bg-[#252222] text-white/80 hover:text-white border border-[#333030] hover:border-[#C9A96E] flex items-center justify-center transition-colors"
          aria-label="Previous Testimonial"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Pagination Dots */}
        <div className="flex items-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                currentIndex === i
                  ? 'w-6 bg-[#C9A96E]'
                  : 'w-2 bg-[#333030] hover:bg-white/40'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          className="w-10 h-10 rounded-sm bg-[#1A1818] hover:bg-[#252222] text-white/80 hover:text-white border border-[#333030] hover:border-[#C9A96E] flex items-center justify-center transition-colors"
          aria-label="Next Testimonial"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

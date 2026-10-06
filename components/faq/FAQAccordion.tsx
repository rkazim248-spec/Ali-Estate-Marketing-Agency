'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQItem } from '@/lib/faqs';

interface FAQAccordionProps {
  items: FAQItem[];
  theme?: 'dark' | 'light';
  className?: string;
}

export function FAQAccordion({
  items,
  theme = 'light',
  className = '',
}: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const isDark = theme === 'dark';

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={`border rounded-sm transition-colors ${
              isDark
                ? isOpen
                  ? 'border-[#C9A96E]/60 bg-[#1A1818]'
                  : 'border-[#262424] bg-[#141212] hover:border-[#383434]'
                : isOpen
                ? 'border-[#C9A96E]/70 bg-[#FBF9F5]'
                : 'border-[#EAE7E2] bg-white hover:border-[#D1CCC4]'
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className={`w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-serif-luxury text-lg sm:text-xl font-medium transition-colors ${
                isDark
                  ? isOpen ? 'text-[#C9A96E]' : 'text-white'
                  : isOpen ? 'text-[#9C7737]' : 'text-[#181616]'
              }`}
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <ChevronDown
                className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-[#C9A96E]' : 'text-[#8C8781]'
                }`}
              />
            </button>

            {isOpen && (
              <div
                className={`px-5 pb-5 pt-1 text-xs sm:text-sm leading-relaxed border-t border-inherit/40 ${
                  isDark ? 'text-[#A39E98]' : 'text-[#5C5752]'
                }`}
              >
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

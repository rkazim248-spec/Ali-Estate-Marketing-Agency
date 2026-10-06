import React from 'react';

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  theme?: 'dark' | 'light';
  className?: string;
}

export function SectionHeading({
  kicker,
  title,
  titleAccent,
  subtitle,
  align = 'center',
  theme = 'light',
  className = '',
}: SectionHeadingProps) {
  const isDark = theme === 'dark';
  const alignmentClass = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }[align];

  return (
    <div className={`flex flex-col ${alignmentClass} max-w-3xl ${align === 'center' ? 'mx-auto' : ''} ${className}`}>
      {kicker && (
        <div className="flex items-center gap-2 mb-3">
          <span className="w-5 h-[1px] bg-[#C9A96E]" aria-hidden="true" />
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-[#C9A96E]">
            {kicker}
          </span>
          {align === 'center' && <span className="w-5 h-[1px] bg-[#C9A96E]" aria-hidden="true" />}
        </div>
      )}

      <h2 className={`font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.15] ${
        isDark ? 'text-white' : 'text-[#181616]'
      }`}>
        {title}
        {titleAccent && (
          <span className="block mt-1 text-[#C9A96E] font-normal italic">
            {titleAccent}
          </span>
        )}
      </h2>

      {subtitle && (
        <p className={`mt-4 text-base sm:text-lg leading-relaxed ${
          isDark ? 'text-[#A39E98]' : 'text-[#66615C]'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

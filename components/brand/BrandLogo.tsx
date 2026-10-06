'use client';

import Link from 'next/link';

interface BrandLogoProps {
  variant?: 'dark' | 'light';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export function BrandLogo({
  variant = 'dark',
  className = '',
  size = 'md',
  showSubtitle = true,
}: BrandLogoProps) {
  // Height configurations
  const dimensions = {
    sm: { height: 36, textMain: 'text-lg', textSub: 'text-[9px]' },
    md: { height: 46, textMain: 'text-2xl', textSub: 'text-[10px]' },
    lg: { height: 56, textMain: 'text-3xl', textSub: 'text-[12px]' },
  }[size];

  const isDark = variant === 'dark';

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] ${className}`}
      aria-label="Ali Estate & Marketing Agency - Home"
    >
      {/* House & Roof Architectural Icon Mark */}
      <div className="relative flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-sm bg-[#181616] border border-[#C9A96E]/40 p-1.5 flex items-center justify-center shadow-md transition-all duration-300 group-hover:border-[#C9A96E]">
        <svg
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* House pitch */}
          <path
            d="M8 22L22 8L36 22V36H8V22Z"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Chimney */}
          <path
            d="M29 15V10H33V19"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Golden door */}
          <rect x="18" y="24" width="8" height="12" rx="1" fill="#C9A96E" />
          {/* Ground line */}
          <line
            x1="12"
            y1="36"
            x2="32"
            y2="36"
            stroke="#C9A96E"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Typography Lockup */}
      <div className="flex flex-col">
        <span
          className={`font-serif-luxury font-semibold tracking-wide transition-colors duration-200 ${
            dimensions.textMain
          } ${
            isDark
              ? 'text-[#C9A96E] group-hover:text-[#E5D1A6]'
              : 'text-[#C9A96E] group-hover:text-[#9C7737]'
          }`}
          style={{ letterSpacing: '0.04em' }}
        >
          ALI ESTATE
        </span>
        {showSubtitle && (
          <span
            className={`font-sans-luxury uppercase font-semibold tracking-[0.24em] -mt-1 transition-colors duration-200 ${
              dimensions.textSub
            } ${isDark ? 'text-white/90' : 'text-[#1E1C1C]'}`}
          >
            &amp; Marketing Agency
          </span>
        )}
      </div>
    </Link>
  );
}

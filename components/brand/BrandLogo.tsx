'use client';

import React from 'react';
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
  const isDark = variant === 'dark';

  const config = {
    sm: { iconSize: 'w-8 h-8', textTitle: 'text-lg', textSub: 'text-[9px]' },
    md: { iconSize: 'w-10 h-10', textTitle: 'text-2xl', textSub: 'text-[11px]' },
    lg: { iconSize: 'w-12 h-12', textTitle: 'text-3xl', textSub: 'text-[13px]' },
  }[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] ${className}`}
      aria-label="Ali Estate & Marketing Agency - Home"
    >
      {/* House Icon mark matching user's uploaded New Logo.png */}
      <div
        className={`relative flex-shrink-0 ${config.iconSize} rounded-sm p-1 flex items-center justify-center transition-transform group-hover:scale-105 ${
          isDark ? 'bg-[#181616] border border-[#C9A96E]/30' : 'bg-[#181616]'
        }`}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Exact geometry of the uploaded New Logo:
              Apex at top (56, 18), left slope to eave (20, 52),
              concave graceful sweep across bottom to right base (72, 78),
              right slope to eave (88, 52), horizontal return (78, 52),
              right wall straight down to (78, 80), base return. */}
          <g
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M56 16 L20 52" />
            <path d="M20 52 C38 52 60 58 72 78" />
            <path d="M56 16 L88 52" />
            <path d="M88 52 L78 52" />
            <path d="M78 52 L78 80" />
            <path d="M72 78 L78 78" />
            {/* 4-pane window */}
            <rect x="50" y="36" width="12" height="12" stroke="#FFFFFF" strokeWidth="2.5" fill="none" rx="1" />
            <line x1="56" y1="36" x2="56" y2="48" stroke="#FFFFFF" strokeWidth="2" />
            <line x1="50" y1="42" x2="62" y2="42" stroke="#FFFFFF" strokeWidth="2" />
          </g>
        </svg>
      </div>

      {/* Typography from New Logo:
          "Ali Estate" in champagne gold serif + "& Marketing Agency" in clean modern sans */}
      <div className="flex flex-col leading-tight">
        <span
          className={`font-serif-luxury font-medium tracking-wide transition-colors ${
            config.textTitle
          } ${
            isDark
              ? 'text-[#C9A96E] group-hover:text-[#E5D1A6]'
              : 'text-[#C9A96E] group-hover:text-[#9C7737]'
          }`}
        >
          Ali Estate
        </span>
        {showSubtitle && (
          <span
            className={`font-sans-luxury tracking-wide font-normal -mt-0.5 transition-colors ${
              config.textSub
            } ${isDark ? 'text-white/95' : 'text-[#181616]'}`}
          >
            &amp; Marketing Agency
          </span>
        )}
      </div>
    </Link>
  );
}

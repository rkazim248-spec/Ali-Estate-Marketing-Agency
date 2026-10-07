'use client';

import React, { useEffect, useState, useRef } from 'react';
import { ShieldCheck, MapPin, Video, Users2 } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

interface StatItemProps {
  numericValue: number;
  suffix: string;
  label: string;
  description: string;
  isVisible: boolean;
}

function StatItem({ numericValue, suffix, label, description, isVisible }: StatItemProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 1400;
    const stepTime = 25;
    const steps = duration / stepTime;
    const increment = numericValue / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isVisible, numericValue]);

  return (
    <div className="flex flex-col items-center text-center p-6 bg-[#181616] border border-[#2A2727] rounded-sm group hover:border-[#C9A96E]/50 transition-colors">
      <div className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white flex items-baseline">
        <span className="text-white group-hover:text-[#E2CD9F] transition-colors">
          {count}
        </span>
        <span className="text-[#C9A96E] ml-1">{suffix}</span>
      </div>

      <div className="mt-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-white/90">
        {label}
      </div>

      <div className="mt-1 text-[11px] sm:text-xs text-[#807B75] leading-relaxed max-w-[200px]">
        {description}
      </div>
    </div>
  );
}

export function StatsCounter() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {siteConfig.stats.map((stat) => (
          <StatItem
            key={stat.id}
            numericValue={stat.numericValue}
            suffix={stat.suffix}
            label={stat.label}
            description={stat.description}
            isVisible={isVisible}
          />
        ))}
      </div>
    </div>
  );
}

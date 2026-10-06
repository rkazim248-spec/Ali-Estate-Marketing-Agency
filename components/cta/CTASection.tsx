import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

interface CTASectionProps {
  variant?: 'seller' | 'buyer' | 'marketing';
  className?: string;
}

export function CTASection({ variant = 'seller', className = '' }: CTASectionProps) {
  const content = {
    seller: {
      kicker: 'Property Dispositions',
      title: 'Have an Exceptional Property to Sell?',
      subtitle: 'Put your residence or development in front of qualified domestic and overseas Pakistani investors with agency-grade marketing and experienced negotiation.',
      primaryButtonText: 'List Your Property',
      primaryButtonHref: '/list-property',
      secondaryButtonText: 'Speak to an Acquisitions Advisor',
      secondaryButtonHref: `https://wa.me/${siteConfig.contact.whatsappNumber}`,
      isExternal: true,
    },
    buyer: {
      kicker: 'Curated Portfolio',
      title: 'Looking for Your Next Prime Acquisition?',
      subtitle: 'From waterfront Clifton penthouses to sprawling DHA Phase 8 estates, discover curated properties verified for title clarity and capital security.',
      primaryButtonText: 'Explore Properties',
      primaryButtonHref: '/properties',
      secondaryButtonText: 'Schedule Confidential Consultation',
      secondaryButtonHref: '/contact',
      isExternal: false,
    },
    marketing: {
      kicker: 'Agency Services',
      title: 'Ready to Market Your Property or Project Better?',
      subtitle: 'Elevate your real estate brand with 4K architectural cinematography, precision diaspora ad targeting, and editorial design that drives qualified inquiries.',
      primaryButtonText: 'Talk to Our Marketing Team',
      primaryButtonHref: '/services/marketing',
      secondaryButtonText: 'Explore Marketing Packages',
      secondaryButtonHref: '/services/marketing#pricing',
      isExternal: false,
    },
  }[variant];

  return (
    <section className={`relative overflow-hidden py-20 bg-[#141212] border-y border-[#262424] text-white ${className}`}>
      {/* Subtle architectural ambient accent */}
      <div className="absolute inset-0 bg-radial-gradient from-[#C9A96E]/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-5 h-[1px] bg-[#C9A96E]" aria-hidden="true" />
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C9A96E]">
            {content.kicker}
          </span>
          <span className="w-5 h-[1px] bg-[#C9A96E]" aria-hidden="true" />
        </div>

        <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white max-w-2xl">
          {content.title}
        </h2>

        <p className="mt-4 text-sm sm:text-base text-[#9C9791] leading-relaxed max-w-xl">
          {content.subtitle}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href={content.primaryButtonHref}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-[#121010] bg-[#C9A96E] hover:bg-[#D8BC87] rounded-sm transition-all shadow-lg hover:shadow-[#C9A96E]/20"
          >
            <span>{content.primaryButtonText}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {content.isExternal ? (
            <a
              href={content.secondaryButtonHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-white/80 hover:text-white border border-[#3A3636] hover:border-[#C9A96E] rounded-sm transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#C9A96E]" />
              <span>{content.secondaryButtonText}</span>
            </a>
          ) : (
            <Link
              href={content.secondaryButtonHref}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-white/80 hover:text-white border border-[#3A3636] hover:border-[#C9A96E] rounded-sm transition-all"
            >
              <span>{content.secondaryButtonText}</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

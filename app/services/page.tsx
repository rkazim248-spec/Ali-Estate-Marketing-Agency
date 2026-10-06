import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Sparkles, Building2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceCard } from '@/components/service/ServiceCard';
import { CTASection } from '@/components/cta/CTASection';
import { REAL_ESTATE_SERVICES, MARKETING_SERVICES } from '@/lib/services';

export const metadata: Metadata = {
  title: 'Real Estate & Marketing Services',
  description: 'Combining premier real estate brokerage and advisory with high-end property marketing agency capabilities.',
};

export default function ServicesPage() {
  return (
    <div className="pt-28 pb-24 bg-[#F7F5F1]">
      <Container size="xl">
        {/* Page Hero */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-[#1A1818]/10 border border-[#C9A96E]/40 rounded-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#9C7737]">
              Integrated Advisory &bull; Two Dedicated Divisions
            </span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-medium text-[#181616] leading-tight">
            Real Estate Expertise.{' '}
            <span className="block italic text-[#9C7737] font-normal">
              Marketing That Moves Property.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[#66615C] max-w-2xl mx-auto leading-relaxed">
            Most real estate brokerages cannot produce compelling media, and most digital agencies do not understand property law or title chains. We integrate both into one seamless standard.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <a
              href="#real-estate"
              className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#121010] bg-[#C9A96E] hover:bg-[#D8BC87] rounded-sm transition-all"
            >
              Real Estate Services
            </a>
            <a
              href="#marketing"
              className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#121010] hover:bg-black rounded-sm transition-all"
            >
              Marketing Agency Division
            </a>
          </div>
        </div>

        {/* Division 1: Real Estate Services */}
        <section id="real-estate" className="mb-24 pt-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-[#E0DCD6]">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9C7737]">
                Division 01
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-medium text-[#181616] mt-1">
                Real Estate Advisory &amp; Brokerage
              </h2>
              <p className="text-xs text-[#736E6A] mt-2 max-w-xl">
                Bespoke guidance for high-value residential, commercial, and investment land transactions across Karachi.
              </p>
            </div>

            <Link
              href="/services/real-estate"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#181616] hover:text-[#9C7737] transition-colors self-start md:self-end"
            >
              <span>Explore Real Estate Practice</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REAL_ESTATE_SERVICES.map((srv) => (
              <ServiceCard key={srv.id} service={srv} theme="light" />
            ))}
          </div>
        </section>

        {/* Division 2: Marketing Services */}
        <section id="marketing" className="mb-20 pt-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-[#E0DCD6]">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9C7737]">
                Division 02
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-medium text-[#181616] mt-1">
                Property Marketing &amp; Media Agency
              </h2>
              <p className="text-xs text-[#736E6A] mt-2 max-w-xl">
                Cinema-grade architectural photography, 4K video tours, aerial cinematography, and hyper-targeted advertising.
              </p>
            </div>

            <Link
              href="/services/marketing"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#181616] hover:text-[#9C7737] transition-colors self-start md:self-end"
            >
              <span>Explore Marketing Landing &amp; Packages</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MARKETING_SERVICES.map((srv) => (
              <ServiceCard key={srv.id} service={srv} theme="light" />
            ))}
          </div>
        </section>

        <CTASection variant="marketing" />
      </Container>
    </div>
  );
}

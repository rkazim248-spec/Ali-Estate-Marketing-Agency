import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Home, 
  TrendingUp, 
  Key, 
  PieChart, 
  ShieldCheck, 
  FileCheck, 
  CheckCircle2, 
  ArrowRight,
  Shield,
  PhoneCall
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FAQAccordion } from '@/components/faq/FAQAccordion';
import { CTASection } from '@/components/cta/CTASection';
import { REAL_ESTATE_SERVICES } from '@/lib/services';
import { FAQS } from '@/lib/faqs';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Real Estate Services & Advisory',
  description: 'Bespoke residential acquisitions, commercial leasing, property valuation, and portfolio management in Karachi.',
};

export default function RealEstateServicesPage() {
  const reFaqs = FAQS.filter((f) => f.category === 'Buying & Selling' || f.category === 'Investment');

  return (
    <div className="pt-28 pb-24 bg-[#F7F5F1]">
      <Container size="xl">
        {/* Hero */}
        <div className="max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-[1px] bg-[#C9A96E]" />
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#9C7737]">
              Advisory &bull; Conveyancing &bull; Asset Stewardship
            </span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-medium text-[#181616] leading-tight">
            Comprehensive Real Estate Services for{' '}
            <span className="italic text-[#9C7737] font-normal block sm:inline">
              Discerning Property Owners &amp; Buyers.
            </span>
          </h1>

          <p className="mt-6 text-base text-[#66615C] max-w-2xl leading-relaxed">
            Every transaction is managed with institutional precision. From verifying decades-old title chains at local development authorities to negotiating multi-crore sale values, we protect your interests at every step.
          </p>
        </div>

        {/* Detailed Breakdown of 6 Real Estate Services */}
        <div className="space-y-12 mb-24">
          {REAL_ESTATE_SERVICES.map((srv, idx) => (
            <div
              key={srv.id}
              className="bg-white border border-[#E9E7E3] p-8 sm:p-10 rounded-sm shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              <div className="lg:col-span-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-serif-luxury text-3xl font-light text-[#9C7737]">
                    {srv.number}
                  </span>
                  <span className="w-8 h-[1px] bg-[#C9A96E]" />
                </div>
                <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#181616]">
                  {srv.title}
                </h2>
                {srv.audience && (
                  <p className="mt-2 text-xs text-[#8A857F] italic">
                    Best suited for: {srv.audience}
                  </p>
                )}
              </div>

              <div className="lg:col-span-8 space-y-4">
                <p className="text-sm text-[#4A4643] leading-relaxed">
                  {srv.fullDescription}
                </p>

                <div className="pt-4 border-t border-[#EAE7E2]">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#9C7737] mb-3">
                    What This Encompasses:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {srv.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#2E2B29]">
                        <CheckCircle2 className="w-4 h-4 text-[#C9A96E] flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#121010] hover:text-[#9C7737] transition-colors"
                  >
                    <span>Inquire About This Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto mb-20">
          <SectionHeading
            align="center"
            theme="light"
            kicker="Common Inquiries"
            title="Real Estate FAQs"
            subtitle="Answers regarding property listing, legal due diligence, and buyer representation."
            className="mb-8"
          />

          <FAQAccordion items={reFaqs} theme="light" />
        </div>

        <CTASection variant="buyer" />
      </Container>
    </div>
  );
}

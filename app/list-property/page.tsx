import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ListPropertyForm } from '@/components/forms/ListPropertyForm';

export const metadata: Metadata = {
  title: 'List Your Property | Premier Dispositions',
  description: 'Submit your residential, commercial, or development property for appraisal, bespoke media staging, and high-converting marketing.',
};

export default function ListPropertyPage() {
  return (
    <div className="pt-28 pb-24 bg-[#111111] text-white min-h-screen">
      <Container size="xl">
        {/* Page Hero */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-[1px] bg-[#C9A96E]" />
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C9A96E]">
              Private Representation &amp; Dispositions
            </span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-medium text-white leading-tight">
            Ready to Sell Your Property?{' '}
            <span className="italic text-[#C9A96E] font-normal block sm:inline">
              Let&apos;s Put It in Front of the Right Buyers.
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-[#9C9791] leading-relaxed">
            Tell us about your property and our acquisitions and media team will get in touch to conduct a complimentary comparative market valuation.
          </p>
        </div>

        {/* The List Property Interactive Form and Roadmap Panel */}
        <ListPropertyForm />
      </Container>
    </div>
  );
}

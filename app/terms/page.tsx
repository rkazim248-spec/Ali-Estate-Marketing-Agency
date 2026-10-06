import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms of service and property representation conditions for Ali Estate & Marketing Agency.',
};

export default function TermsPage() {
  return (
    <div className="pt-28 pb-24 bg-[#F7F5F1] min-h-screen">
      <Container size="md">
        <div className="bg-white border border-[#E9E7E3] p-8 sm:p-12 rounded-sm shadow-xs space-y-6 text-xs sm:text-sm text-[#47433F] leading-relaxed">
          <span className="text-[10px] uppercase font-semibold tracking-widest text-[#9C7737] block">
            Legal Terms
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-medium text-[#181616]">
            Terms &amp; Conditions
          </h1>
          <p className="text-xs text-[#807B75]">
            Effective Date: January 2026 &bull; {siteConfig.legalName}
          </p>

          <section className="space-y-3 pt-4 border-t border-[#EAE7E2]">
            <h2 className="font-serif-luxury text-xl font-medium text-[#181616]">
              1. Agency Scope &amp; Advisory Notice
            </h2>
            <p>
              The property descriptions, photographs, and pricing indications presented on this website are compiled for informational and marketing purposes. While we exercise utmost care in verifying seller allotment documents and titles, prospective buyers are advised to complete formal due diligence through our authorized legal conveyancing partners prior to signing binding sale agreements.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif-luxury text-xl font-medium text-[#181616]">
              2. Intellectual Property &amp; Media Assets
            </h2>
            <p>
              All architectural photographs, drone videos, logos, copywriting, and graphics on this website are the intellectual property of {siteConfig.legalName}. Any unauthorized reproduction, framing, or commercial redistribution without prior written consent is strictly prohibited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif-luxury text-xl font-medium text-[#181616]">
              3. Governing Law &amp; Jurisdiction
            </h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of the Islamic Republic of Pakistan, with exclusive jurisdiction in the courts of Karachi.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}

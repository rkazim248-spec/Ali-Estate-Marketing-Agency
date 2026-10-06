import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy and data protection practices for Ali Estate & Marketing Agency.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-28 pb-24 bg-[#F7F5F1] min-h-screen">
      <Container size="md">
        <div className="bg-white border border-[#E9E7E3] p-8 sm:p-12 rounded-sm shadow-xs space-y-6 text-xs sm:text-sm text-[#47433F] leading-relaxed">
          <span className="text-[10px] uppercase font-semibold tracking-widest text-[#9C7737] block">
            Legal &amp; Privacy
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-medium text-[#181616]">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#807B75]">
            Last Updated: January 2026 &bull; {siteConfig.legalName}
          </p>

          <section className="space-y-3 pt-4 border-t border-[#EAE7E2]">
            <h2 className="font-serif-luxury text-xl font-medium text-[#181616]">
              1. Information We Collect
            </h2>
            <p>
              When you submit property inquiries, schedule private viewings, or request listing appraisal services through Ali Estate &amp; Marketing Agency, we collect personal information such as your full name, telephone number, email address, property parameters, and investment budget preferences.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif-luxury text-xl font-medium text-[#181616]">
              2. How We Use Your Information
            </h2>
            <p>
              Your personal data is used strictly to provide personalized real estate advisory, coordinate property inspections with verified owners, deliver comparative valuation dossiers, and communicate updates regarding opportunities matching your criteria.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif-luxury text-xl font-medium text-[#181616]">
              3. Data Confidentiality &amp; Non-Disclosure
            </h2>
            <p>
              We treat all client records with high discretion. We do not sell, rent, or lease client information to third-party telemarketers or external broker databases.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif-luxury text-xl font-medium text-[#181616]">
              4. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy or wish to request removal of your contact details, please email our compliance desk at{' '}
              <a href={`mailto:${siteConfig.contact.email}`} className="text-[#9C7737] underline">
                {siteConfig.contact.email}
              </a>.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}

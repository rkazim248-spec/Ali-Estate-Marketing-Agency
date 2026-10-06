import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CTASection } from '@/components/cta/CTASection';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Careers & Partnerships',
  description: 'Join the premier real estate and property marketing agency in Pakistan.',
};

export default function CareersPage() {
  const roles = [
    {
      title: 'Senior Luxury Property Consultant',
      location: 'Clifton, Karachi',
      type: 'Full-time &bull; Commission + Base',
      description: 'Represent high-value buyers and sellers across Clifton Block 4, DHA Phase 8, and oceanfront towers.',
    },
    {
      title: 'Architectural Media Cinematographer',
      location: 'Karachi Studio & On-Site',
      type: 'Full-time &bull; Creative Team',
      description: 'Lead 4K interior gimbal walkthroughs, drone shoots, and post-production editing for marquee listings.',
    },
    {
      title: 'Real Estate Paid Media Strategist',
      location: 'Karachi HQ / Hybrid',
      type: 'Full-time &bull; Marketing Team',
      description: 'Manage diaspora Meta & Google Ad campaigns targeting Gulf, UK, and US overseas investors.',
    },
  ];

  return (
    <div className="pt-28 pb-24 bg-[#F7F5F1] min-h-screen">
      <Container size="xl">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-[1px] bg-[#C9A96E]" />
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#9C7737]">
              Join Our Team
            </span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-medium text-[#181616] leading-tight">
            Careers at{' '}
            <span className="italic text-[#9C7737] font-normal">
              Ali Estate &amp; Marketing Agency.
            </span>
          </h1>

          <p className="mt-4 text-base text-[#66615C] leading-relaxed">
            We are always seeking exceptional consultants, cinematographers, and marketers passionate about luxury property.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {roles.map((role, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E9E7E3] p-8 rounded-sm shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] text-[#9C7737] font-semibold uppercase tracking-wider block mb-2" dangerouslySetInnerHTML={{ __html: role.type }} />
                <h3 className="font-serif-luxury text-2xl font-medium text-[#181616] mb-2">
                  {role.title}
                </h3>
                <span className="text-xs text-[#807B75] block mb-4">
                  {role.location}
                </span>
                <p className="text-xs text-[#524E4B] leading-relaxed">
                  {role.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#EAE7E2]">
                <a
                  href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(`Career Application: ${role.title}`)}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#181616] hover:text-[#9C7737] transition-colors"
                >
                  <span>Apply with Resume</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <CTASection variant="marketing" />
      </Container>
    </div>
  );
}

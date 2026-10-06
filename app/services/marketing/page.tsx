import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Camera, 
  Video, 
  Share2, 
  Target, 
  Sparkles, 
  Globe, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  BarChart3,
  Play,
  Layers,
  Award
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CTASection } from '@/components/cta/CTASection';
import { MARKETING_SERVICES, MARKETING_PACKAGES } from '@/lib/services';
import { CASE_STUDIES } from '@/lib/case-studies';

export const metadata: Metadata = {
  title: 'Property Marketing & Media Agency',
  description: 'Marketing that makes property impossible to ignore. Cinema-grade architectural photography, 4K video tours, aerial cinematography, and hyper-targeted advertising.',
};

export default function MarketingServicesPage() {
  return (
    <div className="bg-[#111111] text-white min-h-screen">
      {/* =========================================================================
          1. AGENCY HERO SECTION
          ========================================================================= */}
      <section className="relative pt-36 pb-24 border-b border-[#242222] overflow-hidden">
        {/* Ambient Dark Gradient Background */}
        <div className="absolute inset-0 bg-radial-gradient from-[#C9A96E]/10 via-[#111111] to-[#111111] pointer-events-none" />

        <Container size="xl">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 bg-[#1C1A1A] border border-[#C9A96E]/40 rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-ping" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C9A96E]">
                The Creative &amp; Performance Media Division
              </span>
            </div>

            <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight">
              Marketing That Makes Property{' '}
              <span className="italic text-[#C9A96E] font-normal block sm:inline">
                Impossible to Ignore.
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-[#9C9791] max-w-2xl mx-auto leading-relaxed">
              We replace dull broker classifieds with cinema-grade architectural media, cinematic drone walkthroughs, and high-performing diaspora ad campaigns that convert high-net-worth attention into verified transactions.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#pricing"
                className="px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-[#121010] bg-[#C9A96E] hover:bg-[#D8BC87] rounded-sm transition-all shadow-xl hover:shadow-[#C9A96E]/20"
              >
                View Marketing Packages
              </a>
              <a
                href="#showcase"
                className="px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-white border border-[#3D3939] hover:border-[#C9A96E] rounded-sm transition-all"
              >
                Explore Production Showcase
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          2. THE CHALLENGE VS. OUR APPROACH
          ========================================================================= */}
      <section className="py-24 border-b border-[#242222] bg-[#141212]">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* The Old Way */}
            <div className="p-8 bg-[#181616] border border-[#2E2B2B] rounded-sm">
              <span className="text-[10px] uppercase font-semibold tracking-widest text-rose-400 mb-2 block">
                The Status Quo Problem
              </span>
              <h3 className="font-serif-luxury text-2xl font-medium text-white mb-4">
                Why Traditional Real Estate Marketing Fails
              </h3>
              <ul className="space-y-3 text-xs text-[#8E8984]">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">&times;</span>
                  <span>Distorted smartphone photos taken without professional staging or exposure control</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">&times;</span>
                  <span>Generic classified listings where a 20-crore villa looks identical to an average flat</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">&times;</span>
                  <span>Passive waiting for random walk-ins rather than proactive outbound digital targeting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">&times;</span>
                  <span>No screening of tire-kickers, exposing private family homes to endless sightseers</span>
                </li>
              </ul>
            </div>

            {/* The Ali Estate Agency Standard */}
            <div className="p-8 bg-[#1C1919] border border-[#C9A96E]/50 rounded-sm shadow-xl">
              <span className="text-[10px] uppercase font-semibold tracking-widest text-[#C9A96E] mb-2 block">
                The Ali Estate Agency Standard
              </span>
              <h3 className="font-serif-luxury text-2xl font-medium text-white mb-4">
                How We Create Asset Prestige &amp; Demand
              </h3>
              <ul className="space-y-3 text-xs text-[#C7C2BB]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A96E] flex-shrink-0" />
                  <span>Magazine-grade architectural photography with tilt-shift framing and twilight ambient light</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A96E] flex-shrink-0" />
                  <span>Cinematic 4K gimbal walkthroughs and FAA/CAA-certified aerial drone overviews</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A96E] flex-shrink-0" />
                  <span>High-intent Meta &amp; Google ad funnels targeted to affluent diaspora buyers across GCC &amp; UK</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A96E] flex-shrink-0" />
                  <span>Rigorous qualification filtering so only financially vetted buyers cross the threshold</span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          3. PRODUCTION CAPABILITIES & VISUAL SHOWCASE
          ========================================================================= */}
      <section id="showcase" className="py-24 border-b border-[#242222]">
        <Container size="xl">
          <SectionHeading
            align="center"
            theme="dark"
            kicker="Visual Campaign Showcase"
            title="What We Produce &amp; Deliver"
            subtitle="Explore our in-house media disciplines built specifically for premium architectural developments."
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 1. Architectural Photography */}
            <div className="group bg-[#181616] border border-[#2D2929] hover:border-[#C9A96E] rounded-sm overflow-hidden flex flex-col transition-all">
              <div className="relative aspect-[16/10] bg-[#111111]">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                  alt="Architectural Photography"
                  fill
                  sizes="400px"
                  referrerPolicy="no-referrer"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2 py-1 bg-black/80 text-[#C9A96E] text-[10px] font-semibold uppercase tracking-wider rounded-sm">
                  Still Production
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-luxury text-xl font-medium text-white mb-2">
                    Architectural &amp; Interior Stills
                  </h3>
                  <p className="text-xs text-[#8E8984] leading-relaxed">
                    HDR twilight captures, balanced window exposures, and color-graded stills that showcase spatial craftsmanship.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#262424] text-[11px] text-[#C9A96E]">
                  25+ Retouched Stills &bull; High-Res Print Ready
                </div>
              </div>
            </div>

            {/* 2. Drone & Cinematic Video */}
            <div className="group bg-[#181616] border border-[#2D2929] hover:border-[#C9A96E] rounded-sm overflow-hidden flex flex-col transition-all">
              <div className="relative aspect-[16/10] bg-[#111111]">
                <Image
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
                  alt="Aerial Drone Cinematography"
                  fill
                  sizes="400px"
                  referrerPolicy="no-referrer"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2 py-1 bg-black/80 text-[#C9A96E] text-[10px] font-semibold uppercase tracking-wider rounded-sm">
                  Cinematography
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-luxury text-xl font-medium text-white mb-2">
                    Cinematic 4K Video &amp; Drone
                  </h3>
                  <p className="text-xs text-[#8E8984] leading-relaxed">
                    Smooth gimbal sweeps, custom ambient audio scoring, voiceover narration, and sweeping coastal drone overviews.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#262424] text-[11px] text-[#C9A96E]">
                  60s Vertical Reels + 3-Min Feature Tour
                </div>
              </div>
            </div>

            {/* 3. Diaspora Ad Targeting */}
            <div className="group bg-[#181616] border border-[#2D2929] hover:border-[#C9A96E] rounded-sm overflow-hidden flex flex-col transition-all">
              <div className="relative aspect-[16/10] bg-[#111111]">
                <Image
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
                  alt="Paid Performance Advertising"
                  fill
                  sizes="400px"
                  referrerPolicy="no-referrer"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2 py-1 bg-black/80 text-[#C9A96E] text-[10px] font-semibold uppercase tracking-wider rounded-sm">
                  Performance Media
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-luxury text-xl font-medium text-white mb-2">
                    Overseas Diaspora Ad Campaigns
                  </h3>
                  <p className="text-xs text-[#8E8984] leading-relaxed">
                    Geo-fenced Meta &amp; Google Ads reaching non-resident Pakistanis in Dubai, Riyadh, London, and North America.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#262424] text-[11px] text-[#C9A96E]">
                  Automated WhatsApp Lead Routing &bull; Weekly Reporting
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          4. ALL MARKETING SERVICES GRID
          ========================================================================= */}
      <section className="py-24 border-b border-[#242222] bg-[#141212]">
        <Container size="xl">
          <SectionHeading
            align="center"
            theme="dark"
            kicker="Comprehensive Agency Scope"
            title="Every Media Capability Under One Roof"
            subtitle="Tailored to individual private mansions, commercial developments, and masterplanned communities."
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MARKETING_SERVICES.map((srv) => (
              <div
                key={srv.id}
                className="p-6 bg-[#181616] border border-[#2B2828] hover:border-[#C9A96E]/60 rounded-sm transition-all"
              >
                <span className="font-serif-luxury text-2xl font-light text-[#C9A96E] block mb-2">
                  {srv.number}
                </span>
                <h4 className="font-serif-luxury text-xl font-medium text-white mb-2">
                  {srv.title}
                </h4>
                <p className="text-xs text-[#8C8781] leading-relaxed mb-4">
                  {srv.shortDescription}
                </p>
                {srv.deliverables && (
                  <div className="pt-3 border-t border-[#242222] space-y-1">
                    {srv.deliverables.map((del, dIdx) => (
                      <div key={dIdx} className="text-[11px] text-[#C9A96E] flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#C9A96E]" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          5. MARKETING PACKAGES
          ========================================================================= */}
      <section id="pricing" className="py-24 border-b border-[#242222]">
        <Container size="xl">
          <SectionHeading
            align="center"
            theme="dark"
            kicker="Tiered Solutions"
            title="Marketing Packages"
            subtitle="Select the campaign tier that matches your property caliber and speed requirements."
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MARKETING_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative p-8 rounded-sm flex flex-col justify-between transition-all ${
                  pkg.popular
                    ? 'bg-[#1C1919] border-2 border-[#C9A96E] shadow-2xl scale-102'
                    : 'bg-[#181616] border border-[#2D2A2A]'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#C9A96E] text-[#121010] text-[10px] font-bold uppercase tracking-widest rounded-sm">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  <h3 className="font-serif-luxury text-2xl font-medium text-white mb-1">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-[#8A857F] mb-6 min-h-[32px]">
                    {pkg.tagline}
                  </p>

                  <div className="pb-6 mb-6 border-b border-[#262424]">
                    <span className="font-serif-luxury text-2xl font-bold text-[#C9A96E]">
                      {pkg.price}
                    </span>
                    <span className="text-[11px] text-[#736E6A] block mt-1">
                      Based on property parameters &amp; scope
                    </span>
                  </div>

                  <ul className="space-y-3 text-xs mb-8">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-[#C7C2BB]">
                        <CheckCircle2 className="w-4 h-4 text-[#C9A96E] flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/contact"
                  className={`w-full py-3.5 text-xs font-semibold uppercase tracking-widest text-center rounded-sm transition-all ${
                    pkg.popular
                      ? 'bg-[#C9A96E] hover:bg-[#D8BC87] text-[#121010] shadow-md'
                      : 'bg-[#242121] hover:bg-[#2F2C2C] text-white border border-[#3D3A3A]'
                  }`}
                >
                  Book Package Consultation
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          6. CASE STUDIES TEASER
          ========================================================================= */}
      <section className="py-24 bg-[#141212] border-b border-[#242222]">
        <Container size="xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <SectionHeading
              align="left"
              theme="dark"
              kicker="Real Campaign Architecture"
              title="Campaign Case Studies"
              subtitle="Explore how strategic positioning and production transformed property outcomes."
            />

            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C9A96E] hover:text-white transition-colors pb-2"
            >
              <span>View All Case Studies ({CASE_STUDIES.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CASE_STUDIES.map((cs) => (
              <div
                key={cs.id}
                className="bg-[#181616] border border-[#2E2B2B] rounded-sm overflow-hidden flex flex-col group"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={cs.coverImage}
                    alt={cs.title}
                    fill
                    sizes="600px"
                    referrerPolicy="no-referrer"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181616] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/80 text-[#C9A96E] text-[10px] font-semibold uppercase tracking-wider rounded-sm">
                    {cs.projectType}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] text-[#78736E] uppercase tracking-wider">
                      {cs.location} &bull; {cs.year}
                    </span>
                    <h3 className="font-serif-luxury text-2xl font-medium text-white mt-1 mb-2">
                      {cs.title}
                    </h3>
                    <p className="text-xs text-[#8A857F] line-clamp-2">
                      {cs.challenge}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#262424] flex items-center justify-between text-xs">
                    <span className="text-[#C9A96E] font-medium">
                      Results: {cs.results[0]?.value}
                    </span>
                    <Link
                      href="/case-studies"
                      className="inline-flex items-center gap-1 text-white hover:text-[#C9A96E] transition-colors"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <CTASection variant="marketing" />
    </div>
  );
}

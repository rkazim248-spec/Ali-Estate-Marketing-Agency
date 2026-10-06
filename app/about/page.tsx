import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { 
  ShieldCheck, 
  Award, 
  Users, 
  Lightbulb, 
  Sparkles, 
  Target, 
  Mail, 
  Phone, 
  Linkedin,
  Compass,
  ArrowRight
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CTASection } from '@/components/cta/CTASection';
import { TEAM_MEMBERS } from '@/lib/team';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'About Our Agency | Story, Mission & Leadership',
  description: 'Built around property. Driven by possibility. Discover the philosophy, values, and leadership behind Ali Estate & Marketing Agency.',
};

export default function AboutPage() {
  return (
    <div className="bg-[#FFFFFF] min-h-screen">
      {/* =========================================================================
          1. CINEMATIC ABOUT HERO
          ========================================================================= */}
      <section className="relative pt-36 pb-24 bg-[#111111] text-white border-b border-[#242222] overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-[#C9A96E]/10 via-[#111111] to-[#111111] pointer-events-none" />

        <Container size="xl">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 bg-[#1C1A1A] border border-[#C9A96E]/40 rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C9A96E]">
                The Agency Story &amp; Philosophy
              </span>
            </div>

            <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight">
              Built Around Property.{' '}
              <span className="italic text-[#C9A96E] font-normal block sm:inline">
                Driven by Possibility.
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-[#9C9791] max-w-2xl mx-auto leading-relaxed">
              We started with a simple belief: the transaction of high-value real estate in Pakistan deserves the same rigorous fiduciary integrity and visual sophistication found in global financial capitals.
            </p>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          2. OUR STORY SECTION
          ========================================================================= */}
      <section className="py-24 bg-[#F7F5F1] border-b border-[#EAE7E2]">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative aspect-[4/3] rounded-sm overflow-hidden bg-[#181616] border border-[#E0DCD6] shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=85"
                alt="Architectural Estate Heritage"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                referrerPolicy="no-referrer"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] uppercase font-semibold tracking-widest text-[#C9A96E]">
                  Karachi &bull; Clifton &bull; DHA
                </span>
                <p className="font-serif-luxury text-xl mt-1 italic">
                  &ldquo;A house is an address; an exceptional property is a legacy.&rdquo;
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9C7737]">
                Our Story
              </span>

              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-medium text-[#181616]">
                Bridging Real Estate Advisory with Agency-Grade Marketing.
              </h2>

              <p className="text-sm text-[#4A4643] leading-relaxed">
                For decades, the real estate market in Karachi was characterized by fragmented brokerage practices, handwritten records, and low-fidelity photography. Buyers lacked transparency, while property owners saw their most valuable lifetime assets represented with little dignity.
              </p>

              <p className="text-sm text-[#66615C] leading-relaxed">
                Ali Estate &amp; Marketing Agency was established to dismantle that status quo. By uniting seasoned conveyancing specialists and former investment bankers with in-house architectural cinematographers and digital performance strategists, we provide our clients with a full-spectrum advantage.
              </p>

              <div className="pt-2 grid grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-white border border-[#E0DCD6] rounded-sm">
                  <strong className="text-base text-[#181616] block font-serif-luxury">
                    10+ Years
                  </strong>
                  <span className="text-[#807B75]">Guiding high-value transactions</span>
                </div>
                <div className="p-4 bg-white border border-[#E0DCD6] rounded-sm">
                  <strong className="text-base text-[#181616] block font-serif-luxury">
                    300+ Deals
                  </strong>
                  <span className="text-[#807B75]">Closed with absolute legal clarity</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          3. MISSION & VISION
          ========================================================================= */}
      <section className="py-24 bg-white border-b border-[#EAE7E2]">
        <Container size="xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="p-8 sm:p-10 bg-[#FAF9F6] border border-[#EAE7E2] rounded-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-semibold tracking-widest text-[#9C7737]">
                  Our Purpose
                </span>
                <h3 className="font-serif-luxury text-3xl font-medium text-[#181616] mt-2 mb-4">
                  Our Mission
                </h3>
                <blockquote className="font-serif-luxury text-xl sm:text-2xl text-[#181616] italic leading-snug">
                  &ldquo;To make property decisions simpler, smarter, and more rewarding.&rdquo;
                </blockquote>
                <p className="mt-4 text-xs sm:text-sm text-[#66615C] leading-relaxed">
                  We demystify real estate for our clients by conducting rigorous due diligence, negotiating with objective data, and presenting every property with uncompromising creative excellence.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="p-8 sm:p-10 bg-[#FAF9F6] border border-[#EAE7E2] rounded-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-semibold tracking-widest text-[#9C7737]">
                  Our Aspiration
                </span>
                <h3 className="font-serif-luxury text-3xl font-medium text-[#181616] mt-2 mb-4">
                  Our Vision
                </h3>
                <blockquote className="font-serif-luxury text-xl sm:text-2xl text-[#181616] italic leading-snug">
                  &ldquo;To become a trusted name in modern real estate and property marketing.&rdquo;
                </blockquote>
                <p className="mt-4 text-xs sm:text-sm text-[#66615C] leading-relaxed">
                  To set the regional benchmark for how premier real estate is appraised, marketed, and transferred across Pakistan and for the global Pakistani diaspora.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          4. CORE VALUES
          ========================================================================= */}
      <section className="py-24 bg-[#141212] text-white border-b border-[#242222]">
        <Container size="xl">
          <SectionHeading
            align="center"
            theme="dark"
            kicker="The Principles That Guide Us"
            title="Our Values"
            subtitle="The fundamental standards embedded in every client conversation and transaction."
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Integrity',
                desc: 'Uncompromising honesty in all advice. If an investment carries title risks or structural flaws, we tell you immediately, even if it costs us a commission.',
                icon: ShieldCheck,
              },
              {
                title: 'Expertise',
                desc: 'Deep mastery of Karachi zoning laws, masterplan bylaws, structural construction, and micro-market pricing trends.',
                icon: Award,
              },
              {
                title: 'Transparency',
                desc: 'Open accounting, clear fee schedules, verified seller allotment documents, and no hidden third-party broker markups.',
                icon: Compass,
              },
              {
                title: 'Service',
                desc: 'Concierge-level attention. We handle private viewing access, authority NOCs, utility transfers, and tenant handovers end-to-end.',
                icon: Users,
              },
              {
                title: 'Innovation',
                desc: 'Continuous adoption of cinematic drone tech, virtual viewing portals, CRM analytics, and precision diaspora advertising.',
                icon: Lightbulb,
              },
              {
                title: 'Results',
                desc: 'A relentless commitment to achieving optimal financial outcomes for both our buyers and disposition clients.',
                icon: Target,
              },
            ].map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="p-8 bg-[#181616] border border-[#2B2828] hover:border-[#C9A96E]/50 rounded-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-sm bg-[#221F1F] text-[#C9A96E] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif-luxury text-xl font-medium text-white mb-2">
                    {val.title}
                  </h3>
                  <p className="text-xs text-[#948F89] leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          5. TEAM SECTION
          ========================================================================= */}
      <section id="team" className="py-24 bg-[#F7F5F1]">
        <Container size="xl">
          <SectionHeading
            align="center"
            theme="light"
            kicker="Leadership &amp; Advisors"
            title="The Ali Estate Team"
            subtitle="Meet the seasoned consultants and creative strategists dedicated to your property goals."
            className="mb-16"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="group bg-white border border-[#E9E7E3] hover:border-[#C9A96E] rounded-sm overflow-hidden flex flex-col transition-all shadow-xs hover:shadow-xl"
              >
                {/* Portrait with hover zoom & gold overlay */}
                <div className="relative aspect-[4/5] bg-[#181616] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="400px"
                    referrerPolicy="no-referrer"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Social links appearing on hover */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C9A96E]">
                      {member.department}
                    </span>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-black/60 hover:bg-[#C9A96E] hover:text-[#121010] rounded-sm transition-colors"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Profile info */}
                <div className="p-6 flex flex-col flex-1 justify-between bg-white">
                  <div>
                    <h3 className="font-serif-luxury text-2xl font-medium text-[#181616]">
                      {member.name}
                    </h3>
                    <p className="text-xs text-[#9C7737] font-medium mt-0.5 mb-3">
                      {member.role}
                    </p>
                    <p className="text-xs text-[#6B6661] leading-relaxed">
                      {member.bio}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#EAE7E2] space-y-1.5 text-xs text-[#524E4B]">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#C9A96E]" />
                      <span>{member.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#C9A96E]" />
                      <span className="truncate">{member.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <CTASection variant="seller" />
    </div>
  );
}

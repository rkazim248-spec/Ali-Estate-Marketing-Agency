import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  ArrowDown, 
  ShieldCheck, 
  Sparkles, 
  Building2, 
  CheckCircle2, 
  PhoneCall, 
  MessageCircle,
  Compass,
  Award,
  Layers,
  Search
} from 'lucide-react';

import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PropertyCard } from '@/components/property/PropertyCard';
import { PropertySearch } from '@/components/property/PropertySearch';
import { ServiceCard } from '@/components/service/ServiceCard';
import { ProjectCard } from '@/components/project/ProjectCard';
import { BlogCard } from '@/components/blog/BlogCard';
import { TestimonialCarousel } from '@/components/testimonial/TestimonialCarousel';
import { StatsCounter } from '@/components/stats/StatsCounter';
import { CTASection } from '@/components/cta/CTASection';

import { getFeaturedProperties } from '@/lib/properties';
import { REAL_ESTATE_SERVICES, MARKETING_SERVICES } from '@/lib/services';
import { PROJECTS } from '@/lib/projects';
import { BLOG_POSTS } from '@/lib/blog';
import { siteConfig } from '@/lib/site-config';

export default function HomePage() {
  const featuredProperties = getFeaturedProperties().slice(0, 3);
  const featuredProjects = PROJECTS.slice(0, 3);
  const recentArticles = BLOG_POSTS.slice(0, 3);

  return (
    <div className="flex flex-col w-full">
      {/* =========================================================================
          1. CINEMATIC HERO SECTION
          ========================================================================= */}
      <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 bg-[#111111] overflow-hidden">
        {/* Cinematic Backdrop Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=90"
            alt="Luxury architectural villa in Karachi"
            fill
            priority
            referrerPolicy="no-referrer"
            className="object-cover object-center scale-105 transition-transform duration-10000"
          />
          {/* Multi-stage dark gradient overlays for luxury contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/75 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/90 via-[#111111]/60 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 my-auto">
          <Container size="xl">
            <div className="max-w-3xl">
              {/* Kicker label */}
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-[#1A1818]/80 border border-[#C9A96E]/40 backdrop-blur-sm rounded-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-[#C9A96E]">
                  Real Estate &bull; Property &bull; Marketing
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-normal text-white leading-[1.08] tracking-tight">
                Where Exceptional Properties Meet{' '}
                <span className="italic text-[#C9A96E] font-normal block sm:inline">
                  Exceptional Marketing.
                </span>
              </h1>

              {/* Supporting Copy */}
              <p className="mt-6 text-sm sm:text-lg text-white/80 leading-relaxed font-light max-w-2xl">
                Ali Estate &amp; Marketing Agency combines deep local market expertise with strategic media production to help discerning clients discover, promote, buy, sell, and invest in extraordinary properties.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/properties"
                  className="px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-[#121010] bg-[#C9A96E] hover:bg-[#D8BC87] rounded-sm transition-all shadow-xl hover:shadow-[#C9A96E]/20"
                >
                  Explore Properties
                </Link>

                <Link
                  href="/list-property"
                  className="px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-white border border-white/30 hover:border-[#C9A96E] hover:text-[#C9A96E] bg-black/40 backdrop-blur-sm rounded-sm transition-all"
                >
                  List Your Property
                </Link>

                <a
                  href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3.5 text-xs font-medium text-white/80 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#C9A96E]" />
                  <span>Talk to an Agent</span>
                </a>
              </div>
            </div>
          </Container>
        </div>

        {/* Hero Search Panel & Scroll Indicator */}
        <div className="relative z-10 w-full mt-8">
          <Container size="xl">
            <PropertySearch isInlineHero={true} />

            {/* Scroll Indicator */}
            <div className="flex items-center justify-center gap-2 mt-6 text-[10px] uppercase tracking-[0.25em] text-white/50">
              <span>Scroll to Explore</span>
              <ArrowDown className="w-3 h-3 text-[#C9A96E] animate-bounce" />
            </div>
          </Container>
        </div>
      </section>

      {/* =========================================================================
          2. TRUST & STATISTICS SECTION
          ========================================================================= */}
      <section className="py-16 bg-[#111111] border-b border-[#242222]">
        <Container size="xl">
          <StatsCounter />
        </Container>
      </section>

      {/* =========================================================================
          3. FEATURED PROPERTIES SECTION
          ========================================================================= */}
      <section className="py-24 bg-[#F7F5F1]">
        <Container size="xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <SectionHeading
              align="left"
              theme="light"
              kicker="Exclusive Portfolio"
              title="Featured Properties"
              subtitle="Explore a curated selection of properties chosen for their location, architectural distinction, and enduring investment value."
            />

            <Link
              href="/properties"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#121010] hover:text-[#9C7737] transition-colors self-start md:self-end pb-2"
            >
              <span>View All Properties ({featuredProperties.length}+)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 3-Card Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((prop, idx) => (
              <PropertyCard key={prop.id} property={prop} priority={idx === 0} />
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          4. REAL ESTATE SERVICES
          ========================================================================= */}
      <section className="py-24 bg-white border-b border-[#EAE7E2]">
        <Container size="xl">
          <SectionHeading
            align="center"
            theme="light"
            kicker="Advisory &amp; Transactions"
            title="Real Estate Expertise"
            titleAccent="Tailored to High-Value Markets."
            subtitle="From confidential residential acquisitions to commercial leasing, our advisors safeguard your capital and maximize returns."
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REAL_ESTATE_SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} theme="light" />
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          5. MARKETING SERVICES (AGENCY DIVISION)
          ========================================================================= */}
      <section className="py-24 bg-[#141212] text-white">
        <Container size="xl">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
            <SectionHeading
              align="left"
              theme="dark"
              kicker="Media &amp; Campaigns"
              title="Marketing That Moves Property."
              titleAccent="Built for Modern Real Estate."
              subtitle="Traditional property listings get lost in noise. We deploy cinema-grade media, aerial drone cinematography, and hyper-targeted digital advertising to attract high-intent buyers."
            />

            <div className="flex flex-col sm:flex-row items-start lg:items-end gap-4">
              <Link
                href="/services/marketing"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-[#121010] bg-[#C9A96E] hover:bg-[#D8BC87] rounded-sm transition-all"
              >
                <span>Build Your Marketing Strategy</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MARKETING_SERVICES.slice(0, 4).map((service) => (
              <ServiceCard key={service.id} service={service} theme="dark" />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/services/marketing"
              className="text-xs text-[#C9A96E] hover:text-[#E2CD9F] tracking-wider uppercase font-semibold underline underline-offset-4"
            >
              Explore all 8 marketing capabilities, photography specs &amp; pricing packages &rarr;
            </Link>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          6. WHY CHOOSE US
          ========================================================================= */}
      <section className="py-24 bg-[#181616] border-y border-[#262424] text-white">
        <Container size="xl">
          <SectionHeading
            align="center"
            theme="dark"
            kicker="The Ali Estate Distinction"
            title="More Than Property."
            titleAccent="A Better Way to Move Forward."
            subtitle="Why institutional investors, prominent families, and leading builders rely on our integrated advisory."
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                num: '01',
                title: 'Local Market Knowledge',
                desc: 'Unmatched historical data and ground-level intelligence across Clifton, DHA phases, and Karachi’s coastal growth corridors.',
                icon: Compass,
              },
              {
                num: '02',
                title: 'Professional Property Marketing',
                desc: 'In-house production studio executing 4K video walkthroughs, drone flights, and editorial brochures.',
                icon: Sparkles,
              },
              {
                num: '03',
                title: 'Personalized Client Service',
                desc: 'Discrete, private one-on-one advisory tailored to high-net-worth families, expats, and corporate entities.',
                icon: Award,
              },
              {
                num: '04',
                title: 'Transparent Communication',
                desc: 'Zero hidden clauses. Every document, title history, and regulatory authority clearance is audited openly.',
                icon: ShieldCheck,
              },
              {
                num: '05',
                title: 'Investment-Focused Approach',
                desc: 'Quantitative modeling of rental yields, capital growth potential, and tax structuring for diaspora portfolios.',
                icon: Layers,
              },
              {
                num: '06',
                title: 'End-to-End Support',
                desc: 'From initial search and staging through to legal conveyancing, transfer letters, and physical possession handover.',
                icon: CheckCircle2,
              },
            ].map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={i}
                  className="p-8 bg-[#1F1C1C] border border-[#2E2B2B] hover:border-[#C9A96E]/50 rounded-sm transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif-luxury text-2xl font-light text-[#C9A96E]">
                      {benefit.num}
                    </span>
                    <Icon className="w-5 h-5 text-white/40 group-hover:text-[#C9A96E] transition-colors" />
                  </div>
                  <h3 className="font-serif-luxury text-xl font-medium text-white mb-2 group-hover:text-[#E2CD9F] transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-xs text-[#96918B] leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          7. FEATURED PROJECTS / DEVELOPMENTS
          ========================================================================= */}
      <section className="py-24 bg-[#F7F5F1]">
        <Container size="xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <SectionHeading
              align="left"
              theme="light"
              kicker="Developments &amp; Masterplans"
              title="Featured Projects"
              subtitle="Landmark towers, luxury gated enclaves, and Grade-A commercial centers in development."
            />

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#121010] hover:text-[#9C7737] transition-colors self-start md:self-end pb-2"
            >
              <span>Explore All Developments</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((proj) => (
              <ProjectCard key={proj.id} project={proj} />
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          8. HOW IT WORKS (FOUR-STEP PROCESS)
          ========================================================================= */}
      <section className="py-24 bg-white border-y border-[#EAE7E2]">
        <Container size="xl">
          <SectionHeading
            align="center"
            theme="light"
            kicker="Our Methodology"
            title="How It Works"
            subtitle="A transparent, four-phase path from initial brief to successful key handover."
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {[
              {
                step: '01',
                title: 'Tell Us What You Need',
                desc: 'Whether seeking an oceanfront penthouse or preparing to market a landmark estate, we begin with a deep discovery consultation.',
              },
              {
                step: '02',
                title: 'We Find the Opportunity',
                desc: 'We access off-market inventory, vet chain-of-title records, or design a custom media and marketing positioning strategy.',
              },
              {
                step: '03',
                title: 'We Market or Negotiate',
                desc: 'We execute high-impact campaigns or represent your purchase terms with experienced price defense and legal rigor.',
              },
              {
                step: '04',
                title: 'You Move Forward',
                desc: 'Seamless transfer at the relevant housing authority, verified settlement, and complete peace of mind.',
              },
            ].map((st, i) => (
              <div key={i} className="flex flex-col p-6 bg-[#FBF9F5] border border-[#EBE7E1] rounded-sm relative">
                <div className="font-serif-luxury text-3xl font-light text-[#9C7737] mb-3">
                  {st.step}
                </div>
                <h3 className="font-serif-luxury text-xl font-medium text-[#1A1818] mb-2">
                  {st.title}
                </h3>
                <p className="text-xs text-[#6B6661] leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          9. COMPANY STORY TEASER
          ========================================================================= */}
      <section className="py-24 bg-[#111111] text-white overflow-hidden">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative aspect-[4/3] rounded-sm overflow-hidden bg-[#181616] border border-[#2D2A2A]">
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85"
                alt="Executive interior architecture"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                referrerPolicy="no-referrer"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A96E]">
                  Established in Karachi
                </span>
                <p className="font-serif-luxury text-2xl text-white mt-1 italic">
                  &ldquo;Integrity is the only foundation that outlasts concrete.&rdquo;
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-5 h-[1px] bg-[#C9A96E]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C9A96E]">
                  About Our Agency
                </span>
              </div>

              <h2 className="font-serif-luxury text-3xl sm:text-5xl font-medium text-white leading-tight">
                Built Around Property.{' '}
                <span className="italic text-[#C9A96E] font-normal block">
                  Driven by Possibility.
                </span>
              </h2>

              <p className="text-sm text-[#A39E98] leading-relaxed">
                Founded with a singular vision, Ali Estate &amp; Marketing Agency bridges the gap between old-world real estate brokerage and modern digital marketing powerhouse.
              </p>

              <p className="text-sm text-[#A39E98] leading-relaxed">
                We believe that selling or purchasing a multi-million-rupee property is one of the most consequential decisions an individual or institution ever makes. It demands verified legal intelligence, uncompromising design aesthetics, and genuine fiduciary care.
              </p>

              <div className="pt-4 flex items-center gap-6">
                <Link
                  href="/about"
                  className="px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-[#121010] bg-[#C9A96E] hover:bg-[#D8BC87] rounded-sm transition-all shadow-md"
                >
                  Read Our Full Story
                </Link>
                <Link
                  href="/about#team"
                  className="text-xs font-semibold uppercase tracking-wider text-white hover:text-[#C9A96E] transition-colors"
                >
                  Meet the Team &rarr;
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          10. TESTIMONIALS
          ========================================================================= */}
      <section className="py-24 bg-[#141212] text-white border-t border-[#242222]">
        <Container size="xl">
          <SectionHeading
            align="center"
            theme="dark"
            kicker="Client Reputation"
            title="What Our Clients Say"
            subtitle="Hear from homeowners, overseas investors, and developers who have partnered with Ali Estate."
            className="mb-14"
          />

          <TestimonialCarousel />
        </Container>
      </section>

      {/* =========================================================================
          11. BLOG / INSIGHTS
          ========================================================================= */}
      <section className="py-24 bg-[#F7F5F1]">
        <Container size="xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <SectionHeading
              align="left"
              theme="light"
              kicker="Intelligence &amp; Guides"
              title="Latest Market Insights"
              subtitle="Editorial analysis, due diligence guides, and property marketing frameworks."
            />

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#121010] hover:text-[#9C7737] transition-colors self-start md:self-end pb-2"
            >
              <span>Explore All Insights</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentArticles.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          12. FINAL CALL TO ACTION
          ========================================================================= */}
      <CTASection variant="seller" />
    </div>
  );
}

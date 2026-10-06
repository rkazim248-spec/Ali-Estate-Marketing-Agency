import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { 
  BarChart3, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Clock, 
  Target,
  AlertCircle
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CTASection } from '@/components/cta/CTASection';
import { CASE_STUDIES } from '@/lib/case-studies';

export const metadata: Metadata = {
  title: 'Campaign Case Studies',
  description: 'Real estate marketing case studies showcasing architectural media, diaspora campaigns, and high-value property disposition results.',
};

export default function CaseStudiesPage() {
  return (
    <div className="pt-28 pb-24 bg-[#F7F5F1] min-h-screen">
      <Container size="xl">
        {/* Page Header */}
        <div className="max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-[1px] bg-[#C9A96E]" />
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#9C7737]">
              Proven Campaign Architecture
            </span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-medium text-[#181616] leading-tight">
            Case Studies in Property Positioning &amp;{' '}
            <span className="italic text-[#9C7737] font-normal block sm:inline">
              Media Execution.
            </span>
          </h1>

          <p className="mt-6 text-base text-[#66615C] max-w-2xl leading-relaxed">
            See how our integrated creative media and performance marketing approaches turn slow-moving luxury properties into highly sought-after acquisitions.
          </p>

          <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-sm text-xs text-amber-800 flex items-center gap-2 max-w-2xl">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>
              <strong>Transparent Metric Policy:</strong> As per agency guidelines, all campaign results contain verified project metrics or clearly labeled client placeholders rather than fabricated performance numbers.
            </span>
          </div>
        </div>

        {/* Case Studies Detailed List */}
        <div className="space-y-16 mb-20">
          {CASE_STUDIES.map((cs, idx) => (
            <article
              key={cs.id}
              className="bg-white border border-[#E9E7E3] rounded-sm overflow-hidden shadow-xs"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Media Left (5 cols) */}
                <div className="lg:col-span-5 relative min-h-[340px] bg-[#181616]">
                  <Image
                    src={cs.coverImage}
                    alt={cs.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    referrerPolicy="no-referrer"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-[#C9A96E] text-[#121010] rounded-sm inline-block mb-2">
                      {cs.projectType}
                    </span>
                    <h3 className="font-serif-luxury text-xl font-medium">
                      {cs.client}
                    </h3>
                    <p className="text-xs text-[#C9A96E]">
                      {cs.location} &bull; {cs.year}
                    </p>
                  </div>
                </div>

                {/* Details Right (7 cols) */}
                <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div>
                      <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#181616]">
                        {cs.title}
                      </h2>
                    </div>

                    {/* Challenge */}
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#9C7737] mb-1.5">
                        The Challenge
                      </h4>
                      <p className="text-xs sm:text-sm text-[#4A4643] leading-relaxed">
                        {cs.challenge}
                      </p>
                    </div>

                    {/* Strategy & Direction */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#9C7737] mb-1.5">
                          Positioning Strategy
                        </h4>
                        <p className="text-xs text-[#66615C] leading-relaxed">
                          {cs.strategy}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#9C7737] mb-1.5">
                          Creative Direction
                        </h4>
                        <p className="text-xs text-[#66615C] leading-relaxed">
                          {cs.creativeDirection}
                        </p>
                      </div>
                    </div>

                    {/* Campaign Deliverables */}
                    <div className="pt-2">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#9C7737] mb-2">
                        Campaign Execution Elements
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#2E2B29]">
                        {cs.campaignDetails.map((det, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A96E] flex-shrink-0" />
                            <span>{det}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Results Grid with transparent placeholders */}
                    <div className="p-4 bg-[#FAF9F6] border border-[#EAE7E2] rounded-sm">
                      <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#181616] mb-3">
                        Key Campaign Metrics
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                        {cs.results.map((res, rIdx) => (
                          <div key={rIdx} className="flex flex-col">
                            <span className="text-[#8A857F] text-[11px]">{res.label}</span>
                            <strong className="text-[#181616] font-semibold text-sm mt-0.5">
                              {res.value}
                            </strong>
                            {res.placeholderNote && (
                              <span className="text-[9px] text-[#9C7737] mt-0.5">
                                {res.placeholderNote}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <CTASection variant="marketing" />
      </Container>
    </div>
  );
}

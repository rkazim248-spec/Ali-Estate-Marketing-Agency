import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectCard } from '@/components/project/ProjectCard';
import { CTASection } from '@/components/cta/CTASection';
import { PROJECTS } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Developments & Prime Projects',
  description: 'Explore landmark residential towers, gated villa enclaves, and Grade-A commercial developments in Karachi represented by Ali Estate.',
};

export default function ProjectsPage() {
  return (
    <div className="pt-28 pb-24 bg-[#F7F5F1] min-h-screen">
      <Container size="xl">
        {/* Page Heading */}
        <div className="mb-12">
          <SectionHeading
            align="left"
            theme="light"
            kicker="Developments &bull; Karachi"
            title="Landmark Projects &amp; Communities"
            subtitle="Explore high-profile residential towers, gated villa communities, and mixed-use commercial developments. Clearly marked sample content for representation."
          />
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {PROJECTS.map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>

        {/* Developer CTA */}
        <div className="bg-[#181616] border border-[#2D2A2A] p-8 sm:p-12 rounded-sm text-white mb-20">
          <div className="max-w-2xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C9A96E]">
              Developer &amp; Builder Partnerships
            </span>
            <h3 className="font-serif-luxury text-3xl font-medium text-white mt-2 mb-4">
              Launching a New Residential or Commercial Project?
            </h3>
            <p className="text-xs sm:text-sm text-[#9C9791] leading-relaxed mb-6">
              From project branding and 3D sales suites to diaspora investor pre-launches and verified sales execution, partner with Ali Estate &amp; Marketing Agency for maximum absorption rates.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-[#121010] bg-[#C9A96E] hover:bg-[#D8BC87] rounded-sm transition-all"
            >
              <span>Schedule Developer Briefing</span>
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}

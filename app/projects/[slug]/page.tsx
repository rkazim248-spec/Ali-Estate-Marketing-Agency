import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Layers, 
  Check, 
  ChevronRight, 
  Phone, 
  MessageSquare,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ContactForm } from '@/components/contact/ContactForm';
import { PROJECTS, getProjectBySlug } from '@/lib/projects';
import { siteConfig } from '@/lib/site-config';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: `${project.name} | ${project.location}`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-28 pb-24 bg-[#F7F5F1] min-h-screen">
      <Container size="xl">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-[#7A7570]">
          <Link href="/" className="hover:text-[#181616]">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/projects" className="hover:text-[#181616]">Projects</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#181616] font-medium">{project.name}</span>
        </nav>

        {/* Hero Card */}
        <div className="bg-white border border-[#E9E7E3] p-6 sm:p-10 rounded-sm mb-10 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#EAE7E2]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-[#121010] text-[#C9A96E] rounded-sm">
                  {project.status}
                </span>
                <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-[#F7F5F1] text-[#181616] border border-[#E2DDD5] rounded-sm">
                  Developer: {project.developer}
                </span>
              </div>

              <h1 className="font-serif-luxury text-3xl sm:text-5xl font-medium text-[#181616]">
                {project.name}
              </h1>

              <div className="flex items-center gap-1.5 text-xs text-[#736E6A] mt-2">
                <MapPin className="w-4 h-4 text-[#C9A96E]" />
                <span>{project.location}, {project.city}</span>
              </div>
            </div>

            <div className="flex flex-col md:items-end">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#9C7737]">
                Starting Price
              </span>
              <div className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#181616]">
                {project.startingPrice}
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 text-xs">
            <div>
              <span className="text-[#8A857F] block">Total Units</span>
              <strong className="text-[#181616] text-sm">{project.totalUnits}</strong>
            </div>
            <div>
              <span className="text-[#8A857F] block">Anticipated Completion</span>
              <strong className="text-[#181616] text-sm">{project.completionDate}</strong>
            </div>
            <div>
              <span className="text-[#8A857F] block">Unit Configurations</span>
              <strong className="text-[#181616] text-sm">{project.propertyTypes.join(', ')}</strong>
            </div>
            <div>
              <span className="text-[#8A857F] block">Project Status</span>
              <strong className="text-[#181616] text-sm">{project.status}</strong>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {project.galleryImages.map((img, idx) => (
            <div key={idx} className="relative aspect-[16/10] rounded-sm overflow-hidden bg-[#181616]">
              <Image
                src={img}
                alt={`${project.name} view ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                referrerPolicy="no-referrer"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Details & Registration Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white border border-[#E9E7E3] p-8 rounded-sm space-y-6">
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#181616]">
              {project.headline}
            </h2>

            <p className="text-sm text-[#4A4643] leading-relaxed">
              {project.description}
            </p>

            {project.overview.map((p, i) => (
              <p key={i} className="text-sm text-[#66615C] leading-relaxed">
                {p}
              </p>
            ))}

            <div className="pt-6 border-t border-[#EAE7E2]">
              <h3 className="font-serif-luxury text-xl font-medium text-[#181616] mb-4">
                Amenities &amp; Building Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {project.amenities.map((am, i) => (
                  <div key={i} className="flex items-center gap-2 text-[#2E2B29]">
                    <Check className="w-3.5 h-3.5 text-[#C9A96E] flex-shrink-0" />
                    <span>{am}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#181616] border border-[#2D2A2A] p-6 sm:p-8 rounded-sm text-white space-y-4">
            <div>
              <span className="text-[10px] uppercase font-semibold tracking-widest text-[#C9A96E]">
                Official Sales Registration
              </span>
              <h3 className="font-serif-luxury text-2xl font-medium text-white mt-1">
                Register for Availability
              </h3>
              <p className="text-xs text-[#8A857F] mt-1">
                Receive the complete architectural floor plan booklet, payment schedule, and priority unit allocation.
              </p>
            </div>

            <ContactForm defaultInterest="Buying" />
          </div>
        </div>
      </Container>
    </div>
  );
}

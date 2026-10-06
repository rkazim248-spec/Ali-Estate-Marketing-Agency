import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Building2, Calendar, ArrowRight } from 'lucide-react';
import { ProjectDevelopment } from '@/lib/projects';

interface ProjectCardProps {
  project: ProjectDevelopment;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group bg-white rounded-sm border border-[#E9E7E3] hover:border-[#C9A96E]/80 transition-all duration-300 flex flex-col h-full overflow-hidden hover:shadow-xl">
      {/* Cover Image with Status Overlay */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#181616]">
        <Image
          src={project.coverImage}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          referrerPolicy="no-referrer"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-[#121010]/90 text-[#C9A96E] border border-[#C9A96E]/40 rounded-sm">
            {project.status}
          </span>
          {project.isSampleContent && (
            <span className="px-2 py-0.5 text-[9px] font-medium tracking-wide bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-sm">
              Sample Project
            </span>
          )}
        </div>

        {/* Starting Price Overlay */}
        <div className="absolute bottom-3 left-3 text-white">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-[#C9A96E]">
            Starting From
          </div>
          <div className="font-serif-luxury text-2xl font-bold tracking-tight text-white drop-shadow-md">
            {project.startingPrice}
          </div>
        </div>
      </div>

      {/* Body Information */}
      <div className="p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Developer & Location */}
          <div className="flex items-center gap-1.5 text-xs text-[#7A7570] mb-1">
            <MapPin className="w-3.5 h-3.5 text-[#C9A96E] flex-shrink-0" />
            <span className="truncate">{project.location}, {project.city}</span>
          </div>

          <h3 className="font-serif-luxury text-2xl font-medium text-[#1A1818] group-hover:text-[#9C7737] transition-colors">
            <Link href={`/projects/${project.slug}`}>
              {project.name}
            </Link>
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-[#8A857F] mt-1 mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Developer: {project.developer}</span>
          </div>

          <p className="text-xs text-[#6B6B6B] line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          {/* Types tags */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.propertyTypes.map((typ, i) => (
              <span
                key={i}
                className="text-[10px] text-[#55504C] bg-[#F7F5F1] px-2 py-1 rounded-sm border border-[#EBE7E1]"
              >
                {typ}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-5 pt-4 border-t border-[#EAE7E2] flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-[#736E6A]">
            <Calendar className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span>Handover: {project.completionDate}</span>
          </div>

          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 font-semibold text-[#121010] group-hover:text-[#9C7737] transition-colors"
          >
            <span>View Project</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}

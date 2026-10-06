import React from 'react';
import Link from 'next/link';
import { 
  Home, 
  TrendingUp, 
  Key, 
  PieChart, 
  ShieldCheck, 
  FileCheck, 
  Camera, 
  Video, 
  Share2, 
  Target, 
  Sparkles, 
  Globe, 
  FileText, 
  Users, 
  ArrowRight 
} from 'lucide-react';
import { ServiceItem } from '@/lib/services';

const ICONS_MAP: Record<string, React.ElementType> = {
  Home,
  TrendingUp,
  Key,
  PieChart,
  ShieldCheck,
  FileCheck,
  Camera,
  Video,
  Share2,
  Target,
  Sparkles,
  Globe,
  FileText,
  Users,
};

interface ServiceCardProps {
  service: ServiceItem;
  theme?: 'dark' | 'light';
}

export function ServiceCard({ service, theme = 'light' }: ServiceCardProps) {
  const IconComponent = ICONS_MAP[service.iconName] || Home;
  const isDark = theme === 'dark';

  return (
    <div
      className={`group relative p-7 rounded-sm border transition-all duration-300 flex flex-col justify-between ${
        isDark
          ? 'bg-[#181616] border-[#2A2727] hover:border-[#C9A96E]/70 text-white hover:bg-[#1E1C1C]'
          : 'bg-white border-[#E9E7E3] hover:border-[#C9A96E]/70 text-[#181616] hover:shadow-lg'
      }`}
    >
      <div>
        {/* Top bar with icon and elegant number */}
        <div className="flex items-center justify-between mb-6">
          <div
            className={`w-12 h-12 rounded-sm flex items-center justify-center transition-colors ${
              isDark
                ? 'bg-[#221F1F] text-[#C9A96E] group-hover:bg-[#C9A96E] group-hover:text-[#121010]'
                : 'bg-[#F7F5F1] text-[#9C7737] group-hover:bg-[#C9A96E] group-hover:text-[#121010]'
            }`}
          >
            <IconComponent className="w-5 h-5 transition-transform group-hover:scale-110" />
          </div>

          <span className="font-serif-luxury text-2xl font-light text-[#C9A96E]/60 group-hover:text-[#C9A96E] transition-colors">
            {service.number}
          </span>
        </div>

        {/* Title */}
        <h3 className={`font-serif-luxury text-2xl font-medium mb-3 transition-colors ${
          isDark ? 'group-hover:text-[#C9A96E]' : 'group-hover:text-[#9C7737]'
        }`}>
          {service.title}
        </h3>

        {/* Description */}
        <p className={`text-xs leading-relaxed mb-6 ${
          isDark ? 'text-[#A39E98]' : 'text-[#66615C]'
        }`}>
          {service.shortDescription}
        </p>

        {/* Highlights */}
        <ul className="space-y-2 mb-6">
          {service.highlights.slice(0, 3).map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] mt-1.5 flex-shrink-0" />
              <span className={isDark ? 'text-[#C7C2BB]' : 'text-[#4A4643]'}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Link Action */}
      <div className="pt-4 border-t border-inherit">
        <Link
          href={service.category === 'marketing' ? '/services/marketing' : '/services/real-estate'}
          className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
            isDark ? 'text-[#C9A96E] hover:text-white' : 'text-[#181616] hover:text-[#9C7737]'
          }`}
        >
          <span>Learn More</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

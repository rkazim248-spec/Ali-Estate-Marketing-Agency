'use client';

import React from 'react';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';

interface InteractiveMapPreviewProps {
  latitude: number;
  longitude: number;
  address: string;
  locationName: string;
  zoom?: number;
  className?: string;
}

export function InteractiveMapPreview({
  latitude,
  longitude,
  address,
  locationName,
  className = '',
}: InteractiveMapPreviewProps) {
  // Google Maps external link for user convenience
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  return (
    <div
      className={`relative rounded-sm overflow-hidden border border-[#E9E7E3] bg-[#1A1818] text-white ${className}`}
    >
      {/* Visual Cartographic Architectural Graphic */}
      <div className="relative w-full h-72 sm:h-80 bg-neutral-900 flex items-center justify-center overflow-hidden">
        {/* Subtle grid and contour lines */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              'linear-gradient(#C9A96E 1px, transparent 1px), linear-gradient(to right, #C9A96E 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Concentric radar rings centered on location marker */}
        <div className="absolute w-64 h-64 rounded-full border border-[#C9A96E]/20 animate-pulse pointer-events-none" />
        <div className="absolute w-40 h-40 rounded-full border border-[#C9A96E]/30 pointer-events-none" />

        {/* Center Pin Marker */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-[#C9A96E] text-[#121010] flex items-center justify-center shadow-2xl ring-4 ring-white/20 animate-bounce">
              <MapPin className="w-6 h-6 fill-current text-[#121010]" />
            </div>
            <div className="w-4 h-1.5 bg-black/50 rounded-full blur-xs mx-auto mt-1" />
          </div>

          <div className="mt-3 px-3.5 py-1.5 bg-[#121010]/90 border border-[#C9A96E]/40 rounded-sm shadow-xl text-center">
            <span className="text-xs font-semibold text-white block">
              {locationName}
            </span>
            <span className="text-[10px] text-[#C9A96E] font-mono">
              {latitude.toFixed(4)}° N, {longitude.toFixed(4)}° E
            </span>
          </div>
        </div>

        {/* Top Right Action Button */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 right-4 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#121010]/85 hover:bg-black text-white text-xs font-medium border border-white/20 rounded-sm transition-colors shadow-lg"
        >
          <span>Open in Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#C9A96E]" />
        </a>

        {/* Bottom Bar Info */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-4 z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs text-white/90">
            <Navigation className="w-3.5 h-3.5 text-[#C9A96E] flex-shrink-0" />
            <span className="truncate">{address}</span>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-[#C9A96E]">
            Karachi Coastal &amp; Urban Belt
          </span>
        </div>
      </div>
    </div>
  );
}

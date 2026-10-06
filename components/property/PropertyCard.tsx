'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, BedDouble, Bath, Maximize2, MapPin, ArrowRight } from 'lucide-react';
import { Property } from '@/lib/properties';

interface PropertyCardProps {
  property: Property;
  priority?: boolean;
}

export function PropertyCard({ property, priority = false }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const saved = localStorage.getItem(`fav_${property.id}`);
        if (saved === 'true') {
          setIsFavorite(true);
        }
      } catch {
        // LocalStorage unavailable in iframe/restricted mode
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [property.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextState = !isFavorite;
    setIsFavorite(nextState);
    try {
      localStorage.setItem(`fav_${property.id}`, String(nextState));
    } catch {
      // ignore
    }
  };

  return (
    <article className="group bg-[#FFFFFF] rounded-sm border border-[#E9E7E3] hover:border-[#C9A96E]/80 transition-all duration-300 flex flex-col h-full overflow-hidden hover:shadow-xl hover:shadow-[#111111]/8">
      {/* Image Container with Badges */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#181616]">
        <Link href={`/properties/${property.slug}`} className="block w-full h-full">
          <Image
            src={property.images[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            referrerPolicy="no-referrer"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Gradient Scrim for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

        {/* Top Badges (Zero-pill discipline: clean subtle tags) */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-[#121010]/90 text-white border border-white/10 rounded-sm backdrop-blur-sm">
              {property.type}
            </span>
            {property.featured && (
              <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-[#C9A96E] text-[#121010] rounded-sm">
                Featured
              </span>
            )}
            {property.status === 'Rent' && (
              <span className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider bg-white/90 text-[#121010] rounded-sm">
                For Rent
              </span>
            )}
          </div>

          {/* Favorite Button */}
          <button
            type="button"
            onClick={toggleFavorite}
            className={`pointer-events-auto w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isFavorite
                ? 'bg-rose-600 text-white scale-110 shadow-md'
                : 'bg-[#121010]/80 text-white/90 hover:text-white hover:bg-black'
            }`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Price Tag pinned to bottom left of media */}
        <div className="absolute bottom-3 left-3 text-white">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-[#C9A96E]/90">
            {property.status === 'Rent' ? 'Rental Rate' : 'Asking Price'}
          </div>
          <div className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-md">
            {property.priceDisplay}
          </div>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-[#7A7570] mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#C9A96E] flex-shrink-0" />
            <span className="truncate">{property.location}, {property.city}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif-luxury text-xl font-medium text-[#1A1818] group-hover:text-[#9C7737] transition-colors line-clamp-1">
            <Link href={`/properties/${property.slug}`}>
              {property.title}
            </Link>
          </h3>

          <p className="mt-1.5 text-xs text-[#6B6B6B] line-clamp-2 leading-relaxed">
            {property.subtitle}
          </p>
        </div>

        {/* Bottom Meta & Action */}
        <div className="mt-5 pt-4 border-t border-[#EAE7E2]">
          {/* Specs: zero-pill inline clean typography */}
          <div className="flex items-center justify-between text-xs text-[#524E4B]">
            <div className="flex items-center gap-4">
              {property.bedrooms > 0 && (
                <div className="flex items-center gap-1.5" title={`${property.bedrooms} Bedrooms`}>
                  <BedDouble className="w-4 h-4 text-[#8A857F]" />
                  <span>{property.bedrooms} Beds</span>
                </div>
              )}
              {property.bathrooms > 0 && (
                <div className="flex items-center gap-1.5" title={`${property.bathrooms} Bathrooms`}>
                  <Bath className="w-4 h-4 text-[#8A857F]" />
                  <span>{property.bathrooms} Baths</span>
                </div>
              )}
              <div className="flex items-center gap-1.5" title="Covered Area">
                <Maximize2 className="w-3.5 h-3.5 text-[#8A857F]" />
                <span>{property.area.toLocaleString()} {property.areaUnit}</span>
              </div>
            </div>

            <Link
              href={`/properties/${property.slug}`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#1A1818] group-hover:text-[#9C7737] group-hover:translate-x-0.5 transition-all"
              aria-label={`View details for ${property.title}`}
            >
              <span>Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Building, DollarSign } from 'lucide-react';

interface PropertySearchProps {
  className?: string;
  initialValues?: {
    status?: string;
    type?: string;
    location?: string;
    priceRange?: string;
    bedrooms?: string;
  };
  onFilterChange?: (filters: {
    status: string;
    type: string;
    location: string;
    priceRange: string;
    bedrooms: string;
    searchQuery: string;
  }) => void;
  isInlineHero?: boolean;
}

export function PropertySearch({
  className = '',
  initialValues,
  onFilterChange,
  isInlineHero = false,
}: PropertySearchProps) {
  const router = useRouter();

  const [status, setStatus] = useState(initialValues?.status || 'Buy');
  const [type, setType] = useState(initialValues?.type || 'All');
  const [location, setLocation] = useState(initialValues?.location || 'All');
  const [priceRange, setPriceRange] = useState(initialValues?.priceRange || 'All');
  const [bedrooms, setBedrooms] = useState(initialValues?.bedrooms || 'All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (onFilterChange) {
      onFilterChange({
        status,
        type,
        location,
        priceRange,
        bedrooms,
        searchQuery,
      });
      return;
    }

    // Otherwise navigate to /properties with query params
    const params = new URLSearchParams();
    if (status && status !== 'All') params.set('status', status);
    if (type && type !== 'All') params.set('type', type);
    if (location && location !== 'All') params.set('location', location);
    if (priceRange && priceRange !== 'All') params.set('price', priceRange);
    if (bedrooms && bedrooms !== 'All') params.set('beds', bedrooms);
    if (searchQuery) params.set('q', searchQuery);

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div
      className={`bg-[#121010]/95 border border-[#C9A96E]/30 backdrop-blur-md rounded-sm p-4 sm:p-6 shadow-2xl ${className}`}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Top Segmented Tabs: Buy / Rent */}
        <div className="flex items-center gap-2 border-b border-[#2A2727] pb-3">
          {(['Buy', 'Rent'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setStatus(tab);
                if (onFilterChange) {
                  onFilterChange({
                    status: tab,
                    type,
                    location,
                    priceRange,
                    bedrooms,
                    searchQuery,
                  });
                }
              }}
              className={`px-4 py-1.5 text-xs font-semibold tracking-wider uppercase transition-all rounded-sm ${
                status === tab
                  ? 'bg-[#C9A96E] text-[#121010] shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}

          <span className="text-[11px] text-white/40 ml-auto hidden md:inline">
            Exclusive Karachi Estates &amp; Prime Developments
          </span>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {/* Property Type */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="search-prop-type" className="text-[10px] uppercase font-semibold tracking-widest text-[#C9A96E]">
              Property Type
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <select
                id="search-prop-type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-[#1C1A1A] text-white text-xs py-2.5 pl-9 pr-8 border border-[#333030] focus:border-[#C9A96E] rounded-sm appearance-none outline-none transition-colors"
              >
                <option value="All">All Types</option>
                <option value="Villa">Luxury Villa</option>
                <option value="Apartment">Apartment</option>
                <option value="Penthouse">Sky Penthouse</option>
                <option value="Commercial">Commercial Floor</option>
                <option value="Plot / Land">Plot / Land</option>
              </select>
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="search-prop-location" className="text-[10px] uppercase font-semibold tracking-widest text-[#C9A96E]">
              Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <select
                id="search-prop-location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-[#1C1A1A] text-white text-xs py-2.5 pl-9 pr-8 border border-[#333030] focus:border-[#C9A96E] rounded-sm appearance-none outline-none transition-colors"
              >
                <option value="All">All Locations</option>
                <option value="Clifton">Clifton (Blocks 2, 4, 5)</option>
                <option value="DHA Phase 8">DHA Phase 8</option>
                <option value="DHA Phase 6">DHA Phase 6</option>
                <option value="Emaar Oceanfront">Emaar Oceanfront</option>
                <option value="Bahria Town">Bahria Town Karachi</option>
                <option value="PECHS">PECHS / Main Shahrah-e-Faisal</option>
              </select>
            </div>
          </div>

          {/* Price Range */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="search-prop-price" className="text-[10px] uppercase font-semibold tracking-widest text-[#C9A96E]">
              Price Budget
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <select
                id="search-prop-price"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full bg-[#1C1A1A] text-white text-xs py-2.5 pl-9 pr-8 border border-[#333030] focus:border-[#C9A96E] rounded-sm appearance-none outline-none transition-colors"
              >
                <option value="All">Any Price</option>
                <option value="under-100m">Under PKR 100M</option>
                <option value="100m-200m">PKR 100M – 200M</option>
                <option value="above-200m">PKR 200M+</option>
              </select>
            </div>
          </div>

          {/* Bedrooms / Search Button */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="search-prop-beds" className="text-[10px] uppercase font-semibold tracking-widest text-[#C9A96E]">
              Bedrooms
            </label>
            <div className="flex gap-2">
              <select
                id="search-prop-beds"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-1/2 bg-[#1C1A1A] text-white text-xs py-2.5 px-3 border border-[#333030] focus:border-[#C9A96E] rounded-sm outline-none transition-colors"
              >
                <option value="All">Any</option>
                <option value="3">3+ Beds</option>
                <option value="4">4+ Beds</option>
                <option value="5">5+ Beds</option>
              </select>

              <button
                type="submit"
                className="w-1/2 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#C9A96E] hover:bg-[#D8BC87] text-[#121010] text-xs font-semibold uppercase tracking-wider rounded-sm transition-all shadow-md"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

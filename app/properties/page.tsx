'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Filter, 
  X, 
  LayoutGrid, 
  List, 
  RotateCcw, 
  SlidersHorizontal,
  Home
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PropertyCard } from '@/components/property/PropertyCard';
import { PROPERTIES, PropertyType, PropertyStatus } from '@/lib/properties';

function PropertiesContent() {
  const searchParams = useSearchParams();

  // Initial filter state from URL params
  const paramStatus = searchParams.get('status') || 'All';
  const paramType = searchParams.get('type') || 'All';
  const paramLocation = searchParams.get('location') || 'All';
  const paramPrice = searchParams.get('price') || 'All';
  const paramBeds = searchParams.get('beds') || 'All';
  const paramQuery = searchParams.get('q') || '';

  const [status, setStatus] = useState<string>(paramStatus);
  const [propertyType, setPropertyType] = useState<string>(paramType);
  const [location, setLocation] = useState<string>(paramLocation);
  const [priceRange, setPriceRange] = useState<string>(paramPrice);
  const [bedrooms, setBedrooms] = useState<string>(paramBeds);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState<string>(paramQuery);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const resetFilters = () => {
    setStatus('All');
    setPropertyType('All');
    setLocation('All');
    setPriceRange('All');
    setBedrooms('All');
    setSearchQuery('');
    setSortBy('featured');
  };

  // Filter & Sort Logic
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((prop) => {
      // Status (Buy / Rent)
      if (status !== 'All' && prop.status !== status) {
        return false;
      }

      // Property Type
      if (propertyType !== 'All' && prop.type !== propertyType) {
        return false;
      }

      // Location / Neighborhood
      if (location !== 'All') {
        const matchesNeighborhood = prop.neighborhood.toLowerCase().includes(location.toLowerCase());
        const matchesLocation = prop.location.toLowerCase().includes(location.toLowerCase());
        if (!matchesNeighborhood && !matchesLocation) {
          return false;
        }
      }

      // Bedrooms
      if (bedrooms !== 'All') {
        const numBeds = parseInt(bedrooms, 10);
        if (prop.bedrooms < numBeds) {
          return false;
        }
      }

      // Price Range
      if (priceRange !== 'All') {
        if (priceRange === 'under-100m' && prop.price > 100000000) return false;
        if (priceRange === '100m-200m' && (prop.price < 100000000 || prop.price > 200000000)) return false;
        if (priceRange === 'above-200m' && prop.price < 200000000) return false;
      }

      // Search text query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = prop.title.toLowerCase().includes(query);
        const matchesLoc = prop.location.toLowerCase().includes(query);
        const matchesDesc = prop.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLoc && !matchesDesc) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'newest') return new Date(b.dateListed).getTime() - new Date(a.dateListed).getTime();
      // default: featured first
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [status, propertyType, location, priceRange, bedrooms, searchQuery, sortBy]);

  return (
    <div className="pt-28 pb-24 bg-[#F7F5F1] min-h-screen">
      <Container size="xl">
        {/* Header */}
        <div className="mb-10">
          <SectionHeading
            align="left"
            theme="light"
            kicker="Property Search &bull; Karachi"
            title="Discover Exceptional Properties"
            subtitle="Browse verified luxury residences, penthouses, commercial headquarters, and prime development land across Karachi."
          />
        </div>

        {/* Mobile Filter Toggle Button & Search Bar */}
        <div className="lg:hidden mb-6 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search by title or neighborhood..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-white border border-[#E0DCD6] px-4 py-2.5 text-xs rounded-sm outline-none focus:border-[#C9A96E]"
            />
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#121010] text-white text-xs font-semibold uppercase tracking-wider rounded-sm"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#C9A96E]" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* =========================================================================
              LEFT FILTER SIDEBAR (Desktop)
              ========================================================================= */}
          <aside className="hidden lg:block lg:col-span-3 bg-white border border-[#E9E7E3] p-6 rounded-sm shadow-xs sticky top-28 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#EAE7E2]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#9C7737]" />
                <h3 className="font-serif-luxury text-lg font-medium text-[#181616]">
                  Filter Properties
                </h3>
              </div>
              <button
                type="button"
                onClick={resetFilters}
                className="text-[11px] font-semibold text-[#807B75] hover:text-[#181616] flex items-center gap-1 transition-colors"
                title="Reset all filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Keyword Search */}
            <div>
              <label htmlFor="desktop-filter-search" className="block text-[10px] uppercase font-semibold tracking-wider text-[#9C7737] mb-1.5">
                Search Keyword
              </label>
              <input
                id="desktop-filter-search"
                type="text"
                placeholder="e.g. Clifton, Ocean, Villa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-[#E0DCD6] text-xs py-2 px-3 rounded-sm outline-none focus:border-[#C9A96E]"
              />
            </div>

            {/* Status Tabs: All / Buy / Rent */}
            <div>
              <label className="block text-[10px] uppercase font-semibold tracking-wider text-[#9C7737] mb-1.5">
                Transaction Type
              </label>
              <div className="grid grid-cols-3 gap-1 p-1 bg-[#FAF9F6] border border-[#E0DCD6] rounded-sm">
                {(['All', 'Buy', 'Rent'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatus(s)}
                    className={`py-1 text-xs font-semibold rounded-xs transition-colors ${
                      status === s
                        ? 'bg-[#181616] text-white shadow-xs'
                        : 'text-[#69645F] hover:text-[#181616]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Property Type */}
            <div>
              <label htmlFor="desktop-filter-type" className="block text-[10px] uppercase font-semibold tracking-wider text-[#9C7737] mb-1.5">
                Property Type
              </label>
              <select
                id="desktop-filter-type"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-[#E0DCD6] text-xs py-2 px-2.5 rounded-sm outline-none focus:border-[#C9A96E]"
              >
                <option value="All">All Types</option>
                <option value="Villa">Villa / House</option>
                <option value="Apartment">Luxury Apartment</option>
                <option value="Penthouse">Sky Penthouse</option>
                <option value="Commercial">Commercial Floor</option>
                <option value="Plot / Land">Plot / Land</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="desktop-filter-loc" className="block text-[10px] uppercase font-semibold tracking-wider text-[#9C7737] mb-1.5">
                Location / Enclave
              </label>
              <select
                id="desktop-filter-loc"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-[#E0DCD6] text-xs py-2 px-2.5 rounded-sm outline-none focus:border-[#C9A96E]"
              >
                <option value="All">All Locations</option>
                <option value="Clifton">Clifton (Blocks 2, 4, 5)</option>
                <option value="DHA Phase 8">DHA Phase 8</option>
                <option value="DHA Phase 6">DHA Phase 6</option>
                <option value="Emaar Oceanfront">Emaar Oceanfront</option>
                <option value="Bahria Town">Bahria Town Karachi</option>
                <option value="PECHS">PECHS / Shahrah-e-Faisal</option>
              </select>
            </div>

            {/* Price Budget */}
            <div>
              <label htmlFor="desktop-filter-price" className="block text-[10px] uppercase font-semibold tracking-wider text-[#9C7737] mb-1.5">
                Price Budget
              </label>
              <select
                id="desktop-filter-price"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-[#E0DCD6] text-xs py-2 px-2.5 rounded-sm outline-none focus:border-[#C9A96E]"
              >
                <option value="All">Any Price</option>
                <option value="under-100m">Under PKR 100 Million</option>
                <option value="100m-200m">PKR 100M – 200 Million</option>
                <option value="above-200m">PKR 200 Million+</option>
              </select>
            </div>

            {/* Bedrooms */}
            <div>
              <label htmlFor="desktop-filter-beds" className="block text-[10px] uppercase font-semibold tracking-wider text-[#9C7737] mb-1.5">
                Minimum Bedrooms
              </label>
              <select
                id="desktop-filter-beds"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-[#E0DCD6] text-xs py-2 px-2.5 rounded-sm outline-none focus:border-[#C9A96E]"
              >
                <option value="All">Any Bedrooms</option>
                <option value="3">3+ Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
                <option value="5">5+ Bedrooms</option>
              </select>
            </div>
          </aside>

          {/* =========================================================================
              RIGHT PROPERTY RESULTS (9 cols)
              ========================================================================= */}
          <main className="lg:col-span-9 space-y-6">
            {/* Top Toolbar: Results count & Sort by */}
            <div className="bg-white border border-[#E9E7E3] p-4 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-[#5C5752]">
                Showing{' '}
                <strong className="text-[#181616] font-semibold">
                  {filteredProperties.length}
                </strong>{' '}
                properties matching your criteria
              </div>

              <div className="flex items-center gap-4 self-end sm:self-auto">
                <div className="flex items-center gap-2">
                  <label htmlFor="sort-properties" className="text-xs text-[#7A7570] whitespace-nowrap">
                    Sort by:
                  </label>
                  <select
                    id="sort-properties"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-[#FAF9F6] border border-[#E0DCD6] text-xs py-1.5 px-2.5 rounded-sm outline-none"
                  >
                    <option value="featured">Featured First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest Listed</option>
                  </select>
                </div>

                {/* Grid / List toggle */}
                <div className="hidden sm:flex items-center border border-[#E0DCD6] rounded-sm p-0.5 bg-[#FAF9F6]">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-xs transition-colors ${
                      viewMode === 'grid' ? 'bg-white shadow-xs text-[#181616]' : 'text-[#85807A]'
                    }`}
                    aria-label="Grid view"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-xs transition-colors ${
                      viewMode === 'list' ? 'bg-white shadow-xs text-[#181616]' : 'text-[#85807A]'
                    }`}
                    aria-label="List view"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Properties Grid or Empty State */}
            {filteredProperties.length === 0 ? (
              <div className="bg-white border border-[#E9E7E3] rounded-sm p-12 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#F7F5F1] border border-[#E5E2DC] flex items-center justify-center text-[#9C7737]">
                  <Home className="w-7 h-7" />
                </div>
                <h3 className="font-serif-luxury text-2xl font-medium text-[#181616]">
                  No Properties Found
                </h3>
                <p className="text-xs text-[#7A7570] max-w-md leading-relaxed">
                  We could not find listings matching your active filters. Try clearing specific constraints or reach out to our desk for off-market inventory.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#121010] bg-[#C9A96E] hover:bg-[#D8BC87] rounded-sm transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'grid grid-cols-1 gap-6'
                }
              >
                {filteredProperties.map((prop, idx) => (
                  <PropertyCard key={prop.id} property={prop} priority={idx < 3} />
                ))}
              </div>
            )}
          </main>
        </div>

        {/* =========================================================================
            MOBILE FILTER BOTTOM SHEET / MODAL
            ========================================================================= */}
        {mobileFiltersOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile property search filters"
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs lg:hidden flex justify-end"
            onClick={() => setMobileFiltersOpen(false)}
          >
            <div
              className="w-full max-w-sm bg-white h-full p-6 overflow-y-auto flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#EAE7E2]">
                  <h3 className="font-serif-luxury text-xl font-medium text-[#181616]">
                    Filters
                  </h3>
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-1 text-[#78736E] hover:text-black"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-[10px] uppercase font-semibold tracking-wider text-[#9C7737] mb-1.5">
                    Buy / Rent
                  </label>
                  <div className="grid grid-cols-3 gap-1 p-1 bg-[#FAF9F6] border border-[#E0DCD6] rounded-sm">
                    {(['All', 'Buy', 'Rent'] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setStatus(s)}
                        className={`py-1 text-xs font-semibold rounded-xs transition-colors ${
                          status === s
                            ? 'bg-[#181616] text-white shadow-xs'
                            : 'text-[#69645F]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <label htmlFor="mobile-filter-type" className="block text-[10px] uppercase font-semibold tracking-wider text-[#9C7737] mb-1.5">
                    Property Type
                  </label>
                  <select
                    id="mobile-filter-type"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full bg-[#FAF9F6] border border-[#E0DCD6] text-xs py-2 px-2.5 rounded-sm"
                  >
                    <option value="All">All Types</option>
                    <option value="Villa">Villa / House</option>
                    <option value="Apartment">Luxury Apartment</option>
                    <option value="Penthouse">Sky Penthouse</option>
                    <option value="Commercial">Commercial Floor</option>
                    <option value="Plot / Land">Plot / Land</option>
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="mobile-filter-loc" className="block text-[10px] uppercase font-semibold tracking-wider text-[#9C7737] mb-1.5">
                    Location
                  </label>
                  <select
                    id="mobile-filter-loc"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-[#FAF9F6] border border-[#E0DCD6] text-xs py-2 px-2.5 rounded-sm"
                  >
                    <option value="All">All Locations</option>
                    <option value="Clifton">Clifton (Blocks 2, 4, 5)</option>
                    <option value="DHA Phase 8">DHA Phase 8</option>
                    <option value="DHA Phase 6">DHA Phase 6</option>
                    <option value="Emaar Oceanfront">Emaar Oceanfront</option>
                    <option value="Bahria Town">Bahria Town</option>
                    <option value="PECHS">PECHS</option>
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label htmlFor="mobile-filter-price" className="block text-[10px] uppercase font-semibold tracking-wider text-[#9C7737] mb-1.5">
                    Price Range
                  </label>
                  <select
                    id="mobile-filter-price"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full bg-[#FAF9F6] border border-[#E0DCD6] text-xs py-2 px-2.5 rounded-sm"
                  >
                    <option value="All">Any Price</option>
                    <option value="under-100m">Under PKR 100M</option>
                    <option value="100m-200m">PKR 100M – 200M</option>
                    <option value="above-200m">PKR 200M+</option>
                  </select>
                </div>

                {/* Bedrooms */}
                <div>
                  <label htmlFor="mobile-filter-beds" className="block text-[10px] uppercase font-semibold tracking-wider text-[#9C7737] mb-1.5">
                    Bedrooms
                  </label>
                  <select
                    id="mobile-filter-beds"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className="w-full bg-[#FAF9F6] border border-[#E0DCD6] text-xs py-2 px-2.5 rounded-sm"
                  >
                    <option value="All">Any Bedrooms</option>
                    <option value="3">3+ Bedrooms</option>
                    <option value="4">4+ Bedrooms</option>
                    <option value="5">5+ Bedrooms</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 border-t border-[#EAE7E2] flex gap-3">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="w-1/2 py-3 text-xs font-semibold uppercase tracking-wider text-[#181616] border border-[#D5D0C8] rounded-sm"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-1/2 py-3 text-xs font-semibold uppercase tracking-wider text-[#121010] bg-[#C9A96E] rounded-sm"
                >
                  Apply ({filteredProperties.length})
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-sm">Loading properties portfolio...</div>}>
      <PropertiesContent />
    </Suspense>
  );
}

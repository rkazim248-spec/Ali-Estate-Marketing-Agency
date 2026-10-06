'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Filter, 
  X, 
  LayoutGrid, 
  List, 
  RotateCcw, 
  SlidersHorizontal,
  Home,
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  ArrowRight,
  Heart,
  Search,
  Check,
  ChevronDown,
  Sparkles,
  Phone,
  MessageSquare
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PropertyCard } from '@/components/property/PropertyCard';
import { Property, PropertyType, PropertyStatus } from '@/lib/properties';
import { useProperties } from '@/lib/property-store';

const LOCATIONS_LIST = [
  { id: 'All', name: 'All Enclaves' },
  { id: 'Clifton', name: 'Clifton (Blocks 2, 4, 5)' },
  { id: 'DHA Phase 8', name: 'DHA Phase 8' },
  { id: 'DHA Phase 6', name: 'DHA Phase 6' },
  { id: 'Emaar Oceanfront', name: 'Emaar Oceanfront' },
  { id: 'Bahria Town', name: 'Bahria Town Golf City' },
  { id: 'PECHS', name: 'PECHS / Shahrah-e-Faisal' },
];

const BED_OPTIONS = [
  { value: 'All', label: 'Any Beds' },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
  { value: '5', label: '5+' },
  { value: '6', label: '6+' },
];

const PRICE_PRESETS_BUY = [
  { id: 'all', label: 'All Budgets', min: 0, max: 400000000 },
  { id: 'under-100m', label: '< 10 Crore', min: 0, max: 100000000 },
  { id: '100m-200m', label: '10 – 20 Crore', min: 100000000, max: 200000000 },
  { id: 'above-200m', label: '20+ Crore', min: 200000000, max: 400000000 },
];

const PRICE_PRESETS_RENT = [
  { id: 'all', label: 'All Rates', min: 0, max: 3000000 },
  { id: 'under-500k', label: '< 5 Lakh/mo', min: 0, max: 500000 },
  { id: '500k-1m', label: '5 – 10 Lakh/mo', min: 500000, max: 1000000 },
  { id: 'above-1m', label: '10+ Lakh/mo', min: 1000000, max: 3000000 },
];

function PropertiesContent() {
  const { properties } = useProperties();
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL Initial values
  const initialStatus = searchParams.get('status') || 'All';
  const initialType = searchParams.get('type') || 'All';
  const initialLocation = searchParams.get('location') || 'All';
  const initialBeds = searchParams.get('beds') || 'All';
  const initialQuery = searchParams.get('q') || '';

  // Real-time State
  const [status, setStatus] = useState<string>(initialStatus);
  const [propertyType, setPropertyType] = useState<string>(initialType);
  const [selectedLocation, setSelectedLocation] = useState<string>(initialLocation);
  const [bedrooms, setBedrooms] = useState<string>(initialBeds);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [maxPrice, setMaxPrice] = useState<number>(status === 'Rent' ? 2500000 : 400000000);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string>('all');

  // Handle preset clicks with instant state transition
  const handlePricePreset = (presetId: string, min: number, max: number) => {
    setSelectedPreset(presetId);
    setMinPrice(min);
    setMaxPrice(max);
  };

  // Reset all filters in real time
  const handleResetFilters = () => {
    setStatus('All');
    setPropertyType('All');
    setSelectedLocation('All');
    setBedrooms('All');
    setSearchQuery('');
    setSelectedPreset('all');
    setMinPrice(0);
    setMaxPrice(status === 'Rent' ? 2500000 : 400000000);
    setSortBy('featured');
  };

  // Switch between Buy / Rent and adjust sensible price range
  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    setSelectedPreset('all');
    setMinPrice(0);
    if (newStatus === 'Rent') {
      setMaxPrice(2500000);
    } else {
      setMaxPrice(400000000);
    }
  };

  // Real-time Filter & Sort Logic
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // Status Filter (Buy / Rent)
      if (status !== 'All' && prop.status !== status) {
        return false;
      }

      // Property Type Filter
      if (propertyType !== 'All' && prop.type !== propertyType) {
        return false;
      }

      // Location Filter
      if (selectedLocation !== 'All') {
        const matchesNeighborhood = prop.neighborhood.toLowerCase().includes(selectedLocation.toLowerCase());
        const matchesLocation = prop.location.toLowerCase().includes(selectedLocation.toLowerCase());
        if (!matchesNeighborhood && !matchesLocation) {
          return false;
        }
      }

      // Bedrooms Filter
      if (bedrooms !== 'All') {
        const numBeds = parseInt(bedrooms, 10);
        if (prop.bedrooms < numBeds) {
          return false;
        }
      }

      // Price Filter (Min and Max)
      if (prop.price < minPrice || prop.price > maxPrice) {
        return false;
      }

      // Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = prop.title.toLowerCase().includes(q);
        const matchesSubtitle = prop.subtitle?.toLowerCase().includes(q);
        const matchesLoc = prop.location.toLowerCase().includes(q);
        const matchesDesc = prop.description.toLowerCase().includes(q);
        const matchesType = prop.type.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSubtitle && !matchesLoc && !matchesDesc && !matchesType) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'beds-high') return b.bedrooms - a.bedrooms;
      if (sortBy === 'newest') return new Date(b.dateListed).getTime() - new Date(a.dateListed).getTime();
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [
    properties,
    status,
    propertyType,
    selectedLocation,
    bedrooms,
    minPrice,
    maxPrice,
    searchQuery,
    sortBy,
  ]);

  // Formatter for price labels
  const formatPriceLabel = (val: number) => {
    if (status === 'Rent') {
      if (val >= 100000) return `PKR ${(val / 100000).toFixed(1)} Lakh/mo`;
      return `PKR ${val.toLocaleString()}/mo`;
    }
    if (val >= 10000000) {
      return `PKR ${(val / 10000000).toFixed(1)} Crore`;
    }
    return `PKR ${val.toLocaleString()}`;
  };

  // Determine active filter badges count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (status !== 'All') count++;
    if (propertyType !== 'All') count++;
    if (selectedLocation !== 'All') count++;
    if (bedrooms !== 'All') count++;
    if (searchQuery.trim()) count++;
    if (selectedPreset !== 'all' || minPrice > 0) count++;
    return count;
  }, [status, propertyType, selectedLocation, bedrooms, searchQuery, selectedPreset, minPrice]);

  return (
    <div className="pt-28 pb-24 bg-[#F7F5F1] min-h-screen">
      <Container size="xl">
        {/* =========================================================================
            1. HEADER & SEARCH BAR
            ========================================================================= */}
        <div className="mb-8">
          <SectionHeading
            align="left"
            theme="light"
            kicker="Property Search &bull; Live Intelligence"
            title="Exceptional Properties Portfolio"
            subtitle="Filter by asking price, bedroom count, and prime Karachi enclaves with instant real-time results."
          />

          {/* Real-time search keyword input */}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 bg-white border border-[#E0DCD6] rounded-sm focus-within:border-[#C9A96E] focus-within:ring-1 focus-within:ring-[#C9A96E] transition-all shadow-xs">
              <Search className="w-4 h-4 text-[#8A857F] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by keywords: Penthouse, Clifton, Sea View, Villa, Swimming Pool..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm py-3 pl-10 pr-10 text-[#181616] outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Mobile Filter Sheet Trigger */}
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#181616] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-sm shadow-md"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#C9A96E]" />
              <span>Filters ({activeFiltersCount})</span>
            </button>
          </div>

          {/* Quick Enclave Shortcuts */}
          <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2 text-xs no-scrollbar">
            <span className="text-[11px] font-semibold text-[#807B75] uppercase tracking-wider mr-1 hidden sm:inline">
              Quick Locations:
            </span>
            {LOCATIONS_LIST.map((loc) => {
              const isSelected = selectedLocation === loc.id;
              return (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => setSelectedLocation(loc.id)}
                  className={`px-3 py-1.5 rounded-sm whitespace-nowrap text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-[#181616] text-[#C9A96E] shadow-xs'
                      : 'bg-white border border-[#E0DCD6] text-[#55504C] hover:border-[#C9A96E]/60'
                  }`}
                >
                  {loc.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            2. TWO-COLUMN INTERFACE: SIDEBAR FILTERS & RESULTS
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* =========================================================================
              LEFT FILTER SIDEBAR (DESKTOP)
              ========================================================================= */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 bg-white border border-[#E9E7E3] p-6 rounded-sm shadow-xs sticky top-28 space-y-6">
            {/* Header & Reset */}
            <div className="flex items-center justify-between pb-4 border-b border-[#EAE7E2]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#9C7737]" />
                <h3 className="font-serif-luxury text-lg font-medium text-[#181616]">
                  Refine Search
                </h3>
              </div>

              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-[11px] font-semibold text-[#807B75] hover:text-[#181616] flex items-center gap-1 transition-colors"
                  title="Clear all active filters"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset ({activeFiltersCount})</span>
                </button>
              )}
            </div>

            {/* 1. Transaction Mode (Buy / Rent) */}
            <div>
              <label className="block text-[10px] uppercase font-semibold tracking-wider text-[#9C7737] mb-2">
                Transaction Status
              </label>
              <div className="grid grid-cols-3 gap-1 p-1 bg-[#FAF9F6] border border-[#E0DCD6] rounded-sm">
                {(['All', 'Buy', 'Rent'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleStatusChange(s)}
                    className={`py-1.5 text-xs font-semibold rounded-xs transition-colors ${
                      status === s
                        ? 'bg-[#181616] text-[#C9A96E] shadow-xs'
                        : 'text-[#69645F] hover:text-[#181616]'
                    }`}
                  >
                    {s === 'All' ? 'All' : s === 'Buy' ? 'Buy' : 'Rent'}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Bedroom Count (Real-time Buttons) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] uppercase font-semibold tracking-wider text-[#9C7737]">
                  Bedrooms
                </label>
                <span className="text-[11px] text-[#807B75]">
                  {bedrooms === 'All' ? 'Any Bedrooms' : `${bedrooms}+ Bedrooms`}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {BED_OPTIONS.map((opt) => {
                  const isActive = bedrooms === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setBedrooms(opt.value)}
                      className={`py-2 px-1 text-xs font-medium rounded-sm transition-all text-center ${
                        isActive
                          ? 'bg-[#181616] text-[#C9A96E] font-semibold shadow-xs'
                          : 'bg-[#FAF9F6] border border-[#E0DCD6] text-[#55504C] hover:border-[#C9A96E]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Real-Time Price Filter (Slider & Presets) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[10px] uppercase font-semibold tracking-wider text-[#9C7737]">
                  Price Budget
                </label>
                <span className="text-[11px] font-semibold text-[#181616]">
                  {formatPriceLabel(maxPrice)}
                </span>
              </div>

              {/* Real-time Slider */}
              <div className="pt-2 pb-1">
                <input
                  type="range"
                  min={status === 'Rent' ? 100000 : 10000000}
                  max={status === 'Rent' ? 2500000 : 400000000}
                  step={status === 'Rent' ? 50000 : 5000000}
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(Number(e.target.value));
                    setSelectedPreset('custom');
                  }}
                  className="w-full accent-[#C9A96E] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#8C8781] mt-1">
                  <span>{status === 'Rent' ? '1 Lakh' : '1 Crore'}</span>
                  <span>{status === 'Rent' ? '25 Lakh' : '40+ Crore'}</span>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="grid grid-cols-2 gap-1.5 mt-3">
                {(status === 'Rent' ? PRICE_PRESETS_RENT : PRICE_PRESETS_BUY).map((preset) => {
                  const isActive = selectedPreset === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handlePricePreset(preset.id, preset.min, preset.max)}
                      className={`px-2 py-1.5 text-[11px] rounded-sm transition-colors text-center ${
                        isActive
                          ? 'bg-[#181616] text-[#C9A96E] font-semibold'
                          : 'bg-[#FAF9F6] border border-[#E0DCD6] text-[#69645F] hover:text-[#181616]'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Location Dropdown */}
            <div>
              <label htmlFor="sidebar-location-select" className="block text-[10px] uppercase font-semibold tracking-wider text-[#9C7737] mb-1.5">
                Location &bull; Karachi
              </label>
              <select
                id="sidebar-location-select"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-[#E0DCD6] text-xs py-2.5 px-3 rounded-sm outline-none focus:border-[#C9A96E]"
              >
                {LOCATIONS_LIST.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 5. Property Type Dropdown */}
            <div>
              <label htmlFor="sidebar-property-type-select" className="block text-[10px] uppercase font-semibold tracking-wider text-[#9C7737] mb-1.5">
                Property Category
              </label>
              <select
                id="sidebar-property-type-select"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-[#E0DCD6] text-xs py-2.5 px-3 rounded-sm outline-none focus:border-[#C9A96E]"
              >
                <option value="All">All Categories</option>
                <option value="Villa">Villa / House</option>
                <option value="Apartment">Luxury Apartment</option>
                <option value="Penthouse">Sky Penthouse</option>
                <option value="Commercial">Commercial Floor</option>
                <option value="Plot / Land">Residential / Commercial Plot</option>
              </select>
            </div>
          </aside>

          {/* =========================================================================
              RIGHT PROPERTY RESULTS (DESKTOP 8-9 COLS)
              ========================================================================= */}
          <main className="lg:col-span-8 xl:col-span-9 space-y-6">
            {/* Top Results Bar */}
            <div className="bg-white border border-[#E9E7E3] p-4 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
              <div>
                <div className="text-xs text-[#524E4B] flex items-center gap-1.5">
                  <span>Found</span>
                  <strong className="text-base font-serif-luxury font-bold text-[#181616]">
                    {filteredProperties.length}
                  </strong>
                  <span>properties matching your criteria</span>
                </div>
              </div>

              {/* Sort by & Layout Toggle */}
              <div className="flex items-center gap-3 self-end sm:self-auto">
                <div className="flex items-center gap-1.5 text-xs text-[#7A7570]">
                  <label htmlFor="sort-properties-select" className="whitespace-nowrap">
                    Sort:
                  </label>
                  <select
                    id="sort-properties-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-[#FAF9F6] border border-[#E0DCD6] text-xs py-1.5 px-2.5 rounded-sm outline-none"
                  >
                    <option value="featured">Featured First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="beds-high">Most Bedrooms</option>
                    <option value="newest">Newest Listed</option>
                  </select>
                </div>

                {/* Grid / List Switcher */}
                <div className="flex items-center border border-[#E0DCD6] rounded-sm p-0.5 bg-[#FAF9F6]">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-xs transition-colors ${
                      viewMode === 'grid' ? 'bg-white shadow-xs text-[#181616]' : 'text-[#85807A]'
                    }`}
                    aria-label="Grid layout"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-xs transition-colors ${
                      viewMode === 'list' ? 'bg-white shadow-xs text-[#181616]' : 'text-[#85807A]'
                    }`}
                    aria-label="List layout"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters Summary Bar */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-[#807B75] text-[11px] font-medium mr-1">
                  Active Filters:
                </span>

                {status !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#E0DCD6] rounded-sm text-[#181616]">
                    Status: {status}
                    <button type="button" onClick={() => setStatus('All')} className="hover:text-rose-500">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {propertyType !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#E0DCD6] rounded-sm text-[#181616]">
                    Type: {propertyType}
                    <button type="button" onClick={() => setPropertyType('All')} className="hover:text-rose-500">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {selectedLocation !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#E0DCD6] rounded-sm text-[#181616]">
                    Location: {selectedLocation}
                    <button type="button" onClick={() => setSelectedLocation('All')} className="hover:text-rose-500">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {bedrooms !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#E0DCD6] rounded-sm text-[#181616]">
                    Beds: {bedrooms}+
                    <button type="button" onClick={() => setBedrooms('All')} className="hover:text-rose-500">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {selectedPreset !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#E0DCD6] rounded-sm text-[#181616]">
                    Max: {formatPriceLabel(maxPrice)}
                    <button type="button" onClick={() => handlePricePreset('all', 0, 400000000)} className="hover:text-rose-500">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#E0DCD6] rounded-sm text-[#181616]">
                    Keyword: &ldquo;{searchQuery}&rdquo;
                    <button type="button" onClick={() => setSearchQuery('')} className="hover:text-rose-500">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-[11px] text-[#9C7737] hover:underline font-semibold ml-2"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* =========================================================================
                RESULTS LISTING (GRID OR DETAILED LIST)
                ========================================================================= */}
            {filteredProperties.length === 0 ? (
              <div className="bg-white border border-[#E9E7E3] rounded-sm p-12 text-center flex flex-col items-center justify-center space-y-4 shadow-xs">
                <div className="w-16 h-16 rounded-full bg-[#FAF9F6] border border-[#EAE7E2] flex items-center justify-center text-[#9C7737]">
                  <Home className="w-8 h-8" />
                </div>
                <h3 className="font-serif-luxury text-2xl font-medium text-[#181616]">
                  No Properties Match Your Active Filters
                </h3>
                <p className="text-xs text-[#7A7570] max-w-md leading-relaxed">
                  We could not locate properties matching your specific price ceiling, bedroom count, or location. Try broadening your criteria or reset your filters.
                </p>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#121010] bg-[#C9A96E] hover:bg-[#D8BC87] rounded-sm transition-all shadow-sm"
                  >
                    Reset All Filters
                  </button>
                  <Link
                    href="/contact"
                    className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#181616] border border-[#D5D0C8] hover:border-black rounded-sm transition-all"
                  >
                    Ask for Off-Market Listings
                  </Link>
                </div>
              </div>
            ) : viewMode === 'grid' ? (
              /* GRID VIEW */
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((prop, idx) => (
                  <PropertyCard key={prop.id} property={prop} priority={idx < 3} />
                ))}
              </div>
            ) : (
              /* DETAILED LIST VIEW */
              <div className="space-y-6">
                {filteredProperties.map((prop) => (
                  <article
                    key={prop.id}
                    className="group bg-white border border-[#E9E7E3] hover:border-[#C9A96E] rounded-sm overflow-hidden transition-all duration-300 shadow-xs hover:shadow-xl grid grid-cols-1 md:grid-cols-12"
                  >
                    {/* Media Column (5 cols) */}
                    <div className="md:col-span-5 relative min-h-[220px] bg-[#181616] overflow-hidden">
                      <Link href={`/properties/${prop.slug}`} className="block w-full h-full">
                        <Image
                          src={prop.images[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'}
                          alt={prop.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          referrerPolicy="no-referrer"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>

                      <div className="absolute top-3 left-3 flex gap-1.5">
                        <span className="px-2 py-0.5 text-[10px] font-semibold uppercase bg-black/80 text-white rounded-sm">
                          {prop.type}
                        </span>
                        {prop.featured && (
                          <span className="px-2 py-0.5 text-[10px] font-semibold uppercase bg-[#C9A96E] text-[#121010] rounded-sm">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content Column (7 cols) */}
                    <div className="md:col-span-7 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <div className="flex items-center gap-1.5 text-xs text-[#7A7570]">
                            <MapPin className="w-3.5 h-3.5 text-[#C9A96E]" />
                            <span>{prop.location}, {prop.city}</span>
                          </div>
                          <span className="font-serif-luxury text-xl font-bold text-[#181616]">
                            {prop.priceDisplay}
                          </span>
                        </div>

                        <h3 className="font-serif-luxury text-2xl font-medium text-[#181616] group-hover:text-[#9C7737] transition-colors mb-2">
                          <Link href={`/properties/${prop.slug}`}>
                            {prop.title}
                          </Link>
                        </h3>

                        <p className="text-xs text-[#6B6661] line-clamp-2 leading-relaxed mb-4">
                          {prop.description}
                        </p>

                        {/* Specs */}
                        <div className="flex items-center gap-4 text-xs text-[#524E4B] pb-4 border-b border-[#EAE7E2]">
                          {prop.bedrooms > 0 && (
                            <span className="flex items-center gap-1">
                              <BedDouble className="w-3.5 h-3.5 text-[#C9A96E]" />
                              {prop.bedrooms} Beds
                            </span>
                          )}
                          {prop.bathrooms > 0 && (
                            <span className="flex items-center gap-1">
                              <Bath className="w-3.5 h-3.5 text-[#C9A96E]" />
                              {prop.bathrooms} Baths
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Maximize2 className="w-3.5 h-3.5 text-[#C9A96E]" />
                            {prop.area.toLocaleString()} {prop.areaUnit}
                          </span>
                        </div>
                      </div>

                      <div className="pt-4 flex items-center justify-between">
                        <span className="text-[11px] text-[#8C8781]">
                          Consultant: <strong>{prop.agent.name}</strong>
                        </span>

                        <Link
                          href={`/properties/${prop.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#121010] group-hover:text-[#9C7737] transition-colors"
                        >
                          <span>Explore Residence</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </main>
        </div>

        {/* =========================================================================
            3. MOBILE FILTER MODAL (WITH LIVE PREVIEW COUNT)
            ========================================================================= */}
        {mobileFiltersOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Filter Properties"
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs lg:hidden flex justify-end"
            onClick={() => setMobileFiltersOpen(false)}
          >
            <div
              className="w-full max-w-sm bg-white h-full p-6 overflow-y-auto flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#EAE7E2]">
                  <h3 className="font-serif-luxury text-xl font-medium text-[#181616]">
                    Filter Properties
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
                        onClick={() => handleStatusChange(s)}
                        className={`py-1.5 text-xs font-semibold rounded-xs ${
                          status === s ? 'bg-[#181616] text-[#C9A96E]' : 'text-[#69645F]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="block text-[10px] uppercase font-semibold tracking-wider text-[#9C7737] mb-1.5">
                    Bedrooms
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {BED_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setBedrooms(opt.value)}
                        className={`py-2 text-xs rounded-sm font-medium ${
                          bedrooms === opt.value
                            ? 'bg-[#181616] text-[#C9A96E]'
                            : 'bg-[#FAF9F6] border border-[#E0DCD6] text-[#55504C]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Slider */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-[#9C7737] uppercase text-[10px]">
                      Price Ceiling
                    </span>
                    <span className="font-semibold text-[#181616]">
                      {formatPriceLabel(maxPrice)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={status === 'Rent' ? 100000 : 10000000}
                    max={status === 'Rent' ? 2500000 : 400000000}
                    step={status === 'Rent' ? 50000 : 5000000}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#C9A96E]"
                  />
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="mobile-location-select" className="block text-[10px] uppercase font-semibold tracking-wider text-[#9C7737] mb-1.5">
                    Location
                  </label>
                  <select
                    id="mobile-location-select"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full bg-[#FAF9F6] border border-[#E0DCD6] text-xs py-2 px-2.5 rounded-sm"
                  >
                    {LOCATIONS_LIST.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Property Type */}
                <div>
                  <label htmlFor="mobile-property-type-select" className="block text-[10px] uppercase font-semibold tracking-wider text-[#9C7737] mb-1.5">
                    Property Type
                  </label>
                  <select
                    id="mobile-property-type-select"
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
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 border-t border-[#EAE7E2] flex gap-3">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="w-1/3 py-3 text-xs font-semibold uppercase tracking-wider text-[#181616] border border-[#D5D0C8] rounded-sm"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-2/3 py-3 text-xs font-semibold uppercase tracking-wider text-[#121010] bg-[#C9A96E] rounded-sm font-bold shadow-md"
                >
                  Show {filteredProperties.length} Properties
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
    <Suspense fallback={<div className="pt-32 text-center text-sm">Loading properties search...</div>}>
      <PropertiesContent />
    </Suspense>
  );
}

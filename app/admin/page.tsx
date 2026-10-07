'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { 
  Building2, 
  Plus, 
  Search, 
  SlidersHorizontal, 
  Edit3, 
  Trash2, 
  Eye, 
  Star, 
  CheckCircle2, 
  X, 
  Save, 
  RotateCcw, 
  MessageSquare, 
  Phone, 
  Mail, 
  Calendar, 
  DollarSign, 
  ArrowUpRight,
  Shield,
  Layers,
  BedDouble,
  Bath,
  Home,
  Sparkles,
  Check
} from 'lucide-react';

import { BrandLogo } from '@/components/brand/BrandLogo';
import { Container } from '@/components/ui/Container';
import { Property, PropertyType, PropertyStatus, PROPERTIES as DEFAULT_PROPERTIES } from '@/lib/properties';
import { 
  getStoredProperties, 
  saveStoredProperties, 
  resetPropertiesToDefault,
  getStoredInquiries,
  saveStoredInquiries,
  AdminInquiry
} from '@/lib/property-store';
import { siteConfig } from '@/lib/site-config';

const AVAILABLE_AMENITIES = [
  'Swimming Pool',
  'Parking',
  'Security',
  'Backup Generator',
  'Elevator',
  'Garden',
  'Gym',
  'CCTV',
  'Air Conditioning',
  'Servant Quarter',
  'Balcony',
  'Terrace',
];

function AdminDashboardContent() {
  const searchParams = useSearchParams();
  const urlTab = searchParams.get('tab');
  const urlAction = searchParams.get('action');

  const [activeTab, setActiveTab] = useState<'properties' | 'inquiries' | 'settings' | 'ai'>(() => {
    if (urlTab === 'inquiries' || urlTab === 'settings' || urlTab === 'properties' || urlTab === 'ai') {
      return urlTab;
    }
    return 'properties';
  });
  const [properties, setProperties] = useState<Property[]>(() => getStoredProperties());
  const [inquiries, setInquiries] = useState<AdminInquiry[]>(() => getStoredInquiries());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [inquirySourceFilter, setInquirySourceFilter] = useState<'all' | 'ai_chat'>('all');
  const [notification, setNotification] = useState<string | null>(null);

  // Modal State for Add / Edit
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewProperty, setIsNewProperty] = useState(false);

  // Settings State
  const [settings, setSettings] = useState({
    phone: siteConfig.contact.phone,
    whatsappNumber: siteConfig.contact.whatsappNumber,
    email: siteConfig.contact.email,
    address: siteConfig.contact.address.displayFull,
  });

  // Listen for storage updates
  useEffect(() => {
    const handleUpdate = () => {
      setProperties(getStoredProperties());
      setInquiries(getStoredInquiries());
    };
    window.addEventListener('properties_updated', handleUpdate);
    window.addEventListener('inquiries_updated', handleUpdate);
    return () => {
      window.removeEventListener('properties_updated', handleUpdate);
      window.removeEventListener('inquiries_updated', handleUpdate);
    };
  }, []);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Filtered properties
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      if (statusFilter !== 'All' && p.status !== statusFilter) return false;
      if (typeFilter !== 'All' && p.type !== typeFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesLoc = p.location.toLowerCase().includes(q);
        if (!matchesTitle && !matchesLoc) return false;
      }
      return true;
    });
  }, [properties, statusFilter, typeFilter, searchQuery]);

  // Statistics calculation
  const stats = useMemo(() => {
    const total = properties.length;
    const forSale = properties.filter((p) => p.status === 'Buy').length;
    const forRent = properties.filter((p) => p.status === 'Rent').length;
    const featured = properties.filter((p) => p.featured).length;
    const totalValue = properties.reduce((acc, p) => acc + (p.price || 0), 0);
    const newInquiries = inquiries.filter((i) => i.status === 'New').length;

    return {
      total,
      forSale,
      forRent,
      featured,
      totalValuePKR: (totalValue / 10000000).toFixed(1) + ' Crore',
      newInquiries,
    };
  }, [properties, inquiries]);

  // Open Edit Modal
  const handleEdit = (prop: Property) => {
    setEditingProperty({ ...prop });
    setIsNewProperty(false);
    setIsModalOpen(true);
  };

  // Open Create Modal
  const handleAddNew = () => {
    const template: Property = {
      id: `prop-${Date.now()}`,
      slug: `new-listing-${Date.now()}`,
      title: 'New Luxury Residence',
      subtitle: 'Executive property in prime location',
      location: 'DHA Phase 8',
      neighborhood: 'DHA Phase 8',
      city: 'Karachi',
      country: 'Pakistan',
      price: 95000000,
      priceDisplay: 'PKR 95,000,000',
      type: 'Villa',
      status: 'Buy',
      bedrooms: 4,
      bathrooms: 5,
      area: 4500,
      areaUnit: 'Sq Ft',
      coveredArea: '4,500 Sq Ft',
      plotArea: '500 Sq Yds',
      parkingSpaces: 3,
      yearBuilt: 2025,
      featured: false,
      isExclusive: true,
      images: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
      ],
      description: 'Newly constructed contemporary residence with premium finishes.',
      longDescription: [
        'Designed to the highest architectural standards with expansive living rooms and private lawn.'
      ],
      features: ['Prime Corner Plot', 'Full Backup Generator', 'Imported Tiles'],
      amenities: ['Parking', 'Security', 'Backup Generator', 'CCTV', 'Air Conditioning'],
      coordinates: { lat: 24.8198, lng: 67.0315 },
      agent: {
        name: 'Ali Raza Khan',
        role: 'Principal Real Estate Consultant',
        phone: '+92 300 123 4567',
        email: 'ali.raza@ali-estate.agency',
        whatsapp: '923001234567',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
      },
      dateListed: new Date().toISOString().split('T')[0],
    };

    setEditingProperty(template);
    setIsNewProperty(true);
    setIsModalOpen(true);
  };

  // Save changes to property
  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProperty) return;

    // Generate priceDisplay if changed
    const formattedPrice =
      editingProperty.status === 'Rent'
        ? `PKR ${editingProperty.price.toLocaleString()} / mo`
        : `PKR ${editingProperty.price.toLocaleString()}`;

    const updatedProp = {
      ...editingProperty,
      priceDisplay: formattedPrice,
      slug: editingProperty.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '') || editingProperty.slug,
    };

    let updatedList: Property[];
    if (isNewProperty) {
      updatedList = [updatedProp, ...properties];
      showNotification(`Added new property "${updatedProp.title}"`);
    } else {
      updatedList = properties.map((p) => (p.id === updatedProp.id ? updatedProp : p));
      showNotification(`Updated property "${updatedProp.title}"`);
    }

    setProperties(updatedList);
    saveStoredProperties(updatedList);
    setIsModalOpen(false);
  };

  // Delete property
  const handleDeleteProperty = (id: string, title: string) => {
    if (confirm(`Are you sure you want to remove listing "${title}" from the website?`)) {
      const updated = properties.filter((p) => p.id !== id);
      setProperties(updated);
      saveStoredProperties(updated);
      showNotification(`Removed listing "${title}"`);
    }
  };

  // Toggle Featured status directly
  const handleToggleFeatured = (id: string) => {
    const updated = properties.map((p) => {
      if (p.id === id) {
        return { ...p, featured: !p.featured };
      }
      return p;
    });
    setProperties(updated);
    saveStoredProperties(updated);
    showNotification('Toggled featured status');
  };

  // Reset to default sample dataset
  const handleResetDefaults = () => {
    if (confirm('Reset all properties back to original agency catalog?')) {
      resetPropertiesToDefault();
      setProperties(DEFAULT_PROPERTIES);
      showNotification('Restored default property portfolio');
    }
  };

  // Inquiries status update
  const handleUpdateInquiryStatus = (id: string, newStatus: AdminInquiry['status']) => {
    const updated = inquiries.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq));
    setInquiries(updated);
    saveStoredInquiries(updated);
    showNotification(`Inquiry updated to "${newStatus}"`);
  };

  return (
    <div className="pt-28 pb-24 bg-[#0D0D0D] text-white min-h-screen">
      <Container size="xl">
        {/* Toast Notification */}
        {notification && (
          <div className="fixed top-24 right-6 z-50 bg-[#C9A96E] text-[#121010] px-4 py-3 rounded-sm text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{notification}</span>
          </div>
        )}

        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#242222] mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-[#C9A96E] text-[#121010] rounded-sm">
                Agency Control Center
              </span>
              <span className="text-xs text-white/50">
                Ali Estate &amp; Marketing Agency Management
              </span>
            </div>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-medium text-white">
              Property Administration &amp; Lead Portal
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white/80 hover:text-white border border-[#3A3636] hover:border-[#C9A96E] rounded-sm transition-colors"
            >
              <span>View Live Website</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#C9A96E]" />
            </Link>

            <button
              type="button"
              onClick={handleAddNew}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-[#121010] bg-[#C9A96E] hover:bg-[#D8BC87] rounded-sm transition-all shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Property</span>
            </button>
          </div>
        </div>

        {/* Dashboard Statistics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="p-4 bg-[#141212] border border-[#262424] rounded-sm">
            <span className="text-[10px] uppercase font-semibold tracking-wider text-[#C9A96E] block">
              Total Catalog
            </span>
            <div className="font-serif-luxury text-2xl font-bold text-white mt-1">
              {stats.total}
            </div>
            <span className="text-[10px] text-[#807B75]">Active properties</span>
          </div>

          <div className="p-4 bg-[#141212] border border-[#262424] rounded-sm">
            <span className="text-[10px] uppercase font-semibold tracking-wider text-[#C9A96E] block">
              For Sale
            </span>
            <div className="font-serif-luxury text-2xl font-bold text-white mt-1">
              {stats.forSale}
            </div>
            <span className="text-[10px] text-[#807B75]">Buy mandates</span>
          </div>

          <div className="p-4 bg-[#141212] border border-[#262424] rounded-sm">
            <span className="text-[10px] uppercase font-semibold tracking-wider text-[#C9A96E] block">
              For Lease
            </span>
            <div className="font-serif-luxury text-2xl font-bold text-white mt-1">
              {stats.forRent}
            </div>
            <span className="text-[10px] text-[#807B75]">Rental portfolios</span>
          </div>

          <div className="p-4 bg-[#141212] border border-[#262424] rounded-sm">
            <span className="text-[10px] uppercase font-semibold tracking-wider text-[#C9A96E] block">
              Featured
            </span>
            <div className="font-serif-luxury text-2xl font-bold text-[#E2CD9F] mt-1">
              {stats.featured}
            </div>
            <span className="text-[10px] text-[#807B75]">Homepage spotlight</span>
          </div>

          <div className="p-4 bg-[#141212] border border-[#262424] rounded-sm">
            <span className="text-[10px] uppercase font-semibold tracking-wider text-[#C9A96E] block">
              New Leads
            </span>
            <div className="font-serif-luxury text-2xl font-bold text-emerald-400 mt-1">
              {stats.newInquiries}
            </div>
            <span className="text-[10px] text-[#807B75]">Pending follow-up</span>
          </div>

          <div className="p-4 bg-[#141212] border border-[#262424] rounded-sm">
            <span className="text-[10px] uppercase font-semibold tracking-wider text-[#C9A96E] block">
              Catalog Value
            </span>
            <div className="font-serif-luxury text-xl font-bold text-white mt-1 truncate">
              {stats.totalValuePKR}
            </div>
            <span className="text-[10px] text-[#807B75]">Gross asking</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#242222] mb-8 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab('properties')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors ${
              activeTab === 'properties'
                ? 'bg-[#1C1A1A] text-[#C9A96E] border border-[#C9A96E]/50'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Properties Manager ({properties.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2 ${
              activeTab === 'inquiries'
                ? 'bg-[#1C1A1A] text-[#C9A96E] border border-[#C9A96E]/50'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <span>Inquiries &amp; Leads</span>
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-bold">
              {inquiries.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors ${
              activeTab === 'settings'
                ? 'bg-[#1C1A1A] text-[#C9A96E] border border-[#C9A96E]/50'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Agency Settings
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ai')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2 ${
              activeTab === 'ai'
                ? 'bg-[#1C1A1A] text-[#C9A96E] border border-[#C9A96E]/50'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span>AI Assistant &amp; Knowledge</span>
          </button>

          <button
            type="button"
            onClick={handleResetDefaults}
            className="ml-auto text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 p-2 rounded-sm"
            title="Reset to sample dataset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>
        </div>

        {/* =========================================================================
            TAB 1: PROPERTIES MANAGEMENT TABLE
            ========================================================================= */}
        {activeTab === 'properties' && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="bg-[#141212] border border-[#242222] p-4 rounded-sm flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-72">
                  <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by title or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#1C1A1A] text-white text-xs pl-9 pr-3 py-2 border border-[#333030] focus:border-[#C9A96E] rounded-sm outline-none"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-[#1C1A1A] text-white text-xs px-3 py-2 border border-[#333030] rounded-sm outline-none"
                >
                  <option value="All">All Status (Buy/Rent)</option>
                  <option value="Buy">For Sale (Buy)</option>
                  <option value="Rent">For Rent</option>
                </select>

                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="bg-[#1C1A1A] text-white text-xs px-3 py-2 border border-[#333030] rounded-sm outline-none hidden sm:block"
                >
                  <option value="All">All Types</option>
                  <option value="Villa">Villa</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Plot / Land">Plot / Land</option>
                </select>
              </div>

              <div className="text-xs text-[#807B75] self-end md:self-auto">
                Showing <strong>{filteredProperties.length}</strong> of {properties.length} listings
              </div>
            </div>

            {/* Properties Table */}
            <div className="bg-[#141212] border border-[#242222] rounded-sm overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#242222] text-[#807B75] uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-4">Property</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Status &amp; Type</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Specs</th>
                    <th className="py-3 px-4 text-center">Featured</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1F1D1D]">
                  {filteredProperties.map((prop) => (
                    <tr key={prop.id} className="hover:bg-[#1A1818] transition-colors">
                      {/* Thumbnail & Title */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-14 h-10 rounded-sm overflow-hidden bg-black flex-shrink-0 border border-[#333030]">
                            <Image
                              src={prop.images[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&q=80'}
                              alt={prop.title}
                              fill
                              sizes="80px"
                              referrerPolicy="no-referrer"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="font-serif-luxury text-base font-semibold text-white block hover:text-[#C9A96E]">
                              {prop.title}
                            </span>
                            <span className="text-[11px] text-[#7A7570] block line-clamp-1 max-w-xs">
                              {prop.subtitle}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Location */}
                      <td className="py-3.5 px-4 text-[#A8A39D]">
                        <span>{prop.location}</span>
                        <span className="block text-[10px] text-[#736E6A]">{prop.city}</span>
                      </td>

                      {/* Status & Type */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-col gap-1">
                          <span
                            className={`inline-block px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider rounded-sm w-fit ${
                              prop.status === 'Buy'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                            }`}
                          >
                            For {prop.status}
                          </span>
                          <span className="text-[11px] text-[#A8A39D]">{prop.type}</span>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-4 font-serif-luxury text-sm font-bold text-[#E2CD9F]">
                        {prop.priceDisplay}
                      </td>

                      {/* Specs */}
                      <td className="py-3.5 px-4 text-[#A8A39D] text-[11px]">
                        <div>{prop.bedrooms} Beds &bull; {prop.bathrooms} Baths</div>
                        <div className="text-[10px] text-[#736E6A]">
                          {prop.area.toLocaleString()} {prop.areaUnit}
                        </div>
                      </td>

                      {/* Featured Toggle */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleFeatured(prop.id)}
                          className={`p-1.5 rounded-sm transition-colors ${
                            prop.featured
                              ? 'text-[#C9A96E] hover:text-white'
                              : 'text-white/20 hover:text-white/60'
                          }`}
                          title={prop.featured ? 'Remove from Featured' : 'Mark as Featured'}
                        >
                          <Star className={`w-4 h-4 ${prop.featured ? 'fill-current' : ''}`} />
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <Link
                            href={`/properties/${prop.slug}`}
                            target="_blank"
                            className="p-1.5 bg-[#211F1F] hover:bg-[#2B2828] text-white/80 hover:text-white rounded-sm"
                            title="View Public Page"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleEdit(prop)}
                            className="p-1.5 bg-[#211F1F] hover:bg-[#C9A96E] hover:text-[#121010] text-[#C9A96E] rounded-sm transition-colors"
                            title="Edit Listing"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteProperty(prop.id, prop.title)}
                            className="p-1.5 bg-[#211F1F] hover:bg-rose-900/60 text-rose-400 rounded-sm transition-colors"
                            title="Delete Listing"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredProperties.length === 0 && (
                <div className="p-8 text-center text-xs text-[#736E6A]">
                  No properties matched your search parameters.
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: INQUIRIES & LEADS MANAGEMENT
            ========================================================================= */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="bg-[#141212] border border-[#242222] p-6 rounded-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="font-serif-luxury text-2xl font-medium text-white">
                    Client Viewing Requests &amp; Inquiries
                  </h2>
                  <p className="text-xs text-[#807B75] mt-1">
                    All inquiries submitted from property detail pages, contact forms, and the AI Assistant are logged here.
                  </p>
                </div>

                {/* Source Filter Switcher */}
                <div className="flex items-center gap-1.5 p-1 bg-[#1C1A1A] border border-[#2F2C2C] rounded-sm text-xs">
                  <button
                    type="button"
                    onClick={() => setInquirySourceFilter('all')}
                    className={`px-3 py-1 rounded-xs transition-colors ${
                      inquirySourceFilter === 'all'
                        ? 'bg-[#C9A96E] text-[#121010] font-bold'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    All ({inquiries.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setInquirySourceFilter('ai_chat')}
                    className={`px-3 py-1 rounded-xs flex items-center gap-1 transition-colors ${
                      inquirySourceFilter === 'ai_chat'
                        ? 'bg-[#C9A96E] text-[#121010] font-bold'
                        : 'text-[#C9A96E] hover:text-white'
                    }`}
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>AI Leads ({inquiries.filter((i) => i.source === 'ai_chat').length})</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {inquiries
                  .filter((inq) => inquirySourceFilter === 'all' || inq.source === 'ai_chat')
                  .map((inq) => (
                  <div
                    key={inq.id}
                    className="p-5 bg-[#181616] border border-[#262424] rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-serif-luxury text-lg font-semibold text-white">
                          {inq.name}
                        </span>

                        {inq.source === 'ai_chat' && (
                          <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-[#C9A96E]/20 text-[#C9A96E] border border-[#C9A96E]/40 rounded-sm flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5" />
                            Source: AI Assistant
                          </span>
                        )}

                        <span
                          className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded-sm ${
                            inq.status === 'New'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : inq.status === 'Contacted'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : inq.status === 'Viewing Booked'
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                              : 'bg-white/10 text-white/60'
                          }`}
                        >
                          {inq.status}
                        </span>
                        <span className="text-[10px] text-white/40">
                          {inq.dateReceived}
                        </span>
                      </div>

                      {inq.propertyTitle && (
                        <div className="text-xs text-[#C9A96E] font-medium">
                          Property: {inq.propertyTitle}
                        </div>
                      )}

                      {inq.preferredDate && (
                        <div className="text-[11px] text-[#A39E98]">
                          Requested Slot: {inq.preferredDate} ({inq.preferredTime})
                        </div>
                      )}

                      {inq.message && (
                        <p className="text-xs text-[#8A857F] max-w-xl">
                          &ldquo;{inq.message}&rdquo;
                        </p>
                      )}

                      <div className="flex items-center gap-4 text-xs text-[#A39E98] pt-1">
                        <a href={`tel:${inq.phone}`} className="flex items-center gap-1 hover:text-[#C9A96E]">
                          <Phone className="w-3 h-3 text-[#C9A96E]" />
                          <span>{inq.phone}</span>
                        </a>
                        <a href={`mailto:${inq.email}`} className="flex items-center gap-1 hover:text-[#C9A96E]">
                          <Mail className="w-3 h-3 text-[#C9A96E]" />
                          <span>{inq.email}</span>
                        </a>
                      </div>
                    </div>

                    {/* Actions on Lead */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 self-start md:self-center">
                      <select
                        value={inq.status}
                        onChange={(e) =>
                          handleUpdateInquiryStatus(inq.id, e.target.value as AdminInquiry['status'])
                        }
                        className="bg-[#211F1F] text-white text-xs px-2.5 py-1.5 border border-[#333030] rounded-sm outline-none"
                      >
                        <option value="New">Mark as New</option>
                        <option value="Contacted">Mark as Contacted</option>
                        <option value="Viewing Booked">Viewing Booked</option>
                        <option value="Closed">Closed / Transacted</option>
                      </select>

                      <a
                        href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `Hello ${inq.name}, this is Ali Estate & Marketing Agency regarding your inquiry for ${inq.propertyTitle || 'property consultation'}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-black text-xs font-semibold rounded-sm flex items-center gap-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp Lead</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: AGENCY SETTINGS & CONTACTS
            ========================================================================= */}
        {activeTab === 'settings' && (
          <div className="bg-[#141212] border border-[#242222] p-8 rounded-sm max-w-3xl space-y-6">
            <div>
              <h2 className="font-serif-luxury text-2xl font-medium text-white">
                Agency Contact &amp; Configuration Settings
              </h2>
              <p className="text-xs text-[#807B75] mt-1">
                Customize operational phone numbers, WhatsApp lines, and official address displayed on the public front.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#C9A96E] mb-1.5">
                  Office Telephone
                </label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full bg-[#1C1A1A] text-white text-xs py-2.5 px-3 border border-[#333030] rounded-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#C9A96E] mb-1.5">
                  WhatsApp Direct Number (digits only, e.g. 923001234567)
                </label>
                <input
                  type="text"
                  value={settings.whatsappNumber}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                  className="w-full bg-[#1C1A1A] text-white text-xs py-2.5 px-3 border border-[#333030] rounded-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#C9A96E] mb-1.5">
                  Primary Desk Email
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full bg-[#1C1A1A] text-white text-xs py-2.5 px-3 border border-[#333030] rounded-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#C9A96E] mb-1.5">
                  Clifton Headquarters Address
                </label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full bg-[#1C1A1A] text-white text-xs py-2.5 px-3 border border-[#333030] rounded-sm outline-none"
                />
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => showNotification('Agency settings updated successfully')}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-[#121010] bg-[#C9A96E] hover:bg-[#D8BC87] rounded-sm"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: AI ASSISTANT & KNOWLEDGE BASE MANAGEMENT
            ========================================================================= */}
        {activeTab === 'ai' && (
          <div className="space-y-6 max-w-4xl">
            <div className="bg-[#141212] border border-[#242222] p-6 rounded-sm">
              <div className="flex items-center justify-between pb-4 border-b border-[#242222] mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#C9A96E]" />
                    <h2 className="font-serif-luxury text-2xl font-medium text-white">
                      Ali Estate AI Property Assistant Control
                    </h2>
                  </div>
                  <p className="text-xs text-[#807B75] mt-1">
                    Manage AI model parameters, real-time knowledge base synchronization, and lead routing.
                  </p>
                </div>

                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Engine Online
                </span>
              </div>

              {/* Status Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-[#181616] border border-[#282525] rounded-sm">
                  <span className="text-[10px] uppercase font-semibold text-[#C9A96E] block">
                    AI Model Engine
                  </span>
                  <div className="font-mono text-xs text-white mt-1">gemini-3.8-flash</div>
                  <span className="text-[10px] text-emerald-400">Server-Side Verified</span>
                </div>

                <div className="p-4 bg-[#181616] border border-[#282525] rounded-sm">
                  <span className="text-[10px] uppercase font-semibold text-[#C9A96E] block">
                    Catalog Sync
                  </span>
                  <div className="font-mono text-xs text-white mt-1">{properties.length} Active Listings</div>
                  <span className="text-[10px] text-emerald-400">Live Synchronized</span>
                </div>

                <div className="p-4 bg-[#181616] border border-[#282525] rounded-sm">
                  <span className="text-[10px] uppercase font-semibold text-[#C9A96E] block">
                    AI Lead Capture
                  </span>
                  <div className="font-mono text-xs text-white mt-1">
                    {inquiries.filter((i) => i.source === 'ai_chat').length} Leads Captured
                  </div>
                  <span className="text-[10px] text-emerald-400">Direct CRM Pipeline</span>
                </div>
              </div>

              {/* Knowledge Architecture Overview */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C9A96E]">
                  Active Knowledge Base Architecture
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-[#1C1A1A] border border-[#2B2828] rounded-sm">
                    <strong className="text-white block">Agency Profile &amp; Dual Disciplines:</strong>
                    <span className="text-[11px] text-[#A39E98]">
                      Real Estate Brokerage + Digital Property Marketing (Cinematography, Photography, Social).
                    </span>
                  </div>
                  <div className="p-3 bg-[#1C1A1A] border border-[#2B2828] rounded-sm">
                    <strong className="text-white block">Published Karachi Enclaves:</strong>
                    <span className="text-[11px] text-[#A39E98]">
                      Clifton, DHA Phases 1-8, Emaar Oceanfront, Bahria Town Golf City, PECHS.
                    </span>
                  </div>
                  <div className="p-3 bg-[#1C1A1A] border border-[#2B2828] rounded-sm">
                    <strong className="text-white block">Anti-Hallucination Guardrails:</strong>
                    <span className="text-[11px] text-[#A39E98]">
                      Strict zero-fabrication of listings, prices, owner numbers, or investment guarantees.
                    </span>
                  </div>
                  <div className="p-3 bg-[#1C1A1A] border border-[#2B2828] rounded-sm">
                    <strong className="text-white block">Multilingual Support:</strong>
                    <span className="text-[11px] text-[#A39E98]">
                      Natural conversational fluency in English, Urdu, and Roman Urdu.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            PROPERTY ADD / EDIT MODAL
            ========================================================================= */}
        {isModalOpen && editingProperty && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Edit Property Listing"
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="bg-[#181616] border border-[#C9A96E]/50 w-full max-w-3xl rounded-sm p-6 sm:p-8 my-8 text-white max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#2B2828] mb-6">
                <div>
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-[#C9A96E]">
                    {isNewProperty ? 'New Listing Creation' : 'Modify Property Record'}
                  </span>
                  <h3 className="font-serif-luxury text-2xl font-medium text-white">
                    {isNewProperty ? 'Add Property to Catalog' : `Edit: ${editingProperty.title}`}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 text-white/60 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProperty} className="space-y-4 text-xs">
                {/* Title & Subtitle */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#C9A96E] mb-1">
                    Property Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProperty.title}
                    onChange={(e) => setEditingProperty({ ...editingProperty, title: e.target.value })}
                    className="w-full bg-[#201D1D] text-white py-2 px-3 border border-[#383434] focus:border-[#C9A96E] rounded-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#C9A96E] mb-1">
                    Subtitle / Short Tagline
                  </label>
                  <input
                    type="text"
                    value={editingProperty.subtitle}
                    onChange={(e) => setEditingProperty({ ...editingProperty, subtitle: e.target.value })}
                    className="w-full bg-[#201D1D] text-white py-2 px-3 border border-[#383434] focus:border-[#C9A96E] rounded-sm outline-none"
                  />
                </div>

                {/* Status, Type & Price */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#C9A96E] mb-1">
                      Status *
                    </label>
                    <select
                      value={editingProperty.status}
                      onChange={(e) => setEditingProperty({ ...editingProperty, status: e.target.value as PropertyStatus })}
                      className="w-full bg-[#201D1D] text-white py-2 px-3 border border-[#383434] focus:border-[#C9A96E] rounded-sm outline-none"
                    >
                      <option value="Buy">For Sale (Buy)</option>
                      <option value="Rent">For Lease (Rent)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#C9A96E] mb-1">
                      Property Type *
                    </label>
                    <select
                      value={editingProperty.type}
                      onChange={(e) => setEditingProperty({ ...editingProperty, type: e.target.value as PropertyType })}
                      className="w-full bg-[#201D1D] text-white py-2 px-3 border border-[#383434] focus:border-[#C9A96E] rounded-sm outline-none"
                    >
                      <option value="Villa">Villa / House</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Penthouse">Sky Penthouse</option>
                      <option value="Commercial">Commercial Floor</option>
                      <option value="Plot / Land">Plot / Land</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#C9A96E] mb-1">
                      Price in PKR *
                    </label>
                    <input
                      type="number"
                      required
                      value={editingProperty.price}
                      onChange={(e) => setEditingProperty({ ...editingProperty, price: Number(e.target.value) })}
                      className="w-full bg-[#201D1D] text-white py-2 px-3 border border-[#383434] focus:border-[#C9A96E] rounded-sm outline-none"
                    />
                  </div>
                </div>

                {/* Location & Neighborhood */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#C9A96E] mb-1">
                      Location / Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProperty.location}
                      onChange={(e) => setEditingProperty({ ...editingProperty, location: e.target.value })}
                      className="w-full bg-[#201D1D] text-white py-2 px-3 border border-[#383434] focus:border-[#C9A96E] rounded-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#C9A96E] mb-1">
                      Enclave / Neighborhood *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProperty.neighborhood}
                      onChange={(e) => setEditingProperty({ ...editingProperty, neighborhood: e.target.value })}
                      className="w-full bg-[#201D1D] text-white py-2 px-3 border border-[#383434] focus:border-[#C9A96E] rounded-sm outline-none"
                    />
                  </div>
                </div>

                {/* Bedrooms, Bathrooms, Area */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#C9A96E] mb-1">
                      Bedrooms
                    </label>
                    <input
                      type="number"
                      value={editingProperty.bedrooms}
                      onChange={(e) => setEditingProperty({ ...editingProperty, bedrooms: Number(e.target.value) })}
                      className="w-full bg-[#201D1D] text-white py-2 px-3 border border-[#383434] rounded-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#C9A96E] mb-1">
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      value={editingProperty.bathrooms}
                      onChange={(e) => setEditingProperty({ ...editingProperty, bathrooms: Number(e.target.value) })}
                      className="w-full bg-[#201D1D] text-white py-2 px-3 border border-[#383434] rounded-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#C9A96E] mb-1">
                      Area Size ({editingProperty.areaUnit})
                    </label>
                    <input
                      type="number"
                      value={editingProperty.area}
                      onChange={(e) => setEditingProperty({ ...editingProperty, area: Number(e.target.value) })}
                      className="w-full bg-[#201D1D] text-white py-2 px-3 border border-[#383434] rounded-sm outline-none"
                    />
                  </div>
                </div>

                {/* Primary Image URL */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#C9A96E] mb-1">
                    Primary Cover Photo URL
                  </label>
                  <input
                    type="url"
                    value={editingProperty.images[0] || ''}
                    onChange={(e) => {
                      const newImages = [...editingProperty.images];
                      newImages[0] = e.target.value;
                      setEditingProperty({ ...editingProperty, images: newImages });
                    }}
                    className="w-full bg-[#201D1D] text-white py-2 px-3 border border-[#383434] rounded-sm outline-none"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#C9A96E] mb-1">
                    Full Description
                  </label>
                  <textarea
                    rows={3}
                    value={editingProperty.description}
                    onChange={(e) => setEditingProperty({ ...editingProperty, description: e.target.value })}
                    className="w-full bg-[#201D1D] text-white py-2 px-3 border border-[#383434] rounded-sm outline-none resize-none"
                  />
                </div>

                {/* Amenities Checkboxes */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#C9A96E] mb-2">
                    Included Amenities &amp; Facilities
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {AVAILABLE_AMENITIES.map((amenity) => {
                      const isChecked = editingProperty.amenities.includes(amenity);
                      return (
                        <label
                          key={amenity}
                          className="flex items-center gap-2 text-white/80 cursor-pointer p-1.5 bg-[#201D1D] rounded-sm hover:bg-[#282525]"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              const newAmenities = e.target.checked
                                ? [...editingProperty.amenities, amenity]
                                : editingProperty.amenities.filter((a) => a !== amenity);
                              setEditingProperty({ ...editingProperty, amenities: newAmenities });
                            }}
                            className="rounded-xs accent-[#C9A96E]"
                          />
                          <span className="text-[11px]">{amenity}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Toggles: Featured & Exclusive */}
                <div className="flex items-center gap-6 pt-3 border-t border-[#2B2828]">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingProperty.featured}
                      onChange={(e) => setEditingProperty({ ...editingProperty, featured: e.target.checked })}
                      className="rounded-xs accent-[#C9A96E]"
                    />
                    <span className="font-semibold text-white">Feature on Homepage Spotlight</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingProperty.isExclusive}
                      onChange={(e) => setEditingProperty({ ...editingProperty, isExclusive: e.target.checked })}
                      className="rounded-xs accent-[#C9A96E]"
                    />
                    <span className="font-semibold text-white">Exclusive Mandate</span>
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-6 border-t border-[#2B2828]">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/70 hover:text-white border border-[#3D3A3A] rounded-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 text-xs font-semibold uppercase tracking-widest text-[#121010] bg-[#C9A96E] hover:bg-[#D8BC87] rounded-sm font-bold shadow-md flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Property</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center text-white text-xs">Loading Admin Control Center...</div>}>
      <AdminDashboardContent />
    </Suspense>
  );
}

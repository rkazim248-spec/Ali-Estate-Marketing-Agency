'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  UploadCloud, 
  ShieldCheck, 
  FileText, 
  TrendingUp, 
  Camera, 
  Users2, 
  Loader2 
} from 'lucide-react';

export function ListPropertyForm() {
  const [formData, setFormData] = useState({
    ownerName: '',
    phone: '',
    email: '',
    propertyType: 'Villa',
    location: '',
    bedrooms: '4',
    bathrooms: '4',
    area: '',
    areaUnit: 'Sq Yds',
    expectedPrice: '',
    description: '',
    contactPreference: 'WhatsApp',
  });

  const [filesSelected, setFilesSelected] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFakeFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const names = Array.from(e.target.files).map((f) => f.name);
      setFilesSelected((prev) => [...prev, ...names]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus('success');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      {/* Left Form Area (7 cols) */}
      <div className="lg:col-span-7 bg-[#181616] border border-[#2E2B2B] p-6 sm:p-8 rounded-sm text-white">
        {status === 'success' ? (
          <div className="py-12 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#C9A96E]/20 text-[#C9A96E] flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-serif-luxury text-3xl font-medium text-white">
              Listing Submitted for Review
            </h3>
            <p className="text-sm text-[#A39E98] max-w-md leading-relaxed">
              Our acquisitions and appraisal desk has received your property submission. A dedicated senior advisor will reach out via {formData.contactPreference} within 24 business hours to coordinate documentation and staging.
            </p>
            <button
              type="button"
              onClick={() => {
                setStatus('idle');
                setFilesSelected([]);
              }}
              className="mt-4 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-[#121010] bg-[#C9A96E] hover:bg-[#D8BC87] rounded-sm transition-all"
            >
              Submit Another Property
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <h2 className="font-serif-luxury text-2xl font-medium text-white">
                Property Submission Form
              </h2>
              <p className="text-xs text-[#8A857F] mt-1">
                Provide preliminary details about your property for confidential appraisal.
              </p>
            </div>

            {/* Owner Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label htmlFor="list-owner-name" className="block text-[11px] font-semibold uppercase tracking-wider text-[#C9A96E] mb-1.5">
                  Owner / Representative Name *
                </label>
                <input
                  id="list-owner-name"
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Tariq Hashmi"
                  className="w-full bg-[#1F1D1D] text-white text-xs py-2.5 px-3.5 border border-[#383434] focus:border-[#C9A96E] rounded-sm outline-none"
                />
              </div>

              <div>
                <label htmlFor="list-phone" className="block text-[11px] font-semibold uppercase tracking-wider text-[#C9A96E] mb-1.5">
                  Phone / WhatsApp Number *
                </label>
                <input
                  id="list-phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+92 300 1234567"
                  className="w-full bg-[#1F1D1D] text-white text-xs py-2.5 px-3.5 border border-[#383434] focus:border-[#C9A96E] rounded-sm outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="list-email" className="block text-[11px] font-semibold uppercase tracking-wider text-[#C9A96E] mb-1.5">
                  Email Address *
                </label>
                <input
                  id="list-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="tariq@domain.com"
                  className="w-full bg-[#1F1D1D] text-white text-xs py-2.5 px-3.5 border border-[#383434] focus:border-[#C9A96E] rounded-sm outline-none"
                />
              </div>

              <div>
                <label htmlFor="list-contact-pref" className="block text-[11px] font-semibold uppercase tracking-wider text-[#C9A96E] mb-1.5">
                  Preferred Contact Method
                </label>
                <select
                  id="list-contact-pref"
                  name="contactPreference"
                  value={formData.contactPreference}
                  onChange={handleChange}
                  className="w-full bg-[#1F1D1D] text-white text-xs py-2.5 px-3.5 border border-[#383434] focus:border-[#C9A96E] rounded-sm outline-none"
                >
                  <option value="WhatsApp">WhatsApp Message</option>
                  <option value="Phone Call">Direct Phone Call</option>
                  <option value="Email">Email Communication</option>
                </select>
              </div>
            </div>

            {/* Property Parameters */}
            <div className="pt-4 border-t border-[#2A2727]">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/90 mb-3">
                Property Specifications
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="list-prop-type" className="block text-[11px] font-semibold uppercase tracking-wider text-[#C9A96E] mb-1.5">
                    Property Type *
                  </label>
                  <select
                    id="list-prop-type"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full bg-[#1F1D1D] text-white text-xs py-2.5 px-3.5 border border-[#383434] focus:border-[#C9A96E] rounded-sm outline-none"
                  >
                    <option value="Villa">Luxury Villa / House</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Penthouse">Sky Penthouse</option>
                    <option value="Commercial">Commercial Floor / Building</option>
                    <option value="Plot / Land">Residential / Commercial Plot</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="list-location" className="block text-[11px] font-semibold uppercase tracking-wider text-[#C9A96E] mb-1.5">
                    Location &amp; Phase / Sector *
                  </label>
                  <input
                    id="list-location"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    placeholder="e.g. DHA Phase 8 Zone B or Clifton Block 4"
                    className="w-full bg-[#1F1D1D] text-white text-xs py-2.5 px-3.5 border border-[#383434] focus:border-[#C9A96E] rounded-sm outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-4">
                <div>
                  <label htmlFor="list-beds" className="block text-[11px] font-semibold uppercase tracking-wider text-[#C9A96E] mb-1.5">
                    Bedrooms
                  </label>
                  <select
                    id="list-beds"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    className="w-full bg-[#1F1D1D] text-white text-xs py-2.5 px-2 border border-[#383434] focus:border-[#C9A96E] rounded-sm outline-none"
                  >
                    <option value="0">N/A (Plot/Comm)</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6+">6+</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="list-baths" className="block text-[11px] font-semibold uppercase tracking-wider text-[#C9A96E] mb-1.5">
                    Bathrooms
                  </label>
                  <select
                    id="list-baths"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    className="w-full bg-[#1F1D1D] text-white text-xs py-2.5 px-2 border border-[#383434] focus:border-[#C9A96E] rounded-sm outline-none"
                  >
                    <option value="0">N/A</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6+">6+</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="list-area" className="block text-[11px] font-semibold uppercase tracking-wider text-[#C9A96E] mb-1.5">
                    Size / Area *
                  </label>
                  <div className="flex">
                    <input
                      id="list-area"
                      type="text"
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      required
                      placeholder="e.g. 500"
                      className="w-3/5 bg-[#1F1D1D] text-white text-xs py-2.5 px-2 border border-[#383434] focus:border-[#C9A96E] rounded-l-sm outline-none"
                    />
                    <select
                      aria-label="Area Unit"
                      name="areaUnit"
                      value={formData.areaUnit}
                      onChange={handleChange}
                      className="w-2/5 bg-[#262424] text-[#C9A96E] text-[11px] font-semibold py-2.5 px-1 border-y border-r border-[#383434] rounded-r-sm outline-none"
                    >
                      <option value="Sq Yds">Sq Yds</option>
                      <option value="Sq Ft">Sq Ft</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="list-expected-price" className="block text-[11px] font-semibold uppercase tracking-wider text-[#C9A96E] mb-1.5">
                  Expected Asking Price (PKR)
                </label>
                <input
                  id="list-expected-price"
                  type="text"
                  name="expectedPrice"
                  value={formData.expectedPrice}
                  onChange={handleChange}
                  placeholder="e.g. PKR 175,000,000 or Open for Valuation"
                  className="w-full bg-[#1F1D1D] text-white text-xs py-2.5 px-3.5 border border-[#383434] focus:border-[#C9A96E] rounded-sm outline-none"
                />
              </div>

              <div className="mt-4">
                <label htmlFor="list-description" className="block text-[11px] font-semibold uppercase tracking-wider text-[#C9A96E] mb-1.5">
                  Property Highlights &amp; Unique Details
                </label>
                <textarea
                  id="list-description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Special finishes, swimming pool, corner plot, generator, sea view, etc."
                  className="w-full bg-[#1F1D1D] text-white text-xs py-2.5 px-3.5 border border-[#383434] focus:border-[#C9A96E] rounded-sm outline-none resize-none"
                />
              </div>
            </div>

            {/* Document/Image Upload placeholder */}
            <div className="pt-2">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#C9A96E] mb-1.5">
                Upload Floorplans or Photos (Optional)
              </label>
              <label className="border-2 border-dashed border-[#383434] hover:border-[#C9A96E]/60 rounded-sm p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-[#1A1818]/60">
                <UploadCloud className="w-6 h-6 text-[#C9A96E] mb-2" />
                <span className="text-xs text-white/80">Click to attach photos or floorplan PDF</span>
                <span className="text-[10px] text-white/40 mt-1">PNG, JPG, PDF up to 25MB</span>
                <input
                  type="file"
                  multiple
                  onChange={handleFakeFileUpload}
                  className="hidden"
                />
              </label>

              {filesSelected.length > 0 && (
                <div className="mt-2 text-xs text-[#C9A96E]">
                  Attached ({filesSelected.length} files): {filesSelected.join(', ')}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full mt-4 flex items-center justify-center gap-2 py-3.5 px-6 text-xs font-semibold uppercase tracking-widest text-[#121010] bg-[#C9A96E] hover:bg-[#D8BC87] disabled:opacity-50 rounded-sm transition-all shadow-md"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting Details...</span>
                </>
              ) : (
                <span>Submit Property For Representation</span>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Right Side Advisory Roadmap Panel (5 cols) */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-[#181616] border border-[#C9A96E]/30 p-6 sm:p-8 rounded-sm text-white">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A96E] mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>The Ali Estate Standard</span>
          </div>

          <h3 className="font-serif-luxury text-2xl font-medium text-white mb-6">
            How We Maximize Your Property&apos;s Transaction Value
          </h3>

          <div className="space-y-6 text-xs">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#262424] text-[#C9A96E] flex items-center justify-center font-bold flex-shrink-0 border border-[#3A3636]">
                1
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">
                  Comprehensive Property Assessment
                </h4>
                <p className="text-[#96918B] mt-1 leading-relaxed">
                  We inspect structural parameters, evaluate title documentation, and establish a data-grounded comparative market valuation.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#262424] text-[#C9A96E] flex items-center justify-center font-bold flex-shrink-0 border border-[#3A3636]">
                2
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">
                  Professional Presentation &amp; Media
                </h4>
                <p className="text-[#96918B] mt-1 leading-relaxed">
                  Architectural photography, cinematic video walkthroughs, and curated brochures that showcase your residence at its absolute peak.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#262424] text-[#C9A96E] flex items-center justify-center font-bold flex-shrink-0 border border-[#3A3636]">
                3
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">
                  Omni-Channel Marketing Campaign
                </h4>
                <p className="text-[#96918B] mt-1 leading-relaxed">
                  Geo-targeted paid advertising reaching affluent domestic buyers and high-net-worth overseas Pakistani investors in the Gulf and UK.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#262424] text-[#C9A96E] flex items-center justify-center font-bold flex-shrink-0 border border-[#3A3636]">
                4
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">
                  Pre-Screened Qualified Inquiries
                </h4>
                <p className="text-[#96918B] mt-1 leading-relaxed">
                  We verify buyer purchasing capacity and intent prior to granting private tours, respecting your privacy and saving valuable time.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#262424] text-[#C9A96E] flex items-center justify-center font-bold flex-shrink-0 border border-[#3A3636]">
                5
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">
                  Negotiation &amp; Conveyancing Diligence
                </h4>
                <p className="text-[#96918B] mt-1 leading-relaxed">
                  Experienced contract defense, escrow monitoring, transfer letters scrutiny, and a seamless final legal closing.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Help Card */}
        <div className="bg-[#111111] border border-[#262424] p-6 rounded-sm text-xs text-[#99948F] flex items-center gap-4">
          <div className="w-10 h-10 rounded-sm bg-[#1E1C1C] border border-[#C9A96E]/30 flex items-center justify-center text-[#C9A96E] flex-shrink-0">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <span className="text-white font-medium block">
              Prefer to speak directly with an Acquisitions Advisor?
            </span>
            <span className="text-[11px] text-[#C9A96E]">
              Call our Clifton desk: +92 (21) 3587-0000
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

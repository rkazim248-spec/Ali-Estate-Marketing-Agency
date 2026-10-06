'use client';

import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, Loader2, Send } from 'lucide-react';

interface RequestViewingFormProps {
  propertyTitle: string;
  propertySlug: string;
}

export function RequestViewingForm({ propertyTitle }: RequestViewingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredDate: '',
    preferredTime: 'Morning (10:00 AM - 1:00 PM)',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <div className="p-6 bg-[#181616] border border-[#C9A96E]/50 rounded-sm text-center space-y-3 text-white">
        <div className="w-12 h-12 rounded-full bg-[#C9A96E]/20 text-[#C9A96E] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h4 className="font-serif-luxury text-xl font-medium">
          Private Viewing Requested
        </h4>
        <p className="text-xs text-[#A39E98] leading-relaxed">
          Our listing specialist will coordinate access for <strong>{propertyTitle}</strong> and confirm your appointment window via WhatsApp or phone.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="text-xs text-[#C9A96E] underline hover:text-[#E2CD9F] pt-2"
        >
          Edit or submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5 bg-[#181616] border border-[#2D2929] p-6 rounded-sm text-white">
      <div>
        <h3 className="font-serif-luxury text-xl font-medium text-white">
          Request Private Viewing
        </h3>
        <p className="text-xs text-[#8A857F] mt-1">
          Schedule an escorted inspection for {propertyTitle}
        </p>
      </div>

      <div>
        <label htmlFor="viewing-name" className="block text-[10px] uppercase font-semibold tracking-wider text-[#C9A96E] mb-1">
          Your Name *
        </label>
        <input
          id="viewing-name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="e.g. Bilal Farooq"
          className="w-full bg-[#1F1D1D] text-white text-xs py-2.5 px-3 border border-[#383434] focus:border-[#C9A96E] rounded-sm outline-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="viewing-phone" className="block text-[10px] uppercase font-semibold tracking-wider text-[#C9A96E] mb-1">
            Phone / WhatsApp *
          </label>
          <input
            id="viewing-phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+92 300 0000000"
            className="w-full bg-[#1F1D1D] text-white text-xs py-2.5 px-3 border border-[#383434] focus:border-[#C9A96E] rounded-sm outline-none"
          />
        </div>

        <div>
          <label htmlFor="viewing-email" className="block text-[10px] uppercase font-semibold tracking-wider text-[#C9A96E] mb-1">
            Email *
          </label>
          <input
            id="viewing-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="bilal@domain.com"
            className="w-full bg-[#1F1D1D] text-white text-xs py-2.5 px-3 border border-[#383434] focus:border-[#C9A96E] rounded-sm outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="viewing-date" className="block text-[10px] uppercase font-semibold tracking-wider text-[#C9A96E] mb-1">
            Preferred Date
          </label>
          <div className="relative">
            <input
              id="viewing-date"
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              className="w-full bg-[#1F1D1D] text-white text-xs py-2.5 px-3 border border-[#383434] focus:border-[#C9A96E] rounded-sm outline-none"
            />
          </div>
        </div>

        <div>
          <label htmlFor="viewing-time" className="block text-[10px] uppercase font-semibold tracking-wider text-[#C9A96E] mb-1">
            Preferred Time Slot
          </label>
          <select
            id="viewing-time"
            name="preferredTime"
            value={formData.preferredTime}
            onChange={handleChange}
            className="w-full bg-[#1F1D1D] text-white text-xs py-2.5 px-3 border border-[#383434] focus:border-[#C9A96E] rounded-sm outline-none"
          >
            <option value="Morning (10:00 AM - 1:00 PM)">Morning (10 AM – 1 PM)</option>
            <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1 PM – 4 PM)</option>
            <option value="Sunset (4:00 PM - 6:30 PM)">Sunset (4 PM – 6:30 PM)</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="viewing-message" className="block text-[10px] uppercase font-semibold tracking-wider text-[#C9A96E] mb-1">
          Notes or Special Questions
        </label>
        <textarea
          id="viewing-message"
          name="message"
          rows={2}
          value={formData.message}
          onChange={handleChange}
          placeholder="Any timing preferences or questions about the property..."
          className="w-full bg-[#1F1D1D] text-white text-xs py-2 px-3 border border-[#383434] focus:border-[#C9A96E] rounded-sm outline-none resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#121010] bg-[#C9A96E] hover:bg-[#D8BC87] disabled:opacity-50 rounded-sm transition-all shadow-md"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Scheduling...</span>
          </>
        ) : (
          <>
            <span>Request Private Viewing</span>
            <Send className="w-3.5 h-3.5" />
          </>
        )}
      </button>

      <p className="text-[10px] text-[#78736E] text-center">
        Private viewing requires advance verification of scheduling with property custodians.
      </p>
    </form>
  );
}

'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface ContactFormProps {
  defaultInterest?: string;
  className?: string;
}

export function ContactForm({
  defaultInterest = 'Buying',
  className = '',
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    interest: defaultInterest,
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    // Client-side validation
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required contact information.');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setStatus('error');
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    // Simulate API submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus('success');
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        interest: defaultInterest,
        message: '',
      });
    } catch {
      setStatus('error');
      setErrorMessage('An unexpected error occurred. Please try again or reach out directly via WhatsApp.');
    }
  };

  if (status === 'success') {
    return (
      <div className="p-8 bg-[#181616] border border-[#C9A96E]/50 rounded-sm text-center flex flex-col items-center justify-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-[#C9A96E]/20 text-[#C9A96E] flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h4 className="font-serif-luxury text-2xl text-white font-medium">
          Inquiry Successfully Received
        </h4>
        <p className="text-sm text-[#A39E98] max-w-md leading-relaxed">
          Thank you for reaching out to Ali Estate &amp; Marketing Agency. A senior property or marketing consultant will review your specifications and contact you shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#121010] bg-[#C9A96E] hover:bg-[#D8BC87] rounded-sm transition-all"
        >
          Send Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {status === 'error' && (
        <div className="p-3.5 bg-rose-950/40 border border-rose-500/40 rounded-sm text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Full Name */}
      <div>
        <label htmlFor="contact-full-name" className="block text-[11px] font-semibold uppercase tracking-wider text-[#C9A96E] mb-1.5">
          Full Name <span className="text-rose-400">*</span>
        </label>
        <input
          id="contact-full-name"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          placeholder="e.g. Asad Qureshi"
          className="w-full bg-[#1A1818] text-white text-xs py-3 px-3.5 border border-[#333030] focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] rounded-sm outline-none transition-colors"
        />
      </div>

      {/* Phone & Email Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-phone" className="block text-[11px] font-semibold uppercase tracking-wider text-[#C9A96E] mb-1.5">
            Phone / WhatsApp <span className="text-rose-400">*</span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+92 300 1234567"
            className="w-full bg-[#1A1818] text-white text-xs py-3 px-3.5 border border-[#333030] focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] rounded-sm outline-none transition-colors"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-[11px] font-semibold uppercase tracking-wider text-[#C9A96E] mb-1.5">
            Email Address <span className="text-rose-400">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="asad@example.com"
            className="w-full bg-[#1A1818] text-white text-xs py-3 px-3.5 border border-[#333030] focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] rounded-sm outline-none transition-colors"
          />
        </div>
      </div>

      {/* Interest Selector */}
      <div>
        <label htmlFor="contact-interest" className="block text-[11px] font-semibold uppercase tracking-wider text-[#C9A96E] mb-1.5">
          I&apos;m Interested In <span className="text-rose-400">*</span>
        </label>
        <select
          id="contact-interest"
          name="interest"
          value={formData.interest}
          onChange={handleChange}
          className="w-full bg-[#1A1818] text-white text-xs py-3 px-3.5 border border-[#333030] focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] rounded-sm outline-none transition-colors"
        >
          <option value="Buying">Buying Property (Residential / Commercial)</option>
          <option value="Selling">Selling an Exclusive Property</option>
          <option value="Renting">Renting / Corporate Leasing</option>
          <option value="Investment">Investment &amp; Portfolio Advisory</option>
          <option value="Property Management">Property Asset Management</option>
          <option value="Marketing Services">Property Marketing &amp; Media Agency</option>
          <option value="Other">Other Strategic Inquiries</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="block text-[11px] font-semibold uppercase tracking-wider text-[#C9A96E] mb-1.5">
          Your Message / Specific Requirements
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Share property preferences, budget parameters, or project requirements..."
          className="w-full bg-[#1A1818] text-white text-xs py-3 px-3.5 border border-[#333030] focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] rounded-sm outline-none transition-colors resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-[#121010] bg-[#C9A96E] hover:bg-[#D8BC87] active:bg-[#B38F4D] disabled:opacity-50 rounded-sm transition-all shadow-md"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Processing Inquiry...</span>
          </>
        ) : (
          <>
            <span>Send Inquiry</span>
            <Send className="w-3.5 h-3.5" />
          </>
        )}
      </button>

      <p className="text-[10px] text-[#736E6A] text-center">
        Your data is strictly confidential. We never share client records with unauthorized third parties.
      </p>
    </form>
  );
}

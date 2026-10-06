import React from 'react';
import type { Metadata } from 'next';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  Building2, 
  ShieldCheck 
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ContactForm } from '@/components/contact/ContactForm';
import { InteractiveMapPreview } from '@/components/map/InteractiveMapPreview';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Contact Us | Offices & Advisory Desk',
  description: "Let's talk property. Reach our Clifton executive offices for buying, selling, investing, corporate leasing, or marketing consultation.",
};

export default function ContactPage() {
  return (
    <div className="pt-28 pb-24 bg-[#111111] text-white min-h-screen">
      <Container size="xl">
        {/* Page Hero */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-[1px] bg-[#C9A96E]" />
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C9A96E]">
              Executive Advisory Desk
            </span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-medium text-white leading-tight">
            Let&apos;s Talk Property.
          </h1>

          <p className="mt-4 text-sm sm:text-base text-[#9C9791] leading-relaxed">
            Whether you&apos;re buying, selling, investing, renting, or looking for a marketing partner, our team is ready to help.
          </p>
        </div>

        {/* Two-Column Grid: Left Details & Right Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left Column: Office & Contact Info (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#181616] border border-[#2B2828] p-8 rounded-sm space-y-6">
              <h2 className="font-serif-luxury text-2xl font-medium text-white pb-4 border-b border-[#262424]">
                Office &amp; Contact Details
              </h2>

              {/* Physical Office Address */}
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#C9A96E] flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-white block font-medium mb-1">
                    Headquarters &bull; Clifton
                  </strong>
                  <p className="text-[#9E9A94] leading-relaxed">
                    {siteConfig.contact.address.street}
                    <br />
                    {siteConfig.contact.address.suite}, {siteConfig.contact.address.area}
                    <br />
                    {siteConfig.contact.address.city}, {siteConfig.contact.address.country}
                  </p>
                </div>
              </div>

              {/* Telephone */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-[#262424]">
                <Phone className="w-5 h-5 text-[#C9A96E] flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-white block font-medium mb-1">
                    Telephone
                  </strong>
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="text-[#9E9A94] hover:text-[#C9A96E] transition-colors"
                  >
                    {siteConfig.contact.phoneDisplay}
                  </a>
                </div>
              </div>

              {/* WhatsApp Direct Desk */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-[#262424]">
                <MessageCircle className="w-5 h-5 text-[#C9A96E] flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-white block font-medium mb-1">
                    WhatsApp Advisory Desk
                  </strong>
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9E9A94] hover:text-[#C9A96E] transition-colors"
                  >
                    {siteConfig.contact.whatsappDisplay} (Fast Response)
                  </a>
                </div>
              </div>

              {/* Email Addresses */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-[#262424]">
                <Mail className="w-5 h-5 text-[#C9A96E] flex-shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <strong className="text-white block font-medium mb-1">
                    Email Correspondence
                  </strong>
                  <p className="text-[#9E9A94]">
                    General: <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white">{siteConfig.contact.email}</a>
                  </p>
                  <p className="text-[#9E9A94]">
                    Inquiries: <a href={`mailto:${siteConfig.contact.inquiriesEmail}`} className="hover:text-white">{siteConfig.contact.inquiriesEmail}</a>
                  </p>
                  <p className="text-[#9E9A94]">
                    Marketing: <a href={`mailto:${siteConfig.contact.marketingEmail}`} className="hover:text-white">{siteConfig.contact.marketingEmail}</a>
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-[#262424]">
                <Clock className="w-5 h-5 text-[#C9A96E] flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-white block font-medium mb-1">
                    Business Hours
                  </strong>
                  <p className="text-[#9E9A94]">{siteConfig.contact.businessHours.weekdays}</p>
                  <p className="text-[#9E9A94]">{siteConfig.contact.businessHours.saturday}</p>
                  <p className="text-[#9E9A94] text-[11px] text-[#C9A96E]/80 mt-0.5">
                    {siteConfig.contact.businessHours.sunday}
                  </p>
                </div>
              </div>
            </div>

            {/* Map Preview */}
            <InteractiveMapPreview
              latitude={siteConfig.contact.coordinates.lat}
              longitude={siteConfig.contact.coordinates.lng}
              address={siteConfig.contact.address.displayFull}
              locationName="Ali Estate & Marketing Agency HQ"
            />
          </div>

          {/* Right Column: Interactive Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#181616] border border-[#2B2828] p-8 sm:p-10 rounded-sm">
            <div className="mb-6">
              <span className="text-[10px] uppercase font-semibold tracking-widest text-[#C9A96E]">
                Direct Inquiry Form
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-white mt-1">
                Send an Inquiry
              </h2>
              <p className="text-xs text-[#8E8984] mt-1">
                Please complete the form below. We typically respond within two business hours.
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </Container>
    </div>
  );
}

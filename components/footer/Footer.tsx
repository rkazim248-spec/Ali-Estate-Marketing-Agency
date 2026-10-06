import React from 'react';
import Link from 'next/link';
import { 
  Instagram, 
  Facebook, 
  Linkedin, 
  Youtube, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowUpRight 
} from 'lucide-react';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { siteConfig } from '@/lib/site-config';

export function Footer() {
  return (
    <footer className="bg-[#111111] text-white border-t border-[#262424] pt-16 pb-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header in Footer */}
        <div className="pb-12 border-b border-[#242222] flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-xl">
            <BrandLogo variant="dark" size="lg" />
            <p className="mt-4 font-serif-luxury text-xl sm:text-2xl text-[#C9A96E] italic font-normal">
              Property. Marketing. Possibilities.
            </p>
            <p className="mt-2 text-sm text-[#8E8A85] leading-relaxed">
              Bridging premier real estate consultancy with bespoke digital marketing to help property owners, investors, and developers navigate high-value markets with clarity.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link
              href="/list-property"
              className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#121010] bg-[#C9A96E] hover:bg-[#D8BC87] rounded-sm transition-all"
            >
              <span>List Your Property</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white border border-[#403B3B] hover:border-[#C9A96E] hover:text-[#C9A96E] rounded-sm transition-all"
            >
              <span>Schedule Advisory</span>
            </Link>
          </div>
        </div>

        {/* Multi-Column Nav Grid */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 border-b border-[#242222]">
          {/* Col 1: Real Estate */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A96E] mb-4">
              Real Estate
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A39E98]">
              <li>
                <Link href="/properties" className="hover:text-white transition-colors">
                  All Properties
                </Link>
              </li>
              <li>
                <Link href="/properties?status=Buy" className="hover:text-white transition-colors">
                  Buy Property
                </Link>
              </li>
              <li>
                <Link href="/properties?status=Rent" className="hover:text-white transition-colors">
                  Rent Property
                </Link>
              </li>
              <li>
                <Link href="/services/real-estate" className="hover:text-white transition-colors">
                  Investment Advisory
                </Link>
              </li>
              <li>
                <Link href="/services/real-estate" className="hover:text-white transition-colors">
                  Property Valuation
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  Developments &amp; Projects
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Marketing */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A96E] mb-4">
              Marketing Agency
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A39E98]">
              <li>
                <Link href="/services/marketing" className="hover:text-white transition-colors">
                  Marketing Services
                </Link>
              </li>
              <li>
                <Link href="/services/marketing#showcase" className="hover:text-white transition-colors">
                  Property Photography
                </Link>
              </li>
              <li>
                <Link href="/services/marketing#showcase" className="hover:text-white transition-colors">
                  Cinematic Drone &amp; Video
                </Link>
              </li>
              <li>
                <Link href="/services/marketing#pricing" className="hover:text-white transition-colors">
                  Marketing Packages
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-white transition-colors">
                  Campaign Case Studies
                </Link>
              </li>
              <li>
                <Link href="/services/marketing" className="hover:text-white transition-colors">
                  Lead Generation
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A96E] mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A39E98]">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Our Agency
                </Link>
              </li>
              <li>
                <Link href="/about#team" className="hover:text-white transition-colors">
                  Executive Team
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors">
                  Careers &amp; Partnerships
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact &amp; Offices
                </Link>
              </li>
              <li>
                <Link href="/list-property" className="hover:text-white transition-colors">
                  List Your Property
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-[#C9A96E] hover:underline transition-colors font-medium">
                  Agency Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Resources */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A96E] mb-4">
              Insights &amp; Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A39E98]">
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Real Estate Blog
                </Link>
              </li>
              <li>
                <Link href="/blog/how-to-choose-the-right-property-investment" className="hover:text-white transition-colors">
                  Investment Guides
                </Link>
              </li>
              <li>
                <Link href="/blog/5-things-to-check-before-buying-a-luxury-home" className="hover:text-white transition-colors">
                  Due Diligence Checklist
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact Desk (Full width on small screens) */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A96E] mb-4">
              Advisory Desk
            </h4>
            <div className="space-y-3 text-xs text-[#A39E98]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C9A96E] flex-shrink-0 mt-0.5" />
                <span>{siteConfig.contact.address.displayFull}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C9A96E] flex-shrink-0" />
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-white">
                  {siteConfig.contact.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C9A96E] flex-shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white">
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>

            {/* Social Channels */}
            <div className="mt-5 pt-4 border-t border-[#262424] flex items-center gap-3">
              <a
                href={siteConfig.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-sm bg-[#1A1818] border border-[#333030] flex items-center justify-center text-white/70 hover:text-[#C9A96E] hover:border-[#C9A96E] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-sm bg-[#1A1818] border border-[#333030] flex items-center justify-center text-white/70 hover:text-[#C9A96E] hover:border-[#C9A96E] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-sm bg-[#1A1818] border border-[#333030] flex items-center justify-center text-white/70 hover:text-[#C9A96E] hover:border-[#C9A96E] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-sm bg-[#1A1818] border border-[#333030] flex items-center justify-center text-white/70 hover:text-[#C9A96E] hover:border-[#C9A96E] transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#736E6A]">
          <p>
            &copy; 2026 {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
            <span>·</span>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, MessageSquare, ChevronRight } from 'lucide-react';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { siteConfig } from '@/lib/site-config';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Properties', href: '/properties' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const isHeroPage = pathname === '/' || pathname === '/about' || pathname === '/services/marketing';

  // When at top of a hero page, navbar can have dark gradient overlay, otherwise solid charcoal with backdrop blur
  const navBackground = isScrolled || !isHeroPage
    ? 'bg-[#121010]/95 backdrop-blur-md border-b border-[#C9A96E]/20 shadow-lg shadow-black/40 py-3.5'
    : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBackground}`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Brand Logo */}
            <div className="flex-shrink-0">
              <BrandLogo variant="dark" size="md" />
            </div>

            {/* Center Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-3 py-1.5 text-xs xl:text-sm font-medium tracking-wide transition-colors duration-200 ${
                      isActive
                        ? 'text-[#C9A96E]'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#C9A96E] transition-all"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-center gap-2 text-xs font-medium text-white/70 hover:text-[#C9A96E] transition-colors py-2 px-2"
                title={`Call ${siteConfig.contact.phoneDisplay}`}
              >
                <Phone className="w-3.5 h-3.5 text-[#C9A96E]" />
                <span className="hidden xl:inline">{siteConfig.contact.phoneDisplay}</span>
              </a>

              <Link
                href="/list-property"
                className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#121010] bg-[#C9A96E] hover:bg-[#D8BC87] active:bg-[#B28F50] rounded-sm transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-[#C9A96E]/20"
              >
                List Your Property
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                href="/list-property"
                className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#121010] bg-[#C9A96E] rounded-sm"
              >
                List
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-white/90 hover:text-[#C9A96E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-[#121010] border-l border-[#C9A96E]/20 p-6 flex flex-col justify-between overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#262424]">
                <BrandLogo variant="dark" size="sm" />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-white/70 hover:text-white"
                  aria-label="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col space-y-1" aria-label="Mobile Navigation">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`flex items-center justify-between px-3 py-3 text-sm font-medium tracking-wide rounded-sm transition-colors ${
                        isActive
                          ? 'text-[#C9A96E] bg-[#1E1C1C]'
                          : 'text-white/80 hover:text-white hover:bg-[#1A1818]'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#C9A96E]' : 'text-white/30'}`} />
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-[#262424] space-y-4">
              <Link
                href="/list-property"
                className="w-full flex items-center justify-center px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#121010] bg-[#C9A96E] hover:bg-[#D8BC87] rounded-sm text-center"
              >
                List Your Property
              </Link>

              <div className="flex flex-col gap-2 text-xs text-white/60">
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-center gap-2 hover:text-[#C9A96E]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C9A96E]" />
                  <span>{siteConfig.contact.phoneDisplay}</span>
                </a>
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#C9A96E]"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#C9A96E]" />
                  <span>Talk to an Agent on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

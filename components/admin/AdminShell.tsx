'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Building2, 
  LayoutDashboard, 
  Home, 
  Users, 
  UserCheck, 
  Calendar, 
  Clock, 
  FileText, 
  DollarSign, 
  BarChart3, 
  History, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Search, 
  Plus, 
  Star,
  Shield, 
  CheckCircle2, 
  Briefcase, 
  Layers, 
  HelpCircle,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { UserSession } from '@/lib/auth/server-auth';

interface AdminShellProps {
  session: UserSession | null;
  children: React.ReactNode;
}

export function AdminShell({ session, children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{ title: string; subtitle: string; href: string }>>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  // If on login page, render bare children without the admin dashboard frame
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    // If not on login page and not authenticated, redirect to login
    if (!isLoginPage && !session) {
      router.push('/admin/login');
    }
  }, [isLoginPage, session, router]);

  // Handle global search in admin
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    try {
      const res = await fetch(`/api/admin/search?q=${encodeURIComponent(query)}`);
      if (res.ok) {
        const data = await res.json();
        setSearchResults(data.results || []);
        setShowSearchDropdown(true);
      }
    } catch {
      // fallback
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // ignore
    }
    router.push('/admin/login');
    router.refresh();
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center text-white text-xs">
        Verifying secure brokerage session...
      </div>
    );
  }

  // Navigation Links with Role Permissions
  const userRole = session.role;
  const isSuperAdmin = userRole === 'SUPER_ADMIN';
  const isAdmin = userRole === 'SUPER_ADMIN' || userRole === 'ADMIN';
  const isBroker = isAdmin || userRole === 'BROKER';
  const isAgent = isBroker || userRole === 'AGENT';

  const NAV_SECTIONS = [
    {
      title: 'Overview',
      items: [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, show: true },
      ],
    },
    {
      title: 'Property CRM',
      items: [
        { name: 'All Properties', href: '/admin?tab=properties', icon: Home, show: isAgent },
        { name: 'Add Property', href: '/admin?tab=properties&action=new', icon: Plus, show: isBroker },
        { name: 'Featured Listings', href: '/admin?tab=properties&filter=featured', icon: Star, show: isAdmin },
      ],
    },
    {
      title: 'Lead & Client CRM',
      items: [
        { name: 'Inquiries & Leads', href: '/admin?tab=inquiries', icon: Users, show: isAgent },
        { name: 'Viewing Requests', href: '/admin?tab=inquiries&type=viewing', icon: Calendar, show: isAgent },
      ],
    },
    {
      title: 'Administration',
      items: [
        { name: 'Agency Settings & Contacts', href: '/admin?tab=settings', icon: Settings, show: isAdmin },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0E0C0C] text-white flex flex-col">
      {/* Top Admin App Bar */}
      <header className="sticky top-0 z-40 bg-[#141212] border-b border-[#242222] px-4 sm:px-6 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden p-2 text-white/70 hover:text-white"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <BrandLogo variant="dark" size="sm" showSubtitle={false} />
          
          <span className="hidden sm:inline-block px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-[#C9A96E]/20 text-[#C9A96E] border border-[#C9A96E]/40 rounded-sm">
            Brokerage CRM
          </span>
        </div>

        {/* Global Admin Quick Search */}
        <div className="hidden md:block relative w-72 lg:w-96">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search AE-ID, client name, phone..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchQuery.trim() && setShowSearchDropdown(true)}
              className="w-full bg-[#1A1818] border border-[#333030] focus:border-[#C9A96E] text-white text-xs py-1.5 pl-8 pr-3 rounded-sm outline-none"
            />
          </div>

          {/* Search Dropdown Results */}
          {showSearchDropdown && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-[#1A1818] border border-[#383434] rounded-sm shadow-2xl z-50 max-h-72 overflow-y-auto">
              {searchResults.map((res, idx) => (
                <Link
                  key={idx}
                  href={res.href}
                  onClick={() => setShowSearchDropdown(false)}
                  className="block px-3 py-2 text-xs hover:bg-[#242121] border-b border-[#262424] last:border-0"
                >
                  <strong className="text-white block">{res.title}</strong>
                  <span className="text-[10px] text-[#A8A39D]">{res.subtitle}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* User Badge & Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium text-white/70 hover:text-white border border-[#333030] rounded-sm"
          >
            <span>Public Site</span>
            <ExternalLink className="w-3 h-3 text-[#C9A96E]" />
          </Link>

          <div className="flex items-center gap-2 px-2.5 py-1 bg-[#1A1818] border border-[#2D2A2A] rounded-sm">
            <div className="w-6 h-6 rounded-full bg-[#C9A96E] text-[#121010] flex items-center justify-center font-bold text-[10px]">
              {session.name.charAt(0)}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-semibold text-white leading-none">
                {session.name}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-[#C9A96E] font-medium leading-tight mt-0.5">
                {session.role.replace('_', ' ')}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="p-2 text-white/60 hover:text-rose-400 hover:bg-[#201D1D] rounded-sm transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Body Layout: Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-[#121010] border-r border-[#242222] p-4 overflow-y-auto space-y-6">
          {NAV_SECTIONS.map((section, sIdx) => {
            const visibleItems = section.items.filter((i) => i.show);
            if (visibleItems.length === 0) return null;

            return (
              <div key={sIdx}>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#807B75] px-2 block mb-2">
                  {section.title}
                </span>
                <nav className="space-y-1">
                  {visibleItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-sm transition-colors ${
                          isActive
                            ? 'bg-[#1F1C1C] text-[#C9A96E] border-l-2 border-[#C9A96E]'
                            : 'text-white/70 hover:text-white hover:bg-[#1A1818]'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[#C9A96E]' : 'text-white/40'}`} />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            );
          })}

          <div className="pt-6 border-t border-[#221F1F] text-[10px] text-[#706C67] px-2">
            <div>Ali Estate &bull; CRM Engine v2.0</div>
            <div>Secure Session Active</div>
          </div>
        </aside>

        {/* Mobile Drawer Sidebar */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <aside
              className="w-72 bg-[#121010] h-full p-6 overflow-y-auto flex flex-col justify-between border-r border-[#262424]"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#242222] mb-6">
                  <BrandLogo variant="dark" size="sm" />
                  <button
                    type="button"
                    onClick={() => setMobileSidebarOpen(false)}
                    className="p-1 text-white/70"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {NAV_SECTIONS.map((section, sIdx) => {
                    const visibleItems = section.items.filter((i) => i.show);
                    if (visibleItems.length === 0) return null;

                    return (
                      <div key={sIdx}>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#807B75] px-2 block mb-2">
                          {section.title}
                        </span>
                        <nav className="space-y-1">
                          {visibleItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                              <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setMobileSidebarOpen(false)}
                                className={`flex items-center gap-2.5 px-3 py-2.5 text-xs font-medium rounded-sm ${
                                  isActive
                                    ? 'bg-[#1F1C1C] text-[#C9A96E]'
                                    : 'text-white/70 hover:text-white'
                                }`}
                              >
                                <Icon className="w-4 h-4 text-[#C9A96E]" />
                                <span>{item.name}</span>
                              </Link>
                            );
                          })}
                        </nav>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-6 border-t border-[#242222]">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full py-2.5 px-3 bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs font-semibold rounded-sm flex items-center justify-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out of CRM</span>
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* Content Outlet */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#0E0C0C]">
          {children}
        </main>
      </div>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import { Home, Compass, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export default function NotFound() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#111111] text-white flex items-center justify-center">
      <Container size="sm">
        <div className="text-center bg-[#181616] border border-[#2B2828] p-8 sm:p-14 rounded-sm shadow-2xl">
          <span className="font-serif-luxury text-6xl sm:text-7xl font-light text-[#C9A96E] block mb-2">
            404
          </span>

          <h1 className="font-serif-luxury text-2xl sm:text-4xl font-medium text-white mb-4">
            Looks like this property isn&apos;t here.
          </h1>

          <p className="text-xs sm:text-sm text-[#99948F] max-w-md mx-auto leading-relaxed mb-8">
            The listing, development, or page you requested may have been repositioned, transacted off-market, or moved to our private archive.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-[#121010] bg-[#C9A96E] hover:bg-[#D8BC87] rounded-sm transition-all shadow-md"
            >
              <Compass className="w-4 h-4" />
              <span>Back to Properties</span>
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-white border border-[#3D3A3A] hover:border-[#C9A96E] rounded-sm transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Go Home</span>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

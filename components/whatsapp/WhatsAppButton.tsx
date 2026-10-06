'use client';

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  const encodedMessage = encodeURIComponent(siteConfig.contact.whatsappDefaultMessage);
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodedMessage}`;

  return (
    <aside aria-label="Direct WhatsApp Contact" className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Optional floating conversation prompt */}
      {showTooltip && (
        <div className="mb-3 max-w-xs p-3.5 bg-[#121010] text-white border border-[#C9A96E]/40 rounded-sm shadow-xl text-xs space-y-1.5 transition-all animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-[#C9A96E] uppercase tracking-wider text-[10px]">
              Ali Estate Advisory
            </span>
            <button
              type="button"
              onClick={() => setShowTooltip(false)}
              className="text-white/60 hover:text-white"
              aria-label="Close message"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-white/85 text-[11px] leading-relaxed">
            Need immediate property advice or listing appraisal? Chat with our senior consultants.
          </p>
        </div>
      )}

      {/* Main Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="group flex items-center gap-2.5 px-4 py-3 bg-[#181616] hover:bg-[#221F1F] text-white border border-[#C9A96E] hover:border-[#D8BC87] rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
        aria-label="Chat with Ali Estate on WhatsApp"
      >
        {/* WhatsApp Icon with gold badge */}
        <div className="w-7 h-7 rounded-full bg-[#25D366] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
          <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
        </div>
        
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-[10px] uppercase tracking-widest text-[#C9A96E] font-semibold leading-none">
            Direct Desk
          </span>
          <span className="text-xs font-medium text-white group-hover:text-[#D8BC87] transition-colors leading-tight mt-0.5">
            Talk to an Agent
          </span>
        </div>
      </a>
    </aside>
  );
}

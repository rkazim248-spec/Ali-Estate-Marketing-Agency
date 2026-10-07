'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export function WhatsAppButton() {
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);

  useEffect(() => {
    const handleAiState = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOpen: boolean }>;
      if (customEvent.detail) {
        setIsAiChatOpen(customEvent.detail.isOpen);
      }
    };

    window.addEventListener('ai_chat_state', handleAiState);
    return () => window.removeEventListener('ai_chat_state', handleAiState);
  }, []);

  if (isAiChatOpen) {
    return null; // Hide floating WhatsApp button when AI assistant chat is open
  }

  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || siteConfig.contact.whatsappNumber;
  const defaultMsg = encodeURIComponent("Hello Ali Estate & Marketing Agency,\nI am interested in your property services.");
  const whatsappUrl = `https://wa.me/${phone}?text=${defaultMsg}`;

  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      className="fixed bottom-[92px] right-6 max-md:bottom-[145px] max-md:right-4 z-40 flex items-center"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 px-3.5 py-2.5 bg-[#181616] hover:bg-[#201D1D] text-white border border-[#25D366]/60 hover:border-[#25D366] rounded-full shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
        aria-label="Chat on WhatsApp with Ali Estate"
      >
        <div className="w-6 h-6 rounded-full bg-[#25D366] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
          <MessageCircle className="w-3.5 h-3.5 fill-white text-[#25D366]" />
        </div>

        <span className="text-xs font-semibold text-white group-hover:text-[#25D366] transition-colors pr-1 hidden sm:inline">
          Chat on WhatsApp
        </span>
        <span className="text-xs font-semibold text-white sm:hidden pr-0.5">
          WhatsApp
        </span>
      </a>
    </aside>
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, 
  X, 
  Send, 
  Loader2, 
  MessageSquare, 
  RotateCcw, 
  BedDouble, 
  Bath, 
  Maximize2, 
  ExternalLink, 
  CheckCircle2, 
  Phone, 
  Calendar,
  ChevronRight,
  ShieldCheck,
  Bot
} from 'lucide-react';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { PublicPropertyCard } from '@/lib/ai/knowledge/properties';
import { siteConfig } from '@/lib/site-config';

interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  text: string;
  properties?: PublicPropertyCard[];
  suggestedActions?: string[];
  timestamp: string;
}

const INITIAL_MESSAGE: ChatMessage = {
  id: 'init-1',
  role: 'assistant',
  text: `Hello 👋\n\nI'm the Ali Estate AI Assistant.\n\nI can help you:\n• Find properties\n• Buy or rent\n• Sell your property\n• Estimate what information we need for a valuation\n• Learn about Ali Estate\n• Explore our services\n• Find properties by area or budget\n• Schedule a viewing\n• Connect you with an agent\n\nWhat are you looking for today?`,
  suggestedActions: [
    'Find a Property',
    'Sell My Property',
    'Rent a Property',
    'Talk to an Agent',
    'About Ali Estate',
  ],
  timestamp: 'Just now',
};

let messageCounter = 100;
function getNextMessageId(prefix: string) {
  messageCounter += 1;
  return `${prefix}-${messageCounter}`;
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [viewingModalProp, setViewingModalProp] = useState<PublicPropertyCard | null>(null);
  const [leadForm, setLeadForm] = useState({ name: '', phone: '', email: '', date: '' });
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Notify floating buttons about open state
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('ai_chat_state', { detail: { isOpen } }));
    }
  }, [isOpen]);

  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, loading]);

  // Lock body scroll on mobile when chat is open
  useEffect(() => {
    if (isOpen && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || inputText).trim();
    if (!messageContent || loading) return;

    const userMsg: ChatMessage = {
      id: getNextMessageId('user'),
      role: 'user',
      text: messageContent,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const history = messages.map((m) => ({ role: m.role, content: m.text }));
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageContent,
          messages: history,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        const botMsg: ChatMessage = {
          id: getNextMessageId('bot'),
          role: 'assistant',
          text: data.text || 'I am ready to help you with your property inquiry.',
          properties: data.properties || [],
          suggestedActions: data.suggestedActions || [],
          timestamp: 'Just now',
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error(data.error || 'Failed to process request');
      }
    } catch {
      const errorMsg: ChatMessage = {
        id: getNextMessageId('err'),
        role: 'assistant',
        text: 'I apologize for the brief interruption. You can connect directly with our advisory desk via WhatsApp or phone at +92 300 123 4567 for immediate assistance.',
        suggestedActions: ['Talk to an Agent', 'Find a Property'],
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Submit viewing request or lead from inside AI assistant
  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone) return;

    setLeadSubmitting(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadForm.name,
          phone: leadForm.phone,
          email: leadForm.email,
          propertyTitle: viewingModalProp?.title,
          propertyId: viewingModalProp?.id,
          source: 'ai_chat',
          purpose: viewingModalProp?.purpose === 'Rent' ? 'rent' : 'buy',
          notes: `AI Assistant viewing request for ${viewingModalProp?.title || 'property'}. Preferred date: ${leadForm.date || 'Flexible'}`,
        }),
      });

      setLeadSuccess(true);
      setTimeout(() => {
        setViewingModalProp(null);
        setLeadSuccess(false);
        setLeadForm({ name: '', phone: '', email: '', date: '' });
        
        // Add confirmation message in chat
        setMessages((prev) => [
          ...prev,
          {
            id: getNextMessageId('lead-conf'),
            role: 'assistant',
            text: `Thank you, ${leadForm.name}! Your viewing request has been recorded in our CRM. A consultant will contact you at ${leadForm.phone} to finalize the time and gate security pass.`,
            suggestedActions: ['Find More Properties', 'WhatsApp Desk'],
            timestamp: 'Just now',
          },
        ]);
      }, 1800);
    } catch {
      alert('Failed to submit request. Please WhatsApp us directly.');
    } finally {
      setLeadSubmitting(false);
    }
  };

  return (
    <>
      {/* =========================================================================
          1. FLOATING LAUNCHER BUTTON
          ========================================================================= */}
      <aside 
        aria-label="AI Property Assistant"
        className="fixed bottom-6 right-6 md:bottom-6 md:right-6 max-md:bottom-20 max-md:right-4 z-50 flex items-center"
      >
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 px-4 py-3.5 bg-[#141212] hover:bg-black text-white border border-[#C9A96E] hover:border-[#D8BC87] rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
            aria-label="Open Ali Estate AI Property Assistant"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#A98748] to-[#E5D1A6] text-[#121010] flex items-center justify-center font-bold shadow-xs">
              <Sparkles className="w-4 h-4 fill-current text-[#121010]" />
            </div>

            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase tracking-widest text-[#C9A96E] font-semibold leading-none">
                AI Assistant
              </span>
              <span className="text-xs font-medium text-white group-hover:text-[#E2CD9F] transition-colors leading-tight mt-0.5">
                Ali Estate AI
              </span>
            </div>

            {/* Subtle Pulse dot */}
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-[#141212] rounded-full" />
          </button>
        )}
      </aside>

      {/* =========================================================================
          2. CHAT PANEL INTERFACE
          ========================================================================= */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Ali Estate AI Assistant"
          className="fixed inset-0 md:inset-auto md:bottom-6 md:right-6 md:w-[420px] md:h-[650px] z-50 bg-[#121010] text-white md:rounded-sm border border-[#2B2828] md:shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          {/* Header */}
          <div className="px-4 py-3.5 bg-[#181616] border-b border-[#2B2828] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-sm bg-[#121010] border border-[#C9A96E]/40 flex items-center justify-center text-[#C9A96E]">
                <Bot className="w-5 h-5 text-[#C9A96E]" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif-luxury text-base font-semibold text-white leading-tight">
                    Ali Estate AI
                  </h3>
                  <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-[#9E9A94] leading-tight">
                  Your Luxury Property Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClearChat}
                className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-sm transition-colors"
                title="Reset conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-sm transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#0F0E0E] text-xs">
            {messages.map((msg) => {
              const isBot = msg.role === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[88%] p-3.5 rounded-sm leading-relaxed whitespace-pre-line ${
                      isBot
                        ? 'bg-[#1C1A1A] text-white/90 border border-[#2E2B2B]'
                        : 'bg-[#C9A96E] text-[#121010] font-medium shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Attached Property Cards */}
                  {msg.properties && msg.properties.length > 0 && (
                    <div className="w-full mt-3 space-y-2.5">
                      {msg.properties.map((prop) => (
                        <div
                          key={prop.id}
                          className="bg-[#181616] border border-[#333030] hover:border-[#C9A96E]/60 rounded-sm overflow-hidden p-2.5 flex gap-3 transition-all"
                        >
                          <div className="relative w-20 h-20 rounded-xs overflow-hidden flex-shrink-0 bg-neutral-900">
                            <Image
                              src={prop.thumbnail}
                              alt={prop.title}
                              fill
                              sizes="80px"
                              referrerPolicy="no-referrer"
                              className="object-cover"
                            />
                            {prop.verified && (
                              <div className="absolute top-1 left-1 bg-black/80 text-[#C9A96E] p-0.5 rounded-xs" title="Verified Listing">
                                <ShieldCheck className="w-3 h-3" />
                              </div>
                            )}
                          </div>

                          <div className="flex-1 flex flex-col justify-between min-w-0">
                            <div>
                              <div className="flex items-baseline justify-between gap-1">
                                <span className="font-serif-luxury text-xs font-bold text-[#E5D1A6] truncate">
                                  {prop.priceDisplay}
                                </span>
                                <span className="text-[9px] uppercase px-1.5 py-0.5 bg-white/10 rounded-xs text-white/80">
                                  {prop.purpose}
                                </span>
                              </div>

                              <h4 className="font-medium text-white text-xs truncate mt-0.5">
                                {prop.title}
                              </h4>

                              <div className="flex items-center gap-2 text-[10px] text-[#8E8A85] mt-1">
                                {prop.bedrooms > 0 && <span>{prop.bedrooms} Beds</span>}
                                {prop.bathrooms > 0 && <span>• {prop.bathrooms} Baths</span>}
                                <span>• {prop.area} {prop.areaUnit}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 mt-2">
                              <Link
                                href={prop.detailUrl}
                                target="_blank"
                                className="px-2 py-1 bg-white/10 hover:bg-white/20 text-white rounded-xs text-[10px] font-medium flex items-center gap-1"
                              >
                                <span>View</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </Link>

                              <button
                                type="button"
                                onClick={() => setViewingModalProp(prop)}
                                className="px-2 py-1 bg-[#C9A96E] hover:bg-[#D8BC87] text-[#121010] rounded-xs text-[10px] font-bold flex items-center gap-1"
                              >
                                <Calendar className="w-2.5 h-2.5" />
                                <span>Viewing</span>
                              </button>

                              <a
                                href={prop.whatsappInquiryUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2 py-1 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xs text-[10px] font-bold flex items-center gap-1 ml-auto"
                              >
                                <span>WhatsApp</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Suggested Action Chips */}
                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {msg.suggestedActions.map((action, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleSendMessage(action)}
                          className="px-2.5 py-1 bg-[#1A1818] hover:bg-[#262323] text-[#C9A96E] border border-[#3A3636] hover:border-[#C9A96E] rounded-sm text-[11px] font-medium transition-colors"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="text-[9px] text-[#696560] mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {loading && (
              <div className="flex items-center gap-2 p-3 bg-[#1C1A1A] text-white/70 border border-[#2E2B2B] rounded-sm w-fit">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C9A96E]" />
                <span className="text-[11px]">Ali Estate AI is checking catalog...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Schedule Viewing Quick Modal Overlay */}
          {viewingModalProp && (
            <div className="p-4 bg-[#181616] border-t border-[#333030] text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-[#C9A96E] uppercase text-[10px] tracking-wider">
                  Request Private Viewing
                </span>
                <button
                  type="button"
                  onClick={() => setViewingModalProp(null)}
                  className="text-white/60 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-white/80 text-[11px] mb-3 line-clamp-1">
                Property: <strong>{viewingModalProp.title}</strong> ({viewingModalProp.priceDisplay})
              </p>

              {leadSuccess ? (
                <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-center rounded-sm flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Viewing requested! We will call you shortly.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmitLead} className="space-y-2">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                    className="w-full bg-[#121010] border border-[#333030] text-white px-2.5 py-1.5 rounded-sm outline-none focus:border-[#C9A96E]"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="tel"
                      required
                      placeholder="Phone / WhatsApp"
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      className="bg-[#121010] border border-[#333030] text-white px-2.5 py-1.5 rounded-sm outline-none focus:border-[#C9A96E]"
                    />
                    <input
                      type="date"
                      value={leadForm.date}
                      onChange={(e) => setLeadForm({ ...leadForm, date: e.target.value })}
                      className="bg-[#121010] border border-[#333030] text-white px-2.5 py-1.5 rounded-sm outline-none focus:border-[#C9A96E]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={leadSubmitting}
                    className="w-full py-2 bg-[#C9A96E] hover:bg-[#D8BC87] text-[#121010] font-bold text-xs uppercase tracking-wider rounded-sm transition-all flex items-center justify-center gap-2"
                  >
                    {leadSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <span>Confirm Viewing Request</span>}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Footer Input */}
          <div className="p-3 bg-[#181616] border-t border-[#2B2828]">
            <div className="relative flex items-center bg-[#100F0F] border border-[#333030] focus-within:border-[#C9A96E] rounded-sm transition-colors">
              <textarea
                ref={inputRef}
                rows={1}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about properties in DHA, Clifton, price range, selling..."
                className="w-full bg-transparent text-white text-xs px-3 py-2.5 pr-10 outline-none resize-none max-h-24"
              />
              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim() || loading}
                className="absolute right-2 p-1.5 text-[#C9A96E] hover:text-[#E5D1A6] disabled:opacity-30 transition-opacity"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[10px] text-[#706B65] text-center mt-2 leading-tight">
              AI-generated responses may be incomplete. For transaction-specific or legal matters, speak with an Ali Estate specialist.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

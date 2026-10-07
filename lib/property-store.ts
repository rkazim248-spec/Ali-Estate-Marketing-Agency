'use client';

import { useState, useEffect } from 'react';
import { Property, PROPERTIES as DEFAULT_PROPERTIES } from '@/lib/properties';

const STORAGE_KEY = 'ali_estate_properties_v1';
const INQUIRIES_KEY = 'ali_estate_inquiries_v1';

export interface AdminInquiry {
  id: string;
  type: 'viewing' | 'general' | 'listing';
  source?: 'ai_chat' | 'website' | 'whatsapp' | 'viewing_request';
  name: string;
  phone: string;
  email: string;
  propertyTitle?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
  status: 'New' | 'Contacted' | 'Viewing Booked' | 'Closed';
  dateReceived: string;
}

const DEFAULT_INQUIRIES: AdminInquiry[] = [
  {
    id: 'inq-ai-1',
    type: 'viewing',
    source: 'ai_chat',
    name: 'Mustafa Alvi',
    phone: '+92 321 8899771',
    email: 'mustafa.alvi@example.com',
    propertyTitle: 'The Clifton Horizon Penthouse',
    preferredDate: '2026-10-10',
    preferredTime: 'Sunset (4:00 PM - 6:30 PM)',
    message: 'AI Assistant Consultation: Requested private sunset viewing. Inquired about Arabian sea view and building security.',
    status: 'New',
    dateReceived: '2026-10-06 01:15 PM',
  },
  {
    id: 'inq-2',
    type: 'general',
    name: 'Dr. Ayesha Malik',
    phone: '+92 300 4567890',
    email: 'ayesha.malik@domain.com',
    propertyTitle: 'DHA Phase 8 Architectural Villa',
    message: 'Looking for 1,000 sq yd villa for family relocation from London. Is payment plan available?',
    status: 'Contacted',
    dateReceived: '2026-10-05 04:15 PM',
  },
  {
    id: 'inq-3',
    type: 'listing',
    name: 'Farooq Chinoy',
    phone: '+92 333 1122334',
    email: 'f.chinoy@chinoygroup.com',
    message: 'Have an executive commercial floor on Shahrah-e-Faisal. Wish to discuss marketing package.',
    status: 'Viewing Booked',
    dateReceived: '2026-10-04 02:00 PM',
  },
];

export function getStoredProperties(): Property[] {
  if (typeof window === 'undefined') return DEFAULT_PROPERTIES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed reading properties from storage', err);
  }
  return DEFAULT_PROPERTIES;
}

export function saveStoredProperties(properties: Property[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
    window.dispatchEvent(new Event('properties_updated'));
  } catch (err) {
    console.error('Failed saving properties to storage', err);
  }
}

export function resetPropertiesToDefault(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event('properties_updated'));
  } catch (err) {
    console.error('Failed resetting properties', err);
  }
}

export function getStoredInquiries(): AdminInquiry[] {
  if (typeof window === 'undefined') return DEFAULT_INQUIRIES;
  try {
    const raw = localStorage.getItem(INQUIRIES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore
  }
  return DEFAULT_INQUIRIES;
}

export function saveStoredInquiries(inquiries: AdminInquiry[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(inquiries));
    window.dispatchEvent(new Event('inquiries_updated'));
  } catch {
    // ignore
  }
}

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>(DEFAULT_PROPERTIES);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const sync = () => {
      setProperties(getStoredProperties());
      setIsLoaded(true);
    };

    sync();
    window.addEventListener('properties_updated', sync);
    return () => window.removeEventListener('properties_updated', sync);
  }, []);

  return { properties, isLoaded };
}

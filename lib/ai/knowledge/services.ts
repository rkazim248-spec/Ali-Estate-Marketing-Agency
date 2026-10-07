/**
 * Services Knowledge for Ali Estate AI Assistant
 * Provides dynamic real-time retrieval from configured services dataset
 */

import { REAL_ESTATE_SERVICES, MARKETING_SERVICES, getAllServices, ServiceItem } from '@/lib/services';

export const AI_SERVICES_KNOWLEDGE = {
  categories: [
    {
      id: "real-estate",
      title: "Real Estate Brokerage Services",
      description: "Complete advisory for property transactions across Karachi's luxury enclaves.",
      services: REAL_ESTATE_SERVICES.map((s) => ({
        id: s.id,
        title: s.title,
        description: s.shortDescription,
        details: s.fullDescription,
        highlights: s.highlights,
        audience: s.audience
      }))
    },
    {
      id: "marketing",
      title: "Digital Property Marketing Services",
      description: "Dedicated in-house media production and targeted digital campaigns for developers, builders, and elite homeowners.",
      services: MARKETING_SERVICES.map((s) => ({
        id: s.id,
        title: s.title,
        description: s.shortDescription,
        details: s.fullDescription,
        highlights: s.highlights,
        deliverables: s.deliverables
      }))
    }
  ],

  getAllServicesSummary(): string {
    const reList = REAL_ESTATE_SERVICES.map((s) => `• ${s.title}: ${s.shortDescription}`).join('\n');
    const mktList = MARKETING_SERVICES.map((s) => `• ${s.title}: ${s.shortDescription}`).join('\n');
    return `REAL ESTATE BROKERAGE SERVICES:\n${reList}\n\nPROPERTY MARKETING & MEDIA SERVICES:\n${mktList}`;
  },

  findServiceByQuery(query: string): ServiceItem[] {
    const q = query.toLowerCase();
    return getAllServices().filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.shortDescription.toLowerCase().includes(q) ||
        s.fullDescription.toLowerCase().includes(q) ||
        s.highlights.some((h) => h.toLowerCase().includes(q))
    );
  }
};

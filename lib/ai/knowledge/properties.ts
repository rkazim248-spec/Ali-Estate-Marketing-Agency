/**
 * Properties Knowledge Base for Ali Estate AI Assistant
 * Provides server-side retrieval of published, active listings.
 * Strictly enforces zero-fabrication and privacy of internal owner records.
 */

import { PROPERTIES, Property } from '@/lib/properties';
import { db } from '@/lib/db';

export interface PropertySearchParams {
  purpose?: 'Buy' | 'Rent' | 'sale' | 'rent';
  propertyType?: string;
  city?: string;
  area?: string;
  neighborhood?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  minArea?: number;
  maxArea?: number;
  verifiedOnly?: boolean;
}

export interface PublicPropertyCard {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  location: string;
  neighborhood: string;
  city: string;
  price: number;
  priceDisplay: string;
  type: string;
  purpose: 'Buy' | 'Rent';
  bedrooms: number;
  bathrooms: number;
  area: number;
  areaUnit: string;
  featured: boolean;
  verified: boolean;
  thumbnail: string;
  description: string;
  amenities: string[];
  features: string[];
  agentName: string;
  agentPhone: string;
  agentWhatsapp: string;
  whatsappInquiryUrl: string;
  detailUrl: string;
}

/**
 * Normalizes property records into safe public format,
 * completely stripping internal owner data, commission, and private documents.
 */
function sanitizeToPublic(p: Property): PublicPropertyCard {
  const whatsappMsg = encodeURIComponent(
    `Hello Ali Estate & Marketing Agency,\n\nI am interested in:\nProperty: ${p.title}\nProperty ID: ${p.id}\nPrice: ${p.priceDisplay}\n\nPlease share more details.`
  );
  const whatsappUrl = `https://wa.me/${p.agent.whatsapp}?text=${whatsappMsg}`;

  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    subtitle: p.subtitle || '',
    location: p.location,
    neighborhood: p.neighborhood,
    city: p.city,
    price: p.price,
    priceDisplay: p.priceDisplay,
    type: p.type,
    purpose: p.status,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    area: p.area,
    areaUnit: p.areaUnit,
    featured: Boolean(p.featured),
    verified: true, // Only genuine vetted catalog properties are in PROPERTIES
    thumbnail: p.images[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    description: p.description,
    amenities: p.amenities || [],
    features: p.features || [],
    agentName: p.agent.name,
    agentPhone: p.agent.phone,
    agentWhatsapp: p.agent.whatsapp,
    whatsappInquiryUrl: whatsappUrl,
    detailUrl: `/properties/${p.slug}`,
  };
}

export const AI_PROPERTIES_KNOWLEDGE = {
  /**
   * Retrieves all published, active properties from catalog
   */
  getAllPublishedProperties(): PublicPropertyCard[] {
    // If DB is initialized and has active properties, combine or fallback to verified catalog
    try {
      const dbActive = db.properties.getPublic();
      if (dbActive && dbActive.length > 0) {
        // Return active db properties normalized
        return dbActive.map((item) => {
          const whatsappMsg = encodeURIComponent(
            `Hello Ali Estate & Marketing Agency,\n\nI am interested in:\nProperty: ${item.title}\nProperty ID: ${item.propertyId || item.id}\nPrice: ${item.priceDisplay}\n\nPlease share more details.`
          );
          return {
            id: item.id,
            slug: item.slug,
            title: item.title,
            subtitle: item.subtitle || '',
            location: item.address || item.neighborhood || item.area,
            neighborhood: item.neighborhood || item.area,
            city: item.city,
            price: item.price,
            priceDisplay: item.priceDisplay,
            type: item.propertyType,
            purpose: item.purpose === 'rent' ? 'Rent' : 'Buy',
            bedrooms: item.bedrooms,
            bathrooms: item.bathrooms,
            area: item.areaNumber || 0,
            areaUnit: item.areaUnit || 'Sq Ft',
            featured: Boolean(item.featured),
            verified: Boolean(item.verified),
            thumbnail: item.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
            description: item.description,
            amenities: item.amenities || [],
            features: item.features || [],
            agentName: 'Ali Estate Advisory',
            agentPhone: '+92 300 123 4567',
            agentWhatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '923001234567',
            whatsappInquiryUrl: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '923001234567'}?text=${whatsappMsg}`,
            detailUrl: `/properties/${item.slug}`,
          };
        });
      }
    } catch {
      // fallback to static verified catalog
    }

    return PROPERTIES.map(sanitizeToPublic);
  },

  /**
   * Searches published properties using structured criteria
   */
  searchProperties(params: PropertySearchParams): PublicPropertyCard[] {
    const list = this.getAllPublishedProperties();

    return list.filter((p) => {
      // Purpose (Buy / Rent)
      if (params.purpose) {
        const normPurpose = params.purpose.toLowerCase() === 'rent' ? 'Rent' : 'Buy';
        if (p.purpose.toLowerCase() !== normPurpose.toLowerCase()) {
          return false;
        }
      }

      // Property Type
      if (params.propertyType && params.propertyType !== 'All') {
        const pt = params.propertyType.toLowerCase();
        if (!p.type.toLowerCase().includes(pt)) {
          return false;
        }
      }

      // Area / Location
      if (params.area || params.neighborhood) {
        const targetArea = (params.area || params.neighborhood || '').toLowerCase();
        const matchesLoc = p.location.toLowerCase().includes(targetArea);
        const matchesNeigh = p.neighborhood.toLowerCase().includes(targetArea);
        const matchesCity = p.city.toLowerCase().includes(targetArea);
        if (!matchesLoc && !matchesNeigh && !matchesCity) {
          return false;
        }
      }

      // Bedrooms
      if (params.bedrooms !== undefined && params.bedrooms > 0) {
        if (p.bedrooms < params.bedrooms) {
          return false;
        }
      }

      // Bathrooms
      if (params.bathrooms !== undefined && params.bathrooms > 0) {
        if (p.bathrooms < params.bathrooms) {
          return false;
        }
      }

      // Price Filter
      if (params.minPrice !== undefined && params.minPrice > 0) {
        if (p.price < params.minPrice) {
          return false;
        }
      }

      if (params.maxPrice !== undefined && params.maxPrice > 0) {
        if (p.price > params.maxPrice) {
          return false;
        }
      }

      // Verified filter
      if (params.verifiedOnly && !p.verified) {
        return false;
      }

      return true;
    });
  },

  /**
   * Finds single property by slug or ID
   */
  getPropertyByIdOrSlug(idOrSlug: string): PublicPropertyCard | undefined {
    const term = idOrSlug.trim().toLowerCase();
    return this.getAllPublishedProperties().find(
      (p) => p.id.toLowerCase() === term || p.slug.toLowerCase() === term
    );
  }
};

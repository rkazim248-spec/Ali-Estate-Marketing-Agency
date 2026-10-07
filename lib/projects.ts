/**
 * Projects / Developments Dataset
 * Landmark verified residential and commercial developments represented by Ali Estate & Marketing Agency
 */

export interface ProjectDevelopment {
  id: string;
  slug: string;
  name: string;
  developer: string;
  location: string;
  city: string;
  startingPrice: string;
  startingPriceNumeric: number;
  propertyTypes: string[];
  status: 'Under Construction' | 'Newly Launched' | 'Ready for Possession' | 'Booking Open';
  completionDate: string;
  totalUnits: string;
  coverImage: string;
  galleryImages: string[];
  headline: string;
  description: string;
  overview: string[];
  amenities: string[];
}

export const PROJECTS: ProjectDevelopment[] = [
  {
    id: "proj-1",
    slug: "emaar-oceanfront-coral-pearl",
    name: "Emaar Oceanfront — Coral & Pearl Towers",
    developer: "Emaar Pakistan",
    location: "DHA Phase 8 Waterfront, Zone D",
    city: "Karachi",
    startingPrice: "PKR 85,000,000",
    startingPriceNumeric: 85000000,
    propertyTypes: ["2, 3 & 4 Bed Luxury Seafront Apartments", "Exclusive Penthouses"],
    status: "Ready for Possession",
    completionDate: "Phase Completed / Ready Handover",
    totalUnits: "Integrated Coastal Enclave",
    coverImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85"
    ],
    headline: "Arabian Seafront Luxury High-Rise Living within Secure Gated Perimeter",
    description: "Emaar Oceanfront is Karachi's signature master-planned beachfront community. Located in DHA Phase 8, it offers direct promenade access, 24/7 multi-tier security, and uninterrupted sea views.",
    overview: [
      "Coral and Pearl Towers provide international master-developer standards, private parking basements, and beachfront promenade walks.",
      "Residents enjoy a private infinity pool, state-of-the-art fitness center, children's park, and dedicated building concierge."
    ],
    amenities: [
      "Beachfront Promenade Access",
      "Infinity Swimming Pool & Sundeck",
      "International Standard Gymnasium",
      "Dedicated High-Speed Elevators",
      "Continuous Generator Power Backup",
      "24/7 Gated Security & Concierge Desk"
    ]
  },
  {
    id: "proj-2",
    slug: "hmr-waterfront-towers",
    name: "HMR Waterfront Luxury Residences",
    developer: "HMR Group",
    location: "DHA Phase 8 Seafront Promenade",
    city: "Karachi",
    startingPrice: "PKR 95,000,000",
    startingPriceNumeric: 95000000,
    propertyTypes: ["3 & 4 Bed Sea-Facing Residences", "Duplex Sky Villas"],
    status: "Under Construction",
    completionDate: "Q3 2027",
    totalUnits: "14 Signature Towers",
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85"
    ],
    headline: "Ultra-Modern Seafront High-Rise Living on Karachi's South Coast",
    description: "HMR Waterfront is a prestigious residential and commercial development located along the coastline of DHA Phase 8 Karachi, featuring world-class architecture, panoramic oceanic vistas, and private club amenities.",
    overview: [
      "Designed for discerning families and overseas Pakistani investors seeking freehold oceanfront capital assets.",
      "Includes private recreational clubs, commercial high-street retail, smart home infrastructure, and multi-tier access control."
    ],
    amenities: [
      "Private Marina & Promenade",
      "Sky Lounge & Sunset Terraces",
      "Temperature-Controlled Indoor Pools",
      "Executive Business Lounge",
      "Automated Smart Building Technology",
      "Multi-Level Secure Underground Parking"
    ]
  },
  {
    id: "proj-3",
    slug: "bahria-town-golf-city-villas",
    name: "Bahria Town Golf City Villas",
    developer: "Bahria Town",
    location: "Main Jinnah Avenue Corridor, Bahria Town",
    city: "Karachi",
    startingPrice: "PKR 65,000,000",
    startingPriceNumeric: 65000000,
    propertyTypes: ["500 & 1,000 Sq Yd Luxury Golf Villas", "Custom Villa Plots"],
    status: "Ready for Possession",
    completionDate: "Ready for Immediate Handover",
    totalUnits: "Gated Golf Enclave",
    coverImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=85"
    ],
    headline: "Prestigious Golf Course Living with Gated Privacy and Underground Utilities",
    description: "Overlooking the championship 36-hole golf course, Golf City offers luxury single-family homes with private landscaped lawns, underground infrastructure, and an international standard community lifestyle.",
    overview: [
      "Complete infrastructure with zero load-shedding grid, dedicated security squads, and close proximity to Danzoo and international schools.",
      "Ideal for high-net-worth families looking for tranquil resort living away from inner-city congestion."
    ],
    amenities: [
      "Direct Fairway Golf Views",
      "Championship Golf Club Membership",
      "Independent Grid Power System (No Load-Shedding)",
      "24/7 Mobile Patrol Security",
      "Community Mosques & Parks",
      "Wide Paved Boulevards & Green Belts"
    ]
  }
];

export function getProjectBySlug(slug: string): ProjectDevelopment | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

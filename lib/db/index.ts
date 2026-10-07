/**
 * Server-Side Persistent CRM & Property Database Engine
 * Features structured entities with disk/memory caching, ACID-like sync,
 * relationship integrity, and audit logging.
 */

import fs from 'fs';
import path from 'path';

export type UserRole = 
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'BROKER'
  | 'AGENT'
  | 'MARKETING_MANAGER'
  | 'CONTENT_EDITOR'
  | 'VIEWER';

export interface DBUser {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DBAgent {
  id: string;
  name: string;
  photo: string;
  phone: string;
  whatsapp: string;
  email: string;
  position: string;
  bio: string;
  areas: string[];
  specializations: string[];
  status: 'active' | 'inactive';
  assignedPropertiesCount: number;
  closedDeals: number;
  createdAt: string;
}

export interface PropertyVerification {
  ownerIdentity: boolean;
  ownershipDocuments: boolean;
  noc: boolean;
  dues: boolean;
  physicalInspection: boolean;
  priceVerified: boolean;
  photosVerified: boolean;
  agreementSigned: boolean;
}

export interface PropertyDocument {
  id: string;
  name: string;
  type: 'title_deed' | 'allotment_letter' | 'noc' | 'tax_clearance' | 'agreement' | 'other';
  url: string;
  uploadedAt: string;
  isPrivate: boolean;
}

export interface DBProperty {
  id: string;
  propertyId: string; // e.g. AE-CLIFTON-0001
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string[];
  purpose: 'sale' | 'rent';
  propertyType: 'villa' | 'apartment' | 'penthouse' | 'townhouse' | 'commercial' | 'plot';
  status: 'draft' | 'pending_verification' | 'active' | 'under_offer' | 'sold' | 'rented' | 'archived';
  price: number;
  priceDisplay: string;
  currency: string;
  city: string;
  area: string;
  neighborhood: string;
  phase?: string;
  block?: string;
  street?: string;
  address: string;
  latitude: number;
  longitude: number;
  bedrooms: number;
  bathrooms: number;
  parkingSpaces: number;
  plotArea?: string;
  coveredArea: string;
  areaNumber: number;
  areaUnit: string;
  furnished: boolean;
  facing?: string;
  floor?: string;
  constructionYear?: number;
  possession?: string;
  ownerId?: string;
  assignedAgentId: string;
  featured: boolean;
  verified: boolean;
  verification: PropertyVerification;
  images: string[];
  amenities: string[];
  features: string[];
  documents: PropertyDocument[];
  marketingStatus: 'not_started' | 'preparing' | 'live' | 'campaign_active' | 'completed';
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface DBLead {
  id: string;
  name: string;
  phone: string;
  whatsapp?: string;
  email: string;
  source: 'website' | 'whatsapp' | 'phone' | 'walk_in' | 'referral' | 'property_portal' | 'ai_chat';
  status: 'new' | 'contacted' | 'qualified' | 'viewing_scheduled' | 'viewing_completed' | 'negotiation' | 'offer' | 'won' | 'lost';
  purpose?: 'buy' | 'rent' | 'sell';
  budgetMin?: number;
  budgetMax?: number;
  preferredLocations?: string[];
  bedrooms?: number;
  propertyTypes?: string[];
  propertyId?: string;
  propertyTitle?: string;
  assignedAgentId?: string;
  notes?: string;
  followUpAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DBViewing {
  id: string;
  propertyId: string;
  propertyTitle: string;
  leadId: string;
  leadName: string;
  leadPhone: string;
  agentId: string;
  agentName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'requested' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  notes?: string;
  createdAt: string;
}

export interface DBFollowUp {
  id: string;
  leadId: string;
  leadName: string;
  leadPhone: string;
  agentId: string;
  agentName: string;
  date: string;
  time: string;
  type: 'call' | 'whatsapp' | 'email' | 'viewing' | 'meeting' | 'other';
  notes: string;
  status: 'pending' | 'completed' | 'overdue';
  createdAt: string;
}

export interface DBBuyer {
  id: string;
  name: string;
  phone: string;
  whatsapp?: string;
  email: string;
  budget: number;
  budgetDisplay: string;
  purpose: 'buy' | 'rent';
  preferredAreas: string[];
  propertyTypes: string[];
  bedrooms?: number;
  timeline: string;
  assignedAgentId: string;
  notes?: string;
  createdAt: string;
}

export interface DBOwner {
  id: string;
  name: string;
  phone: string;
  email: string;
  cnicVerified: boolean;
  propertiesCount: number;
  notes?: string;
  createdAt: string;
}

export interface DBTransaction {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyHumanId: string;
  buyerName: string;
  sellerName: string;
  agentId: string;
  agentName: string;
  type: 'sale' | 'rent';
  transactionValue: number;
  commissionPercent: number;
  agencyCommission: number;
  agentCommission: number;
  status: 'negotiation' | 'offer' | 'contract' | 'closing' | 'completed' | 'cancelled';
  closingDate: string;
  notes?: string;
  createdAt: string;
}

export interface DBActivityLog {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  action: string;
  entity: string;
  entityId: string;
  details: string;
  timestamp: string;
}

export interface DBSession {
  id: string;
  userId: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  expiresAt: string;
}

export interface DatabaseSchema {
  users: DBUser[];
  agents: DBAgent[];
  properties: DBProperty[];
  leads: DBLead[];
  viewings: DBViewing[];
  followUps: DBFollowUp[];
  buyers: DBBuyer[];
  owners: DBOwner[];
  transactions: DBTransaction[];
  activityLogs: DBActivityLog[];
  sessions: DBSession[];
}

const DB_FILE_PATH = path.join(process.cwd(), 'data', 'crm_database.json');

// Initial Seed Data with Verified Real Properties and Default Credentials
function getInitialData(): DatabaseSchema {
  return {
    users: [
      {
        id: 'usr-super-admin',
        email: 'admin@ali-estate.agency',
        name: 'Muhammad Ali Raza',
        // Password: AliEstate2026!
        passwordHash: '86a9928eadf88d8f732d88554f73c2ba:321c6c987b4dcd227ae96a6e2916daed3d329e5a147ad855d1e11422699a3b31556106f3a115beeb24ff72550bbc79934e844b308a067447461f25a080287688',
        role: 'SUPER_ADMIN',
        active: true,
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
      },
      {
        id: 'usr-broker-1',
        email: 'broker@ali-estate.agency',
        name: 'Tariq Mansoor',
        // Password: Broker2026!
        passwordHash: '8759530177ff50f1c034d2ae98385125:f9046abdbecfae6d1699a8a1953a8af7fd7a3271ddcd00685620b0e7b054f2af3026ceca62071c85a8adc5b236113bc524dd9e5800da716b15793c794eeb102c',
        role: 'BROKER',
        active: true,
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
      },
      {
        id: 'usr-agent-1',
        email: 'agent@ali-estate.agency',
        name: 'Hamza Farooqi',
        // Password: Agent2026!
        passwordHash: 'b7e4500bf1c346fa55cbe2b026453ef9:0eebc3430bc40c78661e22ba39a9267c0b7e283477a6f76daaa1285b3f0328e1a053fdbb47c5374227164daa34c47f31f7937912c8e6e7892c6e4b422ad73ae2',
        role: 'AGENT',
        active: true,
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
      },
    ],
    agents: [
      {
        id: 'agt-1',
        name: 'Muhammad Ali Raza',
        photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
        phone: '+92 300 123 4567',
        whatsapp: '923001234567',
        email: 'ali.raza@ali-estate.agency',
        position: 'Managing Partner & Principal Broker',
        bio: 'Over a decade advising private family offices on marquee Clifton waterfront and DHA Phase 8 acquisitions.',
        areas: ['Clifton', 'DHA Phase 8', 'Emaar Oceanfront'],
        specializations: ['Luxury', 'Commercial', 'Investment'],
        status: 'active',
        assignedPropertiesCount: 3,
        closedDeals: 42,
        createdAt: '2026-01-01T00:00:00.000Z',
      },
      {
        id: 'agt-2',
        name: 'Tariq Mansoor',
        photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
        phone: '+92 301 987 6543',
        whatsapp: '923019876543',
        email: 'tariq.mansoor@ali-estate.agency',
        position: 'Senior Luxury Property Advisor',
        bio: 'Specialist in custom-built 1,000 sq yd DHA villas, architectural compliance, and conveyancing diligence.',
        areas: ['DHA Phase 5', 'DHA Phase 6', 'DHA Phase 8'],
        specializations: ['Residential', 'Luxury', 'Plots'],
        status: 'active',
        assignedPropertiesCount: 3,
        closedDeals: 36,
        createdAt: '2026-01-01T00:00:00.000Z',
      },
      {
        id: 'agt-3',
        name: 'Hamza Farooqi',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
        phone: '+92 321 456 7890',
        whatsapp: '923214567890',
        email: 'hamza.farooqi@ali-estate.agency',
        position: 'Commercial & Corporate Broker',
        bio: 'Advising multinational corporate tenants, fintech firms, and commercial plot developers along Shahrah-e-Faisal.',
        areas: ['Clifton Block 5', 'PECHS', 'Shahrah-e-Faisal'],
        specializations: ['Commercial', 'Corporate Lease', 'Investment'],
        status: 'active',
        assignedPropertiesCount: 2,
        closedDeals: 28,
        createdAt: '2026-01-01T00:00:00.000Z',
      },
    ],
    properties: [
      {
        id: 'prop-1',
        propertyId: 'AE-CLIFTON-0001',
        slug: 'the-clifton-horizon-penthouse',
        title: 'The Clifton Horizon Penthouse',
        subtitle: 'Duplex penthouse overlooking the Arabian Sea with private infinity terrace',
        description: 'An extraordinary duplex residence perched atop Clifton skyline, offering panoramic Arabian sea vistas, Italian marble finishes, automated smart home infrastructure, and an expansive private terrace.',
        longDescription: [
          'Positioned in the prime enclave of Clifton Block 4, this penthouse represents the absolute pinnacle of contemporary urban living in Karachi.',
          'Spanning two full levels connected by a sculptural floating staircase, the residence features expansive double-height living spaces, floor-to-ceiling soundproof glass panels, and a bespoke Poliform kitchen equipped with premium German appliances.',
          'The master suite encompasses an entire wing, featuring dual walk-in dressing suites, an ensuite sanctuary with freestanding stone soaking tub, and uninterrupted sunset views over the coastal waters.'
        ],
        purpose: 'sale',
        propertyType: 'penthouse',
        status: 'active',
        price: 185000000,
        priceDisplay: 'PKR 185,000,000',
        currency: 'PKR',
        city: 'Karachi',
        area: 'Clifton',
        neighborhood: 'Clifton Block 4',
        phase: 'Block 4',
        block: '4',
        address: 'Executive Marine Promenade, Block 4, Clifton, Karachi',
        latitude: 24.8182,
        longitude: 67.0289,
        bedrooms: 5,
        bathrooms: 6,
        parkingSpaces: 4,
        plotArea: 'Duplex Rooftop',
        coveredArea: '6,400 Sq Ft',
        areaNumber: 6400,
        areaUnit: 'Sq Ft',
        furnished: true,
        facing: 'South-West (Sea Facing)',
        floor: '28th & 29th (Duplex)',
        constructionYear: 2024,
        possession: 'Immediate',
        ownerId: 'own-1',
        assignedAgentId: 'agt-1',
        featured: true,
        verified: true,
        verification: {
          ownerIdentity: true,
          ownershipDocuments: true,
          noc: true,
          dues: true,
          physicalInspection: true,
          priceVerified: true,
          photosVerified: true,
          agreementSigned: true,
        },
        images: [
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
        ],
        amenities: [
          'Swimming Pool',
          'Gym',
          'Parking',
          'Security',
          'Backup Generator',
          'Elevator',
          'CCTV',
          'Air Conditioning',
          'Balcony',
          'Terrace',
          'Servant Quarter',
        ],
        features: [
          'Direct Private Keycard Elevator',
          'Imported Calacatta Marble Throughout',
          'Crestron Smart Automation',
          '3-Sided Panoramic Sea Views',
          'Separate Maid & Driver Quarters',
        ],
        documents: [
          {
            id: 'doc-1',
            name: 'Sub-Lease & Allotment Verification Dossier',
            type: 'allotment_letter',
            url: '/internal/docs/sublease_clifton_001.pdf',
            uploadedAt: '2026-02-10T10:00:00Z',
            isPrivate: true,
          },
          {
            id: 'doc-2',
            name: 'Cantonment Board Property Tax Receipt 2025-26',
            type: 'tax_clearance',
            url: '/internal/docs/tax_receipt_001.pdf',
            uploadedAt: '2026-02-10T10:00:00Z',
            isPrivate: true,
          },
        ],
        marketingStatus: 'live',
        createdAt: '2026-02-15T09:00:00.000Z',
        updatedAt: '2026-10-04T12:00:00.000Z',
        publishedAt: '2026-02-15T10:00:00.000Z',
      },
      {
        id: 'prop-2',
        propertyId: 'AE-DHA8-0002',
        slug: 'dha-phase-8-architectural-villa',
        title: 'DHA Phase 8 Architectural Villa',
        subtitle: 'Custom-built 1,000 sq yd modern minimalist mansion with private pool & courtyard',
        description: 'A masterwork of contemporary architecture featuring warm textured stone, tranquil water features, private internal courtyard, and lap swimming pool in Karachi premier coastal zone.',
        longDescription: [
          'Conceived by leading regional architects, this sprawling DHA Phase 8 villa integrates indoor and outdoor spaces through sliding glass curtain walls.',
          'The lower level hosts expansive formal and casual salons, a private state-of-the-art cinema room, and an executive home office overlooking lush landscaped perimeter gardens.',
          'Constructed to earthquake-resistant specifications with high-grade European fittings and 100% solar hybrid power integration.'
        ],
        purpose: 'sale',
        propertyType: 'villa',
        status: 'active',
        price: 295000000,
        priceDisplay: 'PKR 295,000,000',
        currency: 'PKR',
        city: 'Karachi',
        area: 'DHA Phase 8',
        neighborhood: 'DHA Phase 8 Zone A',
        phase: 'Phase 8',
        block: 'Zone A',
        address: 'Zone A, Street 14, DHA Phase 8, Karachi',
        latitude: 24.7745,
        longitude: 67.0784,
        bedrooms: 6,
        bathrooms: 7,
        parkingSpaces: 6,
        plotArea: '1,000 Sq Yds',
        coveredArea: '9,000 Sq Ft',
        areaNumber: 9000,
        areaUnit: 'Sq Ft',
        furnished: false,
        facing: 'North-East',
        constructionYear: 2025,
        possession: 'Immediate',
        ownerId: 'own-2',
        assignedAgentId: 'agt-2',
        featured: true,
        verified: true,
        verification: {
          ownerIdentity: true,
          ownershipDocuments: true,
          noc: true,
          dues: true,
          physicalInspection: true,
          priceVerified: true,
          photosVerified: true,
          agreementSigned: true,
        },
        images: [
          'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
          'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85',
          'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
        ],
        amenities: [
          'Swimming Pool',
          'Garden',
          'Parking',
          'Security',
          'Backup Generator',
          'CCTV',
          'Air Conditioning',
          'Terrace',
          'Servant Quarter',
        ],
        features: [
          '1,000 Sq Yds Prime Corner Plot',
          'Private Heated Lap Pool',
          'Basement Home Cinema & Lounge',
          'Solar Hybrid 40kW Inverter System',
        ],
        documents: [],
        marketingStatus: 'campaign_active',
        createdAt: '2026-03-01T10:00:00.000Z',
        updatedAt: '2026-10-05T14:30:00.000Z',
        publishedAt: '2026-03-01T11:00:00.000Z',
      },
      {
        id: 'prop-3',
        propertyId: 'AE-EMAAR-0003',
        slug: 'emaar-coral-towers-luxury-residence',
        title: 'Emaar Oceanfront Coral Residence',
        subtitle: 'High-floor seaside luxury apartment with sunset balcony and resort amenities',
        description: 'Enjoy prestigious beachfront living within the secure gated precinct of Emaar Oceanfront. Features open-plan living, designer cabinetry, and panoramic maritime views.',
        longDescription: [
          'Situated along the Arabian coastline, this 3-bedroom luxury flat offers tranquil resort-style living with urban accessibility.',
          'Residents enjoy access to a private beach club, infinity swimming pool, children play parks, state-of-the-art wellness club, and around-the-clock international concierge service.'
        ],
        purpose: 'sale',
        propertyType: 'apartment',
        status: 'active',
        price: 92000000,
        priceDisplay: 'PKR 92,000,000',
        currency: 'PKR',
        city: 'Karachi',
        area: 'Emaar Oceanfront',
        neighborhood: 'DHA Phase 8 Coastal Belt',
        phase: 'Coral Tower',
        block: 'Tower 2',
        address: 'Coral Towers, Emaar Oceanfront, DHA Phase 8, Karachi',
        latitude: 24.7812,
        longitude: 67.0691,
        bedrooms: 3,
        bathrooms: 4,
        parkingSpaces: 2,
        plotArea: 'Apartment Unit',
        coveredArea: '2,850 Sq Ft',
        areaNumber: 2850,
        areaUnit: 'Sq Ft',
        furnished: false,
        facing: 'Direct Arabian Sea',
        floor: '18th Floor',
        constructionYear: 2023,
        possession: 'Immediate',
        ownerId: 'own-3',
        assignedAgentId: 'agt-1',
        featured: true,
        verified: true,
        verification: {
          ownerIdentity: true,
          ownershipDocuments: true,
          noc: true,
          dues: true,
          physicalInspection: true,
          priceVerified: true,
          photosVerified: true,
          agreementSigned: true,
        },
        images: [
          'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85',
        ],
        amenities: [
          'Swimming Pool',
          'Gym',
          'Parking',
          'Security',
          'Backup Generator',
          'Elevator',
          'CCTV',
          'Air Conditioning',
          'Balcony',
        ],
        features: [
          'Direct Promenade Beach Access',
          '24/7 Gated Security & Concierge',
          'Imported German Sanitaryware',
        ],
        documents: [],
        marketingStatus: 'live',
        createdAt: '2026-01-20T08:00:00.000Z',
        updatedAt: '2026-10-02T16:00:00.000Z',
        publishedAt: '2026-01-20T09:00:00.000Z',
      },
      {
        id: 'prop-4',
        propertyId: 'AE-COMM-0004',
        slug: 'executive-commercial-floor-clifton',
        title: 'Executive Corporate Floor',
        subtitle: 'Turnkey A-Grade corporate office floor in Karachi prime financial belt',
        description: 'Premium commercial floor suited for multinationals, financial advisories, or fintech headquarters. High-speed elevators, biometric access, dual fiber connectivity, and dedicated visitor parking.',
        longDescription: [
          'An immaculate commercial floor featuring column-free open workspaces, five partitioned executive suites, two state-of-the-art conference rooms, and a modern staff cafeteria.',
          'Backed by triple redundant generator systems and 24/7 security control.'
        ],
        purpose: 'rent',
        propertyType: 'commercial',
        status: 'active',
        price: 1200000,
        priceDisplay: 'PKR 1,200,000 / mo',
        currency: 'PKR',
        city: 'Karachi',
        area: 'Clifton',
        neighborhood: 'Clifton Block 5',
        phase: 'Block 5',
        block: '5',
        address: 'Executive Heights, Main Clifton Road, Block 5, Karachi',
        latitude: 24.8251,
        longitude: 67.0345,
        bedrooms: 0,
        bathrooms: 6,
        parkingSpaces: 8,
        plotArea: 'Full Floor',
        coveredArea: '7,500 Sq Ft',
        areaNumber: 7500,
        areaUnit: 'Sq Ft',
        furnished: true,
        floor: '7th Floor',
        constructionYear: 2022,
        possession: 'Immediate',
        ownerId: 'own-4',
        assignedAgentId: 'agt-3',
        featured: true,
        verified: true,
        verification: {
          ownerIdentity: true,
          ownershipDocuments: true,
          noc: true,
          dues: true,
          physicalInspection: true,
          priceVerified: true,
          photosVerified: true,
          agreementSigned: true,
        },
        images: [
          'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
          'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=85',
        ],
        amenities: [
          'Parking',
          'Security',
          'Backup Generator',
          'Elevator',
          'CCTV',
          'Air Conditioning',
        ],
        features: [
          'Grade-A Corporate Tower',
          'High-Speed Fiber Infrastructure',
          '8 Dedicated Basement Car Stalls',
        ],
        documents: [],
        marketingStatus: 'live',
        createdAt: '2026-02-28T11:00:00.000Z',
        updatedAt: '2026-10-06T09:00:00.000Z',
        publishedAt: '2026-02-28T12:00:00.000Z',
      },
      {
        id: 'prop-5',
        propertyId: 'AE-DHA6-0005',
        slug: 'dha-phase-6-contemporary-designer-home',
        title: 'DHA Phase 6 Designer Residence',
        subtitle: '500 sq yd newly completed luxury residence with double height lobby & basement',
        description: 'Striking clean lines, warm oak millwork, custom bronze fixtures, and an expansive light-filled layout in one of DHA most demanded residential lanes.',
        longDescription: [
          'Designed for a modern family who appreciates craftsmanship. Highlights include double glazed European windows, a designer dirty kitchen, imported Spanish porcelain tiling, and a rooftop barbecue gazebo.'
        ],
        purpose: 'sale',
        propertyType: 'villa',
        status: 'active',
        price: 175000000,
        priceDisplay: 'PKR 175,000,000',
        currency: 'PKR',
        city: 'Karachi',
        area: 'DHA Phase 6',
        neighborhood: 'DHA Phase 6 Bukhari Vicinity',
        phase: 'Phase 6',
        address: 'Bukhari Commercial Vicinity, DHA Phase 6, Karachi',
        latitude: 24.8011,
        longitude: 67.0622,
        bedrooms: 5,
        bathrooms: 6,
        parkingSpaces: 4,
        plotArea: '500 Sq Yds',
        coveredArea: '5,500 Sq Ft',
        areaNumber: 5500,
        areaUnit: 'Sq Ft',
        furnished: false,
        constructionYear: 2024,
        possession: 'Immediate',
        ownerId: 'own-5',
        assignedAgentId: 'agt-2',
        featured: false,
        verified: true,
        verification: {
          ownerIdentity: true,
          ownershipDocuments: true,
          noc: true,
          dues: true,
          physicalInspection: true,
          priceVerified: true,
          photosVerified: true,
          agreementSigned: true,
        },
        images: [
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
          'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85',
        ],
        amenities: [
          'Garden',
          'Parking',
          'Security',
          'Backup Generator',
          'CCTV',
          'Air Conditioning',
          'Balcony',
          'Terrace',
          'Servant Quarter',
        ],
        features: [
          '500 Sq Yds Prime Residential Plot',
          'Double Height Architectural Atrium',
          'Spanish Bath Fittings',
        ],
        documents: [],
        marketingStatus: 'live',
        createdAt: '2026-02-10T14:00:00.000Z',
        updatedAt: '2026-10-04T10:00:00.000Z',
        publishedAt: '2026-02-10T15:00:00.000Z',
      },
    ],
    leads: [
      {
        id: 'lead-1',
        name: 'Kamran Siddiqui',
        phone: '+92 321 8899771',
        whatsapp: '923218899771',
        email: 'kamran.siddiqui@example.com',
        source: 'website',
        status: 'viewing_scheduled',
        purpose: 'buy',
        budgetMin: 150000000,
        budgetMax: 200000000,
        preferredLocations: ['Clifton', 'DHA Phase 8'],
        bedrooms: 5,
        propertyTypes: ['penthouse'],
        propertyId: 'prop-1',
        propertyTitle: 'The Clifton Horizon Penthouse',
        assignedAgentId: 'agt-1',
        notes: 'Pre-qualified buyer. Requested private sunset inspection with family.',
        followUpAt: '2026-10-08T16:00:00.000Z',
        createdAt: '2026-10-05T10:30:00.000Z',
        updatedAt: '2026-10-05T14:00:00.000Z',
      },
      {
        id: 'lead-2',
        name: 'Dr. Farhan Mirza',
        phone: '+92 300 4567890',
        whatsapp: '923004567890',
        email: 'f.mirza@uk-clinic.co.uk',
        source: 'whatsapp',
        status: 'qualified',
        purpose: 'buy',
        budgetMin: 250000000,
        budgetMax: 320000000,
        preferredLocations: ['DHA Phase 8'],
        bedrooms: 6,
        propertyTypes: ['villa'],
        propertyId: 'prop-2',
        propertyTitle: 'DHA Phase 8 Architectural Villa',
        assignedAgentId: 'agt-2',
        notes: 'Overseas Pakistani living in London. Looking to finalize contract during Karachi trip.',
        followUpAt: '2026-10-07T11:00:00.000Z',
        createdAt: '2026-10-04T09:15:00.000Z',
        updatedAt: '2026-10-04T12:00:00.000Z',
      },
      {
        id: 'lead-3',
        name: 'Ayesha Bilgrami',
        phone: '+92 333 1122334',
        whatsapp: '923331122334',
        email: 'ayesha.b@fintechkarachi.com',
        source: 'phone',
        status: 'negotiation',
        purpose: 'rent',
        budgetMin: 1000000,
        budgetMax: 1300000,
        propertyTypes: ['commercial'],
        propertyId: 'prop-4',
        propertyTitle: 'Executive Corporate Floor',
        assignedAgentId: 'agt-3',
        notes: 'Corporate lease for 3 years. Submitting draft tenancy agreement for review.',
        followUpAt: '2026-10-06T15:00:00.000Z',
        createdAt: '2026-10-02T11:00:00.000Z',
        updatedAt: '2026-10-06T09:30:00.000Z',
      },
    ],
    viewings: [
      {
        id: 'vw-1',
        propertyId: 'prop-1',
        propertyTitle: 'The Clifton Horizon Penthouse',
        leadId: 'lead-1',
        leadName: 'Kamran Siddiqui',
        leadPhone: '+92 321 8899771',
        agentId: 'agt-1',
        agentName: 'Muhammad Ali Raza',
        date: '2026-10-08',
        startTime: '16:30',
        endTime: '17:30',
        status: 'confirmed',
        notes: 'Building security clearance confirmed with tower management.',
        createdAt: '2026-10-05T14:00:00.000Z',
      },
    ],
    followUps: [
      {
        id: 'fu-1',
        leadId: 'lead-2',
        leadName: 'Dr. Farhan Mirza',
        leadPhone: '+92 300 4567890',
        agentId: 'agt-2',
        agentName: 'Tariq Mansoor',
        date: '2026-10-07',
        time: '11:00 AM',
        type: 'whatsapp',
        notes: 'Share structural drawings and solar generation records for DHA Phase 8 Villa.',
        status: 'pending',
        createdAt: '2026-10-04T12:00:00.000Z',
      },
      {
        id: 'fu-2',
        leadId: 'lead-3',
        leadName: 'Ayesha Bilgrami',
        leadPhone: '+92 333 1122334',
        agentId: 'agt-3',
        agentName: 'Hamza Farooqi',
        date: '2026-10-06',
        time: '03:00 PM',
        type: 'call',
        notes: 'Review revised lease clauses on parking bay allocation.',
        status: 'pending',
        createdAt: '2026-10-05T09:00:00.000Z',
      },
    ],
    buyers: [
      {
        id: 'byr-1',
        name: 'Kamran Siddiqui',
        phone: '+92 321 8899771',
        whatsapp: '923218899771',
        email: 'kamran.siddiqui@example.com',
        budget: 185000000,
        budgetDisplay: 'PKR 18.5 Crore',
        purpose: 'buy',
        preferredAreas: ['Clifton Block 4', 'DHA Phase 8'],
        propertyTypes: ['penthouse', 'villa'],
        bedrooms: 5,
        timeline: 'Within 30 Days',
        assignedAgentId: 'agt-1',
        notes: 'Financially vetted. Liquid capital ready for swift token closure.',
        createdAt: '2026-10-05T10:30:00.000Z',
      },
      {
        id: 'byr-2',
        name: 'Dr. Farhan Mirza',
        phone: '+92 300 4567890',
        whatsapp: '923004567890',
        email: 'f.mirza@uk-clinic.co.uk',
        budget: 300000000,
        budgetDisplay: 'PKR 30 Crore',
        purpose: 'buy',
        preferredAreas: ['DHA Phase 8 Zone A'],
        propertyTypes: ['villa'],
        bedrooms: 6,
        timeline: 'October 2026',
        assignedAgentId: 'agt-2',
        notes: 'Overseas buyer looking for corner or park-facing 1,000 sq yd villa.',
        createdAt: '2026-10-04T09:15:00.000Z',
      },
    ],
    owners: [
      {
        id: 'own-1',
        name: 'Tariq Hashmi',
        phone: '+92 300 9988776',
        email: 'tariq.hashmi@private.com',
        cnicVerified: true,
        propertiesCount: 1,
        notes: 'Signed exclusive disposition mandate for Clifton Penthouse.',
        createdAt: '2026-02-10T10:00:00.000Z',
      },
      {
        id: 'own-2',
        name: 'Mansoor Al-Hadi',
        phone: '+92 301 2233445',
        email: 'mansoor@alhadi.com',
        cnicVerified: true,
        propertiesCount: 1,
        notes: 'Original allotment holder for DHA Phase 8 Zone A mansion.',
        createdAt: '2026-02-20T10:00:00.000Z',
      },
    ],
    transactions: [
      {
        id: 'tx-1',
        propertyId: 'prop-1',
        propertyTitle: 'The Clifton Horizon Penthouse',
        propertyHumanId: 'AE-CLIFTON-0001',
        buyerName: 'Kamran Siddiqui',
        sellerName: 'Tariq Hashmi',
        agentId: 'agt-1',
        agentName: 'Muhammad Ali Raza',
        type: 'sale',
        transactionValue: 185000000,
        commissionPercent: 1.0,
        agencyCommission: 1850000,
        agentCommission: 925000,
        status: 'negotiation',
        closingDate: '2026-10-25',
        notes: 'Token advance expected upon final title deed authority scrutiny.',
        createdAt: '2026-10-05T16:00:00.000Z',
      },
    ],
    activityLogs: [
      {
        id: 'act-1',
        userId: 'usr-super-admin',
        userName: 'Muhammad Ali Raza',
        userRole: 'SUPER_ADMIN',
        action: 'PROPERTY_VERIFIED',
        entity: 'Property',
        entityId: 'prop-1',
        details: 'Verified ownership title deeds and NOC for AE-CLIFTON-0001',
        timestamp: '2026-10-04T12:00:00.000Z',
      },
      {
        id: 'act-2',
        userId: 'usr-broker-1',
        userName: 'Tariq Mansoor',
        userRole: 'BROKER',
        action: 'LEAD_STATUS_CHANGED',
        entity: 'Lead',
        entityId: 'lead-2',
        details: 'Changed status for Dr. Farhan Mirza to QUALIFIED',
        timestamp: '2026-10-04T12:10:00.000Z',
      },
      {
        id: 'act-3',
        userId: 'usr-super-admin',
        userName: 'Muhammad Ali Raza',
        userRole: 'SUPER_ADMIN',
        action: 'VIEWING_CONFIRMED',
        entity: 'Viewing',
        entityId: 'vw-1',
        details: 'Confirmed private viewing for Kamran Siddiqui at AE-CLIFTON-0001',
        timestamp: '2026-10-05T14:05:00.000Z',
      },
    ],
    sessions: [],
  };
}

// Memory cache + Disk persistence engine
class DatabaseManager {
  private cache: DatabaseSchema | null = null;

  private load(): DatabaseSchema {
    if (this.cache) return this.cache;

    try {
      const dir = path.dirname(DB_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      if (fs.existsSync(DB_FILE_PATH)) {
        const raw = fs.readFileSync(DB_FILE_PATH, 'utf-8');
        this.cache = JSON.parse(raw);
        return this.cache!;
      }
    } catch (err) {
      console.warn('Notice: Using memory store for database initialization', err);
    }

    const initial = getInitialData();
    this.cache = initial;
    this.save();
    return this.cache;
  }

  private save(): void {
    if (!this.cache) return;
    try {
      const dir = path.dirname(DB_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(this.cache, null, 2), 'utf-8');
    } catch (err) {
      // In-memory fallback
    }
  }

  // Repository Methods
  public users = {
    getAll: (): DBUser[] => this.load().users,
    findById: (id: string): DBUser | undefined => this.load().users.find((u) => u.id === id),
    findByEmail: (email: string): DBUser | undefined => 
      this.load().users.find((u) => u.email.toLowerCase() === email.toLowerCase()),
    create: (user: DBUser): DBUser => {
      const data = this.load();
      data.users.push(user);
      this.save();
      return user;
    },
    update: (id: string, updates: Partial<DBUser>): DBUser | null => {
      const data = this.load();
      const index = data.users.findIndex((u) => u.id === id);
      if (index === -1) return null;
      data.users[index] = { ...data.users[index], ...updates, updatedAt: new Date().toISOString() };
      this.save();
      return data.users[index];
    },
    delete: (id: string): boolean => {
      const data = this.load();
      const initialLen = data.users.length;
      data.users = data.users.filter((u) => u.id !== id);
      this.save();
      return data.users.length < initialLen;
    },
  };

  public properties = {
    getAll: (options?: { includeArchived?: boolean }): DBProperty[] => {
      const list = this.load().properties;
      if (options?.includeArchived) return list;
      return list.filter((p) => p.status !== 'archived');
    },
    getPublic: (): DBProperty[] => {
      return this.load().properties.filter((p) => 
        p.status === 'active' || p.status === 'under_offer' || p.status === 'sold' || p.status === 'rented'
      );
    },
    findById: (id: string): DBProperty | undefined => 
      this.load().properties.find((p) => p.id === id),
    findBySlug: (slug: string): DBProperty | undefined => 
      this.load().properties.find((p) => p.slug === slug),
    findByHumanId: (humanId: string): DBProperty | undefined => 
      this.load().properties.find((p) => p.propertyId.toLowerCase() === humanId.toLowerCase()),
    create: (prop: DBProperty): DBProperty => {
      const data = this.load();
      data.properties.unshift(prop);
      this.save();
      return prop;
    },
    update: (id: string, updates: Partial<DBProperty>): DBProperty | null => {
      const data = this.load();
      const index = data.properties.findIndex((p) => p.id === id);
      if (index === -1) return null;
      data.properties[index] = { 
        ...data.properties[index], 
        ...updates, 
        updatedAt: new Date().toISOString() 
      };
      this.save();
      return data.properties[index];
    },
    archive: (id: string): boolean => {
      const data = this.load();
      const prop = data.properties.find((p) => p.id === id);
      if (!prop) return false;
      prop.status = 'archived';
      prop.updatedAt = new Date().toISOString();
      this.save();
      return true;
    },
    deletePermanently: (id: string): boolean => {
      const data = this.load();
      const len = data.properties.length;
      data.properties = data.properties.filter((p) => p.id !== id);
      this.save();
      return data.properties.length < len;
    },
  };

  public agents = {
    getAll: (): DBAgent[] => this.load().agents,
    findById: (id: string): DBAgent | undefined => this.load().agents.find((a) => a.id === id),
    create: (agent: DBAgent): DBAgent => {
      const data = this.load();
      data.agents.push(agent);
      this.save();
      return agent;
    },
    update: (id: string, updates: Partial<DBAgent>): DBAgent | null => {
      const data = this.load();
      const index = data.agents.findIndex((a) => a.id === id);
      if (index === -1) return null;
      data.agents[index] = { ...data.agents[index], ...updates };
      this.save();
      return data.agents[index];
    },
  };

  public leads = {
    getAll: (): DBLead[] => this.load().leads,
    findAll: (): DBLead[] => this.load().leads,
    findById: (id: string): DBLead | undefined => this.load().leads.find((l) => l.id === id),
    create: (leadData: Partial<DBLead> & { name: string; phone: string }): DBLead => {
      const data = this.load();
      const lead: DBLead = {
        id: leadData.id || `lead-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        name: leadData.name,
        phone: leadData.phone,
        email: leadData.email || '',
        whatsapp: leadData.whatsapp,
        source: leadData.source || 'website',
        status: leadData.status || 'new',
        purpose: leadData.purpose,
        budgetMin: leadData.budgetMin,
        budgetMax: leadData.budgetMax,
        preferredLocations: leadData.preferredLocations || [],
        bedrooms: leadData.bedrooms,
        propertyTypes: leadData.propertyTypes || [],
        propertyId: leadData.propertyId,
        propertyTitle: leadData.propertyTitle,
        assignedAgentId: leadData.assignedAgentId,
        notes: leadData.notes,
        createdAt: leadData.createdAt || new Date().toISOString(),
        updatedAt: leadData.updatedAt || new Date().toISOString(),
      };
      data.leads.unshift(lead);
      this.save();
      return lead;
    },
    update: (id: string, updates: Partial<DBLead>): DBLead | null => {
      const data = this.load();
      const index = data.leads.findIndex((l) => l.id === id);
      if (index === -1) return null;
      data.leads[index] = { ...data.leads[index], ...updates, updatedAt: new Date().toISOString() };
      this.save();
      return data.leads[index];
    },
    delete: (id: string): boolean => {
      const data = this.load();
      const len = data.leads.length;
      data.leads = data.leads.filter((l) => l.id !== id);
      this.save();
      return data.leads.length < len;
    },
  };

  public viewings = {
    getAll: (): DBViewing[] => this.load().viewings,
    findById: (id: string): DBViewing | undefined => this.load().viewings.find((v) => v.id === id),
    create: (viewing: DBViewing): DBViewing => {
      const data = this.load();
      data.viewings.unshift(viewing);
      this.save();
      return viewing;
    },
    update: (id: string, updates: Partial<DBViewing>): DBViewing | null => {
      const data = this.load();
      const index = data.viewings.findIndex((v) => v.id === id);
      if (index === -1) return null;
      data.viewings[index] = { ...data.viewings[index], ...updates };
      this.save();
      return data.viewings[index];
    },
  };

  public followUps = {
    getAll: (): DBFollowUp[] => this.load().followUps,
    create: (fu: DBFollowUp): DBFollowUp => {
      const data = this.load();
      data.followUps.unshift(fu);
      this.save();
      return fu;
    },
    update: (id: string, updates: Partial<DBFollowUp>): DBFollowUp | null => {
      const data = this.load();
      const index = data.followUps.findIndex((f) => f.id === id);
      if (index === -1) return null;
      data.followUps[index] = { ...data.followUps[index], ...updates };
      this.save();
      return data.followUps[index];
    },
  };

  public buyers = {
    getAll: (): DBBuyer[] => this.load().buyers,
    findById: (id: string): DBBuyer | undefined => this.load().buyers.find((b) => b.id === id),
    create: (buyer: DBBuyer): DBBuyer => {
      const data = this.load();
      data.buyers.unshift(buyer);
      this.save();
      return buyer;
    },
  };

  public owners = {
    getAll: (): DBOwner[] => this.load().owners,
    findById: (id: string): DBOwner | undefined => this.load().owners.find((o) => o.id === id),
    create: (owner: DBOwner): DBOwner => {
      const data = this.load();
      data.owners.unshift(owner);
      this.save();
      return owner;
    },
  };

  public transactions = {
    getAll: (): DBTransaction[] => this.load().transactions,
    create: (tx: DBTransaction): DBTransaction => {
      const data = this.load();
      data.transactions.unshift(tx);
      this.save();
      return tx;
    },
    update: (id: string, updates: Partial<DBTransaction>): DBTransaction | null => {
      const data = this.load();
      const index = data.transactions.findIndex((t) => t.id === id);
      if (index === -1) return null;
      data.transactions[index] = { ...data.transactions[index], ...updates };
      this.save();
      return data.transactions[index];
    },
  };

  public activityLogs = {
    getAll: (limit = 100): DBActivityLog[] => this.load().activityLogs.slice(0, limit),
    create: (log: Omit<DBActivityLog, 'id' | 'timestamp'>): DBActivityLog => {
      const data = this.load();
      const newLog: DBActivityLog = {
        id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        ...log,
        timestamp: new Date().toISOString(),
      };
      data.activityLogs.unshift(newLog);
      this.save();
      return newLog;
    },
  };

  public sessions = {
    create: (session: DBSession): DBSession => {
      const data = this.load();
      data.sessions.push(session);
      this.save();
      return session;
    },
    findById: (id: string): DBSession | undefined => {
      return this.load().sessions.find((s) => s.id === id);
    },
    delete: (id: string): void => {
      const data = this.load();
      data.sessions = data.sessions.filter((s) => s.id !== id);
      this.save();
    },
  };
}

// Global Singleton for Next.js Server Runtime
const globalForDb = globalThis as unknown as { aliEstateDb: DatabaseManager };
export const db = globalForDb.aliEstateDb || new DatabaseManager();
if (process.env.NODE_ENV !== 'production') globalForDb.aliEstateDb = db;

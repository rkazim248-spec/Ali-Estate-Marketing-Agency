/**
 * Property Data & Types
 * Sample listings for Ali Estate & Marketing Agency
 * Note: Sample properties for presentation purposes.
 */

export type PropertyType = 
  | 'Villa'
  | 'Apartment'
  | 'Penthouse'
  | 'Townhouse'
  | 'Commercial'
  | 'Plot / Land';

export type PropertyStatus = 'Buy' | 'Rent';

export interface PropertyAmenity {
  id: string;
  name: string;
  icon: string; // Lucide icon key
}

export interface PropertyAgent {
  name: string;
  role: string;
  phone: string;
  email: string;
  whatsapp: string;
  image: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  location: string;
  neighborhood: string;
  city: string;
  country: string;
  price: number; // in PKR
  priceDisplay: string;
  type: PropertyType;
  status: PropertyStatus;
  bedrooms: number;
  bathrooms: number;
  area: number;
  areaUnit: string; // e.g. "Sq Ft" or "Sq Yds"
  coveredArea?: string;
  plotArea?: string;
  parkingSpaces: number;
  yearBuilt?: number;
  featured: boolean;
  isExclusive?: boolean;
  images: string[];
  description: string;
  longDescription: string[];
  features: string[];
  amenities: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  agent: PropertyAgent;
  dateListed: string;
}

export const PROPERTIES: Property[] = [
  {
    id: "prop-1",
    slug: "the-clifton-horizon-penthouse",
    title: "The Clifton Horizon Penthouse",
    subtitle: "Duplex penthouse overlooking the Arabian Sea with private infinity terrace",
    location: "Block 4, Clifton",
    neighborhood: "Clifton",
    city: "Karachi",
    country: "Pakistan",
    price: 185000000,
    priceDisplay: "PKR 185,000,000",
    type: "Penthouse",
    status: "Buy",
    bedrooms: 5,
    bathrooms: 6,
    area: 6400,
    areaUnit: "Sq Ft",
    coveredArea: "6,400 Sq Ft",
    plotArea: "Duplex Rooftop",
    parkingSpaces: 4,
    yearBuilt: 2024,
    featured: true,
    isExclusive: true,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85"
    ],
    description: "An extraordinary duplex residence perched atop Clifton's skyline, offering panoramic Arabian sea vistas, Italian marble finishes, automated smart home infrastructure, and an expansive private terrace.",
    longDescription: [
      "Positioned in the prime enclave of Clifton Block 4, this penthouse represents the absolute pinnacle of contemporary urban living in Karachi.",
      "Spanning two full levels connected by a sculptural floating staircase, the residence features expansive double-height living spaces, floor-to-ceiling soundproof glass panels, and a bespoke Poliform kitchen equipped with premium German appliances.",
      "The master suite encompasses an entire wing, featuring dual walk-in dressing suites, an ensuite sanctuary with freestanding stone soaking tub, and uninterrupted sunset views over the coastal waters."
    ],
    features: [
      "Direct Private Keycard Elevator",
      "Imported Calacatta Marble Throughout",
      "Crestron Smart Automation",
      "3-Sided Panoramic Sea Views",
      "Separate Maid & Driver Quarters",
      "Dual Dedicated Utility Backup"
    ],
    amenities: [
      "Swimming Pool",
      "Gym",
      "Parking",
      "Security",
      "Backup Generator",
      "Elevator",
      "CCTV",
      "Air Conditioning",
      "Balcony",
      "Terrace",
      "Servant Quarter"
    ],
    coordinates: {
      lat: 24.8182,
      lng: 67.0289
    },
    agent: {
      name: "Ali Raza Khan",
      role: "Principal Real Estate Consultant",
      phone: "+92 300 123 4567",
      email: "ali.raza@ali-estate.agency",
      whatsapp: "923001234567",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"
    },
    dateListed: "2026-02-15"
  },
  {
    id: "prop-2",
    slug: "dha-phase-8-architectural-villa",
    title: "DHA Phase 8 Architectural Villa",
    subtitle: "Custom-built 1,000 sq yd modern minimalist mansion with private pool & courtyard",
    location: "Zone A, DHA Phase 8",
    neighborhood: "DHA Phase 8",
    city: "Karachi",
    country: "Pakistan",
    price: 295000000,
    priceDisplay: "PKR 295,000,000",
    type: "Villa",
    status: "Buy",
    bedrooms: 6,
    bathrooms: 7,
    area: 9000,
    areaUnit: "Sq Ft",
    coveredArea: "9,000 Sq Ft",
    plotArea: "1,000 Sq Yds",
    parkingSpaces: 6,
    yearBuilt: 2025,
    featured: true,
    isExclusive: true,
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1600&q=85"
    ],
    description: "A masterwork of contemporary architecture featuring warm textured stone, tranquil water features, private internal courtyard, and lap swimming pool in Karachi's premier coastal zone.",
    longDescription: [
      "Conceived by leading regional architects, this sprawling DHA Phase 8 villa integrates indoor and outdoor spaces through sliding glass curtain walls.",
      "The lower level hosts expansive formal and casual salons, a private state-of-the-art cinema room, and an executive home office overlooking lush landscaped perimeter gardens.",
      "Constructed to earthquake-resistant specifications with high-grade European fittings and 100% solar hybrid power integration."
    ],
    features: [
      "1,000 Sq Yds Prime Corner Plot",
      "Private Heated Lap Pool",
      "Basement Home Cinema & Lounge",
      "Solar Hybrid 40kW Inverter System",
      "Dedicated Guard Room & 2 Servant Quarters",
      "Security Vault Room"
    ],
    amenities: [
      "Swimming Pool",
      "Garden",
      "Parking",
      "Security",
      "Backup Generator",
      "CCTV",
      "Air Conditioning",
      "Terrace",
      "Servant Quarter"
    ],
    coordinates: {
      lat: 24.7745,
      lng: 67.0784
    },
    agent: {
      name: "Tariq Mansoor",
      role: "Senior Luxury Property Advisor",
      phone: "+92 301 987 6543",
      email: "tariq.mansoor@ali-estate.agency",
      whatsapp: "923019876543",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80"
    },
    dateListed: "2026-03-01"
  },
  {
    id: "prop-3",
    slug: "emaar-coral-towers-luxury-residence",
    title: "Emaar Oceanfront Coral Residence",
    subtitle: "High-floor seaside luxury apartment with sunset balcony and resort amenities",
    location: "Emaar Oceanfront, DHA Phase 8",
    neighborhood: "Emaar Oceanfront",
    city: "Karachi",
    country: "Pakistan",
    price: 92000000,
    priceDisplay: "PKR 92,000,000",
    type: "Apartment",
    status: "Buy",
    bedrooms: 3,
    bathrooms: 4,
    area: 2850,
    areaUnit: "Sq Ft",
    coveredArea: "2,850 Sq Ft",
    plotArea: "Apartment Unit",
    parkingSpaces: 2,
    yearBuilt: 2023,
    featured: true,
    isExclusive: false,
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=85"
    ],
    description: "Enjoy prestigious beachfront living within the secure gated precinct of Emaar Oceanfront. Features open-plan living, designer cabinetry, and panoramic maritime views.",
    longDescription: [
      "Situated along the Arabian coastline, this 3-bedroom luxury flat offers tranquil resort-style living with urban accessibility.",
      "Residents enjoy access to a private beach club, infinity swimming pool, children's play parks, state-of-the-art wellness club, and around-the-clock international concierge service."
    ],
    features: [
      "Direct Promenade Beach Access",
      "24/7 Gated Security & Concierge",
      "Imported German Sanitaryware",
      "Covered Reserved Parking Spaces"
    ],
    amenities: [
      "Swimming Pool",
      "Gym",
      "Parking",
      "Security",
      "Backup Generator",
      "Elevator",
      "CCTV",
      "Air Conditioning",
      "Balcony"
    ],
    coordinates: {
      lat: 24.7812,
      lng: 67.0691
    },
    agent: {
      name: "Ali Raza Khan",
      role: "Principal Real Estate Consultant",
      phone: "+92 300 123 4567",
      email: "ali.raza@ali-estate.agency",
      whatsapp: "923001234567",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"
    },
    dateListed: "2026-01-20"
  },
  {
    id: "prop-4",
    slug: "executive-commercial-floor-clifton",
    title: "Executive Corporate Floor",
    subtitle: "Turnkey A-Grade corporate office floor in Karachi's prime financial belt",
    location: "Main Clifton Road, Block 5",
    neighborhood: "Clifton",
    city: "Karachi",
    country: "Pakistan",
    price: 1200000,
    priceDisplay: "PKR 1,200,000 / mo",
    type: "Commercial",
    status: "Rent",
    bedrooms: 0,
    bathrooms: 6,
    area: 7500,
    areaUnit: "Sq Ft",
    coveredArea: "7,500 Sq Ft",
    plotArea: "Full Corporate Floor",
    parkingSpaces: 8,
    yearBuilt: 2022,
    featured: true,
    isExclusive: true,
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=85"
    ],
    description: "Premium commercial floor suited for multinationals, financial advisories, or fintech headquarters. High-speed elevators, biometric access, dual fiber connectivity, and dedicated visitor parking.",
    longDescription: [
      "An immaculate commercial floor featuring column-free open workspaces, five partitioned executive suites, two state-of-the-art conference rooms, and a modern staff cafeteria.",
      "Backed by triple redundant generator systems and 24/7 security control."
    ],
    features: [
      "Grade-A Corporate Tower",
      "High-Speed Fiber Infrastructure",
      "8 Dedicated Basement Car Stalls",
      "Fire Suppression & HVAC Central System"
    ],
    amenities: [
      "Parking",
      "Security",
      "Backup Generator",
      "Elevator",
      "CCTV",
      "Air Conditioning"
    ],
    coordinates: {
      lat: 24.8251,
      lng: 67.0345
    },
    agent: {
      name: "Hamza Farooqi",
      role: "Commercial & Corporate Broker",
      phone: "+92 321 456 7890",
      email: "hamza.farooqi@ali-estate.agency",
      whatsapp: "923214567890",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
    },
    dateListed: "2026-02-28"
  },
  {
    id: "prop-5",
    slug: "dha-phase-6-contemporary-designer-home",
    title: "DHA Phase 6 Designer Residence",
    subtitle: "500 sq yd newly completed luxury residence with double height lobby & basement",
    location: "Bukhari Commercial Vicinity, DHA Phase 6",
    neighborhood: "DHA Phase 6",
    city: "Karachi",
    country: "Pakistan",
    price: 175000000,
    priceDisplay: "PKR 175,000,000",
    type: "Villa",
    status: "Buy",
    bedrooms: 5,
    bathrooms: 6,
    area: 5500,
    areaUnit: "Sq Ft",
    coveredArea: "5,500 Sq Ft",
    plotArea: "500 Sq Yds",
    parkingSpaces: 4,
    yearBuilt: 2024,
    featured: false,
    isExclusive: false,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=85"
    ],
    description: "Striking clean lines, warm oak millwork, custom bronze fixtures, and an expansive light-filled layout in one of DHA's most demanded residential lanes.",
    longDescription: [
      "Designed for a modern family who appreciates craftsmanship. Highlights include double glazed European windows, a designer dirty kitchen, imported Spanish porcelain tiling, and a rooftop barbecue gazebo."
    ],
    features: [
      "500 Sq Yds Prime Residential Plot",
      "Double Height Architectural Atrium",
      "Spanish Grohe & Kohler Bath Fittings",
      "Rooftop Entertainment Deck"
    ],
    amenities: [
      "Garden",
      "Parking",
      "Security",
      "Backup Generator",
      "CCTV",
      "Air Conditioning",
      "Balcony",
      "Terrace",
      "Servant Quarter"
    ],
    coordinates: {
      lat: 24.8011,
      lng: 67.0622
    },
    agent: {
      name: "Tariq Mansoor",
      role: "Senior Luxury Property Advisor",
      phone: "+92 301 987 6543",
      email: "tariq.mansoor@ali-estate.agency",
      whatsapp: "923019876543",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80"
    },
    dateListed: "2026-02-10"
  },
  {
    id: "prop-6",
    slug: "clifton-sea-view-luxury-rental-residence",
    title: "Sea View Executive Apartment",
    subtitle: "Fully furnished 4-bedroom beachfront apartment for corporate lease",
    location: "Sea View Road, Clifton",
    neighborhood: "Clifton",
    city: "Karachi",
    country: "Pakistan",
    price: 450000,
    priceDisplay: "PKR 450,000 / mo",
    type: "Apartment",
    status: "Rent",
    bedrooms: 4,
    bathrooms: 4,
    area: 3200,
    areaUnit: "Sq Ft",
    coveredArea: "3,200 Sq Ft",
    plotArea: "Apartment Unit",
    parkingSpaces: 2,
    yearBuilt: 2021,
    featured: false,
    isExclusive: true,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85"
    ],
    description: "Tailored for expatriate executives and multinational leaders. Fully furnished with contemporary bespoke furniture, high-speed Wi-Fi, full sea view balcony, and housekeeping options.",
    longDescription: [
      "Located in an exceptionally secure boutique apartment complex overlooking the Arabian Sea, this turnkey residence provides complete peace of mind, premium backup utilities, and tranquil coastal living."
    ],
    features: [
      "Unobstructed Frontal Sea View",
      "Fully Furnished with Designer Decor",
      "Full Electricity Backup (Zero Outage)",
      "Dedicated Maid Quarters"
    ],
    amenities: [
      "Parking",
      "Security",
      "Backup Generator",
      "Elevator",
      "CCTV",
      "Air Conditioning",
      "Balcony",
      "Servant Quarter"
    ],
    coordinates: {
      lat: 24.8089,
      lng: 67.0398
    },
    agent: {
      name: "Ali Raza Khan",
      role: "Principal Real Estate Consultant",
      phone: "+92 300 123 4567",
      email: "ali.raza@ali-estate.agency",
      whatsapp: "923001234567",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"
    },
    dateListed: "2026-03-05"
  },
  {
    id: "prop-7",
    slug: "bahria-town-golf-estate-villa",
    title: "Golf View Luxury Estate Villa",
    subtitle: "800 sq yd Mediterranean villa overlooking the championship golf course greens",
    location: "Precinct 20, Bahria Golf City",
    neighborhood: "Bahria Town",
    city: "Karachi",
    country: "Pakistan",
    price: 115000000,
    priceDisplay: "PKR 115,000,000",
    type: "Villa",
    status: "Buy",
    bedrooms: 5,
    bathrooms: 6,
    area: 6800,
    areaUnit: "Sq Ft",
    coveredArea: "6,800 Sq Ft",
    plotArea: "800 Sq Yds",
    parkingSpaces: 4,
    yearBuilt: 2024,
    featured: true,
    isExclusive: false,
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85"
    ],
    description: "Serene fairway views, manicured lawns, Mediterranean clay tile accents, and lavish indoor entertaining suites situated in the prestigious Bahria Golf City community.",
    longDescription: [
      "Escape the city density with unmatched tranquility. This golf-facing villa includes private landscaped lawns, high ceilings, a grand master suite with veranda, and access to the country club and sports complex."
    ],
    features: [
      "Front Row Golf Course View",
      "Private Landscaped Lawn & Patio",
      "International Standard Gated Security",
      "Imported Marble Bathrooms"
    ],
    amenities: [
      "Garden",
      "Parking",
      "Security",
      "Backup Generator",
      "CCTV",
      "Air Conditioning",
      "Terrace",
      "Balcony",
      "Servant Quarter"
    ],
    coordinates: {
      lat: 25.0125,
      lng: 67.3255
    },
    agent: {
      name: "Tariq Mansoor",
      role: "Senior Luxury Property Advisor",
      phone: "+92 301 987 6543",
      email: "tariq.mansoor@ali-estate.agency",
      whatsapp: "923019876543",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80"
    },
    dateListed: "2026-01-14"
  },
  {
    id: "prop-8",
    slug: "prime-pechs-commercial-plot",
    title: "Prime Commercial Corner Plot",
    subtitle: "800 sq yd high-footfall commercial plot ideal for corporate headquarters or retail plaza",
    location: "Shahrah-e-Faisal Corridor, PECHS Block 6",
    neighborhood: "PECHS",
    city: "Karachi",
    country: "Pakistan",
    price: 340000000,
    priceDisplay: "PKR 340,000,000",
    type: "Plot / Land",
    status: "Buy",
    bedrooms: 0,
    bathrooms: 0,
    area: 7200,
    areaUnit: "Sq Ft",
    coveredArea: "Open Land",
    plotArea: "800 Sq Yds",
    parkingSpaces: 0,
    yearBuilt: undefined,
    featured: false,
    isExclusive: true,
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1600&q=85"
    ],
    description: "Clear title, prime commercial designation with direct high-visibility frontage along Karachi's central artery. Approved for multi-story mixed-use commercial development.",
    longDescription: [
      "Rarely available corner parcel with high FAR and floor construction allowances. Full documentation vetted by our legal advisory team."
    ],
    features: [
      "Prime Commercial Main Road Corner",
      "High FAR Building Permission",
      "100% Clear Verified Ownership Titles",
      "Direct Boulevard Ingress / Egress"
    ],
    amenities: [
      "Security",
      "CCTV"
    ],
    coordinates: {
      lat: 24.8615,
      lng: 67.0694
    },
    agent: {
      name: "Hamza Farooqi",
      role: "Commercial & Corporate Broker",
      phone: "+92 321 456 7890",
      email: "hamza.farooqi@ali-estate.agency",
      whatsapp: "923214567890",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
    },
    dateListed: "2026-03-02"
  }
];

export function getFeaturedProperties(): Property[] {
  return PROPERTIES.filter((p) => p.featured);
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return PROPERTIES.find((p) => p.slug === slug);
}

export function getRelatedProperties(currentSlug: string, limit = 3): Property[] {
  return PROPERTIES.filter((p) => p.slug !== currentSlug).slice(0, limit);
}

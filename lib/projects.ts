/**
 * Projects / Developments Dataset
 * Sample developments for Ali Estate & Marketing Agency
 * Note: Clearly marked sample/development data until replaced with official projects.
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
  isSampleContent: boolean;
}

export const PROJECTS: ProjectDevelopment[] = [
  {
    id: "proj-1",
    slug: "bay-view-towers",
    name: "Bay View Towers",
    developer: "Sample Developer Group",
    location: "Marine Promenade, Clifton Block 2",
    city: "Karachi",
    startingPrice: "PKR 65,000,000",
    startingPriceNumeric: 65000000,
    propertyTypes: ["3 & 4 Bed Luxury Apartments", "Sky Penthouses"],
    status: "Booking Open",
    completionDate: "Q4 2027",
    totalUnits: "128 Luxury Residences",
    coverImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85"
    ],
    headline: "Iconic 38-Story Coastal Landmark Offering Unbroken Sea Vistas",
    description: "Bay View Towers is a bold statement on Karachi's coastline. Featuring private double-glazed ocean balconies, private marina views, and five floors of dedicated resident amenities.",
    overview: [
      "Sample project profile: Architectural renderings and unit layouts are designed to illustrate modern high-rise living standards.",
      "Amenities include a private infinity rooftop pool, wellness spa, private business boardroom, valet parking, and international safety protocols."
    ],
    amenities: [
      "Rooftop Infinity Swimming Pool",
      "Executive Health Club & Spa",
      "Private Screening Cinema",
      "4-Level Basement Parking",
      "Continuous Power Generation",
      "24/7 Concierge & Security"
    ],
    isSampleContent: true
  },
  {
    id: "proj-2",
    slug: "grand-residences",
    name: "Grand Residences",
    developer: "Apex Property Holdings (Sample)",
    location: "Khayaban-e-Shamsheer, DHA Phase 5",
    city: "Karachi",
    startingPrice: "PKR 85,000,000",
    startingPriceNumeric: 85000000,
    propertyTypes: ["4 Bed Duplex Suites", "Executive Penthouses"],
    status: "Under Construction",
    completionDate: "Q2 2027",
    totalUnits: "64 Boutique Suites",
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85"
    ],
    headline: "Boutique Low-Density Living with Private Garden Terraces",
    description: "Grand Residences combines the privacy of individual estates with the security and maintenance of a managed boutique tower in prime DHA Phase 5.",
    overview: [
      "Sample project profile: Designed with European architectural standards, acoustic thermal insulation, and dedicated private elevator lobbies for each home."
    ],
    amenities: [
      "Private Elevators per Unit",
      "Lush Landscaped Podium Garden",
      "Temperature-Controlled Lap Pool",
      "Electric Vehicle Charging Bays",
      "Smart Building Automation"
    ],
    isSampleContent: true
  },
  {
    id: "proj-3",
    slug: "capital-heights",
    name: "Capital Heights",
    developer: "Metropolis Developments (Sample)",
    location: "Main Shahrah-e-Faisal",
    city: "Karachi",
    startingPrice: "PKR 45,000,000",
    startingPriceNumeric: 45000000,
    propertyTypes: ["Corporate Office Suites", "High-Street Retail"],
    status: "Newly Launched",
    completionDate: "Q1 2028",
    totalUnits: "220 Corporate Offices",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85"
    ],
    headline: "The New Benchmark for Mixed-Use Corporate Prestige",
    description: "Capital Heights addresses the rising demand for Grade-A smart corporate workspaces in Karachi's prime commercial thoroughfare.",
    overview: [
      "Sample project profile: High efficiency floor plates, LEED green building benchmarks, triple height entrance atrium, and integrated high-street dining."
    ],
    amenities: [
      "High-Speed Destination Elevators",
      "Conference Center & Auditoriums",
      "Fiber Mesh Connectivity",
      "Multi-Tier Security & Biometrics",
      "Centralized HVAC Chiller Plant"
    ],
    isSampleContent: true
  },
  {
    id: "proj-4",
    slug: "park-avenue-villas",
    name: "Park Avenue Villas",
    developer: "Greenfield Estates (Sample)",
    location: "Golf City Corridor, Bahria Town",
    city: "Karachi",
    startingPrice: "PKR 70,000,000",
    startingPriceNumeric: 70000000,
    propertyTypes: ["500 Sq Yd Luxury Villas", "Custom Plots"],
    status: "Ready for Possession",
    completionDate: "Immediate Handover",
    totalUnits: "45 Limited Edition Villas",
    coverImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=85"
    ],
    headline: "Gated Enclave of Contemporary Luxury Villas Overlooking the Park",
    description: "An exclusive gated development comprising contemporary 500 square yard villas, wide tree-lined boulevards, and private club amenities.",
    overview: [
      "Sample project profile: Fully built and ready for immediate occupation, offering spacious bedrooms, solar integration, and quiet residential neighborhood life."
    ],
    amenities: [
      "Private Community Clubhouse",
      "24/7 Armed Gated Perimeter Security",
      "Underground Electrification",
      "Jogging Track & Tennis Courts",
      "Dedicated Mosque & Community Center"
    ],
    isSampleContent: true
  }
];

export function getProjectBySlug(slug: string): ProjectDevelopment | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

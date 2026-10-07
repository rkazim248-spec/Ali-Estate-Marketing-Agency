/**
 * Areas & Prime Enclaves Knowledge Base
 * Genuine geographic expertise covering Karachi prime property locations.
 */

export interface AreaProfile {
  name: string;
  aliases: string[];
  description: string;
  propertyTypes: string[];
  keyHighlights: string[];
  priceBandSummary: string;
}

export const AI_AREAS_KNOWLEDGE: AreaProfile[] = [
  {
    name: "Clifton, Karachi",
    aliases: ["Clifton", "Block 2", "Block 4", "Block 5", "Block 8", "Sea View", "Marine Drive"],
    description: "One of Karachi's most historic and upscale coastal neighborhoods. Home to diplomatic missions, seaside penthouses, luxury high-rises, and prime commercial centers.",
    propertyTypes: ["Sky Penthouses", "Seafront Luxury Apartments", "Commercial Office Floors", "Independent Bungalows"],
    keyHighlights: ["Arabian Sea coastline vistas", "Proximity to high-end restaurants, malls, and schools", "Established infrastructure and high security"],
    priceBandSummary: "Luxury flats range from PKR 5 Crore to 20+ Crore; Penthouses up to PKR 25-35+ Crore."
  },
  {
    name: "DHA Karachi (Defence Housing Authority)",
    aliases: ["DHA", "Defence", "DHA Phase 8", "DHA Phase 6", "DHA Phase 5", "Khayaban-e-Ittehad", "Phase 8 Extension", "Creek Vista"],
    description: "The gold standard for residential and commercial prestige in Karachi. Spread across Phases 1 through 8, offering gated streets, wide boulevards, underground amenities, and private clubs.",
    propertyTypes: ["Architectural Luxury Villas (500 to 2000 Sq Yds)", "Duplex Residences", "Commercial Plots & High-Street Showrooms"],
    keyHighlights: ["DHA Golf Club, Creek Club, and Marina Clubs", "Exclusive residential zoning", "High capital liquidity and diaspora investor demand"],
    priceBandSummary: "500 Sq Yd luxury homes typically range from PKR 10 Crore to 25 Crore; 1,000+ Sq Yd estates range from PKR 25 Crore to 45+ Crore."
  },
  {
    name: "Emaar Oceanfront",
    aliases: ["Emaar", "Coral Towers", "Pearl Towers", "Emaar Karachi", "Reef Towers", "Crescent Bay"],
    description: "A self-contained master-planned beachfront community developed by Emaar Pakistan in DHA Phase 8 Zone D, featuring direct promenade access and 24/7 private concierge security.",
    propertyTypes: ["2, 3 & 4 Bed Luxury Apartments", "Ocean Penthouses", "Promenade Townhomes"],
    keyHighlights: ["Direct private beach club and seafront promenade", "Resort-style infinity pools, gyms, and children's play parks", "Complete backup power grid"],
    priceBandSummary: "Apartments start around PKR 6.5 Crore to 15+ Crore depending on floor and direct sea-facing alignment."
  },
  {
    name: "Bahria Town Karachi (Golf City)",
    aliases: ["Bahria Town", "Golf City", "Jinnah Avenue", "Bahria Karachi", "Precinct 1", "Precinct 20"],
    description: "Master-planned mega-community featuring international golf courses, private electric power grid with zero load-shedding, and wide landscaped avenues.",
    propertyTypes: ["500 Sq Yd & 1,000 Sq Yd Golf Villas", "Ready Built Homes", "Commercial Plots"],
    keyHighlights: ["Championship 36-hole golf course", "Independent uninterrupted power grid", "Advanced private hospital, international schools, and Danzoo"],
    priceBandSummary: "Luxury villas start from PKR 5 Crore to 12+ Crore."
  },
  {
    name: "PECHS & Main Shahrah-e-Faisal",
    aliases: ["PECHS", "Shahrah-e-Faisal", "Nursery", "Sindhi Muslim", "SMCHS", "Tariq Road Corridor"],
    description: "Central Karachi commercial nerve center and mature residential area. Main Shahrah-e-Faisal is the city's premier corporate spine hosting multinational headquarters and bank regional offices.",
    propertyTypes: ["Grade-A Commercial Floors", "Corporate Office Suites", "Residential Townhouses"],
    keyHighlights: ["Unrivaled central arterial connectivity across Karachi", "High commercial rental yields and rapid capital turnover"],
    priceBandSummary: "Corporate office suites range from PKR 3.5 Crore to 15+ Crore."
  }
];

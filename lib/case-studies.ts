/**
 * Case Studies Dataset
 * Property marketing case studies with transparent result placeholders
 */

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  projectType: string;
  location: string;
  year: string;
  coverImage: string;
  challenge: string;
  strategy: string;
  creativeDirection: string;
  campaignDetails: string[];
  results: Array<{
    label: string;
    value: string;
    placeholderNote?: string;
  }>;
  gallery: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "cs-1",
    slug: "clifton-waterfront-penthouse-campaign",
    title: "Positioning a Benchmark Sky Penthouse for Ultra-HNW Buyers",
    client: "Private Waterfront Estate Owner",
    projectType: "Luxury Penthouse Disposition",
    location: "Clifton Block 4, Karachi",
    year: "2025",
    coverImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
    challenge: "The property had lingered on traditional classified listings for eight months without serious offers due to poor uncurated mobile phone photos and generic broker descriptions.",
    strategy: "Reposition the property as an architectural collector's asset rather than merely square footage. Commissioned dusk architectural cinematography, designed a private digital brochure, and engaged non-resident Pakistani investor channels in Dubai and London.",
    creativeDirection: "Atmospheric, twilight luxury aesthetic emphasizing private horizon sea views, bespoke Italian joinery, and private elevator seclusion.",
    campaignDetails: [
      "4K Twilight architectural walkthrough video",
      "Private password-protected digital viewing portal",
      "Targeted Meta campaigns geo-restricted to DIFC, Kensington, and DHA Phase 8",
      "Executive outreach via Ali Estate private client network"
    ],
    results: [
      {
        label: "Qualified Inquiries",
        value: "Verified HNW Inquiries",
        placeholderNote: "Add client-verified figures"
      },
      {
        label: "Video Views",
        value: "High-Intent Reach",
        placeholderNote: "Add campaign impressions"
      },
      {
        label: "Time to Accepted Offer",
        value: "Sub-45 Days",
        placeholderNote: "Transacted within targeted window"
      },
      {
        label: "Campaign Duration",
        value: "6 Weeks",
        placeholderNote: "From launch to final contract"
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"
    ]
  },
  {
    id: "cs-2",
    slug: "dha-phase-8-villas-launch",
    title: "Bespoke Digital Pre-Launch for a Gated Enclave of Contemporary Mansions",
    client: "Prime Construction & Development Partners",
    projectType: "Multi-Unit Luxury Residential Launch",
    location: "DHA Phase 8, Karachi",
    year: "2025",
    coverImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85",
    challenge: "Generate early investor commitments prior to superstructure completion during an uncertain economic cycle.",
    strategy: "Built a cinematic 3D CGI teaser film, launched an interactive web project page, and ran pre-qualification WhatsApp ad funnels to schedule private boardroom preview sessions.",
    creativeDirection: "Focus on permanence, sustainable solar energy architecture, and generational wealth preservation.",
    campaignDetails: [
      "Full project naming, brand guidelines, and hardcover investor presentation dossiers",
      "Integrated Google Search + Meta funnel with automated SMS/WhatsApp RSVP confirmation",
      "Exclusive private launch event at a 5-star venue with curated guest list"
    ],
    results: [
      {
        label: "Qualified Investor Registrations",
        value: "Vetted Registrations",
        placeholderNote: "Add client-verified figures"
      },
      {
        label: "Early Allocations",
        value: "Phase 1 Subscribed",
        placeholderNote: "Add real allocation metrics"
      },
      {
        label: "Lead Cost Efficiency",
        value: "Optimized Cost/Lead",
        placeholderNote: "Add performance ROI metrics"
      },
      {
        label: "Campaign Duration",
        value: "8 Weeks",
        placeholderNote: "Pre-launch campaign timeline"
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85"
    ]
  }
];

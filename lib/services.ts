/**
 * Services Data & Types
 * Real Estate & Marketing Services for Ali Estate & Marketing Agency
 */

export interface ServiceItem {
  id: string;
  slug: string;
  category: 'real-estate' | 'marketing';
  number: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string; // Lucide icon name
  highlights: string[];
  deliverables?: string[];
  audience?: string;
}

export const REAL_ESTATE_SERVICES: ServiceItem[] = [
  {
    id: "re-buying",
    slug: "property-buying",
    category: "real-estate",
    number: "01",
    title: "Property Buying",
    shortDescription: "Bespoke acquisition advisory for luxury residences, commercial floors, and prime investment land.",
    fullDescription: "We act exclusively in your interest, curating off-market and prime on-market opportunities, handling meticulous legal title scrutiny, and securing favorable purchase terms.",
    iconName: "Home",
    highlights: [
      "Access to discrete off-market estates",
      "Rigorous legal & documentation due diligence",
      "Comparable market valuation analysis",
      "Strategic negotiation and price defense"
    ],
    audience: "High-net-worth buyers, overseas Pakistanis, families, and commercial entities"
  },
  {
    id: "re-selling",
    slug: "property-selling",
    category: "real-estate",
    number: "02",
    title: "Property Selling",
    shortDescription: "Strategic positioning, high-converting buyer qualification, and discreet transaction management.",
    fullDescription: "Selling high-value property requires more than a simple classified ad. We deploy agency-grade creative marketing, targeted investor matchmaking, and experienced negotiators to maximize sale value.",
    iconName: "TrendingUp",
    highlights: [
      "Asset positioning and price discovery",
      "Vetted buyer screening to eliminate window-shoppers",
      "High-end presentation package",
      "Seamless closing and fund transfer guidance"
    ],
    audience: "Homeowners, estate executors, private funds, and landlords"
  },
  {
    id: "re-renting",
    slug: "property-renting",
    category: "real-estate",
    number: "03",
    title: "Property Renting",
    shortDescription: "Premium leasing and corporate tenant matching for luxury homes and high-spec corporate offices.",
    fullDescription: "We connect property owners with top-tier corporate tenants, multinationals, and diplomatic missions, crafting robust tenancy agreements that protect asset yield and longevity.",
    iconName: "Key",
    highlights: [
      "Corporate & multinational tenant networking",
      "Background verification & financial solvency checks",
      "Comprehensive tenancy agreements",
      "Move-in inventory reporting & handover"
    ],
    audience: "Landlords and corporate relocation managers"
  },
  {
    id: "re-investment",
    slug: "property-investment",
    category: "real-estate",
    number: "04",
    title: "Property Investment",
    shortDescription: "Data-driven capital growth and rental yield advisory across Karachi's prime development belts.",
    fullDescription: "Our investment advisory provides institutional-grade market modeling, identifying undervalued micro-markets, emerging infrastructure corridors, and phased development gains.",
    iconName: "PieChart",
    highlights: [
      "Risk-adjusted ROI and cash-flow projections",
      "Emerging corridor analysis (Phase 8, Emaar, Motorway)",
      "Portfolio diversification strategies",
      "Exit timing and capital redeployment"
    ],
    audience: "Private investors, diaspora syndicates, and wealth offices"
  },
  {
    id: "re-management",
    slug: "property-management",
    category: "real-estate",
    number: "05",
    title: "Property Management",
    shortDescription: "Complete asset stewardship, maintenance oversight, tenant relations, and revenue collection.",
    fullDescription: "Particularly beneficial for non-resident Pakistanis and busy asset owners. We maintain your properties in pristine condition, collect rents on schedule, and resolve maintenance swiftly.",
    iconName: "ShieldCheck",
    highlights: [
      "Punctual rent collection & digital reporting",
      "Scheduled property physical inspections",
      "24/7 vetted vendor maintenance network",
      "Utility management & tax filings oversight"
    ],
    audience: "Overseas Pakistani property owners and multi-unit landlords"
  },
  {
    id: "re-valuation",
    slug: "property-valuation",
    category: "real-estate",
    number: "06",
    title: "Property Valuation",
    shortDescription: "Objective, market-grounded appraisal based on recent registered transactions and micro-trends.",
    fullDescription: "Avoid pricing blind spots. We produce comprehensive property valuation dossiers incorporating construction replacement costs, land appreciation indexes, and micro-location dynamics.",
    iconName: "FileCheck",
    highlights: [
      "Comparative market analysis (CMA)",
      "Replacement cost & depreciation assessment",
      "Rental yield capitalization models",
      "Formal advisory dossiers for buying/selling decisions"
    ],
    audience: "Buyers, sellers, estate planners, and corporate balance sheets"
  }
];

export const MARKETING_SERVICES: ServiceItem[] = [
  {
    id: "mkt-photography",
    slug: "property-photography",
    category: "marketing",
    number: "01",
    title: "Property Photography",
    shortDescription: "Architectural and interior photography that captures spatial grandeur, natural light, and finishes.",
    fullDescription: "We use wide-angle architectural shift lenses, HDR twilight captures, and high-end retouching to present each residence like an editorial spread in an international design magazine.",
    iconName: "Camera",
    highlights: [
      "Interior & exterior architectural compositions",
      "Golden hour & twilight ambient exposures",
      "Color-calibrated editorial color correction",
      "High-res web, print & billboard asset delivery"
    ],
    deliverables: ["25+ HDR retouched stills", "Virtual tour web files", "Social crop variants"]
  },
  {
    id: "mkt-video",
    slug: "video-drone",
    category: "marketing",
    number: "02",
    title: "Cinematic Video & Drone",
    shortDescription: "4K cinematic walkthroughs and FAA/CAA-compliant aerial cinematography highlighting the location.",
    fullDescription: "Buyers don't just buy square footage; they buy lifestyle. We direct cinematic walk-through video tours featuring smooth gimbal pans, lifestyle framing, and sweeping aerial drone overviews of the surrounding neighborhood.",
    iconName: "Video",
    highlights: [
      "4K 60fps stabilized gimbal interior tours",
      "Licensed aerial drone overview of surroundings",
      "Original sound design & voiceover narration",
      "Fast 60-second social reel edits + 3-minute executive tours"
    ],
    deliverables: ["Executive 4K video tour", "Instagram/TikTok vertical reels", "Drone aerial highlights"]
  },
  {
    id: "mkt-social",
    slug: "social-media-marketing",
    category: "marketing",
    number: "03",
    title: "Social Media Marketing",
    shortDescription: "High-impact social campaigns across Instagram, Facebook, LinkedIn, TikTok, and YouTube.",
    fullDescription: "We transform properties into trending visual narratives. Our social management builds anticipation, targets active property seekers, and reaches affluent overseas investors across the Gulf, UK, and North America.",
    iconName: "Share2",
    highlights: [
      "Curated Instagram aesthetics & architectural carousels",
      "High-engagement TikTok / Reels viral formats",
      "LinkedIn executive networking for commercial assets",
      "Community management and rapid inquiry qualification"
    ],
    deliverables: ["Monthly content calendar", "Original reel productions", "Targeted diaspora campaigns"]
  },
  {
    id: "mkt-ads",
    slug: "paid-advertising",
    category: "marketing",
    number: "04",
    title: "Paid Performance Advertising",
    shortDescription: "Laser-targeted Meta, Google Ads, and YouTube campaigns driven by strict cost-per-lead metrics.",
    fullDescription: "No wasted impressions. We use geo-fenced targeting, high-net-worth audience profiling, and custom lookalikes to place your property or new project directly in front of active qualified buyers.",
    iconName: "Target",
    highlights: [
      "Meta Ads (Facebook & Instagram Lead Generation)",
      "Google Search & Intent-driven Keyword Ads",
      "YouTube Video in-stream property ads",
      "Conversion tracking, retargeting & CRM integration"
    ],
    deliverables: ["Campaign structure & setup", "Weekly ROI analytics dashboard", "Qualified lead transfer"]
  },
  {
    id: "mkt-branding",
    slug: "branding",
    category: "marketing",
    number: "05",
    title: "Property & Project Branding",
    shortDescription: "Complete brand identities for developers, landmark towers, gated enclaves, and boutique projects.",
    fullDescription: "From nomenclature and logo design to luxury hardcover sales brochures and 3D architectural identity, we establish an aura of prestige that commands premium price-per-square-foot.",
    iconName: "Sparkles",
    highlights: [
      "Project nomenclature & brand positioning strategy",
      "Logo, typography & luxury brand guideline books",
      "Hardcover sales pitch books & foil-stamped brochures",
      "Site signage, hoarding banners & sales center collateral"
    ],
    deliverables: ["Brand identity manual", "Print brochure templates", "Digital brand toolkit"]
  },
  {
    id: "mkt-digital",
    slug: "digital-marketing",
    category: "marketing",
    number: "06",
    title: "Digital Marketing & Web",
    shortDescription: "High-converting standalone project landing pages, SEO, automated email flows, and CRM pipelines.",
    fullDescription: "We build bespoke, lightning-fast digital presentation pages for property developments, paired with search engine optimization so your listing captures organic discovery from overseas searchers.",
    iconName: "Globe",
    highlights: [
      "Bespoke single-property landing web apps",
      "Real estate local & international SEO",
      "Automated WhatsApp & Email lead nurturing sequences",
      "Integrated booking & viewing calendar schedulers"
    ],
    deliverables: ["Fast responsive project web page", "SEO configuration", "Automated email workflows"]
  },
  {
    id: "mkt-listing",
    slug: "property-listing-marketing",
    category: "marketing",
    number: "07",
    title: "Property Listing Marketing",
    shortDescription: "High-converting listing copy, featured portal positioning, and syndication to accredited networks.",
    fullDescription: "We elevate individual listings into premium opportunities through editorial storytelling, floorplan schematics, and prime placement on leading real estate portals and private investor newsletters.",
    iconName: "FileText",
    highlights: [
      "Editorial architectural copywriting",
      "Dimensioned 2D & 3D floor plan drawings",
      "Private VIP investor email newsletter blasts",
      "Top-tier sponsored portal placement"
    ],
    deliverables: ["Complete listing dossier", "Digital brochure PDF", "Email blast distribution"]
  },
  {
    id: "mkt-leads",
    slug: "real-estate-lead-generation",
    category: "marketing",
    number: "08",
    title: "Real Estate Lead Generation",
    shortDescription: "Full-funnel campaigns designed to deliver verified, phone-qualified buyers directly to sales teams.",
    fullDescription: "We don't deliver raw contact lists; our dedicated lead qualification filter screens for budget, timeframe, and payment mode before handing prospects over to closing agents.",
    iconName: "Users",
    highlights: [
      "Multi-channel inquiry generation (Search + Social + Display)",
      "Strict financial qualification filters",
      "Automated instant WhatsApp lead acknowledgment",
      "Real-time pipeline integration into your CRM"
    ],
    deliverables: ["Verified buyer inquiry pipeline", "Lead dashboard access", "Weekly conversion reporting"]
  }
];

export const MARKETING_PACKAGES = [
  {
    id: "pkg-essential",
    name: "Essential Listing",
    tagline: "For individual residential villas and luxury apartments seeking swift high-value buyers.",
    price: "Custom Quote",
    popular: false,
    features: [
      "Professional Architectural Photography (15 stills)",
      "High-res Interior & Exterior HDR capture",
      "Editorial Listing Copywriting & Specs",
      "Featured placement across Ali Estate network",
      "Dedicated social media showcase post & story",
      "Direct buyer inquiry routing"
    ]
  },
  {
    id: "pkg-signature",
    name: "Signature Showcase",
    tagline: "Our most popular comprehensive campaign for exclusive estates and penthouses.",
    price: "Custom Quote",
    popular: true,
    features: [
      "Complete Editorial Photography (25+ stills)",
      "4K Cinematic Video Tour & Walkthrough",
      "Licensed Aerial Drone Cinematography",
      "Vertical 4K Social Reel / TikTok package",
      "Targeted Meta & Instagram Sponsored Campaign",
      "Dedicated Single-Property Web Landing Page",
      "Private Email Blast to 5,000+ Vetted Investors",
      "Phone-screened buyer qualification by senior brokers"
    ]
  },
  {
    id: "pkg-developer",
    name: "Developer & Project Launch",
    tagline: "Full-scale marketing launch strategy for multi-unit towers and gated communities.",
    price: "Enterprise Agreement",
    popular: false,
    features: [
      "Full Project Brand Identity & Nomenclature",
      "Architectural 3D Visuals & Scale Model Collateral",
      "Cinematic Teaser & Full Masterplan Video Suite",
      "Multi-channel Diaspora Paid Ads (GCC, UK, US)",
      "Custom Project Web Portal with Unit Availability",
      "Sales Gallery Experience & Print Catalogues",
      "Dedicated Call Center & Lead Qualification Desk",
      "Weekly Conversion Analytics & Closing Support"
    ]
  }
];

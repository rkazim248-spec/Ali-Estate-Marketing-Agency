/**
 * Ali Estate & Marketing Agency - Site Configuration
 * 
 * Centralized editable configuration for business details, contacts,
 * placeholder indicators, and branding tokens.
 */

export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  establishedYear: number;
  url: string;
  
  contact: {
    phone: string;
    phoneDisplay: string;
    whatsappNumber: string; // international digits without + or spaces
    whatsappDisplay: string;
    whatsappDefaultMessage: string;
    email: string;
    inquiriesEmail: string;
    marketingEmail: string;
    address: {
      street: string;
      suite: string;
      area: string;
      city: string;
      country: string;
      postalCode: string;
      displayFull: string;
    };
    businessHours: {
      weekdays: string;
      saturday: string;
      sunday: string;
    };
    coordinates: {
      lat: number;
      lng: number;
    };
  };

  socialLinks: {
    instagram: string;
    facebook: string;
    linkedin: string;
    youtube: string;
    tiktok: string;
  };

  stats: Array<{
    id: string;
    value: string;
    numericValue: number;
    suffix: string;
    label: string;
    description: string;
  }>;

  currency: {
    code: string;
    symbol: string;
    format: string; // e.g. "PKR"
  };
}

export const siteConfig: SiteConfig = {
  name: "Ali Estate & Marketing Agency",
  legalName: "Ali Estate & Marketing Agency (Pvt.) Ltd.",
  tagline: "Where Exceptional Properties Meet Exceptional Marketing.",
  shortDescription: "Premier real estate consultancy and digital property marketing agency.",
  fullDescription: "Ali Estate & Marketing Agency combines real estate market intelligence with high-end strategic marketing to help property owners, buyers, and investors discover, promote, buy, sell, and build wealth with exceptional properties.",
  establishedYear: 2016,
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://ali-estate.agency",

  contact: {
    // Configurable placeholders
    phone: process.env.NEXT_PUBLIC_PHONE || "+92 21 3587 0000",
    phoneDisplay: "+92 (21) 3587-0000",
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923001234567",
    whatsappDisplay: "+92 300 123 4567",
    whatsappDefaultMessage: "Hello Ali Estate & Marketing Agency, I'm interested in discussing a property consultation.",
    email: "info@ali-estate.agency",
    inquiriesEmail: "inquiries@ali-estate.agency",
    marketingEmail: "marketing@ali-estate.agency",
    address: {
      street: "Suite 402, Executive Tower, Main Clifton Boulevard",
      suite: "Level 4, Block 4",
      area: "Clifton",
      city: "Karachi",
      country: "Pakistan",
      postalCode: "75600",
      displayFull: "Suite 402, Executive Tower, Main Clifton Boulevard, Clifton, Karachi, Pakistan",
    },
    businessHours: {
      weekdays: "Monday – Friday: 9:30 AM – 7:00 PM",
      saturday: "Saturday: 10:00 AM – 5:00 PM",
      sunday: "Sunday: By Prior Appointment Only",
    },
    coordinates: {
      lat: 24.8198,
      lng: 67.0315, // Clifton, Karachi
    },
  },

  socialLinks: {
    instagram: "https://instagram.com/aliestate.agency",
    facebook: "https://facebook.com/aliestate.agency",
    linkedin: "https://linkedin.com/company/ali-estate-marketing",
    youtube: "https://youtube.com/@aliestate.agency",
    tiktok: "https://tiktok.com/@aliestate.agency",
  },

  stats: [
    {
      id: "years",
      value: "10+",
      numericValue: 10,
      suffix: "+",
      label: "Years of Experience",
      description: "Dedicated advisory across high-value markets",
    },
    {
      id: "listed",
      value: "500+",
      numericValue: 500,
      suffix: "+",
      label: "Properties Listed",
      description: "Curated residential & commercial portfolios",
    },
    {
      id: "transactions",
      value: "300+",
      numericValue: 300,
      suffix: "+",
      label: "Successful Deals",
      description: "Closed with seamless legal & financial diligence",
    },
    {
      id: "satisfaction",
      value: "98%",
      numericValue: 98,
      suffix: "%",
      label: "Client Satisfaction",
      description: "Discerning homeowners, investors & developers",
    },
  ],

  currency: {
    code: "PKR",
    symbol: "Rs",
    format: "PKR",
  },
};

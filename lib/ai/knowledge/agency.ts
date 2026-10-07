/**
 * Agency Knowledge for Ali Estate AI Assistant
 * Strict ground truth regarding agency profile, capabilities, and workflows
 */

import { AI_CONTACT_KNOWLEDGE } from './contact';

export const AI_AGENCY_KNOWLEDGE = {
  name: "Ali Estate & Marketing Agency",
  shortName: "Ali Estate",
  tagline: "Premier Real Estate Consultancy & Property Marketing Agency",
  category: "Dual-Discipline: Real Estate Brokerage & Digital Property Marketing",
  
  coreBusinesses: [
    {
      type: "Primary",
      title: "Luxury Real Estate Brokerage",
      description: "High-value residential and commercial property brokerage, buyer representation, seller advisory, tenant leasing, and private portfolio investment in Karachi."
    },
    {
      type: "Secondary",
      title: "Property Marketing & Media Production",
      description: "In-house creative and digital marketing agency providing 4K cinematic property video tours, architectural photography, drone aerial coverage, targeted social media campaigns, and diaspora overseas buyer marketing."
    }
  ],

  areasServed: [
    "Clifton (Blocks 1 through 9, Oceanfront)",
    "DHA Karachi (Defence Housing Authority, Phases 1 through 8, Ext)",
    "Emaar Oceanfront (Coral Towers, Pearl Towers, Reef & Crescent Towers)",
    "Bahria Town Karachi (Golf City, Precincts, Luxury Villas)",
    "PECHS / Main Shahrah-e-Faisal (Prime Commercial & Corporate Corridors)"
  ],

  officeLocation: {
    address: AI_CONTACT_KNOWLEDGE.officeAddress,
    city: AI_CONTACT_KNOWLEDGE.city,
    country: AI_CONTACT_KNOWLEDGE.country,
    hours: AI_CONTACT_KNOWLEDGE.workingHours,
    contactPhone: AI_CONTACT_KNOWLEDGE.phoneDisplay,
    whatsapp: AI_CONTACT_KNOWLEDGE.whatsappDisplay,
    email: AI_CONTACT_KNOWLEDGE.email
  },

  clientProcesses: {
    buying: [
      "1. Requirement Consultation: Determining budget, preferred enclave, bedroom requirements, and timeline.",
      "2. Verified Portfolio Selection: Curating active, physically checked properties with clean title records.",
      "3. Private Accompanied Viewings: Coordinated viewings with an authorized Ali Estate senior consultant.",
      "4. Valuation & Offer Negotiation: Transparent price discussions with the seller's representatives.",
      "5. Transfer & Token Formalities: Step-by-step guidance through society/sub-registrar transfer procedures."
    ],
    selling: [
      "1. Property Onboarding: Collection of property specifications, covered area, plot size, and asking price expectation.",
      "2. Visual & Document Verification: Inspection of ownership papers, allotment letters, and physical condition.",
      "3. Professional Media Production: In-house photography and cinematic video walkthroughs.",
      "4. Targeted Campaign: Exposure across verified buyer databases, digital channels, and overseas investor networks.",
      "5. Offer Negotiation & Closing: Securing qualified buyers with transparent escrow and deposit agreements."
    ],
    renting: [
      "1. Tenant Requirement Match: Locating furnished or unfurnished residences matching corporate or family needs.",
      "2. Lease Term Agreement: Documenting security deposits, monthly rent terms, advance rent, and utility handovers.",
      "3. Tenancy Documentation: Drafting legally compliant lease agreements with inventory verification."
    ],
    listingProperty: [
      "Owners can list directly via the 'List Your Property' form on the website, WhatsApp the agency desk, or speak to an agent.",
      "Required details: Owner name, contact phone, property location, covered area/plot size, bedrooms, asking price, and availability for inspection."
    ],
    viewingRequest: [
      "Clients can request private viewings online or directly through the AI assistant.",
      "Viewings are subject to seller schedule confirmation and building/society security clearance.",
      "A consultant confirms the appointment via phone or WhatsApp before the visit."
    ]
  },

  guidingPrinciples: [
    "No fake listings or misleading pricing.",
    "Physical verification of published properties.",
    "No unverified investment return promises; investments depend on market dynamics.",
    "Formal legal conveyance, title searches, and property tax matters are handled in coordination with official society transfer offices and legal counsel."
  ]
};

/**
 * Testimonials Dataset
 * Client testimonials with editable feedback and transaction context
 */

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  transactionType: string;
  location: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    quote: "Ali Estate made the entire process remarkably straightforward. Their deep understanding of Clifton's micro-market and their disciplined attention to title verification gave our family complete confidence.",
    author: "Kamran & Mahrukh Siddiqui",
    role: "Private Homeowner",
    transactionType: "Duplex Penthouse Acquisition",
    location: "Clifton, Karachi",
    rating: 5
  },
  {
    id: "test-2",
    quote: "As an overseas Pakistani living in London, selling our DHA Phase 8 villa remotely felt daunting. The Ali Estate marketing team produced an architectural video tour and qualified buyers so effectively that we completed the transaction seamlessly within 40 days.",
    author: "Dr. Farhan Mirza",
    role: "Overseas Investor (UK)",
    transactionType: "Luxury Villa Disposition",
    location: "DHA Phase 8, Karachi",
    rating: 5
  },
  {
    id: "test-3",
    quote: "Their marketing agency division is on a completely different level from typical brokers. The digital campaign, cinematic aerial video, and targeted outreach they executed for our development resulted in our fastest sell-out to date.",
    author: "Omer Jahangir",
    role: "Managing Director, Landmark Holdings",
    transactionType: "Project Marketing & Launch",
    location: "Commercial Promenade, Karachi",
    rating: 5
  },
  {
    id: "test-4",
    quote: "Securing an entire corporate floor on Main Clifton Road required extensive lease negotiations and technical vetting. Ali Estate handled the process with utmost discretion and professionalism.",
    author: "Ayesha Bilgrami",
    role: "Country Head, Regional Tech Venture",
    transactionType: "Corporate Office Lease",
    location: "Main Clifton Corridor",
    rating: 5
  }
];

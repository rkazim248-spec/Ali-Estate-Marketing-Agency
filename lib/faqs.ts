/**
 * FAQs Dataset
 * Frequently asked questions for real estate and marketing services
 */

export interface FAQItem {
  id: string;
  category: 'General' | 'Buying & Selling' | 'Marketing' | 'Investment';
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    category: "Buying & Selling",
    question: "How can I list my property with Ali Estate & Marketing Agency?",
    answer: "You can submit your property details via our online 'List Your Property' form or contact our advisory desk directly via WhatsApp. Our team will conduct a preliminary assessment, schedule a physical site inspection, verify ownership documentation, and propose a tailored marketing strategy."
  },
  {
    id: "faq-2",
    category: "Buying & Selling",
    question: "Do you help with property buying and legal due diligence?",
    answer: "Yes, absolutely. We provide end-to-end buyer representation. We curate properties that match your specific lifestyle or financial criteria, coordinate private inspections, verify title chains with relevant authorities (DHA, Cantonment, KDA), and negotiate the most favorable purchase terms."
  },
  {
    id: "faq-3",
    category: "General",
    question: "Do you provide property valuation services?",
    answer: "Yes. Our valuation team provides comprehensive comparative market analyses (CMA) based on recent verified transactions, current replacement cost metrics, and micro-location dynamics. This ensures your listing is priced competitively to attract serious buyers without leaving capital on the table."
  },
  {
    id: "faq-4",
    category: "Marketing",
    question: "Can you market my property across social media and digital platforms?",
    answer: "Yes. In fact, our in-house marketing agency division is what sets us apart. We create high-converting Meta (Instagram & Facebook), YouTube, and Google campaigns targeted toward verified high-net-worth individuals and overseas Pakistani buyers in the Gulf, UK, and North America."
  },
  {
    id: "faq-5",
    category: "Marketing",
    question: "Do you offer professional property photography and drone videography?",
    answer: "Yes. We deploy professional architectural photographers equipped with tilt-shift lenses and licensed drone cinematographers. We capture HDR interior stills, twilight exterior shots, and 4K walk-through videos with custom sound design."
  },
  {
    id: "faq-6",
    category: "Investment",
    question: "Do you assist overseas investors and wealth managers?",
    answer: "A significant portion of our clientele consists of overseas Pakistanis and institutional funds. We offer turnkey investment management, including portfolio allocation, off-market acquisitions, rental yield management, and periodic video condition audits."
  },
  {
    id: "faq-7",
    category: "Buying & Selling",
    question: "How can I schedule a private property viewing?",
    answer: "Simply navigate to any property detail page and use the 'Request Private Viewing' form, or click the WhatsApp button. We coordinate with the owner and escort you or your authorized representative for an exclusive tour."
  }
];

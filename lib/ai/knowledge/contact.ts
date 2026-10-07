/**
 * Centralized Contact Information for AI Knowledge Base
 * Sourced directly from siteConfig and environment variables
 */

import { siteConfig } from '@/lib/site-config';

export const AI_CONTACT_KNOWLEDGE = {
  agencyName: siteConfig.name,
  legalName: siteConfig.legalName,
  phoneDisplay: siteConfig.contact.phoneDisplay,
  phoneRaw: siteConfig.contact.phone,
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || siteConfig.contact.whatsappNumber,
  whatsappDisplay: siteConfig.contact.whatsappDisplay,
  email: siteConfig.contact.email,
  officeAddress: siteConfig.contact.address.displayFull,
  officeSuite: siteConfig.contact.address.suite,
  officeStreet: siteConfig.contact.address.street,
  officeArea: siteConfig.contact.address.area,
  city: siteConfig.contact.address.city,
  country: siteConfig.contact.address.country,
  workingHours: {
    weekdays: siteConfig.contact.businessHours.weekdays,
    saturday: siteConfig.contact.businessHours.saturday,
    sunday: siteConfig.contact.businessHours.sunday,
  },
  socialLinks: siteConfig.socialLinks,
  websiteUrl: siteConfig.url,
};

import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/footer/Footer';
import { WhatsAppButton } from '@/components/whatsapp/WhatsAppButton';
import { AIAssistant } from '@/components/ai/AIAssistant';
import { siteConfig } from '@/lib/site-config';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Luxury Real Estate & Digital Marketing`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.fullDescription,
  applicationName: siteConfig.name,
  keywords: [
    'Ali Estate & Marketing Agency',
    'Karachi luxury real estate',
    'Clifton penthouses',
    'DHA Phase 8 villas',
    'property marketing agency',
    'real estate consultancy Pakistan',
    'property drone videography',
    'commercial corporate floors Karachi',
    'overseas Pakistani property investment',
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: `${siteConfig.name} | Luxury Real Estate & Digital Marketing`,
    description: siteConfig.fullDescription,
    siteName: siteConfig.name,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
        width: 1600,
        height: 900,
        alt: `${siteConfig.name} - Luxury Real Estate`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | Luxury Real Estate & Digital Marketing`,
    description: siteConfig.fullDescription,
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Schema.org RealEstateAgent & Organization structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo/ali-estate-logo-dark.svg`,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
    description: siteConfig.fullDescription,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.city,
      postalCode: siteConfig.contact.address.postalCode,
      addressCountry: siteConfig.contact.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.contact.coordinates.lat,
      longitude: siteConfig.contact.coordinates.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:30',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '17:00',
      },
    ],
    sameAs: [
      siteConfig.socialLinks.instagram,
      siteConfig.socialLinks.facebook,
      siteConfig.socialLinks.linkedin,
      siteConfig.socialLinks.youtube,
    ],
  };

  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans-luxury text-[#1E1C1C] bg-white antialiased min-h-screen flex flex-col selection:bg-[#C9A96E] selection:text-[#111111]">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <AIAssistant />
      </body>
    </html>
  );
}

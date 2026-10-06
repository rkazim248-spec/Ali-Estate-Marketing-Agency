import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPin, 
  BedDouble, 
  Bath, 
  Maximize2, 
  Car, 
  Calendar, 
  Check, 
  Phone, 
  Mail, 
  MessageSquare,
  ShieldCheck, 
  Layers, 
  Share2, 
  ChevronRight,
  Waves,
  Shield,
  Zap,
  Trees,
  Dumbbell,
  Video,
  Wind,
  Home
} from 'lucide-react';

import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PropertyGallery } from '@/components/property/PropertyGallery';
import { InteractiveMapPreview } from '@/components/map/InteractiveMapPreview';
import { RequestViewingForm } from '@/components/property/RequestViewingForm';
import { PropertyCard } from '@/components/property/PropertyCard';
import { getPropertyBySlug, getRelatedProperties, PROPERTIES } from '@/lib/properties';
import { siteConfig } from '@/lib/site-config';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROPERTIES.map((prop) => ({
    slug: prop.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    return {
      title: 'Property Not Found',
    };
  }

  return {
    title: `${property.title} | ${property.location}, ${property.city}`,
    description: property.description,
    openGraph: {
      title: `${property.title} - ${property.priceDisplay}`,
      description: property.description,
      images: [property.images[0]],
    },
  };
}

const AMENITY_ICONS: Record<string, React.ElementType> = {
  'Swimming Pool': Waves,
  'Parking': Car,
  'Security': Shield,
  'Backup Generator': Zap,
  'Elevator': Layers,
  'Garden': Trees,
  'Gym': Dumbbell,
  'CCTV': Video,
  'Air Conditioning': Wind,
  'Servant Quarter': Home,
  'Balcony': Check,
  'Terrace': Check,
};

export default async function PropertyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const relatedProperties = getRelatedProperties(property.slug, 3);

  // Schema.org Single RealEstateListing
  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'SingleFamilyResidence',
    name: property.title,
    description: property.description,
    image: property.images,
    numberOfRooms: property.bedrooms,
    numberOfBedrooms: property.bedrooms,
    numberOfBathroomsTotal: property.bathrooms,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: property.area,
      unitText: property.areaUnit,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.city,
      addressRegion: property.neighborhood,
      addressCountry: property.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: property.coordinates.lat,
      longitude: property.coordinates.lng,
    },
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'PKR',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />

      <div className="pt-28 pb-24 bg-[#F7F5F1] min-h-screen">
        <Container size="xl">
          {/* Breadcrumb Trail */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-[#7A7570]">
            <Link href="/" className="hover:text-[#181616]">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/properties" className="hover:text-[#181616]">Properties</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#181616] font-medium truncate max-w-xs">{property.title}</span>
          </nav>

          {/* Top Title & Price Bar */}
          <div className="bg-white border border-[#E9E7E3] p-6 sm:p-8 rounded-sm mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 shadow-xs">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-[#121010] text-[#C9A96E] rounded-sm">
                  {property.type}
                </span>
                <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-[#F7F5F1] text-[#181616] border border-[#E0DCD6] rounded-sm">
                  For {property.status}
                </span>
                {property.isExclusive && (
                  <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-[#C9A96E] text-[#121010] rounded-sm">
                    Exclusive Mandate
                  </span>
                )}
              </div>

              <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-medium text-[#181616] tracking-tight">
                {property.title}
              </h1>

              <div className="flex items-center gap-1.5 text-xs text-[#736E6A] mt-2">
                <MapPin className="w-4 h-4 text-[#C9A96E]" />
                <span>{property.location}, {property.city}, {property.country}</span>
              </div>
            </div>

            <div className="flex flex-col md:items-end">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#9C7737]">
                {property.status === 'Rent' ? 'Monthly Lease Rate' : 'Asking Investment Price'}
              </span>
              <div className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#181616]">
                {property.priceDisplay}
              </div>
            </div>
          </div>

          {/* Interactive Property Gallery */}
          <div className="mb-10">
            <PropertyGallery images={property.images} title={property.title} />
          </div>

          {/* Two-Column Specification & Form Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Columns: Details, Amenities, Map */}
            <div className="lg:col-span-8 space-y-8">
              {/* Key Overview Metrics (Zero-pill clean layout) */}
              <div className="bg-white border border-[#E9E7E3] p-6 rounded-sm">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9C7737] mb-4">
                  Property Overview
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-xs">
                  {property.bedrooms > 0 && (
                    <div className="flex flex-col">
                      <span className="text-[#85807A] flex items-center gap-1 mb-1">
                        <BedDouble className="w-3.5 h-3.5 text-[#C9A96E]" />
                        Bedrooms
                      </span>
                      <strong className="text-base text-[#181616] font-semibold">
                        {property.bedrooms} Beds
                      </strong>
                    </div>
                  )}

                  {property.bathrooms > 0 && (
                    <div className="flex flex-col">
                      <span className="text-[#85807A] flex items-center gap-1 mb-1">
                        <Bath className="w-3.5 h-3.5 text-[#C9A96E]" />
                        Bathrooms
                      </span>
                      <strong className="text-base text-[#181616] font-semibold">
                        {property.bathrooms} Baths
                      </strong>
                    </div>
                  )}

                  <div className="flex flex-col">
                    <span className="text-[#85807A] flex items-center gap-1 mb-1">
                      <Maximize2 className="w-3.5 h-3.5 text-[#C9A96E]" />
                      Covered Area
                    </span>
                    <strong className="text-base text-[#181616] font-semibold">
                      {property.coveredArea || `${property.area} ${property.areaUnit}`}
                    </strong>
                  </div>

                  {property.plotArea && (
                    <div className="flex flex-col">
                      <span className="text-[#85807A] flex items-center gap-1 mb-1">
                        <Layers className="w-3.5 h-3.5 text-[#C9A96E]" />
                        Plot Area
                      </span>
                      <strong className="text-base text-[#181616] font-semibold">
                        {property.plotArea}
                      </strong>
                    </div>
                  )}

                  {property.parkingSpaces > 0 && (
                    <div className="flex flex-col">
                      <span className="text-[#85807A] flex items-center gap-1 mb-1">
                        <Car className="w-3.5 h-3.5 text-[#C9A96E]" />
                        Covered Parking
                      </span>
                      <strong className="text-base text-[#181616] font-semibold">
                        {property.parkingSpaces} Vehicles
                      </strong>
                    </div>
                  )}

                  {property.yearBuilt && (
                    <div className="flex flex-col">
                      <span className="text-[#85807A] flex items-center gap-1 mb-1">
                        <Calendar className="w-3.5 h-3.5 text-[#C9A96E]" />
                        Year Built
                      </span>
                      <strong className="text-base text-[#181616] font-semibold">
                        {property.yearBuilt}
                      </strong>
                    </div>
                  )}
                </div>
              </div>

              {/* Detailed Description */}
              <div className="bg-white border border-[#E9E7E3] p-6 sm:p-8 rounded-sm space-y-4">
                <h3 className="font-serif-luxury text-2xl font-medium text-[#181616]">
                  Property Description
                </h3>
                <p className="text-sm text-[#4A4643] leading-relaxed">
                  {property.description}
                </p>
                {property.longDescription.map((paragraph, idx) => (
                  <p key={idx} className="text-sm text-[#66615C] leading-relaxed">
                    {paragraph}
                  </p>
                ))}

                {/* Key Architectural Highlights */}
                {property.features && property.features.length > 0 && (
                  <div className="pt-6 border-t border-[#EAE7E2]">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#9C7737] mb-3">
                      Key Highlights &amp; Finishes
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {property.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#2E2B29]">
                          <Check className="w-3.5 h-3.5 text-[#C9A96E] flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Features & Amenities */}
              <div className="bg-white border border-[#E9E7E3] p-6 sm:p-8 rounded-sm">
                <h3 className="font-serif-luxury text-2xl font-medium text-[#181616] mb-6">
                  Features &amp; Amenities
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {property.amenities.map((amenity, idx) => {
                    const IconComp = AMENITY_ICONS[amenity] || Check;
                    return (
                      <div
                        key={idx}
                        className="p-3.5 bg-[#FAF9F6] border border-[#EAE7E2] rounded-sm flex items-center gap-2.5 text-xs text-[#2E2B29]"
                      >
                        <IconComp className="w-4 h-4 text-[#9C7737] flex-shrink-0" />
                        <span className="font-medium">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Location & Map Section */}
              <div className="bg-white border border-[#E9E7E3] p-6 sm:p-8 rounded-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif-luxury text-2xl font-medium text-[#181616]">
                    Location &amp; Coordinates
                  </h3>
                  <span className="text-xs text-[#807B75]">
                    {property.neighborhood}, Karachi
                  </span>
                </div>

                <InteractiveMapPreview
                  latitude={property.coordinates.lat}
                  longitude={property.coordinates.lng}
                  address={`${property.location}, ${property.city}`}
                  locationName={property.title}
                />
              </div>
            </div>

            {/* Right 4 Columns: Agent Card & Request Viewing Form */}
            <aside className="lg:col-span-4 space-y-6">
              {/* Dedicated Agent Card */}
              <div className="bg-white border border-[#E9E7E3] p-6 rounded-sm shadow-xs">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9C7737] mb-4">
                  Listing Specialist
                </h3>

                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-[#181616] flex-shrink-0 border border-[#C9A96E]/40">
                    <Image
                      src={property.agent.image}
                      alt={property.agent.name}
                      fill
                      sizes="70px"
                      referrerPolicy="no-referrer"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif-luxury text-xl font-medium text-[#181616]">
                      {property.agent.name}
                    </h4>
                    <p className="text-xs text-[#7A7570]">{property.agent.role}</p>
                    <div className="inline-flex items-center gap-1 text-[11px] text-[#9C7737] font-semibold mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified Consultant</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-[#EAE7E2] text-xs">
                  <a
                    href={`tel:${property.agent.phone}`}
                    className="flex items-center gap-2.5 text-[#2E2B29] hover:text-[#9C7737] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#C9A96E]" />
                    <span>{property.agent.phone}</span>
                  </a>

                  <a
                    href={`mailto:${property.agent.email}`}
                    className="flex items-center gap-2.5 text-[#2E2B29] hover:text-[#9C7737] transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#C9A96E]" />
                    <span className="truncate">{property.agent.email}</span>
                  </a>

                  <a
                    href={`https://wa.me/${property.agent.whatsapp}?text=${encodeURIComponent(
                      `Hello ${property.agent.name}, I am interested in ${property.title} (${property.priceDisplay}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 bg-[#181616] hover:bg-[#252222] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors border border-[#C9A96E]"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#C9A96E]" />
                    <span>Inquire via WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Request Private Viewing Form */}
              <RequestViewingForm
                propertyTitle={property.title}
                propertySlug={property.slug}
              />
            </aside>
          </div>

          {/* Related Curated Properties Section */}
          {relatedProperties.length > 0 && (
            <div className="mt-20 pt-16 border-t border-[#E0DCD6]">
              <div className="mb-8">
                <SectionHeading
                  align="left"
                  theme="light"
                  kicker="Similar Properties"
                  title="Related Opportunities"
                  subtitle="Explore alternative luxury residences in prime Karachi enclaves."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProperties.map((rel) => (
                  <PropertyCard key={rel.id} property={rel} />
                ))}
              </div>
            </div>
          )}
        </Container>
      </div>
    </>
  );
}

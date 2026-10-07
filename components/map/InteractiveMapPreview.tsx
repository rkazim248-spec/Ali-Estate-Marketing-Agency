'use client';

import React, { useState } from 'react';
import { MapPin, ExternalLink, Navigation, Layers, Compass } from 'lucide-react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

interface InteractiveMapPreviewProps {
  latitude: number;
  longitude: number;
  address: string;
  locationName: string;
  zoom?: number;
  className?: string;
}

export function InteractiveMapPreview({
  latitude,
  longitude,
  address,
  locationName,
  zoom = 15,
  className = '',
}: InteractiveMapPreviewProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "AIzaSyDzN-BbjdkKzTmhYuOrcIrwaIG_trDAV1U";
  const [mapType, setMapType] = useState<'roadmap' | 'satellite' | 'hybrid'>('roadmap');

  const position = { lat: latitude, lng: longitude };
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  return (
    <div
      className={`relative rounded-sm overflow-hidden border border-[#E9E7E3] bg-[#141212] text-white shadow-md ${className}`}
    >
      {/* Map Container */}
      <div className="relative w-full h-80 sm:h-96 bg-[#1A1818]">
        {apiKey ? (
          <APIProvider apiKey={apiKey}>
            <Map
              defaultCenter={position}
              defaultZoom={zoom}
              mapTypeId={mapType}
              gestureHandling="cooperative"
              disableDefaultUI={false}
              zoomControl={true}
              fullscreenControl={false}
              streetViewControl={true}
              className="w-full h-full"
            >
              <AdvancedMarker position={position} title={locationName}>
                <Pin
                  background="#181616"
                  borderColor="#C9A96E"
                  glyphColor="#C9A96E"
                  scale={1.2}
                />
              </AdvancedMarker>
            </Map>
          </APIProvider>
        ) : (
          /* Fallback aesthetic view */
          <div className="w-full h-full flex items-center justify-center bg-neutral-900 relative">
            <div className="text-center z-10 p-6">
              <MapPin className="w-10 h-10 text-[#C9A96E] mx-auto mb-2" />
              <h4 className="font-serif-luxury text-lg text-white">{locationName}</h4>
              <p className="text-xs text-[#A8A39D] mt-1">{address}</p>
            </div>
          </div>
        )}

        {/* Top Floating Control Bar */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-[#141212]/90 backdrop-blur-xs border border-white/15 p-1 rounded-sm shadow-lg text-[11px]">
          <button
            type="button"
            onClick={() => setMapType('roadmap')}
            className={`px-2.5 py-1 rounded-xs font-medium transition-colors ${
              mapType === 'roadmap'
                ? 'bg-[#C9A96E] text-[#121010] font-bold'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            Map
          </button>
          <button
            type="button"
            onClick={() => setMapType('hybrid')}
            className={`px-2.5 py-1 rounded-xs font-medium transition-colors ${
              mapType === 'hybrid'
                ? 'bg-[#C9A96E] text-[#121010] font-bold'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            Satellite
          </button>
        </div>

        {/* Top Right Actions */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#141212]/90 hover:bg-black text-white text-xs font-medium border border-[#C9A96E]/40 hover:border-[#C9A96E] rounded-sm transition-colors shadow-lg backdrop-blur-xs"
            title="Get driving directions"
          >
            <Compass className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span className="hidden sm:inline">Directions</span>
          </a>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#141212]/90 hover:bg-black text-white text-xs font-medium border border-white/20 hover:border-white/40 rounded-sm transition-colors shadow-lg backdrop-blur-xs"
          >
            <span>Open Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#C9A96E]" />
          </a>
        </div>

        {/* Bottom Property Location Banner */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-4 z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 pointer-events-none">
          <div className="flex items-center gap-2 text-xs text-white/95 drop-shadow-sm">
            <Navigation className="w-3.5 h-3.5 text-[#C9A96E] flex-shrink-0" />
            <span className="truncate font-medium">{address}</span>
          </div>
          <span className="text-[10px] uppercase font-semibold tracking-wider text-[#C9A96E] drop-shadow-sm">
            Coordinates: {latitude.toFixed(4)}° N, {longitude.toFixed(4)}° E
          </span>
        </div>
      </div>
    </div>
  );
}

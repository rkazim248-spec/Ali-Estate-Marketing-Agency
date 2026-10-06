'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize, X } from 'lucide-react';

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const prevImage = useCallback(() => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const nextImage = useCallback(() => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, nextImage, prevImage]);

  return (
    <div className="flex flex-col gap-3">
      {/* Main Hero Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm bg-[#181616] group">
        <Image
          src={images[selectedIndex] || images[0]}
          alt={`${title} - Photo ${selectedIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1200px"
          referrerPolicy="no-referrer"
          className="object-cover transition-transform duration-500"
        />

        {/* Counter Overlay */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-[#121010]/80 backdrop-blur-sm text-white text-xs font-medium rounded-sm border border-white/10">
          <span>{selectedIndex + 1}</span> / <span>{images.length}</span>
        </div>

        {/* Fullscreen Trigger */}
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="absolute top-4 right-4 p-2 bg-[#121010]/80 hover:bg-[#121010] text-white rounded-sm border border-white/10 transition-colors"
          aria-label="Open Fullscreen Gallery"
        >
          <Maximize className="w-4 h-4" />
        </button>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-sm bg-[#121010]/80 hover:bg-[#121010] text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 border border-white/10"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-sm bg-[#121010]/80 hover:bg-[#121010] text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 border border-white/10"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`relative aspect-[16/10] overflow-hidden rounded-sm transition-all ${
                selectedIndex === idx
                  ? 'ring-2 ring-[#C9A96E] opacity-100'
                  : 'opacity-60 hover:opacity-100'
              }`}
              aria-label={`View photo ${idx + 1}`}
            >
              <Image
                src={img}
                alt={`${title} thumbnail ${idx + 1}`}
                fill
                sizes="150px"
                referrerPolicy="no-referrer"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Fullscreen gallery for ${title}`}
          className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="flex items-center justify-between text-white pb-4 border-b border-white/10">
            <div className="text-sm font-medium">
              <span>{title}</span>
              <span className="text-white/50 ml-3">
                ({selectedIndex + 1} of {images.length})
              </span>
            </div>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="p-2 text-white/80 hover:text-white"
              aria-label="Close Fullscreen"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div
            className="relative flex-1 my-4 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-w-5xl max-h-[80vh]">
              <Image
                src={images[selectedIndex]}
                alt={`${title} - Expanded`}
                fill
                referrerPolicy="no-referrer"
                className="object-contain"
              />
            </div>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 bg-black/60 hover:bg-black text-white rounded-full transition-all"
                  aria-label="Previous Photo"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 bg-black/60 hover:bg-black text-white rounded-full transition-all"
                  aria-label="Next Photo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          <div
            className="flex items-center justify-center gap-2 overflow-x-auto py-2"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`relative w-16 h-12 rounded-sm overflow-hidden flex-shrink-0 transition-opacity ${
                  selectedIndex === idx ? 'ring-2 ring-[#C9A96E] opacity-100' : 'opacity-40 hover:opacity-80'
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  referrerPolicy="no-referrer"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

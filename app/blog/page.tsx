'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BlogCard } from '@/components/blog/BlogCard';
import { BLOG_POSTS, BlogPost } from '@/lib/blog';

const CATEGORIES = [
  'All',
  'Market News',
  'Buying Guide',
  'Selling Guide',
  'Investment',
  'Property Marketing',
  'Neighborhood Guides',
  'Real Estate Tips',
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'All') return BLOG_POSTS;
    return BLOG_POSTS.filter((post) => post.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="pt-28 pb-24 bg-[#F7F5F1] min-h-screen">
      <Container size="xl">
        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-[1px] bg-[#C9A96E]" />
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#9C7737]">
              Real Estate Intelligence &bull; Karachi &bull; Global
            </span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-medium text-[#181616] leading-tight">
            Editorial Perspectives &amp;{' '}
            <span className="italic text-[#9C7737] font-normal block sm:inline">
              Market Intelligence.
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-[#66615C] leading-relaxed">
            In-depth analysis of property due diligence, coastal zoning laws, diaspora investment frameworks, and modern real estate media strategies.
          </p>
        </div>

        {/* Categories Bar: Clean interactive buttons without candy badges */}
        <div className="mb-12 flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E0DCD6]">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap rounded-sm transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#181616] text-white shadow-xs'
                  : 'bg-white border border-[#E0DCD6] text-[#69645F] hover:text-[#181616]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="p-12 text-center bg-white border border-[#E9E7E3] rounded-sm">
            <p className="text-sm text-[#736E6A]">
              No articles currently filed under this category. Check back soon for fresh insights.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}

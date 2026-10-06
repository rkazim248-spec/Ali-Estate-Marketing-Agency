import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';
import { BlogPost } from '@/lib/blog';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group bg-white rounded-sm border border-[#E9E7E3] hover:border-[#C9A96E]/80 transition-all duration-300 flex flex-col h-full overflow-hidden hover:shadow-lg">
      {/* Cover Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#181616]">
        <Link href={`/blog/${post.slug}`}>
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            referrerPolicy="no-referrer"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Metadata: Zero-pill discipline */}
          <div className="flex items-center gap-2 text-xs text-[#7A7570] mb-3">
            <span className="font-semibold text-[#9C7737] uppercase tracking-wider text-[11px]">
              {post.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>{post.date}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#A39E98]" />
              {post.readTime}
            </span>
          </div>

          <h3 className="font-serif-luxury text-2xl font-medium text-[#1A1818] group-hover:text-[#9C7737] transition-colors leading-snug line-clamp-2">
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h3>

          <p className="mt-2.5 text-xs text-[#6B6B6B] line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {/* Footer info: Author & Read link */}
        <div className="mt-6 pt-4 border-t border-[#EAE7E2] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="relative w-7 h-7 rounded-full overflow-hidden bg-[#1A1818]">
              <Image
                src={post.author.image}
                alt={post.author.name}
                fill
                sizes="30px"
                referrerPolicy="no-referrer"
                className="object-cover"
              />
            </div>
            <span className="text-[#4A4643] font-medium">{post.author.name}</span>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 font-semibold text-[#121010] group-hover:text-[#9C7737] transition-colors"
          >
            <span>Read Article</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}

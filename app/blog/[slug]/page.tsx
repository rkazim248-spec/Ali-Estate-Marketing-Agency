import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Clock, 
  Calendar, 
  ChevronRight, 
  Share2, 
  Bookmark, 
  ArrowLeft,
  CheckCircle2,
  MessageCircle,
  Phone
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { BlogCard } from '@/components/blog/BlogCard';
import { BLOG_POSTS, getPostBySlug, getRelatedPosts } from '@/lib/blog';
import { siteConfig } from '@/lib/site-config';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: 'Article Not Found' };
  }

  return {
    title: `${post.title} | Ali Estate Insights`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = getRelatedPosts(post.slug, 2);

  // Schema.org Article structured data
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: [post.coverImage],
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo/ali-estate-logo-dark.svg`,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="pt-28 pb-24 bg-[#F7F5F1] min-h-screen">
        <Container size="md">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-[#7A7570]">
            <Link href="/" className="hover:text-[#181616]">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/blog" className="hover:text-[#181616]">Insights</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#181616] font-medium truncate max-w-xs">{post.title}</span>
          </nav>

          {/* Article Header */}
          <header className="mb-10">
            {/* Metadata (Zero-pill discipline) */}
            <div className="flex items-center gap-2 text-xs text-[#7A7570] mb-4">
              <span className="font-semibold text-[#9C7737] uppercase tracking-wider text-[11px]">
                {post.category}
              </span>
              <span aria-hidden="true">&bull;</span>
              <span>{post.date}</span>
              <span aria-hidden="true">&bull;</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#9C7737]" />
                {post.readTime}
              </span>
            </div>

            <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-5xl font-medium text-[#181616] leading-tight mb-6">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-[#615C56] leading-relaxed">
              {post.excerpt}
            </p>

            {/* Author Byline */}
            <div className="mt-8 pt-6 border-t border-[#E0DCD6] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#181616] border border-[#C9A96E]/30">
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    fill
                    sizes="50px"
                    referrerPolicy="no-referrer"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif-luxury text-base font-semibold text-[#181616]">
                    {post.author.name}
                  </h4>
                  <p className="text-xs text-[#7A7570]">{post.author.role}</p>
                </div>
              </div>

              {/* Share & Bookmark buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="p-2 rounded-sm bg-white border border-[#E0DCD6] hover:border-[#9C7737] text-[#615C56] hover:text-[#181616] transition-colors"
                  title="Share article"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative aspect-[16/9] w-full rounded-sm overflow-hidden bg-[#181616] mb-12 shadow-sm">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
              referrerPolicy="no-referrer"
              className="object-cover"
            />
          </div>

          {/* Table of Contents */}
          {post.tableOfContents && post.tableOfContents.length > 0 && (
            <div className="p-6 bg-white border border-[#E9E7E3] rounded-sm mb-12 shadow-xs">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#9C7737] mb-3">
                In This Article
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm">
                {post.tableOfContents.map((toc) => (
                  <li key={toc.id}>
                    <a
                      href={`#${toc.id}`}
                      className="text-[#4A4643] hover:text-[#9C7737] hover:underline transition-colors"
                    >
                      {toc.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article Body */}
          <div className="bg-white border border-[#E9E7E3] p-8 sm:p-12 rounded-sm shadow-xs space-y-8 mb-16">
            {post.content.map((sec, idx) => (
              <section key={idx} id={sec.id} className="space-y-4">
                {sec.heading && (
                  <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#181616] pt-4">
                    {sec.heading}
                  </h2>
                )}

                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-sm sm:text-base text-[#383431] leading-relaxed">
                    {p}
                  </p>
                ))}

                {sec.callout && (
                  <blockquote className="my-6 pl-4 border-l-2 border-[#C9A96E] font-serif-luxury text-lg italic text-[#181616] bg-[#FAF9F6] py-3 pr-4 rounded-r-sm">
                    {sec.callout}
                  </blockquote>
                )}

                {sec.bulletPoints && (
                  <ul className="space-y-2 my-4 pl-2">
                    {sec.bulletPoints.map((bp, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#383431]">
                        <CheckCircle2 className="w-4 h-4 text-[#C9A96E] flex-shrink-0 mt-0.5" />
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* In-Article CTA Banner */}
          <div className="bg-[#181616] border border-[#C9A96E]/40 p-8 rounded-sm text-white mb-16 shadow-xl">
            <span className="text-[10px] uppercase font-semibold tracking-widest text-[#C9A96E]">
              Consult With Our Authors
            </span>
            <h3 className="font-serif-luxury text-2xl font-medium text-white mt-1 mb-2">
              Have a Specific Property Inquiry or Valuation Need?
            </h3>
            <p className="text-xs text-[#A39E98] leading-relaxed mb-6">
              Our real estate advisory desk and media production studio are available for confidential consultations.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#121010] bg-[#C9A96E] hover:bg-[#D8BC87] rounded-sm transition-all"
              >
                Schedule Private Consultation
              </Link>
              <a
                href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-white/80 hover:text-white"
              >
                <MessageCircle className="w-4 h-4 text-[#C9A96E]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Related Articles */}
          {related.length > 0 && (
            <div className="pt-12 border-t border-[#E0DCD6]">
              <h3 className="font-serif-luxury text-2xl font-medium text-[#181616] mb-6">
                Related Reading
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {related.map((relPost) => (
                  <BlogCard key={relPost.id} post={relPost} />
                ))}
              </div>
            </div>
          )}
        </Container>
      </article>
    </>
  );
}

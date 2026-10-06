import { MetadataRoute } from 'next';
import { PROPERTIES } from '@/lib/properties';
import { PROJECTS } from '@/lib/projects';
import { BLOG_POSTS } from '@/lib/blog';
import { siteConfig } from '@/lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticRoutes = [
    '',
    '/about',
    '/properties',
    '/services',
    '/services/real-estate',
    '/services/marketing',
    '/projects',
    '/case-studies',
    '/list-property',
    '/blog',
    '/contact',
    '/careers',
    '/privacy-policy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const propertyRoutes = PROPERTIES.map((prop) => ({
    url: `${baseUrl}/properties/${prop.slug}`,
    lastModified: new Date(prop.dateListed || new Date()),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  const projectRoutes = PROJECTS.map((proj) => ({
    url: `${baseUrl}/projects/${proj.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...propertyRoutes, ...projectRoutes, ...blogRoutes];
}

/**
 * Dynamic Meta Tags Component
 * 
 * Generates SEO-optimized meta tags for blog posts and pages
 */

import Head from 'next/head';
import { BlogPost } from '@/types/blog';
import { siteConfig } from '@/lib/seo';

interface MetaTagsProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  article?: BlogPost;
  noIndex?: boolean;
}

export const MetaTags = ({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage,
  article,
  noIndex = false
}: MetaTagsProps) => {
  const fullTitle = title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`;
  const fullCanonicalUrl = canonicalUrl || `${siteConfig.url}${typeof window !== 'undefined' ? window.location.pathname : ''}`;
  const fullOgImage = ogImage || siteConfig.ogImage;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      
      {/* Open Graph */}
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:alt" content={article?.imageAlt || description} />
      <meta property="og:locale" content="en_US" />
      
      {/* Article-specific Open Graph */}
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedAt} />
          {article.updatedAt && (
            <meta property="article:modified_time" content={article.updatedAt} />
          )}
          <meta property="article:author" content={article.author.name} />
          <meta property="article:section" content={article.category.name} />
          {article.tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag.name} />
          ))}
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:creator" content={siteConfig.creator} />
      
      {/* Additional SEO */}
      <meta name="author" content={article?.author.name || siteConfig.name} />
      <meta name="publisher" content={siteConfig.name} />
      
      {/* Favicon and Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      
      {/* Viewport and Mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#3b82f6" />
    </Head>
  );
};

export default MetaTags;
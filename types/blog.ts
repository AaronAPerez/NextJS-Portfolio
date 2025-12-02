// Blog types for blog-posts.ts data structure

export interface BlogAuthor {
  id?: string;
  name: string;
  avatar?: string;
  role?: string;
  bio?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

export interface BlogCategory {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  color?: string;
  icon?: unknown;
  count?: number;
}

export interface BlogTag {
  id: string;
  name: string;
  slug?: string;
  count?: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  featuredImage?: string;
  imageAlt?: string;
  author: BlogAuthor;
  category: BlogCategory;
  tags: BlogTag[];
  publishedAt: string;
  updatedAt?: string;
  readTime?: number;
  readingTime?: number;
  views?: number;
  likes?: number;
  comments?: number;
  featured?: boolean;
  trending?: boolean;
  status?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogImage?: string;
    canonicalUrl?: string;
    openGraph?: {
      title?: string;
      description?: string;
      image?: string;
      type?: string;
    };
    twitter?: {
      card?: string;
      title?: string;
      description?: string;
      image?: string;
    };
  };
  published?: boolean;
}

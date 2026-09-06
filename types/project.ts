/**
 * Project Types for Admin Management System
 *
 * These types define the structure for projects stored in the database
 * and used throughout the admin interface.
 */

// Project status options
export type ProjectStatus = 'draft' | 'in_development' | 'published' | 'archived';

// Project category options
export type ProjectCategory = 'production' | 'portfolio' | 'coursework';

// Client type options
export type ClientType = 'business' | 'personal' | 'demo';

// Image structure for project gallery
export interface ProjectImage {
  id: string;
  url: string;
  alt: string;
  isPrimary?: boolean;
}

// Gradient color configuration for branding
export interface ProjectGradient {
  from: string;  // Hex color e.g., "#FD5A1E"
  to: string;    // Hex color e.g., "#A5ACAF"
}

// Individual metric item for business impact section
export interface MetricItem {
  label: string;
  value: string;
  improvement: string;
  icon: string;   // Icon name as string for DB storage (e.g., "TrendingUp")
  color: string;  // Tailwind color class (e.g., "text-green-600")
}

// Business impact data structure
export interface BusinessImpact {
  primaryMetric: {
    label: string;
    value: string;
    improvement: string;
    timeframe: string;
  };
  keyMetrics: MetricItem[];
  roiStatement: string;
  clientTestimonial?: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
}

// Technical highlights and performance metrics
export interface TechnicalHighlights {
  performanceScore: number;     // Lighthouse score 0-100
  accessibilityScore: number;   // Lighthouse score 0-100
  seoScore: number;             // Lighthouse score 0-100
  coreWebVitals: {
    lcp: number;  // Largest Contentful Paint in seconds
    fid: number;  // First Input Delay in milliseconds
    cls: number;  // Cumulative Layout Shift
  };
  innovations: string[];  // List of technical innovations
}

// SEO metadata for project
export interface ProjectSEO {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

/**
 * Contextual detail shown on a project card (e.g. "Houston, TX").
 *
 * Point-in-time metrics such as commit counts and Lighthouse scores are
 * intentionally absent — stored as static values they go stale silently.
 */
export interface ProjectStats {
  label?: string;
}

// Core Project interface matching database schema
export interface ProjectDB {
  id: string;
  title: string;
  description: string;
  longDescription?: string;  // Extended description for detailed views
  slug: string;
  category: ProjectCategory;
  clientType?: ClientType;
  status: ProjectStatus;
  featured: boolean;
  isLive: boolean;
  displayOrder: number;
  tech: string[];
  highlights?: string[];  // Key project highlights/features
  stats?: ProjectStats;   // Contextual card label
  images: ProjectImage[];
  gradient?: ProjectGradient;
  companyLogo?: string | null;  // URL to company/client logo image — DB stores null, not omitted
  demoLink?: string;
  codeLink?: string;
  websiteLink?: string;
  businessImpact?: BusinessImpact;
  technicalHighlights?: TechnicalHighlights;
  timeline?: string;
  teamSize?: string;
  role?: string;
  seo?: ProjectSEO;
  createdAt: string;
  updatedAt: string;
}

// Form data type for create/edit forms (excludes auto-generated fields)
export type ProjectFormData = Omit<ProjectDB, 'id' | 'createdAt' | 'updatedAt'>;

// Create project input (minimal required fields)
export interface CreateProjectInput {
  title: string;
  description: string;
  longDescription?: string;  // Extended description
  slug?: string;  // Auto-generated from title if not provided
  category?: ProjectCategory;
  clientType?: ClientType;
  status?: ProjectStatus;
  featured?: boolean;
  isLive?: boolean;
  displayOrder?: number;
  tech?: string[];
  highlights?: string[];  // Key project highlights
  stats?: ProjectStats;   // Contextual card label
  images?: ProjectImage[];
  gradient?: ProjectGradient;
  companyLogo?: string;  // URL to company/client logo image
  demoLink?: string;
  codeLink?: string;
  websiteLink?: string;
  businessImpact?: BusinessImpact;
  technicalHighlights?: TechnicalHighlights;
  timeline?: string;
  teamSize?: string;
  role?: string;
  seo?: ProjectSEO;
}

// Update project input (all fields optional)
export type UpdateProjectInput = Partial<CreateProjectInput>;

// API response types
export interface ProjectsResponse {
  projects: ProjectDB[];
  total: number;
}

export interface ProjectResponse {
  project: ProjectDB;
}

// Filter options for listing projects
export interface ProjectFilters {
  status?: ProjectStatus;
  category?: ProjectCategory;
  featured?: boolean;
  search?: string;
}

// Reorder request type
export interface ReorderProjectsInput {
  projects: Array<{ id: string; displayOrder: number }>;
}

// Raw row shape returned by `sql` for the "Project" table. The schema is
// hybrid (see transformProject in the API routes): legacy columns (images as
// string[], order, published) coexist with newer ones (images as JSONB
// objects, displayOrder, status), so most fields here are nullable/loosely
// typed rather than matching ProjectDB directly.
export interface ProjectRow {
  id: string;
  title: string;
  description: string;
  longDescription?: string | null;
  slug?: string | null;
  category?: string | null;
  clientType?: string | null;
  status?: string | null;
  published?: boolean | null;
  featured?: boolean | null;
  isLive?: boolean | null;
  displayOrder?: number | null;
  order?: number | null;
  tech?: string[] | null;
  highlights?: string[] | null;
  stats?: ProjectStats | null;
  images?: string[] | ProjectImage[] | null;
  imagesAlt?: string[] | null;
  gradient?: ProjectGradient | null;
  gradientFrom?: string | null;
  gradientTo?: string | null;
  companyLogo?: string | null;
  demoLink?: string | null;
  codeLink?: string | null;
  websiteLink?: string | null;
  businessImpact?: BusinessImpact | null;
  technicalHighlights?: TechnicalHighlights | null;
  timeline?: string | null;
  teamSize?: string | null;
  role?: string | null;
  seo?: ProjectSEO | null;
  createdAt: string;
  updatedAt: string;
}

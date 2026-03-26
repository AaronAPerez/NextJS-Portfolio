/**
 * GBP Audit Types
 * ────────────────
 * Types for the free GBP audit lead magnet tool
 */

// ── Audit Input (what the user provides) ──────────────────────────────────────

export interface GBPAuditInput {
  businessName: string;
  businessPhone: string;
  businessWebsite?: string;
  businessCity: string;
  businessState: string;
  businessCategory: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
}

// ── Audit Check Result ────────────────────────────────────────────────────────

export type AuditStatus = 'pass' | 'warning' | 'fail' | 'unknown';

export interface AuditCheck {
  id: string;
  category: string;
  title: string;
  status: AuditStatus;
  score: number; // 0-100
  maxScore: number;
  finding: string;
  recommendation?: string;
  priority: 'high' | 'medium' | 'low';
}

// ── Audit Result Summary ──────────────────────────────────────────────────────

export interface GBPAuditResult {
  id: string;
  createdAt: string;
  input: GBPAuditInput;
  overallScore: number; // 0-100
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  checks: AuditCheck[];
  summary: {
    passes: number;
    warnings: number;
    fails: number;
    totalChecks: number;
  };
  topIssues: AuditCheck[];
  competitorComparison?: {
    yourScore: number;
    avgCompetitorScore: number;
    topCompetitorScore: number;
  };
}

// ── Audit Categories ──────────────────────────────────────────────────────────

export const AUDIT_CATEGORIES = [
  { id: 'profile', name: 'Profile Completeness', weight: 25 },
  { id: 'content', name: 'Content Quality', weight: 20 },
  { id: 'photos', name: 'Photos & Media', weight: 15 },
  { id: 'reviews', name: 'Reviews & Reputation', weight: 20 },
  { id: 'engagement', name: 'Engagement & Activity', weight: 10 },
  { id: 'citations', name: 'Citations & NAP', weight: 10 },
] as const;

// ── Grade Thresholds ──────────────────────────────────────────────────────────

export const GRADE_THRESHOLDS = {
  A: 90,
  B: 80,
  C: 70,
  D: 60,
  F: 0,
} as const;

export function calculateGrade(score: number): 'A' | 'B' | 'C' | 'D' | 'F' {
  if (score >= GRADE_THRESHOLDS.A) return 'A';
  if (score >= GRADE_THRESHOLDS.B) return 'B';
  if (score >= GRADE_THRESHOLDS.C) return 'C';
  if (score >= GRADE_THRESHOLDS.D) return 'D';
  return 'F';
}

// ── Sample Audit Checks (used for demo/simulation) ────────────────────────────

export const SAMPLE_AUDIT_CHECKS: Omit<AuditCheck, 'status' | 'score' | 'finding'>[] = [
  // Profile Completeness
  {
    id: 'profile-claimed',
    category: 'profile',
    title: 'Business Profile Claimed',
    maxScore: 15,
    priority: 'high',
    recommendation: 'Claim and verify your Google Business Profile to take control of your listing.',
  },
  {
    id: 'profile-categories',
    category: 'profile',
    title: 'Business Categories Set',
    maxScore: 10,
    priority: 'high',
    recommendation: 'Add a primary category and up to 9 secondary categories that match your services.',
  },
  {
    id: 'profile-hours',
    category: 'profile',
    title: 'Business Hours Listed',
    maxScore: 8,
    priority: 'medium',
    recommendation: 'Add complete business hours including special hours for holidays.',
  },
  {
    id: 'profile-description',
    category: 'profile',
    title: 'Business Description',
    maxScore: 10,
    priority: 'high',
    recommendation: 'Write a keyword-rich 750-character description of your business.',
  },
  {
    id: 'profile-services',
    category: 'profile',
    title: 'Services Listed',
    maxScore: 8,
    priority: 'medium',
    recommendation: 'Add all your services with descriptions and pricing if applicable.',
  },
  {
    id: 'profile-attributes',
    category: 'profile',
    title: 'Business Attributes',
    maxScore: 5,
    priority: 'low',
    recommendation: 'Add relevant attributes like "wheelchair accessible", "free wifi", etc.',
  },

  // Content Quality
  {
    id: 'content-keywords',
    category: 'content',
    title: 'Keyword Optimization',
    maxScore: 15,
    priority: 'high',
    recommendation: 'Include target keywords naturally in your business description and services.',
  },
  {
    id: 'content-qa',
    category: 'content',
    title: 'Q&A Section Active',
    maxScore: 8,
    priority: 'medium',
    recommendation: 'Seed your Q&A section with common customer questions and helpful answers.',
  },
  {
    id: 'content-products',
    category: 'content',
    title: 'Products/Menu Listed',
    maxScore: 7,
    priority: 'low',
    recommendation: 'If applicable, add products or menu items to your profile.',
  },

  // Photos & Media
  {
    id: 'photos-logo',
    category: 'photos',
    title: 'Logo Uploaded',
    maxScore: 5,
    priority: 'high',
    recommendation: 'Upload a high-quality square logo image.',
  },
  {
    id: 'photos-cover',
    category: 'photos',
    title: 'Cover Photo Set',
    maxScore: 5,
    priority: 'high',
    recommendation: 'Add an attractive cover photo that represents your business.',
  },
  {
    id: 'photos-count',
    category: 'photos',
    title: 'Photo Quantity (10+ recommended)',
    maxScore: 10,
    priority: 'medium',
    recommendation: 'Upload at least 10 high-quality photos of your business, team, and work.',
  },
  {
    id: 'photos-recent',
    category: 'photos',
    title: 'Recent Photos Added',
    maxScore: 5,
    priority: 'medium',
    recommendation: 'Add new photos regularly to show your business is active.',
  },

  // Reviews & Reputation
  {
    id: 'reviews-count',
    category: 'reviews',
    title: 'Review Count',
    maxScore: 15,
    priority: 'high',
    recommendation: 'Implement a review generation strategy to increase review volume.',
  },
  {
    id: 'reviews-rating',
    category: 'reviews',
    title: 'Average Rating (4.5+ ideal)',
    maxScore: 15,
    priority: 'high',
    recommendation: 'Focus on service quality and address negative reviews promptly.',
  },
  {
    id: 'reviews-response',
    category: 'reviews',
    title: 'Review Response Rate',
    maxScore: 10,
    priority: 'medium',
    recommendation: 'Respond to all reviews, both positive and negative, within 24-48 hours.',
  },
  {
    id: 'reviews-recency',
    category: 'reviews',
    title: 'Recent Reviews',
    maxScore: 8,
    priority: 'medium',
    recommendation: 'Maintain a steady flow of new reviews each month.',
  },

  // Engagement & Activity
  {
    id: 'engagement-posts',
    category: 'engagement',
    title: 'GBP Posts Activity',
    maxScore: 10,
    priority: 'medium',
    recommendation: 'Post weekly updates, offers, and events to your GBP profile.',
  },
  {
    id: 'engagement-updates',
    category: 'engagement',
    title: 'Profile Update Frequency',
    maxScore: 5,
    priority: 'low',
    recommendation: 'Keep your profile information current and update regularly.',
  },

  // Citations & NAP
  {
    id: 'citations-nap',
    category: 'citations',
    title: 'NAP Consistency',
    maxScore: 10,
    priority: 'high',
    recommendation: 'Ensure your Name, Address, and Phone are identical across all platforms.',
  },
  {
    id: 'citations-count',
    category: 'citations',
    title: 'Citation Presence',
    maxScore: 8,
    priority: 'medium',
    recommendation: 'List your business on top directories like Yelp, Facebook, Apple Maps, etc.',
  },
];

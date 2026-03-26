/**
 * GBP Monthly Report — Type Definitions
 * ───────────────────────────────────────
 * All data shapes for the monthly Google Business Profile
 * performance report. Designed to be filled manually or
 * eventually wired to the GBP Insights API.
 *
 * Separating report types from intake types keeps concerns clean —
 * intake is collected once, report data is collected monthly.
 */

// ── Core GBP Insights metrics (pulled from GBP dashboard monthly) ─────────────
export interface GBPInsights {
  // Profile visibility
  totalViews: number;           // "Business impressions on Google Search"
  searchViews: number;          // Views from direct/discovery search
  mapsViews: number;            // Views from Google Maps
  viewsChange: number;          // % change vs prior month (positive or negative)

  // Customer actions
  websiteClicks: number;
  websiteClicksChange: number;
  phoneCalls: number;
  phoneCallsChange: number;
  directionRequests: number;
  directionRequestsChange: number;

  // Photos
  photoViews: number;
  photoViewsChange: number;
  photosUploaded: number;       // New photos added this month

  // Posts
  postsPublished: number;
  postViews: number;
}

// ── Review metrics ─────────────────────────────────────────────────────────────
export interface ReviewMetrics {
  totalReviews: number;
  newReviewsThisMonth: number;
  averageRating: number;         // e.g. 4.7
  ratingChange: number;          // +/- vs prior month
  respondedCount: number;        // How many new reviews got a response
  responseRate: number;          // % 0-100
}

// ── Citation tracking ──────────────────────────────────────────────────────────
export interface CitationMetrics {
  totalCitations: number;        // Running total across all directories
  newThisMonth: number;
  topDirectories: string[];      // e.g. ["Yelp", "Apple Maps", "BBB"]
}

// ── Keyword ranking snapshot ───────────────────────────────────────────────────
export interface KeywordRanking {
  keyword: string;               // e.g. "vending machines Modesto"
  currentRank: number | null;    // null = not in top 20
  previousRank: number | null;
  inLocalPack: boolean;          // Appearing in the 3-Pack
}

// ── Action items / recommendations ────────────────────────────────────────────
export interface ActionItem {
  id: string;
  priority: 'high' | 'medium' | 'low';
  category: 'profile' | 'reviews' | 'content' | 'citations' | 'website';
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'complete';
}

// ── Monthly goal tracking ──────────────────────────────────────────────────────
export interface MonthlyGoal {
  metric: string;
  target: number;
  actual: number;
  unit: string;    // "reviews", "posts", "citations", etc.
}

// ── Full report data shape ─────────────────────────────────────────────────────
export interface GBPMonthlyReport {
  // Meta
  reportId: string;
  clientName: string;
  clientBusinessName: string;
  clientWebsite: string;
  serviceArea: string;
  reportMonth: string;           // e.g. "March 2026"
  reportDate: string;            // ISO string
  preparedBy: string;            // e.g. "AP Designs"
  preparedByEmail: string;
  preparedByWebsite: string;

  // Month number in campaign (Month 1, Month 2, etc.)
  campaignMonth: number;

  // Core data sections
  insights: GBPInsights;
  reviews: ReviewMetrics;
  citations: CitationMetrics;
  keywords: KeywordRanking[];
  actionItems: ActionItem[];
  goals: MonthlyGoal[];

  // Narrative fields (written by the agency)
  executiveSummary: string;      // 2-3 sentence plain-English summary
  highlightOfMonth: string;      // Biggest win this month
  nextMonthFocus: string;        // What we're prioritizing next month
}

// ── Default / sample report (used for preview and testing) ────────────────────
export const sampleReport: GBPMonthlyReport = {
  reportId: 'report_amp_march_2026',
  clientName: 'Aaron Perez',
  clientBusinessName: 'AMP Vending Machines',
  clientWebsite: 'https://www.ampvendingmachines.com',
  serviceArea: 'Modesto, Stockton & Central Valley, CA',
  reportMonth: 'March 2026',
  reportDate: new Date().toISOString(),
  preparedBy: 'AP Designs',
  preparedByEmail: 'aaron@apdesigns.com',
  preparedByWebsite: 'https://aaronaperez.dev',
  campaignMonth: 2,

  insights: {
    totalViews: 1247,
    searchViews: 874,
    mapsViews: 373,
    viewsChange: 18,
    websiteClicks: 134,
    websiteClicksChange: 22,
    phoneCalls: 47,
    phoneCallsChange: 31,
    directionRequests: 28,
    directionRequestsChange: 12,
    photoViews: 2180,
    photoViewsChange: 45,
    photosUploaded: 6,
    postsPublished: 4,
    postViews: 312,
  },

  reviews: {
    totalReviews: 14,
    newReviewsThisMonth: 3,
    averageRating: 4.8,
    ratingChange: 0.1,
    respondedCount: 3,
    responseRate: 100,
  },

  citations: {
    totalCitations: 28,
    newThisMonth: 7,
    topDirectories: ['Yelp', 'Apple Maps', 'BBB', 'Yellow Pages', 'Bing Places'],
  },

  keywords: [
    { keyword: 'vending machines Modesto', currentRank: 3, previousRank: 7, inLocalPack: true },
    { keyword: 'vending machine company Stockton', currentRank: 5, previousRank: 12, inLocalPack: false },
    { keyword: 'free vending machine placement CA', currentRank: 8, previousRank: null, inLocalPack: false },
    { keyword: 'office vending machines Central Valley', currentRank: 4, previousRank: 6, inLocalPack: true },
    { keyword: 'snack vending machine Stanislaus County', currentRank: 2, previousRank: 4, inLocalPack: true },
  ],

  actionItems: [
    {
      id: 'ai-1', priority: 'high', category: 'reviews',
      title: 'Deploy QR review cards at 3 new locations',
      description: 'Print and install review request QR cards at the Modesto warehouse, Turlock office, and Stockton distribution center.',
      status: 'in-progress',
    },
    {
      id: 'ai-2', priority: 'high', category: 'content',
      title: 'Add Turlock city landing page',
      description: 'Build /service-areas/turlock targeting "vending machines Turlock CA" — current page gap vs. competitors.',
      status: 'pending',
    },
    {
      id: 'ai-3', priority: 'medium', category: 'profile',
      title: 'Upload 4 new geo-tagged machine photos',
      description: 'Client to provide photos from recent Stockton installation. Geo-tag before upload.',
      status: 'pending',
    },
    {
      id: 'ai-4', priority: 'medium', category: 'citations',
      title: 'Submit to 5 industry directories',
      description: 'VendingMarketWatch, NAMA directory, local Chamber of Commerce listings for Stanislaus County.',
      status: 'pending',
    },
    {
      id: 'ai-5', priority: 'low', category: 'website',
      title: 'Add FAQ schema to /services page',
      description: 'Extend existing FAQ schema to the /services route for richer SERP appearance.',
      status: 'complete',
    },
  ],

  goals: [
    { metric: 'GBP views', target: 1200, actual: 1247, unit: 'views' },
    { metric: 'Phone calls', target: 40, actual: 47, unit: 'calls' },
    { metric: 'New reviews', target: 3, actual: 3, unit: 'reviews' },
    { metric: 'Posts published', target: 4, actual: 4, unit: 'posts' },
    { metric: 'New citations', target: 5, actual: 7, unit: 'directories' },
  ],

  executiveSummary:
    'Month 2 delivered strong growth across all key GBP metrics. Profile views increased 18% month-over-month, driven primarily by improved Local 3-Pack rankings for Modesto and Stanislaus County keywords. Phone call volume hit a campaign high of 47 calls — a 31% increase — indicating the optimization is converting to real business inquiries.',

  highlightOfMonth:
    '"Vending machines Modesto" moved from position 7 into the Local 3-Pack at position 3 — the single most impactful ranking shift of the campaign so far.',

  nextMonthFocus:
    'Expand the city page strategy to Turlock and Ceres, push for 5 new reviews to cross the 15-review threshold, and complete the 5 industry directory submissions to strengthen domain authority.',
};

// ── Utility: compute rank change direction ─────────────────────────────────────
export function getRankChange(current: number | null, previous: number | null): 'up' | 'down' | 'new' | 'same' {
  if (current === null) return 'same';
  if (previous === null) return 'new';
  if (current < previous) return 'up';   // Lower rank number = better position
  if (current > previous) return 'down';
  return 'same';
}

// ── Utility: format change as +/- string ──────────────────────────────────────
export function formatChange(value: number, suffix = '%'): string {
  if (value > 0) return `+${value}${suffix}`;
  if (value < 0) return `${value}${suffix}`;
  return `—`;
}

// ── Priority color map ─────────────────────────────────────────────────────────
export const PRIORITY_COLORS = {
  high: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
  medium: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
  low: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
} as const;

export const STATUS_COLORS = {
  pending: { bg: 'bg-gray-500/10', text: 'text-gray-400' },
  'in-progress': { bg: 'bg-blue-500/10', text: 'text-blue-400' },
  complete: { bg: 'bg-green-500/10', text: 'text-green-400' },
} as const;

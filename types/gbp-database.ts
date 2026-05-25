/**
 * GBP Optimization Database Types
 * ─────────────────────────────────
 * TypeScript interfaces matching the Neon database schema
 * for the GBP Optimization service
 */

// ── Enum Types ───────────────────────────────────────────────────────────────

export type GBPAccessLevel = 'owner' | 'manager' | 'none';
export type CustomerType = 'b2b' | 'b2c' | 'both';
export type ReviewMethod = 'qr' | 'email' | 'sms' | 'all';
export type ReportingCadence = 'biweekly' | 'monthly';
export type ClientStatus = 'lead' | 'onboarding' | 'active' | 'paused' | 'churned';
export type ActionPriority = 'high' | 'medium' | 'low';
export type ActionCategory = 'profile' | 'reviews' | 'content' | 'citations' | 'website';
export type ActionStatus = 'pending' | 'in_progress' | 'complete';
export type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed';
export type PostType = 'update' | 'offer' | 'event' | 'product';
export type ReviewSentiment = 'positive' | 'neutral' | 'negative';

// ── Business Hours ───────────────────────────────────────────────────────────

export interface BusinessHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

// ── Client (Main Table) ──────────────────────────────────────────────────────

export interface GBPClient {
  id: string;
  // Business Info
  legal_name: string;
  primary_category: string | null;
  secondary_categories: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  primary_phone: string | null;
  website_url: string | null;
  year_established: number | null;
  service_areas: string | null;
  business_hours: BusinessHours;
  // Content & Messaging
  business_description: string | null;
  services_list: string | null;
  service_descriptions: string | null;
  target_keywords: string | null;
  top_faqs: string | null;
  unique_selling_prop: string | null;
  current_promotions: string | null;
  // Photos & Media
  has_logo: boolean;
  has_cover_photo: boolean;
  photo_count: number;
  has_geo_tagged_photos: boolean;
  has_team_photo: boolean;
  has_video: boolean;
  has_before_after_photos: boolean;
  photo_notes: string | null;
  // Access & Accounts
  gbp_access: GBPAccessLevel | null;
  ga4_access: boolean;
  search_console_access: boolean;
  cms_access: boolean;
  social_media_access: boolean;
  citation_logins: string | null;
  access_notes: string | null;
  // Competitor Intel
  competitor_1_name: string | null;
  competitor_1_url: string | null;
  competitor_2_name: string | null;
  competitor_2_url: string | null;
  competitor_3_name: string | null;
  competitor_3_url: string | null;
  target_geographies: string | null;
  customer_type: CustomerType | null;
  seasonal_patterns: string | null;
  previous_seo_work: string | null;
  // Ongoing Delivery
  preferred_post_topics: string | null;
  monthly_photo_delivery: boolean;
  review_request_method: ReviewMethod | null;
  reporting_cadence: ReportingCadence | null;
  point_of_contact: string | null;
  point_of_contact_email: string | null;
  point_of_contact_phone: string | null;
  additional_notes: string | null;
  // Meta
  status: ClientStatus;
  campaign_start_date: string | null;
  monthly_fee: number | null;
  created_at: string;
  updated_at: string;
}

// ── Monthly Report ───────────────────────────────────────────────────────────

export interface GBPMonthlyReportDB {
  id: string;
  client_id: string;
  report_month: string;
  campaign_month: number;
  // GBP Insights
  total_views: number;
  search_views: number;
  maps_views: number;
  views_change: number;
  website_clicks: number;
  website_clicks_change: number;
  phone_calls: number;
  phone_calls_change: number;
  direction_requests: number;
  direction_requests_change: number;
  photo_views: number;
  photo_views_change: number;
  photos_uploaded: number;
  posts_published: number;
  post_views: number;
  // Reviews
  total_reviews: number;
  new_reviews: number;
  average_rating: number;
  rating_change: number;
  reviews_responded: number;
  response_rate: number;
  // Citations
  total_citations: number;
  new_citations: number;
  // Narrative
  executive_summary: string | null;
  highlight_of_month: string | null;
  next_month_focus: string | null;
  // Meta
  prepared_by: string;
  prepared_by_email: string | null;
  report_date: string;
  created_at: string;
  updated_at: string;
}

// ── Citation ─────────────────────────────────────────────────────────────────

export interface Citation {
  id: string;
  client_id: string;
  directory_name: string;
  directory_url: string | null;
  listing_url: string | null;
  status: string;
  nap_consistent: boolean;
  submitted_date: string | null;
  live_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

// ── Citation Directory ───────────────────────────────────────────────────────

export interface CitationDirectory {
  id: string;
  name: string;
  url: string;
  category: string | null;
  domain_authority: number | null;
  is_free: boolean;
  avg_approval_days: number | null;
  notes: string | null;
  created_at: string;
}

// ── Keyword ──────────────────────────────────────────────────────────────────

export interface Keyword {
  id: string;
  client_id: string;
  keyword: string;
  search_volume: number | null;
  difficulty_score: number | null;
  is_primary: boolean;
  target_location: string | null;
  created_at: string;
}

// ── Keyword Ranking ──────────────────────────────────────────────────────────

export interface KeywordRanking {
  id: string;
  keyword_id: string;
  client_id: string;
  rank_position: number | null;
  in_local_pack: boolean;
  local_pack_position: number | null;
  tracked_date: string;
  created_at: string;
}

// ── Post ─────────────────────────────────────────────────────────────────────

export interface GBPPost {
  id: string;
  client_id: string;
  post_type: PostType;
  title: string | null;
  content: string;
  call_to_action: string | null;
  cta_url: string | null;
  image_url: string | null;
  status: PostStatus;
  scheduled_date: string | null;
  published_date: string | null;
  views: number;
  clicks: number;
  created_at: string;
  updated_at: string;
}

// ── Review ───────────────────────────────────────────────────────────────────

export interface Review {
  id: string;
  client_id: string;
  reviewer_name: string | null;
  rating: number;
  review_text: string | null;
  sentiment: ReviewSentiment | null;
  review_date: string | null;
  responded: boolean;
  response_text: string | null;
  response_date: string | null;
  platform: string;
  review_url: string | null;
  created_at: string;
}

// ── Action Item ──────────────────────────────────────────────────────────────

export interface ActionItem {
  id: string;
  client_id: string;
  report_id: string | null;
  priority: ActionPriority;
  category: ActionCategory;
  title: string;
  description: string | null;
  status: ActionStatus;
  due_date: string | null;
  completed_date: string | null;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
}

// ── Monthly Goal ─────────────────────────────────────────────────────────────

export interface MonthlyGoal {
  id: string;
  client_id: string;
  report_id: string;
  metric: string;
  target_value: number;
  actual_value: number;
  unit: string | null;
  created_at: string;
}

// ── Service Package ──────────────────────────────────────────────────────────

export interface ServicePackage {
  id: string;
  name: string;
  description: string | null;
  monthly_price: number;
  features: string[];
  posts_per_month: number;
  citations_per_month: number;
  includes_geo_tagging: boolean;
  includes_reputation_mgmt: boolean;
  includes_analytics: boolean;
  is_active: boolean;
  created_at: string;
}

// ── Dashboard Stats View ─────────────────────────────────────────────────────

export interface ClientDashboardStats {
  id: string;
  legal_name: string;
  status: ClientStatus;
  campaign_start_date: string | null;
  monthly_fee: number | null;
  total_citations: number;
  tracked_keywords: number;
  total_posts: number;
  total_reviews: number;
  avg_rating: number | null;
  pending_actions: number;
  last_report: string | null;
}

// ── Keyword Performance View ─────────────────────────────────────────────────

export interface KeywordPerformance {
  id: string;
  client_id: string;
  keyword: string;
  is_primary: boolean;
  current_rank: number | null;
  in_local_pack: boolean;
  tracked_date: string;
  previous_rank: number | null;
}

// ── API Response Types ───────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ── Form Input Types (for creating/updating) ─────────────────────────────────

export type CreateClientInput = Omit<GBPClient, 'id' | 'created_at' | 'updated_at'>;
export type UpdateClientInput = Partial<CreateClientInput>;

export type CreateReportInput = Omit<GBPMonthlyReportDB, 'id' | 'created_at' | 'updated_at'>;
export type UpdateReportInput = Partial<CreateReportInput>;

export type CreateCitationInput = Omit<Citation, 'id' | 'created_at' | 'updated_at'>;
export type UpdateCitationInput = Partial<CreateCitationInput>;

export type CreateKeywordInput = Omit<Keyword, 'id' | 'created_at'>;
export type CreateKeywordRankingInput = Omit<KeywordRanking, 'id' | 'created_at'>;

export type CreatePostInput = Omit<GBPPost, 'id' | 'created_at' | 'updated_at' | 'views' | 'clicks'>;
export type UpdatePostInput = Partial<CreatePostInput>;

export type CreateReviewInput = Omit<Review, 'id' | 'created_at'>;
export type UpdateReviewInput = Partial<CreateReviewInput>;

export type CreateActionItemInput = Omit<ActionItem, 'id' | 'created_at' | 'updated_at'>;
export type UpdateActionItemInput = Partial<CreateActionItemInput>;

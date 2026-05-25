/**
 * GBP Intake Form Types
 * ─────────────────────
 * All TypeScript interfaces and enums for the Google Business Profile
 * client onboarding wizard. Designed to be reusable across clients.
 */

// ── Step identifiers ─────────────────────────────────────────────────────────
export type StepId =
  | 'business-info'
  | 'content-messaging'
  | 'photos-media'
  | 'access-accounts'
  | 'competitor-intel'
  | 'ongoing-delivery';

// ── Individual step metadata ──────────────────────────────────────────────────
export interface WizardStep {
  id: StepId;
  title: string;
  subtitle: string;
  icon: string; // Lucide icon name
}

// ── Section 1: Business Information ──────────────────────────────────────────
export interface BusinessInfo {
  legalName: string;
  primaryCategory: string;
  secondaryCategories: string; // comma-separated
  address: string;
  city: string;
  state: string;
  zip: string;
  primaryPhone: string;
  websiteUrl: string;
  mondayHours: string;
  tuesdayHours: string;
  wednesdayHours: string;
  thursdayHours: string;
  fridayHours: string;
  saturdayHours: string;
  sundayHours: string;
  yearEstablished: string;
  serviceAreas: string; // comma-separated cities/counties
}

// ── Section 2: Content & Messaging ───────────────────────────────────────────
export interface ContentMessaging {
  businessDescription: string; // max 750 chars
  servicesList: string;        // newline-separated
  serviceDescriptions: string;
  targetKeywords: string;      // comma-separated
  topFaqs: string;             // newline-separated Q&A pairs
  uniqueSellingProp: string;
  currentPromotions: string;
}

// ── Section 3: Photos & Media ─────────────────────────────────────────────────
export interface PhotosMedia {
  hasLogo: boolean;
  hasCoverPhoto: boolean;
  photoCount: string;           // number as string for input
  hasGeoTaggedPhotos: boolean;
  hasTeamPhoto: boolean;
  hasVideo: boolean;
  hasBeforeAfterPhotos: boolean;
  photoNotes: string;           // any additional context
}

// ── Section 4: Access & Accounts ─────────────────────────────────────────────
export interface AccessAccounts {
  gbpAccess: 'owner' | 'manager' | 'none' | '';
  ga4Access: boolean;
  searchConsoleAccess: boolean;
  cmsAccess: boolean;
  socialMediaAccess: boolean;
  citationLogins: string; // which platforms they already have
  accessNotes: string;
}

// ── Section 5: Competitor & Market Intel ─────────────────────────────────────
export interface CompetitorIntel {
  competitor1Name: string;
  competitor1Url: string;
  competitor2Name: string;
  competitor2Url: string;
  competitor3Name: string;
  competitor3Url: string;
  targetGeographies: string; // comma-separated
  customerType: 'b2b' | 'b2c' | 'both' | '';
  seasonalPatterns: string;
  previousSeoWork: string;
}

// ── Section 6: Ongoing Delivery ───────────────────────────────────────────────
export interface OngoingDelivery {
  preferredPostTopics: string;
  monthlyPhotoDelivery: boolean;
  reviewRequestMethod: 'qr' | 'email' | 'sms' | 'all' | '';
  reportingCadence: 'biweekly' | 'monthly' | '';
  pointOfContact: string;
  pointOfContactEmail: string;
  pointOfContactPhone: string;
  additionalNotes: string;
}

// ── Master intake form data ───────────────────────────────────────────────────
export interface GBPIntakeData {
  // Meta
  clientId: string;           // generated UUID on creation
  createdAt: string;          // ISO date string
  updatedAt: string;
  completedSteps: StepId[];

  // Sections
  businessInfo: BusinessInfo;
  contentMessaging: ContentMessaging;
  photosMedia: PhotosMedia;
  accessAccounts: AccessAccounts;
  competitorIntel: CompetitorIntel;
  ongoingDelivery: OngoingDelivery;
}

// ── Default / empty form state ────────────────────────────────────────────────
export const defaultIntakeData: GBPIntakeData = {
  clientId: '',
  createdAt: '',
  updatedAt: '',
  completedSteps: [],

  businessInfo: {
    legalName: '',
    primaryCategory: '',
    secondaryCategories: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    primaryPhone: '',
    websiteUrl: '',
    mondayHours: '9:00 AM - 5:00 PM',
    tuesdayHours: '9:00 AM - 5:00 PM',
    wednesdayHours: '9:00 AM - 5:00 PM',
    thursdayHours: '9:00 AM - 5:00 PM',
    fridayHours: '9:00 AM - 5:00 PM',
    saturdayHours: 'Closed',
    sundayHours: 'Closed',
    yearEstablished: '',
    serviceAreas: '',
  },

  contentMessaging: {
    businessDescription: '',
    servicesList: '',
    serviceDescriptions: '',
    targetKeywords: '',
    topFaqs: '',
    uniqueSellingProp: '',
    currentPromotions: '',
  },

  photosMedia: {
    hasLogo: false,
    hasCoverPhoto: false,
    photoCount: '0',
    hasGeoTaggedPhotos: false,
    hasTeamPhoto: false,
    hasVideo: false,
    hasBeforeAfterPhotos: false,
    photoNotes: '',
  },

  accessAccounts: {
    gbpAccess: '',
    ga4Access: false,
    searchConsoleAccess: false,
    cmsAccess: false,
    socialMediaAccess: false,
    citationLogins: '',
    accessNotes: '',
  },

  competitorIntel: {
    competitor1Name: '',
    competitor1Url: '',
    competitor2Name: '',
    competitor2Url: '',
    competitor3Name: '',
    competitor3Url: '',
    targetGeographies: '',
    customerType: '',
    seasonalPatterns: '',
    previousSeoWork: '',
  },

  ongoingDelivery: {
    preferredPostTopics: '',
    monthlyPhotoDelivery: false,
    reviewRequestMethod: '',
    reportingCadence: '',
    pointOfContact: '',
    pointOfContactEmail: '',
    pointOfContactPhone: '',
    additionalNotes: '',
  },
};

// ── Wizard step config ─────────────────────────────────────────────────────────
export const WIZARD_STEPS: WizardStep[] = [
  {
    id: 'business-info',
    title: 'Business Information',
    subtitle: 'NAP, hours & service areas',
    icon: 'Building2',
  },
  {
    id: 'content-messaging',
    title: 'Content & Messaging',
    subtitle: 'Description, services & keywords',
    icon: 'FileText',
  },
  {
    id: 'photos-media',
    title: 'Photos & Media',
    subtitle: 'Visual assets inventory',
    icon: 'Camera',
  },
  {
    id: 'access-accounts',
    title: 'Access & Accounts',
    subtitle: 'GBP, GA4 & platform access',
    icon: 'Key',
  },
  {
    id: 'competitor-intel',
    title: 'Competitor Intel',
    subtitle: 'Market & geographic strategy',
    icon: 'BarChart2',
  },
  {
    id: 'ongoing-delivery',
    title: 'Ongoing Delivery',
    subtitle: 'Posting, reviews & reporting',
    icon: 'CalendarCheck',
  },
];

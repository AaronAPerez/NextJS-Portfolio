/**
 * useGBPIntake Hook
 * ─────────────────
 * Manages the full GBP intake wizard state with localStorage persistence.
 * Generates a unique clientId per session so multiple client records
 * can coexist. Exposes save, load, reset, and step navigation helpers.
 */

'use client';

import { useState, useCallback, useEffect } from 'react';
import {
  GBPIntakeData,
  StepId,
  WIZARD_STEPS,
  defaultIntakeData,
} from '@/types/gbp-intake';

// ── Storage key prefix — one record per clientId ──────────────────────────────
const STORAGE_KEY_PREFIX = 'gbp_intake_';
const ACTIVE_CLIENT_KEY = 'gbp_intake_active_client';

// ── Simple UUID generator (no external dep) ───────────────────────────────────
function generateId(): string {
  return `client_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

// ── Hook return type ──────────────────────────────────────────────────────────
export interface UseGBPIntakeReturn {
  data: GBPIntakeData;
  currentStepIndex: number;
  currentStepId: StepId;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  completionPercent: number;

  // Data updaters — one per section
  updateBusinessInfo: (updates: Partial<GBPIntakeData['businessInfo']>) => void;
  updateContentMessaging: (updates: Partial<GBPIntakeData['contentMessaging']>) => void;
  updatePhotosMedia: (updates: Partial<GBPIntakeData['photosMedia']>) => void;
  updateAccessAccounts: (updates: Partial<GBPIntakeData['accessAccounts']>) => void;
  updateCompetitorIntel: (updates: Partial<GBPIntakeData['competitorIntel']>) => void;
  updateOngoingDelivery: (updates: Partial<GBPIntakeData['ongoingDelivery']>) => void;

  // Navigation
  goToStep: (index: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  markStepComplete: (stepId: StepId) => void;

  // Persistence
  saveToStorage: () => void;
  loadFromStorage: (clientId: string) => boolean;
  resetForm: () => void;
  exportAsJson: () => void;
  getAllClients: () => GBPIntakeData[];

  // Database integration
  submitToDatabase: () => Promise<{ success: boolean; clientId?: string; error?: string }>;
  isSubmitting: boolean;
}

export function useGBPIntake(): UseGBPIntakeReturn {
  const totalSteps = WIZARD_STEPS.length;

  // ── State ──────────────────────────────────────────────────────────────────
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [data, setData] = useState<GBPIntakeData>(() => {
    // On init, try to load existing active client from localStorage
    if (typeof window === 'undefined') return { ...defaultIntakeData };

    try {
      const activeId = localStorage.getItem(ACTIVE_CLIENT_KEY);
      if (activeId) {
        const raw = localStorage.getItem(`${STORAGE_KEY_PREFIX}${activeId}`);
        if (raw) return JSON.parse(raw) as GBPIntakeData;
      }
    } catch {}

    // Fresh record
    return {
      ...defaultIntakeData,
      clientId: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  });

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // ── Persist active clientId whenever it changes ────────────────────────────
  useEffect(() => {
    if (data.clientId) {
      localStorage.setItem(ACTIVE_CLIENT_KEY, data.clientId);
    }
  }, [data.clientId]);

  // ── Auto-save on every data change ────────────────────────────────────────
  useEffect(() => {
    if (!data.clientId) return;
    const updated = { ...data, updatedAt: new Date().toISOString() };
    localStorage.setItem(
      `${STORAGE_KEY_PREFIX}${data.clientId}`,
      JSON.stringify(updated)
    );
  }, [data]);

  // ── Derived values ─────────────────────────────────────────────────────────
  const currentStepId = WIZARD_STEPS[currentStepIndex].id;
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === totalSteps - 1;
  const completionPercent = Math.round(
    (data.completedSteps.length / totalSteps) * 100
  );

  // ── Section updaters ───────────────────────────────────────────────────────
  const updateBusinessInfo = useCallback(
    (updates: Partial<GBPIntakeData['businessInfo']>) =>
      setData((prev) => ({
        ...prev,
        businessInfo: { ...prev.businessInfo, ...updates },
      })),
    []
  );

  const updateContentMessaging = useCallback(
    (updates: Partial<GBPIntakeData['contentMessaging']>) =>
      setData((prev) => ({
        ...prev,
        contentMessaging: { ...prev.contentMessaging, ...updates },
      })),
    []
  );

  const updatePhotosMedia = useCallback(
    (updates: Partial<GBPIntakeData['photosMedia']>) =>
      setData((prev) => ({
        ...prev,
        photosMedia: { ...prev.photosMedia, ...updates },
      })),
    []
  );

  const updateAccessAccounts = useCallback(
    (updates: Partial<GBPIntakeData['accessAccounts']>) =>
      setData((prev) => ({
        ...prev,
        accessAccounts: { ...prev.accessAccounts, ...updates },
      })),
    []
  );

  const updateCompetitorIntel = useCallback(
    (updates: Partial<GBPIntakeData['competitorIntel']>) =>
      setData((prev) => ({
        ...prev,
        competitorIntel: { ...prev.competitorIntel, ...updates },
      })),
    []
  );

  const updateOngoingDelivery = useCallback(
    (updates: Partial<GBPIntakeData['ongoingDelivery']>) =>
      setData((prev) => ({
        ...prev,
        ongoingDelivery: { ...prev.ongoingDelivery, ...updates },
      })),
    []
  );

  // ── Navigation ─────────────────────────────────────────────────────────────
  const goToStep = useCallback((index: number) => {
    if (index >= 0 && index < totalSteps) setCurrentStepIndex(index);
  }, [totalSteps]);

  const markStepComplete = useCallback((stepId: StepId) => {
    setData((prev) => ({
      ...prev,
      completedSteps: prev.completedSteps.includes(stepId)
        ? prev.completedSteps
        : [...prev.completedSteps, stepId],
    }));
  }, []);

  const nextStep = useCallback(() => {
    markStepComplete(currentStepId);
    if (!isLastStep) setCurrentStepIndex((i) => i + 1);
  }, [currentStepId, isLastStep, markStepComplete]);

  const prevStep = useCallback(() => {
    if (!isFirstStep) setCurrentStepIndex((i) => i - 1);
  }, [isFirstStep]);

  // ── Persistence helpers ────────────────────────────────────────────────────
  const saveToStorage = useCallback(() => {
    const updated = { ...data, updatedAt: new Date().toISOString() };
    localStorage.setItem(
      `${STORAGE_KEY_PREFIX}${data.clientId}`,
      JSON.stringify(updated)
    );
  }, [data]);

  const loadFromStorage = useCallback((clientId: string): boolean => {
    try {
      const raw = localStorage.getItem(`${STORAGE_KEY_PREFIX}${clientId}`);
      if (!raw) return false;
      setData(JSON.parse(raw) as GBPIntakeData);
      setCurrentStepIndex(0);
      return true;
    } catch {
      return false;
    }
  }, []);

  const resetForm = useCallback(() => {
    const freshId = generateId();
    const fresh: GBPIntakeData = {
      ...defaultIntakeData,
      clientId: freshId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setData(fresh);
    setCurrentStepIndex(0);
    localStorage.setItem(ACTIVE_CLIENT_KEY, freshId);
  }, []);

  /** Download full intake data as a JSON file for record-keeping */
  const exportAsJson = useCallback(() => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gbp-intake-${data.businessInfo.legalName || data.clientId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [data]);

  /** Return all client records from localStorage */
  const getAllClients = useCallback((): GBPIntakeData[] => {
    const clients: GBPIntakeData[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(STORAGE_KEY_PREFIX)) {
        try {
          const raw = localStorage.getItem(key);
          if (raw) clients.push(JSON.parse(raw));
        } catch {}
      }
    }
    return clients.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }, []);

  /**
   * Submit the intake data to the Neon database
   * Transforms the local form data structure to match the API schema
   */
  const submitToDatabase = useCallback(async (): Promise<{
    success: boolean;
    clientId?: string;
    error?: string;
  }> => {
    setIsSubmitting(true);

    try {
      // Transform local data structure to API schema
      const apiData = {
        legal_name: data.businessInfo.legalName,
        primary_category: data.businessInfo.primaryCategory,
        secondary_categories: data.businessInfo.secondaryCategories,
        address: data.businessInfo.address,
        city: data.businessInfo.city,
        state: data.businessInfo.state,
        zip: data.businessInfo.zip,
        primary_phone: data.businessInfo.primaryPhone,
        website_url: data.businessInfo.websiteUrl,
        year_established: data.businessInfo.yearEstablished,
        service_areas: data.businessInfo.serviceAreas,
        // Business hours
        monday_hours: data.businessInfo.mondayHours,
        tuesday_hours: data.businessInfo.tuesdayHours,
        wednesday_hours: data.businessInfo.wednesdayHours,
        thursday_hours: data.businessInfo.thursdayHours,
        friday_hours: data.businessInfo.fridayHours,
        saturday_hours: data.businessInfo.saturdayHours,
        sunday_hours: data.businessInfo.sundayHours,
        // Content & Messaging
        business_description: data.contentMessaging.businessDescription,
        services_list: data.contentMessaging.servicesList,
        service_descriptions: data.contentMessaging.serviceDescriptions,
        target_keywords: data.contentMessaging.targetKeywords,
        top_faqs: data.contentMessaging.topFaqs,
        unique_selling_prop: data.contentMessaging.uniqueSellingProp,
        current_promotions: data.contentMessaging.currentPromotions,
        // Photos & Media
        has_logo: data.photosMedia.hasLogo,
        has_cover_photo: data.photosMedia.hasCoverPhoto,
        photo_count: data.photosMedia.photoCount,
        has_geo_tagged_photos: data.photosMedia.hasGeoTaggedPhotos,
        has_team_photo: data.photosMedia.hasTeamPhoto,
        has_video: data.photosMedia.hasVideo,
        has_before_after_photos: data.photosMedia.hasBeforeAfterPhotos,
        photo_notes: data.photosMedia.photoNotes,
        // Access & Accounts
        gbp_access: data.accessAccounts.gbpAccess || null,
        ga4_access: data.accessAccounts.ga4Access,
        search_console_access: data.accessAccounts.searchConsoleAccess,
        cms_access: data.accessAccounts.cmsAccess,
        social_media_access: data.accessAccounts.socialMediaAccess,
        citation_logins: data.accessAccounts.citationLogins,
        access_notes: data.accessAccounts.accessNotes,
        // Competitor Intel
        competitor_1_name: data.competitorIntel.competitor1Name,
        competitor_1_url: data.competitorIntel.competitor1Url,
        competitor_2_name: data.competitorIntel.competitor2Name,
        competitor_2_url: data.competitorIntel.competitor2Url,
        competitor_3_name: data.competitorIntel.competitor3Name,
        competitor_3_url: data.competitorIntel.competitor3Url,
        target_geographies: data.competitorIntel.targetGeographies,
        customer_type: data.competitorIntel.customerType || null,
        seasonal_patterns: data.competitorIntel.seasonalPatterns,
        previous_seo_work: data.competitorIntel.previousSeoWork,
        // Ongoing Delivery
        preferred_post_topics: data.ongoingDelivery.preferredPostTopics,
        monthly_photo_delivery: data.ongoingDelivery.monthlyPhotoDelivery,
        review_request_method: data.ongoingDelivery.reviewRequestMethod || null,
        reporting_cadence: data.ongoingDelivery.reportingCadence || null,
        point_of_contact: data.ongoingDelivery.pointOfContact,
        point_of_contact_email: data.ongoingDelivery.pointOfContactEmail,
        point_of_contact_phone: data.ongoingDelivery.pointOfContactPhone,
        additional_notes: data.ongoingDelivery.additionalNotes,
        // Default status for new clients
        status: 'lead',
      };

      const response = await fetch('/api/gbp/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiData),
      });

      const result = await response.json();

      if (result.success) {
        return {
          success: true,
          clientId: result.data.id,
        };
      } else {
        return {
          success: false,
          error: result.error || 'Failed to save client',
        };
      }
    } catch (error) {
      console.error('Error submitting to database:', error);
      return {
        success: false,
        error: 'Network error - please try again',
      };
    } finally {
      setIsSubmitting(false);
    }
  }, [data]);

  return {
    data,
    currentStepIndex,
    currentStepId,
    totalSteps,
    isFirstStep,
    isLastStep,
    completionPercent,
    updateBusinessInfo,
    updateContentMessaging,
    updatePhotosMedia,
    updateAccessAccounts,
    updateCompetitorIntel,
    updateOngoingDelivery,
    goToStep,
    nextStep,
    prevStep,
    markStepComplete,
    saveToStorage,
    loadFromStorage,
    resetForm,
    exportAsJson,
    getAllClients,
    submitToDatabase,
    isSubmitting,
  };
}

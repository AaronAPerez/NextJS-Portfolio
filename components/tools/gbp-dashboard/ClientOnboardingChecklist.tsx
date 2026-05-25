'use client';

/**
 * Client Onboarding Checklist Component
 * ──────────────────────────────────────
 * Tracks the complete onboarding process for new GBP clients
 * Integrates with client data to show completion status
 */

import { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Circle,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Building2,
  Camera,
  Key,
  Globe,
  FileText,
  Star,
  Send,
  BarChart3,
} from 'lucide-react';
import type { GBPClient } from '@/types/gbp-database';

// ── Onboarding Phase Types ────────────────────────────────────────────────────

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  required: boolean;
  autoCheck?: (client: GBPClient) => boolean;
}

interface OnboardingPhase {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  items: ChecklistItem[];
}

// ── Onboarding Phases Configuration ───────────────────────────────────────────

const ONBOARDING_PHASES: OnboardingPhase[] = [
  {
    id: 'intake',
    title: 'Client Intake',
    icon: Building2,
    description: 'Gather all business information',
    items: [
      {
        id: 'basic-info',
        title: 'Basic business information collected',
        description: 'Legal name, address, phone, website, categories',
        required: true,
        autoCheck: (c) => !!(c.legal_name && c.address && c.primary_phone),
      },
      {
        id: 'business-hours',
        title: 'Business hours documented',
        description: 'Complete hours for all days of operation',
        required: true,
        autoCheck: (c) => !!c.business_hours,
      },
      {
        id: 'service-areas',
        title: 'Service areas defined',
        description: 'Cities, zip codes, or radius covered',
        required: true,
        autoCheck: (c) => !!c.service_areas,
      },
      {
        id: 'services-list',
        title: 'Services list completed',
        description: 'All services with descriptions',
        required: true,
        autoCheck: (c) => !!c.services_list,
      },
      {
        id: 'business-description',
        title: 'Business description written',
        description: '750-character keyword-optimized description',
        required: true,
        autoCheck: (c) => !!(c.business_description && c.business_description.length >= 200),
      },
      {
        id: 'target-keywords',
        title: 'Target keywords identified',
        description: 'Primary and secondary keywords for ranking',
        required: true,
        autoCheck: (c) => !!c.target_keywords,
      },
      {
        id: 'competitors',
        title: 'Competitors identified',
        description: 'Top 3 local competitors analyzed',
        required: false,
        autoCheck: (c) => !!c.competitor_1_name,
      },
      {
        id: 'point-of-contact',
        title: 'Point of contact established',
        description: 'Name, email, phone for ongoing communication',
        required: true,
        autoCheck: (c) => !!(c.point_of_contact && c.point_of_contact_email),
      },
    ],
  },
  {
    id: 'access',
    title: 'Account Access',
    icon: Key,
    description: 'Secure access to all necessary platforms',
    items: [
      {
        id: 'gbp-access',
        title: 'GBP Manager access granted',
        description: 'Owner or Manager role on Google Business Profile',
        required: true,
        autoCheck: (c) => c.gbp_access === 'owner' || c.gbp_access === 'manager',
      },
      {
        id: 'ga4-access',
        title: 'Google Analytics access (optional)',
        description: 'Viewer access for traffic reporting',
        required: false,
        autoCheck: (c) => !!c.ga4_access,
      },
      {
        id: 'gsc-access',
        title: 'Search Console access (optional)',
        description: 'For search performance data',
        required: false,
        autoCheck: (c) => !!c.search_console_access,
      },
      {
        id: 'website-access',
        title: 'Website CMS access (if needed)',
        description: 'For NAP consistency updates',
        required: false,
        autoCheck: (c) => !!c.cms_access,
      },
    ],
  },
  {
    id: 'photos',
    title: 'Photo Collection',
    icon: Camera,
    description: 'Gather visual assets for the profile',
    items: [
      {
        id: 'logo',
        title: 'Logo received',
        description: 'High-resolution logo (square format preferred)',
        required: true,
        autoCheck: (c) => !!c.has_logo,
      },
      {
        id: 'cover-photo',
        title: 'Cover photo received',
        description: 'Wide banner image for profile header',
        required: true,
        autoCheck: (c) => !!c.has_cover_photo,
      },
      {
        id: 'business-photos',
        title: 'Business photos collected (10+ recommended)',
        description: 'Interior, exterior, team, products/services',
        required: true,
        autoCheck: (c) => (parseInt(c.photo_count || '0') >= 10),
      },
      {
        id: 'geotagged',
        title: 'Photos geotagged',
        description: 'Location metadata added to all photos',
        required: false,
        autoCheck: (c) => !!c.has_geo_tagged_photos,
      },
    ],
  },
  {
    id: 'optimization',
    title: 'Profile Optimization',
    icon: BarChart3,
    description: 'Complete initial GBP optimization',
    items: [
      {
        id: 'categories-set',
        title: 'Categories optimized',
        description: 'Primary and secondary categories configured',
        required: true,
      },
      {
        id: 'description-published',
        title: 'Business description published',
        description: 'Keyword-rich description live on GBP',
        required: true,
      },
      {
        id: 'services-added',
        title: 'Services added to GBP',
        description: 'All services with descriptions in profile',
        required: true,
      },
      {
        id: 'attributes-set',
        title: 'Attributes configured',
        description: 'All relevant attributes selected',
        required: false,
      },
      {
        id: 'photos-uploaded',
        title: 'Photos uploaded to GBP',
        description: 'All photos uploaded and categorized',
        required: true,
      },
      {
        id: 'qa-seeded',
        title: 'Q&A section seeded',
        description: 'Initial FAQs added to Q&A',
        required: false,
      },
    ],
  },
  {
    id: 'citations',
    title: 'Citation Building',
    icon: Globe,
    description: 'Establish presence across directories',
    items: [
      {
        id: 'citations-tier1',
        title: 'Tier 1 citations submitted (10)',
        description: 'Google, Yelp, Facebook, Apple Maps, Bing, etc.',
        required: true,
      },
      {
        id: 'citations-tier2',
        title: 'Tier 2 citations submitted (10-20)',
        description: 'Industry directories, local directories',
        required: false,
      },
      {
        id: 'nap-audit',
        title: 'NAP consistency audit completed',
        description: 'Verified consistent info across all listings',
        required: true,
      },
    ],
  },
  {
    id: 'content',
    title: 'Content Setup',
    icon: FileText,
    description: 'Establish content calendar and templates',
    items: [
      {
        id: 'first-posts',
        title: 'First 4 GBP posts created',
        description: 'Initial month of weekly posts scheduled',
        required: true,
      },
      {
        id: 'post-calendar',
        title: 'Content calendar established',
        description: 'Ongoing posting schedule documented',
        required: false,
      },
      {
        id: 'post-templates',
        title: 'Post templates created',
        description: 'Reusable templates for different post types',
        required: false,
      },
    ],
  },
  {
    id: 'reviews',
    title: 'Review Strategy',
    icon: Star,
    description: 'Set up review generation and response system',
    items: [
      {
        id: 'review-link',
        title: 'Review link created',
        description: 'Short URL for review requests',
        required: true,
      },
      {
        id: 'review-templates',
        title: 'Review request templates created',
        description: 'Email/SMS templates for requesting reviews',
        required: false,
      },
      {
        id: 'response-templates',
        title: 'Review response templates created',
        description: 'Templates for positive and negative reviews',
        required: false,
      },
      {
        id: 'review-monitoring',
        title: 'Review monitoring active',
        description: 'Alerts set up for new reviews',
        required: true,
      },
    ],
  },
  {
    id: 'reporting',
    title: 'Reporting Setup',
    icon: Send,
    description: 'Configure ongoing reporting and tracking',
    items: [
      {
        id: 'keywords-tracked',
        title: 'Keywords set up for tracking',
        description: 'All target keywords being monitored',
        required: true,
      },
      {
        id: 'baseline-report',
        title: 'Baseline metrics recorded',
        description: 'Starting point for measuring progress',
        required: true,
      },
      {
        id: 'reporting-schedule',
        title: 'Reporting schedule confirmed',
        description: 'Monthly report delivery date agreed',
        required: true,
        autoCheck: (c) => !!c.reporting_cadence,
      },
      {
        id: 'client-notified',
        title: 'Client notified of completion',
        description: 'Kickoff email sent with next steps',
        required: true,
      },
    ],
  },
];

// ── Component Props ───────────────────────────────────────────────────────────

interface ClientOnboardingChecklistProps {
  client: GBPClient;
  onUpdateProgress?: (completedItems: string[]) => void;
}

// ── Main Component ────────────────────────────────────────────────────────────

export function ClientOnboardingChecklist({
  client,
  onUpdateProgress,
}: ClientOnboardingChecklistProps) {
  // Track manually checked items (stored in localStorage)
  const [manualChecks, setManualChecks] = useState<string[]>([]);
  const [expandedPhases, setExpandedPhases] = useState<string[]>(['intake']);

  // Load saved progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`onboarding_${client.id}`);
    if (saved) {
      setManualChecks(JSON.parse(saved));
    }
  }, [client.id]);

  // Save progress to localStorage
  const saveProgress = (items: string[]) => {
    localStorage.setItem(`onboarding_${client.id}`, JSON.stringify(items));
    setManualChecks(items);
    onUpdateProgress?.(items);
  };

  // Check if an item is completed (auto or manual)
  const isItemCompleted = (item: ChecklistItem): boolean => {
    if (item.autoCheck && item.autoCheck(client)) return true;
    return manualChecks.includes(item.id);
  };

  // Toggle manual check
  const toggleItem = (itemId: string) => {
    const newChecks = manualChecks.includes(itemId)
      ? manualChecks.filter((id) => id !== itemId)
      : [...manualChecks, itemId];
    saveProgress(newChecks);
  };

  // Toggle phase expansion
  const togglePhase = (phaseId: string) => {
    setExpandedPhases((prev) =>
      prev.includes(phaseId)
        ? prev.filter((id) => id !== phaseId)
        : [...prev, phaseId]
    );
  };

  // Calculate phase completion
  const getPhaseCompletion = (phase: OnboardingPhase) => {
    const completed = phase.items.filter(isItemCompleted).length;
    const required = phase.items.filter((i) => i.required).length;
    const requiredCompleted = phase.items.filter(
      (i) => i.required && isItemCompleted(i)
    ).length;
    return { completed, total: phase.items.length, required, requiredCompleted };
  };

  // Calculate overall completion
  const overallCompletion = ONBOARDING_PHASES.reduce(
    (acc, phase) => {
      const { completed, total, required, requiredCompleted } = getPhaseCompletion(phase);
      return {
        completed: acc.completed + completed,
        total: acc.total + total,
        required: acc.required + required,
        requiredCompleted: acc.requiredCompleted + requiredCompleted,
      };
    },
    { completed: 0, total: 0, required: 0, requiredCompleted: 0 }
  );

  const overallPercent = Math.round(
    (overallCompletion.completed / overallCompletion.total) * 100
  );
  const requiredPercent = Math.round(
    (overallCompletion.requiredCompleted / overallCompletion.required) * 100
  );

  return (
    <div className="space-y-6">
      {/* Overall Progress Header */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-white">Onboarding Progress</h2>
            <p className="text-sm text-gray-400 mt-1">
              {client.legal_name} — {client.status}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-white">{overallPercent}%</div>
            <div className="text-xs text-gray-500">
              {overallCompletion.completed}/{overallCompletion.total} tasks
            </div>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Overall Progress</span>
              <span>{overallCompletion.completed}/{overallCompletion.total}</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-500"
                style={{ width: `${overallPercent}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Required Items</span>
              <span>{overallCompletion.requiredCompleted}/{overallCompletion.required}</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  requiredPercent === 100 ? 'bg-green-500' : 'bg-amber-500'
                }`}
                style={{ width: `${requiredPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Status Badge */}
        {requiredPercent === 100 ? (
          <div className="mt-4 flex items-center gap-2 text-green-400 text-sm">
            <CheckCircle2 className="w-4 h-4" />
            All required items complete — Client is fully onboarded
          </div>
        ) : (
          <div className="mt-4 flex items-center gap-2 text-amber-400 text-sm">
            <Clock className="w-4 h-4" />
            {overallCompletion.required - overallCompletion.requiredCompleted} required items remaining
          </div>
        )}
      </div>

      {/* Phase Accordions */}
      <div className="space-y-3">
        {ONBOARDING_PHASES.map((phase) => {
          const { completed, total, requiredCompleted, required } = getPhaseCompletion(phase);
          const isExpanded = expandedPhases.includes(phase.id);
          const phaseComplete = requiredCompleted === required;
          const Icon = phase.icon;

          return (
            <div
              key={phase.id}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
            >
              {/* Phase Header */}
              <button
                onClick={() => togglePhase(phase.id)}
                className="w-full flex items-center gap-4 p-4 hover:bg-white/5 transition-colors"
              >
                <div
                  className={`p-2 rounded-lg ${
                    phaseComplete
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-white">{phase.title}</h3>
                    {phaseComplete && (
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{phase.description}</p>
                </div>

                <div className="text-right mr-2">
                  <div className="text-sm font-medium text-gray-300">
                    {completed}/{total}
                  </div>
                  <div className="text-xs text-gray-500">
                    {requiredCompleted}/{required} required
                  </div>
                </div>

                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                )}
              </button>

              {/* Phase Items */}
              {isExpanded && (
                <div className="border-t border-white/10 p-4 space-y-2">
                  {phase.items.map((item) => {
                    const isChecked = isItemCompleted(item);
                    const isAuto = item.autoCheck && item.autoCheck(client);

                    return (
                      <div
                        key={item.id}
                        className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                          isChecked ? 'bg-green-500/5' : 'hover:bg-white/5'
                        }`}
                      >
                        <button
                          onClick={() => !isAuto && toggleItem(item.id)}
                          disabled={isAuto}
                          className={`mt-0.5 flex-shrink-0 ${
                            isAuto ? 'cursor-default' : 'cursor-pointer'
                          }`}
                        >
                          {isChecked ? (
                            <CheckCircle2
                              className={`w-5 h-5 ${
                                isAuto ? 'text-blue-400' : 'text-green-400'
                              }`}
                            />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-600 hover:text-gray-400" />
                          )}
                        </button>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-sm font-medium ${
                                isChecked ? 'text-gray-400' : 'text-white'
                              }`}
                            >
                              {item.title}
                            </span>
                            {item.required && (
                              <span className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-amber-500/20 text-amber-400">
                                Required
                              </span>
                            )}
                            {isAuto && isChecked && (
                              <span className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-blue-500/20 text-blue-400">
                                Auto
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ClientOnboardingChecklist;

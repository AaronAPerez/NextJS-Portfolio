/**
 * GBP Intake Summary Component
 * ─────────────────────────────
 * Rendered after all 6 steps are complete. Shows a clean printable
 * summary of the entire intake, with export and print actions.
 * This doubles as a client-facing "here's what we collected" document.
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Download, Printer, CheckCircle2, AlertCircle, Database, Loader2, ExternalLink } from 'lucide-react';
import type { GBPIntakeData } from '@/types/gbp-intake';
import { WIZARD_STEPS } from '@/types/gbp-intake';

interface SummaryProps {
  data: GBPIntakeData;
  onExportJson: () => void;
  onNewClient: () => void;
  onSubmitToDatabase?: () => Promise<{ success: boolean; clientId?: string; error?: string }>;
  isSubmitting?: boolean;
}

// ── Small summary row ─────────────────────────────────────────────────────────
function SummaryRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex gap-3 py-2 border-b border-white/5 last:border-0">
      <span className="w-40 flex-shrink-0 text-xs text-gray-500">{label}</span>
      <span className="text-sm text-gray-200 break-words">{value}</span>
    </div>
  );
}

// ── Section card ──────────────────────────────────────────────────────────────
function SummarySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/3 overflow-hidden">
      <div className="px-5 py-3 border-b border-white/8 bg-white/3">
        <h3 className="text-sm font-semibold text-gray-300">{title}</h3>
      </div>
      <div className="px-5 py-2">{children}</div>
    </div>
  );
}

export function IntakeSummary({
  data,
  onExportJson,
  onNewClient,
  onSubmitToDatabase,
  isSubmitting = false,
}: SummaryProps) {
  const router = useRouter();
  const [submitStatus, setSubmitStatus] = useState<{
    submitted: boolean;
    clientId?: string;
    error?: string;
  }>({ submitted: false });

  const { businessInfo: bi, contentMessaging: cm, photosMedia: pm,
    accessAccounts: aa, competitorIntel: ci, ongoingDelivery: od } = data;

  // ── Completion score ────────────────────────────────────────────────────────
  const completedCount = data.completedSteps.length;
  const total = WIZARD_STEPS.length;
  const allDone = completedCount === total;

  // ── Photo readiness score ───────────────────────────────────────────────────
  const photoAssets = [pm.hasLogo, pm.hasCoverPhoto, pm.hasGeoTaggedPhotos,
    pm.hasTeamPhoto, pm.hasVideo];
  const photoScore = photoAssets.filter(Boolean).length;

  // ── Access score ────────────────────────────────────────────────────────────
  const accessItems = [aa.gbpAccess !== 'none' && aa.gbpAccess !== '',
    aa.ga4Access, aa.searchConsoleAccess, aa.cmsAccess, aa.socialMediaAccess];
  const accessScore = accessItems.filter(Boolean).length;

  const handlePrint = () => window.print();

  // ── Handle database submission ──────────────────────────────────────────────
  const handleSubmitToDatabase = async () => {
    if (!onSubmitToDatabase) return;

    const result = await onSubmitToDatabase();
    setSubmitStatus({
      submitted: result.success,
      clientId: result.clientId,
      error: result.error,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header status */}
      <div
        className={`flex items-center gap-4 rounded-xl p-5 border ${
          allDone
            ? 'border-green-500/30 bg-green-500/10'
            : 'border-amber-500/30 bg-amber-500/10'
        }`}
      >
        {allDone ? (
          <CheckCircle2 className="h-8 w-8 text-green-400 flex-shrink-0" />
        ) : (
          <AlertCircle className="h-8 w-8 text-amber-400 flex-shrink-0" />
        )}
        <div>
          <p className="text-sm font-semibold text-gray-100">
            {allDone
              ? 'Intake complete — ready to begin GBP optimization'
              : `${completedCount} of ${total} sections completed`}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            Created {new Date(data.createdAt).toLocaleDateString()} ·
            Last updated {new Date(data.updatedAt).toLocaleDateString()}
          </p>
        </div>

        {/* Action buttons */}
        <div className="ml-auto flex flex-wrap gap-2">
          {onSubmitToDatabase && !submitStatus.submitted && (
            <button
              onClick={handleSubmitToDatabase}
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-lg bg-blue-600
                         px-3 py-2 text-xs font-medium text-white hover:bg-blue-500
                         transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Save client to database"
            >
              {isSubmitting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Database className="h-3.5 w-3.5" />
              )}
              {isSubmitting ? 'Saving...' : 'Save to Database'}
            </button>
          )}
          <button
            onClick={onExportJson}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5
                       px-3 py-2 text-xs font-medium text-gray-300 hover:bg-white/10
                       transition-colors duration-150"
            aria-label="Export intake data as JSON"
          >
            <Download className="h-3.5 w-3.5" />
            Export JSON
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5
                       px-3 py-2 text-xs font-medium text-gray-300 hover:bg-white/10
                       transition-colors duration-150"
            aria-label="Print intake summary"
          >
            <Printer className="h-3.5 w-3.5" />
            Print
          </button>
        </div>
      </div>

      {/* Database submission status */}
      {submitStatus.submitted && (
        <div className="flex items-center gap-4 rounded-xl p-4 border border-blue-500/30 bg-blue-500/10">
          <CheckCircle2 className="h-6 w-6 text-blue-400 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-100">
              Client saved to database successfully!
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              Client ID: {submitStatus.clientId}
            </p>
          </div>
          <button
            onClick={() => router.push(`/admin/gbp/clients/${submitStatus.clientId}`)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-500"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View in Dashboard
          </button>
        </div>
      )}

      {submitStatus.error && (
        <div className="flex items-center gap-4 rounded-xl p-4 border border-red-500/30 bg-red-500/10">
          <AlertCircle className="h-6 w-6 text-red-400 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-gray-100">
              Failed to save client
            </p>
            <p className="text-xs text-red-400 mt-0.5">
              {submitStatus.error}
            </p>
          </div>
        </div>
      )}

      {/* At-a-glance scores */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Steps complete', value: `${completedCount}/${total}`, color: allDone ? 'text-green-400' : 'text-amber-400' },
          { label: 'Media assets ready', value: `${photoScore}/5`, color: photoScore >= 4 ? 'text-green-400' : 'text-amber-400' },
          { label: 'Platform access granted', value: `${accessScore}/5`, color: accessScore >= 4 ? 'text-green-400' : 'text-amber-400' },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="rounded-xl border border-white/8 bg-white/3 p-4 text-center"
          >
            <div className={`text-2xl font-semibold ${color}`}>{value}</div>
            <div className="mt-1 text-xs text-gray-500">{label}</div>
          </div>
        ))}
      </div>

      {/* Section summaries */}
      <SummarySection title="1 — Business Information">
        <SummaryRow label="Legal name" value={bi.legalName} />
        <SummaryRow label="Primary category" value={bi.primaryCategory} />
        <SummaryRow label="Phone" value={bi.primaryPhone} />
        <SummaryRow label="Website" value={bi.websiteUrl} />
        <SummaryRow label="Address" value={`${bi.address}, ${bi.city}, ${bi.state} ${bi.zip}`} />
        <SummaryRow label="Service areas" value={bi.serviceAreas} />
        <SummaryRow label="Secondary categories" value={bi.secondaryCategories} />
        <SummaryRow label="Est." value={bi.yearEstablished} />
      </SummarySection>

      <SummarySection title="2 — Content & Messaging">
        <SummaryRow label="Description" value={bi.legalName ? `${cm.businessDescription.slice(0, 120)}…` : ''} />
        <SummaryRow label="Services" value={cm.servicesList} />
        <SummaryRow label="Keywords" value={cm.targetKeywords} />
        <SummaryRow label="USP" value={cm.uniqueSellingProp} />
        <SummaryRow label="Promotions" value={cm.currentPromotions} />
      </SummarySection>

      <SummarySection title="3 — Photos & Media">
        <SummaryRow label="Photos available" value={pm.photoCount} />
        <SummaryRow
          label="Assets ready"
          value={[
            pm.hasLogo && 'Logo',
            pm.hasCoverPhoto && 'Cover photo',
            pm.hasGeoTaggedPhotos && 'Geo-tagged photos',
            pm.hasTeamPhoto && 'Team photo',
            pm.hasVideo && 'Video',
            pm.hasBeforeAfterPhotos && 'Before/after',
          ]
            .filter(Boolean)
            .join(', ')}
        />
        <SummaryRow label="Notes" value={pm.photoNotes} />
      </SummarySection>

      <SummarySection title="4 — Access & Accounts">
        <SummaryRow label="GBP access" value={aa.gbpAccess} />
        <SummaryRow
          label="Other platforms"
          value={[
            aa.ga4Access && 'GA4',
            aa.searchConsoleAccess && 'Search Console',
            aa.cmsAccess && 'CMS',
            aa.socialMediaAccess && 'Social Media',
          ]
            .filter(Boolean)
            .join(', ')}
        />
        <SummaryRow label="Citations" value={aa.citationLogins} />
        <SummaryRow label="Notes" value={aa.accessNotes} />
      </SummarySection>

      <SummarySection title="5 — Competitors">
        <SummaryRow label="Competitor 1" value={`${ci.competitor1Name} ${ci.competitor1Url}`} />
        <SummaryRow label="Competitor 2" value={`${ci.competitor2Name} ${ci.competitor2Url}`} />
        <SummaryRow label="Competitor 3" value={`${ci.competitor3Name} ${ci.competitor3Url}`} />
        <SummaryRow label="Target geos" value={ci.targetGeographies} />
        <SummaryRow label="Customer type" value={ci.customerType} />
        <SummaryRow label="Seasonal patterns" value={ci.seasonalPatterns} />
      </SummarySection>

      <SummarySection title="6 — Ongoing Delivery">
        <SummaryRow label="Post topics" value={od.preferredPostTopics} />
        <SummaryRow label="Monthly photos" value={od.monthlyPhotoDelivery ? 'Yes' : 'No'} />
        <SummaryRow label="Review method" value={od.reviewRequestMethod} />
        <SummaryRow label="Reporting" value={od.reportingCadence} />
        <SummaryRow label="Point of contact" value={`${od.pointOfContact} · ${od.pointOfContactEmail} · ${od.pointOfContactPhone}`} />
        <SummaryRow label="Notes" value={od.additionalNotes} />
      </SummarySection>

      {/* New client CTA */}
      <div className="flex justify-center pt-2">
        <button
          onClick={onNewClient}
          className="rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 
                     text-sm font-medium text-gray-300 hover:bg-white/10 transition-colors"
        >
          + Start intake for a new client
        </button>
      </div>
    </div>
  );
}

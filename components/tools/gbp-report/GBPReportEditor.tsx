/**
 * GBP Report Editor
 * ──────────────────
 * Form UI for filling in monthly metrics before generating the PDF.
 * Laid out as collapsible sections so it's not overwhelming.
 * All state is lifted to the parent page via onChange.
 */

'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { GBPMonthlyReport } from '@/types/gbp-report';

// ── Reusable field components (inline — no dep on the intake FormFields) ───────
function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-gray-400">{label}</label>
      {children}
      {hint && <p className="text-xs text-gray-600">{hint}</p>}
    </div>
  );
}

const inputCls =
  'w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-100 ' +
  'placeholder:text-gray-700 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-colors';

function NumberInput({ value, onChange, placeholder }: {
  value: number; onChange: (v: number) => void; placeholder?: string;
}) {
  return (
    <input
      type="number"
      className={inputCls}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      placeholder={placeholder}
    />
  );
}

// ── Collapsible section ────────────────────────────────────────────────────────
function EditorSection({ title, children, defaultOpen = false }: {
  title: string; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-white/8 overflow-hidden mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-white/3 transition-colors"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-gray-200">{title}</span>
        {open ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-white/8 pt-4">
          {children}
        </div>
      )}
    </div>
  );
}

// ── Main editor ────────────────────────────────────────────────────────────────
export function GBPReportEditor({
  report,
  onChange,
}: {
  report: GBPMonthlyReport;
  onChange: (updates: Partial<GBPMonthlyReport>) => void;
}) {
  const ins = report.insights;
  const rev = report.reviews;
  const cit = report.citations;

  return (
    <div className="space-y-1">
      {/* Client + meta */}
      <EditorSection title="Client & Report Info" defaultOpen>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Client business name">
            <input className={inputCls} value={report.clientBusinessName}
              onChange={(e) => onChange({ clientBusinessName: e.target.value })} />
          </Field>
          <Field label="Client name">
            <input className={inputCls} value={report.clientName}
              onChange={(e) => onChange({ clientName: e.target.value })} />
          </Field>
          <Field label="Report month">
            <input className={inputCls} value={report.reportMonth}
              onChange={(e) => onChange({ reportMonth: e.target.value })}
              placeholder="March 2026" />
          </Field>
          <Field label="Campaign month #">
            <NumberInput value={report.campaignMonth}
              onChange={(v) => onChange({ campaignMonth: v })} />
          </Field>
          <Field label="Service area">
            <input className={inputCls} value={report.serviceArea}
              onChange={(e) => onChange({ serviceArea: e.target.value })} />
          </Field>
          <Field label="Client website">
            <input className={inputCls} value={report.clientWebsite}
              onChange={(e) => onChange({ clientWebsite: e.target.value })} />
          </Field>
        </div>
      </EditorSection>

      {/* Visibility + Actions */}
      <EditorSection title="GBP Insights — Visibility">
        <div className="grid grid-cols-3 gap-4">
          {[
            ['Total views', 'totalViews'],
            ['Search views', 'searchViews'],
            ['Maps views', 'mapsViews'],
            ['Views change %', 'viewsChange'],
            ['Photo views', 'photoViews'],
            ['Photo views change %', 'photoViewsChange'],
            ['Photos uploaded', 'photosUploaded'],
            ['Posts published', 'postsPublished'],
            ['Post views', 'postViews'],
          ].map(([label, key]) => (
            <Field key={key} label={label}>
              <NumberInput
                value={(ins as Record<string, number>)[key]}
                onChange={(v) => onChange({ insights: { ...ins, [key]: v } })}
              />
            </Field>
          ))}
        </div>
      </EditorSection>

      <EditorSection title="GBP Insights — Customer Actions">
        <div className="grid grid-cols-3 gap-4">
          {[
            ['Website clicks', 'websiteClicks'],
            ['Website clicks change %', 'websiteClicksChange'],
            ['Phone calls', 'phoneCalls'],
            ['Phone calls change %', 'phoneCallsChange'],
            ['Direction requests', 'directionRequests'],
            ['Directions change %', 'directionRequestsChange'],
          ].map(([label, key]) => (
            <Field key={key} label={label}>
              <NumberInput
                value={(ins as Record<string, number>)[key]}
                onChange={(v) => onChange({ insights: { ...ins, [key]: v } })}
              />
            </Field>
          ))}
        </div>
      </EditorSection>

      {/* Reviews */}
      <EditorSection title="Review Metrics">
        <div className="grid grid-cols-3 gap-4">
          {[
            ['Total reviews', 'totalReviews'],
            ['New this month', 'newReviewsThisMonth'],
            ['Avg rating (e.g. 4.8)', 'averageRating'],
            ['Rating change (e.g. 0.1)', 'ratingChange'],
            ['Reviews responded to', 'respondedCount'],
            ['Response rate %', 'responseRate'],
          ].map(([label, key]) => (
            <Field key={key} label={label}>
              <NumberInput
                value={(rev as Record<string, number>)[key]}
                onChange={(v) => onChange({ reviews: { ...rev, [key]: v } })}
              />
            </Field>
          ))}
        </div>
      </EditorSection>

      {/* Citations */}
      <EditorSection title="Citation Metrics">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Total citations">
            <NumberInput value={cit.totalCitations}
              onChange={(v) => onChange({ citations: { ...cit, totalCitations: v } })} />
          </Field>
          <Field label="New this month">
            <NumberInput value={cit.newThisMonth}
              onChange={(v) => onChange({ citations: { ...cit, newThisMonth: v } })} />
          </Field>
          <div className="col-span-2">
            <Field label="Top directories (comma-separated)" hint="e.g. Yelp, Apple Maps, BBB, Yellow Pages">
              <input className={inputCls}
                value={cit.topDirectories.join(', ')}
                onChange={(e) => onChange({
                  citations: { ...cit, topDirectories: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) }
                })} />
            </Field>
          </div>
        </div>
      </EditorSection>

      {/* Narrative */}
      <EditorSection title="Narrative & Next Steps">
        <div className="space-y-4">
          <Field label="Executive summary" hint="2-3 sentences plain English. What happened this month?">
            <textarea className={`${inputCls} min-h-[90px] resize-y`}
              value={report.executiveSummary}
              onChange={(e) => onChange({ executiveSummary: e.target.value })} />
          </Field>
          <Field label="Highlight of the month" hint="The single biggest win — one sentence">
            <input className={inputCls} value={report.highlightOfMonth}
              onChange={(e) => onChange({ highlightOfMonth: e.target.value })} />
          </Field>
          <Field label="Next month focus" hint="What are you prioritizing next?">
            <textarea className={`${inputCls} min-h-[80px] resize-y`}
              value={report.nextMonthFocus}
              onChange={(e) => onChange({ nextMonthFocus: e.target.value })} />
          </Field>
        </div>
      </EditorSection>
    </div>
  );
}

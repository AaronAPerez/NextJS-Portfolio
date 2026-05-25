/**
 * GBP Report Tool — Main Orchestrator
 * ──────────────────────────────────────
 * Three-tab UI:
 *   1. Edit    — fill in monthly metrics via GBPReportEditor
 *   2. Preview — live web preview via GBPReportPreview
 *   3. Export  — download PDF via @react-pdf/renderer (lazy loaded)
 *
 * PDF generation is lazy-imported so it doesn't bloat the initial bundle.
 * The PDFDownloadLink component from @react-pdf/renderer handles
 * client-side PDF generation entirely in the browser — no server needed.
 */

'use client';

import { useState, lazy, Suspense } from 'react';
import { FileDown, Eye, PenLine, Loader2 } from 'lucide-react';
import type { GBPMonthlyReport } from '@/types/gbp-report';
import { sampleReport } from '@/types/gbp-report';
import { GBPReportEditor } from './GBPReportEditor';
import { GBPReportPreview } from './GBPReportPreview';

// ── Lazy-load the PDF components to avoid SSR issues ──────────────────────────
// @react-pdf/renderer uses browser APIs — must be client-only
const PDFDownloadButton = lazy(() =>
  import('./PDFDownloadButton').then((m) => ({ default: m.PDFDownloadButton }))
);

// ── Tab type ──────────────────────────────────────────────────────────────────
type Tab = 'edit' | 'preview' | 'export';

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'edit', label: 'Edit report', icon: PenLine },
  { id: 'preview', label: 'Preview', icon: Eye },
  { id: 'export', label: 'Export PDF', icon: FileDown },
];

export function GBPReportTool() {
  const [activeTab, setActiveTab] = useState<Tab>('edit');
  const [report, setReport] = useState<GBPMonthlyReport>(sampleReport);

  // ── Merge partial updates into report state ────────────────────────────────
  const handleChange = (updates: Partial<GBPMonthlyReport>) => {
    setReport((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* ── Top bar ──────────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-20 border-b border-white/8 bg-gray-950/90 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-6 sm:px-10">
          <div className="flex items-center justify-between gap-4 py-4">
            {/* Title */}
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-blue-400">AP Designs</p>
              <h1 className="text-sm font-semibold text-gray-100">GBP Monthly Report</h1>
            </div>

            {/* Tab pills */}
            <div
              className="flex rounded-lg border border-white/8 bg-white/3 p-0.5"
              role="tablist"
              aria-label="Report sections"
            >
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  role="tab"
                  aria-selected={activeTab === id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 rounded-md px-4 py-2 text-xs font-medium transition-all duration-150 ${
                    activeTab === id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Tab content ──────────────────────────────────────────────────────── */}

      {/* Edit tab */}
      {activeTab === 'edit' && (
        <div className="mx-auto max-w-5xl px-6 py-8 sm:px-10">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-gray-100 mb-1">Fill in monthly data</h2>
            <p className="text-sm text-gray-500">
              Enter GBP insights from the dashboard, review counts, and citation numbers.
              Switch to Preview to see the formatted report, then Export PDF to download.
            </p>
          </div>
          <GBPReportEditor report={report} onChange={handleChange} />

          {/* CTA to preview */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setActiveTab('preview')}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-500 transition-colors"
            >
              <Eye className="h-4 w-4" />
              Preview report
            </button>
          </div>
        </div>
      )}

      {/* Preview tab — full-width, uses its own dark layout */}
      {activeTab === 'preview' && (
        <div>
          {/* Preview action bar */}
          <div className="border-b border-white/5 bg-gray-900/50 px-6 py-3 sm:px-10">
            <div className="mx-auto max-w-5xl flex items-center justify-between">
              <p className="text-xs text-gray-500">
                This is how the report looks on screen. Export PDF for the print version.
              </p>
              <button
                onClick={() => setActiveTab('export')}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-gray-300 hover:bg-white/10 transition-colors"
              >
                <FileDown className="h-3.5 w-3.5" />
                Export PDF
              </button>
            </div>
          </div>
          <GBPReportPreview report={report} />
        </div>
      )}

      {/* Export tab */}
      {activeTab === 'export' && (
        <div className="mx-auto max-w-3xl px-6 py-12 sm:px-10">
          <div className="rounded-xl border border-white/8 bg-white/2 p-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/15 border border-blue-500/20 mx-auto mb-5">
              <FileDown className="h-6 w-6 text-blue-400" aria-hidden="true" />
            </div>
            <h2 className="text-lg font-semibold text-gray-100 mb-2">Export to PDF</h2>
            <p className="text-sm text-gray-500 mb-8 max-w-sm mx-auto">
              Generates a 3-page professional PDF report. Clean white layout, AP Designs branding, ready to email directly to your client.
            </p>

            {/* Report summary before export */}
            <div className="grid grid-cols-3 gap-3 mb-8 text-left">
              {[
                { label: 'Client', value: report.clientBusinessName },
                { label: 'Period', value: report.reportMonth },
                { label: 'Campaign month', value: `Month ${report.campaignMonth}` },
                { label: 'Total views', value: report.insights.totalViews.toLocaleString() },
                { label: 'Phone calls', value: report.insights.phoneCalls.toString() },
                { label: 'New reviews', value: report.reviews.newReviewsThisMonth.toString() },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-lg border border-white/8 bg-white/3 p-3">
                  <p className="text-xs text-gray-500 mb-1">{label}</p>
                  <p className="text-sm font-medium text-gray-200 truncate">{value}</p>
                </div>
              ))}
            </div>

            {/* PDF download button — lazy loaded to avoid SSR issues */}
            <Suspense
              fallback={
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 py-4">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading PDF generator...
                </div>
              }
            >
              <PDFDownloadButton report={report} />
            </Suspense>

            <p className="mt-4 text-xs text-gray-600">
              PDF is generated entirely in your browser — no data is sent to any server.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * PDFDownloadButton
 * ──────────────────
 * Isolated component that wraps @react-pdf/renderer's PDFDownloadLink.
 * Must be a separate file so it can be lazy-imported — @react-pdf/renderer
 * uses browser-only APIs that crash during Next.js SSR if imported at
 * the top level. Lazy import with Suspense boundary solves this cleanly.
 *
 * Usage in parent:
 *   const PDFDownloadButton = lazy(() =>
 *     import('./PDFDownloadButton').then(m => ({ default: m.PDFDownloadButton }))
 *   );
 */

'use client';

import { PDFDownloadLink } from '@react-pdf/renderer';
import { FileDown, Loader2 } from 'lucide-react';
import type { GBPMonthlyReport } from '@/types/gbp-report';
import { GBPReportPDF } from './GBPReportPDF';

interface PDFDownloadButtonProps {
  report: GBPMonthlyReport;
}

export function PDFDownloadButton({ report }: PDFDownloadButtonProps) {
  // ── Filename: "GBP-Report-AMP-Vending-March-2026.pdf" ─────────────────────
  const filename = [
    'GBP-Report',
    report.clientBusinessName.replace(/\s+/g, '-'),
    report.reportMonth.replace(/\s+/g, '-'),
  ].join('-') + '.pdf';

  return (
    <PDFDownloadLink
      document={<GBPReportPDF report={report} />}
      fileName={filename}
    >
      {({ loading, error }) => {
        if (error) {
          return (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-5 py-3 text-sm text-red-400">
              Error generating PDF. Check console for details.
            </div>
          );
        }

        return (
          <button
            disabled={loading}
            className={`inline-flex items-center gap-2.5 rounded-xl px-8 py-3.5 text-sm font-semibold 
                        transition-all duration-150 ${
              loading
                ? 'bg-white/5 border border-white/10 text-gray-500 cursor-wait'
                : 'bg-blue-600 text-white hover:bg-blue-500 active:scale-[0.98]'
            }`}
            aria-busy={loading}
            aria-label={loading ? 'Generating PDF...' : `Download PDF report for ${report.clientBusinessName}`}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Generating PDF...
              </>
            ) : (
              <>
                <FileDown className="h-4 w-4" aria-hidden="true" />
                Download PDF Report
              </>
            )}
          </button>
        );
      }}
    </PDFDownloadLink>
  );
}

/**
 * GBP Monthly Report Tool — Next.js Page
 * ────────────────────────────────────────
 * Route: /tools/gbp-report
 *
 * Server component wrapper with metadata.
 * The actual tool is a client component (GBPReportTool) due to
 * state management and @react-pdf/renderer browser-only APIs.
 */

import type { Metadata } from 'next';
import { GBPReportTool } from '@/components/tools/gbp-report/GBPReportTool';

export const metadata: Metadata = {
  title: 'GBP Monthly Report | AP Designs',
  description: 'Generate and export a branded Google Business Profile monthly performance report as PDF.',
  robots: {
    index: false,  // Internal tool — keep out of search index
    follow: false,
  },
};

export default function GBPReportPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <GBPReportTool />
    </div>
  );
}

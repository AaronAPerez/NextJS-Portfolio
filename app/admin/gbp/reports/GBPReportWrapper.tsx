'use client';

/**
 * GBP Report Wrapper (Client Component)
 * ──────────────────────────────────────
 * Client-side wrapper for dynamic import with ssr: false
 * This allows the Server Component page to use react-pdf
 */

import dynamic from 'next/dynamic';

// Dynamically import to handle react-pdf client-side requirements
// Use .then() to extract the named export
const GBPReportTool = dynamic(
  () => import('@/components/tools/gbp-report/GBPReportTool').then((mod) => mod.GBPReportTool),
  { ssr: false }
);

export default function GBPReportWrapper() {
  return <GBPReportTool />;
}

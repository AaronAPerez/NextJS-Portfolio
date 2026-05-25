/**
 * GBP Audit Results Page (Public)
 * ────────────────────────────────
 * Displays audit results with CTA
 */

import { Metadata } from 'next';
import { Suspense } from 'react';
import { GBPAuditResults } from '@/components/tools/gbp-audit/GBPAuditResults';

export const metadata: Metadata = {
  title: 'Your GBP Audit Results | AP Designs',
  description: 'View your Google Business Profile audit results and recommendations.',
  robots: 'noindex, nofollow', // Don't index results pages
};

// Client wrapper to handle searchParams
function AuditResultsWrapper({ searchParams }: { searchParams: { id?: string } }) {
  const auditId = searchParams.id || '';

  return <GBPAuditResults auditId={auditId} />;
}

export default async function GBPAuditResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-transparent to-transparent pointer-events-none" />

      <div className="relative px-4 py-12 md:py-20">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
            </div>
          }
        >
          <AuditResultsWrapper searchParams={params} />
        </Suspense>
      </div>
    </div>
  );
}

/**
 * GBP Intake Tool — Next.js App Router Page
 * ───────────────────────────────────────────
 * Route: /tools/gbp-intake
 *
 * Integrates into your portfolio as a professional internal tool.
 * The page wraps the client-side wizard with server-side metadata
 * for SEO (though this page is effectively a private tool page).
 */

import type { Metadata } from 'next';
import { GBPIntakeWizard } from '@/components/tools/gbp-intake/GBPIntakeWizard';

// ── Page metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'GBP Client Intake | AP Designs',
  description:
    'Google Business Profile client onboarding wizard — collect all information needed to begin GBP optimization.',
  robots: {
    // Keep this tool out of search index — it\'s internal
    index: false,
    follow: false,
  },
};

/**
 * GBPIntakePage
 * Server component page wrapper. The wizard itself is a client component
 * since it needs browser localStorage for persistence.
 */
export default function GBPIntakePage() {
  return (
    // Full-height dark container — the wizard handles its own layout
    <div className="min-h-screen bg-gray-950">
      <GBPIntakeWizard />
    </div>
  );
}

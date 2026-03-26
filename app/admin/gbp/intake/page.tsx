/**
 * Admin GBP Intake Page
 * ──────────────────────
 * Client intake wizard under admin protection
 */

import { Metadata } from 'next';
import { GBPIntakeWizard } from '@/components/tools/gbp-intake/GBPIntakeWizard';

export const metadata: Metadata = {
  title: 'GBP Client Intake | Admin',
  description: 'Onboard new GBP optimization clients',
  robots: 'noindex, nofollow',
};

export default function AdminGBPIntakePage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <GBPIntakeWizard />
    </div>
  );
}

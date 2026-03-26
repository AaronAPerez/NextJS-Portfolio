/**
 * Admin GBP Reports Page
 * ───────────────────────
 * Monthly report generator under admin protection
 */

import { Metadata } from 'next';
import GBPReportWrapper from './GBPReportWrapper';

export const metadata: Metadata = {
  title: 'GBP Reports | Admin',
  description: 'Generate monthly GBP performance reports',
  robots: 'noindex, nofollow',
};

export default function AdminGBPReportsPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <GBPReportWrapper />
    </div>
  );
}

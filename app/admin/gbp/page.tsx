/**
 * Admin GBP Dashboard Page
 * ─────────────────────────
 * Multi-client dashboard for Google Business Profile optimization
 * Protected by admin authentication
 */

import { Metadata } from 'next';
import GBPDashboard from '@/components/tools/gbp-dashboard/GBPDashboard';

export const metadata: Metadata = {
  title: 'GBP Optimization | Admin',
  description: 'Manage Google Business Profile optimization clients',
  robots: 'noindex, nofollow',
};

export default function AdminGBPPage() {
  return <GBPDashboard />;
}

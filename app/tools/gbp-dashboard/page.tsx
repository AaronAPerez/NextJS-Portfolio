/**
 * GBP Dashboard Page
 * ──────────────────
 * Multi-client dashboard for Google Business Profile optimization
 * Lists all clients with their performance stats and quick actions
 */

import { Metadata } from 'next';
import GBPDashboard from '@/components/tools/gbp-dashboard/GBPDashboard';

export const metadata: Metadata = {
  title: 'GBP Optimization Dashboard | AP Designs',
  description: 'Manage Google Business Profile optimization clients, track performance metrics, citations, keywords, reviews, and generate monthly reports.',
  robots: 'noindex, nofollow', // Internal tool, not for public indexing
};

export default function GBPDashboardPage() {
  return (
    <main className="min-h-screen bg-gray-950">
      <GBPDashboard />
    </main>
  );
}

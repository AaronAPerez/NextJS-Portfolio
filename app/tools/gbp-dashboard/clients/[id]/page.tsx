/**
 * GBP Client Detail Page
 * ───────────────────────
 * Detailed view of a single client with all their data
 */

import { Metadata } from 'next';
import ClientDetailView from '@/components/tools/gbp-dashboard/ClientDetailView';

export const metadata: Metadata = {
  title: 'Client Details | GBP Dashboard',
  description: 'View and manage GBP optimization client details, citations, keywords, posts, and reviews.',
  robots: 'noindex, nofollow',
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ClientDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-gray-950">
      <ClientDetailView clientId={id} />
    </main>
  );
}

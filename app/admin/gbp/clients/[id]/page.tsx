/**
 * Admin GBP Client Detail Page
 * ─────────────────────────────
 * Detailed view of a single client under admin protection
 */

import { Metadata } from 'next';
import ClientDetailView from '@/components/tools/gbp-dashboard/ClientDetailView';

export const metadata: Metadata = {
  title: 'Client Details | GBP Admin',
  description: 'View and manage GBP client details',
  robots: 'noindex, nofollow',
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminGBPClientDetailPage({ params }: PageProps) {
  const { id } = await params;

  return <ClientDetailView clientId={id} />;
}

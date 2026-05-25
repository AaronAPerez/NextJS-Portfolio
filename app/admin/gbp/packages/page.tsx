/**
 * Admin GBP Service Packages Page
 * ─────────────────────────────────
 * Configure service tiers and pricing
 */

import { Metadata } from 'next';
import { ServicePackagesManager } from '@/components/admin/gbp/ServicePackagesManager';

export const metadata: Metadata = {
  title: 'Service Packages | Admin',
  description: 'Configure GBP optimization service packages',
  robots: 'noindex, nofollow',
};

export default function AdminGBPPackagesPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ServicePackagesManager />
      </div>
    </div>
  );
}

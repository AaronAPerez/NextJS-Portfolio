/**
 * Admin GBP Leads Page
 * ─────────────────────
 * Manage leads from the GBP audit tool and other sources
 */

import { Metadata } from 'next';
import { LeadsTable } from '@/components/admin/gbp/LeadsTable';

export const metadata: Metadata = {
  title: 'GBP Leads | Admin',
  description: 'Manage leads from the GBP audit tool',
  robots: 'noindex, nofollow',
};

export default function AdminGBPLeadsPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Lead Management</h1>
          <p className="text-gray-400 mt-1">
            Track and manage leads from the GBP audit tool and other sources
          </p>
        </div>

        {/* Leads Table */}
        <LeadsTable />
      </div>
    </div>
  );
}

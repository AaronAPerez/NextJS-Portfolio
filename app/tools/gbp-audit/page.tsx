/**
 * GBP Audit Tool Page (Public)
 * ─────────────────────────────
 * Free GBP audit lead magnet - public facing page
 */

import { Metadata } from 'next';
import { GBPAuditForm } from '@/components/tools/gbp-audit/GBPAuditForm';

export const metadata: Metadata = {
  title: 'Free Google Business Profile Audit | AP Designs',
  description:
    'Get a free instant audit of your Google Business Profile. Discover how to improve your local search visibility and get more customers from Google Maps.',
  keywords: [
    'google business profile audit',
    'GBP audit',
    'local SEO audit',
    'google maps optimization',
    'free business audit',
  ],
  openGraph: {
    title: 'Free Google Business Profile Audit',
    description:
      'Discover how your business appears on Google Maps and get actionable recommendations to improve your local visibility.',
    type: 'website',
  },
};

export default function GBPAuditPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-transparent to-transparent pointer-events-none" />

      <div className="relative px-4 py-12 md:py-20">
        <GBPAuditForm />
      </div>
    </div>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { PERSONAL_INFO, SITE_CONFIG } from '@/lib/constants';

/**
 * Privacy Policy Page
 *
 * Outlines how user data is collected, used, and protected.
 * Complies with GDPR, CCPA, and other privacy regulations.
 */

export const metadata: Metadata = {
  title: 'Privacy Policy — Aaron Perez',
  description: 'Privacy Policy for aaronaperez.dev. Learn how we collect, use, and protect your personal information.',
  openGraph: {
    title: 'Privacy Policy — Aaron Perez',
    description: 'Privacy Policy for aaronaperez.dev. Learn how we collect, use, and protect your personal information.',
    url: `${SITE_CONFIG.url}/privacy`,
    siteName: SITE_CONFIG.name,
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  // Last updated date for the policy
  const lastUpdated = 'March 25, 2025';

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Page Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Last updated: {lastUpdated}
          </p>
        </header>

        {/* Policy Content */}
        <article className="prose prose-gray dark:prose-invert max-w-none">
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Introduction
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Welcome to {SITE_CONFIG.name} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed
              to protecting your privacy and ensuring the security of your personal information. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your information when you visit
              our website at {SITE_CONFIG.url}.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Please read this policy carefully. By using our website, you consent to the practices described
              in this Privacy Policy.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Information We Collect
            </h2>

            <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-3">
              Information You Provide Directly
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              When you use our contact form or communicate with us, we may collect:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>Name and email address</li>
              <li>Phone number (if provided)</li>
              <li>Company or organization name</li>
              <li>Project details and message content</li>
              <li>Budget and timeline preferences</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-3">
              Information Collected Automatically
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              When you visit our website, we may automatically collect certain information, including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>IP address and approximate geographic location</li>
              <li>Browser type and version</li>
              <li>Device type and operating system</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website or source</li>
              <li>Date and time of visits</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              How We Use Your Information
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>To respond to your inquiries and communicate about potential projects</li>
              <li>To provide and maintain our website functionality</li>
              <li>To analyze website usage and improve user experience</li>
              <li>To detect, prevent, and address technical issues</li>
              <li>To comply with legal obligations</li>
              <li>To send occasional updates about services (only with your consent)</li>
            </ul>
          </section>

          {/* Cookies and Tracking */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We use cookies and similar tracking technologies to enhance your browsing experience.
              These may include:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>
                <strong>Essential cookies:</strong> Required for the website to function properly
              </li>
              <li>
                <strong>Analytics cookies:</strong> Help us understand how visitors interact with our website
              </li>
              <li>
                <strong>Preference cookies:</strong> Remember your settings and preferences (e.g., dark mode)
              </li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              You can control cookie preferences through your browser settings. Disabling certain cookies
              may affect website functionality.
            </p>
          </section>

          {/* Data Sharing */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Data Sharing and Disclosure
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share
              your information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>
                <strong>Service providers:</strong> Third-party services that help us operate our website
                (e.g., hosting, analytics, email services)
              </li>
              <li>
                <strong>Legal requirements:</strong> When required by law or to protect our legal rights
              </li>
              <li>
                <strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets
              </li>
              <li>
                <strong>With your consent:</strong> When you explicitly authorize us to share information
              </li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Data Security
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We implement appropriate technical and organizational measures to protect your personal
              information, including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>HTTPS encryption for all data transmission</li>
              <li>Secure hosting infrastructure</li>
              <li>Regular security assessments</li>
              <li>Limited access to personal data</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              However, no method of transmission over the internet is 100% secure. We cannot guarantee
              absolute security of your data.
            </p>
          </section>

          {/* Your Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Your Rights
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Depending on your location, you may have the following rights regarding your personal data:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>
                <strong>Access:</strong> Request a copy of the personal data we hold about you
              </li>
              <li>
                <strong>Correction:</strong> Request correction of inaccurate or incomplete data
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your personal data
              </li>
              <li>
                <strong>Restriction:</strong> Request restriction of processing your data
              </li>
              <li>
                <strong>Portability:</strong> Request transfer of your data to another service
              </li>
              <li>
                <strong>Objection:</strong> Object to processing of your data for certain purposes
              </li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              To exercise any of these rights, please contact us using the information below.
            </p>
          </section>

          {/* California Privacy Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              California Privacy Rights (CCPA)
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              If you are a California resident, you have additional rights under the California Consumer
              Privacy Act (CCPA), including the right to know what personal information we collect and
              how we use it, the right to request deletion, and the right to opt-out of the sale of
              personal information. We do not sell personal information.
            </p>
          </section>

          {/* Third-Party Links */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Third-Party Links
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Our website may contain links to third-party websites (e.g., GitHub, LinkedIn). We are not
              responsible for the privacy practices of these external sites. We encourage you to review
              their privacy policies before providing any personal information.
            </p>
          </section>

          {/* Children's Privacy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Children&apos;s Privacy
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Our website is not intended for children under 13 years of age. We do not knowingly collect
              personal information from children under 13. If you believe we have collected information
              from a child under 13, please contact us immediately.
            </p>
          </section>

          {/* Changes to Policy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Changes to This Policy
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page
              with an updated &quot;Last updated&quot; date. We encourage you to review this policy periodically
              for any changes.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <address className="not-italic text-gray-700 dark:text-gray-300 space-y-2">
              <p>
                <strong>{PERSONAL_INFO.name}</strong>
              </p>
              <p>
                Email:{' '}
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  {PERSONAL_INFO.email}
                </a>
              </p>
              <p>Location: {PERSONAL_INFO.location}</p>
            </address>
          </section>

          {/* Back to Home Link */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}

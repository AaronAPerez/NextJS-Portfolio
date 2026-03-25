import type { Metadata } from 'next';
import Link from 'next/link';
import { PERSONAL_INFO, SITE_CONFIG } from '@/lib/constants';

/**
 * Terms of Service Page
 *
 * Defines the terms and conditions for using the website.
 * Covers acceptable use, intellectual property, and liability.
 */

export const metadata: Metadata = {
  title: 'Terms of Service — Aaron Perez',
  description: 'Terms of Service for aaronaperez.dev. Review the terms and conditions governing your use of this website.',
  openGraph: {
    title: 'Terms of Service — Aaron Perez',
    description: 'Terms of Service for aaronaperez.dev. Review the terms and conditions governing your use of this website.',
    url: `${SITE_CONFIG.url}/terms`,
    siteName: SITE_CONFIG.name,
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfServicePage() {
  // Last updated date for the terms
  const lastUpdated = 'March 25, 2025';

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Page Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Last updated: {lastUpdated}
          </p>
        </header>

        {/* Terms Content */}
        <article className="prose prose-gray dark:prose-invert max-w-none">
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Agreement to Terms
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Welcome to {SITE_CONFIG.name}. These Terms of Service (&quot;Terms&quot;) govern your access to
              and use of our website located at {SITE_CONFIG.url} (the &quot;Site&quot;), operated by
              {PERSONAL_INFO.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              By accessing or using our Site, you agree to be bound by these Terms. If you do not agree
              to these Terms, please do not use our Site.
            </p>
          </section>

          {/* Use of Website */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Use of the Website
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You may use our Site only for lawful purposes and in accordance with these Terms.
              You agree not to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>
                Use the Site in any way that violates applicable federal, state, local, or international
                law or regulation
              </li>
              <li>
                Attempt to gain unauthorized access to any portion of the Site, other accounts, or any
                systems or networks connected to the Site
              </li>
              <li>
                Use any automated system, including robots, spiders, or scrapers, to access the Site
                for any purpose without our express written permission
              </li>
              <li>
                Introduce any viruses, malware, or other malicious code that may harm the Site or
                its users
              </li>
              <li>
                Engage in any conduct that restricts or inhibits anyone&apos;s use or enjoyment of the Site
              </li>
              <li>
                Impersonate or attempt to impersonate {PERSONAL_INFO.name}, another user, or any other
                person or entity
              </li>
              <li>
                Use the Site to transmit spam, chain letters, or other unsolicited communications
              </li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Intellectual Property Rights
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The Site and its entire contents, features, and functionality (including but not limited to
              all information, software, text, displays, images, graphics, video, and audio, and the design,
              selection, and arrangement thereof) are owned by {PERSONAL_INFO.name} or our licensors and
              are protected by United States and international copyright, trademark, patent, trade secret,
              and other intellectual property or proprietary rights laws.
            </p>

            <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-3">
              Limited License
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You are granted a limited, non-exclusive, non-transferable license to access and view the
              content on this Site for personal, non-commercial use only. This license does not include:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Modifying or copying the Site materials</li>
              <li>Using the materials for any commercial purpose</li>
              <li>Attempting to decompile or reverse engineer any software on the Site</li>
              <li>Removing any copyright or proprietary notations from the materials</li>
              <li>Transferring the materials to another person or mirroring the materials on another server</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-3 mt-4">
              Open Source Code
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Some portions of this Site&apos;s source code may be available under open source licenses.
              Such code is subject to the terms of its respective license, which will be clearly indicated.
            </p>
          </section>

          {/* User Submissions */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              User Submissions
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              When you submit content through our contact form or other communication channels, you grant
              us a non-exclusive, royalty-free right to use, reproduce, and display such content solely
              for the purpose of responding to your inquiry and potentially engaging in a professional
              relationship.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              You represent that any information you provide is accurate, current, and complete, and that
              you have the right to submit such information.
            </p>
          </section>

          {/* Services */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Professional Services
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              This Site serves as a portfolio and professional showcase. Any professional services,
              including web development, consulting, or other work, are subject to separate agreements
              between you and {PERSONAL_INFO.name}.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Information on this Site regarding skills, experience, and capabilities is provided for
              informational purposes. Specific project terms, pricing, and deliverables will be defined
              in individual service agreements.
            </p>
          </section>

          {/* Disclaimer */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Disclaimer of Warranties
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              THE SITE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT ANY WARRANTIES OF
              ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY,
              FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              We do not warrant that: (a) the Site will function uninterrupted, secure, or available at
              any particular time or location; (b) any errors or defects will be corrected; (c) the Site
              is free of viruses or other harmful components; or (d) the results of using the Site will
              meet your requirements.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Limitation of Liability
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL {PERSONAL_INFO.name.toUpperCase()},
              OR OUR AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, OR LICENSORS BE LIABLE FOR ANY
              INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING
              WITHOUT LIMITATION DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE
              LOSSES, ARISING OUT OF OR RELATING TO YOUR USE OF, OR INABILITY TO USE, THE SITE.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              In no event shall our total liability to you for all damages, losses, or causes of action
              exceed the amount paid by you, if any, for accessing the Site.
            </p>
          </section>

          {/* Indemnification */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Indemnification
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              You agree to defend, indemnify, and hold harmless {PERSONAL_INFO.name} and our affiliates,
              licensors, and service providers from and against any claims, liabilities, damages,
              judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys&apos; fees)
              arising out of or relating to your violation of these Terms or your use of the Site.
            </p>
          </section>

          {/* External Links */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Third-Party Links
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              The Site may contain links to third-party websites or services that are not owned or
              controlled by us (e.g., GitHub, LinkedIn). We have no control over, and assume no
              responsibility for, the content, privacy policies, or practices of any third-party
              websites or services. We strongly advise you to read the terms and privacy policies
              of any third-party sites you visit.
            </p>
          </section>

          {/* Modifications */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Modifications to Terms
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              We reserve the right to modify or replace these Terms at any time at our sole discretion.
              If a revision is material, we will provide at least 30 days&apos; notice prior to any new terms
              taking effect. What constitutes a material change will be determined at our sole discretion.
              By continuing to access or use our Site after any revisions become effective, you agree to
              be bound by the revised terms.
            </p>
          </section>

          {/* Termination */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Termination
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              We may terminate or suspend your access to the Site immediately, without prior notice or
              liability, for any reason, including without limitation if you breach these Terms. Upon
              termination, your right to use the Site will cease immediately.
            </p>
          </section>

          {/* Governing Law */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Governing Law
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              These Terms shall be governed by and construed in accordance with the laws of the State
              of California, United States, without regard to its conflict of law provisions. Any disputes
              arising under or in connection with these Terms shall be subject to the exclusive
              jurisdiction of the courts located in San Joaquin County, California.
            </p>
          </section>

          {/* Severability */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Severability
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              If any provision of these Terms is held to be unenforceable or invalid, such provision will
              be changed and interpreted to accomplish the objectives of such provision to the greatest
              extent possible under applicable law, and the remaining provisions will continue in full
              force and effect.
            </p>
          </section>

          {/* Waiver */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Waiver
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              No waiver of any term or condition set forth in these Terms shall be deemed a further or
              continuing waiver of such term or condition or a waiver of any other term or condition.
              Any failure to assert a right or provision under these Terms shall not constitute a waiver
              of such right or provision.
            </p>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Contact Information
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If you have any questions about these Terms, please contact us:
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

          {/* Navigation Links */}
          <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4 text-center">
            <Link
              href="/privacy"
              className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
            >
              Privacy Policy
            </Link>
            <span className="hidden sm:inline text-gray-400">•</span>
            <Link
              href="/accessibility"
              className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
            >
              Accessibility
            </Link>
            <span className="hidden sm:inline text-gray-400">•</span>
            <Link
              href="/"
              className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}

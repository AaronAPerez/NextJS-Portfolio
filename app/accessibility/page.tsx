import type { Metadata } from 'next';
import Link from 'next/link';
import { PERSONAL_INFO, SITE_CONFIG } from '@/lib/constants';

/**
 * Accessibility Statement Page
 *
 * Details our commitment to web accessibility and WCAG compliance.
 * Provides information about accessibility features and how to report issues.
 */

export const metadata: Metadata = {
  title: 'Accessibility Statement — Aaron Perez',
  description: 'Accessibility statement for aaronaperez.dev. Learn about our commitment to web accessibility and WCAG compliance.',
  openGraph: {
    title: 'Accessibility Statement — Aaron Perez',
    description: 'Accessibility statement for aaronaperez.dev. Learn about our commitment to web accessibility and WCAG compliance.',
    url: `${SITE_CONFIG.url}/accessibility`,
    siteName: SITE_CONFIG.name,
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AccessibilityPage() {
  // Last updated date for the accessibility statement
  const lastUpdated = 'March 25, 2025';

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Page Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent mb-4">
            Accessibility Statement
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Last updated: {lastUpdated}
          </p>
        </header>

        {/* Accessibility Content */}
        <article className="prose prose-gray dark:prose-invert max-w-none">
          {/* Commitment */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Our Commitment to Accessibility
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {PERSONAL_INFO.name} is committed to ensuring digital accessibility for people with
              disabilities. We are continually improving the user experience for everyone and applying
              the relevant accessibility standards to ensure we provide equal access to all users.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              As a web developer who specializes in accessibility, I believe that everyone deserves
              equal access to information and functionality on the web. This commitment extends to
              both my portfolio site and the projects I build for clients.
            </p>
          </section>

          {/* Standards */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Conformance Status
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The{' '}
              <a
                href="https://www.w3.org/WAI/standards-guidelines/wcag/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                Web Content Accessibility Guidelines (WCAG)
              </a>{' '}
              defines requirements for designers and developers to improve accessibility for people
              with disabilities.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>{SITE_CONFIG.name}</strong> strives to conform to{' '}
              <strong>WCAG 2.1 Level AA</strong> standards. These guidelines explain how to make web
              content more accessible for people with disabilities and more user-friendly for everyone.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              We regularly audit our site against WCAG guidelines and address any issues that are
              identified. Our goal is to achieve and maintain full conformance with Level AA criteria.
            </p>
          </section>

          {/* Accessibility Features */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Accessibility Features
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              This website includes the following accessibility features:
            </p>

            <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-3">
              Navigation & Structure
            </h3>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>
                <strong>Semantic HTML:</strong> Proper use of headings, landmarks, lists, and other
                semantic elements to provide clear document structure
              </li>
              <li>
                <strong>Skip links:</strong> Skip to main content link for keyboard users to bypass
                repetitive navigation
              </li>
              <li>
                <strong>Consistent navigation:</strong> Navigation menus appear in consistent locations
                throughout the site
              </li>
              <li>
                <strong>Clear page titles:</strong> Each page has a unique, descriptive title
              </li>
              <li>
                <strong>Breadcrumbs and landmarks:</strong> ARIA landmarks to help assistive technology
                users navigate between sections
              </li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-3">
              Visual Design
            </h3>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>
                <strong>Color contrast:</strong> Text and interactive elements maintain a minimum
                contrast ratio of 4.5:1 for normal text and 3:1 for large text
              </li>
              <li>
                <strong>Dark mode support:</strong> Alternative color scheme available to reduce
                eye strain and accommodate user preferences
              </li>
              <li>
                <strong>Responsive design:</strong> Content adapts to different screen sizes without
                loss of information or functionality
              </li>
              <li>
                <strong>Scalable text:</strong> Text can be resized up to 200% without loss of content
                or functionality
              </li>
              <li>
                <strong>No color-only information:</strong> Information conveyed by color is also
                available through text or other visual indicators
              </li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-3">
              Keyboard Accessibility
            </h3>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>
                <strong>Full keyboard navigation:</strong> All interactive elements are accessible
                via keyboard (Tab, Enter, Space, Arrow keys)
              </li>
              <li>
                <strong>Visible focus indicators:</strong> Clear visual indication of keyboard focus
                position
              </li>
              <li>
                <strong>Logical tab order:</strong> Focus order follows the visual layout of the page
              </li>
              <li>
                <strong>No keyboard traps:</strong> Users can navigate freely without getting stuck
                in any component
              </li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-3">
              Screen Reader Support
            </h3>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>
                <strong>Alternative text:</strong> Meaningful alt text for all informative images
              </li>
              <li>
                <strong>ARIA labels:</strong> Accessible names for interactive elements and icons
              </li>
              <li>
                <strong>Form labels:</strong> All form inputs have associated labels
              </li>
              <li>
                <strong>Error identification:</strong> Form errors are clearly identified and described
              </li>
              <li>
                <strong>Status updates:</strong> Dynamic content changes are announced to screen readers
                using ARIA live regions
              </li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-3">
              Motion & Animation
            </h3>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>
                <strong>Reduced motion support:</strong> Animations are minimized or disabled for users
                who prefer reduced motion (respects <code>prefers-reduced-motion</code>)
              </li>
              <li>
                <strong>No auto-playing media:</strong> Videos and audio do not play automatically
              </li>
              <li>
                <strong>Pause controls:</strong> Any moving or animated content can be paused
              </li>
            </ul>
          </section>

          {/* Technologies Used */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Technologies
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              This website is built using the following technologies that support accessibility:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>HTML5 semantic elements</li>
              <li>CSS3 with responsive design techniques</li>
              <li>WAI-ARIA (Web Accessibility Initiative - Accessible Rich Internet Applications)</li>
              <li>Next.js with built-in accessibility features</li>
              <li>React with accessible component patterns</li>
              <li>TypeScript for type-safe development</li>
            </ul>
          </section>

          {/* Assistive Technologies */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Compatibility with Assistive Technologies
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              This website is designed to be compatible with the following assistive technologies:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Screen readers (NVDA, JAWS, VoiceOver, TalkBack)</li>
              <li>Screen magnification software</li>
              <li>Speech recognition software</li>
              <li>Keyboard-only navigation</li>
              <li>Switch devices and alternative input methods</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              The site is tested regularly with modern browsers including Chrome, Firefox, Safari, and
              Edge in combination with these assistive technologies.
            </p>
          </section>

          {/* Known Issues */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Known Limitations
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              While we strive to ensure accessibility across the entire site, there may be some
              limitations:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>
                <strong>Third-party content:</strong> Some embedded content from third-party services
                (e.g., external videos, widgets) may not meet all accessibility standards
              </li>
              <li>
                <strong>PDF documents:</strong> Older PDF documents may not be fully accessible;
                contact us for alternative formats
              </li>
              <li>
                <strong>Legacy content:</strong> Some older blog posts or portfolio entries may have
                accessibility issues that are being addressed
              </li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              We are actively working to identify and resolve any accessibility issues. If you
              encounter barriers, please let us know.
            </p>
          </section>

          {/* Testing & Evaluation */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Assessment & Testing
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We assess the accessibility of this website through the following methods:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>
                <strong>Automated testing:</strong> Regular scans using tools like Lighthouse, axe,
                and WAVE
              </li>
              <li>
                <strong>Manual testing:</strong> Keyboard navigation testing, screen reader testing,
                and visual inspection
              </li>
              <li>
                <strong>Code review:</strong> Accessibility checks during development and code review
                processes
              </li>
              <li>
                <strong>User feedback:</strong> Input from users with disabilities helps identify
                real-world issues
              </li>
            </ul>
          </section>

          {/* Feedback */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Feedback & Contact
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We welcome your feedback on the accessibility of this website. If you encounter any
              accessibility barriers or have suggestions for improvement, please let us know:
            </p>
            <address className="not-italic text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <p>
                <strong>{PERSONAL_INFO.name}</strong>
              </p>
              <p>
                Email:{' '}
                <a
                  href={`mailto:${PERSONAL_INFO.email}?subject=Accessibility%20Feedback`}
                  className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  {PERSONAL_INFO.email}
                </a>
              </p>
              <p>Phone: {PERSONAL_INFO.phone}</p>
              <p>Location: {PERSONAL_INFO.location}</p>
            </address>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              When reporting an accessibility issue, please include:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>The URL of the page where you experienced the issue</li>
              <li>A description of the problem you encountered</li>
              <li>The assistive technology you were using (if applicable)</li>
              <li>Your browser and operating system</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              We aim to respond to accessibility feedback within 5 business days and to resolve
              reported issues as quickly as possible.
            </p>
          </section>

          {/* Enforcement */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Enforcement Procedures
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              If you are not satisfied with our response to your accessibility feedback, you may
              escalate the issue by contacting us directly. We are committed to working with you
              to find an accessible solution.
            </p>
          </section>

          {/* Resources */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Accessibility Resources
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              For more information about web accessibility, visit:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>
                <a
                  href="https://www.w3.org/WAI/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  W3C Web Accessibility Initiative (WAI)
                </a>
              </li>
              <li>
                <a
                  href="https://www.w3.org/WAI/standards-guidelines/wcag/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Web Content Accessibility Guidelines (WCAG)
                </a>
              </li>
              <li>
                <a
                  href="https://www.a11yproject.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  The A11Y Project
                </a>
              </li>
              <li>
                <a
                  href="https://webaim.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  WebAIM
                </a>
              </li>
            </ul>
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
              href="/terms"
              className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
            >
              Terms of Service
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

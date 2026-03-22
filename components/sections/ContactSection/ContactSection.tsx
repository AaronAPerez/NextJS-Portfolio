'use client';

/**
 * ContactSection Component
 *
 * Main contact section that combines the contact form with sidebar information.
 * Implements separation of concerns by composing smaller, reusable components.
 *
 * Component Structure:
 * - ContactSection (this file) - Main layout and composition
 *   - SectionTitle/Description (from ui/Section) - Header content
 *   - CopyNotification - Clipboard feedback
 *   - ContactForm - Form handling
 *   - ContactSidebar - Info cards and quick actions
 *
 * @see ContactForm for form validation logic
 * @see ContactSidebar for sidebar composition
 * @see data/contact.ts for contact data constants
 */

import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

// Local component imports
import { ContactForm } from './ContactForm';
import { ContactSidebar } from './ContactSidebar';
import { CopyNotification } from './CopyNotification';
import { fadeInUp, fadeInLeft } from './animations';

// =============================================================================
// Sub-Components
// =============================================================================

/**
 * Decorative header with icon between gradient lines
 */
const SectionDecorator = () => (
  <div
    className="flex items-center justify-center gap-4 mb-6"
    aria-hidden="true"
  >
    <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-blue-500" />
    <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full">
      <Mail className="w-6 h-6 text-white" />
    </div>
    <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-indigo-500" />
  </div>
);

/**
 * Section header with title and description
 */
const ContactHeader = () => (
  <motion.header
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="text-center mb-12"
  >
    <SectionDecorator />

    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
      Let&apos;s Connect
    </h2>

    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
      Have a project in mind? Send me a message and I&apos;ll get back to you
      within 24-48 hours.
    </p>
  </motion.header>
);

/**
 * Form card wrapper with header icon
 */
const FormCard = () => (
  <motion.div
    variants={fadeInLeft}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="lg:col-span-2"
  >
    <Card variant="elevated" padding="lg" className="backdrop-blur-sm">
      {/* Form header with icon */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg">
          <Send className="w-5 h-5 text-white" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Send a Message
        </h3>
      </div>

      {/* Contact form component */}
      <ContactForm />
    </Card>
  </motion.div>
);

/**
 * Background gradient and grid pattern
 */
const SectionBackground = () => (
  <>
    <div
      className="absolute inset-0 bg-gradient-to-b from-blue-50 via-transparent to-violet-50 dark:from-blue-950/20 dark:via-transparent dark:to-violet-950/20"
      aria-hidden="true"
    />
    <div
      className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px]"
      aria-hidden="true"
    />
  </>
);

// =============================================================================
// Main Component
// =============================================================================

export const ContactSection = () => {
  // Custom hook for clipboard functionality with auto-reset
  const { copied, copyToClipboard } = useCopyToClipboard({
    resetDelay: 2000
  });

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden py-20"
      aria-labelledby="contact-heading"
    >
      {/* Background decorations */}
      <SectionBackground />

      <div className="relative z-10 container mx-auto px-4 max-w-6xl">
        {/* Section header with visually hidden h2 for accessibility */}
        <h2 id="contact-heading" className="sr-only">
          Contact Section
        </h2>

        <ContactHeader />

        {/* Copy success notification */}
        <CopyNotification visible={copied} />

        {/* Main content grid: Form + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact form - primary focus (2 columns on large screens) */}
          <FormCard />

          {/* Sidebar - contact info, quick actions, social links */}
          <ContactSidebar copied={copied} onCopy={copyToClipboard} />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

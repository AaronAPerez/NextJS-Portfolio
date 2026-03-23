'use client';

/**
 * AboutSection Component
 *
 * Main about section that combines the narrative with timeline and stats.
 * Implements separation of concerns by composing smaller, reusable components.
 *
 * Component Structure:
 * - AboutSection (this file) - Main layout and composition
 *   - SectionHeader - Decorative header with title
 *   - AboutNarrative - Personal story/background
 *   - SimpleTimeline - Career progression overview
 *   - AboutStats - Key metrics (optional)
 *
 * @see AboutNarrative for narrative content logic
 * @see SimpleTimeline for timeline display
 * @see data/about.ts for all data constants
 */

import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { AboutNarrative } from './AboutNarrative';
import { SimpleTimeline } from './SimpleTimeline';
import { EducationCredentials } from './EducationCredentials';
// import { AboutStats } from './AboutStats'; // Uncomment to enable stats section
import { fadeInUp } from './animations';

// =============================================================================
// Sub-Components
// =============================================================================

/**
 * Decorative section header with icon between gradient lines
 */
const SectionDecorator = () => (
  <div
    className="flex items-center justify-center gap-4 mb-6"
    aria-hidden="true"
  >
    <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-blue-500" />
    <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
      <User className="w-6 h-6 text-white" />
    </div>
    <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-purple-500" />
  </div>
);

/**
 * Section header with title and description
 */
const SectionHeader = () => (
  <motion.header
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="text-center mb-16"
  >
    <SectionDecorator />

    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
      About Me
    </h2>

    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
      Full stack developer with a passion for building intuitive and robust applications
    </p>
  </motion.header>
);

/**
 * Background gradient and decorative elements
 */
const SectionBackground = () => (
  <>
    {/* Gradient orbs */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        aria-hidden="true"
      />
    </div>

    {/* Subtle gradient overlay */}
    <div
      className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-transparent to-violet-50/50 dark:from-blue-950/20 dark:via-transparent dark:to-violet-950/20"
      aria-hidden="true"
    />
  </>
);

// =============================================================================
// Main Component
// =============================================================================

export const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative bg-white dark:bg-gray-950 py-20 sm:py-28 overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Background decorations */}
      <SectionBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Visually hidden heading for accessibility */}
        <h2 id="about-heading" className="sr-only">
          About Section
        </h2>

        {/* Section Header */}
        <SectionHeader />

        {/* Stats Row (optional - uncomment to enable) */}
        {/* <AboutStats className="mb-16" /> */}

        {/* Main Content Grid: Narrative + Timeline */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Narrative Story */}
          <AboutNarrative />

          {/* Right Column: Career Timeline */}
          <SimpleTimeline />
        </div>

        {/* Education Credentials - Prominently displayed */}
        <EducationCredentials className="mt-16" />
      </div>
    </section>
  );
};

export default AboutSection;

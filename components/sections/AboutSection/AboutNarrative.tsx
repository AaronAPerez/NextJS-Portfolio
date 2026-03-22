'use client';

/**
 * AboutNarrative Component
 *
 * Displays the narrative "story" section of the About page.
 * Highlights key phrases and presents the developer's background.
 */

import { motion } from 'framer-motion';
import { narrative } from '@/data/about';
import { fadeInLeft, staggerContainer, staggerItem } from './animations';

// =============================================================================
// Types
// =============================================================================

interface AboutNarrativeProps {
  /** Optional section title override */
  title?: string;
  /** Optional section label override */
  label?: string;
  /** Optional additional CSS classes */
  className?: string;
}

// =============================================================================
// Helper Components
// =============================================================================

/**
 * Renders paragraph text with highlighted phrases
 */
const HighlightedText = ({
  text,
  highlights = []
}: {
  text: string;
  highlights?: string[];
}) => {
  // If no highlights, return plain text
  if (highlights.length === 0) {
    return <>{text}</>;
  }

  // Split text and wrap highlighted portions
  let result = text;
  highlights.forEach((phrase) => {
    result = result.replace(
      phrase,
      `<strong class="font-medium text-gray-900 dark:text-white">${phrase}</strong>`
    );
  });

  return <span dangerouslySetInnerHTML={{ __html: result }} />;
};

// =============================================================================
// Main Component
// =============================================================================

export const AboutNarrative = ({
  title,
  label = 'Background',
  className
}: AboutNarrativeProps) => {
  // Use first narrative section by default
  const content = narrative[0];
  const displayTitle = title || content.title;

  return (
    <motion.div
      variants={fadeInLeft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {/* Section label */}
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
        {label}
      </p>

      {/* Section title */}
      <h2 className="mb-6 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
        {displayTitle}
      </h2>

      {/* Narrative paragraphs with staggered animation */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-4 text-base leading-relaxed text-gray-600 dark:text-gray-400"
      >
        {content.content.map((paragraph, index) => (
          <motion.p key={index} variants={staggerItem}>
            <HighlightedText
              text={paragraph}
              highlights={content.highlights}
            />
          </motion.p>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default AboutNarrative;

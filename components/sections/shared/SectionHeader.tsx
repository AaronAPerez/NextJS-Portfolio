/**
 * SectionHeader Component
 *
 * The shared header treatment used across homepage sections: an icon badge
 * flanked by gradient rules, a gradient title, and an optional description.
 *
 * This existed as four near-identical copies (About, Contact, Projects,
 * Timeline). Centralising it keeps the sections visually in sync — changing
 * the treatment in one place changes it everywhere.
 */

'use client';

import { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

/**
 * Accent presets.
 *
 * Tailwind only emits classes it can see as complete strings, so the gradient
 * stops are enumerated here rather than interpolated from props.
 */
const ACCENTS = {
  'blue-purple': {
    leftRule: 'to-blue-500',
    badge: 'from-blue-500 to-purple-500',
    rightRule: 'to-purple-500',
  },
  'blue-indigo': {
    leftRule: 'to-blue-500',
    badge: 'from-blue-500 to-indigo-500',
    rightRule: 'to-indigo-500',
  },
} as const;

export type SectionHeaderAccent = keyof typeof ACCENTS;

interface SectionHeaderProps {
  /** Lucide icon rendered inside the gradient badge */
  icon: LucideIcon;
  /** Section title — rendered as the section's h2 */
  title: string;
  /** Optional supporting copy below the title */
  description?: string;
  /** Gradient pairing for the badge and flanking rules */
  accent?: SectionHeaderAccent;
  /** Optional id for aria-labelledby wiring from the parent section */
  titleId?: string;
  /** Extra classes for the header element (e.g. bottom spacing overrides) */
  className?: string;
}

function SectionHeader({
  icon: Icon,
  title,
  description,
  accent = 'blue-purple',
  titleId,
  className = 'mb-16',
}: SectionHeaderProps) {
  const shouldReduceMotion = useReducedMotion();
  const colors = ACCENTS[accent];

  return (
    <motion.header
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className={`text-center ${className}`}
    >
      {/* Decorative rule / icon / rule */}
      <div
        className="mb-6 flex items-center justify-center gap-4"
        aria-hidden="true"
      >
        <div
          className={`h-px w-full max-w-24 flex-1 bg-gradient-to-r from-transparent ${colors.leftRule}`}
        />
        <div className={`rounded-full bg-gradient-to-r p-3 ${colors.badge}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div
          className={`h-px w-full max-w-24 flex-1 bg-gradient-to-l from-transparent ${colors.rightRule}`}
        />
      </div>

      <h2
        id={titleId}
        className="mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-4xl font-bold text-transparent dark:from-gray-100 dark:to-gray-400 md:text-5xl"
      >
        {title}
      </h2>

      {description && (
        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
          {description}
        </p>
      )}
    </motion.header>
  );
}

export default memo(SectionHeader);

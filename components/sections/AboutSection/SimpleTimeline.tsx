'use client';

/**
 * SimpleTimeline Component
 *
 * A compact timeline display showing career progression.
 * Used in the About section for a quick overview.
 *
 * For detailed timeline cards, use the full Timeline component
 * or TimelineCard component from the sections folder.
 */

import { motion } from 'framer-motion';
import { simpleTimeline, SimpleTimelineItem } from '@/data/about';
import { fadeInRight, staggerContainer, staggerItem } from './animations';

// =============================================================================
// Types
// =============================================================================

interface SimpleTimelineProps {
  /** Optional items override (defaults to data from about.ts) */
  items?: SimpleTimelineItem[];
  /** Optional section label */
  label?: string;
  /** Optional additional CSS classes */
  className?: string;
}

// =============================================================================
// Sub-Components
// =============================================================================

/**
 * Individual timeline item with indicator dot
 */
const TimelineItem = ({
  item
}: {
  item: SimpleTimelineItem;
}) => (
  <motion.li
    variants={staggerItem}
    className="mb-8 ml-6 last:mb-0"
  >
    {/* Timeline indicator dot */}
    <span
      className={`absolute -left-[9px] flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 ${
        item.current
          ? 'border-blue-600 bg-blue-600 dark:border-blue-400 dark:bg-blue-400'
          : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900'
      }`}
      aria-hidden="true"
    />

    {/* Item content */}
    <div className="pl-1">
      {/* Role and company */}
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          {item.role}
        </h3>
        <span className="text-xs text-blue-600 dark:text-blue-400">
          {item.company}
        </span>
      </div>

      {/* Period */}
      <time className="mb-1.5 block text-xs text-gray-400 dark:text-gray-500">
        {item.period}
      </time>

      {/* Description */}
      <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
        {item.detail}
      </p>
    </div>
  </motion.li>
);

// =============================================================================
// Main Component
// =============================================================================

export const SimpleTimeline = ({
  items = simpleTimeline,
  label = 'Experience',
  className
}: SimpleTimelineProps) => {
  return (
    <motion.div
      variants={fadeInRight}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {/* Section label */}
      <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
        {label}
      </p>

      {/* Timeline list */}
      <motion.ol
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative border-l border-gray-100 dark:border-gray-800"
        role="list"
        aria-label="Career timeline"
      >
        {items.map((item, index) => (
          <TimelineItem key={index} item={item} />
        ))}
      </motion.ol>
    </motion.div>
  );
};

export default SimpleTimeline;

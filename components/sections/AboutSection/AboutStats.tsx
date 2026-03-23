'use client';

/**
 * AboutStats Component
 *
 * Displays key statistics/metrics about experience and achievements.
 * Animated cards with icons and values.
 */

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { stats, StatItem } from '@/data/about';
import { staggerContainer, scaleUp } from './animations';

// =============================================================================
// Types
// =============================================================================

interface AboutStatsProps {
  /** Optional stats override (defaults to data from about.ts) */
  items?: StatItem[];
  /** Number of columns on different breakpoints */
  columns?: 2 | 3 | 4;
  /** Optional additional CSS classes */
  className?: string;
}

// =============================================================================
// Sub-Components
// =============================================================================

/**
 * Individual stat card with icon and value
 */
const StatCard = ({
  stat
}: {
  stat: StatItem;
}) => {
  const IconComponent = stat.icon;

  return (
    <motion.div
      variants={scaleUp}
      className="text-center p-6 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg"
    >
      {/* Icon */}
      <IconComponent
        className={cn('w-8 h-8 mx-auto mb-3', stat.color)}
        aria-hidden="true"
      />

      {/* Value */}
      <div className={cn('text-3xl font-bold mb-2', stat.color)}>
        {stat.value}
      </div>

      {/* Label */}
      <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
        {stat.label}
      </div>
    </motion.div>
  );
};

// =============================================================================
// Main Component
// =============================================================================

export const AboutStats = ({
  items = stats,
  columns = 4,
  className
}: AboutStatsProps) => {
  // Grid column classes based on prop
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4'
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={cn('grid gap-6', gridCols[columns], className)}
      role="region"
      aria-label="Professional statistics"
    >
      {items.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </motion.div>
  );
};

export default AboutStats;

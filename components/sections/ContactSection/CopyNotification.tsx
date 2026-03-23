'use client';

/**
 * CopyNotification Component
 *
 * Displays a temporary notification when content is copied to clipboard.
 * Uses AnimatePresence for smooth enter/exit animations.
 */

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { slideDown } from './animations';

// =============================================================================
// Types
// =============================================================================

interface CopyNotificationProps {
  /** Whether to show the notification */
  visible: boolean;
  /** Custom message to display */
  message?: string;
  /** Optional additional CSS classes */
  className?: string;
}

// =============================================================================
// Component
// =============================================================================

export const CopyNotification = ({
  visible,
  message = 'Email copied to clipboard!',
  className
}: CopyNotificationProps) => {
  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          variants={slideDown}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={cn('flex justify-center mb-6', className)}
          role="status"
          aria-live="polite"
        >
          <div
            className={cn(
              'inline-flex items-center gap-2',
              'px-4 py-2 rounded-full',
              'bg-green-500/20 border border-green-500/30',
              'text-green-600 dark:text-green-400',
              'text-sm font-medium'
            )}
          >
            <CheckCircle className="w-4 h-4" aria-hidden="true" />
            <span>{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CopyNotification;

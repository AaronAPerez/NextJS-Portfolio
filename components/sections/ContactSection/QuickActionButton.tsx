'use client';

/**
 * QuickActionButton Component
 *
 * A reusable button for quick contact actions like email, copy, and download.
 * Handles different action types with appropriate visual feedback.
 */

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { QuickAction } from '@/data/contact';

// =============================================================================
// Types
// =============================================================================

interface QuickActionButtonProps {
  /** The action configuration object */
  action: QuickAction;
  /** Callback function when copy action is triggered */
  onCopy: (value: string) => void;
  /** Whether the copy action was successful (shows checkmark) */
  copied: boolean;
  /** Optional additional CSS classes */
  className?: string;
}

// =============================================================================
// Action Handler Utilities
// =============================================================================

/**
 * Handles the mailto action by opening the email client
 */
const handleMailto = (email: string): void => {
  window.open(`mailto:${email}`, '_blank');
};

/**
 * Handles the download action by creating a temporary link
 */
const handleDownload = (filePath: string, fileName: string): void => {
  const link = document.createElement('a');
  link.href = filePath;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// =============================================================================
// Component
// =============================================================================

export const QuickActionButton = ({
  action,
  onCopy,
  copied,
  className
}: QuickActionButtonProps) => {
  const IconComponent = action.icon;
  const isCopyAction = action.action === 'copy';
  const showCopied = isCopyAction && copied;

  /**
   * Handles click events based on action type
   */
  const handleClick = (): void => {
    switch (action.action) {
      case 'mailto':
        handleMailto(action.value);
        break;
      case 'copy':
        onCopy(action.value);
        break;
      case 'download':
        handleDownload(action.value, 'A.Perez_Resume.pdf');
        break;
      default:
        console.warn(`Unknown action type: ${action.action}`);
    }
  };

  // Determine background color based on state
  const backgroundColor = showCopied ? '#22C55E' : action.bgColor;

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.05, backgroundColor: showCopied ? '#22C55E' : action.hoverBgColor }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        // Base styles
        'flex flex-col items-center gap-2 p-4 rounded-xl',
        'transition-colors duration-300',
        'text-white shadow-lg',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50',
        className
      )}
      style={{ backgroundColor }}
      aria-label={showCopied ? 'Email copied!' : action.ariaLabel}
      aria-live={isCopyAction ? 'polite' : undefined}
    >
      {/* Icon with animation on state change */}
      <motion.div
        key={showCopied ? 'copied' : 'default'}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {showCopied ? (
          <CheckCircle className="w-6 h-6" aria-hidden="true" />
        ) : (
          <IconComponent className="w-6 h-6" aria-hidden="true" />
        )}
      </motion.div>

      {/* Label text */}
      <span className="text-xs font-medium">
        {showCopied ? 'Copied!' : action.label}
      </span>
    </motion.button>
  );
};

export default QuickActionButton;

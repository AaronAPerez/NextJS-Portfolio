'use client';

/**
 * SocialLinks Component
 *
 * Displays a list of social media links with hover animations.
 * Reusable component that can be configured via props or use defaults.
 */

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { socialLinks as defaultSocialLinks, SocialLink } from '@/data/contact';
import { linkHoverTap } from './animations';

// =============================================================================
// Types
// =============================================================================

interface SocialLinksProps {
  /** Optional custom social links array (defaults to contact data) */
  links?: SocialLink[];
  /** Layout direction for the links */
  direction?: 'horizontal' | 'vertical';
  /** Size variant for the links */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show the link name text */
  showLabels?: boolean;
  /** Whether to show external link icon */
  showExternalIcon?: boolean;
  /** Optional additional CSS classes */
  className?: string;
}

// =============================================================================
// Size Configuration
// =============================================================================

const sizeConfig = {
  sm: {
    container: 'px-3 py-1.5 gap-1.5',
    icon: 'w-4 h-4',
    text: 'text-xs',
    externalIcon: 'w-2.5 h-2.5'
  },
  md: {
    container: 'px-4 py-2 gap-2',
    icon: 'w-5 h-5',
    text: 'text-sm',
    externalIcon: 'w-3 h-3'
  },
  lg: {
    container: 'px-5 py-3 gap-3',
    icon: 'w-6 h-6',
    text: 'text-base',
    externalIcon: 'w-4 h-4'
  }
} as const;

// =============================================================================
// Component
// =============================================================================

export const SocialLinks = ({
  links = defaultSocialLinks,
  direction = 'horizontal',
  size = 'md',
  showLabels = true,
  showExternalIcon = true,
  className
}: SocialLinksProps) => {
  const sizes = sizeConfig[size];

  return (
    <div
      className={cn(
        'flex',
        direction === 'horizontal' ? 'flex-row gap-3' : 'flex-col gap-2',
        className
      )}
      role="list"
      aria-label="Social media links"
    >
      {links.map((link) => {
        const IconComponent = link.icon;

        return (
          <motion.a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={linkHoverTap.hover}
            whileTap={linkHoverTap.tap}
            className={cn(
              // Base styles
              'flex items-center rounded-lg',
              'bg-gray-100 dark:bg-gray-800',
              'text-gray-700 dark:text-gray-300',
              'transition-all duration-300',
              'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
              // Size-specific styles
              sizes.container,
              // Custom hover color from config
              link.color
            )}
            aria-label={link.ariaLabel}
            role="listitem"
          >
            <IconComponent className={sizes.icon} aria-hidden="true" />

            {showLabels && (
              <span className={cn('font-medium', sizes.text)}>
                {link.name}
              </span>
            )}

            {showExternalIcon && (
              <ExternalLink
                className={cn(sizes.externalIcon, 'opacity-50')}
                aria-hidden="true"
              />
            )}
          </motion.a>
        );
      })}
    </div>
  );
};

export default SocialLinks;

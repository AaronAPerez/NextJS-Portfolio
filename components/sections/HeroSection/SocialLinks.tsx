'use client';

/**
 * SocialLinks Component
 *
 * Renders social media links with hover animations.
 * Uses centralized social link data from data/contact.ts.
 */

import { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { socialLinks } from '@/data/contact';
import { fadeIn, hoverScale, tapScale, withReducedMotion } from './animations';

interface SocialLinksProps {
  /** Additional CSS classes */
  className?: string;
  /** Layout direction */
  direction?: 'row' | 'column';
  /** Center alignment */
  centered?: boolean;
}

/**
 * Individual social link button with animation
 */
const SocialLinkItem = memo(({
  social
}: {
  social: typeof socialLinks[0]
}) => {
  const prefersReducedMotion = useReducedMotion();
  const IconComponent = social.icon;

  return (
    <motion.a
      href={social.href}
      target={social.href.startsWith('mailto:') ? undefined : '_blank'}
      rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
      aria-label={social.ariaLabel}
      className={`
        touch-target p-3 backdrop-blur-sm rounded-full shadow-md
        transition-all duration-300 min-h-[44px] min-w-[44px]
        flex items-center justify-center
        ${social.baseBg || 'bg-white/80 dark:bg-gray-800/80'}
        ${social.baseColor || 'text-gray-600'}
        ${social.hoverColor || 'hover:text-white'}
        ${social.hoverBg || 'hover:bg-gray-800'}
      `}
      whileHover={withReducedMotion(hoverScale, prefersReducedMotion)}
      whileTap={withReducedMotion(tapScale, prefersReducedMotion)}
    >
      <IconComponent className="w-5 h-5" />
    </motion.a>
  );
});
SocialLinkItem.displayName = 'SocialLinkItem';

/**
 * Social links container component
 */
export const SocialLinks = memo(({
  className = '',
  direction = 'row',
  centered = false
}: SocialLinksProps) => {
  const directionClasses = direction === 'row'
    ? 'flex-row'
    : 'flex-col';

  const alignmentClasses = centered
    ? 'justify-center'
    : 'lg:justify-start justify-center';

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className={`
        flex flex-wrap items-center gap-3
        ${directionClasses}
        ${alignmentClasses}
        ${className}
      `}
    >
      {socialLinks.map((social) => (
        <SocialLinkItem key={social.id} social={social} />
      ))}
    </motion.div>
  );
});
SocialLinks.displayName = 'SocialLinks';

export default SocialLinks;

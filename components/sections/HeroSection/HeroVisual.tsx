'use client';

/**
 * HeroVisual Component
 *
 * Right column of the hero section containing:
 * - Profile image with gradient border
 * - Floating tech icons
 * - Availability badge
 * - Connect CTA button
 */

import { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { fadeInRight, scaleIn, buttonHover, tapScale, withReducedMotion } from './animations';
import { heroContent, profileImage, floatingTechIcons } from './constants';

interface HeroVisualProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * Floating tech icon component with optional animation
 */
const FloatingTechIcon = memo(({
  icon,
  prefersReducedMotion
}: {
  icon: typeof floatingTechIcons[0];
  prefersReducedMotion: boolean | null;
}) => (
  <div
    className={`
      ${icon.position} ${icon.size}
      backdrop-blur-sm bg-white/10 dark:bg-gray-800/30
      rounded-full flex items-center justify-center shadow-lg
    `}
    style={prefersReducedMotion || !icon.animation ? {} : {
      animation: icon.animation
    }}
  >
    <Image
      src={icon.icon}
      alt={icon.alt}
      width={32}
      height={32}
      className="w-auto h-auto max-w-[70%] max-h-[70%]"
    />
  </div>
));
FloatingTechIcon.displayName = 'FloatingTechIcon';

/**
 * Profile image with gradient border
 */
const ProfileImage = memo(({ prefersReducedMotion }: {
  prefersReducedMotion: boolean | null;
}) => (
  <div
    className={`
      relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80
      ${prefersReducedMotion ? '' : 'animate-float'}
    `}
    style={prefersReducedMotion ? {} : {
      animation: 'float 6s ease-in-out infinite'
    }}
  >
    {/* Profile image container with gradient border */}
    <div className="relative w-full h-full">
      <div className="
        absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600
        rounded-full p-1 shadow-2xl
      ">
        <div className="
          w-full h-full backdrop-blur-sm bg-white/10 dark:bg-gray-800/30
          rounded-full p-2
        ">
          <div className="
            w-full h-full bg-gradient-to-br from-gray-100 to-gray-200
            dark:from-gray-800 dark:to-gray-700
            rounded-full overflow-hidden
          ">
            <Image
              src={profileImage.src}
              alt={profileImage.alt}
              width={profileImage.width}
              height={profileImage.height}
              priority
              fetchPriority="high"
              sizes={profileImage.sizes}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>

    {/* Floating tech icons */}
    {floatingTechIcons.map((icon) => (
      <FloatingTechIcon
        key={icon.id}
        icon={icon}
        prefersReducedMotion={prefersReducedMotion}
      />
    ))}

    {/* Glow effect - static for performance */}
    <div className="
      absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-600
      rounded-full blur-3xl opacity-15
    " />
  </div>
));
ProfileImage.displayName = 'ProfileImage';

/**
 * Availability badge component
 */
const AvailabilityBadge = memo(() => (
  <div className="
    backdrop-blur-sm bg-white/90 dark:bg-gray-800/90
    px-4 py-2 rounded-full shadow-lg
    border border-green-200 dark:border-green-800 whitespace-nowrap
  ">
    <div className="flex items-center gap-2">
      {/* Static green dot with glow */}
      <div className="
        w-2 h-2 bg-green-500 rounded-full
        shadow-[0_0_8px_2px_rgba(34,197,94,0.6)]
      " />
      <span className="text-xs sm:text-sm font-semibold text-green-800 dark:text-green-300">
        {heroContent.availabilityStatus}
      </span>
    </div>
  </div>
));
AvailabilityBadge.displayName = 'AvailabilityBadge';

/**
 * Connect button that scrolls to contact section
 */
const ConnectButton = memo(({ prefersReducedMotion }: {
  prefersReducedMotion: boolean | null;
}) => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.button
      onClick={scrollToContact}
      className="
        backdrop-blur-sm bg-white/90 dark:bg-gray-800/90
        px-4 py-2 rounded-full shadow-lg
        border border-blue-200 dark:border-blue-800
        hover:bg-blue-50 dark:hover:bg-blue-900/30
        transition-colors cursor-pointer whitespace-nowrap
      "
      whileHover={withReducedMotion(buttonHover, prefersReducedMotion)}
      whileTap={withReducedMotion(tapScale, prefersReducedMotion)}
      aria-label="Scroll to contact section"
    >
      <span className="text-xs sm:text-sm font-semibold text-blue-800 dark:text-blue-300">
        {heroContent.ctaConnect}
      </span>
    </motion.button>
  );
});
ConnectButton.displayName = 'ConnectButton';

/**
 * Achievement badges container
 */
const AchievementBadges = memo(({ prefersReducedMotion }: {
  prefersReducedMotion: boolean | null;
}) => (
  <motion.div
    variants={scaleIn}
    initial="hidden"
    animate="visible"
    className="
      absolute -bottom-8 sm:-bottom-12
      transform -translate-x-1/2
      flex flex-col sm:flex-row gap-2 items-center z-10
    "
  >
    <AvailabilityBadge />
    <ConnectButton prefersReducedMotion={prefersReducedMotion} />
  </motion.div>
));
AchievementBadges.displayName = 'AchievementBadges';

/**
 * Main hero visual component
 */
export const HeroVisual = memo(({ className = '' }: HeroVisualProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={fadeInRight}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      className={`
        flex flex-col items-center lg:items-end gap-4
        order-1 lg:order-2 pb-6 sm:pb-12
        ${className}
      `}
    >
      {/* Profile Image Container */}
      <div className="relative w-full max-w-md flex justify-center">
        <ProfileImage prefersReducedMotion={prefersReducedMotion} />
        <AchievementBadges prefersReducedMotion={prefersReducedMotion} />
      </div>
    </motion.div>
  );
});
HeroVisual.displayName = 'HeroVisual';

export default HeroVisual;

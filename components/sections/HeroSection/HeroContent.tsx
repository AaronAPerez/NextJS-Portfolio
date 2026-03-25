'use client';

/**
 * HeroContent Component
 *
 * Left column of the hero section containing:
 * - Name and title
 * - Value proposition
 * - Tech rotation
 * - Social links
 * - CTA buttons
 * - Location info
 */

import { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Download, MapPin } from 'lucide-react';
import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight';
import { contactInfo } from '@/data/contact';
import { heroContent } from './constants';
import { fadeInLeft, fadeInUp, buttonHover, tapScale, withReducedMotion, getTransition } from './animations';
import SocialLinks from './SocialLinks';
import TechRotation from './TechRotation';

// Extend Window for gtag analytics
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

interface HeroContentProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * CTA button for primary action (View My Work)
 */
const PrimaryButton = memo(({ onClick, prefersReducedMotion }: {
  onClick: () => void;
  prefersReducedMotion: boolean | null;
}) => (
  <motion.button
    onClick={onClick}
    className="
      group touch-target px-8 py-3 text-base
      bg-gradient-to-r from-blue-600 to-indigo-600
      text-white font-semibold rounded-xl
      shadow-lg hover:shadow-xl transition-all duration-300
      flex items-center justify-center gap-2 min-h-[48px]
    "
    whileHover={withReducedMotion(buttonHover, prefersReducedMotion)}
    whileTap={withReducedMotion(tapScale, prefersReducedMotion)}
    aria-label="View my portfolio projects"
  >
    <span>View My Work</span>
    <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
  </motion.button>
));
PrimaryButton.displayName = 'PrimaryButton';

/**
 * CTA button for resume download
 */
const ResumeButton = memo(({ prefersReducedMotion }: {
  prefersReducedMotion: boolean | null;
}) => {
  const handleResumeDownload = () => {
    // Track download event for analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'resume_download', {
        event_category: 'engagement',
        event_label: 'hero_section'
      });
    }
  };

  return (
    <motion.a
      href={heroContent.resumePath}
      download
      onClick={handleResumeDownload}
      className="
        group touch-target px-8 py-3 text-base
        backdrop-blur-sm bg-white/80 dark:bg-gray-800/80
        border-2 border-gray-300 dark:border-gray-600
        text-gray-900 dark:text-white font-semibold rounded-xl
        shadow-lg hover:shadow-xl transition-all duration-300
        flex items-center justify-center gap-2 min-h-[48px]
        hover:bg-white dark:hover:bg-gray-800
      "
      whileHover={withReducedMotion(buttonHover, prefersReducedMotion)}
      whileTap={withReducedMotion(tapScale, prefersReducedMotion)}
      aria-label="Download resume PDF"
    >
      <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
      <span>Download Resume</span>
    </motion.a>
  );
});
ResumeButton.displayName = 'ResumeButton';

/**
 * Location display with map pin icon
 */
const LocationBadge = memo(() => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.6, duration: 0.6 }}
    className="
      flex flex-wrap items-center justify-center lg:justify-start gap-2
      text-sm text-gray-600 dark:text-gray-400
    "
  >
    <MapPin className="w-4 h-4" />
    <span>{contactInfo.location} • {contactInfo.availability}</span>
  </motion.div>
));
LocationBadge.displayName = 'LocationBadge';

/**
 * Main hero content component
 */
export const HeroContent = memo(({ className = '' }: HeroContentProps) => {
  const prefersReducedMotion = useReducedMotion();

  // Scroll to projects section
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      variants={fadeInLeft}
      initial={prefersReducedMotion ? { opacity: 1 } : 'hidden'}
      animate="visible"
      transition={getTransition(prefersReducedMotion)}
      className={`
        space-y-4 sm:space-y-6 w-full text-center lg:text-left
        order-2 lg:order-1
        ${className}
      `}
    >
      {/* Main headline - Name */}
      <h1
        id="hero-heading"
        className="
          text-4xl sm:text-5xl md:text-6xl lg:text-7xl
          font-bold leading-tight
          text-gray-900 dark:text-white
        "
      >
        {heroContent.name}
      </h1>

      {/* Title with highlight effect */}
      <HeroHighlight>
        <motion.h2 className="
          text-2xl sm:text-3xl md:text-4xl font-bold
          max-w-4xl leading-normal mx-auto lg:mx-0
        ">
          <Highlight className="text-white/90 dark:text-white/90 rounded-xl">
            {heroContent.title}
          </Highlight>
        </motion.h2>
      </HeroHighlight>

      {/* Value proposition */}
      <p className="
        text-lg sm:text-xl text-gray-600 dark:text-gray-300
        max-w-xl mx-auto lg:mx-0
      ">
        I build <span className="font-semibold text-gray-900 dark:text-white">
          production websites
        </span> that drive real business results.
      </p>

      {/* Tech stack rotation */}
      <TechRotation className="pt-2" />

      {/* Social Links */}
      <SocialLinks />

      {/* CTA Buttons */}
      <motion.div
        variants={fadeInUp}
        initial={prefersReducedMotion ? { opacity: 1 } : 'hidden'}
        animate="visible"
        transition={getTransition(prefersReducedMotion, { delay: 0.2, duration: 0.4 })}
        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2"
      >
        <PrimaryButton onClick={scrollToProjects} prefersReducedMotion={prefersReducedMotion} />
        <ResumeButton prefersReducedMotion={prefersReducedMotion} />
      </motion.div>

      {/* Location */}
      <LocationBadge />
    </motion.div>
  );
});
HeroContent.displayName = 'HeroContent';

export default HeroContent;

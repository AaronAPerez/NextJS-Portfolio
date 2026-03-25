'use client';

/**
 * HeroSection Component
 *
 * Performance-optimized hero section that serves as the landing area.
 * Implements separation of concerns by composing smaller, focused components.
 *
 * Component Structure:
 * - HeroSection (this file) - Main layout and composition
 *   - HeroContent - Left column with text content and CTAs
 *     - TechRotation - Rotating technology display
 *     - SocialLinks - Social media links
 *   - HeroVisual - Right column with profile image
 *
 * Features:
 * - Reduced animations for better FPS
 * - Memoized components
 * - Lazy-loaded images
 * - Respects prefers-reduced-motion
 * - Uses centralized data from data/ folder
 *
 * @see HeroContent for text content logic
 * @see HeroVisual for visual elements
 * @see constants.ts for all data constants
 */

import { useState, useEffect } from 'react';
import HeroContent from './HeroContent';
import HeroVisual from './HeroVisual';

// =============================================================================
// Sub-Components
// =============================================================================

/**
 * Background decoration with gradient orbs
 */
const BackgroundDecoration = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
    <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
  </div>
);

// =============================================================================
// Main Component
// =============================================================================

/**
 * Main HeroSection component
 * Composes sub-components into a two-column hero layout
 */
export const HeroSection = () => {
  // Hydration guard - prevents flash of unstyled content
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until client-side hydration is complete
  if (!mounted) return null;

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative w-full overflow-hidden min-h-screen bg-gray-50"
    >
      {/* Background decorations */}
      <BackgroundDecoration />

      {/* Main content container */}
      <div className="
        relative z-10 min-h-screen flex items-center justify-center overflow-hidden
        py-8 sm:py-12 lg:py-2 px-4 sm:px-6 lg:px-8
        pt-16 sm:pt-12 md:pt-14 lg:-mt-10
      ">
        <div className="relative max-w-7xl mx-auto w-full">
          {/* Two-column grid layout */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <HeroContent />

            {/* Right Column - Visual */}
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

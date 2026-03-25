'use client';

/**
 * TechRotation Component
 *
 * Displays a rotating list of technologies with smooth animations.
 * Uses skill data from the centralized skills configuration.
 */

import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { featuredTechnologies, TECH_ROTATION_INTERVAL } from './constants';
import { techRotation, getTransition } from './animations';

interface TechRotationProps {
  /** Additional CSS classes */
  className?: string;
  /** Prefix text before the rotating tech name */
  prefix?: string;
}

/**
 * Rotating technology display component
 */
export const TechRotation = memo(({
  className = '',
  prefix = 'Building with'
}: TechRotationProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Rotate through technologies on interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredTechnologies.length);
    }, TECH_ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const currentTech = featuredTechnologies[currentIndex];

  if (!currentTech) return null;

  return (
    <div className={`
      flex flex-wrap items-center justify-center lg:justify-start gap-2
      text-base sm:text-lg text-gray-700 dark:text-gray-300
      ${className}
    `}>
      <span>{prefix}</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentTech.id}
          variants={techRotation}
          initial={prefersReducedMotion ? { opacity: 1 } : 'initial'}
          animate="animate"
          exit={prefersReducedMotion ? { opacity: 1 } : 'exit'}
          transition={getTransition(prefersReducedMotion, { duration: 0.2 })}
          className="font-semibold text-primary-600 dark:text-primary-400"
        >
          {currentTech.name}
        </motion.span>
      </AnimatePresence>
    </div>
  );
});
TechRotation.displayName = 'TechRotation';

export default TechRotation;

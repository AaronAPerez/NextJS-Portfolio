'use client'

/**
 * SkillCard Component
 *
 * Individual skill display card with hover effects and fallback handling.
 * Compact design with smaller tiles for efficient space usage.
 * Performance optimized with:
 * - Memoization to prevent unnecessary re-renders
 * - CSS hover effects instead of JS animations
 * - Lazy loading for images below the fold
 * - Reduced motion support for accessibility
 */

import { useState, memo } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Skill } from '@/types/skills'
import { CATEGORY_ICONS, CategoryId } from '@/constants/skillCategories'

interface SkillCardProps {
  skill: Skill
  index: number
}

/**
 * SkillCard - Displays a single skill with icon, name, and category
 * Compact tile design with smaller sizing
 * Memoized to prevent re-renders when other cards change
 * Uses CSS hover instead of JS for better performance
 */
export const SkillCard = memo(function SkillCard({ skill, index }: SkillCardProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.02, 0.2) // Reduced delay for faster animation with more tiles
      }}
      className="group"
    >
      <div
        className={cn(
          "relative w-full aspect-square rounded-lg overflow-hidden",
          "bg-white dark:bg-gray-800/90",
          "border border-gray-200 dark:border-gray-700",
          "shadow-sm hover:shadow-lg",
          "transition-all duration-300 ease-out",
          "hover:scale-105 hover:-translate-y-1",
          // Reduced motion: disable transform animations
          "motion-reduce:hover:scale-100 motion-reduce:hover:translate-y-0"
        )}
        style={{
          borderColor: `${skill.color}30`,
        }}
      >
        {/* Gradient overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 motion-reduce:group-hover:opacity-5"
          style={{ backgroundColor: skill.color }}
        />

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center p-2 gap-1">
          {/* Icon container - smaller size for compact tiles */}
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
            {!imageError ? (
              <Image
                src={skill.icon}
                alt=""
                fill
                className={cn(
                  "object-contain",
                  "transition-transform duration-300",
                  "group-hover:scale-110 motion-reduce:group-hover:scale-100"
                )}
                onError={() => setImageError(true)}
                sizes="40px"
                loading={index < 16 ? "eager" : "lazy"}
              />
            ) : (
              // Fallback icon
              <div
                className="w-full h-full rounded-md flex items-center justify-center text-white font-bold text-sm shadow-md"
                style={{ backgroundColor: skill.color }}
                aria-hidden="true"
              >
                {skill.name.charAt(0)}
              </div>
            )}
          </div>

          {/* Skill name - smaller text for compact tiles */}
          <h3
            className="text-xs font-semibold text-center text-gray-900 dark:text-white leading-tight line-clamp-2"
            title={skill.name}
          >
            {skill.name}
          </h3>

          {/* Category indicator - hidden on very small tiles to save space */}
          <div className="hidden sm:flex items-center gap-1 mt-auto">
            <div
              className="w-1 h-1 rounded-full flex-shrink-0"
              style={{ backgroundColor: skill.color }}
              aria-hidden="true"
            />
            <span className="text-[0.65rem] text-gray-500 dark:text-gray-400 capitalize truncate">
              {skill.category}
            </span>
          </div>
        </div>

        {/* Hover detail overlay */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center p-2",
            "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm",
            "opacity-0 group-hover:opacity-100",
            "transition-opacity duration-300",
            "motion-reduce:hidden" // Hide overlay for reduced motion
          )}
        >
          <span
            className="text-xl mb-1"
            aria-hidden="true"
          >
            {CATEGORY_ICONS[skill.category as CategoryId]}
          </span>
          <h4
            className="font-bold text-sm mb-1 text-center"
            style={{ color: skill.color }}
          >
            {skill.name}
          </h4>
          <p className="text-[0.65rem] text-gray-600 dark:text-gray-300 text-center line-clamp-3 leading-relaxed">
            {skill.description || `Professional experience with ${skill.name}`}
          </p>
        </div>
      </div>
    </motion.div>
  )
})

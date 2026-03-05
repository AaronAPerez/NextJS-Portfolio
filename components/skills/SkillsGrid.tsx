'use client'

/**
 * SkillsGrid Component
 *
 * Responsive grid layout wrapper for skill cards.
 * Features:
 * - CSS Grid for responsive layout (3-8 columns based on viewport)
 * - Compact tile sizing for efficient space usage
 * - Memoized to prevent re-renders when filter changes
 * - Semantic HTML with ARIA roles for accessibility
 */

import { memo } from 'react'
import { Skill } from '@/types/skills'
import { SkillCard } from './SkillCard'

interface SkillsGridProps {
  skills: Skill[]
}

/**
 * SkillsGrid - Grid layout for skill cards
 * Uses CSS Grid for responsive layout that adapts to screen size
 * Smaller tiles with more columns for compact display
 * Memoized to prevent unnecessary re-renders
 */
export const SkillsGrid = memo(function SkillsGrid({ skills }: SkillsGridProps) {
  return (
    <div
      className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-1.5 sm:gap-2 md:gap-3"
      role="list"
      aria-label="Skills list"
    >
      {skills.map((skill, index) => (
        <div key={skill.id} role="listitem">
          <SkillCard skill={skill} index={index} />
        </div>
      ))}
    </div>
  )
})

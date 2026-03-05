'use client'

/**
 * CategoryButton Component
 *
 * Filter button for skill categories with visual feedback.
 * Features:
 * - Accessible button with ARIA attributes
 * - Visual state indicators (selected/unselected)
 * - Skill count badges
 * - Touch-friendly sizing (min 44px height)
 * - Memoized to prevent unnecessary re-renders
 */

import { memo } from 'react'
import { cn } from '@/lib/utils'
import { CATEGORIES } from '@/constants/skillCategories'

interface CategoryButtonProps {
  category: typeof CATEGORIES[number]
  isSelected: boolean
  count: number
  onClick: () => void
}

/**
 * CategoryButton - Filter button for skill categories
 * Memoized to prevent re-renders when selection changes on other buttons
 * Provides clear visual feedback for the selected state
 */
export const CategoryButton = memo(function CategoryButton({
  category,
  isSelected,
  count,
  onClick
}: CategoryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative px-4 py-2.5 rounded-full font-medium",
        "transition-all duration-200 ease-out",
        "border-2 min-h-[44px] touch-manipulation select-none",
        "text-sm whitespace-nowrap",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        isSelected
          ? "text-white shadow-lg scale-105 motion-reduce:scale-100"
          : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-md"
      )}
      style={isSelected ? {
        backgroundColor: category.color,
        borderColor: category.color,
        boxShadow: `0 4px 14px ${category.color}40`,
      } : {}}
      aria-pressed={isSelected}
      aria-label={`${category.name} (${count} skills)`}
    >
      <span className="flex items-center gap-2">
        {/* Category icon */}
        <span aria-hidden="true">{category.icon}</span>

        {/* Category name */}
        <span>{category.name}</span>

        {/* Skill count badge */}
        <span
          className={cn(
            "px-1.5 py-0.5 text-xs rounded-full font-semibold",
            isSelected
              ? "bg-white/20"
              : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
          )}
        >
          {count}
        </span>
      </span>
    </button>
  )
})

'use client'

/**
 * SkillsSection Component
 *
 * Displays skills in a filterable grid with category tabs.
 * Performance optimized with:
 * - Memoized components to prevent unnecessary re-renders
 * - CSS transitions instead of JS animations where possible
 * - Reduced motion support for accessibility
 * - Efficient filtering with useMemo
 */

import { useState, useMemo, useCallback, memo } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { skills, getSkillsByCategory } from '@/data/skills'
import { Skill } from '@/types/skills'
import { Section } from '../layout/Section'
import { Container } from '../layout/Container'

// Category configuration - defined outside component to prevent recreation
const CATEGORIES = [
  {
    id: 'all',
    name: 'All Skills',
    color: '#3B82F6',
    description: 'Complete technology stack and development tools',
    icon: '🚀'
  },
  {
    id: 'frontend',
    name: 'Frontend',
    color: '#EC4899',
    description: 'User interfaces and web technologies',
    icon: '🎨'
  },
  {
    id: 'backend',
    name: 'Backend',
    color: '#10B981',
    description: 'Server-side development and APIs',
    icon: '⚙️'
  },
  {
    id: 'database',
    name: 'Database',
    color: '#8B5CF6',
    description: 'Data storage and management systems',
    icon: '🗄️'
  },
  {
    id: 'tools',
    name: 'Tools',
    color: '#F59E0B',
    description: 'Development tools and workflows',
    icon: '🛠️'
  },
  {
    id: 'cloud',
    name: 'Cloud',
    color: '#06B6D4',
    description: 'Cloud services and deployment',
    icon: '☁️'
  },
  {
    id: 'game',
    name: 'Game Dev',
    color: '#EF4444',
    description: 'Game development and engines',
    icon: '🎮'
  }
] as const

type CategoryId = typeof CATEGORIES[number]['id']

// Pre-compute skill counts per category for performance
const CATEGORY_COUNTS = CATEGORIES.reduce((acc, cat) => {
  acc[cat.id] = cat.id === 'all' ? skills.length : skills.filter(s => s.category === cat.id).length
  return acc
}, {} as Record<CategoryId, number>)

// Category icon lookup for quick access
const CATEGORY_ICONS = Object.fromEntries(CATEGORIES.map(c => [c.id, c.icon]))

interface SkillCardProps {
  skill: Skill
  index: number
}

/**
 * SkillCard - Individual skill display card
 * Memoized to prevent re-renders when other cards change
 * Uses CSS hover instead of JS for better performance
 */
const SkillCard = memo(function SkillCard({ skill, index }: SkillCardProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.03, 0.3) // Cap delay at 0.3s for large lists
      }}
      className="group"
    >
      <div
        className={cn(
          "relative w-full aspect-square rounded-xl overflow-hidden",
          "bg-white dark:bg-gray-800/90",
          "border border-gray-200 dark:border-gray-700",
          "shadow-sm hover:shadow-xl",
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
        <div className="relative h-full flex flex-col items-center justify-center p-3 gap-2">
          {/* Icon container */}
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0">
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
                sizes="56px"
                loading={index < 12 ? "eager" : "lazy"}
              />
            ) : (
              // Fallback icon
              <div
                className="w-full h-full rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md"
                style={{ backgroundColor: skill.color }}
                aria-hidden="true"
              >
                {skill.name.charAt(0)}
              </div>
            )}
          </div>

          {/* Skill name */}
          <h3
            className="text-sm font-semibold text-center text-gray-900 dark:text-white leading-tight line-clamp-2"
            title={skill.name}
          >
            {skill.name}
          </h3>

          {/* Category indicator */}
          <div className="flex items-center gap-1.5 mt-auto">
            <div
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: skill.color }}
              aria-hidden="true"
            />
            <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
              {skill.category}
            </span>
          </div>
        </div>

        {/* Hover detail overlay */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center p-3",
            "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm",
            "opacity-0 group-hover:opacity-100",
            "transition-opacity duration-300",
            "motion-reduce:hidden" // Hide overlay for reduced motion
          )}
        >
          <span
            className="text-2xl mb-2"
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
          <p className="text-xs text-gray-600 dark:text-gray-300 text-center line-clamp-3 leading-relaxed">
            {skill.description || `Professional experience with ${skill.name}`}
          </p>
        </div>
      </div>
    </motion.div>
  )
})

interface CategoryButtonProps {
  category: typeof CATEGORIES[number]
  isSelected: boolean
  count: number
  onClick: () => void
}

/**
 * CategoryButton - Filter button for skill categories
 * Memoized to prevent re-renders when selection changes on other buttons
 */
const CategoryButton = memo(function CategoryButton({
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
        <span aria-hidden="true">{category.icon}</span>
        <span>{category.name}</span>
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

/**
 * SkillsGrid - Grid of skill cards
 * Uses CSS Grid for responsive layout
 */
const SkillsGrid = memo(function SkillsGrid({
  skills: filteredSkills
}: {
  skills: Skill[]
}) {
  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5"
      role="list"
      aria-label="Skills list"
    >
      {filteredSkills.map((skill, index) => (
        <div key={skill.id} role="listitem">
          <SkillCard skill={skill} index={index} />
        </div>
      ))}
    </div>
  )
})

/**
 * SkillsSection - Main skills display section
 * Features:
 * - Category filtering with counts
 * - Responsive grid layout
 * - Performance optimized animations
 * - Accessibility support
 */
export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all')
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })

  // Memoize filtered skills to prevent recalculation on every render
  const filteredSkills = useMemo(() =>
    getSkillsByCategory(selectedCategory),
    [selectedCategory]
  )

  // Memoize selected category data
  const selectedCategoryData = useMemo(() =>
    CATEGORIES.find(cat => cat.id === selectedCategory),
    [selectedCategory]
  )

  // Memoize category change handler
  const handleCategoryChange = useCallback((categoryId: CategoryId) => {
    setSelectedCategory(categoryId)
  }, [])

  // Scroll to projects handler
  const scrollToProjects = useCallback(() => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950 transition-colors duration-300">
      <Section
        id="skills"
        ref={ref}
        className="relative overflow-hidden py-16 md:py-20 lg:py-24"
        aria-labelledby="skills-heading"
      >
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-0 bg-grid-small opacity-20 pointer-events-none" aria-hidden="true" />

        <Container className="relative z-10">
          {/* Section header */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 md:mb-12"
          >
            {/* Decorative line */}
            <div className="flex items-center justify-center gap-4 mb-6" aria-hidden="true">
              <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-blue-500" />
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-purple-500" />
            </div>

            <h2
              id="skills-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
            >
              Skills & Technologies
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              A comprehensive showcase of the technologies I use to build modern, scalable applications
            </p>

            {/* Stats row */}
            <div className="flex justify-center gap-8 sm:gap-12 mt-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {skills.length}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">Technologies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {CATEGORIES.length - 1}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  3+
                </div>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">Years Exp.</div>
              </div>
            </div>
          </motion.header>

          {/* Category filters */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8"
            aria-label="Skill categories"
          >
            {CATEGORIES.map((category) => (
              <CategoryButton
                key={category.id}
                category={category}
                isSelected={selectedCategory === category.id}
                count={CATEGORY_COUNTS[category.id]}
                onClick={() => handleCategoryChange(category.id)}
              />
            ))}
          </motion.nav>

          {/* Category description */}
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-8"
          >
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              {selectedCategoryData?.description}
            </p>
          </motion.div>

          {/* Skills grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isIntersecting ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SkillsGrid skills={filteredSkills} />
          </motion.div>

          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-12 sm:mt-16"
          >
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-base">
              Want to see these skills in action?
            </p>
            <button
              onClick={scrollToProjects}
              className={cn(
                "px-6 py-3 text-base",
                "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
                "text-white font-semibold rounded-full",
                "transition-all duration-300",
                "shadow-lg hover:shadow-xl hover:scale-105",
                "motion-reduce:hover:scale-100",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                "min-h-[48px] touch-manipulation"
              )}
              aria-label="Scroll to projects section"
            >
              View My Projects
              <span className="ml-2" aria-hidden="true">→</span>
            </button>
          </motion.div>
        </Container>
      </Section>
    </div>
  )
}

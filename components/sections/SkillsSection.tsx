'use client'

/**
 * SkillsSection Component
 *
 * Main orchestrator component for the skills section.
 * Displays skills in a filterable grid with category tabs.
 *
 * Performance optimized with:
 * - Memoized components to prevent unnecessary re-renders
 * - CSS transitions instead of JS animations where possible
 * - Reduced motion support for accessibility
 * - Efficient filtering with useMemo
 *
 * Architecture:
 * - Separated components for better maintainability
 * - Reusable skill components in /components/skills
 * - Centralized constants in /constants/skillCategories
 */

import { useState, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { skills, getSkillsByCategory } from '@/data/skills'
import { Section } from '../layout/Section'
import { Container } from '../layout/Container'
import { CategoryButton, SkillsGrid } from '../skills'
import { CATEGORIES, CATEGORY_COUNTS, CategoryId } from '@/constants/skillCategories'

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

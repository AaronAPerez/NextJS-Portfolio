/**
 * SkillsSection Component
 *
 * Main skills showcase section with category filtering.
 * Displays technical skills organized by category with animated cards.
 *
 * Features:
 * - Category filtering with animated transitions
 * - Core skill highlighting
 * - Responsive grid layout
 * - Accessible keyboard navigation
 * - Reduced motion support
 */

'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

// Data
import { skills, getSkillsByCategory } from '@/data/skills';

// Components
import CategoryTabs from './CategoryTabs';
import SkillCard from './SkillCard';

// Constants & Animations
import { CATEGORY_CONFIG, type SkillCategoryId, CORE_SKILL_IDS } from './constants';
import { containerVariants, headerVariants } from './animations';

// ─── Section Header ───────────────────────────────────────────────────────────

interface SectionHeaderProps {
  shouldReduceMotion: boolean | null;
}

function SectionHeader({ shouldReduceMotion }: SectionHeaderProps) {
  return (
    <motion.div
      variants={shouldReduceMotion ? undefined : headerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mb-8 flex flex-col items-center text-center"
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
        Technical Expertise
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
        Skills & Technologies
      </h2>
      <p className="mt-3 max-w-xl text-base text-gray-500 dark:text-gray-400">
        Technologies I use to build modern, scalable applications.
        <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
          Core
        </span>
        {' '}= primary stack used on every production project.
      </p>
    </motion.div>
  );
}

// ─── Skills Grid ──────────────────────────────────────────────────────────────

interface SkillsGridProps {
  categoryId: SkillCategoryId;
  shouldReduceMotion: boolean | null;
}

function SkillsGrid({ categoryId, shouldReduceMotion }: SkillsGridProps) {
  // Get skills for the selected category
  const filteredSkills = useMemo(() => {
    const categorySkills = getSkillsByCategory(categoryId);

    // Sort: core skills first, then alphabetically
    return [...categorySkills].sort((a, b) => {
      const aIsCore = CORE_SKILL_IDS.includes(a.id as (typeof CORE_SKILL_IDS)[number]);
      const bIsCore = CORE_SKILL_IDS.includes(b.id as (typeof CORE_SKILL_IDS)[number]);

      if (aIsCore && !bIsCore) return -1;
      if (!aIsCore && bIsCore) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [categoryId]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={categoryId}
        variants={shouldReduceMotion ? undefined : containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        role="tabpanel"
        id={`skills-panel-${categoryId}`}
        aria-labelledby={`skills-tab-${categoryId}`}
        className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7"
      >
        {filteredSkills.map((skill, index) => (
          <SkillCard key={skill.id} skill={skill} index={index} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="py-12 text-center">
      <p className="text-gray-500 dark:text-gray-400">
        No skills found in this category.
      </p>
    </div>
  );
}

// ─── Stats Summary ────────────────────────────────────────────────────────────

interface StatsSummaryProps {
  totalSkills: number;
  coreSkillsCount: number;
}

function StatsSummary({ totalSkills, coreSkillsCount }: StatsSummaryProps) {
  return (
    <div className="mb-8 flex justify-center gap-6">
      <div className="text-center">
        <span className="block text-2xl font-bold text-gray-900 dark:text-white">
          {totalSkills}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Total Skills
        </span>
      </div>
      <div className="h-10 w-px bg-gray-200 dark:bg-gray-700" />
      <div className="text-center">
        <span className="block text-2xl font-bold text-blue-600 dark:text-blue-400">
          {coreSkillsCount}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Core Stack
        </span>
      </div>
      <div className="h-10 w-px bg-gray-200 dark:bg-gray-700" />
      <div className="text-center">
        <span className="block text-2xl font-bold text-gray-900 dark:text-white">
          {CATEGORY_CONFIG.length - 1}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Categories
        </span>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

function SkillsSection() {
  // Active category state
  const [activeCategory, setActiveCategory] = useState<SkillCategoryId>('all');

  // Check for reduced motion preference
  const shouldReduceMotion = useReducedMotion();

  // Calculate skill counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<SkillCategoryId, number> = {
      all: skills.length,
      frontend: 0,
      backend: 0,
      database: 0,
      tools: 0,
      cloud: 0,
      game: 0,
    };

    skills.forEach((skill) => {
      if (skill.category in counts) {
        counts[skill.category as keyof typeof counts]++;
      }
    });

    return counts;
  }, []);

  // Get filtered skills for current category
  const filteredSkills = useMemo(
    () => getSkillsByCategory(activeCategory),
    [activeCategory]
  );

  // Handle category change
  const handleCategoryChange = useCallback((category: SkillCategoryId) => {
    setActiveCategory(category);
  }, []);

  // Count core skills
  const coreSkillsCount = useMemo(
    () => skills.filter((s) => CORE_SKILL_IDS.includes(s.id as (typeof CORE_SKILL_IDS)[number])).length,
    []
  );

  return (
    <section
      id="skills"
      className="bg-gray-50 py-20 dark:bg-gray-900/50 sm:py-28"
      aria-label="Skills and technologies"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <SectionHeader shouldReduceMotion={shouldReduceMotion} />

        {/* Stats summary */}
        <StatsSummary
          totalSkills={skills.length}
          coreSkillsCount={coreSkillsCount}
        />

        {/* Category filter tabs */}
        <CategoryTabs
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          counts={categoryCounts}
        />

        {/* Skills grid or empty state */}
        {filteredSkills.length > 0 ? (
          <SkillsGrid
            categoryId={activeCategory}
            shouldReduceMotion={shouldReduceMotion}
          />
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
}

export default SkillsSection;

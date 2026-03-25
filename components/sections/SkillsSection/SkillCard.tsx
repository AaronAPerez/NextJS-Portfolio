/**
 * SkillCard Component
 *
 * Individual skill card with icon, name, and hover effects.
 * Supports highlighted styling for core/primary stack skills.
 */

'use client';

import { memo, useMemo } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import type { Skill } from '@/types/skills';
import { isCoreSkill, getCategoryConfig } from './constants';
import { skillCardVariants, skillHoverVariants, iconVariants } from './animations';

// ─── Types ────────────────────────────────────────────────────────────────────

interface SkillCardProps {
  /** Skill data to display */
  skill: Skill;
  /** Animation delay index for staggered entrance */
  index?: number;
}

// ─── Main Component ───────────────────────────────────────────────────────────

function SkillCard({ skill, index = 0 }: SkillCardProps) {
  // Check for reduced motion preference
  const shouldReduceMotion = useReducedMotion();

  // Check if this is a core/primary stack skill
  const isCore = useMemo(() => isCoreSkill(skill.id), [skill.id]);

  // Get category config for gradient colors
  const categoryConfig = useMemo(
    () => getCategoryConfig(skill.category),
    [skill.category]
  );

  // Memoized styles
  const cardStyles = useMemo(() => {
    const gradient = categoryConfig?.gradient || { from: '#667eea', to: '#764ba2' };
    return {
      // Glow effect for core skills
      glowBg: isCore
        ? `radial-gradient(circle at center, ${skill.color}20, transparent 70%)`
        : undefined,
      // Border accent color
      borderHover: `${skill.color}40`,
      // Icon background
      iconBg: `${skill.color}15`,
      // Category gradient for badge
      categoryGradient: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
    };
  }, [skill.color, categoryConfig, isCore]);

  return (
    <motion.div
      variants={shouldReduceMotion ? undefined : skillCardVariants}
      whileHover={shouldReduceMotion ? undefined : 'hover'}
      whileTap={shouldReduceMotion ? undefined : 'tap'}
      className="group relative"
      role="listitem"
    >
      {/* Glow effect for core skills */}
      {isCore && !shouldReduceMotion && (
        <motion.div
          className="absolute -inset-2 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: cardStyles.glowBg }}
          aria-hidden="true"
        />
      )}

      {/* Card container */}
      <motion.div
        variants={shouldReduceMotion ? undefined : skillHoverVariants}
        className={`
          relative flex flex-col items-center gap-3 rounded-xl border p-4
          transition-all duration-300
          ${
            isCore
              ? 'border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 dark:border-blue-800/50 dark:from-blue-950/50 dark:to-indigo-950/50'
              : 'border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900'
          }
          hover:border-opacity-60 hover:shadow-lg
        `}
        style={{
          ['--hover-border' as string]: cardStyles.borderHover,
        }}
        title={skill.description}
      >
        {/* Core skill indicator */}
        {isCore && (
          <div className="absolute -top-2 right-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-500 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white shadow-sm">
              Core
            </span>
          </div>
        )}

        {/* Skill icon */}
        <motion.div
          variants={shouldReduceMotion ? undefined : iconVariants}
          className="relative flex h-14 w-14 items-center justify-center rounded-xl"
          style={{ backgroundColor: cardStyles.iconBg }}
        >
          <Image
            src={skill.icon}
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
            loading="lazy"
          />
        </motion.div>

        {/* Skill name */}
        <span
          className={`text-center text-sm font-medium ${
            isCore
              ? 'text-blue-700 dark:text-blue-300'
              : 'text-gray-700 dark:text-gray-300'
          }`}
        >
          {skill.name}
        </span>

        {/* Category badge (visible on hover) */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span
            className="whitespace-nowrap rounded-full px-2 py-0.5 text-[9px] font-medium text-white shadow-sm"
            style={{ background: cardStyles.categoryGradient }}
          >
            {skill.category}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Memoize to prevent unnecessary re-renders
export default memo(SkillCard);

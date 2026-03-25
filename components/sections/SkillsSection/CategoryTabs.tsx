/**
 * CategoryTabs Component
 *
 * Horizontal scrollable category filter tabs for skills section.
 * Features animated active indicator and accessible keyboard navigation.
 */

'use client';

import { memo, useCallback, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Layers,
  Monitor,
  Server,
  Database,
  Cloud,
  Wrench,
  Gamepad2,
  LucideIcon,
} from 'lucide-react';
import { CATEGORY_CONFIG, type SkillCategoryId } from './constants';

// ─── Types ────────────────────────────────────────────────────────────────────

interface CategoryTabsProps {
  /** Currently active category */
  activeCategory: SkillCategoryId;
  /** Callback when category changes */
  onCategoryChange: (category: SkillCategoryId) => void;
  /** Skill counts per category */
  counts: Record<SkillCategoryId, number>;
}

// ─── Icon Mapping ─────────────────────────────────────────────────────────────

/**
 * Map icon names to Lucide components
 */
const ICON_MAP: Record<string, LucideIcon> = {
  Layers,
  Monitor,
  Server,
  Database,
  Cloud,
  Wrench,
  Gamepad2,
};

// ─── Tab Button Component ─────────────────────────────────────────────────────

interface TabButtonProps {
  id: SkillCategoryId;
  label: string;
  icon: string;
  gradient: { from: string; to: string };
  count: number;
  isActive: boolean;
  onClick: () => void;
  shouldReduceMotion: boolean | null;
}

const TabButton = memo(function TabButton({
  id,
  label,
  icon,
  gradient,
  count,
  isActive,
  onClick,
  shouldReduceMotion,
}: TabButtonProps) {
  const IconComponent = ICON_MAP[icon] || Layers;

  return (
    <button
      onClick={onClick}
      role="tab"
      aria-selected={isActive}
      aria-controls={`skills-panel-${id}`}
      id={`skills-tab-${id}`}
      className={`
        group relative flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5
        text-sm font-medium transition-all duration-300
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50
        ${
          isActive
            ? 'text-white shadow-lg'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
        }
      `}
      style={
        isActive
          ? {
              background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
              boxShadow: `0 4px 15px ${gradient.from}40`,
            }
          : undefined
      }
    >
      {/* Icon */}
      <IconComponent
        className={`h-4 w-4 transition-transform duration-300 ${
          isActive ? '' : 'group-hover:scale-110'
        }`}
        aria-hidden="true"
      />

      {/* Label */}
      <span>{label}</span>

      {/* Count badge */}
      <span
        className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold transition-colors ${
          isActive
            ? 'bg-white/20 text-white'
            : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
        }`}
      >
        {count}
      </span>

      {/* Animated underline for non-active hover state */}
      {!isActive && !shouldReduceMotion && (
        <motion.div
          className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-gray-300 dark:bg-gray-600"
          initial={{ width: 0 }}
          whileHover={{ width: '60%' }}
          transition={{ duration: 0.2 }}
          aria-hidden="true"
        />
      )}
    </button>
  );
});

// ─── Main Component ───────────────────────────────────────────────────────────

function CategoryTabs({ activeCategory, onCategoryChange, counts }: CategoryTabsProps) {
  const shouldReduceMotion = useReducedMotion();
  const tabsRef = useRef<HTMLDivElement>(null);

  // Handle tab change
  const handleTabClick = useCallback(
    (category: SkillCategoryId) => {
      onCategoryChange(category);
    },
    [onCategoryChange]
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const currentIndex = CATEGORY_CONFIG.findIndex((c) => c.id === activeCategory);
      let newIndex = currentIndex;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          newIndex = currentIndex > 0 ? currentIndex - 1 : CATEGORY_CONFIG.length - 1;
          break;
        case 'ArrowRight':
          e.preventDefault();
          newIndex = currentIndex < CATEGORY_CONFIG.length - 1 ? currentIndex + 1 : 0;
          break;
        case 'Home':
          e.preventDefault();
          newIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          newIndex = CATEGORY_CONFIG.length - 1;
          break;
        default:
          return;
      }

      const newCategory = CATEGORY_CONFIG[newIndex].id;
      onCategoryChange(newCategory);

      // Focus the new tab
      const tabButton = tabsRef.current?.querySelector(
        `#skills-tab-${newCategory}`
      ) as HTMLButtonElement;
      tabButton?.focus();
    },
    [activeCategory, onCategoryChange]
  );

  return (
    <div className="mb-10 w-full">
      {/* Scrollable tabs container */}
      <div className="relative">
        {/* Gradient fade edges for scroll indication */}
        <div
          className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-900/50"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-gray-50 to-transparent dark:from-gray-900/50"
          aria-hidden="true"
        />

        {/* Tabs */}
        <div
          ref={tabsRef}
          role="tablist"
          aria-label="Skill categories"
          onKeyDown={handleKeyDown}
          className="flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-thin sm:justify-center sm:overflow-x-visible sm:px-0"
        >
          {CATEGORY_CONFIG.map((category) => (
            <TabButton
              key={category.id}
              id={category.id}
              label={category.label}
              icon={category.icon}
              gradient={category.gradient}
              count={counts[category.id] || 0}
              isActive={activeCategory === category.id}
              onClick={() => handleTabClick(category.id)}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>
      </div>

      {/* Active category description */}
      <motion.p
        key={activeCategory}
        initial={shouldReduceMotion ? undefined : { opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400"
      >
        {CATEGORY_CONFIG.find((c) => c.id === activeCategory)?.description}
      </motion.p>
    </div>
  );
}

export default memo(CategoryTabs);

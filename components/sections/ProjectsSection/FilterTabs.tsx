/**
 * FilterTabs Component
 *
 * Reusable filter tabs for categorizing projects.
 * Displays category buttons with counts and handles filter state.
 */

'use client';

import { memo } from 'react';
import { FILTER_TABS } from '@/types/display-project';
import type { FilterTab, FilterCounts } from '@/types/display-project';

interface FilterTabsProps {
  /** Currently active filter tab */
  activeTab: FilterTab;
  /** Callback when tab is clicked */
  onTabChange: (tab: FilterTab) => void;
  /** Count of projects in each category */
  counts: FilterCounts;
  /** Optional className for container */
  className?: string;
}

/**
 * FilterTabs
 *
 * Renders a row of filter buttons for project categories.
 * Each button shows the category name and count.
 *
 * @example
 * ```tsx
 * <FilterTabs
 *   activeTab="all"
 *   onTabChange={setActiveFilter}
 *   counts={{ all: 10, client: 5, saas: 3, tool: 2 }}
 * />
 * ```
 */
function FilterTabs({
  activeTab,
  onTabChange,
  counts,
  className = '',
}: FilterTabsProps) {
  return (
    <div className={`mb-8 flex flex-wrap gap-2 ${className}`} role="tablist">
      {FILTER_TABS.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            role="tab"
            aria-selected={isActive}
            aria-controls={`projects-panel-${tab.id}`}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
              isActive
                ? 'bg-blue-600 text-white shadow-sm dark:bg-blue-500'
                : 'bg-white text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {tab.label}
            <span
              className={`rounded-full px-1.5 py-0.5 text-xs ${
                isActive
                  ? 'bg-blue-500 text-white dark:bg-blue-400'
                  : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
              }`}
              aria-label={`${counts[tab.id]} projects`}
            >
              {counts[tab.id]}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// Memoize to prevent unnecessary re-renders
export default memo(FilterTabs);

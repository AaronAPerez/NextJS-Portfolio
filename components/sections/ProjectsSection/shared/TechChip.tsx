/**
 * TechChip Component
 *
 * Displays a technology/skill chip with optional icon.
 * Used in project cards to show the tech stack.
 */

'use client';

import { memo } from 'react';
import Image from 'next/image';

interface TechChipProps {
  /** Technology label to display */
  label: string;
  /** Optional icon path (e.g., from skills data) */
  icon?: string;
  /** Optional accent color for the chip */
  color?: string;
  /** Optional className for additional styling */
  className?: string;
}

/**
 * TechChip
 *
 * Renders a small pill-shaped chip displaying a technology name with optional icon.
 *
 * @example
 * ```tsx
 * <TechChip label="React" icon="/icons/frontend/react.svg" />
 * <TechChip label="TypeScript" />
 * ```
 */
function TechChip({ label, icon, color, className = '' }: TechChipProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded border border-gray-100 bg-gray-50 px-2 py-0.5 text-[11px] text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 ${className}`}
      style={color ? { borderColor: `${color}30`, backgroundColor: `${color}08` } : undefined}
    >
      {icon && (
        <Image
          src={icon}
          alt=""
          width={12}
          height={12}
          className="h-3 w-3 object-contain"
        />
      )}
      {label}
    </span>
  );
}

export default memo(TechChip);

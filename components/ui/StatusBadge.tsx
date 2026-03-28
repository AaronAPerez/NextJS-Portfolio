'use client'

/**
 * StatusBadge - Reusable status indicator component
 * Displays colored badges for various status types across the application
 * Supports GBP client statuses, lead statuses, and custom configurations
 */

import { type ReactNode } from 'react'

// ============================================================================
// Types
// ============================================================================

// Predefined status types
export type ClientStatus = 'lead' | 'onboarding' | 'active' | 'paused' | 'churned'
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'converted' | 'lost'
export type ActionStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled'
export type Priority = 'high' | 'medium' | 'low'

// Combined status type
export type StatusType = ClientStatus | LeadStatus | ActionStatus | Priority | string

// Color variants
export type BadgeVariant =
  | 'default'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'purple'
  | 'pink'
  | 'orange'
  | 'teal'

// Size options
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg'

interface StatusBadgeProps {
  /** The status value to display */
  status: StatusType
  /** Optional custom label (defaults to formatted status) */
  label?: string
  /** Optional icon to display before the label */
  icon?: ReactNode
  /** Size variant */
  size?: BadgeSize
  /** Custom variant override (otherwise auto-detected from status) */
  variant?: BadgeVariant
  /** Whether to show a pulse animation for active states */
  pulse?: boolean
  /** Whether to show as a dot only (no text) */
  dotOnly?: boolean
  /** Additional CSS classes */
  className?: string
}

// ============================================================================
// Configuration
// ============================================================================

// Status to variant mapping for automatic color assignment
const STATUS_VARIANT_MAP: Record<string, BadgeVariant> = {
  // Client statuses
  lead: 'info',
  onboarding: 'warning',
  active: 'success',
  paused: 'default',
  churned: 'error',
  // Lead statuses
  new: 'info',
  contacted: 'purple',
  qualified: 'teal',
  proposal_sent: 'orange',
  converted: 'success',
  lost: 'error',
  // Action statuses
  pending: 'warning',
  in_progress: 'info',
  completed: 'success',
  cancelled: 'default',
  // Priority levels
  high: 'error',
  medium: 'warning',
  low: 'default',
}

// Status to icon mapping
const STATUS_ICON_MAP: Record<string, string> = {
  // Client statuses
  lead: '🎯',
  onboarding: '📋',
  active: '✅',
  paused: '⏸️',
  churned: '❌',
  // Lead statuses
  new: '✨',
  contacted: '📞',
  qualified: '⭐',
  proposal_sent: '📄',
  converted: '🎉',
  lost: '💔',
  // Action statuses
  pending: '⏳',
  in_progress: '🔄',
  completed: '✓',
  cancelled: '✕',
}

// Variant to color classes mapping
const VARIANT_CLASSES: Record<BadgeVariant, { bg: string; text: string; border: string; dot: string }> = {
  default: {
    bg: 'bg-gray-100 dark:bg-gray-800',
    text: 'text-gray-700 dark:text-gray-300',
    border: 'border-gray-200 dark:border-gray-700',
    dot: 'bg-gray-500',
  },
  success: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-700 dark:text-green-400',
    border: 'border-green-200 dark:border-green-800',
    dot: 'bg-green-500',
  },
  warning: {
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    text: 'text-yellow-700 dark:text-yellow-400',
    border: 'border-yellow-200 dark:border-yellow-800',
    dot: 'bg-yellow-500',
  },
  error: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-700 dark:text-red-400',
    border: 'border-red-200 dark:border-red-800',
    dot: 'bg-red-500',
  },
  info: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-800',
    dot: 'bg-blue-500',
  },
  purple: {
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    text: 'text-purple-700 dark:text-purple-400',
    border: 'border-purple-200 dark:border-purple-800',
    dot: 'bg-purple-500',
  },
  pink: {
    bg: 'bg-pink-100 dark:bg-pink-900/30',
    text: 'text-pink-700 dark:text-pink-400',
    border: 'border-pink-200 dark:border-pink-800',
    dot: 'bg-pink-500',
  },
  orange: {
    bg: 'bg-orange-100 dark:bg-orange-900/30',
    text: 'text-orange-700 dark:text-orange-400',
    border: 'border-orange-200 dark:border-orange-800',
    dot: 'bg-orange-500',
  },
  teal: {
    bg: 'bg-teal-100 dark:bg-teal-900/30',
    text: 'text-teal-700 dark:text-teal-400',
    border: 'border-teal-200 dark:border-teal-800',
    dot: 'bg-teal-500',
  },
}

// Size classes
const SIZE_CLASSES: Record<BadgeSize, { container: string; text: string; dot: string; icon: string }> = {
  xs: {
    container: 'px-1.5 py-0.5',
    text: 'text-xs',
    dot: 'w-1.5 h-1.5',
    icon: 'text-xs',
  },
  sm: {
    container: 'px-2 py-0.5',
    text: 'text-xs',
    dot: 'w-2 h-2',
    icon: 'text-sm',
  },
  md: {
    container: 'px-2.5 py-1',
    text: 'text-sm',
    dot: 'w-2.5 h-2.5',
    icon: 'text-base',
  },
  lg: {
    container: 'px-3 py-1.5',
    text: 'text-base',
    dot: 'w-3 h-3',
    icon: 'text-lg',
  },
}

// ============================================================================
// Helpers
// ============================================================================

/**
 * Format status string for display
 * Converts snake_case to Title Case
 */
function formatStatus(status: string): string {
  return status
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

/**
 * Get variant from status
 */
function getVariantFromStatus(status: string): BadgeVariant {
  return STATUS_VARIANT_MAP[status.toLowerCase()] || 'default'
}

// ============================================================================
// Component
// ============================================================================

export function StatusBadge({
  status,
  label,
  icon,
  size = 'sm',
  variant,
  pulse = false,
  dotOnly = false,
  className = '',
}: StatusBadgeProps) {
  // Determine variant from status if not provided
  const resolvedVariant = variant || getVariantFromStatus(status)
  const variantClasses = VARIANT_CLASSES[resolvedVariant]
  const sizeClasses = SIZE_CLASSES[size]

  // Get display label
  const displayLabel = label || formatStatus(status)

  // Get icon if not provided
  const displayIcon = icon ?? STATUS_ICON_MAP[status.toLowerCase()]

  // Dot only mode
  if (dotOnly) {
    return (
      <span
        className={`
          inline-block rounded-full
          ${sizeClasses.dot}
          ${variantClasses.dot}
          ${pulse ? 'animate-pulse' : ''}
          ${className}
        `}
        title={displayLabel}
        aria-label={displayLabel}
      />
    )
  }

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full font-medium border
        ${variantClasses.bg}
        ${variantClasses.text}
        ${variantClasses.border}
        ${sizeClasses.container}
        ${sizeClasses.text}
        ${className}
      `}
    >
      {/* Pulse dot indicator */}
      {pulse && (
        <span className={`rounded-full ${sizeClasses.dot} ${variantClasses.dot} animate-pulse`} />
      )}

      {/* Icon */}
      {displayIcon && !pulse && (
        <span className={sizeClasses.icon} aria-hidden="true">
          {displayIcon}
        </span>
      )}

      {/* Label */}
      <span>{displayLabel}</span>
    </span>
  )
}

// ============================================================================
// Preset Components - Common status badge variants
// ============================================================================

interface PresetBadgeProps {
  status: string
  className?: string
  size?: BadgeSize
}

/**
 * Client status badge with predefined styling
 */
export function ClientStatusBadge({ status, ...props }: PresetBadgeProps) {
  return <StatusBadge status={status as ClientStatus} pulse={status === 'active'} {...props} />
}

/**
 * Lead status badge with predefined styling
 */
export function LeadStatusBadge({ status, ...props }: PresetBadgeProps) {
  return <StatusBadge status={status as LeadStatus} {...props} />
}

/**
 * Priority badge with predefined styling
 */
export function PriorityBadge({ status, ...props }: PresetBadgeProps) {
  const priorityLabels: Record<string, string> = {
    high: 'High Priority',
    medium: 'Medium Priority',
    low: 'Low Priority',
  }
  return <StatusBadge status={status as Priority} label={priorityLabels[status] || status} {...props} />
}

/**
 * Action status badge with predefined styling
 */
export function ActionStatusBadge({ status, ...props }: PresetBadgeProps) {
  return <StatusBadge status={status as ActionStatus} {...props} />
}

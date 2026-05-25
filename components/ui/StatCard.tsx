'use client'

/**
 * StatCard - Reusable statistics card component
 * Displays metrics with optional trends, icons, and click actions
 * Used across dashboards for key performance indicators
 */

import { type ReactNode, type MouseEventHandler } from 'react'

// ============================================================================
// Types
// ============================================================================

export type TrendDirection = 'up' | 'down' | 'neutral'
export type StatCardVariant = 'default' | 'gradient' | 'outline' | 'filled'
export type StatCardSize = 'sm' | 'md' | 'lg'

interface StatCardProps {
  /** Main title/label for the stat */
  title: string
  /** Primary value to display */
  value: string | number
  /** Optional icon or emoji */
  icon?: ReactNode
  /** Trend percentage change */
  trend?: number
  /** Trend direction override (auto-calculated from trend if not provided) */
  trendDirection?: TrendDirection
  /** Description text below the value */
  description?: string
  /** Secondary/sub value */
  subValue?: string | number
  /** Sub value label */
  subLabel?: string
  /** Card variant style */
  variant?: StatCardVariant
  /** Card size */
  size?: StatCardSize
  /** Whether the card is clickable */
  clickable?: boolean
  /** Click handler */
  onClick?: MouseEventHandler<HTMLDivElement>
  /** Whether the card is in loading state */
  loading?: boolean
  /** Custom background color class */
  bgColor?: string
  /** Custom icon background color class */
  iconBgColor?: string
  /** Additional CSS classes */
  className?: string
}

// ============================================================================
// Configuration
// ============================================================================

// Size configurations
const SIZE_CONFIG: Record<StatCardSize, {
  container: string
  title: string
  value: string
  icon: string
  iconContainer: string
  description: string
}> = {
  sm: {
    container: 'p-4',
    title: 'text-xs',
    value: 'text-xl',
    icon: 'text-lg',
    iconContainer: 'w-8 h-8',
    description: 'text-xs',
  },
  md: {
    container: 'p-5',
    title: 'text-sm',
    value: 'text-2xl',
    icon: 'text-xl',
    iconContainer: 'w-10 h-10',
    description: 'text-xs',
  },
  lg: {
    container: 'p-6',
    title: 'text-base',
    value: 'text-3xl',
    icon: 'text-2xl',
    iconContainer: 'w-12 h-12',
    description: 'text-sm',
  },
}

// Variant configurations
const VARIANT_CONFIG: Record<StatCardVariant, {
  container: string
  title: string
  value: string
}> = {
  default: {
    container: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm',
    title: 'text-gray-500 dark:text-gray-400',
    value: 'text-gray-900 dark:text-white',
  },
  gradient: {
    container: 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200/50 dark:border-gray-700/50 shadow-sm',
    title: 'text-gray-600 dark:text-gray-400',
    value: 'text-gray-900 dark:text-white',
  },
  outline: {
    container: 'bg-transparent border-2 border-gray-200 dark:border-gray-700',
    title: 'text-gray-500 dark:text-gray-400',
    value: 'text-gray-900 dark:text-white',
  },
  filled: {
    container: 'bg-gray-900 dark:bg-gray-700 shadow-lg',
    title: 'text-gray-300',
    value: 'text-white',
  },
}

// ============================================================================
// Helper Components
// ============================================================================

interface TrendIndicatorProps {
  trend: number
  direction?: TrendDirection
  size?: StatCardSize
}

function TrendIndicator({ trend, direction, size = 'md' }: TrendIndicatorProps) {
  // Auto-determine direction from trend value if not provided
  const resolvedDirection = direction || (trend > 0 ? 'up' : trend < 0 ? 'down' : 'neutral')

  const trendConfig = {
    up: {
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      icon: '↑',
    },
    down: {
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
      icon: '↓',
    },
    neutral: {
      color: 'text-gray-600 dark:text-gray-400',
      bgColor: 'bg-gray-100 dark:bg-gray-800',
      icon: '→',
    },
  }

  const config = trendConfig[resolvedDirection]
  const sizeClasses = size === 'sm' ? 'text-xs px-1.5 py-0.5' : 'text-xs px-2 py-1'

  return (
    <span
      className={`
        inline-flex items-center gap-0.5 rounded-full font-medium
        ${config.color}
        ${config.bgColor}
        ${sizeClasses}
      `}
    >
      <span>{config.icon}</span>
      <span>{Math.abs(trend).toFixed(1)}%</span>
    </span>
  )
}

// Loading skeleton
function StatCardSkeleton({ size = 'md' }: { size?: StatCardSize }) {
  const sizeConfig = SIZE_CONFIG[size]

  return (
    <div className={`animate-pulse ${sizeConfig.container}`}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
        <div className={`${sizeConfig.iconContainer} bg-gray-200 dark:bg-gray-700 rounded-lg`} />
      </div>
    </div>
  )
}

// ============================================================================
// Component
// ============================================================================

export function StatCard({
  title,
  value,
  icon,
  trend,
  trendDirection,
  description,
  subValue,
  subLabel,
  variant = 'default',
  size = 'md',
  clickable = false,
  onClick,
  loading = false,
  bgColor,
  iconBgColor = 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  className = '',
}: StatCardProps) {
  const sizeConfig = SIZE_CONFIG[size]
  const variantConfig = VARIANT_CONFIG[variant]

  // Show skeleton when loading
  if (loading) {
    return (
      <div
        className={`
          rounded-xl overflow-hidden
          ${bgColor || variantConfig.container}
          ${className}
        `}
      >
        <StatCardSkeleton size={size} />
      </div>
    )
  }

  return (
    <div
      className={`
        rounded-xl overflow-hidden transition-all duration-200
        ${bgColor || variantConfig.container}
        ${sizeConfig.container}
        ${clickable || onClick ? 'cursor-pointer hover:shadow-md hover:scale-[1.02]' : ''}
        ${className}
      `}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick(e as unknown as React.MouseEvent<HTMLDivElement>) : undefined}
    >
      {/* Header with icon */}
      <div className="flex items-start justify-between">
        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <p
            className={`
              font-medium uppercase tracking-wider
              ${sizeConfig.title}
              ${variantConfig.title}
            `}
          >
            {title}
          </p>

          {/* Main Value */}
          <div className="flex items-baseline gap-2 mt-1">
            <p
              className={`
                font-bold leading-tight
                ${sizeConfig.value}
                ${variantConfig.value}
              `}
            >
              {value}
            </p>

            {/* Trend indicator */}
            {trend !== undefined && (
              <TrendIndicator trend={trend} direction={trendDirection} size={size} />
            )}
          </div>

          {/* Sub value */}
          {subValue !== undefined && (
            <p className={`mt-1 ${variantConfig.title} ${sizeConfig.description}`}>
              {subLabel && <span className="font-medium">{subLabel}: </span>}
              <span className="font-semibold">{subValue}</span>
            </p>
          )}

          {/* Description */}
          {description && (
            <p className={`mt-2 ${variantConfig.title} ${sizeConfig.description}`}>
              {description}
            </p>
          )}
        </div>

        {/* Icon */}
        {icon && (
          <div
            className={`
              flex items-center justify-center rounded-lg flex-shrink-0
              ${sizeConfig.iconContainer}
              ${iconBgColor}
            `}
          >
            <span className={sizeConfig.icon}>{icon}</span>
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// Preset Components - Common stat card variants
// ============================================================================

interface MetricCardProps {
  label: string
  value: string | number
  change?: number
  icon?: ReactNode
  className?: string
}

/**
 * Simple metric card for dashboard grids
 */
export function MetricCard({ label, value, change, icon, className }: MetricCardProps) {
  return (
    <StatCard
      title={label}
      value={value}
      icon={icon}
      trend={change}
      size="md"
      className={className}
    />
  )
}

/**
 * Compact metric pill for inline display
 */
export function MetricPill({
  label,
  value,
  icon,
  className = '',
}: {
  label: string
  value: string | number
  icon?: ReactNode
  className?: string
}) {
  return (
    <div
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
        bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300
        ${className}
      `}
    >
      {icon && <span className="text-sm">{icon}</span>}
      <span className="text-xs font-medium">{label}:</span>
      <span className="text-xs font-bold">{value}</span>
    </div>
  )
}

// ============================================================================
// Stats Grid Component
// ============================================================================

interface StatsGridProps {
  children: ReactNode
  columns?: 2 | 3 | 4 | 5
  className?: string
}

/**
 * Responsive grid container for stat cards
 */
export function StatsGrid({ children, columns = 4, className = '' }: StatsGridProps) {
  const columnClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
  }

  return (
    <div className={`grid gap-4 ${columnClasses[columns]} ${className}`}>
      {children}
    </div>
  )
}

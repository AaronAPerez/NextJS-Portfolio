import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Badge Component
 * 
 * Small labels for displaying technology tags, categories, or status.
 * Used extensively in project cards to show tech stack.
 * 
 * Features:
 * - Multiple variants (default, primary, secondary, success, warning, error)
 * - Size options (sm, md, lg)
 * - Optional icon support
 * - Hover effects
 * 
 * @example
 * <Badge variant="primary" size="md">
 *   React
 * </Badge>
 */

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      icon,
      children,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = 
      'inline-flex items-center gap-1 rounded-full font-medium ' +
      'transition-colors duration-200';

    // Variant styles
    const variantStyles = {
      default: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
      primary: 'bg-primary-100 text-primary-800 hover:bg-primary-200',
      secondary: 'bg-accent-100 text-accent-800 hover:bg-accent-200',
      success: 'bg-green-100 text-green-800 hover:bg-green-200',
      warning: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
      error: 'bg-red-100 text-red-800 hover:bg-red-200',
    };

    // Size styles
    const sizeStyles = {
      sm: 'text-xs px-2 py-0.5',
      md: 'text-sm px-3 py-1',
      lg: 'text-base px-4 py-1.5',
    };

    // Icon size styles
    const iconSizeStyles = {
      sm: 'h-3 w-3',
      md: 'h-4 w-4',
      lg: 'h-5 w-5',
    };

    return (
      <span
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {icon && (
          <span className={cn('flex items-center', iconSizeStyles[size])}>
            {icon}
          </span>
        )}
        <span>{children}</span>
      </span>
    );
  }
);

Badge.displayName = 'Badge';
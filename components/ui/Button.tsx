import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

/**
 * Button Component
 * 
 * A versatile button component with multiple variants, sizes, and states.
 * Follows accessibility best practices with proper ARIA attributes.
 * 
 * Features:
 * - Multiple variants (primary, secondary, outline, ghost)
 * - Size options (sm, md, lg)
 * - Loading state with spinner
 * - Icon support (left and right)
 * - Full width option
 * - Keyboard accessible
 * - Screen reader friendly
 * 
 * @example
 * <Button variant="primary" size="md" leftIcon={<Icon />}>
 *   Click Me
 * </Button>
 */

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    // Base styles - common to all buttons
    const baseStyles = 
      'inline-flex items-center justify-center gap-2 rounded-lg font-medium ' +
      'transition-all duration-200 focus:outline-none focus:ring-2 ' +
      'focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ' +
      'active:scale-95';

    // Variant-specific styles
    const variantStyles = {
      primary: 
        'bg-primary-600 text-white hover:bg-primary-700 ' +
        'focus:ring-primary-500 shadow-sm hover:shadow-md',
      secondary: 
        'bg-accent-600 text-white hover:bg-accent-700 ' +
        'focus:ring-accent-500 shadow-sm hover:shadow-md',
      outline: 
        'border-2 border-primary-600 text-primary-600 ' +
        'hover:bg-primary-50 focus:ring-primary-500',
      ghost: 
        'text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
    };

    // Size-specific styles
    const sizeStyles = {
      sm: 'text-sm px-3 py-1.5 min-h-[32px]',
      md: 'text-base px-4 py-2 min-h-[40px]',
      lg: 'text-lg px-6 py-3 min-h-[48px]',
    };

    // Width styles
    const widthStyles = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          widthStyles,
          className
        )}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {/* Loading spinner - only shows when isLoading is true */}
        {isLoading && (
          <Loader2 
            className="h-4 w-4 animate-spin" 
            aria-hidden="true"
            data-testid="button-loading-spinner"
          />
        )}
        
        {/* Left icon - only shows when provided and not loading */}
        {!isLoading && leftIcon && (
          <span className="flex items-center" aria-hidden="true">
            {leftIcon}
          </span>
        )}

        {/* Button text content */}
        <span>{children}</span>

        {/* Right icon - only shows when provided and not loading */}
        {!isLoading && rightIcon && (
          <span className="flex items-center" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
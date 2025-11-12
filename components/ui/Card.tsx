import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Card Component
 * 
 * A flexible container component for grouping related content.
 * Used for project showcases, skill cards, testimonials, etc.
 * 
 * Features:
 * - Multiple variants (default, bordered, elevated)
 * - Hover effects option
 * - Configurable padding
 * - Subcomponents for structured content
 * 
 * @example
 * <Card variant="elevated" hoverable padding="md">
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *     <CardDescription>Description</CardDescription>
 *   </CardHeader>
 *   <CardContent>Content here</CardContent>
 *   <CardFooter>Footer content</CardFooter>
 * </Card>
 */

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated' | 'glass';
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      hoverable = false,
      padding = 'md',
      children,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = 'rounded-xl transition-all duration-300';

    // Variant styles
    const variantStyles = {
      default: 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700',
      bordered: 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600',
      elevated: 'bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl',
      glass: 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50',
    };

    // Hover styles - adds interactive effects
    const hoverStyles = hoverable
      ? 'hover:shadow-2xl hover:-translate-y-1 hover:border-primary-300 dark:hover:border-primary-600 cursor-pointer'
      : '';

    // Padding styles
    const paddingStyles = {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          hoverStyles,
          paddingStyles[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

/**
 * CardHeader - Top section of card
 * Typically contains title and description
 */
export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('mb-4', className)}
    {...props}
  >
    {children}
  </div>
));

CardHeader.displayName = 'CardHeader';

/**
 * CardTitle - Main heading for card
 */
export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-xl font-semibold text-gray-900 dark:text-gray-100 leading-tight',
      className
    )}
    {...props}
  >
    {children}
  </h3>
));

CardTitle.displayName = 'CardTitle';

/**
 * CardDescription - Subtitle or description text
 */
export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-gray-600 dark:text-gray-400 mt-2', className)}
    {...props}
  >
    {children}
  </p>
));

CardDescription.displayName = 'CardDescription';

/**
 * CardContent - Main content area of card
 */
export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('', className)}
    {...props}
  >
    {children}
  </div>
));

CardContent.displayName = 'CardContent';

/**
 * CardFooter - Bottom section of card
 * Typically contains actions or metadata
 */
export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2',
      className
    )}
    {...props}
  >
    {children}
  </div>
));

CardFooter.displayName = 'CardFooter';
import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  background?: 'white' | 'gray' | 'gradient' | 'mesh' | 'dots' | 'grid';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      background = 'white',
      fullWidth = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'py-16 sm:py-20 lg:py-24 relative';

    const backgroundStyles = {
      white: 'bg-white dark:bg-gray-900',
      gray: 'bg-gray-50 dark:bg-gray-800/50',
      gradient: 'bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900',
      mesh: 'bg-mesh-gradient',
      dots: 'bg-white dark:bg-gray-900 bg-dots',
      grid: 'bg-white dark:bg-gray-900 bg-grid',
    };

    const containerStyles = fullWidth 
      ? '' 
      : 'container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl';

    return (
      <section
        ref={ref}
        className={cn(
          baseStyles,
          backgroundStyles[background],
          className
        )}
        {...props}
      >
        <div className={containerStyles}>
          {children}
        </div>
      </section>
    );
  }
);

Section.displayName = 'Section';

export const SectionTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      'text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white',
      'text-center mb-4',
      className
    )}
    {...props}
  >
    {children}
  </h2>
));

SectionTitle.displayName = 'SectionTitle';

export const SectionDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'text-lg sm:text-xl text-gray-600 dark:text-gray-400 text-center max-w-3xl mx-auto mb-12',
      className
    )}
    {...props}
  >
    {children}
  </p>
));

SectionDescription.displayName = 'SectionDescription';

export const SectionContent = React.forwardRef<
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

SectionContent.displayName = 'SectionContent';
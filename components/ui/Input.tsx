import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Input Component
 * 
 * A fully accessible input field with validation states.
 * Supports labels, error messages, helper text, and required indicators.
 * 
 * Features:
 * - Label with required indicator
 * - Error state with error messages
 * - Helper text for guidance
 * - Full width option
 * - Proper ARIA attributes for accessibility
 * - Auto-generated IDs for label association
 * 
 * @example
 * <Input
 *   label="Email Address"
 *   type="email"
 *   placeholder="you@example.com"
 *   error="Please enter a valid email"
 *   required
 *   fullWidth
 * />
 */

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      error,
      helperText,
      fullWidth = false,
      id,
      required,
      disabled,
      ...props
    },
    ref
  ) => {
    // Generate unique ID if not provided for proper label association
    const inputId = id || `input-${React.useId()}`;

    // Base input styles
    const baseStyles = 
      'px-4 py-2 rounded-lg border-2 transition-colors duration-200 ' +
      'focus:outline-none focus:ring-2 focus:ring-offset-2 ' +
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100 ' +
      'placeholder:text-gray-400';

    // State-dependent styles
    const stateStyles = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
      : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500';

    // Width styles
    const widthStyles = fullWidth ? 'w-full' : '';

    return (
      <div className={cn('flex flex-col gap-1', fullWidth && 'w-full')}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-gray-700"
          >
            {label}
            {required && (
              <span 
                className="text-red-500 ml-1" 
                aria-label="required field"
              >
                *
              </span>
            )}
          </label>
        )}

        {/* Input field */}
        <input
          ref={ref}
          type={type}
          id={inputId}
          className={cn(
            baseStyles,
            stateStyles,
            widthStyles,
            className
          )}
          disabled={disabled}
          required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error 
              ? `${inputId}-error` 
              : helperText 
              ? `${inputId}-helper` 
              : undefined
          }
          {...props}
        />

        {/* Error message - displayed when error prop is provided */}
        {error && (
          <p
            id={`${inputId}-error`}
            className="text-sm text-red-600 flex items-start gap-1"
            role="alert"
          >
            <span aria-hidden="true">⚠</span>
            <span>{error}</span>
          </p>
        )}

        {/* Helper text - displayed when no error and helperText is provided */}
        {!error && helperText && (
          <p
            id={`${inputId}-helper`}
            className="text-sm text-gray-500"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
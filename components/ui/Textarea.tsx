import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Textarea Component
 * 
 * A fully accessible textarea field for multi-line text input.
 * Used in contact forms for message/comment fields.
 * 
 * Features:
 * - Label with required indicator
 * - Error state with error messages
 * - Helper text for guidance
 * - Character counter option
 * - Vertical resize only
 * - Full accessibility support
 * 
 * @example
 * <Textarea
 *   label="Your Message"
 *   placeholder="Tell us about your project..."
 *   rows={5}
 *   maxLength={1000}
 *   error="Message is too short"
 *   required
 *   fullWidth
 * />
 */

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  showCharCount?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      fullWidth = false,
      showCharCount = false,
      id,
      rows = 4,
      maxLength,
      value,
      required,
      disabled,
      ...props
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const textareaId = id || `textarea-${React.useId()}`;

    // Calculate current character count
    const currentLength = typeof value === 'string' ? value.length : 0;

    // Base textarea styles
    const baseStyles = 
      'px-4 py-2 rounded-lg border-2 transition-colors duration-200 ' +
      'focus:outline-none focus:ring-2 focus:ring-offset-2 ' +
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100 ' +
      'resize-vertical placeholder:text-gray-400';

    // State-dependent styles
    const stateStyles = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
      : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500';

    // Width styles
    const widthStyles = fullWidth ? 'w-full' : '';

    return (
      <div className={cn('flex flex-col gap-1', fullWidth && 'w-full')}>
        {/* Label and character counter header */}
        <div className="flex items-center justify-between">
          {label && (
            <label
              htmlFor={textareaId}
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

          {/* Character counter - shows when showCharCount is true and maxLength is set */}
          {showCharCount && maxLength && (
            <span 
              className={cn(
                'text-xs',
                currentLength > maxLength * 0.9 
                  ? 'text-orange-600 font-medium' 
                  : 'text-gray-500'
              )}
              aria-live="polite"
            >
              {currentLength} / {maxLength}
            </span>
          )}
        </div>

        {/* Textarea field */}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          maxLength={maxLength}
          value={value}
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
              ? `${textareaId}-error` 
              : helperText 
              ? `${textareaId}-helper` 
              : undefined
          }
          {...props}
        />

        {/* Error message */}
        {error && (
          <p
            id={`${textareaId}-error`}
            className="text-sm text-red-600 flex items-start gap-1"
            role="alert"
          >
            <span aria-hidden="true">⚠</span>
            <span>{error}</span>
          </p>
        )}

        {/* Helper text */}
        {!error && helperText && (
          <p
            id={`${textareaId}-helper`}
            className="text-sm text-gray-500"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
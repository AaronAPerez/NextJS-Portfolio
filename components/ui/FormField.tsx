'use client'

/**
 * FormField - Reusable form input components
 * Provides consistent styling and accessibility for form elements
 * Supports text inputs, textareas, selects, and checkboxes
 */

import {
  forwardRef,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  type SelectHTMLAttributes,
  type ReactNode,
} from 'react'

// ============================================================================
// Types
// ============================================================================

type InputSize = 'sm' | 'md' | 'lg'

// Base props shared by all form field types
interface BaseFieldProps {
  /** Field label */
  label?: string
  /** Help text displayed below the input */
  helpText?: string
  /** Error message (overrides help text when present) */
  error?: string
  /** Icon to display at the start of the input */
  icon?: ReactNode
  /** Icon to display at the end of the input */
  rightIcon?: ReactNode
  /** Size variant */
  size?: InputSize
  /** Whether the field is required */
  required?: boolean
  /** Whether to hide the label visually (still accessible to screen readers) */
  hideLabel?: boolean
  /** Additional wrapper class names */
  wrapperClassName?: string
}

// ============================================================================
// Configuration
// ============================================================================

const SIZE_CONFIG: Record<InputSize, {
  input: string
  label: string
  helpText: string
  icon: string
}> = {
  sm: {
    input: 'px-3 py-1.5 text-sm',
    label: 'text-xs',
    helpText: 'text-xs',
    icon: 'text-sm',
  },
  md: {
    input: 'px-4 py-2.5 text-sm',
    label: 'text-sm',
    helpText: 'text-xs',
    icon: 'text-base',
  },
  lg: {
    input: 'px-5 py-3 text-base',
    label: 'text-base',
    helpText: 'text-sm',
    icon: 'text-lg',
  },
}

const BASE_INPUT_CLASSES = `
  w-full rounded-lg border transition-all duration-200
  bg-white dark:bg-gray-800
  text-gray-900 dark:text-white
  placeholder-gray-400 dark:placeholder-gray-500
  focus:outline-none focus:ring-2 focus:ring-offset-0
`

const BORDER_CLASSES = {
  default: 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500/20',
  error: 'border-red-500 dark:border-red-500 focus:border-red-500 focus:ring-red-500/20',
}

// ============================================================================
// Helper Components
// ============================================================================

interface FieldWrapperProps extends BaseFieldProps {
  children: ReactNode
  id: string
}

function FieldWrapper({
  children,
  id,
  label,
  helpText,
  error,
  required,
  hideLabel,
  size = 'md',
  wrapperClassName = '',
}: FieldWrapperProps) {
  const sizeConfig = SIZE_CONFIG[size]

  return (
    <div className={wrapperClassName}>
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className={`
            block font-medium mb-1.5
            text-gray-700 dark:text-gray-300
            ${sizeConfig.label}
            ${hideLabel ? 'sr-only' : ''}
          `}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input */}
      {children}

      {/* Help text or error */}
      {(error || helpText) && (
        <p
          className={`
            mt-1.5
            ${sizeConfig.helpText}
            ${error ? 'text-red-500 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}
          `}
        >
          {error || helpText}
        </p>
      )}
    </div>
  )
}

// ============================================================================
// Input Component
// ============================================================================

type InputProps = BaseFieldProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helpText,
      error,
      icon,
      rightIcon,
      size = 'md',
      required,
      hideLabel,
      wrapperClassName,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
    const sizeConfig = SIZE_CONFIG[size]
    const hasIcon = !!icon
    const hasRightIcon = !!rightIcon

    return (
      <FieldWrapper
        id={inputId}
        label={label}
        helpText={helpText}
        error={error}
        required={required}
        hideLabel={hideLabel}
        size={size}
        wrapperClassName={wrapperClassName}
      >
        <div className="relative">
          {/* Left icon */}
          {icon && (
            <div
              className={`
                absolute left-3 top-1/2 -translate-y-1/2
                text-gray-400 dark:text-gray-500
                ${sizeConfig.icon}
              `}
            >
              {icon}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            required={required}
            className={`
              ${BASE_INPUT_CLASSES}
              ${sizeConfig.input}
              ${error ? BORDER_CLASSES.error : BORDER_CLASSES.default}
              ${hasIcon ? 'pl-10' : ''}
              ${hasRightIcon ? 'pr-10' : ''}
              ${props.disabled ? 'opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-900' : ''}
              ${className}
            `}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error || helpText ? `${inputId}-description` : undefined}
            {...props}
          />

          {/* Right icon */}
          {rightIcon && (
            <div
              className={`
                absolute right-3 top-1/2 -translate-y-1/2
                text-gray-400 dark:text-gray-500
                ${sizeConfig.icon}
              `}
            >
              {rightIcon}
            </div>
          )}
        </div>
      </FieldWrapper>
    )
  }
)

Input.displayName = 'Input'

// ============================================================================
// Textarea Component
// ============================================================================

type TextareaProps = BaseFieldProps & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helpText,
      error,
      size = 'md',
      required,
      hideLabel,
      wrapperClassName,
      className = '',
      id,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const inputId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`
    const sizeConfig = SIZE_CONFIG[size]

    return (
      <FieldWrapper
        id={inputId}
        label={label}
        helpText={helpText}
        error={error}
        required={required}
        hideLabel={hideLabel}
        size={size}
        wrapperClassName={wrapperClassName}
      >
        <textarea
          ref={ref}
          id={inputId}
          required={required}
          rows={rows}
          className={`
            ${BASE_INPUT_CLASSES}
            ${sizeConfig.input}
            ${error ? BORDER_CLASSES.error : BORDER_CLASSES.default}
            resize-y min-h-[100px]
            ${props.disabled ? 'opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-900' : ''}
            ${className}
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error || helpText ? `${inputId}-description` : undefined}
          {...props}
        />
      </FieldWrapper>
    )
  }
)

Textarea.displayName = 'Textarea'

// ============================================================================
// Select Component
// ============================================================================

type SelectProps = BaseFieldProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> & {
    options: Array<{ value: string; label: string; disabled?: boolean }>
    placeholder?: string
  }

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      helpText,
      error,
      icon,
      size = 'md',
      required,
      hideLabel,
      wrapperClassName,
      className = '',
      id,
      options,
      placeholder,
      ...props
    },
    ref
  ) => {
    const inputId = id || `select-${Math.random().toString(36).substr(2, 9)}`
    const sizeConfig = SIZE_CONFIG[size]
    const hasIcon = !!icon

    return (
      <FieldWrapper
        id={inputId}
        label={label}
        helpText={helpText}
        error={error}
        required={required}
        hideLabel={hideLabel}
        size={size}
        wrapperClassName={wrapperClassName}
      >
        <div className="relative">
          {/* Left icon */}
          {icon && (
            <div
              className={`
                absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none
                text-gray-400 dark:text-gray-500
                ${sizeConfig.icon}
              `}
            >
              {icon}
            </div>
          )}

          {/* Select */}
          <select
            ref={ref}
            id={inputId}
            required={required}
            className={`
              ${BASE_INPUT_CLASSES}
              ${sizeConfig.input}
              ${error ? BORDER_CLASSES.error : BORDER_CLASSES.default}
              ${hasIcon ? 'pl-10' : ''}
              pr-10
              appearance-none cursor-pointer
              ${props.disabled ? 'opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-900' : ''}
              ${className}
            `}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error || helpText ? `${inputId}-description` : undefined}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Dropdown arrow */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 dark:text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </FieldWrapper>
    )
  }
)

Select.displayName = 'Select'

// ============================================================================
// Checkbox Component
// ============================================================================

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> & {
  label: string
  description?: string
  size?: InputSize
  wrapperClassName?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, size = 'md', wrapperClassName = '', className = '', id, ...props }, ref) => {
    const inputId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`
    const sizeConfig = SIZE_CONFIG[size]

    return (
      <div className={`flex items-start gap-3 ${wrapperClassName}`}>
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          className={`
            mt-0.5 rounded border-gray-300 dark:border-gray-600
            text-blue-600 focus:ring-blue-500 focus:ring-offset-0
            dark:bg-gray-800 dark:checked:bg-blue-600
            ${props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            ${className}
          `}
          {...props}
        />
        <div>
          <label
            htmlFor={inputId}
            className={`
              font-medium text-gray-700 dark:text-gray-300
              ${sizeConfig.label}
              ${props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            {label}
          </label>
          {description && (
            <p className={`mt-0.5 text-gray-500 dark:text-gray-400 ${sizeConfig.helpText}`}>
              {description}
            </p>
          )}
        </div>
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

// ============================================================================
// Form Section Component
// ============================================================================

interface FormSectionProps {
  title: string
  description?: string
  icon?: ReactNode
  children: ReactNode
  className?: string
}

/**
 * Form section wrapper with title and optional description
 */
export function FormSection({ title, description, icon, children, className = '' }: FormSectionProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Section header */}
      <div className="flex items-center gap-3 pb-3 border-b border-gray-200 dark:border-gray-700">
        {icon && (
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          {description && (
            <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
          )}
        </div>
      </div>

      {/* Section content */}
      <div className="space-y-4">{children}</div>
    </div>
  )
}

// ============================================================================
// Form Grid Component
// ============================================================================

interface FormGridProps {
  children: ReactNode
  columns?: 1 | 2 | 3 | 4
  className?: string
}

/**
 * Responsive grid layout for form fields
 */
export function FormGrid({ children, columns = 2, className = '' }: FormGridProps) {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div className={`grid gap-4 ${columnClasses[columns]} ${className}`}>
      {children}
    </div>
  )
}

/**
 * GBP Intake Form Field Components
 * ──────────────────────────────────
 * Reusable, accessible field components that match the portfolio's
 * Tailwind + dark-mode design system. Each component is self-contained
 * with proper ARIA labels, error states, and helper text.
 */

'use client';

import { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';
import { CheckCircle2 } from 'lucide-react';

// ── Shared label + hint wrapper ───────────────────────────────────────────────
interface FieldWrapperProps {
  label: string;
  htmlFor: string;
  hint?: string;
  required?: boolean;
  charCount?: { current: number; max: number };
  children: React.ReactNode;
}

export function FieldWrapper({
  label,
  htmlFor,
  hint,
  required,
  charCount,
  children,
}: FieldWrapperProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label
          htmlFor={htmlFor}
          className="text-sm font-medium text-gray-200"
        >
          {label}
          {required && (
            <span className="ml-1 text-blue-400" aria-hidden="true">
              *
            </span>
          )}
        </label>
        {/* Character counter for textarea fields */}
        {charCount && (
          <span
            className={`text-xs tabular-nums ${
              charCount.current > charCount.max * 0.9
                ? 'text-amber-400'
                : 'text-gray-500'
            }`}
            aria-live="polite"
          >
            {charCount.current}/{charCount.max}
          </span>
        )}
      </div>
      {children}
      {hint && (
        <p className="text-xs text-gray-500 leading-relaxed">{hint}</p>
      )}
    </div>
  );
}

// ── Base input styles ─────────────────────────────────────────────────────────
const inputBase =
  'w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-gray-100 placeholder:text-gray-600 ' +
  'focus:border-blue-500/60 focus:bg-white/8 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ' +
  'transition-all duration-150';

// ── Text input ────────────────────────────────────────────────────────────────
interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}

export function TextInput({ label, hint, id, required, ...props }: TextInputProps) {
  return (
    <FieldWrapper label={label} htmlFor={id ?? ''} hint={hint} required={required}>
      <input
        id={id}
        required={required}
        className={inputBase}
        aria-describedby={hint ? `${id}-hint` : undefined}
        {...props}
      />
    </FieldWrapper>
  );
}

// ── Textarea ───────────────────────────────────────────────────────────────────
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
  maxCharCount?: number;
}

export function TextArea({
  label,
  hint,
  id,
  required,
  maxCharCount,
  value,
  ...props
}: TextAreaProps) {
  const currentCount = typeof value === 'string' ? value.length : 0;

  return (
    <FieldWrapper
      label={label}
      htmlFor={id ?? ''}
      hint={hint}
      required={required}
      charCount={maxCharCount ? { current: currentCount, max: maxCharCount } : undefined}
    >
      <textarea
        id={id}
        required={required}
        value={value}
        maxLength={maxCharCount}
        rows={4}
        className={`${inputBase} resize-y min-h-[100px]`}
        {...props}
      />
    </FieldWrapper>
  );
}

// ── Select ─────────────────────────────────────────────────────────────────────
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  hint?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function SelectInput({
  label,
  hint,
  id,
  required,
  options,
  placeholder = 'Select an option',
  ...props
}: SelectProps) {
  return (
    <FieldWrapper label={label} htmlFor={id ?? ''} hint={hint} required={required}>
      <select
        id={id}
        required={required}
        className={`${inputBase} cursor-pointer`}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-gray-900">
            {opt.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}

// ── Checkbox toggle ────────────────────────────────────────────────────────────
interface CheckboxToggleProps {
  id: string;
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function CheckboxToggle({
  id,
  label,
  hint,
  checked,
  onChange,
}: CheckboxToggleProps) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-start gap-3 rounded-lg border border-white/8 bg-white/3 p-3 
                 hover:border-blue-500/30 hover:bg-white/5 transition-all duration-150"
    >
      {/* Custom checkbox visual */}
      <div
        className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded 
          border transition-all duration-150 ${
            checked
              ? 'border-blue-500 bg-blue-500'
              : 'border-white/20 bg-white/5'
          }`}
      >
        {checked && (
          <svg
            className="h-3 w-3 text-white"
            fill="none"
            viewBox="0 0 12 12"
            aria-hidden="true"
          >
            <path
              d="M2 6l3 3 5-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
        aria-describedby={hint ? `${id}-hint` : undefined}
      />
      <div>
        <span className="text-sm font-medium text-gray-200">{label}</span>
        {hint && (
          <p id={`${id}-hint`} className="mt-0.5 text-xs text-gray-500">
            {hint}
          </p>
        )}
      </div>
    </label>
  );
}

// ── Radio group ────────────────────────────────────────────────────────────────
interface RadioGroupProps {
  id: string;
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; description?: string }[];
}

export function RadioGroup({
  id,
  label,
  hint,
  value,
  onChange,
  options,
}: RadioGroupProps) {
  return (
    <FieldWrapper label={label} htmlFor={id} hint={hint}>
      <div className="flex flex-col gap-2" role="radiogroup" aria-label={label}>
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-all duration-150 ${
              value === opt.value
                ? 'border-blue-500/50 bg-blue-500/10'
                : 'border-white/8 bg-white/3 hover:border-white/15 hover:bg-white/5'
            }`}
          >
            <div
              className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full 
                border-2 transition-all duration-150 ${
                  value === opt.value
                    ? 'border-blue-400'
                    : 'border-white/20'
                }`}
            >
              {value === opt.value && (
                <div className="h-2.5 w-2.5 rounded-full bg-blue-400" />
              )}
            </div>
            <input
              type="radio"
              name={id}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="sr-only"
            />
            <div>
              <span className="text-sm font-medium text-gray-200">
                {opt.label}
              </span>
              {opt.description && (
                <p className="mt-0.5 text-xs text-gray-500">
                  {opt.description}
                </p>
              )}
            </div>
          </label>
        ))}
      </div>
    </FieldWrapper>
  );
}

// ── Section header inside a step ───────────────────────────────────────────────
interface SectionHeaderProps {
  title: string;
  description?: string;
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="mb-6 border-b border-white/8 pb-4">
      <h3 className="text-base font-semibold text-gray-100">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}

// ── Completion badge (shown on sidebar step) ───────────────────────────────────
export function StepCompleteBadge() {
  return (
    <CheckCircle2
      className="h-4 w-4 text-green-400 flex-shrink-0"
      aria-label="Step complete"
    />
  );
}

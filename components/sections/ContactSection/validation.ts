/**
 * Client-side contact form validation.
 *
 * Deliberately not zod: neither `zod` nor `zod/mini` tree-shakes under Turbopack
 * (the whole ~60 KB gz library landed in the homepage bundle for four fields).
 * app/api/contact/route.ts re-validates with zod on the server and is the
 * authority — keep the length limits here in sync with its schema. These rules
 * exist only to give users instant feedback.
 */

export type ContactField = 'name' | 'email' | 'subject' | 'message';

export type ContactFormValues = Record<ContactField, string>;

export type ContactFormErrors = Partial<Record<ContactField, string>>;

interface FieldRule {
  min: number;
  max: number;
  messages: { min: string; max: string; pattern?: string };
  pattern?: RegExp;
}

export const CONTACT_FIELDS: readonly ContactField[] = ['name', 'email', 'subject', 'message'];

const RULES: Record<ContactField, FieldRule> = {
  name: {
    min: 2,
    max: 50,
    pattern: /^[a-zA-Z\s'-]+$/,
    messages: {
      min: 'Name must be at least 2 characters',
      max: 'Name must be less than 50 characters',
      pattern: 'Name can only contain letters, spaces, hyphens, and apostrophes',
    },
  },
  email: {
    min: 5,
    max: 100,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    messages: {
      min: 'Email is too short',
      max: 'Email is too long',
      pattern: 'Please enter a valid email address',
    },
  },
  subject: {
    min: 5,
    max: 100,
    messages: {
      min: 'Subject must be at least 5 characters',
      max: 'Subject must be less than 100 characters',
    },
  },
  message: {
    min: 10,
    max: 1000,
    messages: {
      min: 'Message must be at least 10 characters',
      max: 'Message must be less than 1000 characters',
    },
  },
};

/** Returns the first error message for a field, or undefined when valid. */
export function validateField(field: ContactField, value: string): string | undefined {
  const rule = RULES[field];
  if (value.length < rule.min) return rule.messages.min;
  if (value.length > rule.max) return rule.messages.max;
  if (rule.pattern && !rule.pattern.test(value)) return rule.messages.pattern;
  return undefined;
}

/** Validates every field; an empty object means the form is valid. */
export function validateForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};
  for (const field of CONTACT_FIELDS) {
    const error = validateField(field, values[field]);
    if (error) errors[field] = error;
  }
  return errors;
}

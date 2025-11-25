'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, Mail, User, MessageSquare, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { z } from 'zod';

// Validation schema with detailed error messages
const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  email: z.string()
    .min(5, 'Email is too short')
    .max(100, 'Email is too long')
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'),
  subject: z.string()
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must be less than 100 characters'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
});

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FieldError {
  [key: string]: string;
}

interface InputFieldProps {
  label: string;
  name: keyof FormData;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  disabled: boolean;
  placeholder: string;
  icon: React.ReactNode;
  touched: boolean;
  isTextarea?: boolean;
  rows?: number;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  onBlur,
  error,
  disabled,
  placeholder,
  icon,
  touched,
  isTextarea = false,
  rows = 6,
}) => {
  const hasError = touched && error;
  const isValid = touched && !error && value.length > 0;

  const inputClasses = `
    w-full pl-12 pr-4 py-4 rounded-xl
    bg-gray-50 dark:bg-gray-900
    border-2 transition-all duration-300
    text-gray-900 dark:text-gray-100
    placeholder-gray-500 dark:placeholder-gray-600
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${hasError
      ? 'border-red-500 dark:border-red-500 focus:border-red-500 focus:ring-red-500/20'
      : isValid
        ? 'border-green-500 dark:border-green-500 focus:border-green-500 focus:ring-green-500/20'
        : 'border-gray-300 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-700 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500/20'
    }
    ${isTextarea ? 'resize-none' : ''}
  `;

  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
      >
        {label} <span className="text-red-500">*</span>
      </label>

      <div className="relative">
        <div className="absolute left-4 top-4 text-gray-500 dark:text-gray-500 pointer-events-none">
          {icon}
        </div>

        {isTextarea ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            rows={rows}
            placeholder={placeholder}
            className={inputClasses}
            aria-invalid={hasError ? 'true' : 'false'}
            aria-describedby={hasError ? `${name}-error` : undefined}
          />
        ) : (
          <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            placeholder={placeholder}
            className={inputClasses}
            aria-invalid={hasError ? 'true' : 'false'}
            aria-describedby={hasError ? `${name}-error` : undefined}
          />
        )}

        {/* Validation indicator */}
        <AnimatePresence>
          {isValid && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute right-4 top-4"
            >
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Error message */}
      <AnimatePresence>
        {hasError && (
          <motion.p
            id={`${name}-error`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1"
            role="alert"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Character count for message field */}
      {isTextarea && (
        <div className="text-xs text-gray-500 dark:text-gray-500 text-right">
          {value.length} / 1000 characters
        </div>
      )}
    </div>
  );
};

export const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FieldError>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Live validation as user types
  const validateField = (name: keyof FormData, value: string) => {
    try {
      const fieldSchema = contactFormSchema.shape[name];
      fieldSchema.parse(value);
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.issues?.[0]?.message || 'Invalid input';
        setErrors(prev => ({
          ...prev,
          [name]: errorMessage,
        }));
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Live validation if field has been touched
    if (touched[name]) {
      validateField(name as keyof FormData, value);
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name as keyof FormData, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });

    // Validate all fields
    try {
      contactFormSchema.parse(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: FieldError = {};
        error.issues.forEach(err => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
        toast.error('Please fix the errors in the form');
        return;
      }
    }

    setIsSubmitting(true);

    // Show loading toast
    const loadingToast = toast.loading('Sending your message...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(
          'Message sent successfully! Check your email for confirmation.',
          { id: loadingToast, duration: 6000 }
        );

        // Reset form
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({});
        setTouched({});
      } else {
        toast.error(
          data.message || 'Failed to send message. Please try again.',
          { id: loadingToast }
        );
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(
        'Network error. Please check your connection and try again.',
        { id: loadingToast }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = Object.keys(errors).length === 0 &&
    formData.name &&
    formData.email &&
    formData.subject &&
    formData.message;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="w-full max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name and Email - Side by side on larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
            disabled={isSubmitting}
            placeholder="Full Name"
            icon={<User className="w-5 h-5" />}
            touched={touched.name || false}
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            disabled={isSubmitting}
            placeholder="email@example.com"
            icon={<Mail className="w-5 h-5" />}
            touched={touched.email || false}
          />
        </div>

        {/* Subject */}
        <InputField
          label="Subject"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.subject}
          disabled={isSubmitting}
          placeholder="What would you like to discuss?"
          icon={<Sparkles className="w-5 h-5" />}
          touched={touched.subject || false}
        />

        {/* Message */}
        <InputField
          label="Message"
          name="message"
          type="text"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.message}
          disabled={isSubmitting}
          placeholder="Tell me about your project, ideas, or just say hello..."
          icon={<MessageSquare className="w-5 h-5" />}
          touched={touched.message || false}
          isTextarea
          rows={6}
        />

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting || !isFormValid}
          whileHover={!isSubmitting && isFormValid ? { scale: 1.02 } : {}}
          whileTap={!isSubmitting && isFormValid ? { scale: 0.98 } : {}}
          className={`
            w-full py-4 px-8 rounded-xl
            font-semibold text-lg
            transition-all duration-300
            flex items-center justify-center gap-3
            focus:outline-none focus:ring-2 focus:ring-offset-2
            ${
              isSubmitting || !isFormValid
                ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 hover:shadow-xl focus:ring-indigo-500/50'
            }
          `}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-6 h-6" />
              Send Message
            </>
          )}
        </motion.button>

        {/* Privacy notice */}
        <p className="text-xs text-center text-gray-500 dark:text-gray-500">
          Your information is secure and will never be shared with third parties.
          By submitting this form, you agree to receive a confirmation email.
        </p>
      </form>
    </motion.div>
  );
};

export default ContactForm;

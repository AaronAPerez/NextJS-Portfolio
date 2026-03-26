'use client';

/**
 * GBP Audit Form Component
 * ─────────────────────────
 * Lead capture form for the free GBP audit tool
 * Collects business info and contact details
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Building2,
  Phone,
  Globe,
  MapPin,
  Tag,
  User,
  Mail,
  ArrowRight,
  Loader2,
  CheckCircle,
  Shield,
} from 'lucide-react';
import type { GBPAuditInput } from '@/types/gbp-audit';

// ── US States for dropdown ────────────────────────────────────────────────────

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
];

// ── Common business categories ────────────────────────────────────────────────

const BUSINESS_CATEGORIES = [
  'Restaurant',
  'Plumber',
  'Electrician',
  'HVAC Contractor',
  'Dentist',
  'Doctor',
  'Lawyer',
  'Real Estate Agent',
  'Auto Repair',
  'Hair Salon',
  'Spa',
  'Gym',
  'Retail Store',
  'Home Services',
  'Landscaping',
  'Roofing',
  'Cleaning Service',
  'Pet Services',
  'Photography',
  'Other',
];

// ── Form Input Component ──────────────────────────────────────────────────────

interface FormInputProps {
  icon: React.ElementType;
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  options?: string[];
}

function FormInput({
  icon: Icon,
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  required,
  options,
}: FormInputProps) {
  const baseClasses = `w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10
    text-white placeholder-gray-500 focus:outline-none focus:ring-2
    focus:ring-blue-500/50 focus:border-blue-500/50 transition-all`;

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-2">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        {options ? (
          <select
            id={name}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            className={baseClasses}
          >
            <option value="">Select {label.toLowerCase()}</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            className={baseClasses}
          />
        )}
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export function GBPAuditForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<GBPAuditInput>({
    businessName: '',
    businessPhone: '',
    businessWebsite: '',
    businessCity: '',
    businessState: '',
    businessCategory: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
  });

  const updateField = (field: keyof GBPAuditInput) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Store the audit input in sessionStorage for the results page
      const auditId = `audit_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
      sessionStorage.setItem(
        auditId,
        JSON.stringify({
          id: auditId,
          createdAt: new Date().toISOString(),
          input: formData,
        })
      );

      // Also save as a lead to the database (optional - fire and forget)
      fetch('/api/gbp/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'gbp_audit',
          ...formData,
        }),
      }).catch(console.error);

      // Navigate to results page
      router.push(`/tools/gbp-audit/results?id=${auditId}`);
    } catch (error) {
      console.error('Error submitting audit:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-6">
          <CheckCircle className="w-4 h-4" />
          Free Instant Analysis
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Free Google Business Profile Audit
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Discover how your business appears on Google Maps and get actionable
          recommendations to improve your local visibility.
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { icon: CheckCircle, text: '20+ Point Analysis' },
          { icon: Shield, text: 'No Credit Card Required' },
          { icon: ArrowRight, text: 'Instant Results' },
        ].map(({ icon: Icon, text }) => (
          <div
            key={text}
            className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white/5 border border-white/10"
          >
            <Icon className="w-5 h-5 text-green-400" />
            <span className="text-sm text-gray-300 text-center">{text}</span>
          </div>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Business Information */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-400" />
            Business Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <FormInput
                icon={Building2}
                label="Business Name"
                name="businessName"
                placeholder="Acme Plumbing Services"
                value={formData.businessName}
                onChange={updateField('businessName')}
                required
              />
            </div>
            <FormInput
              icon={Phone}
              label="Business Phone"
              name="businessPhone"
              type="tel"
              placeholder="(555) 123-4567"
              value={formData.businessPhone}
              onChange={updateField('businessPhone')}
              required
            />
            <FormInput
              icon={Globe}
              label="Website (optional)"
              name="businessWebsite"
              type="url"
              placeholder="https://example.com"
              value={formData.businessWebsite || ''}
              onChange={updateField('businessWebsite')}
            />
            <FormInput
              icon={MapPin}
              label="City"
              name="businessCity"
              placeholder="Los Angeles"
              value={formData.businessCity}
              onChange={updateField('businessCity')}
              required
            />
            <FormInput
              icon={MapPin}
              label="State"
              name="businessState"
              value={formData.businessState}
              onChange={updateField('businessState')}
              required
              options={US_STATES}
            />
            <div className="md:col-span-2">
              <FormInput
                icon={Tag}
                label="Business Category"
                name="businessCategory"
                value={formData.businessCategory}
                onChange={updateField('businessCategory')}
                required
                options={BUSINESS_CATEGORIES}
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-400" />
            Your Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              icon={User}
              label="Your Name"
              name="contactName"
              placeholder="John Smith"
              value={formData.contactName}
              onChange={updateField('contactName')}
              required
            />
            <FormInput
              icon={Mail}
              label="Email Address"
              name="contactEmail"
              type="email"
              placeholder="john@example.com"
              value={formData.contactEmail}
              onChange={updateField('contactEmail')}
              required
            />
            <div className="md:col-span-2">
              <FormInput
                icon={Phone}
                label="Phone (optional)"
                name="contactPhone"
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.contactPhone || ''}
                onChange={updateField('contactPhone')}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl
                     bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold
                     hover:from-blue-500 hover:to-blue-400 transition-all duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing Your Business...
            </>
          ) : (
            <>
              Get Your Free Audit
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>

        {/* Privacy Note */}
        <p className="text-center text-xs text-gray-500">
          By submitting this form, you agree to receive your audit results and occasional
          marketing communications. We respect your privacy and will never share your information.
        </p>
      </form>
    </div>
  );
}

export default GBPAuditForm;

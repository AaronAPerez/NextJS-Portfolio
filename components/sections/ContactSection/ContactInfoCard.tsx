'use client';

/**
 * ContactInfoCard Component
 *
 * Displays contact information (email, phone, location) in a card layout.
 * Each item is clickable where appropriate (email, phone).
 */

import { Mail, Phone, MapPin, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { contactInfo } from '@/data/contact';

// =============================================================================
// Types
// =============================================================================

interface ContactInfoItemProps {
  /** The icon component to display */
  icon: LucideIcon;
  /** The icon color class */
  iconColor: string;
  /** The display value */
  value: string;
  /** Optional link href */
  href?: string;
  /** Optional hover color class */
  hoverColor?: string;
}

interface ContactInfoCardProps {
  /** Optional title for the card */
  title?: string;
  /** Whether to show availability message */
  showAvailability?: boolean;
  /** Optional additional CSS classes */
  className?: string;
}

// =============================================================================
// Contact Info Item Component
// =============================================================================

const ContactInfoItem = ({
  icon: Icon,
  iconColor,
  value,
  href,
  hoverColor
}: ContactInfoItemProps) => {
  // Base styles for the content
  const contentClasses = cn(
    'flex items-center gap-3',
    'text-gray-700 dark:text-gray-300',
    'transition-colors duration-200',
    hoverColor
  );

  // If there's a link, wrap in anchor tag
  if (href) {
    return (
      <a
        href={href}
        className={contentClasses}
        aria-label={`Contact via ${value}`}
      >
        <Icon
          className={cn('w-4 h-4 flex-shrink-0', iconColor)}
          aria-hidden="true"
        />
        <span className="text-sm truncate">{value}</span>
      </a>
    );
  }

  // Otherwise render as div (for non-clickable items like location)
  return (
    <div className={contentClasses}>
      <Icon
        className={cn('w-4 h-4 flex-shrink-0', iconColor)}
        aria-hidden="true"
      />
      <span className="text-sm">{value}</span>
    </div>
  );
};

// =============================================================================
// Main Component
// =============================================================================

export const ContactInfoCard = ({
  title = 'Contact Info',
  showAvailability = true,
  className
}: ContactInfoCardProps) => {
  return (
    <Card
      variant="elevated"
      padding="lg"
      className={cn('backdrop-blur-sm', className)}
    >
      {/* Card Header */}
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        {title}
      </h3>

      {/* Contact Items List */}
      <div className="space-y-3" role="list" aria-label="Contact information">
        {/* Email - clickable mailto link */}
        <ContactInfoItem
          icon={Mail}
          iconColor="text-blue-500"
          value={contactInfo.email}
          href={`mailto:${contactInfo.email}`}
          hoverColor="hover:text-blue-500"
        />

        {/* Phone - clickable tel link */}
        <ContactInfoItem
          icon={Phone}
          iconColor="text-green-500"
          value={contactInfo.phone}
          href={`tel:${contactInfo.phone}`}
          hoverColor="hover:text-green-500"
        />

        {/* Location - non-clickable */}
        <ContactInfoItem
          icon={MapPin}
          iconColor="text-red-500"
          value={contactInfo.location}
        />
      </div>

      {/* Availability Message */}
      {showAvailability && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {contactInfo.availability}
          </p>
        </div>
      )}
    </Card>
  );
};

export default ContactInfoCard;

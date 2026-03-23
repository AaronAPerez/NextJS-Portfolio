'use client';

/**
 * ContactSidebar Component
 *
 * A sidebar composition that combines contact info, quick actions, and social links.
 * Uses motion animations for smooth entrance effects.
 */

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { quickActions } from '@/data/contact';
import { ContactInfoCard } from './ContactInfoCard';
import { QuickActionButton } from './QuickActionButton';
import { SocialLinks } from './SocialLinks';
import { fadeInRight } from './animations';

// =============================================================================
// Types
// =============================================================================

interface ContactSidebarProps {
  /** Whether the copy action was recently triggered */
  copied: boolean;
  /** Callback function when copy action is triggered */
  onCopy: (value: string) => void;
  /** Optional additional CSS classes */
  className?: string;
}

// =============================================================================
// Component
// =============================================================================

export const ContactSidebar = ({
  copied,
  onCopy,
  className
}: ContactSidebarProps) => {
  return (
    <motion.aside
      variants={fadeInRight}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
      aria-label="Contact information and quick actions"
    >
      <div className="space-y-6">
        {/* Contact Information Card */}
        <ContactInfoCard />

        {/* Quick Actions Card */}
        <Card variant="elevated" padding="lg" className="backdrop-blur-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>

          {/* Action buttons grid */}
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action) => (
              <QuickActionButton
                key={action.id}
                action={action}
                onCopy={onCopy}
                copied={copied}
              />
            ))}
          </div>
        </Card>

        {/* Social Links Card */}
        <Card variant="elevated" padding="lg" className="backdrop-blur-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Connect
          </h3>

          <SocialLinks direction="horizontal" size="md" />
        </Card>
      </div>
    </motion.aside>
  );
};

export default ContactSidebar;

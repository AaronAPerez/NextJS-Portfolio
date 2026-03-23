'use client';

/**
 * EducationCredentials Component
 *
 * Prominently displays educational credentials including degrees and certifications.
 * Designed to highlight Bachelor's and Associate's degrees for job applications.
 */

import { motion } from 'framer-motion';
import { GraduationCap, Award, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { educationCredentials, EducationCredential } from '@/data/about';
import { staggerContainer, staggerItem, scaleUp } from './animations';

// =============================================================================
// Types
// =============================================================================

interface EducationCredentialsProps {
  /** Optional credentials override (defaults to data from about.ts) */
  credentials?: EducationCredential[];
  /** Layout style */
  layout?: 'grid' | 'list';
  /** Whether to show highlights/details */
  showHighlights?: boolean;
  /** Optional additional CSS classes */
  className?: string;
}

// =============================================================================
// Sub-Components
// =============================================================================

/**
 * Individual credential card with degree info and highlights
 */
const CredentialCard = ({
  credential,
  showHighlights = true
}: {
  credential: EducationCredential;
  showHighlights?: boolean;
}) => {
  const IconComponent = credential.icon === 'degree' ? GraduationCap : Award;

  return (
    <motion.div variants={staggerItem} className="h-full">
      <Card
        variant="elevated"
        padding="none"
        className="h-full overflow-hidden group hover:shadow-xl transition-shadow duration-300"
      >
        {/* Gradient header with degree type */}
        <div
          className={cn(
            'p-4 bg-gradient-to-r text-white relative overflow-hidden',
            credential.gradient
          )}
        >
          {/* Background decoration */}
          <div
            className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full"
            aria-hidden="true"
          />

          <div className="relative z-10 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <IconComponent className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs font-medium text-white/80 uppercase tracking-wider">
                  {credential.degreeType}
                </span>
                <h3 className="text-lg font-bold leading-tight">
                  {credential.degree}
                </h3>
              </div>
            </div>

            {/* Honors badge */}
            {credential.honors && (
              <span className="px-2 py-1 text-xs font-semibold bg-white/20 rounded-full backdrop-blur-sm">
                {credential.honors}
              </span>
            )}
          </div>
        </div>

        {/* Card body with details */}
        <div className="p-4 space-y-3">
          {/* Field of study */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">
              {credential.field}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {credential.institution}
            </p>
          </div>

          {/* Year and GPA */}
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-500 dark:text-gray-400">
              {credential.year}
            </span>
            {credential.gpa && (
              <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-medium">
                GPA: {credential.gpa}
              </span>
            )}
          </div>

          {/* Highlights */}
          {showHighlights && credential.highlights.length > 0 && (
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
              <ul className="space-y-1.5" role="list">
                {credential.highlights.map((highlight, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    <CheckCircle
                      className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

/**
 * Section header for education credentials
 */
const CredentialsHeader = () => (
  <motion.div
    variants={scaleUp}
    className="flex items-center gap-3 mb-6"
  >
    <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg">
      <GraduationCap className="w-5 h-5 text-white" aria-hidden="true" />
    </div>
    <div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
        Education & Credentials
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Bachelor&apos;s Degree • Associate&apos;s Degree • Professional Certification
      </p>
    </div>
  </motion.div>
);

// =============================================================================
// Main Component
// =============================================================================

export const EducationCredentials = ({
  credentials = educationCredentials,
  layout = 'grid',
  showHighlights = true,
  className
}: EducationCredentialsProps) => {
  // Grid or list layout classes
  const layoutClasses = {
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
    list: 'flex flex-col gap-4'
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      <CredentialsHeader />

      <div className={layoutClasses[layout]}>
        {credentials.map((credential) => (
          <CredentialCard
            key={credential.id}
            credential={credential}
            showHighlights={showHighlights}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default EducationCredentials;

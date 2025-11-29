/**
 * Type-safe environment variables
 * Validates environment variables at build time
 */

const requiredEnvVars = [
  'NEXT_PUBLIC_SITE_URL',
  'NEXT_PUBLIC_SITE_NAME',
] as const;

export const env = {
  // Public variables (accessible in browser)
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME || 'Aaron A. Perez',
  GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  
  // Server-only variables
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  
  // Feature flags
  ENABLE_BLOG: process.env.NEXT_PUBLIC_ENABLE_BLOG === 'true',
  ENABLE_COMMENTS: process.env.NEXT_PUBLIC_ENABLE_COMMENTS === 'true',
} as const;

// Validate required environment variables in production
if (process.env.NODE_ENV === 'production') {
  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  });
}
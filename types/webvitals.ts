/**
 * Web Vitals Metric Type
 * Matches the structure from the web-vitals library
 */
export interface Metric {
  /** The name of the metric (e.g., 'CLS', 'FID', 'FCP', 'LCP', 'TTFB') */
  name: 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB';
  /** The current value of the metric */
  value: number;
  /** The delta between the current and previous value */
  delta: number;
  /** A unique ID for the metric (useful for debugging) */
  id: string;
  /** The type of metric */
  navigationType: 'navigate' | 'reload' | 'back_forward' | 'prerender';
}

/**
 * Web Vitals thresholds (in milliseconds, except CLS)
 * Based on Google's Core Web Vitals recommendations
 */
export const WEB_VITALS_THRESHOLDS = {
  // Largest Contentful Paint (LCP)
  LCP: {
    good: 2500,
    needsImprovement: 4000,
  },
  // First Input Delay (FID)
  FID: {
    good: 100,
    needsImprovement: 300,
  },
  // Cumulative Layout Shift (CLS)
  CLS: {
    good: 0.1,
    needsImprovement: 0.25,
  },
  // First Contentful Paint (FCP)
  FCP: {
    good: 1800,
    needsImprovement: 3000,
  },
  // Time to First Byte (TTFB)
  TTFB: {
    good: 800,
    needsImprovement: 1800,
  },
} as const;

/**
 * Get performance rating for a metric
 */
export function getMetricRating(name: Metric['name'], value: number): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = WEB_VITALS_THRESHOLDS[name];
  
  if (value <= thresholds.good) {
    return 'good';
  } else if (value <= thresholds.needsImprovement) {
    return 'needs-improvement';
  } else {
    return 'poor';
  }
}
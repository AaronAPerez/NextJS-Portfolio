import { useEffect, useState, useCallback, useRef } from 'react';

/**
 * Web Vitals Metric Type
 * Matches the structure from the web-vitals library
 */
export interface Metric {
  /** The name of the metric (e.g., 'CLS', 'INP', 'FCP', 'LCP', 'TTFB') */
  name: 'CLS' | 'INP' | 'FCP' | 'LCP' | 'TTFB';
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
  // Interaction to Next Paint (INP)
  INP: {
    good: 200,
    needsImprovement: 500,
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

/**
 * Custom hook for tracking Core Web Vitals
 * 
 * Monitors and reports Core Web Vitals metrics (LCP, FID, CLS, FCP, TTFB)
 * with optional callback for analytics integration.
 * 
 * @param {(metric: Metric) => void} [onMetric] - Optional callback for each metric
 * @returns {Metric[]} Array of collected metrics
 * 
 * @example
 * ```tsx
 * // Basic usage
 * const metrics = useWebVitals();
 * 
 * // With analytics callback
 * const metrics = useWebVitals((metric) => {
 *   // Send to Google Analytics
 *   gtag('event', metric.name, {
 *     value: Math.round(metric.value),
 *     metric_id: metric.id,
 *     metric_value: metric.value,
 *     metric_delta: metric.delta,
 *   });
 * });
 * 
 * // Display in UI
 * {metrics.map(metric => (
 *   <div key={metric.name}>
 *     {metric.name}: {metric.value.toFixed(2)}
 *   </div>
 * ))}
 * ```
 * 
 * @performance
 * - Lazy loads web-vitals library
 * - Only runs in browser (SSR-safe)
 * - Minimal performance impact
 * 
 * @see https://web.dev/vitals/
 */
export function useWebVitals(onMetric?: (metric: Metric) => void) {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const loggedMetrics = useRef<Set<string>>(new Set());
  const onMetricRef = useRef(onMetric);

  // Update ref when callback changes
  useEffect(() => {
    onMetricRef.current = onMetric;
  }, [onMetric]);

  const handleMetric = useCallback(
    (metric: Metric) => {
      // Create unique key for this metric measurement
      const metricKey = `${metric.name}-${metric.id}`;

      // Skip if already logged to prevent duplicates
      if (loggedMetrics.current.has(metricKey)) {
        return;
      }

      loggedMetrics.current.add(metricKey);

      // Update state with new metric
      setMetrics((prev) => {
        // Replace existing metric with same name, or add new one
        const existing = prev.findIndex((m) => m.name === metric.name);
        if (existing >= 0) {
          const updated = [...prev];
          updated[existing] = metric;
          return updated;
        }
        return [...prev, metric];
      });

      // Call optional callback
      onMetricRef.current?.(metric);
    },
    []
  );

  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;

    // Dynamically import web-vitals to avoid SSR issues and reduce bundle size
    import('web-vitals')
      .then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
        // Register all Core Web Vitals observers
        onCLS((metric) => {
          // Patch navigationType for compatibility
          const patchedMetric = {
            ...metric,
            navigationType:
              metric.navigationType === 'back-forward'
                ? 'back_forward'
                : metric.navigationType === 'back-forward-cache'
                ? 'back_forward'
                : metric.navigationType,
          } as Metric;
          handleMetric(patchedMetric);
        });
        onINP((metric) => {
          // Patch navigationType for compatibility
          const patchedMetric = {
            ...metric,
            navigationType:
              metric.navigationType === 'back-forward'
                ? 'back_forward'
                : metric.navigationType === 'back-forward-cache'
                ? 'back_forward'
                : metric.navigationType,
          } as Metric;
          handleMetric(patchedMetric);
        });
        onFCP((metric) => {
          // Patch navigationType for compatibility
          const patchedMetric = {
            ...metric,
            navigationType:
              metric.navigationType === 'back-forward'
                ? 'back_forward'
                : metric.navigationType === 'back-forward-cache'
                ? 'back_forward'
                : metric.navigationType,
          } as Metric;
          handleMetric(patchedMetric);
        });
        onLCP((metric) => {
          // Patch navigationType for compatibility
          const patchedMetric = {
            ...metric,
            navigationType:
              metric.navigationType === 'back-forward'
                ? 'back_forward'
                : metric.navigationType === 'back-forward-cache'
                ? 'back_forward'
                : metric.navigationType,
          } as Metric;
          handleMetric(patchedMetric);
        });
        onTTFB((metric) => {
          // Patch navigationType for compatibility
          const patchedMetric = {
            ...metric,
            navigationType:
              metric.navigationType === 'back-forward'
                ? 'back_forward'
                : metric.navigationType === 'back-forward-cache'
                ? 'back_forward'
                : metric.navigationType,
          } as Metric;
          handleMetric(patchedMetric);
        });
      })
      .catch((error) => {
        console.error('Failed to load web-vitals:', error);
      });
  }, [handleMetric]);

  return metrics;
}

/**
 * Hook for getting a summary of Web Vitals performance
 * 
 * @returns Summary object with metrics and ratings
 * 
 * @example
 * ```tsx
 * const summary = useWebVitalsSummary();
 * 
 * <div>
 *   Overall Score: {summary.score}/100
 *   {summary.poorMetrics.length > 0 && (
 *     <div>Needs improvement: {summary.poorMetrics.join(', ')}</div>
 *   )}
 * </div>
 * ```
 */
export function useWebVitalsSummary() {
  const metrics = useWebVitals();

  const summary = {
    metrics,
    goodMetrics: metrics.filter((m) => getMetricRating(m.name, m.value) === 'good'),
    needsImprovementMetrics: metrics.filter((m) => getMetricRating(m.name, m.value) === 'needs-improvement'),
    poorMetrics: metrics.filter((m) => getMetricRating(m.name, m.value) === 'poor'),
    score: metrics.length > 0 
      ? Math.round((metrics.filter((m) => getMetricRating(m.name, m.value) === 'good').length / metrics.length) * 100)
      : 0,
  };

  return summary;
}
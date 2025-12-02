'use client';

import { useWebVitals, getMetricRating } from '@/hooks/useWebVitals';

export function WebVitals() {
  useWebVitals((metric) => {
    // Send to analytics service
    if (process.env.NEXT_PUBLIC_GA_ID) {
      window.gtag?.('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_category: 'Web Vitals',
        event_label: metric.id,
        non_interaction: true,
      });
    }

    // Log to console in development (now handled once per unique metric)
    if (process.env.NODE_ENV === 'development') {
      const colors: Record<string, string> = {
        CLS: '#FF9800',
        INP: '#9C27B0',
        FCP: '#4CAF50',
        LCP: '#2196F3',
        TTFB: '#F44336',
      };

      const rating = getMetricRating(metric.name, metric.value);
      const emoji = rating === 'good' ? '✅' : rating === 'needs-improvement' ? '⚠️' : '❌';

      console.log(
        `%c${emoji} ${metric.name} ${emoji}`,
        `color: white; font-weight: bold; font-size: 12px; padding: 4px 8px; background: ${colors[metric.name]}; border-radius: 4px;`,
        `\n📊 Value: ${metric.value.toFixed(2)}${metric.name === 'CLS' ? '' : 'ms'}`,
        `\n${rating === 'good' ? '✅' : rating === 'needs-improvement' ? '⚠️' : '❌'} Rating: ${rating}`,
        `\n🔑 ID: ${metric.id}`,
        `\n📈 Delta: ${metric.delta.toFixed(2)}`
      );
    }
  });

  return null;
}
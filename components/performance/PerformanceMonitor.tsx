'use client';

import { useWebVitalsSummary, getMetricRating } from '@/hooks';

export function PerformanceMonitor() {
  const { metrics, score, poorMetrics } = useWebVitalsSummary();

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
      <h3 className="font-bold mb-2">Performance Score: {score}/100</h3>
      {metrics.map((metric) => {
        const rating = getMetricRating(metric.name, metric.value);
        const color = rating === 'good' ? 'green' : rating === 'needs-improvement' ? 'yellow' : 'red';
        
        return (
          <div key={metric.name} className="flex items-center gap-2 mb-1">
            <span className={`w-2 h-2 rounded-full bg-${color}-500`} />
            <span className="text-sm">
              {metric.name}: {metric.value.toFixed(2)}{metric.name === 'CLS' ? '' : 'ms'}
            </span>
          </div>
        );
      })}
      {poorMetrics.length > 0 && (
        <div className="mt-2 text-xs text-red-600">
          Needs improvement: {poorMetrics.map(m => m.name).join(', ')}
        </div>
      )}
    </div>
  );
}
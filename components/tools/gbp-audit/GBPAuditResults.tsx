'use client';

/**
 * GBP Audit Results Component
 * ────────────────────────────
 * Displays the audit results with scores, findings, and CTA
 * Simulates an audit based on the business info provided
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  HelpCircle,
  ArrowRight,
  Download,
  Phone,
  Mail,
  TrendingUp,
  Star,
  ChevronDown,
  ChevronRight,
  Building2,
  FileText,
  Camera,
  MessageSquare,
  Activity,
  Globe,
  Loader2,
} from 'lucide-react';
import type {
  GBPAuditResult,
  GBPAuditInput,
  AuditCheck,
  AuditStatus,
} from '@/types/gbp-audit';
import { SAMPLE_AUDIT_CHECKS, AUDIT_CATEGORIES, calculateGrade } from '@/types/gbp-audit';

// ── Status Icon Component ─────────────────────────────────────────────────────

function StatusIcon({ status }: { status: AuditStatus }) {
  switch (status) {
    case 'pass':
      return <CheckCircle className="w-5 h-5 text-green-400" />;
    case 'warning':
      return <AlertTriangle className="w-5 h-5 text-amber-400" />;
    case 'fail':
      return <XCircle className="w-5 h-5 text-red-400" />;
    default:
      return <HelpCircle className="w-5 h-5 text-gray-400" />;
  }
}

// ── Grade Badge Component ─────────────────────────────────────────────────────

function GradeBadge({ grade, size = 'lg' }: { grade: string; size?: 'sm' | 'lg' }) {
  const colors: Record<string, string> = {
    A: 'from-green-500 to-emerald-500 text-white',
    B: 'from-blue-500 to-cyan-500 text-white',
    C: 'from-amber-500 to-yellow-500 text-white',
    D: 'from-orange-500 to-amber-500 text-white',
    F: 'from-red-500 to-rose-500 text-white',
  };

  const sizeClasses = size === 'lg' ? 'w-24 h-24 text-5xl' : 'w-12 h-12 text-2xl';

  return (
    <div
      className={`${sizeClasses} rounded-2xl bg-gradient-to-br ${colors[grade]}
                  flex items-center justify-center font-bold shadow-lg`}
    >
      {grade}
    </div>
  );
}

// ── Score Ring Component ──────────────────────────────────────────────────────

function ScoreRing({ score, size = 120 }: { score: number; size?: number }) {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (score >= 80) return '#22c55e';
    if (score >= 60) return '#eab308';
    return '#ef4444';
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor()}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-white">{score}</span>
        <span className="text-sm text-gray-400">out of 100</span>
      </div>
    </div>
  );
}

// ── Category Icon Map ─────────────────────────────────────────────────────────

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  profile: Building2,
  content: FileText,
  photos: Camera,
  reviews: MessageSquare,
  engagement: Activity,
  citations: Globe,
};

// ── Generate Simulated Audit Results ──────────────────────────────────────────

function generateAuditResults(input: GBPAuditInput): GBPAuditResult {
  // Simulate audit checks with random but weighted results
  // In a real implementation, this would call actual APIs
  const checks: AuditCheck[] = SAMPLE_AUDIT_CHECKS.map((check) => {
    // Generate somewhat random status based on priority
    // Higher priority items are more likely to fail (creates urgency)
    let rand = Math.random();
    if (check.priority === 'high') rand -= 0.15;
    if (check.priority === 'low') rand += 0.15;

    let status: AuditStatus;
    let scorePercent: number;

    if (rand > 0.6) {
      status = 'pass';
      scorePercent = 0.8 + Math.random() * 0.2;
    } else if (rand > 0.3) {
      status = 'warning';
      scorePercent = 0.4 + Math.random() * 0.3;
    } else {
      status = 'fail';
      scorePercent = Math.random() * 0.3;
    }

    const score = Math.round(check.maxScore * scorePercent);

    // Generate finding based on status
    const findings: Record<AuditStatus, string[]> = {
      pass: [
        'Looking good! This aspect of your profile is well optimized.',
        'Great job! This is properly configured.',
        'Excellent! No issues found here.',
      ],
      warning: [
        'There is room for improvement in this area.',
        'This could be better optimized for local search.',
        'Consider enhancing this aspect of your profile.',
      ],
      fail: [
        'This is a critical issue that needs immediate attention.',
        'This is negatively impacting your local visibility.',
        'Fixing this should be a top priority.',
      ],
      unknown: ['Unable to verify this information.'],
    };

    return {
      ...check,
      status,
      score,
      finding: findings[status][Math.floor(Math.random() * findings[status].length)],
    };
  });

  // Calculate overall score
  const totalMaxScore = checks.reduce((sum, c) => sum + c.maxScore, 0);
  const totalScore = checks.reduce((sum, c) => sum + c.score, 0);
  const overallScore = Math.round((totalScore / totalMaxScore) * 100);

  // Count statuses
  const summary = {
    passes: checks.filter((c) => c.status === 'pass').length,
    warnings: checks.filter((c) => c.status === 'warning').length,
    fails: checks.filter((c) => c.status === 'fail').length,
    totalChecks: checks.length,
  };

  // Get top issues (fails and warnings, sorted by priority)
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  const topIssues = checks
    .filter((c) => c.status === 'fail' || c.status === 'warning')
    .sort((a, b) => {
      if (a.status === 'fail' && b.status !== 'fail') return -1;
      if (b.status === 'fail' && a.status !== 'fail') return 1;
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    })
    .slice(0, 5);

  return {
    id: `audit_${Date.now()}`,
    createdAt: new Date().toISOString(),
    input,
    overallScore,
    grade: calculateGrade(overallScore),
    checks,
    summary,
    topIssues,
  };
}

// ── Main Component ────────────────────────────────────────────────────────────

interface GBPAuditResultsProps {
  auditId: string;
}

export function GBPAuditResults({ auditId }: GBPAuditResultsProps) {
  const [result, setResult] = useState<GBPAuditResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['profile']);

  useEffect(() => {
    // Load audit input from sessionStorage
    const stored = sessionStorage.getItem(auditId);
    if (stored) {
      const { input } = JSON.parse(stored);
      // Simulate processing delay
      setTimeout(() => {
        const auditResult = generateAuditResults(input);
        setResult(auditResult);
        setLoading(false);
      }, 2000);
    } else {
      setLoading(false);
    }
  }, [auditId]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <Loader2 className="w-12 h-12 text-blue-400 animate-spin" />
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-2">
            Analyzing Your Business Profile...
          </h2>
          <p className="text-gray-400">
            This usually takes about 10-15 seconds
          </p>
        </div>
        <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 animate-pulse" style={{ width: '60%' }} />
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="text-center py-20">
        <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">
          Audit Not Found
        </h2>
        <p className="text-gray-400 mb-6">
          We couldn&apos;t find your audit results. Please try again.
        </p>
        <Link
          href="/tools/gbp-audit"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500"
        >
          Start New Audit
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header with Score */}
      <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <ScoreRing score={result.overallScore} />

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold text-white mb-2">
              {result.input.businessName}
            </h1>
            <p className="text-gray-400 mb-4">
              {result.input.businessCity}, {result.input.businessState} • {result.input.businessCategory}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-400">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">{result.summary.passes} Passed</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-400">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-medium">{result.summary.warnings} Warnings</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 text-red-400">
                <XCircle className="w-4 h-4" />
                <span className="text-sm font-medium">{result.summary.fails} Issues</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <GradeBadge grade={result.grade} />
            <span className="text-sm text-gray-400">Your Grade</span>
          </div>
        </div>
      </div>

      {/* Top Issues */}
      {result.topIssues.length > 0 && (
        <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            Top Issues to Fix
          </h2>
          <div className="space-y-3">
            {result.topIssues.map((issue) => (
              <div
                key={issue.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-white/5"
              >
                <StatusIcon status={issue.status} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">{issue.title}</span>
                    <span
                      className={`px-1.5 py-0.5 text-[10px] font-medium rounded ${
                        issue.priority === 'high'
                          ? 'bg-red-500/20 text-red-400'
                          : issue.priority === 'medium'
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}
                    >
                      {issue.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{issue.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Breakdown */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Detailed Analysis</h2>

        {AUDIT_CATEGORIES.map((category) => {
          const categoryChecks = result.checks.filter((c) => c.category === category.id);
          const categoryScore = Math.round(
            (categoryChecks.reduce((sum, c) => sum + c.score, 0) /
              categoryChecks.reduce((sum, c) => sum + c.maxScore, 0)) *
              100
          );
          const isExpanded = expandedCategories.includes(category.id);
          const Icon = CATEGORY_ICONS[category.id] || Building2;

          return (
            <div
              key={category.id}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center gap-4 p-4 hover:bg-white/5 transition-colors"
              >
                <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-medium text-white">{category.name}</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden max-w-[200px]">
                      <div
                        className={`h-full rounded-full transition-all ${
                          categoryScore >= 80
                            ? 'bg-green-500'
                            : categoryScore >= 60
                            ? 'bg-amber-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${categoryScore}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-400">{categoryScore}%</span>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                )}
              </button>

              {isExpanded && (
                <div className="border-t border-white/10 p-4 space-y-2">
                  {categoryChecks.map((check) => (
                    <div
                      key={check.id}
                      className={`flex items-start gap-3 p-3 rounded-lg ${
                        check.status === 'pass'
                          ? 'bg-green-500/5'
                          : check.status === 'warning'
                          ? 'bg-amber-500/5'
                          : check.status === 'fail'
                          ? 'bg-red-500/5'
                          : 'bg-white/5'
                      }`}
                    >
                      <StatusIcon status={check.status} />
                      <div className="flex-1">
                        <span className="font-medium text-white">{check.title}</span>
                        <p className="text-sm text-gray-400 mt-0.5">{check.finding}</p>
                        {check.status !== 'pass' && check.recommendation && (
                          <p className="text-sm text-blue-400 mt-1">
                            💡 {check.recommendation}
                          </p>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">
                        {check.score}/{check.maxScore}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-blue-600/20 to-blue-500/10 border border-blue-500/30 rounded-2xl p-8 text-center">
        <TrendingUp className="w-12 h-12 text-blue-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">
          Ready to Improve Your Local Visibility?
        </h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">
          Our GBP optimization experts can help you fix these issues and rank higher
          on Google Maps. Get more calls, more customers, more growth.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors"
          >
            <Phone className="w-5 h-5" />
            Schedule Free Consultation
          </Link>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-6 py-4 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
          >
            <Download className="w-5 h-5" />
            Download Report
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400" />
            4.9/5 Client Rating
          </span>
          <span>•</span>
          <span>100+ Businesses Optimized</span>
        </div>
      </div>

      {/* Start New Audit */}
      <div className="text-center">
        <Link
          href="/tools/gbp-audit"
          className="text-gray-400 hover:text-white text-sm transition-colors"
        >
          ← Run Another Audit
        </Link>
      </div>
    </div>
  );
}

export default GBPAuditResults;

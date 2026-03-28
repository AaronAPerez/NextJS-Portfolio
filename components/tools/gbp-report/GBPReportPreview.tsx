/**
 * GBP Report Web Preview
 * ───────────────────────
 * Dark-themed live preview of the monthly report shown in the browser.
 * Matches your portfolio's aesthetic. Client can view this on-screen
 * during a call, then hit "Export PDF" to download the print version.
 *
 * Uses Tailwind CSS — no @react-pdf/renderer here.
 */

'use client';

import {
  TrendingUp, TrendingDown, Minus, Phone, MousePointer,
  Navigation, Star, Eye, MapPin, FileText, CheckCircle2,
  Clock, AlertCircle, ChevronRight, BarChart3, Target,
} from 'lucide-react';
import type { GBPMonthlyReport, KeywordRanking, ActionItem, MonthlyGoal } from '@/types/gbp-report';
import { getRankChange, formatChange, PRIORITY_COLORS, STATUS_COLORS } from '@/types/gbp-report';

// ── Metric card ───────────────────────────────────────────────────────────────
function MetricCard({
  label,
  value,
  change,
  icon: Icon,
  suffix = '%',
}: {
  label: string;
  value: string | number;
  change: number;
  icon: React.ElementType;
  suffix?: string;
}) {
  const isPositive = change > 0;
  const isNeutral = change === 0;

  return (
    <div className="rounded-xl border border-white/8 bg-white/3 p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-500 uppercase tracking-wider">{label}</span>
        <Icon className="h-4 w-4 text-gray-600" aria-hidden="true" />
      </div>
      <div className="text-2xl font-semibold text-gray-100 mb-1.5">{value}</div>
      <div
        className={`flex items-center gap-1 text-xs font-medium ${
          isNeutral ? 'text-gray-500' : isPositive ? 'text-green-400' : 'text-red-400'
        }`}
        aria-label={`${formatChange(change, suffix)} vs prior month`}
      >
        {isNeutral ? (
          <Minus className="h-3 w-3" />
        ) : isPositive ? (
          <TrendingUp className="h-3 w-3" />
        ) : (
          <TrendingDown className="h-3 w-3" />
        )}
        {formatChange(change, suffix)} vs prior month
      </div>
    </div>
  );
}

// ── Section wrapper ────────────────────────────────────────────────────────────
function Section({ title, children, icon: Icon }: {
  title: string;
  children: React.ReactNode;
  icon: React.ElementType;
}) {
  return (
    <section className="mb-10">
      <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-white/8">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/15 border border-blue-500/20">
          <Icon className="h-3.5 w-3.5 text-blue-400" aria-hidden="true" />
        </div>
        <h2 className="text-sm font-semibold text-gray-200 tracking-wide">{title}</h2>
      </div>
      {children}
    </section>
  );
}

// ── Keyword row ────────────────────────────────────────────────────────────────
function KeywordRow({ kw, index }: { kw: KeywordRanking; index: number }) {
  const dir = getRankChange(kw.currentRank, kw.previousRank);
  const diff =
    dir === 'up' ? (kw.previousRank ?? 0) - (kw.currentRank ?? 0) :
    dir === 'down' ? (kw.currentRank ?? 0) - (kw.previousRank ?? 0) : 0;

  return (
    <div
      className={`flex items-center gap-4 px-4 py-3 rounded-lg text-sm ${
        index % 2 === 0 ? 'bg-white/2' : ''
      }`}
    >
      {/* Keyword */}
      <span className="flex-1 text-gray-300 font-medium truncate">{kw.keyword}</span>

      {/* Current rank */}
      <span className="w-12 text-center font-semibold text-gray-100">
        #{kw.currentRank ?? '—'}
      </span>

      {/* Previous rank */}
      <span className="w-12 text-center text-gray-600 text-xs">
        {kw.previousRank ? `#${kw.previousRank}` : '—'}
      </span>

      {/* Change badge */}
      <div className="w-16 flex justify-center">
        {dir === 'new' && (
          <span className="rounded-full bg-blue-500/15 border border-blue-500/20 px-2 py-0.5 text-xs font-medium text-blue-400">
            NEW
          </span>
        )}
        {dir === 'up' && (
          <span className="rounded-full bg-green-500/15 border border-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400 flex items-center gap-1">
            <TrendingUp className="h-2.5 w-2.5" />+{diff}
          </span>
        )}
        {dir === 'down' && (
          <span className="rounded-full bg-red-500/15 border border-red-500/20 px-2 py-0.5 text-xs font-medium text-red-400 flex items-center gap-1">
            <TrendingDown className="h-2.5 w-2.5" />-{diff}
          </span>
        )}
        {dir === 'same' && (
          <span className="rounded-full bg-gray-500/15 px-2 py-0.5 text-xs text-gray-500">—</span>
        )}
      </div>

      {/* 3-Pack */}
      <div className="w-16 flex justify-center">
        {kw.inLocalPack ? (
          <span className="rounded-full bg-green-500/15 border border-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400">
            3-Pack
          </span>
        ) : (
          <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-gray-600">
            No
          </span>
        )}
      </div>
    </div>
  );
}

// ── Action item row ────────────────────────────────────────────────────────────
function ActionItemRow({ item }: { item: ActionItem }) {
  const pc = PRIORITY_COLORS[item.priority];
  const sc = STATUS_COLORS[item.status];
  const StatusIcon = item.status === 'complete' ? CheckCircle2 :
    item.status === 'in-progress' ? Clock : AlertCircle;

  return (
    <div className="flex items-start gap-3 py-3.5 border-b border-white/5 last:border-0">
      <div className={`mt-0.5 flex-shrink-0 rounded px-1.5 py-0.5 text-xs font-medium border ${pc.bg} ${pc.text} ${pc.border}`}>
        {item.priority}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-200 mb-0.5">{item.title}</p>
        <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
      </div>
      <div className={`flex-shrink-0 flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${sc.bg} ${sc.text}`}>
        <StatusIcon className="h-3 w-3" />
        {item.status}
      </div>
    </div>
  );
}

// ── Goal progress bar ──────────────────────────────────────────────────────────
function GoalBar({ goal }: { goal: MonthlyGoal }) {
  const pct = Math.min((goal.actual / goal.target) * 100, 100);
  const met = goal.actual >= goal.target;

  return (
    <div className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
      <span className="w-36 text-sm text-gray-400 truncate">{goal.metric}</span>
      <div className="flex-1 h-2 rounded-full bg-white/8 overflow-hidden">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${
            met ? 'bg-green-500' : pct >= 75 ? 'bg-blue-500' : 'bg-amber-500'
          }`}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${goal.metric}: ${goal.actual} of ${goal.target} ${goal.unit}`}
        />
      </div>
      <div className="flex items-center gap-1.5 w-28 justify-end">
        <span className={`text-sm font-semibold ${met ? 'text-green-400' : 'text-gray-200'}`}>
          {goal.actual}
        </span>
        <span className="text-xs text-gray-600">/ {goal.target} {goal.unit}</span>
        {met && <CheckCircle2 className="h-3.5 w-3.5 text-green-400 flex-shrink-0" />}
      </div>
    </div>
  );
}

// ── Main web preview ───────────────────────────────────────────────────────────
export function GBPReportPreview({ report }: { report: GBPMonthlyReport }) {
  const { insights: ins, reviews: rev, citations: cit, keywords, actionItems, goals } = report;

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Report header */}
      <div className="border-b border-white/8 bg-gray-900/80 backdrop-blur-sm px-6 py-6 sm:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-blue-400 mb-1">
                Monthly Performance Report
              </p>
              <h1 className="text-xl font-semibold text-gray-100">{report.clientBusinessName}</h1>
              <p className="text-sm text-gray-500 mt-1">
                {report.reportMonth} · Campaign Month {report.campaignMonth} · {report.serviceArea}
              </p>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-xs text-gray-600">Prepared by</p>
              <p className="text-sm font-medium text-gray-300">{report.preparedBy}</p>
              <p className="text-xs text-gray-500">{report.preparedByEmail}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 sm:px-10">

        {/* Executive summary */}
        <div className="mb-10 rounded-xl border border-blue-500/20 bg-blue-500/5 p-6">
          <p className="text-xs font-medium uppercase tracking-wider text-blue-400 mb-3">
            Executive Summary
          </p>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">{report.executiveSummary}</p>
          <div className="border-t border-blue-500/15 pt-4">
            <p className="text-xs font-medium uppercase tracking-wider text-blue-400 mb-2">
              Highlight of the month
            </p>
            <p className="text-sm text-gray-200 font-medium">{report.highlightOfMonth}</p>
          </div>
        </div>

        {/* Visibility metrics */}
        <Section title="Profile Visibility" icon={Eye}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <MetricCard label="Total views" value={ins.totalViews.toLocaleString()} change={ins.viewsChange} icon={Eye} />
            <MetricCard label="Search views" value={ins.searchViews.toLocaleString()} change={ins.viewsChange} icon={BarChart3} />
            <MetricCard label="Maps views" value={ins.mapsViews.toLocaleString()} change={ins.viewsChange} icon={MapPin} />
            <MetricCard label="Photo views" value={ins.photoViews.toLocaleString()} change={ins.photoViewsChange} icon={Eye} />
          </div>
        </Section>

        {/* Customer actions */}
        <Section title="Customer Actions" icon={MousePointer}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <MetricCard label="Website clicks" value={ins.websiteClicks} change={ins.websiteClicksChange} icon={MousePointer} />
            <MetricCard label="Phone calls" value={ins.phoneCalls} change={ins.phoneCallsChange} icon={Phone} />
            <MetricCard label="Direction requests" value={ins.directionRequests} change={ins.directionRequestsChange} icon={Navigation} />
            <MetricCard label="Posts published" value={ins.postsPublished} change={0} icon={FileText} suffix=" this mo." />
          </div>
        </Section>

        {/* Keyword rankings */}
        <Section title="Keyword Rankings" icon={BarChart3}>
          <div className="rounded-xl border border-white/8 overflow-hidden">
            {/* Table header */}
            <div className="flex items-center gap-4 px-4 py-2.5 bg-white/5 border-b border-white/8">
              <span className="flex-1 text-xs font-medium text-gray-500 uppercase tracking-wider">Keyword</span>
              <span className="w-12 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</span>
              <span className="w-12 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Prev</span>
              <span className="w-16 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Change</span>
              <span className="w-16 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">3-Pack</span>
            </div>
            {keywords.map((kw, i) => (
              <KeywordRow key={kw.keyword} kw={kw} index={i} />
            ))}
          </div>
        </Section>

        {/* Reviews + Citations */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-10">
          {/* Reviews */}
          <Section title="Reviews" icon={Star}>
            <div className="rounded-xl border border-white/8 bg-white/2 p-5">
              <div className="flex items-end gap-3 mb-5">
                <span className="text-4xl font-semibold text-gray-100">{rev.averageRating.toFixed(1)}</span>
                <div className="mb-1">
                  <span className={`text-sm font-medium ${rev.ratingChange > 0 ? 'text-green-400' : rev.ratingChange < 0 ? 'text-red-400' : 'text-gray-500'}`}>
                    {formatChange(rev.ratingChange, ' pts')}
                  </span>
                  <p className="text-xs text-gray-600">avg. rating</p>
                </div>
              </div>
              {[
                ['Total reviews', rev.totalReviews],
                ['New this month', rev.newReviewsThisMonth],
                ['Responses sent', rev.respondedCount],
                ['Response rate', `${rev.responseRate}%`],
              ].map(([label, value]) => (
                <div key={String(label)} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                  <span className="text-xs text-gray-500">{label}</span>
                  <span className="text-sm font-medium text-gray-200">{value}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* Citations */}
          <Section title="Citations" icon={MapPin}>
            <div className="rounded-xl border border-white/8 bg-white/2 p-5">
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="rounded-lg bg-white/5 p-4 text-center">
                  <div className="text-3xl font-semibold text-gray-100 mb-1">{cit.totalCitations}</div>
                  <div className="text-xs text-gray-500">Total citations</div>
                </div>
                <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-4 text-center">
                  <div className="text-3xl font-semibold text-green-400 mb-1">+{cit.newThisMonth}</div>
                  <div className="text-xs text-gray-500">New this month</div>
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-3">Active directories</p>
              <div className="flex flex-wrap gap-2">
                {cit.topDirectories.map((dir) => (
                  <span key={dir} className="rounded-full bg-white/8 px-2.5 py-1 text-xs text-gray-400">
                    {dir}
                  </span>
                ))}
              </div>
            </div>
          </Section>
        </div>

        {/* Monthly goals */}
        <Section title="Monthly Goals" icon={Target}>
          <div className="rounded-xl border border-white/8 bg-white/2 px-5 py-2">
            {goals.map((g) => <GoalBar key={g.metric} goal={g} />)}
          </div>
        </Section>

        {/* Action items */}
        <Section title="Action Items" icon={CheckCircle2}>
          <div className="rounded-xl border border-white/8 bg-white/2 px-5 py-2">
            {actionItems.map((item) => <ActionItemRow key={item.id} item={item} />)}
          </div>
        </Section>

        {/* Next month */}
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-6">
          <div className="flex items-center gap-2 mb-3">
            <ChevronRight className="h-4 w-4 text-amber-400" />
            <p className="text-xs font-medium uppercase tracking-wider text-amber-400">
              Next Month Focus
            </p>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">{report.nextMonthFocus}</p>
        </div>
      </div>
    </div>
  );
}

'use client';

/**
 * Monthly Report Editor
 * ──────────────────────
 * Create and edit monthly GBP performance reports
 * Shows value delivered to clients
 */

import { useState, useEffect } from 'react';
import {
  Eye,
  TrendingUp,
  TrendingDown,
  Phone,
  Globe,
  MapPin,
  Star,
  Image as ImageIcon,
  FileText,
  MessageSquare,
  Target,
  CheckCircle,
  Calendar,
  ArrowRight,
  Download,
  Save,
  Loader2,
  Building2,
  BarChart3,
  Activity,
} from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

interface ReportMetrics {
  // Views
  totalViews: number;
  searchViews: number;
  mapsViews: number;
  viewsChange: number;

  // Actions
  websiteClicks: number;
  websiteClicksChange: number;
  phoneCalls: number;
  phoneCallsChange: number;
  directionRequests: number;
  directionRequestsChange: number;

  // Photos
  photoViews: number;
  photoViewsChange: number;
  photosUploaded: number;

  // Posts
  postsPublished: number;
  postViews: number;

  // Reviews
  totalReviews: number;
  newReviews: number;
  averageRating: number;
  ratingChange: number;
  reviewsResponded: number;
  responseRate: number;

  // Citations
  totalCitations: number;
  newCitations: number;

  // Keywords
  keywordsTracked: number;
  keywordsInTop10: number;
  keywordsInLocalPack: number;
}

interface KeywordRanking {
  keyword: string;
  currentRank: number | null;
  previousRank: number | null;
  inLocalPack: boolean;
}

interface ActionItem {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'completed' | 'in_progress' | 'pending';
}

interface ReportData {
  clientName: string;
  clientWebsite: string;
  reportMonth: string;
  campaignMonth: number;
  preparedBy: string;
  preparedDate: string;
  metrics: ReportMetrics;
  keywords: KeywordRanking[];
  completedActions: ActionItem[];
  nextMonthActions: ActionItem[];
  executiveSummary: string;
  highlightOfMonth: string;
  nextMonthFocus: string;
}

// ── Default Report Data ───────────────────────────────────────────────────────

const DEFAULT_REPORT: ReportData = {
  clientName: '',
  clientWebsite: '',
  reportMonth: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
  campaignMonth: 1,
  preparedBy: 'AP Designs',
  preparedDate: new Date().toISOString().split('T')[0],
  metrics: {
    totalViews: 0,
    searchViews: 0,
    mapsViews: 0,
    viewsChange: 0,
    websiteClicks: 0,
    websiteClicksChange: 0,
    phoneCalls: 0,
    phoneCallsChange: 0,
    directionRequests: 0,
    directionRequestsChange: 0,
    photoViews: 0,
    photoViewsChange: 0,
    photosUploaded: 0,
    postsPublished: 0,
    postViews: 0,
    totalReviews: 0,
    newReviews: 0,
    averageRating: 0,
    ratingChange: 0,
    reviewsResponded: 0,
    responseRate: 0,
    totalCitations: 0,
    newCitations: 0,
    keywordsTracked: 0,
    keywordsInTop10: 0,
    keywordsInLocalPack: 0,
  },
  keywords: [],
  completedActions: [],
  nextMonthActions: [],
  executiveSummary: '',
  highlightOfMonth: '',
  nextMonthFocus: '',
};

// ── Metric Card Component ─────────────────────────────────────────────────────

function MetricCard({
  label,
  value,
  change,
  icon: Icon,
  suffix = '',
  color = 'blue',
}: {
  label: string;
  value: number | string;
  change?: number;
  icon: React.ElementType;
  suffix?: string;
  color?: string;
}) {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    green: 'bg-green-500/10 text-green-400 border-green-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-sm text-gray-400">{label}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-white">
          {typeof value === 'number' ? value.toLocaleString() : value}
          {suffix}
        </span>
        {change !== undefined && change !== 0 && (
          <span
            className={`flex items-center text-sm ${
              change > 0 ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {change > 0 ? (
              <TrendingUp className="w-3 h-3 mr-1" />
            ) : (
              <TrendingDown className="w-3 h-3 mr-1" />
            )}
            {change > 0 ? '+' : ''}
            {change}%
          </span>
        )}
      </div>
    </div>
  );
}

// ── Input Field Component ─────────────────────────────────────────────────────

function InputField({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  suffix,
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  suffix?: string;
}) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1">{label}</label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

// ── Section Header Component ──────────────────────────────────────────────────

function SectionHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {description && <p className="text-sm text-gray-400">{description}</p>}
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

interface MonthlyReportEditorProps {
  clientId?: string;
  initialData?: Partial<ReportData>;
  onSave?: (data: ReportData) => Promise<void>;
}

export function MonthlyReportEditor({
  clientId,
  initialData,
  onSave,
}: MonthlyReportEditorProps) {
  const [report, setReport] = useState<ReportData>({
    ...DEFAULT_REPORT,
    ...initialData,
  });
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  // Update a metric value
  const updateMetric = (key: keyof ReportMetrics, value: number) => {
    setReport((prev) => ({
      ...prev,
      metrics: { ...prev.metrics, [key]: value },
    }));
  };

  // Handle save
  const handleSave = async () => {
    if (!onSave) return;
    setSaving(true);
    try {
      await onSave(report);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Monthly Report</h2>
          <p className="text-gray-400 mt-1">
            {report.reportMonth} • Campaign Month {report.campaignMonth}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Tab Switcher */}
          <div className="flex bg-white/5 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('edit')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'edit'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Edit
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'preview'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Eye className="w-4 h-4 inline mr-1" />
              Preview
            </button>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-500 disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Report
          </button>
        </div>
      </div>

      {activeTab === 'edit' ? (
        <div className="space-y-8">
          {/* Client Info */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <SectionHeader icon={Building2} title="Client Information" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField
                label="Client/Business Name"
                value={report.clientName}
                onChange={(v) => setReport((prev) => ({ ...prev, clientName: v }))}
                placeholder="Acme Plumbing"
              />
              <InputField
                label="Website"
                value={report.clientWebsite}
                onChange={(v) => setReport((prev) => ({ ...prev, clientWebsite: v }))}
                placeholder="https://example.com"
              />
              <InputField
                label="Campaign Month"
                value={report.campaignMonth}
                onChange={(v) => setReport((prev) => ({ ...prev, campaignMonth: parseInt(v) || 1 }))}
                type="number"
              />
            </div>
          </div>

          {/* Profile Views */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <SectionHeader
              icon={Eye}
              title="Profile Views"
              description="How many times your business was viewed on Google"
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <InputField
                label="Total Views"
                value={report.metrics.totalViews}
                onChange={(v) => updateMetric('totalViews', parseInt(v) || 0)}
                type="number"
              />
              <InputField
                label="Search Views"
                value={report.metrics.searchViews}
                onChange={(v) => updateMetric('searchViews', parseInt(v) || 0)}
                type="number"
              />
              <InputField
                label="Maps Views"
                value={report.metrics.mapsViews}
                onChange={(v) => updateMetric('mapsViews', parseInt(v) || 0)}
                type="number"
              />
              <InputField
                label="Change %"
                value={report.metrics.viewsChange}
                onChange={(v) => updateMetric('viewsChange', parseFloat(v) || 0)}
                type="number"
                suffix="%"
              />
            </div>
          </div>

          {/* Customer Actions */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <SectionHeader
              icon={Activity}
              title="Customer Actions"
              description="Actions customers took after viewing your profile"
            />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-400">Website Clicks</h4>
                <InputField
                  label="Total"
                  value={report.metrics.websiteClicks}
                  onChange={(v) => updateMetric('websiteClicks', parseInt(v) || 0)}
                  type="number"
                />
                <InputField
                  label="Change %"
                  value={report.metrics.websiteClicksChange}
                  onChange={(v) => updateMetric('websiteClicksChange', parseFloat(v) || 0)}
                  type="number"
                  suffix="%"
                />
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-400">Phone Calls</h4>
                <InputField
                  label="Total"
                  value={report.metrics.phoneCalls}
                  onChange={(v) => updateMetric('phoneCalls', parseInt(v) || 0)}
                  type="number"
                />
                <InputField
                  label="Change %"
                  value={report.metrics.phoneCallsChange}
                  onChange={(v) => updateMetric('phoneCallsChange', parseFloat(v) || 0)}
                  type="number"
                  suffix="%"
                />
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-400">Direction Requests</h4>
                <InputField
                  label="Total"
                  value={report.metrics.directionRequests}
                  onChange={(v) => updateMetric('directionRequests', parseInt(v) || 0)}
                  type="number"
                />
                <InputField
                  label="Change %"
                  value={report.metrics.directionRequestsChange}
                  onChange={(v) => updateMetric('directionRequestsChange', parseFloat(v) || 0)}
                  type="number"
                  suffix="%"
                />
              </div>
            </div>
          </div>

          {/* Content & Photos */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <SectionHeader
              icon={ImageIcon}
              title="Content & Photos"
              description="Content published this month"
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <InputField
                label="Photos Uploaded"
                value={report.metrics.photosUploaded}
                onChange={(v) => updateMetric('photosUploaded', parseInt(v) || 0)}
                type="number"
              />
              <InputField
                label="Photo Views"
                value={report.metrics.photoViews}
                onChange={(v) => updateMetric('photoViews', parseInt(v) || 0)}
                type="number"
              />
              <InputField
                label="Posts Published"
                value={report.metrics.postsPublished}
                onChange={(v) => updateMetric('postsPublished', parseInt(v) || 0)}
                type="number"
              />
              <InputField
                label="Post Views"
                value={report.metrics.postViews}
                onChange={(v) => updateMetric('postViews', parseInt(v) || 0)}
                type="number"
              />
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <SectionHeader
              icon={Star}
              title="Reviews & Reputation"
              description="Review activity and response metrics"
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <InputField
                label="Total Reviews"
                value={report.metrics.totalReviews}
                onChange={(v) => updateMetric('totalReviews', parseInt(v) || 0)}
                type="number"
              />
              <InputField
                label="New Reviews"
                value={report.metrics.newReviews}
                onChange={(v) => updateMetric('newReviews', parseInt(v) || 0)}
                type="number"
              />
              <InputField
                label="Average Rating"
                value={report.metrics.averageRating}
                onChange={(v) => updateMetric('averageRating', parseFloat(v) || 0)}
                type="number"
              />
              <InputField
                label="Response Rate %"
                value={report.metrics.responseRate}
                onChange={(v) => updateMetric('responseRate', parseInt(v) || 0)}
                type="number"
                suffix="%"
              />
            </div>
          </div>

          {/* Citations */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <SectionHeader
              icon={Globe}
              title="Citations"
              description="Business directory listings"
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <InputField
                label="Total Live Citations"
                value={report.metrics.totalCitations}
                onChange={(v) => updateMetric('totalCitations', parseInt(v) || 0)}
                type="number"
              />
              <InputField
                label="New This Month"
                value={report.metrics.newCitations}
                onChange={(v) => updateMetric('newCitations', parseInt(v) || 0)}
                type="number"
              />
            </div>
          </div>

          {/* Keywords */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <SectionHeader
              icon={Target}
              title="Keyword Rankings"
              description="Search ranking performance"
            />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <InputField
                label="Keywords Tracked"
                value={report.metrics.keywordsTracked}
                onChange={(v) => updateMetric('keywordsTracked', parseInt(v) || 0)}
                type="number"
              />
              <InputField
                label="In Top 10"
                value={report.metrics.keywordsInTop10}
                onChange={(v) => updateMetric('keywordsInTop10', parseInt(v) || 0)}
                type="number"
              />
              <InputField
                label="In Local 3-Pack"
                value={report.metrics.keywordsInLocalPack}
                onChange={(v) => updateMetric('keywordsInLocalPack', parseInt(v) || 0)}
                type="number"
              />
            </div>
          </div>

          {/* Narrative Sections */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <SectionHeader
              icon={FileText}
              title="Report Narrative"
              description="Add context and insights"
            />
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Executive Summary</label>
                <textarea
                  value={report.executiveSummary}
                  onChange={(e) => setReport((prev) => ({ ...prev, executiveSummary: e.target.value }))}
                  rows={3}
                  placeholder="Brief overview of this month's performance..."
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Highlight of the Month</label>
                <textarea
                  value={report.highlightOfMonth}
                  onChange={(e) => setReport((prev) => ({ ...prev, highlightOfMonth: e.target.value }))}
                  rows={2}
                  placeholder="Key win or achievement this month..."
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Next Month Focus</label>
                <textarea
                  value={report.nextMonthFocus}
                  onChange={(e) => setReport((prev) => ({ ...prev, nextMonthFocus: e.target.value }))}
                  rows={2}
                  placeholder="Priority areas for next month..."
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Preview Mode */
        <div className="bg-white/5 border border-white/10 rounded-xl p-8">
          {/* Report Header */}
          <div className="text-center mb-8 pb-8 border-b border-white/10">
            <h1 className="text-3xl font-bold text-white mb-2">
              Monthly Performance Report
            </h1>
            <p className="text-xl text-blue-400">{report.clientName || 'Client Name'}</p>
            <p className="text-gray-400 mt-2">
              {report.reportMonth} • Campaign Month {report.campaignMonth}
            </p>
          </div>

          {/* Executive Summary */}
          {report.executiveSummary && (
            <div className="mb-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                Executive Summary
              </h2>
              <p className="text-gray-300">{report.executiveSummary}</p>
            </div>
          )}

          {/* Key Metrics */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              Key Metrics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetricCard
                label="Profile Views"
                value={report.metrics.totalViews}
                change={report.metrics.viewsChange}
                icon={Eye}
                color="blue"
              />
              <MetricCard
                label="Website Clicks"
                value={report.metrics.websiteClicks}
                change={report.metrics.websiteClicksChange}
                icon={Globe}
                color="green"
              />
              <MetricCard
                label="Phone Calls"
                value={report.metrics.phoneCalls}
                change={report.metrics.phoneCallsChange}
                icon={Phone}
                color="purple"
              />
              <MetricCard
                label="Directions"
                value={report.metrics.directionRequests}
                change={report.metrics.directionRequestsChange}
                icon={MapPin}
                color="amber"
              />
            </div>
          </div>

          {/* Value Delivered */}
          <div className="mb-8 p-6 bg-green-500/10 border border-green-500/20 rounded-xl">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              Value Delivered This Month
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{report.metrics.postsPublished}</div>
                <div className="text-sm text-gray-400">Posts Published</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{report.metrics.photosUploaded}</div>
                <div className="text-sm text-gray-400">Photos Added</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{report.metrics.newCitations}</div>
                <div className="text-sm text-gray-400">Citations Built</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{report.metrics.responseRate}%</div>
                <div className="text-sm text-gray-400">Review Response</div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400" />
              Reviews & Reputation
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-amber-400 flex items-center justify-center gap-1">
                  {report.metrics.averageRating.toFixed(1)}
                  <Star className="w-6 h-6 fill-amber-400" />
                </div>
                <div className="text-sm text-gray-400 mt-1">Average Rating</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-white">{report.metrics.totalReviews}</div>
                <div className="text-sm text-gray-400 mt-1">Total Reviews</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-green-400">+{report.metrics.newReviews}</div>
                <div className="text-sm text-gray-400 mt-1">New This Month</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-white">{report.metrics.responseRate}%</div>
                <div className="text-sm text-gray-400 mt-1">Response Rate</div>
              </div>
            </div>
          </div>

          {/* Rankings */}
          {report.metrics.keywordsTracked > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Keyword Rankings
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-white">{report.metrics.keywordsTracked}</div>
                  <div className="text-sm text-gray-400 mt-1">Keywords Tracked</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-green-400">{report.metrics.keywordsInTop10}</div>
                  <div className="text-sm text-gray-400 mt-1">In Top 10</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-purple-400">{report.metrics.keywordsInLocalPack}</div>
                  <div className="text-sm text-gray-400 mt-1">In Local 3-Pack</div>
                </div>
              </div>
            </div>
          )}

          {/* Highlight */}
          {report.highlightOfMonth && (
            <div className="mb-8 p-6 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400" />
                Highlight of the Month
              </h2>
              <p className="text-gray-300">{report.highlightOfMonth}</p>
            </div>
          )}

          {/* Next Month */}
          {report.nextMonthFocus && (
            <div className="mb-8 p-6 bg-purple-500/10 border border-purple-500/20 rounded-xl">
              <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-purple-400" />
                Next Month Focus
              </h2>
              <p className="text-gray-300">{report.nextMonthFocus}</p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400">
            <p>Prepared by {report.preparedBy}</p>
            <p className="text-sm mt-1">{report.preparedDate}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MonthlyReportEditor;

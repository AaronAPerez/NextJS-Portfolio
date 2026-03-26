'use client';

/**
 * GBP Dashboard Component
 * ────────────────────────
 * Main dashboard for managing GBP optimization clients
 * Features: Client list, stats overview, quick actions, filtering
 */

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Building2,
  Users,
  TrendingUp,
  Star,
  MapPin,
  Phone,
  Globe,
  FileText,
  Plus,
  Search,
  Filter,
  BarChart3,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';
import type { ClientDashboardStats, ClientStatus } from '@/types/gbp-database';

// Status badge colors and labels
const STATUS_CONFIG: Record<ClientStatus, { bg: string; text: string; label: string }> = {
  lead: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', label: 'Lead' },
  onboarding: { bg: 'bg-blue-500/10', text: 'text-blue-400', label: 'Onboarding' },
  active: { bg: 'bg-green-500/10', text: 'text-green-400', label: 'Active' },
  paused: { bg: 'bg-orange-500/10', text: 'text-orange-400', label: 'Paused' },
  churned: { bg: 'bg-red-500/10', text: 'text-red-400', label: 'Churned' },
};

export default function GBPDashboard() {
  // State for clients and filtering
  const [clients, setClients] = useState<ClientDashboardStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ClientStatus | 'all'>('all');

  // Aggregate stats
  const [stats, setStats] = useState({
    totalClients: 0,
    activeClients: 0,
    totalRevenue: 0,
    pendingActions: 0,
  });

  // Fetch clients from API
  const fetchClients = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') {
        params.set('status', statusFilter);
      }

      const response = await fetch(`/api/gbp/clients?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setClients(data.data);

        // Calculate aggregate stats
        const activeCount = data.data.filter(
          (c: ClientDashboardStats) => c.status === 'active'
        ).length;
        const totalFees = data.data.reduce(
          (sum: number, c: ClientDashboardStats) =>
            c.status === 'active' ? sum + (c.monthly_fee || 0) : sum,
          0
        );
        const totalPending = data.data.reduce(
          (sum: number, c: ClientDashboardStats) => sum + (c.pending_actions || 0),
          0
        );

        setStats({
          totalClients: data.data.length,
          activeClients: activeCount,
          totalRevenue: totalFees,
          pendingActions: totalPending,
        });
      } else {
        setError(data.error || 'Failed to fetch clients');
      }
    } catch (err) {
      console.error('Error fetching clients:', err);
      setError('Failed to connect to the server');
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  // Initial fetch
  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  // Filter clients by search query
  const filteredClients = clients.filter((client) =>
    client.legal_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-black">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <MapPin className="w-7 h-7 text-blue-400" />
            GBP Optimization Dashboard
          </h1>
          <p className="text-gray-400 mt-1">
            Manage clients, track performance, and generate reports
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={fetchClients}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-colors"
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <Link
            href="/admin/gbp/intake"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Client
          </Link>
        </div>
      </div>

      {/* Stats Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<Users className="w-5 h-5" />}
          label="Total Clients"
          value={stats.totalClients}
          color="blue"
        />
        <StatCard
          icon={<CheckCircle className="w-5 h-5" />}
          label="Active Clients"
          value={stats.activeClients}
          color="green"
        />
        <StatCard
          icon={<TrendingUp className="w-5 h-5" />}
          label="Monthly Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          color="purple"
        />
        <StatCard
          icon={<AlertCircle className="w-5 h-5" />}
          label="Pending Actions"
          value={stats.pendingActions}
          color={stats.pendingActions > 0 ? 'amber' : 'green'}
        />
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as ClientStatus | 'all')}
            className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value="all">All Status</option>
            <option value="lead">Leads</option>
            <option value="onboarding">Onboarding</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="churned">Churned</option>
          </select>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <RefreshCw className="w-8 h-8 text-blue-400 animate-spin" />
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredClients.length === 0 && (
        <div className="text-center py-20">
          <Building2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No clients found</h3>
          <p className="text-gray-400 mb-6">
            {searchQuery
              ? 'No clients match your search criteria'
              : 'Get started by adding your first GBP client'}
          </p>
          <Link
            href="/admin/gbp/intake"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add First Client
          </Link>
        </div>
      )}

      {/* Client Cards */}
      {!loading && filteredClients.length > 0 && (
        <div className="space-y-4">
          {filteredClients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      )}

      {/* Quick Links */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickLinkCard
          href="/admin/gbp/intake"
          icon={<Plus className="w-6 h-6" />}
          title="New Client Intake"
          description="Onboard a new GBP client"
        />
        <QuickLinkCard
          href="/admin/gbp/reports"
          icon={<FileText className="w-6 h-6" />}
          title="Generate Report"
          description="Create monthly performance report"
        />
        <QuickLinkCard
          href="/admin/gbp/citations"
          icon={<Globe className="w-6 h-6" />}
          title="Citation Manager"
          description="Track and submit citations"
        />
        <QuickLinkCard
          href="/admin/gbp/posts"
          icon={<Calendar className="w-6 h-6" />}
          title="Post Scheduler"
          description="Plan and schedule GBP posts"
        />
      </div>
    </div>
  );
}

// ── Stat Card Component ──────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: 'blue' | 'green' | 'purple' | 'amber';
}

function StatCard({ icon, label, value, color }: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    green: 'bg-green-500/10 text-green-400 border-green-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  };

  return (
    <div className={`rounded-xl border p-4 ${colorClasses[color]}`}>
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <span className="text-sm text-gray-400">{label}</span>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

// ── Client Card Component ────────────────────────────────────────────────────

interface ClientCardProps {
  client: ClientDashboardStats;
}

function ClientCard({ client }: ClientCardProps) {
  const statusConfig = STATUS_CONFIG[client.status];

  return (
    <Link
      href={`/admin/gbp/clients/${client.id}`}
      className="block bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/8 hover:border-white/20 transition-all group"
    >
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Client Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-white truncate">
              {client.legal_name}
            </h3>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}
            >
              {statusConfig.label}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            {client.campaign_start_date && (
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Since {new Date(client.campaign_start_date).toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            )}
            {client.monthly_fee && (
              <span className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                ${client.monthly_fee}/mo
              </span>
            )}
            {client.last_report && (
              <span className="flex items-center gap-1">
                <FileText className="w-4 h-4" />
                Last report: {client.last_report}
              </span>
            )}
          </div>
        </div>

        {/* Stats Pills */}
        <div className="flex flex-wrap items-center gap-3">
          <MetricPill
            icon={<Globe className="w-4 h-4" />}
            label="Citations"
            value={client.total_citations}
          />
          <MetricPill
            icon={<BarChart3 className="w-4 h-4" />}
            label="Keywords"
            value={client.tracked_keywords}
          />
          <MetricPill
            icon={<Star className="w-4 h-4" />}
            label="Reviews"
            value={client.total_reviews}
            subValue={client.avg_rating ? `${client.avg_rating}★` : undefined}
          />
          {client.pending_actions > 0 && (
            <MetricPill
              icon={<AlertCircle className="w-4 h-4" />}
              label="Actions"
              value={client.pending_actions}
              color="amber"
            />
          )}
        </div>

        {/* Arrow */}
        <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors hidden lg:block" />
      </div>
    </Link>
  );
}

// ── Metric Pill Component ────────────────────────────────────────────────────

interface MetricPillProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  subValue?: string;
  color?: 'default' | 'amber';
}

function MetricPill({ icon, label, value, subValue, color = 'default' }: MetricPillProps) {
  const colorClasses = color === 'amber'
    ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
    : 'bg-white/5 border-white/10 text-gray-300';

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${colorClasses}`}
    >
      {icon}
      <span className="text-sm font-medium">{value}</span>
      {subValue && <span className="text-xs text-gray-500">({subValue})</span>}
    </div>
  );
}

// ── Quick Link Card Component ────────────────────────────────────────────────

interface QuickLinkCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

function QuickLinkCard({ href, icon, title, description }: QuickLinkCardProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 hover:border-white/20 transition-all group"
    >
      <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
        {icon}
      </div>
      <div>
        <h4 className="font-medium text-white group-hover:text-blue-400 transition-colors">
          {title}
        </h4>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </Link>
  );
}

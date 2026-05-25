'use client';

/**
 * GBP Leads Management Table
 * ───────────────────────────
 * Displays and manages leads from the GBP audit tool and other sources
 *
 * Architecture:
 * - TanStack Query for data fetching with caching and optimistic updates
 * - Zustand for filter state persistence
 * - Reusable UI components (StatusBadge, StatCard)
 */

import { useState, useMemo, useCallback } from 'react';
import {
  Search,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  Phone,
  Mail,
  Globe,
  MapPin,
  Calendar,
  User,
  Building2,
  Tag,
  CheckCircle,
  Clock,
  XCircle,
  MessageSquare,
  ArrowUpRight,
  TrendingUp,
  Users,
  Target,
  AlertCircle,
} from 'lucide-react';

// Import hooks and stores
import { useLeads, useUpdateLead } from '@/lib/hooks/use-gbp-queries';
import { useGBPStore, type LeadStatus, type LeadSource } from '@/lib/stores';

// Import reusable UI components
import { StatCard, StatsGrid } from '@/components/ui/StatCard';
import { LeadStatusBadge } from '@/components/ui/StatusBadge';

// ============================================================================
// Types
// ============================================================================

interface Lead {
  id: string;
  business_name: string;
  business_phone: string | null;
  business_website: string | null;
  business_city: string | null;
  business_state: string | null;
  business_category: string | null;
  contact_name: string | null;
  contact_email: string;
  contact_phone: string | null;
  source: string;
  status: LeadStatus;
  notes: string | null;
  audit_score: number | null;
  audit_grade: string | null;
  last_contacted_at: string | null;
  next_follow_up_at: string | null;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// Configuration
// ============================================================================

const STATUS_CONFIG: Record<LeadStatus, { label: string; color: string; icon: React.ElementType }> = {
  new: { label: 'New', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20', icon: AlertCircle },
  contacted: { label: 'Contacted', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', icon: MessageSquare },
  qualified: { label: 'Qualified', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20', icon: Target },
  proposal_sent: { label: 'Proposal Sent', color: 'bg-orange-500/10 text-orange-400 border-orange-500/20', icon: ArrowUpRight },
  converted: { label: 'Converted', color: 'bg-green-500/10 text-green-400 border-green-500/20', icon: CheckCircle },
  lost: { label: 'Lost', color: 'bg-gray-500/10 text-gray-400 border-gray-500/20', icon: XCircle },
};

const SOURCE_LABELS: Record<string, string> = {
  gbp_audit: 'GBP Audit Tool',
  website: 'Website Form',
  referral: 'Referral',
  cold_outreach: 'Cold Outreach',
  social: 'Social Media',
  other: 'Other',
};

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Format date string for display
 */
function formatDate(dateString: string | null): string {
  if (!dateString) return '—';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Calculate days since a date
 */
function daysSince(dateString: string): number {
  return Math.floor(
    (Date.now() - new Date(dateString).getTime()) / (1000 * 60 * 60 * 24)
  );
}

// ============================================================================
// Lead Row Component
// ============================================================================

interface LeadRowProps {
  lead: Lead;
  isExpanded: boolean;
  onToggle: () => void;
  onUpdateStatus: (status: LeadStatus) => void;
  isUpdating: boolean;
}

function LeadRow({ lead, isExpanded, onToggle, onUpdateStatus, isUpdating }: LeadRowProps) {
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const status = STATUS_CONFIG[lead.status];
  const StatusIcon = status.icon;
  const daysSinceCreated = daysSince(lead.created_at);

  // Handle status update
  const handleStatusChange = useCallback((newStatus: LeadStatus) => {
    onUpdateStatus(newStatus);
    setShowStatusMenu(false);
  }, [onUpdateStatus]);

  return (
    <>
      {/* Main row */}
      <tr
        className={`
          border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer
          ${isExpanded ? 'bg-white/5' : ''}
          ${isUpdating ? 'opacity-70' : ''}
        `}
        onClick={onToggle}
      >
        {/* Expand toggle */}
        <td className="px-4 py-3">
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-500" />
          )}
        </td>

        {/* Business info */}
        <td className="px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="font-medium text-white">{lead.business_name}</div>
              <div className="text-sm text-gray-500 flex items-center gap-2">
                {lead.business_city && lead.business_state && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {lead.business_city}, {lead.business_state}
                  </span>
                )}
                {lead.business_category && (
                  <span className="text-gray-600">• {lead.business_category}</span>
                )}
              </div>
            </div>
          </div>
        </td>

        {/* Contact */}
        <td className="px-4 py-3">
          <div className="text-sm">
            <div className="text-white">{lead.contact_name || '—'}</div>
            <div className="text-gray-500">{lead.contact_email}</div>
          </div>
        </td>

        {/* Source */}
        <td className="px-4 py-3">
          <span className="px-2 py-1 rounded text-xs bg-white/5 text-gray-300">
            {SOURCE_LABELS[lead.source] || lead.source}
          </span>
        </td>

        {/* Audit score */}
        <td className="px-4 py-3 text-center">
          {lead.audit_score ? (
            <div className="flex items-center justify-center gap-2">
              <span className="text-white font-medium">{lead.audit_score}</span>
              {lead.audit_grade && (
                <span
                  className={`px-1.5 py-0.5 rounded text-xs font-bold ${
                    lead.audit_grade === 'A'
                      ? 'bg-green-500/20 text-green-400'
                      : lead.audit_grade === 'B'
                      ? 'bg-blue-500/20 text-blue-400'
                      : lead.audit_grade === 'C'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {lead.audit_grade}
                </span>
              )}
            </div>
          ) : (
            <span className="text-gray-600">—</span>
          )}
        </td>

        {/* Status - Using StatusBadge would replace the inline dropdown, but we keep the menu for actions */}
        <td className="px-4 py-3">
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowStatusMenu(!showStatusMenu);
              }}
              disabled={isUpdating}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${status.color}`}
            >
              <StatusIcon className="w-3 h-3" />
              {status.label}
              <ChevronDown className="w-3 h-3" />
            </button>

            {showStatusMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowStatusMenu(false);
                  }}
                />
                <div className="absolute right-0 top-full mt-1 z-20 bg-gray-900 border border-white/10 rounded-lg shadow-xl py-1 min-w-[150px]">
                  {Object.entries(STATUS_CONFIG).map(([key, config]) => {
                    const Icon = config.icon;
                    return (
                      <button
                        key={key}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange(key as LeadStatus);
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-white/5 ${
                          lead.status === key ? 'bg-white/5' : ''
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {config.label}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </td>

        {/* Created date */}
        <td className="px-4 py-3">
          <div className="text-sm text-gray-400">
            {formatDate(lead.created_at)}
            {daysSinceCreated <= 1 && (
              <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] bg-green-500/20 text-green-400">
                New
              </span>
            )}
          </div>
        </td>

        {/* Quick actions */}
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            {lead.contact_email && (
              <a
                href={`mailto:${lead.contact_email}`}
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
            {lead.business_phone && (
              <a
                href={`tel:${lead.business_phone}`}
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white"
                title="Call"
              >
                <Phone className="w-4 h-4" />
              </a>
            )}
          </div>
        </td>
      </tr>

      {/* Expanded details */}
      {isExpanded && (
        <tr className="bg-white/5">
          <td colSpan={8} className="px-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Contact details */}
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-3">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <User className="w-4 h-4 text-gray-500" />
                    {lead.contact_name || 'No name provided'}
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <a href={`mailto:${lead.contact_email}`} className="text-blue-400 hover:underline">
                      {lead.contact_email}
                    </a>
                  </div>
                  {lead.contact_phone && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <a href={`tel:${lead.contact_phone}`} className="text-blue-400 hover:underline">
                        {lead.contact_phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Business details */}
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-3">Business Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Building2 className="w-4 h-4 text-gray-500" />
                    {lead.business_name}
                  </div>
                  {lead.business_website && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <Globe className="w-4 h-4 text-gray-500" />
                      <a
                        href={lead.business_website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        {lead.business_website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                  {lead.business_phone && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <Phone className="w-4 h-4 text-gray-500" />
                      {lead.business_phone}
                    </div>
                  )}
                  {lead.business_category && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <Tag className="w-4 h-4 text-gray-500" />
                      {lead.business_category}
                    </div>
                  )}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-3">Timeline</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    Created: {formatDate(lead.created_at)}
                  </div>
                  {lead.last_contacted_at && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <MessageSquare className="w-4 h-4 text-gray-500" />
                      Last Contact: {formatDate(lead.last_contacted_at)}
                    </div>
                  )}
                  {lead.next_follow_up_at && (
                    <div className="flex items-center gap-2 text-yellow-400">
                      <Clock className="w-4 h-4" />
                      Follow-up: {formatDate(lead.next_follow_up_at)}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Notes */}
            {lead.notes && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Notes</h4>
                <p className="text-sm text-gray-300 whitespace-pre-wrap">{lead.notes}</p>
              </div>
            )}

            {/* Quick actions */}
            <div className="mt-4 pt-4 border-t border-white/10 flex gap-3">
              <a
                href={`mailto:${lead.contact_email}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-500"
              >
                <Mail className="w-4 h-4" />
                Send Email
              </a>
              {lead.business_phone && (
                <a
                  href={`tel:${lead.business_phone}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white text-sm hover:bg-white/20"
                >
                  <Phone className="w-4 h-4" />
                  Call
                </a>
              )}
              <button
                onClick={() => onUpdateStatus('contacted')}
                disabled={isUpdating}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white text-sm hover:bg-white/20 disabled:opacity-50"
              >
                <CheckCircle className="w-4 h-4" />
                Mark Contacted
              </button>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export function LeadsTable() {
  // Get filter state from Zustand store
  const leadFilters = useGBPStore((state) => state.leadFilters);
  const setLeadFilter = useGBPStore((state) => state.setLeadFilter);
  const expandedLeadId = useGBPStore((state) => state.ui.expandedLeadId);
  const setExpandedLeadId = useGBPStore((state) => state.setExpandedLeadId);

  // Local search state (not persisted)
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch leads using TanStack Query
  const {
    data: leadsData,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useLeads({
    status: leadFilters.status,
    source: leadFilters.source,
  });

  // Mutation for updating lead status
  const updateLeadMutation = useUpdateLead();

  // Extract leads and stats from response
  const leads = leadsData?.leads || [];
  const stats = leadsData?.stats;

  // Filter leads by search term (client-side filtering)
  const filteredLeads = useMemo(() => {
    if (!searchTerm) return leads;

    const search = searchTerm.toLowerCase();
    return leads.filter(
      (lead) =>
        lead.business_name.toLowerCase().includes(search) ||
        lead.contact_email.toLowerCase().includes(search) ||
        lead.contact_name?.toLowerCase().includes(search)
    );
  }, [leads, searchTerm]);

  // Handle status update with optimistic updates
  const handleUpdateStatus = useCallback(
    (leadId: string, newStatus: LeadStatus) => {
      updateLeadMutation.mutate({
        id: leadId,
        data: {
          status: newStatus,
          last_contacted_at: newStatus === 'contacted' ? new Date().toISOString() : undefined,
        },
      });
    },
    [updateLeadMutation]
  );

  // Toggle expanded row
  const handleToggleExpand = useCallback(
    (leadId: string) => {
      setExpandedLeadId(expandedLeadId === leadId ? null : leadId);
    },
    [expandedLeadId, setExpandedLeadId]
  );

  return (
    <div className="space-y-6">
      {/* Stats cards using reusable StatsGrid component */}
      {stats && (
        <StatsGrid columns={4}>
          <StatCard
            title="Total Leads"
            value={stats.total}
            icon={<Users className="w-5 h-5" />}
            iconBgColor="bg-blue-500/10 text-blue-400"
          />
          <StatCard
            title="New Leads"
            value={stats.new_leads}
            icon={<AlertCircle className="w-5 h-5" />}
            trend={stats.last_7_days > 0 ? stats.last_7_days : undefined}
            description={stats.last_7_days > 0 ? `+${stats.last_7_days} this week` : undefined}
            iconBgColor="bg-green-500/10 text-green-400"
          />
          <StatCard
            title="Qualified"
            value={stats.qualified}
            icon={<Target className="w-5 h-5" />}
            iconBgColor="bg-purple-500/10 text-purple-400"
          />
          <StatCard
            title="Converted"
            value={stats.converted}
            icon={<CheckCircle className="w-5 h-5" />}
            iconBgColor="bg-green-500/10 text-green-400"
          />
        </StatsGrid>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        {/* Status filter - persisted in Zustand */}
        <select
          value={leadFilters.status}
          onChange={(e) => setLeadFilter('status', e.target.value as LeadStatus | 'all')}
          className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          <option value="all">All Statuses</option>
          {Object.entries(STATUS_CONFIG).map(([key, config]) => (
            <option key={key} value={key}>
              {config.label}
            </option>
          ))}
        </select>

        {/* Source filter - persisted in Zustand */}
        <select
          value={leadFilters.source}
          onChange={(e) => setLeadFilter('source', e.target.value as LeadSource | 'all')}
          className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          <option value="all">All Sources</option>
          {Object.entries(SOURCE_LABELS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        {/* Refresh button */}
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Leads table */}
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        {isLoading && leads.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="w-8 h-8 text-blue-400 animate-spin" />
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <XCircle className="w-12 h-12 text-red-400 mb-4" />
            <p className="text-gray-400">{error?.message || 'Failed to load leads'}</p>
            <button
              onClick={() => refetch()}
              className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500"
            >
              Try Again
            </button>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Users className="w-12 h-12 text-gray-600 mb-4" />
            <p className="text-gray-400">
              {searchTerm || leadFilters.status !== 'all' || leadFilters.source !== 'all'
                ? 'No leads match your filters'
                : 'No leads yet. Share your audit tool to capture leads!'}
            </p>
            {!searchTerm && leadFilters.status === 'all' && leadFilters.source === 'all' && (
              <a
                href="/tools/gbp-audit"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500"
              >
                View Audit Tool
              </a>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b border-white/10">
                  <th className="px-4 py-3 w-10"></th>
                  <th className="px-4 py-3">Business</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Source</th>
                  <th className="px-4 py-3 text-center">Score</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3 w-24">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <LeadRow
                    key={lead.id}
                    lead={lead as Lead}
                    isExpanded={expandedLeadId === lead.id}
                    onToggle={() => handleToggleExpand(lead.id)}
                    onUpdateStatus={(status) => handleUpdateStatus(lead.id, status)}
                    isUpdating={updateLeadMutation.isPending && updateLeadMutation.variables?.id === lead.id}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Results count */}
      {filteredLeads.length > 0 && (
        <div className="text-sm text-gray-500 text-center">
          Showing {filteredLeads.length} of {leads.length} leads
          {isFetching && !isLoading && (
            <span className="ml-2 text-blue-400">Refreshing...</span>
          )}
        </div>
      )}
    </div>
  );
}

export default LeadsTable;

'use client';

/**
 * Client Detail View Component
 * ─────────────────────────────
 * Comprehensive view of a single GBP client with tabs for different data types
 */

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Building2,
  Globe,
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  TrendingUp,
  TrendingDown,
  FileText,
  AlertCircle,
  CheckCircle,
  Calendar,
  BarChart3,
  MessageSquare,
  Edit,
  RefreshCw,
  Plus,
  ExternalLink,
} from 'lucide-react';
import type { GBPClient, Citation, Keyword, GBPPost, Review, ActionItem } from '@/types/gbp-database';

interface ClientDetailViewProps {
  clientId: string;
}

type TabId = 'overview' | 'citations' | 'keywords' | 'posts' | 'reviews' | 'actions';

export default function ClientDetailView({ clientId }: ClientDetailViewProps) {
  // State
  const [client, setClient] = useState<GBPClient | null>(null);
  const [citations, setCitations] = useState<Citation[]>([]);
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [posts, setPosts] = useState<GBPPost[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [actions, setActions] = useState<ActionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  // Fetch client data
  const fetchClientData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch all data in parallel
      const [clientRes, citationsRes, keywordsRes, postsRes, reviewsRes, actionsRes] =
        await Promise.all([
          fetch(`/api/gbp/clients/${clientId}`),
          fetch(`/api/gbp/citations?client_id=${clientId}`),
          fetch(`/api/gbp/keywords?client_id=${clientId}`),
          fetch(`/api/gbp/posts?client_id=${clientId}`),
          fetch(`/api/gbp/reviews?client_id=${clientId}`),
          fetch(`/api/gbp/actions?client_id=${clientId}`),
        ]);

      const [clientData, citationsData, keywordsData, postsData, reviewsData, actionsData] =
        await Promise.all([
          clientRes.json(),
          citationsRes.json(),
          keywordsRes.json(),
          postsRes.json(),
          reviewsRes.json(),
          actionsRes.json(),
        ]);

      if (clientData.success) {
        setClient(clientData.data);
      } else {
        setError(clientData.error || 'Failed to fetch client');
        return;
      }

      if (citationsData.success) setCitations(citationsData.data);
      if (keywordsData.success) setKeywords(keywordsData.data);
      if (postsData.success) setPosts(postsData.data);
      if (reviewsData.success) setReviews(reviewsData.data);
      if (actionsData.success) setActions(actionsData.data);
    } catch (err) {
      console.error('Error fetching client data:', err);
      setError('Failed to connect to the server');
    } finally {
      setLoading(false);
    }
  }, [clientId]);

  useEffect(() => {
    fetchClientData();
  }, [fetchClientData]);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <RefreshCw className="w-8 h-8 text-blue-400 animate-spin" />
      </div>
    );
  }

  // Error state
  if (error || !client) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">Error Loading Client</h2>
        <p className="text-gray-400 mb-6">{error || 'Client not found'}</p>
        <Link
          href="/admin/gbp"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const tabs: { id: TabId; label: string; count?: number }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'citations', label: 'Citations', count: citations.length },
    { id: 'keywords', label: 'Keywords', count: keywords.length },
    { id: 'posts', label: 'Posts', count: posts.length },
    { id: 'reviews', label: 'Reviews', count: reviews.length },
    { id: 'actions', label: 'Actions', count: actions.filter(a => a.status !== 'complete').length },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/gbp"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Building2 className="w-7 h-7 text-blue-400" />
              {client.legal_name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-400">
              {client.primary_category && (
                <span>{client.primary_category}</span>
              )}
              {client.city && client.state && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {client.city}, {client.state}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={fetchClientData}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <Link
              href={`/admin/gbp/clients/${clientId}/edit`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500"
            >
              <Edit className="w-4 h-4" />
              Edit Client
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <QuickStat
          label="Citations"
          value={citations.filter(c => c.status === 'live').length}
          total={citations.length}
          icon={<Globe className="w-5 h-5" />}
        />
        <QuickStat
          label="Keywords"
          value={keywords.filter((k: any) => k.in_local_pack).length}
          total={keywords.length}
          sublabel="in 3-Pack"
          icon={<BarChart3 className="w-5 h-5" />}
        />
        <QuickStat
          label="Posts"
          value={posts.filter(p => p.status === 'published').length}
          total={posts.length}
          icon={<Calendar className="w-5 h-5" />}
        />
        <QuickStat
          label="Reviews"
          value={reviews.length}
          sublabel={reviews.length > 0
            ? `${(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)}★`
            : undefined
          }
          icon={<Star className="w-5 h-5" />}
        />
        <QuickStat
          label="Actions"
          value={actions.filter(a => a.status === 'pending').length}
          sublabel="pending"
          icon={<AlertCircle className="w-5 h-5" />}
          highlight={actions.filter(a => a.status === 'pending').length > 0}
        />
      </div>

      {/* Tabs */}
      <div className="border-b border-white/10 mb-6">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className="ml-2 px-2 py-0.5 rounded-full bg-white/10 text-xs">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && (
          <OverviewTab client={client} />
        )}
        {activeTab === 'citations' && (
          <CitationsTab citations={citations} clientId={clientId} onRefresh={fetchClientData} />
        )}
        {activeTab === 'keywords' && (
          <KeywordsTab keywords={keywords} clientId={clientId} onRefresh={fetchClientData} />
        )}
        {activeTab === 'posts' && (
          <PostsTab posts={posts} clientId={clientId} onRefresh={fetchClientData} />
        )}
        {activeTab === 'reviews' && (
          <ReviewsTab reviews={reviews} clientId={clientId} onRefresh={fetchClientData} />
        )}
        {activeTab === 'actions' && (
          <ActionsTab actions={actions} clientId={clientId} onRefresh={fetchClientData} />
        )}
      </div>
    </div>
  );
}

// ── Quick Stat Component ─────────────────────────────────────────────────────

interface QuickStatProps {
  label: string;
  value: number;
  total?: number;
  sublabel?: string;
  icon: React.ReactNode;
  highlight?: boolean;
}

function QuickStat({ label, value, total, sublabel, icon, highlight }: QuickStatProps) {
  return (
    <div className={`rounded-xl p-4 border ${
      highlight
        ? 'bg-amber-500/10 border-amber-500/20'
        : 'bg-white/5 border-white/10'
    }`}>
      <div className="flex items-center gap-2 mb-2 text-gray-400">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-white">{value}</span>
        {total !== undefined && total !== value && (
          <span className="text-sm text-gray-500">/ {total}</span>
        )}
        {sublabel && (
          <span className="text-sm text-gray-500">{sublabel}</span>
        )}
      </div>
    </div>
  );
}

// ── Overview Tab ─────────────────────────────────────────────────────────────

function OverviewTab({ client }: { client: GBPClient }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Business Info */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-blue-400" />
          Business Information
        </h3>
        <dl className="space-y-3">
          <InfoRow label="Legal Name" value={client.legal_name} />
          <InfoRow label="Primary Category" value={client.primary_category} />
          <InfoRow label="Address" value={`${client.address}, ${client.city}, ${client.state} ${client.zip}`} />
          <InfoRow label="Phone" value={client.primary_phone} />
          <InfoRow label="Website" value={client.website_url} isLink />
          <InfoRow label="Service Areas" value={client.service_areas} />
        </dl>
      </div>

      {/* Contact Info */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Mail className="w-5 h-5 text-blue-400" />
          Point of Contact
        </h3>
        <dl className="space-y-3">
          <InfoRow label="Name" value={client.point_of_contact} />
          <InfoRow label="Email" value={client.point_of_contact_email} />
          <InfoRow label="Phone" value={client.point_of_contact_phone} />
          <InfoRow label="Reporting" value={client.reporting_cadence} />
        </dl>
      </div>

      {/* Description */}
      {client.business_description && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            Business Description
          </h3>
          <p className="text-gray-300 whitespace-pre-wrap">{client.business_description}</p>
        </div>
      )}

      {/* Keywords */}
      {client.target_keywords && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            Target Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {client.target_keywords.split(',').map((kw, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm"
              >
                {kw.trim()}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value, isLink }: { label: string; value: string | null; isLink?: boolean }) {
  if (!value) return null;

  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1">
      <dt className="text-sm text-gray-500 sm:w-32 flex-shrink-0">{label}</dt>
      <dd className="text-gray-300">
        {isLink ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline flex items-center gap-1"
          >
            {value}
            <ExternalLink className="w-3 h-3" />
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}

// ── Citations Tab ────────────────────────────────────────────────────────────

function CitationsTab({ citations, clientId, onRefresh }: { citations: Citation[]; clientId: string; onRefresh: () => void }) {
  const liveCitations = citations.filter(c => c.status === 'live');
  const pendingCitations = citations.filter(c => c.status !== 'live');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          Citations ({liveCitations.length} live / {citations.length} total)
        </h3>
        <Link
          href={`/admin/gbp/clients/${clientId}/citations/add`}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500"
        >
          <Plus className="w-4 h-4" />
          Add Citation
        </Link>
      </div>

      {citations.length === 0 ? (
        <div className="text-center py-12">
          <Globe className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No citations tracked yet</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {citations.map((citation) => (
            <div
              key={citation.id}
              className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${
                  citation.status === 'live' ? 'bg-green-400' : 'bg-yellow-400'
                }`} />
                <div>
                  <p className="font-medium text-white">{citation.directory_name}</p>
                  {citation.listing_url && (
                    <a
                      href={citation.listing_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-400 hover:underline"
                    >
                      View listing
                    </a>
                  )}
                </div>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs ${
                citation.status === 'live'
                  ? 'bg-green-500/10 text-green-400'
                  : 'bg-yellow-500/10 text-yellow-400'
              }`}>
                {citation.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Keywords Tab ─────────────────────────────────────────────────────────────

function KeywordsTab({ keywords, clientId, onRefresh }: { keywords: Keyword[]; clientId: string; onRefresh: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          Tracked Keywords ({keywords.length})
        </h3>
        <Link
          href={`/admin/gbp/clients/${clientId}/keywords/add`}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500"
        >
          <Plus className="w-4 h-4" />
          Add Keyword
        </Link>
      </div>

      {keywords.length === 0 ? (
        <div className="text-center py-12">
          <BarChart3 className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No keywords tracked yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b border-white/10">
                <th className="pb-3 font-medium">Keyword</th>
                <th className="pb-3 font-medium text-center">Current Rank</th>
                <th className="pb-3 font-medium text-center">Previous</th>
                <th className="pb-3 font-medium text-center">3-Pack</th>
              </tr>
            </thead>
            <tbody>
              {keywords.map((kw: any) => {
                const rankChange = kw.previous_rank && kw.current_rank
                  ? kw.previous_rank - kw.current_rank
                  : 0;

                return (
                  <tr key={kw.id} className="border-b border-white/5">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        {kw.is_primary && (
                          <Star className="w-4 h-4 text-yellow-400" />
                        )}
                        <span className="text-white">{kw.keyword}</span>
                      </div>
                    </td>
                    <td className="py-3 text-center">
                      <span className="text-lg font-semibold text-white">
                        {kw.current_rank || '—'}
                      </span>
                    </td>
                    <td className="py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-gray-400">{kw.previous_rank || '—'}</span>
                        {rankChange !== 0 && (
                          <span className={rankChange > 0 ? 'text-green-400' : 'text-red-400'}>
                            {rankChange > 0 ? (
                              <TrendingUp className="w-4 h-4" />
                            ) : (
                              <TrendingDown className="w-4 h-4" />
                            )}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 text-center">
                      {kw.in_local_pack ? (
                        <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                      ) : (
                        <span className="text-gray-500">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ── Posts Tab ────────────────────────────────────────────────────────────────

function PostsTab({ posts, clientId, onRefresh }: { posts: GBPPost[]; clientId: string; onRefresh: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          Posts ({posts.length})
        </h3>
        <Link
          href={`/admin/gbp/clients/${clientId}/posts/new`}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500"
        >
          <Plus className="w-4 h-4" />
          Create Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No posts created yet</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-4 bg-white/5 border border-white/10 rounded-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {post.title && (
                    <h4 className="font-medium text-white mb-1">{post.title}</h4>
                  )}
                  <p className="text-gray-400 text-sm line-clamp-2">{post.content}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span className="capitalize">{post.post_type}</span>
                    {post.scheduled_date && (
                      <span>Scheduled: {new Date(post.scheduled_date).toLocaleDateString()}</span>
                    )}
                    {post.published_date && (
                      <span>Published: {new Date(post.published_date).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs ${
                  post.status === 'published' ? 'bg-green-500/10 text-green-400' :
                  post.status === 'scheduled' ? 'bg-blue-500/10 text-blue-400' :
                  'bg-gray-500/10 text-gray-400'
                }`}>
                  {post.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Reviews Tab ──────────────────────────────────────────────────────────────

function ReviewsTab({ reviews, clientId, onRefresh }: { reviews: Review[]; clientId: string; onRefresh: () => void }) {
  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Reviews ({reviews.length})
          </h3>
          {reviews.length > 0 && (
            <p className="text-sm text-gray-400">
              Average rating: <span className="text-yellow-400">{avgRating}★</span>
            </p>
          )}
        </div>
        <Link
          href={`/admin/gbp/clients/${clientId}/reviews/add`}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500"
        >
          <Plus className="w-4 h-4" />
          Add Review
        </Link>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-12">
          <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No reviews tracked yet</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-4 bg-white/5 border border-white/10 rounded-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">
                      {review.reviewer_name || 'Anonymous'}
                    </span>
                  </div>
                  {review.review_text && (
                    <p className="text-gray-300 text-sm mb-2">{review.review_text}</p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    {review.review_date && (
                      <span>{new Date(review.review_date).toLocaleDateString()}</span>
                    )}
                    <span className="capitalize">{review.platform}</span>
                  </div>
                </div>
                {review.responded ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-xs bg-yellow-500/10 text-yellow-400">
                    Needs response
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Actions Tab ──────────────────────────────────────────────────────────────

function ActionsTab({ actions, clientId, onRefresh }: { actions: ActionItem[]; clientId: string; onRefresh: () => void }) {
  const pendingActions = actions.filter(a => a.status !== 'complete');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          Action Items ({pendingActions.length} pending)
        </h3>
        <Link
          href={`/admin/gbp/clients/${clientId}/actions/new`}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500"
        >
          <Plus className="w-4 h-4" />
          Add Action
        </Link>
      </div>

      {actions.length === 0 ? (
        <div className="text-center py-12">
          <CheckCircle className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No action items</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {actions.map((action) => (
            <div
              key={action.id}
              className={`p-4 border rounded-lg ${
                action.status === 'complete'
                  ? 'bg-white/3 border-white/5 opacity-60'
                  : 'bg-white/5 border-white/10'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  action.priority === 'high' ? 'bg-red-400' :
                  action.priority === 'medium' ? 'bg-yellow-400' :
                  'bg-blue-400'
                }`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-medium ${
                      action.status === 'complete' ? 'text-gray-500 line-through' : 'text-white'
                    }`}>
                      {action.title}
                    </h4>
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      action.status === 'complete' ? 'bg-green-500/10 text-green-400' :
                      action.status === 'in_progress' ? 'bg-blue-500/10 text-blue-400' :
                      'bg-gray-500/10 text-gray-400'
                    }`}>
                      {action.status.replace('_', ' ')}
                    </span>
                  </div>
                  {action.description && (
                    <p className="text-sm text-gray-400 mb-2">{action.description}</p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="capitalize">{action.category}</span>
                    {action.due_date && (
                      <span>Due: {new Date(action.due_date).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

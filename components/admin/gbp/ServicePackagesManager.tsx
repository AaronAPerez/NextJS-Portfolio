'use client';

/**
 * Service Packages Manager
 * ─────────────────────────
 * Configure and display GBP optimization service packages
 */

import { useState, useEffect } from 'react';
import {
  Check,
  X,
  Edit2,
  Save,
  Plus,
  Trash2,
  Star,
  Sparkles,
  Zap,
  Crown,
  Package,
  DollarSign,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';

// ── Package Types ─────────────────────────────────────────────────────────────

interface PackageFeature {
  id: string;
  name: string;
  included: boolean;
  details?: string;
}

interface ServicePackage {
  id: string;
  name: string;
  slug: string;
  description: string;
  monthly_price: number;
  setup_fee: number;
  is_popular: boolean;
  is_active: boolean;
  features: PackageFeature[];
  icon: 'starter' | 'growth' | 'pro' | 'enterprise';
  color: string;
}

// ── Default Packages Configuration ────────────────────────────────────────────

const DEFAULT_FEATURES = [
  { id: 'profile-optimization', name: 'Full GBP Profile Optimization', category: 'core' },
  { id: 'posts-2', name: '2 GBP Posts/Month', category: 'content' },
  { id: 'posts-4', name: '4 GBP Posts/Month', category: 'content' },
  { id: 'posts-8', name: '8 GBP Posts/Month', category: 'content' },
  { id: 'review-monitoring', name: 'Review Monitoring', category: 'reviews' },
  { id: 'review-response', name: 'Review Response Templates', category: 'reviews' },
  { id: 'review-generation', name: 'Review Generation System', category: 'reviews' },
  { id: 'citations-20', name: '20 Citation Submissions', category: 'citations' },
  { id: 'citations-40', name: '40 Citation Submissions', category: 'citations' },
  { id: 'nap-audit', name: 'NAP Consistency Audit', category: 'citations' },
  { id: 'keywords-10', name: 'Keyword Tracking (10 keywords)', category: 'tracking' },
  { id: 'keywords-25', name: 'Keyword Tracking (25 keywords)', category: 'tracking' },
  { id: 'monthly-report', name: 'Monthly Performance Report', category: 'reporting' },
  { id: 'monthly-call', name: 'Monthly Strategy Call', category: 'support' },
  { id: 'biweekly-call', name: 'Bi-Weekly Strategy Calls', category: 'support' },
  { id: 'email-support', name: 'Email Support', category: 'support' },
  { id: 'priority-support', name: 'Priority Support', category: 'support' },
  { id: 'competitor-monitoring', name: 'Competitor Monitoring', category: 'tracking' },
  { id: 'photo-optimization', name: 'Photo Optimization & Geotagging', category: 'content' },
  { id: 'qa-management', name: 'Q&A Section Management', category: 'content' },
];

const DEFAULT_PACKAGES: ServicePackage[] = [
  {
    id: 'starter',
    name: 'Starter',
    slug: 'starter',
    description: 'Perfect for new businesses or those in low-competition markets',
    monthly_price: 199,
    setup_fee: 0,
    is_popular: false,
    is_active: true,
    icon: 'starter',
    color: 'blue',
    features: [
      { id: 'profile-optimization', name: 'Full GBP Profile Optimization', included: true },
      { id: 'posts-2', name: '2 GBP Posts/Month', included: true },
      { id: 'review-monitoring', name: 'Review Monitoring', included: true },
      { id: 'review-response', name: 'Review Response Templates', included: true },
      { id: 'monthly-report', name: 'Monthly Performance Report', included: true },
      { id: 'email-support', name: 'Email Support', included: true },
      { id: 'citations-20', name: '20 Citation Submissions', included: false },
      { id: 'keywords-10', name: 'Keyword Tracking (10 keywords)', included: false },
      { id: 'monthly-call', name: 'Monthly Strategy Call', included: false },
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    slug: 'growth',
    description: 'For established businesses ready to dominate local search',
    monthly_price: 299,
    setup_fee: 0,
    is_popular: true,
    is_active: true,
    icon: 'growth',
    color: 'green',
    features: [
      { id: 'profile-optimization', name: 'Full GBP Profile Optimization', included: true },
      { id: 'posts-4', name: '4 GBP Posts/Month', included: true },
      { id: 'review-monitoring', name: 'Review Monitoring', included: true },
      { id: 'review-response', name: 'Review Response Templates', included: true },
      { id: 'citations-20', name: '20 Citation Submissions', included: true, details: 'One-time' },
      { id: 'nap-audit', name: 'NAP Consistency Audit', included: true },
      { id: 'keywords-10', name: 'Keyword Tracking (10 keywords)', included: true },
      { id: 'monthly-report', name: 'Monthly Performance Report', included: true },
      { id: 'monthly-call', name: 'Monthly Strategy Call', included: true },
      { id: 'email-support', name: 'Email Support', included: true },
      { id: 'photo-optimization', name: 'Photo Optimization & Geotagging', included: true },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    slug: 'pro',
    description: 'Maximum visibility for competitive markets',
    monthly_price: 449,
    setup_fee: 0,
    is_popular: false,
    is_active: true,
    icon: 'pro',
    color: 'purple',
    features: [
      { id: 'profile-optimization', name: 'Full GBP Profile Optimization', included: true },
      { id: 'posts-8', name: '8 GBP Posts/Month', included: true },
      { id: 'review-monitoring', name: 'Review Monitoring', included: true },
      { id: 'review-response', name: 'Review Response Templates', included: true },
      { id: 'review-generation', name: 'Review Generation System', included: true },
      { id: 'citations-40', name: '40 Citation Submissions', included: true },
      { id: 'nap-audit', name: 'NAP Consistency Audit', included: true },
      { id: 'keywords-25', name: 'Keyword Tracking (25 keywords)', included: true },
      { id: 'competitor-monitoring', name: 'Competitor Monitoring', included: true },
      { id: 'monthly-report', name: 'Monthly Performance Report', included: true },
      { id: 'biweekly-call', name: 'Bi-Weekly Strategy Calls', included: true },
      { id: 'priority-support', name: 'Priority Support', included: true },
      { id: 'photo-optimization', name: 'Photo Optimization & Geotagging', included: true },
      { id: 'qa-management', name: 'Q&A Section Management', included: true },
    ],
  },
];

// ── Icon Components ───────────────────────────────────────────────────────────

const PACKAGE_ICONS: Record<string, React.ElementType> = {
  starter: Package,
  growth: Zap,
  pro: Crown,
  enterprise: Sparkles,
};

const PACKAGE_COLORS: Record<string, { bg: string; border: string; text: string; gradient: string }> = {
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    gradient: 'from-blue-600 to-blue-400',
  },
  green: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    text: 'text-green-400',
    gradient: 'from-green-600 to-emerald-400',
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    gradient: 'from-purple-600 to-violet-400',
  },
  gold: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    gradient: 'from-amber-600 to-yellow-400',
  },
};

// ── Package Card Component ────────────────────────────────────────────────────

function PackageCard({
  pkg,
  onEdit,
  isEditing,
  onSave,
  onCancel,
}: {
  pkg: ServicePackage;
  onEdit: () => void;
  isEditing: boolean;
  onSave: (updated: ServicePackage) => void;
  onCancel: () => void;
}) {
  const [editData, setEditData] = useState(pkg);
  const Icon = PACKAGE_ICONS[pkg.icon] || Package;
  const colors = PACKAGE_COLORS[pkg.color] || PACKAGE_COLORS.blue;

  useEffect(() => {
    setEditData(pkg);
  }, [pkg]);

  const handleFeatureToggle = (featureId: string) => {
    setEditData((prev) => ({
      ...prev,
      features: prev.features.map((f) =>
        f.id === featureId ? { ...f, included: !f.included } : f
      ),
    }));
  };

  if (isEditing) {
    return (
      <div className="bg-white/5 border border-white/20 rounded-2xl p-6">
        <div className="space-y-4">
          {/* Name & Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Package Name</label>
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Monthly Price ($)</label>
              <input
                type="number"
                value={editData.monthly_price}
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, monthly_price: parseInt(e.target.value) || 0 }))
                }
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Description</label>
            <input
              type="text"
              value={editData.description}
              onChange={(e) => setEditData((prev) => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
            />
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Features</label>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {editData.features.map((feature) => (
                <label
                  key={feature.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={feature.included}
                    onChange={() => handleFeatureToggle(feature.id)}
                    className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-300">{feature.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={editData.is_popular}
                onChange={(e) => setEditData((prev) => ({ ...prev, is_popular: e.target.checked }))}
                className="rounded border-white/20 bg-white/5 text-green-500 focus:ring-green-500"
              />
              <span className="text-sm text-gray-300">Mark as Popular</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={editData.is_active}
                onChange={(e) => setEditData((prev) => ({ ...prev, is_active: e.target.checked }))}
                className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-300">Active</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-white/10">
            <button
              onClick={() => onSave(editData)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-500"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
            <button
              onClick={onCancel}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-gray-300 hover:bg-white/20"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative bg-white/5 border rounded-2xl overflow-hidden transition-all hover:border-white/20 ${
        pkg.is_popular ? `border-2 ${colors.border}` : 'border-white/10'
      } ${!pkg.is_active ? 'opacity-50' : ''}`}
    >
      {/* Popular Badge */}
      {pkg.is_popular && (
        <div className={`absolute top-0 right-0 px-3 py-1 text-xs font-bold bg-gradient-to-r ${colors.gradient} text-white rounded-bl-lg`}>
          <Star className="w-3 h-3 inline mr-1" />
          Most Popular
        </div>
      )}

      {/* Header */}
      <div className={`p-6 ${colors.bg}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-2 rounded-lg ${colors.bg} ${colors.text}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
            {!pkg.is_active && (
              <span className="text-xs text-gray-500">(Inactive)</span>
            )}
          </div>
        </div>
        <p className="text-gray-400 text-sm">{pkg.description}</p>
      </div>

      {/* Pricing */}
      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-white">${pkg.monthly_price}</span>
          <span className="text-gray-400">/month</span>
        </div>
        {pkg.setup_fee > 0 && (
          <p className="text-sm text-gray-500 mt-1">+ ${pkg.setup_fee} setup fee</p>
        )}
      </div>

      {/* Features */}
      <div className="p-6">
        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
          What&apos;s Included
        </h4>
        <ul className="space-y-3">
          {pkg.features.map((feature) => (
            <li
              key={feature.id}
              className={`flex items-start gap-3 ${
                feature.included ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {feature.included ? (
                <Check className={`w-5 h-5 ${colors.text} flex-shrink-0 mt-0.5`} />
              ) : (
                <X className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
              )}
              <span className="text-sm">
                {feature.name}
                {feature.details && (
                  <span className="text-gray-500 ml-1">({feature.details})</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Edit Button */}
      <div className="px-6 pb-6">
        <button
          onClick={onEdit}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
        >
          <Edit2 className="w-4 h-4" />
          Edit Package
        </button>
      </div>
    </div>
  );
}

// ── Add-Ons Section ───────────────────────────────────────────────────────────

const DEFAULT_ADDONS = [
  {
    id: 'additional-location',
    name: 'Additional Location',
    price: 150,
    unit: '/mo',
    description: 'Manage multiple GBP locations',
  },
  {
    id: 'review-generation',
    name: 'Review Generation System',
    price: 99,
    unit: '/mo',
    description: 'Automated review request campaigns',
  },
  {
    id: 'photo-shoot',
    name: 'Photo Shoot Coordination',
    price: 200,
    unit: 'one-time',
    description: 'Arrange local photographer for business photos',
  },
  {
    id: 'citation-cleanup',
    name: 'Citation Cleanup',
    price: 300,
    unit: 'one-time',
    description: 'Fix inconsistent NAP across all directories',
  },
  {
    id: 'competitor-monitoring',
    name: 'Competitor Monitoring',
    price: 50,
    unit: '/mo',
    description: 'Track competitor rankings and activity',
  },
];

// ── Main Component ────────────────────────────────────────────────────────────

export function ServicePackagesManager() {
  const [packages, setPackages] = useState<ServicePackage[]>(DEFAULT_PACKAGES);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch packages from database
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch('/api/gbp/packages?all=true');
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          // Merge database packages with default features structure
          // For now, use defaults if DB is empty
          setPackages(DEFAULT_PACKAGES);
        }
      } catch (err) {
        console.error('Error fetching packages:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handleSave = (updated: ServicePackage) => {
    setPackages((prev) =>
      prev.map((pkg) => (pkg.id === updated.id ? updated : pkg))
    );
    setEditingId(null);
    // TODO: Save to database
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <RefreshCw className="w-8 h-8 text-blue-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Service Packages</h2>
          <p className="text-gray-400 mt-1">Configure your GBP optimization service tiers</p>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <PackageCard
            key={pkg.id}
            pkg={pkg}
            isEditing={editingId === pkg.id}
            onEdit={() => setEditingId(pkg.id)}
            onSave={handleSave}
            onCancel={() => setEditingId(null)}
          />
        ))}
      </div>

      {/* Add-Ons Section */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-white mb-6">Add-On Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DEFAULT_ADDONS.map((addon) => (
            <div
              key={addon.id}
              className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-white">{addon.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{addon.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-white">${addon.price}</div>
                  <div className="text-xs text-gray-500">{addon.unit}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Tips */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
        <div className="flex gap-4">
          <AlertCircle className="w-6 h-6 text-blue-400 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-white mb-2">Pricing Tips</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Always present 3 options to leverage anchoring psychology</li>
              <li>• Make the middle option &quot;Most Popular&quot; to guide decisions</li>
              <li>• Consider annual pricing with 2 months free to improve retention</li>
              <li>• Setup fees create commitment but may reduce conversions</li>
              <li>• Price based on value delivered, not time spent</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicePackagesManager;

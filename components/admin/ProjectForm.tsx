/**
 * ProjectForm Component
 *
 * Multi-tab form for creating and editing projects.
 * Tabs: Basic Info, Media, Links & Tech, Business Impact, Technical, SEO
 * Includes a live preview panel showing how the card will appear on the frontend.
 */

'use client';

import { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { GradientPicker } from '@/components/admin/ColorPicker';
import TechStackInput from '@/components/admin/TechStackInput';
import { skills } from '@/data/skills';
import type {
  ProjectDB,
  ProjectFormData,
  ProjectStatus,
  ProjectCategory,
  ClientType,
  ProjectImage,
  MetricItem,
} from '@/types/project';
import { slugify } from '@/lib/utils';

// Static lookup for tech icons - computed once outside component
const techIcons = Object.fromEntries(
  skills.map(skill => [skill.name, { icon: skill.icon, color: skill.color }])
);

// Form tabs
const TABS = [
  { id: 'basic', label: 'Basic Info' },
  { id: 'media', label: 'Media' },
  { id: 'links', label: 'Links & Tech' },
  { id: 'business', label: 'Business Impact' },
  { id: 'technical', label: 'Technical' },
  { id: 'seo', label: 'SEO' },
] as const;

type TabId = (typeof TABS)[number]['id'];

interface ProjectFormProps {
  project?: ProjectDB;
  isEditing?: boolean;
}

/**
 * ProjectForm - Comprehensive form for project management
 */
export default function ProjectForm({ project, isEditing = false }: ProjectFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);

  // Initialize form data from project or defaults
  const [formData, setFormData] = useState<ProjectFormData>({
    title: project?.title || '',
    description: project?.description || '',
    slug: project?.slug || '',
    category: project?.category || 'portfolio',
    clientType: project?.clientType || undefined,
    status: project?.status || 'draft',
    featured: project?.featured || false,
    isLive: project?.isLive || false,
    displayOrder: project?.displayOrder || 0,
    tech: project?.tech || [],
    images: project?.images || [],
    gradient: project?.gradient || { from: '#3B82F6', to: '#8B5CF6' },
    demoLink: project?.demoLink || '',
    codeLink: project?.codeLink || '',
    websiteLink: project?.websiteLink || '',
    businessImpact: project?.businessImpact || undefined,
    technicalHighlights: project?.technicalHighlights || undefined,
    timeline: project?.timeline || '',
    teamSize: project?.teamSize || '',
    role: project?.role || '',
    seo: project?.seo || undefined,
  });

  /**
   * Update a single form field
   */
  const updateField = useCallback(
    <K extends keyof ProjectFormData>(field: K, value: ProjectFormData[K]) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      // Auto-generate slug from title if slug is empty
      if (field === 'title' && !formData.slug) {
        setFormData((prev) => ({
          ...prev,
          slug: slugify(value as string),
        }));
      }
    },
    [formData.slug]
  );

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate required fields
    if (!formData.title.trim()) {
      setError('Title is required');
      setActiveTab('basic');
      return;
    }

    if (!formData.description.trim()) {
      setError('Description is required');
      setActiveTab('basic');
      return;
    }

    try {
      setIsSubmitting(true);

      const url = isEditing ? `/api/projects/${project?.id}` : '/api/projects';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save project');
      }

      // Redirect to projects list on success
      router.push('/admin/projects');
      router.refresh();
    } catch (err) {
      console.error('Error saving project:', err);
      setError(err instanceof Error ? err.message : 'Failed to save project');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Add a new image entry
   */
  const addImage = () => {
    const newImage: ProjectImage = {
      id: `img-${Date.now()}`,
      url: '',
      alt: '',
      isPrimary: formData.images.length === 0,
    };
    updateField('images', [...formData.images, newImage]);
  };

  /**
   * Update an image entry
   */
  const updateImage = (index: number, updates: Partial<ProjectImage>) => {
    const newImages = [...formData.images];
    newImages[index] = { ...newImages[index], ...updates };

    // If setting as primary, unset others
    if (updates.isPrimary) {
      newImages.forEach((img, i) => {
        if (i !== index) img.isPrimary = false;
      });
    }

    updateField('images', newImages);
  };

  /**
   * Remove an image entry
   */
  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    // If removed image was primary, set first as primary
    if (formData.images[index].isPrimary && newImages.length > 0) {
      newImages[0].isPrimary = true;
    }
    updateField('images', newImages);
  };

  /**
   * Add a new metric to business impact
   */
  const addMetric = () => {
    const newMetric: MetricItem = {
      label: '',
      value: '',
      improvement: '',
      icon: 'TrendingUp',
      color: 'text-green-600',
    };

    const currentImpact = formData.businessImpact || {
      primaryMetric: { label: '', value: '', improvement: '', timeframe: '' },
      keyMetrics: [],
      roiStatement: '',
    };

    updateField('businessImpact', {
      ...currentImpact,
      keyMetrics: [...currentImpact.keyMetrics, newMetric],
    });
  };

  /**
   * Render tab content
   */
  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return (
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => updateField('title', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Enter project title"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-y"
                placeholder="Describe your project"
                required
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL Slug
              </label>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">/projects/</span>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => updateField('slug', e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="project-slug"
                />
              </div>
            </div>

            {/* Category & Client Type */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => updateField('category', e.target.value as ProjectCategory)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="production">Production</option>
                  <option value="portfolio">Portfolio</option>
                  <option value="coursework">Coursework</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client Type
                </label>
                <select
                  value={formData.clientType || ''}
                  onChange={(e) =>
                    updateField('clientType', (e.target.value || undefined) as ClientType | undefined)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="">None</option>
                  <option value="business">Business</option>
                  <option value="personal">Personal</option>
                  <option value="demo">Demo</option>
                </select>
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => updateField('status', e.target.value as ProjectStatus)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="draft">Draft</option>
                <option value="in_development">In Development</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {/* Checkboxes */}
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => updateField('featured', e.target.checked)}
                  className="w-4 h-4 text-cyan-600 rounded focus:ring-cyan-500"
                />
                <span className="text-sm font-medium text-gray-700">Featured Project</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isLive}
                  onChange={(e) => updateField('isLive', e.target.checked)}
                  className="w-4 h-4 text-cyan-600 rounded focus:ring-cyan-500"
                />
                <span className="text-sm font-medium text-gray-700">Website is Live</span>
              </label>
            </div>
          </div>
        );

      case 'media':
        return (
          <div className="space-y-6">
            {/* Gradient Colors */}
            <Card className="p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Brand Colors</h3>
              <GradientPicker
                fromColor={formData.gradient?.from || '#3B82F6'}
                toColor={formData.gradient?.to || '#8B5CF6'}
                onFromChange={(color) =>
                  updateField('gradient', { ...formData.gradient!, from: color })
                }
                onToChange={(color) =>
                  updateField('gradient', { ...formData.gradient!, to: color })
                }
              />
            </Card>

            {/* Images */}
            <Card className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Project Images</h3>
                <Button type="button" variant="outline" size="sm" onClick={addImage}>
                  + Add Image
                </Button>
              </div>

              {formData.images.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No images added yet. Click &quot;Add Image&quot; to add project screenshots.
                </p>
              ) : (
                <div className="space-y-4">
                  {formData.images.map((image, index) => (
                    <div
                      key={image.id}
                      className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      {/* Image preview */}
                      <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        {image.url ? (
                          <img
                            src={image.url}
                            alt={image.alt || 'Preview'}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No image
                          </div>
                        )}
                      </div>

                      {/* Image fields */}
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          value={image.url}
                          onChange={(e) => updateImage(index, { url: e.target.value })}
                          placeholder="Image URL (e.g., /images/projects/...)"
                          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                        <input
                          type="text"
                          value={image.alt}
                          onChange={(e) => updateImage(index, { alt: e.target.value })}
                          placeholder="Alt text for accessibility"
                          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={image.isPrimary}
                              onChange={(e) => updateImage(index, { isPrimary: e.target.checked })}
                              className="w-4 h-4 text-cyan-600 rounded"
                            />
                            <span className="text-sm text-gray-600">Primary image</span>
                          </label>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="text-sm text-red-600 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        );

      case 'links':
        return (
          <div className="space-y-6">
            {/* Links */}
            <Card className="p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Project Links</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website URL
                  </label>
                  <input
                    type="url"
                    value={formData.websiteLink || ''}
                    onChange={(e) => updateField('websiteLink', e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Demo URL
                  </label>
                  <input
                    type="url"
                    value={formData.demoLink || ''}
                    onChange={(e) => updateField('demoLink', e.target.value)}
                    placeholder="https://demo.example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GitHub Repository
                  </label>
                  <input
                    type="url"
                    value={formData.codeLink || ''}
                    onChange={(e) => updateField('codeLink', e.target.value)}
                    placeholder="https://github.com/username/repo"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>
            </Card>

            {/* Tech Stack */}
            <Card className="p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Technology Stack</h3>
              <TechStackInput
                value={formData.tech}
                onChange={(tech) => updateField('tech', tech)}
              />
            </Card>
          </div>
        );

      case 'business':
        return (
          <div className="space-y-6">
            <Card className="p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Primary Metric</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                  <input
                    type="text"
                    value={formData.businessImpact?.primaryMetric?.label || ''}
                    onChange={(e) =>
                      updateField('businessImpact', {
                        ...formData.businessImpact!,
                        primaryMetric: {
                          ...formData.businessImpact?.primaryMetric!,
                          label: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g., Lead Generation"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                  <input
                    type="text"
                    value={formData.businessImpact?.primaryMetric?.value || ''}
                    onChange={(e) =>
                      updateField('businessImpact', {
                        ...formData.businessImpact!,
                        primaryMetric: {
                          ...formData.businessImpact?.primaryMetric!,
                          value: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g., +40%"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Improvement</label>
                  <input
                    type="text"
                    value={formData.businessImpact?.primaryMetric?.improvement || ''}
                    onChange={(e) =>
                      updateField('businessImpact', {
                        ...formData.businessImpact!,
                        primaryMetric: {
                          ...formData.businessImpact?.primaryMetric!,
                          improvement: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g., First online presence"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Timeframe</label>
                  <input
                    type="text"
                    value={formData.businessImpact?.primaryMetric?.timeframe || ''}
                    onChange={(e) =>
                      updateField('businessImpact', {
                        ...formData.businessImpact!,
                        primaryMetric: {
                          ...formData.businessImpact?.primaryMetric!,
                          timeframe: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g., Since launch"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">ROI Statement</h3>
              <textarea
                value={formData.businessImpact?.roiStatement || ''}
                onChange={(e) =>
                  updateField('businessImpact', {
                    ...formData.businessImpact!,
                    roiStatement: e.target.value,
                  })
                }
                rows={3}
                placeholder="Describe the business impact and ROI..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-y"
              />
            </Card>

            <Card className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Key Metrics</h3>
                <Button type="button" variant="outline" size="sm" onClick={addMetric}>
                  + Add Metric
                </Button>
              </div>
              <div className="space-y-4">
                {formData.businessImpact?.keyMetrics?.map((metric, index) => (
                  <div key={index} className="grid grid-cols-4 gap-2 p-3 bg-gray-50 rounded-lg">
                    <input
                      type="text"
                      value={metric.label}
                      onChange={(e) => {
                        const newMetrics = [...(formData.businessImpact?.keyMetrics || [])];
                        newMetrics[index] = { ...newMetrics[index], label: e.target.value };
                        updateField('businessImpact', { ...formData.businessImpact!, keyMetrics: newMetrics });
                      }}
                      placeholder="Label"
                      className="px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                    <input
                      type="text"
                      value={metric.value}
                      onChange={(e) => {
                        const newMetrics = [...(formData.businessImpact?.keyMetrics || [])];
                        newMetrics[index] = { ...newMetrics[index], value: e.target.value };
                        updateField('businessImpact', { ...formData.businessImpact!, keyMetrics: newMetrics });
                      }}
                      placeholder="Value"
                      className="px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                    <input
                      type="text"
                      value={metric.improvement}
                      onChange={(e) => {
                        const newMetrics = [...(formData.businessImpact?.keyMetrics || [])];
                        newMetrics[index] = { ...newMetrics[index], improvement: e.target.value };
                        updateField('businessImpact', { ...formData.businessImpact!, keyMetrics: newMetrics });
                      }}
                      placeholder="Improvement"
                      className="px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newMetrics = formData.businessImpact?.keyMetrics?.filter((_, i) => i !== index) || [];
                        updateField('businessImpact', { ...formData.businessImpact!, keyMetrics: newMetrics });
                      }}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        );

      case 'technical':
        return (
          <div className="space-y-6">
            {/* Project Details */}
            <Card className="p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Project Details</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Timeline</label>
                  <input
                    type="text"
                    value={formData.timeline || ''}
                    onChange={(e) => updateField('timeline', e.target.value)}
                    placeholder="e.g., 8 weeks"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Team Size</label>
                  <input
                    type="text"
                    value={formData.teamSize || ''}
                    onChange={(e) => updateField('teamSize', e.target.value)}
                    placeholder="e.g., 2 members"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Role</label>
                  <input
                    type="text"
                    value={formData.role || ''}
                    onChange={(e) => updateField('role', e.target.value)}
                    placeholder="e.g., Lead Developer"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </Card>

            {/* Performance Scores */}
            <Card className="p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Lighthouse Scores</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Performance (0-100)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.technicalHighlights?.performanceScore || ''}
                    onChange={(e) =>
                      updateField('technicalHighlights', {
                        ...formData.technicalHighlights!,
                        performanceScore: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Accessibility (0-100)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.technicalHighlights?.accessibilityScore || ''}
                    onChange={(e) =>
                      updateField('technicalHighlights', {
                        ...formData.technicalHighlights!,
                        accessibilityScore: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SEO Score (0-100)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.technicalHighlights?.seoScore || ''}
                    onChange={(e) =>
                      updateField('technicalHighlights', {
                        ...formData.technicalHighlights!,
                        seoScore: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </Card>

            {/* Core Web Vitals */}
            <Card className="p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Core Web Vitals</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    LCP (seconds)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.technicalHighlights?.coreWebVitals?.lcp || ''}
                    onChange={(e) =>
                      updateField('technicalHighlights', {
                        ...formData.technicalHighlights!,
                        coreWebVitals: {
                          ...formData.technicalHighlights?.coreWebVitals!,
                          lcp: parseFloat(e.target.value) || 0,
                        },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    FID (ms)
                  </label>
                  <input
                    type="number"
                    value={formData.technicalHighlights?.coreWebVitals?.fid || ''}
                    onChange={(e) =>
                      updateField('technicalHighlights', {
                        ...formData.technicalHighlights!,
                        coreWebVitals: {
                          ...formData.technicalHighlights?.coreWebVitals!,
                          fid: parseInt(e.target.value) || 0,
                        },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CLS
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.technicalHighlights?.coreWebVitals?.cls || ''}
                    onChange={(e) =>
                      updateField('technicalHighlights', {
                        ...formData.technicalHighlights!,
                        coreWebVitals: {
                          ...formData.technicalHighlights?.coreWebVitals!,
                          cls: parseFloat(e.target.value) || 0,
                        },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </Card>
          </div>
        );

      case 'seo':
        return (
          <div className="space-y-6">
            <Card className="p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">SEO Metadata</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={formData.seo?.metaTitle || ''}
                    onChange={(e) =>
                      updateField('seo', {
                        ...formData.seo!,
                        metaTitle: e.target.value,
                      })
                    }
                    placeholder="Project Title | Your Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    {(formData.seo?.metaTitle || '').length}/60 characters
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meta Description
                  </label>
                  <textarea
                    value={formData.seo?.metaDescription || ''}
                    onChange={(e) =>
                      updateField('seo', {
                        ...formData.seo!,
                        metaDescription: e.target.value,
                      })
                    }
                    rows={3}
                    placeholder="A brief description for search engines..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-y"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    {(formData.seo?.metaDescription || '').length}/160 characters
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Keywords (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.seo?.keywords?.join(', ') || ''}
                    onChange={(e) =>
                      updateField('seo', {
                        ...formData.seo!,
                        keywords: e.target.value.split(',').map((k) => k.trim()).filter(Boolean),
                      })
                    }
                    placeholder="react, nextjs, typescript, web development"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  // Memoized gradient for preview
  const previewGradient = useMemo(() => formData.gradient ?? {
    from: '#3B82F6',
    to: '#8B5CF6'
  }, [formData.gradient]);

  // Get primary image for preview
  const primaryImage = useMemo(() => {
    const primary = formData.images.find(img => img.isPrimary);
    return primary?.url || formData.images[0]?.url || '';
  }, [formData.images]);

  /**
   * Render Live Preview Panel
   * Shows how the project card will appear on the frontend
   */
  const renderPreviewPanel = () => {
    if (!showPreview) return null;

    return (
      <Card className="p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-white">Live Preview</h3>
          <span className="text-xs text-gray-400">How it appears on your portfolio</span>
        </div>

        {/* Preview Card - Scaled down version */}
        <div className="relative mx-auto max-w-md">
          <div className="group relative flex flex-col
               w-full h-[380px]
               bg-gradient-to-br from-gray-50 via-white to-gray-100
               dark:from-gray-900/95 dark:via-gray-800/95 dark:to-black/95
               border border-gray-200/80 dark:border-gray-700/60
               rounded-xl shadow-lg overflow-hidden">

            {/* Project Image */}
            <div className="relative h-[160px] bg-gray-200 dark:bg-gray-700">
              {primaryImage ? (
                <Image
                  src={primaryImage}
                  alt={formData.title || 'Project preview'}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}

              {/* Status Badge */}
              {formData.status === 'in_development' && (
                <div className="absolute top-2 left-2 z-10">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-yellow-500/90 text-white shadow-lg">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                    </span>
                    In Development
                  </span>
                </div>
              )}
            </div>

            {/* Project Details */}
            <div className="flex flex-col flex-1 px-4 py-3 bg-gradient-to-br from-gray-100 via-white/90 to-gray-200
               dark:from-gray-900/95 dark:via-gray-800/95 dark:to-black/95">
              {/* Title */}
              <h4
                className="text-xl font-bold mb-2 bg-clip-text text-transparent leading-tight"
                style={{
                  backgroundImage: `linear-gradient(to right, ${previewGradient.from}, ${previewGradient.to})`
                }}
              >
                {formData.title || 'Project Title'}
              </h4>

              {/* Description */}
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 flex-1 line-clamp-2">
                {formData.description || 'Project description will appear here...'}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1.5">
                {(formData.tech.length > 0 ? formData.tech.slice(0, 5) : ['Technology']).map((tech, idx) => {
                  const techData = techIcons[tech];
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-1 px-2 py-1 rounded-full border text-xs"
                      style={{ borderColor: `${techData?.color || '#9CA3AF'}40` }}
                    >
                      {techData?.icon && (
                        <Image
                          src={techData.icon}
                          alt={tech}
                          width={12}
                          height={12}
                          className="w-3 h-3 object-contain"
                        />
                      )}
                      <span style={{ color: techData?.color || '#9CA3AF' }}>{tech}</span>
                    </div>
                  );
                })}
                {formData.tech.length > 5 && (
                  <span className="text-xs text-gray-500">+{formData.tech.length - 5} more</span>
                )}
              </div>
            </div>

            {/* Decorative gradient border effect */}
            <div
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none"
              style={{
                background: `linear-gradient(135deg, ${previewGradient.from}40, ${previewGradient.to}40)`,
              }}
            />
          </div>

          {/* Preview Status Badges */}
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {formData.featured && (
              <span className="px-2 py-1 text-xs font-medium bg-amber-500/20 text-amber-400 rounded-full">
                Featured
              </span>
            )}
            {formData.isLive && (
              <span className="px-2 py-1 text-xs font-medium bg-green-500/20 text-green-400 rounded-full">
                Live Website
              </span>
            )}
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              formData.status === 'published' ? 'bg-green-500/20 text-green-400' :
              formData.status === 'in_development' ? 'bg-yellow-500/20 text-yellow-400' :
              formData.status === 'draft' ? 'bg-gray-500/20 text-gray-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              {formData.status === 'in_development' ? 'In Development' : formData.status.charAt(0).toUpperCase() + formData.status.slice(1)}
            </span>
            <span className="px-2 py-1 text-xs font-medium bg-purple-500/20 text-purple-400 rounded-full">
              {formData.category.charAt(0).toUpperCase() + formData.category.slice(1)}
            </span>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Message */}
      {error && (
        <Card className="p-4 bg-red-50 border-red-200">
          <p className="text-red-700">{error}</p>
        </Card>
      )}

      {/* Tab Navigation with Preview Toggle */}
      <Card className="p-1">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <div className="flex flex-wrap gap-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-cyan-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              showPreview
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </button>
        </div>
      </Card>

      {/* Tab Content and Preview Layout */}
      <div className={`grid gap-6 ${showPreview ? 'lg:grid-cols-2' : ''}`}>
        {/* Tab Content */}
        <Card className="p-6">{renderTabContent()}</Card>

        {/* Live Preview Panel */}
        {renderPreviewPanel()}
      </div>

      {/* Form Actions */}
      <div className="flex justify-between items-center">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/projects')}
        >
          Cancel
        </Button>
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              // Save as draft
              updateField('status', 'draft');
            }}
          >
            Save as Draft
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? 'Saving...'
              : isEditing
              ? 'Update Project'
              : 'Create Project'}
          </Button>
        </div>
      </div>
    </form>
  );
}

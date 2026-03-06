/**
 * Admin Projects Page
 *
 * Main admin interface for managing portfolio projects.
 * Features: list all projects, filter, search, reorder, CRUD operations.
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import ProjectAdminCard from '@/components/admin/ProjectAdminCard';
import type { ProjectDB, ProjectStatus, ProjectCategory } from '@/types/project';

// Filter status options
type FilterStatus = 'all' | ProjectStatus;
type FilterCategory = 'all' | ProjectCategory;

export default function AdminProjectsPage() {
  // State for projects data
  const [projects, setProjects] = useState<ProjectDB[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [selectedStatus, setSelectedStatus] = useState<FilterStatus>('all');
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  // Action states
  const [isSeeding, setIsSeeding] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Drag-and-drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  /**
   * Fetch projects from API
   */
  const fetchProjects = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Build query parameters
      const params = new URLSearchParams();
      if (searchQuery) params.set('search', searchQuery);

      const response = await fetch(`/api/projects?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        // Include detailed error info if available (in development mode)
        const errorDetails = data.details ? `: ${data.details}` : '';
        throw new Error(`${data.error || 'Failed to fetch projects'}${errorDetails}`);
      }

      setProjects(data.projects || []);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err instanceof Error ? err.message : 'Failed to load projects');
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  // Fetch projects on mount and when search changes
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  /**
   * Seed database with static project data
   */
  const handleSeedProjects = async () => {
    if (!confirm('This will seed the database with your existing static project data. Continue?')) {
      return;
    }

    try {
      setIsSeeding(true);
      const response = await fetch('/api/projects/seed', {
        method: 'POST',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to seed projects');
      }

      const data = await response.json();
      alert(`Successfully seeded ${data.insertedCount} projects!`);
      fetchProjects();
    } catch (err) {
      console.error('Error seeding projects:', err);
      alert(err instanceof Error ? err.message : 'Failed to seed projects');
    } finally {
      setIsSeeding(false);
    }
  };

  /**
   * Handle project deletion
   */
  const handleDelete = async (id: string) => {
    const project = projects.find((p) => p.id === id);
    if (!confirm(`Are you sure you want to delete "${project?.title}"? This cannot be undone.`)) {
      return;
    }

    try {
      setDeletingId(id);
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      // Remove from local state
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Error deleting project:', err);
      alert('Failed to delete project');
    } finally {
      setDeletingId(null);
    }
  };

  /**
   * Handle project status change
   */
  const handleStatusChange = async (id: string, status: ProjectStatus) => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // Update local state
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status } : p))
      );
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update project status');
    }
  };

  /**
   * Handle drag-and-drop reordering
   */
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    // Reorder locally first for instant feedback
    setProjects((prev) => {
      const oldIndex = prev.findIndex((p) => p.id === active.id);
      const newIndex = prev.findIndex((p) => p.id === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });

    // Then persist to server
    try {
      const reorderedProjects = projects.map((p, index) => ({
        id: p.id,
        displayOrder: index,
      }));

      await fetch('/api/projects/reorder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projects: reorderedProjects }),
      });
    } catch (err) {
      console.error('Error reordering projects:', err);
      // Refetch to restore correct order on error
      fetchProjects();
    }
  };

  // Filter projects based on current filters
  const filteredProjects = projects.filter((project) => {
    // Status filter
    if (selectedStatus !== 'all' && project.status !== selectedStatus) {
      return false;
    }

    // Category filter
    if (selectedCategory !== 'all' && project.category !== selectedCategory) {
      return false;
    }

    // Featured filter
    if (showFeaturedOnly && !project.featured) {
      return false;
    }

    return true;
  });

  // Calculate stats
  const stats = {
    total: projects.length,
    published: projects.filter((p) => p.status === 'published').length,
    inDevelopment: projects.filter((p) => p.status === 'in_development').length,
    draft: projects.filter((p) => p.status === 'draft').length,
    archived: projects.filter((p) => p.status === 'archived').length,
    featured: projects.filter((p) => p.featured).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your portfolio projects
          </p>
        </div>
        <div className="flex gap-3">
          {projects.length === 0 && !isLoading && (
            <Button
              variant="outline"
              onClick={handleSeedProjects}
              disabled={isSeeding}
            >
              {isSeeding ? 'Seeding...' : 'Seed from Static Data'}
            </Button>
          )}
          <Link href="/admin/projects/new">
            <Button>+ New Project</Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <p className="text-sm text-blue-600 font-medium">Total</p>
          <p className="text-2xl font-bold text-blue-700">{stats.total}</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <p className="text-sm text-green-600 font-medium">Published</p>
          <p className="text-2xl font-bold text-green-700">{stats.published}</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <p className="text-sm text-yellow-600 font-medium">In Development</p>
          <p className="text-2xl font-bold text-yellow-700">{stats.inDevelopment}</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
          <p className="text-sm text-gray-600 font-medium">Draft</p>
          <p className="text-2xl font-bold text-gray-700">{stats.draft}</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <p className="text-sm text-red-600 font-medium">Archived</p>
          <p className="text-2xl font-bold text-red-700">{stats.archived}</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <p className="text-sm text-amber-600 font-medium">Featured</p>
          <p className="text-2xl font-bold text-amber-700">{stats.featured}</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4">
          {/* Status Filter */}
          <div className="flex flex-wrap gap-2">
            {(['all', 'published', 'in_development', 'draft', 'archived'] as const).map((status) => {
              const count =
                status === 'all'
                  ? stats.total
                  : status === 'in_development'
                  ? stats.inDevelopment
                  : stats[status as keyof typeof stats];
              return (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    selectedStatus === status
                      ? 'bg-cyan-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status === 'in_development'
                    ? 'In Dev'
                    : status.charAt(0).toUpperCase() + status.slice(1)}{' '}
                  ({count})
                </button>
              );
            })}
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-gray-300" />

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {(['all', 'production', 'portfolio', 'coursework'] as const).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Featured Toggle */}
          <button
            onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              showFeaturedOnly
                ? 'bg-amber-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Featured Only
          </button>
        </div>
      </Card>

      {/* Search */}
      <Card className="p-4">
        <input
          type="text"
          placeholder="Search by title, description, or tech stack..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </Card>

      {/* Error State */}
      {error && (
        <Card className="p-4 bg-red-50 border-red-200">
          <p className="text-red-700">{error}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchProjects}
            className="mt-2"
          >
            Retry
          </Button>
        </Card>
      )}

      {/* Loading State */}
      {isLoading ? (
        <Card className="p-8 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-cyan-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-500">Loading projects...</p>
        </Card>
      ) : filteredProjects.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-gray-500 mb-4">
            {projects.length === 0
              ? 'No projects found. Create your first project or seed from static data.'
              : 'No projects match your filters.'}
          </p>
          {projects.length === 0 && (
            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={handleSeedProjects} disabled={isSeeding}>
                {isSeeding ? 'Seeding...' : 'Seed from Static Data'}
              </Button>
              <Link href="/admin/projects/new">
                <Button>Create Project</Button>
              </Link>
            </div>
          )}
        </Card>
      ) : (
        /* Projects List with Drag-and-Drop */
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={filteredProjects.map((p) => p.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {filteredProjects.map((project) => (
                <ProjectAdminCard
                  key={project.id}
                  project={project}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                  isDragging={deletingId === project.id}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {/* Info Footer */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <p className="text-sm text-blue-700">
          <strong>Tip:</strong> Drag and drop project cards to reorder them. The order here
          determines how projects appear on your portfolio.
        </p>
      </Card>
    </div>
  );
}

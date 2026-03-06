/**
 * ProjectAdminCard Component
 *
 * Enhanced card component for displaying projects in the admin interface.
 * Shows thumbnail, gradient colors, tech stack, status indicators, and action buttons.
 * Supports drag-and-drop reordering.
 */

'use client';

import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { ProjectDB, ProjectStatus } from '@/types/project';

interface ProjectAdminCardProps {
  project: ProjectDB;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: ProjectStatus) => void;
  isDragging?: boolean;
}

// Status badge color configurations
const statusColors: Record<ProjectStatus, string> = {
  draft: 'bg-gray-100 text-gray-700 border-gray-300',
  in_development: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  published: 'bg-green-100 text-green-700 border-green-300',
  archived: 'bg-red-100 text-red-700 border-red-300',
};

// Status display labels
const statusLabels: Record<ProjectStatus, string> = {
  draft: 'Draft',
  in_development: 'In Development',
  published: 'Published',
  archived: 'Archived',
};

// Category badge colors
const categoryColors: Record<string, string> = {
  production: 'bg-blue-100 text-blue-700',
  portfolio: 'bg-purple-100 text-purple-700',
  coursework: 'bg-orange-100 text-orange-700',
};

/**
 * ProjectAdminCard - Displays a project card in the admin interface
 *
 * Features:
 * - Thumbnail preview with fallback
 * - Gradient color preview bar
 * - Tech stack badges
 * - Status and category indicators
 * - Featured and Live badges
 * - Edit, Preview, Archive actions
 * - Drag handle for reordering
 */
const ProjectAdminCard = memo(function ProjectAdminCard({
  project,
  onDelete,
  onStatusChange,
  isDragging = false,
}: ProjectAdminCardProps) {
  // Setup drag-and-drop with dnd-kit
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: project.id });

  // Apply transform styles for drag animation
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  // Get primary image URL
  const primaryImage = project.images?.find((img) => img.isPrimary) || project.images?.[0];
  const imageUrl = primaryImage?.url || '/images/placeholder-project.webp';

  // Handle status toggle
  const handleArchive = () => {
    if (project.status === 'archived') {
      onStatusChange(project.id, 'draft');
    } else {
      onStatusChange(project.id, 'archived');
    }
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card className="p-4 hover:shadow-lg transition-all duration-200 bg-white border border-gray-200">
        <div className="flex gap-4">
          {/* Thumbnail */}
          <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
            {primaryImage ? (
              <Image
                src={imageUrl}
                alt={primaryImage?.alt || project.title}
                fill
                className="object-cover"
                sizes="96px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <span className="text-3xl">📁</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Header Row */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate text-lg">
                  {project.title}
                </h3>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  {/* Category Badge */}
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                      categoryColors[project.category] || 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                  </span>

                  {/* Client Type Badge */}
                  {project.clientType && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                      {project.clientType.charAt(0).toUpperCase() + project.clientType.slice(1)}
                    </span>
                  )}

                  {/* Status Badge */}
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full font-medium border ${
                      statusColors[project.status]
                    }`}
                  >
                    {statusLabels[project.status]}
                  </span>
                </div>
              </div>

              {/* Featured & Live Indicators */}
              <div className="flex flex-col items-end gap-1">
                {project.featured && (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-700 font-medium">
                    Featured
                  </span>
                )}
                {project.isLive && (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    Live
                  </span>
                )}
              </div>
            </div>

            {/* Gradient Preview Bar */}
            {project.gradient && (
              <div
                className="h-2 rounded-full mb-3"
                style={{
                  background: `linear-gradient(to right, ${project.gradient.from}, ${project.gradient.to})`,
                }}
                title={`Gradient: ${project.gradient.from} to ${project.gradient.to}`}
              />
            )}

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.tech?.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded"
                >
                  {tech}
                </span>
              ))}
              {project.tech && project.tech.length > 5 && (
                <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-500 rounded">
                  +{project.tech.length - 5} more
                </span>
              )}
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-3">
              {project.websiteLink && (
                <a
                  href={project.websiteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 flex items-center gap-1"
                >
                  <span>🌐</span>
                  <span className="truncate max-w-[150px]">
                    {project.websiteLink.replace(/^https?:\/\//, '')}
                  </span>
                </a>
              )}
              {project.codeLink && (
                <a
                  href={project.codeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 flex items-center gap-1"
                >
                  <span>📂</span>
                  <span>GitHub</span>
                </a>
              )}
            </div>

            {/* Actions Row */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Link href={`/admin/projects/${project.id}`}>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </Link>
                {project.websiteLink && (
                  <a href={project.websiteLink} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      Preview
                    </Button>
                  </a>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleArchive}
                  className={
                    project.status === 'archived'
                      ? 'text-green-600 hover:bg-green-50'
                      : 'text-red-600 hover:bg-red-50'
                  }
                >
                  {project.status === 'archived' ? 'Restore' : 'Archive'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(project.id)}
                  className="text-red-600 hover:bg-red-50"
                >
                  Delete
                </Button>
              </div>

              {/* Drag Handle */}
              <button
                {...attributes}
                {...listeners}
                className="p-2 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 touch-none"
                aria-label="Drag to reorder"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
});

export default ProjectAdminCard;

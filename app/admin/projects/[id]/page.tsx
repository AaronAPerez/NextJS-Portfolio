/**
 * Edit Project Page
 *
 * Admin page for editing an existing project.
 */

'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import ProjectForm from '@/components/admin/ProjectForm';
import { Card } from '@/components/ui/Card';
import type { ProjectDB } from '@/types/project';

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default function EditProjectPage({ params }: EditProjectPageProps) {
  // Unwrap params using React.use() for Next.js 15+
  const { id } = use(params);

  const [project, setProject] = useState<ProjectDB | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch project data on mount
  useEffect(() => {
    async function fetchProject() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/projects/${id}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Project not found');
          }
          throw new Error('Failed to fetch project');
        }

        const data = await response.json();
        setProject(data.project);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError(err instanceof Error ? err.message : 'Failed to load project');
      } finally {
        setIsLoading(false);
      }
    }

    fetchProject();
  }, [id]);

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/admin/projects" className="hover:text-cyan-600">
              Projects
            </Link>
            <span>/</span>
            <span>Edit</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Project</h1>
        </div>

        <Card className="p-8 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-cyan-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-500">Loading project...</p>
        </Card>
      </div>
    );
  }

  // Error state
  if (error || !project) {
    return (
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/admin/projects" className="hover:text-cyan-600">
              Projects
            </Link>
            <span>/</span>
            <span>Edit</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Project</h1>
        </div>

        <Card className="p-8 text-center bg-red-50 border-red-200">
          <p className="text-red-700 mb-4">{error || 'Project not found'}</p>
          <Link
            href="/admin/projects"
            className="text-cyan-600 hover:text-cyan-700 font-medium"
          >
            Back to Projects
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/admin/projects" className="hover:text-cyan-600">
              Projects
            </Link>
            <span>/</span>
            <span>Edit</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Project</h1>
          <p className="mt-1 text-sm text-gray-500">
            Editing: <span className="font-medium">{project.title}</span>
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex gap-3">
          {project.websiteLink && (
            <a
              href={project.websiteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              View Live Site
            </a>
          )}
        </div>
      </div>

      {/* Form with project data */}
      <ProjectForm project={project} isEditing />
    </div>
  );
}

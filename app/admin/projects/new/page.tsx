/**
 * New Project Page
 *
 * Admin page for creating a new project.
 */

import Link from 'next/link';
import ProjectForm from '@/components/admin/ProjectForm';

export default function NewProjectPage() {
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
            <span>New Project</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Project</h1>
          <p className="mt-1 text-sm text-gray-500">
            Add a new project to your portfolio
          </p>
        </div>
      </div>

      {/* Form */}
      <ProjectForm />
    </div>
  );
}

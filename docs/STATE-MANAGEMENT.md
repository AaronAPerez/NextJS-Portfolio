# State Management Architecture

This document explains the state management setup using **TanStack Query** and **Zustand**.

## 📚 Table of Contents
- [Overview](#overview)
- [TanStack Query (Server State)](#tanstack-query-server-state)
- [Zustand (Client State)](#zustand-client-state)
- [File Structure](#file-structure)
- [Examples](#examples)

---

## Overview

### Why Two Libraries?

We use a **hybrid approach** with specialized tools for different types of state:

| State Type | Library | Use Cases |
|-----------|---------|-----------|
| **Server State** | TanStack Query | Projects, skills, messages, analytics from database |
| **Client State** | Zustand | Theme, UI toggles, modals, admin sidebar state |

### Benefits

✅ **Separation of Concerns** - Server data management separate from UI state
✅ **Optimized Performance** - Each library optimized for its use case
✅ **Better DX** - Right tool for the right job
✅ **Type Safety** - Full TypeScript support
✅ **DevTools** - Visual debugging for queries

---

## TanStack Query (Server State)

### What It Does

- ✅ Fetches data from API/database
- ✅ Caches responses (5 min default)
- ✅ Background refetching when stale
- ✅ Deduplicates requests
- ✅ Optimistic updates
- ✅ Automatic retries on failure
- ✅ Loading and error states

### Configuration

Located in: [lib/providers/query-provider.tsx](../lib/providers/query-provider.tsx)

```tsx
{
  staleTime: 5 * 60 * 1000,     // 5 min - data considered fresh
  gcTime: 10 * 60 * 1000,        // 10 min - unused cache cleared
  retry: 1,                      // Retry failed requests once
  refetchOnWindowFocus: prod,    // Only in production
  refetchOnReconnect: true,      // Refetch on internet reconnect
}
```

### Available Hooks

#### Projects
```tsx
import { useProjects, useProject, useCreateProject, useUpdateProject, useDeleteProject } from '@/lib/hooks/use-projects';

// Read
const { data, isLoading, error } = useProjects({ published: true });
const { data: project } = useProject('project-id');

// Write
const createMutation = useCreateProject();
const updateMutation = useUpdateProject();
const deleteMutation = useDeleteProject();
```

#### Skills
```tsx
import { useSkills, useCreateSkill, useUpdateSkill, useDeleteSkill } from '@/lib/hooks/use-skills';

const { data: skills } = useSkills({ category: 'Frontend' });
```

### Query Keys Structure

```
['projects']                    # All projects
['projects', { published: true }] # Filtered projects
['projects', 'abc123']          # Single project
['skills']                      # All skills
['skills', { category: 'Frontend' }] # Filtered skills
```

---

## Zustand (Client State)

### What It Does

- ✅ Manages UI state (theme, modals, sidebars)
- ✅ Persists state to localStorage
- ✅ Global state accessible anywhere
- ✅ No providers needed (except at root)
- ✅ Minimal bundle size (~1KB)

### Store: UI State

Located in: [lib/store/ui-store.ts](../lib/store/ui-store.ts)

```tsx
interface UIState {
  // Theme
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme) => void;

  // Admin sidebar
  adminSidebarOpen: boolean;
  setAdminSidebarOpen: (open: boolean) => void;
  toggleAdminSidebar: () => void;

  // Modals
  activeModal: string | null;
  openModal: (modalId: string) => void;
  closeModal: () => void;

  // Mobile menu
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
}
```

### Usage

```tsx
'use client';

import { useUIStore } from '@/lib/store/ui-store';

export function ThemeToggle() {
  const { theme, setTheme } = useUIStore();

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Current: {theme}
    </button>
  );
}
```

### Persisted State

Automatically saved to `localStorage` under key `ui-storage`:
- ✅ `theme`
- ✅ `adminSidebarOpen`

Other state (modals, mobile menu) is ephemeral and resets on page refresh.

---

## File Structure

```
/lib
  /providers
    query-provider.tsx         # TanStack Query setup

  /hooks
    use-projects.ts           # Projects CRUD hooks
    use-skills.ts             # Skills CRUD hooks

  /store
    ui-store.ts               # Zustand UI state

/app
  layout.tsx                  # QueryProvider wraps app

  /api
    /projects
      route.ts                # GET, POST /api/projects
      /[id]/route.ts          # GET, PATCH, DELETE /api/projects/:id
    /skills
      route.ts                # GET, POST /api/skills
```

---

## Examples

### Example 1: Fetch and Display Projects

```tsx
'use client';

import { useProjects } from '@/lib/hooks/use-projects';

export function ProjectsList() {
  const { data: projects, isLoading, error } = useProjects({
    published: true,
    featured: true
  });

  if (isLoading) return <Spinner />;
  if (error) return <Error message={error.message} />;

  return (
    <div className="grid gap-4">
      {projects?.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
```

### Example 2: Create New Project (Admin)

```tsx
'use client';

import { useCreateProject } from '@/lib/hooks/use-projects';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export function CreateProjectForm() {
  const { register, handleSubmit } = useForm();
  const createProject = useCreateProject();

  const onSubmit = async (data) => {
    try {
      await createProject.mutateAsync(data);
      toast.success('Project created!');
    } catch (error) {
      toast.error('Failed to create project');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('title')} placeholder="Project title" />
      <textarea {...register('description')} />
      <button type="submit" disabled={createProject.isPending}>
        {createProject.isPending ? 'Creating...' : 'Create Project'}
      </button>
    </form>
  );
}
```

### Example 3: Optimistic Update

```tsx
const updateProject = useUpdateProject();

const handleToggleFeatured = async (projectId: string) => {
  // Optimistically update UI before server responds
  updateProject.mutate(
    { id: projectId, data: { featured: !project.featured } },
    {
      onSuccess: () => {
        toast.success('Updated!');
      },
      onError: () => {
        toast.error('Failed to update');
        // TanStack Query automatically reverts on error
      }
    }
  );
};
```

### Example 4: Zustand with Persistence

```tsx
'use client';

import { useUIStore } from '@/lib/store/ui-store';

export function AdminLayout({ children }) {
  const { adminSidebarOpen, toggleAdminSidebar } = useUIStore();

  return (
    <div className="flex">
      <aside className={adminSidebarOpen ? 'block' : 'hidden'}>
        {/* Sidebar content */}
      </aside>

      <main className="flex-1">
        <button onClick={toggleAdminSidebar}>
          Toggle Sidebar
        </button>
        {children}
      </main>
    </div>
  );
}
```

---

## Best Practices

### TanStack Query

✅ **Use query keys** - Always use consistent, descriptive keys
✅ **Invalidate on mutations** - Refetch data after create/update/delete
✅ **Handle loading/error states** - Provide good UX
✅ **Use optimistic updates** - For instant feedback
✅ **Enable DevTools** - Only in development

❌ **Don't use for client state** - Use Zustand instead
❌ **Don't fetch in useEffect** - Use useQuery directly
❌ **Don't ignore error states** - Always handle errors

### Zustand

✅ **Keep stores focused** - One store per domain (UI, auth, etc.)
✅ **Use selectors** - `const theme = useUIStore(s => s.theme)`
✅ **Persist wisely** - Only persist what's needed
✅ **Use devtools** - Enable in development

❌ **Don't use for server data** - Use TanStack Query
❌ **Don't over-persist** - Don't save temporary state
❌ **Don't make stores too large** - Split if needed

---

## Performance Tips

### TanStack Query
- Set appropriate `staleTime` (default: 5 min)
- Use `prefetchQuery` for predictable navigation
- Enable `keepPreviousData` for pagination
- Use `select` to transform/filter data

### Zustand
- Use selectors to avoid unnecessary re-renders:
  ```tsx
  // ❌ Bad - re-renders on any state change
  const { theme, adminSidebarOpen, activeModal } = useUIStore();

  // ✅ Good - only re-renders when theme changes
  const theme = useUIStore(state => state.theme);
  ```

---

## Debugging

### React Query DevTools
- Open floating panel in dev mode
- View all queries, mutations, cache
- Manually trigger refetch/invalidate

### Zustand DevTools
- Install Redux DevTools extension
- View state changes in real-time
- Time-travel debugging

### Browser DevTools
- **Application → Local Storage** - View persisted Zustand state
- **Network tab** - View API requests from TanStack Query

---

## Migration Path

If you want to convert existing static data to use the database:

1. ✅ Data seeded (done)
2. ✅ API routes created (done)
3. ✅ Hooks created (done)
4. 🔄 Update components to use hooks
5. 🔄 Build admin dashboard
6. 🔄 Remove static config files

See [SETUP.md](./SETUP.md) for detailed migration steps.

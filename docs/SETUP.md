# Setup Guide - Portfolio with Admin Dashboard

This guide will help you set up TanStack Query, Zustand, Vercel Postgres, and the admin dashboard.

## 📋 Prerequisites

- Node.js 18+ installed
- Vercel account
- Git installed

## 🗄️ Database Setup (Vercel Postgres)

### Option 1: Vercel Dashboard (Recommended)

1. **Go to your Vercel project dashboard**
   - Visit https://vercel.com/dashboard
   - Select your project

2. **Create Postgres Database**
   - Go to "Storage" tab
   - Click "Create Database"
   - Select "Postgres"
   - Choose "Neon Serverless SQL" (free tier)
   - Click "Create"

3. **Connect to your project**
   - Vercel will automatically add environment variables:
     - `POSTGRES_URL`
     - `POSTGRES_PRISMA_URL`
     - `POSTGRES_URL_NO_SSL`
     - `POSTGRES_URL_NON_POOLING`

4. **Copy env variables locally**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Click "Copy" next to each variable
   - Add them to your `.env.local` file

### Option 2: Neon Direct (Alternative)

1. Go to https://neon.tech
2. Create a free account
3. Create a new project
4. Copy the connection string
5. Add to `.env.local`:
   ```env
   DATABASE_URL="postgresql://..."
   ```

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database (from Vercel Postgres)
DATABASE_URL="postgresql://..."
POSTGRES_PRISMA_URL="postgresql://..."

# Optional: For local development with Neon
# DATABASE_URL="postgresql://user:password@host.neon.tech/dbname?sslmode=require"
```

## 📦 Installation

```bash
# Install dependencies (already done)
npm install

# Generate Prisma Client
npx prisma generate

# Push schema to database (creates tables)
npx prisma db push

# Seed database with your existing projects
npx prisma db seed
```

## 🌱 Database Seeding

The seed script will populate your database with:
- ✅ All 5 existing projects (AMP Vending, CloudGov, etc.)
- ✅ Example skills organized by category
- ✅ Proper ordering and metadata

To re-seed (will update existing data):
```bash
npx prisma db seed
```

## 🎨 Prisma Studio (Database UI)

View and edit your database visually:

```bash
npx prisma studio
```

Opens at http://localhost:5555

## 🔐 Authentication Setup (Next Steps)

### Option 1: Clerk (Recommended)

1. Go to https://clerk.com
2. Create account and new application
3. Get API keys
4. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```

### Option 2: NextAuth.js

1. Install: `npm install next-auth`
2. Configure providers (Google, GitHub, etc.)
3. Add JWT secret to `.env.local`

## 📚 Using TanStack Query

### In Components (Client-Side)

```tsx
'use client';

import { useProjects } from '@/lib/hooks/use-projects';

export function ProjectsList() {
  const { data: projects, isLoading, error } = useProjects({
    published: true
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading projects</div>;

  return (
    <div>
      {projects?.map(project => (
        <div key={project.id}>{project.title}</div>
      ))}
    </div>
  );
}
```

### Available Hooks

**Projects:**
- `useProjects(filters?)` - Fetch all projects
- `useProject(id)` - Fetch single project
- `useCreateProject()` - Create new project
- `useUpdateProject()` - Update project
- `useDeleteProject()` - Delete project

**Skills:**
- `useSkills(filters?)` - Fetch all skills
- `useCreateSkill()` - Create new skill
- `useUpdateSkill()` - Update skill
- `useDeleteSkill()` - Delete skill

## 🎯 Using Zustand (Client State)

```tsx
'use client';

import { useUIStore } from '@/lib/store/ui-store';

export function ThemeToggle() {
  const { theme, setTheme } = useUIStore();

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </button>
  );
}
```

## 🚀 Development Workflow

```bash
# Start dev server
npm run dev

# Run Prisma Studio (in separate terminal)
npx prisma studio

# View React Query DevTools
# Visit http://localhost:3000 and look for floating icon in bottom-right
```

## 📊 React Query DevTools

In development mode, you'll see a floating React Query icon in the bottom-right corner. Click it to:
- ✅ View all active queries and their status
- ✅ See cached data
- ✅ Manually refetch or invalidate queries
- ✅ Debug performance issues

## 🗂️ Project Structure

```
/app
  /api
    /projects       # CRUD endpoints for projects
    /skills         # CRUD endpoints for skills
/lib
  /hooks
    use-projects.ts # TanStack Query hooks for projects
    use-skills.ts   # TanStack Query hooks for skills
  /store
    ui-store.ts     # Zustand store for client state
  /providers
    query-provider.tsx # TanStack Query provider
  prisma.ts         # Prisma client singleton
/prisma
  schema.prisma     # Database schema
  seed.ts          # Seed script
```

## 🔄 Migrating from Static to Database

Your existing [components/config/projects.ts](../components/config/projects.ts) file will still work! You can gradually migrate:

1. **Phase 1** (Current): Database setup complete, data seeded
2. **Phase 2**: Update components to use `useProjects()` hook
3. **Phase 3**: Build admin dashboard to manage projects
4. **Phase 4**: Remove static config file

## ⚡ Performance Benefits

**Before (Static):**
- ❌ Hardcoded data
- ❌ Requires code changes to update projects
- ❌ No caching
- ❌ No optimistic updates

**After (TanStack Query + Vercel Postgres):**
- ✅ Dynamic data from database
- ✅ Update via admin dashboard (no deployments needed)
- ✅ Smart caching (5 min stale time)
- ✅ Background refetching
- ✅ Optimistic updates for instant UI feedback
- ✅ Request deduplication
- ✅ Automatic retries on failure

## 🛠️ Troubleshooting

### Database connection issues
```bash
# Test connection
npx prisma db pull
```

### Prisma Client not generated
```bash
npx prisma generate
```

### Seed script fails
```bash
# Reset database and re-seed
npx prisma db push --force-reset
npx prisma db seed
```

### Type errors
```bash
# Regenerate types
npx prisma generate
npm run build
```

## 📖 Next Steps

1. [ ] Set up Vercel Postgres database
2. [ ] Run migrations and seed
3. [ ] Test queries in Prisma Studio
4. [ ] Build admin dashboard
5. [ ] Set up authentication (Clerk)
6. [ ] Migrate components to use database
7. [ ] Deploy to Vercel

## 🔗 Useful Links

- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Zustand Docs](https://docs.pmnd.rs/zustand)
- [Prisma Docs](https://www.prisma.io/docs)
- [Vercel Postgres Docs](https://vercel.com/docs/storage/vercel-postgres)
- [Clerk Docs](https://clerk.com/docs)

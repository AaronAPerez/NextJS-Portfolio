# 🚀 Quick Start Guide

Get your database, TanStack Query, and Zustand up and running in 5 minutes!

## ⚡ Quick Setup

### 1. Set up Vercel Postgres (2 minutes)

**Option A: Via Vercel Dashboard**
```bash
# 1. Go to https://vercel.com/dashboard
# 2. Select your project
# 3. Click "Storage" tab
# 4. Click "Create Database" → "Postgres"
# 5. Copy all env variables to .env.local
```

**Option B: Via CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Link project
vercel link

# Create Postgres database
vercel storage create postgres

# Pull env variables
vercel env pull .env.local
```

### 2. Initialize Database (1 minute)

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database (creates tables)
npm run db:push

# Seed with your existing projects
npm run db:seed
```

### 3. Start Development (30 seconds)

```bash
# Start dev server
npm run dev

# In another terminal: Open Prisma Studio to view data
npm run db:studio
```

**Done! 🎉**
- Visit http://localhost:3000
- Visit http://localhost:5555 for Prisma Studio
- Look for React Query DevTools icon (bottom-right)

---

## 🧪 Test It Out

### Fetch Projects with TanStack Query

Create a test component in `app/test-query/page.tsx`:

```tsx
'use client';

import { useProjects } from '@/lib/hooks/use-projects';

export default function TestQuery() {
  const { data, isLoading, error } = useProjects({ published: true });

  if (isLoading) return <div>Loading projects...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Projects from Database</h1>
      <div className="space-y-4">
        {data?.map(project => (
          <div key={project.id} className="border p-4 rounded">
            <h2 className="font-bold">{project.title}</h2>
            <p className="text-sm text-gray-600">{project.description}</p>
            <div className="flex gap-2 mt-2">
              {project.tech.map(t => (
                <span key={t} className="text-xs bg-blue-100 px-2 py-1 rounded">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

Visit http://localhost:3000/test-query

### Test Zustand Store

```tsx
'use client';

import { useUIStore } from '@/lib/store/ui-store';

export default function TestZustand() {
  const { theme, setTheme } = useUIStore();

  return (
    <div className="p-8">
      <h1>Current theme: {theme}</h1>
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Toggle Theme
      </button>
    </div>
  );
}
```

---

## 📊 Verify Everything Works

### Check Database
```bash
npm run db:studio
```
- Should show 5 projects (AMP Vending, CloudGov, etc.)
- Should show ~15 skills

### Check React Query
- Open http://localhost:3000
- Look for floating React Query icon (bottom-right)
- Click it to see queries and cache

### Check Zustand
- Open browser DevTools
- Go to Application → Local Storage
- Look for `ui-storage` key

---

## 🔧 Available NPM Scripts

```bash
# Database
npm run db:generate    # Generate Prisma Client
npm run db:push        # Push schema changes to DB
npm run db:seed        # Seed database with data
npm run db:studio      # Open Prisma Studio GUI

# Development
npm run dev           # Start dev server
npm run build         # Build for production
npm run start         # Start production server
```

---

## 🎯 Next Steps

1. ✅ **Test the setup** - Create a test page using `useProjects()`
2. ✅ **Migrate components** - Update existing components to use hooks
3. ✅ **Build admin dashboard** - Create admin pages for CRUD operations
4. ✅ **Add authentication** - Set up Clerk for admin access
5. ✅ **Deploy** - Push to Vercel

See [SETUP.md](./SETUP.md) for detailed documentation.

---

## ❓ Troubleshooting

### "Environment variable not found: DATABASE_URL"
```bash
# Make sure .env.local exists with DATABASE_URL
cp .env.example .env.local
# Then add your actual database URL
```

### "Cannot find module '@prisma/client'"
```bash
npm run db:generate
```

### Seed fails with "unique constraint"
```bash
# Database already seeded! To re-seed:
npm run db:push -- --force-reset
npm run db:seed
```

### Type errors after schema changes
```bash
npm run db:generate
# Restart TypeScript server in VS Code: Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

---

## 🎨 React Query DevTools

In development, you'll see a floating icon in the bottom-right. Click it to:

- 📊 View all queries and their status
- 🔄 See which queries are loading/stale/cached
- 🔍 Inspect query data
- ⚡ Manually refetch or invalidate
- 📈 Debug performance

---

## 🌟 Benefits You Now Have

✅ **Smart caching** - Requests cached for 5 minutes
✅ **Auto background refetch** - Stale data auto-updates
✅ **Optimistic updates** - Instant UI feedback
✅ **Request deduplication** - Multiple components share same request
✅ **Automatic retries** - Failed requests retry automatically
✅ **DevTools** - Visual debugging for queries
✅ **Type safety** - Full TypeScript support
✅ **Persistent client state** - Theme & UI state saved to localStorage

---

Happy coding! 🚀

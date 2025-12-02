# Portfolio Documentation

## 📚 Documentation Overview

This directory contains comprehensive documentation for the portfolio project's state management, database, and admin features.

### Quick Links

- **[🚀 Quick Start](./QUICK-START.md)** - Get up and running in 5 minutes
- **[⚙️ Setup Guide](./SETUP.md)** - Detailed setup instructions
- **[🎯 State Management](./STATE-MANAGEMENT.md)** - TanStack Query & Zustand architecture

---

## 🎯 What Was Built

### ✅ State Management

**TanStack Query (Server State)**
- Smart caching with 5-minute stale time
- Background refetching
- Optimistic updates
- Request deduplication
- Built-in loading/error states
- DevTools for debugging

**Zustand (Client State)**
- Theme management
- UI state (modals, sidebars)
- LocalStorage persistence
- Minimal bundle size (1KB)

### ✅ Database Schema (Prisma + Postgres)

**Tables Created:**
- `Project` - Your portfolio projects
- `Skill` - Technical skills by category
- `ContactMessage` - Form submissions
- `PageView` - Analytics tracking
- `Admin` - Admin users

### ✅ API Routes

**Projects:**
- `GET /api/projects` - List all (with filters)
- `POST /api/projects` - Create new
- `GET /api/projects/:id` - Get single
- `PATCH /api/projects/:id` - Update
- `DELETE /api/projects/:id` - Delete

**Skills:**
- `GET /api/skills` - List all (with filters)
- `POST /api/skills` - Create new
- `PATCH /api/skills/:id` - Update
- `DELETE /api/skills/:id` - Delete

### ✅ TypeScript Hooks

**Projects:**
```tsx
useProjects(filters)    // Fetch all
useProject(id)          // Fetch one
useCreateProject()      // Create mutation
useUpdateProject()      // Update mutation
useDeleteProject()      // Delete mutation
```

**Skills:**
```tsx
useSkills(filters)
useCreateSkill()
useUpdateSkill()
useDeleteSkill()
```

### ✅ Database Seeding

Pre-populated with:
- 5 portfolio projects (AMP Vending, CloudGov, etc.)
- 15 technical skills organized by category
- Proper ordering and metadata

---

## 🗂️ Project Structure

```
/app
  layout.tsx                    # QueryProvider added
  /api
    /projects
      route.ts                  # CRUD endpoints
      /[id]/route.ts
    /skills
      route.ts

/lib
  prisma.ts                     # Database client
  /providers
    query-provider.tsx          # TanStack Query setup
  /hooks
    use-projects.ts             # Projects hooks
    use-skills.ts               # Skills hooks
  /store
    ui-store.ts                 # Zustand UI state

/prisma
  schema.prisma                 # Database schema
  seed.ts                       # Seed script

/docs
  README.md                     # This file
  QUICK-START.md                # 5-min setup guide
  SETUP.md                      # Detailed setup
  STATE-MANAGEMENT.md           # Architecture docs
```

---

## 🚀 Getting Started

### 1. Quick Setup (5 minutes)

```bash
# Create Vercel Postgres database
# (via dashboard or CLI - see QUICK-START.md)

# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with your projects
npm run db:seed

# Start development
npm run dev
```

**[See full Quick Start guide →](./QUICK-START.md)**

---

## 📖 Available NPM Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema changes
npm run db:seed          # Seed database
npm run db:studio        # Open Prisma Studio GUI

# Testing
npm run test             # Run tests
npm run test:ci          # CI tests with coverage
npm run test:e2e         # E2E tests
```

---

## 🎨 Development Tools

### React Query DevTools
- Automatically enabled in development
- Floating icon in bottom-right corner
- View queries, cache, refetch manually

### Prisma Studio
```bash
npm run db:studio
```
- Visual database editor at http://localhost:5555
- View, create, update, delete records
- Great for testing and debugging

### Zustand DevTools
- Install Redux DevTools extension
- View state changes in real-time
- Time-travel debugging

---

## 🔐 Environment Variables

Required variables in `.env.local`:

```env
# Database (from Vercel Postgres)
DATABASE_URL="postgresql://..."
POSTGRES_PRISMA_URL="postgresql://..."

# Optional: Clerk authentication (for admin)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
CLERK_SECRET_KEY="sk_..."
```

See [.env.example](../.env.example) for full list.

---

## 📊 Database Schema

### Project Model
```prisma
model Project {
  id          String   @id @default(cuid())
  title       String
  description String   @db.Text
  tech        String[]
  category    String
  isLive      Boolean
  featured    Boolean
  images      String[]
  demoLink    String?
  codeLink    String
  // ... more fields
}
```

### Skill Model
```prisma
model Skill {
  id          String  @id @default(cuid())
  name        String  @unique
  category    String
  proficiency Int     @default(50)
  order       Int     @default(0)
  published   Boolean @default(true)
}
```

**[See full schema →](../prisma/schema.prisma)**

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | Next.js 15, React 19, TypeScript |
| **Styling** | Tailwind CSS, Framer Motion |
| **State Management** | TanStack Query, Zustand |
| **Database** | Vercel Postgres (Neon) |
| **ORM** | Prisma |
| **Auth** | Clerk (recommended) |
| **Storage** | Vercel Blob (for images) |
| **Analytics** | Vercel Analytics |
| **Email** | Resend |
| **Deployment** | Vercel |

---

## 🎯 Next Steps

### Phase 1: Setup (Current)
- [x] Install dependencies
- [x] Set up database schema
- [x] Create API routes
- [x] Configure TanStack Query
- [x] Configure Zustand
- [x] Seed database

### Phase 2: Integration
- [ ] Set up Vercel Postgres database
- [ ] Run migrations and seed
- [ ] Test API endpoints
- [ ] Update components to use hooks
- [ ] Replace static data with database queries

### Phase 3: Admin Dashboard
- [ ] Set up Clerk authentication
- [ ] Create admin layout
- [ ] Build project management UI
- [ ] Build skills management UI
- [ ] View contact messages
- [ ] Analytics dashboard

### Phase 4: Deploy
- [ ] Test in production
- [ ] Set up CI/CD
- [ ] Configure environment variables
- [ ] Deploy to Vercel

---

## 📚 Learn More

### TanStack Query
- [Official Docs](https://tanstack.com/query/latest)
- [React Query Tutorial](https://tanstack.com/query/latest/docs/react/overview)

### Zustand
- [Official Docs](https://docs.pmnd.rs/zustand)
- [Recipes](https://docs.pmnd.rs/zustand/guides/updating-state)

### Prisma
- [Official Docs](https://www.prisma.io/docs)
- [Prisma with Next.js](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)

### Vercel Postgres
- [Official Docs](https://vercel.com/docs/storage/vercel-postgres)
- [Quickstart](https://vercel.com/docs/storage/vercel-postgres/quickstart)

---

## 🆘 Troubleshooting

### Common Issues

**Database connection error**
```bash
# Check .env.local has DATABASE_URL
# Regenerate Prisma client
npm run db:generate
```

**Type errors**
```bash
# Regenerate types
npm run db:generate
# Restart TypeScript in VS Code
```

**Seed fails**
```bash
# Reset and re-seed
npm run db:push -- --force-reset
npm run db:seed
```

**[See full troubleshooting guide →](./SETUP.md#troubleshooting)**

---

## 🤝 Contributing

When adding new features:

1. **Database changes**
   - Update `prisma/schema.prisma`
   - Run `npm run db:push`
   - Run `npm run db:generate`

2. **New API routes**
   - Add to `/app/api`
   - Follow existing patterns
   - Add error handling

3. **New hooks**
   - Add to `/lib/hooks`
   - Follow TanStack Query conventions
   - Add TypeScript types

4. **Update docs**
   - Update relevant documentation
   - Add examples

---

## 📝 License

Private - All Rights Reserved

---

## 💬 Questions?

- **Setup issues?** Check [SETUP.md](./SETUP.md)
- **Quick start?** Check [QUICK-START.md](./QUICK-START.md)
- **Architecture?** Check [STATE-MANAGEMENT.md](./STATE-MANAGEMENT.md)

---

**Built with ❤️ using Next.js, TanStack Query, Zustand, and Prisma**

# Documentation

This folder contains technical documentation for the AP Designs Portfolio project.

## Available Documentation

| Document | Description |
|----------|-------------|
| [Invoice & Hosting System](./invoice-hosting-system.md) | Complete guide for the invoice and hosting options system with Neon database |
| [Database Schema](./database-schema.md) | Database tables and relationships |

## Quick Links

### Admin Dashboard
- Invoice Editor: `/admin/invoice`
- Hosting Options: `/admin/hosting-options`

### API Endpoints
- Invoices: `/api/invoices`
- Hosting Options: `/api/hosting-options`

### Public Views
- Invoice: `/invoice/[id]`
- Hosting Options: `/hosting-options/[id]`

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: Neon PostgreSQL (Serverless)
- **Styling**: Tailwind CSS
- **State**: React useState/useCallback
- **API**: Next.js Route Handlers

## Environment Variables

Required variables in `.env.local`:

```env
DATABASE_URL="postgresql://..."
```

See individual documentation files for complete setup instructions.

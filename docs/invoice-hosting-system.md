# Invoice & Hosting Options System

This document explains the invoice and hosting options system integrated with Neon PostgreSQL database.

## Overview

The system provides:
- **Editable Invoice Form** - Create, edit, save, print, and share invoices
- **Hosting Options Form** - Create, edit, save, print, and share hosting options documents
- **Database Persistence** - All documents stored in Neon PostgreSQL
- **Shareable Links** - Generate public URLs for clients to view documents

---

## Database Setup

### Neon Project
- **Project ID**: `shiny-star-22237173`
- **Project Name**: Portfolio-Database
- **Database**: `neondb`

### Tables

#### Invoice Table
```sql
CREATE TABLE "Invoice" (
  "id" TEXT PRIMARY KEY,
  "invoiceNumber" TEXT NOT NULL,
  "invoiceDate" DATE NOT NULL,
  "dueDate" DATE NOT NULL,
  "companyName" TEXT NOT NULL,
  "companyAddress" TEXT,
  "companyCity" TEXT,
  "companyPhone" TEXT,
  "companyEmail" TEXT,
  "companyWebsite" TEXT,
  "clientName" TEXT,
  "clientCompany" TEXT,
  "clientAddress" TEXT,
  "clientCity" TEXT,
  "clientEmail" TEXT,
  "clientPhone" TEXT,
  "items" JSONB NOT NULL DEFAULT '[]',
  "notes" TEXT,
  "terms" TEXT,
  "taxRate" DECIMAL(5,2) DEFAULT 0,
  "subtotal" DECIMAL(10,2) DEFAULT 0,
  "tax" DECIMAL(10,2) DEFAULT 0,
  "total" DECIMAL(10,2) DEFAULT 0,
  "status" TEXT DEFAULT 'draft',
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### HostingOption Table
```sql
CREATE TABLE "HostingOption" (
  "id" TEXT PRIMARY KEY,
  "companyName" TEXT NOT NULL,
  "headerTitle" TEXT NOT NULL,
  "headerSubtitle" TEXT,
  "overviewText" TEXT,
  "requirement1" TEXT,
  "requirement2" TEXT,
  "overviewNote" TEXT,
  "options" JSONB NOT NULL DEFAULT '[]',
  "domainTitle" TEXT,
  "domainDescription" TEXT,
  "domainProviders" JSONB DEFAULT '[]',
  "domainPricing" TEXT,
  "contactFormTitle" TEXT,
  "contactFormDescription" TEXT,
  "autoReplySubject" TEXT,
  "autoReplyBody" TEXT,
  "autoReplySignature" TEXT,
  "contactFormNote" TEXT,
  "footerTitle" TEXT,
  "footerText" TEXT,
  "clientEmail" TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Indexes
```sql
CREATE INDEX "idx_invoice_number" ON "Invoice"("invoiceNumber");
CREATE INDEX "idx_invoice_status" ON "Invoice"("status");
CREATE INDEX "idx_invoice_created" ON "Invoice"("createdAt" DESC);
CREATE INDEX "idx_hosting_created" ON "HostingOption"("createdAt" DESC);
```

---

## Environment Variables

Required in `.env.local`:

```env
# Neon Database Connection
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
```

The connection string is used by `@neondatabase/serverless` package.

---

## File Structure

```
├── lib/
│   └── db.ts                          # Database connection & utilities
├── app/
│   ├── api/
│   │   ├── invoices/
│   │   │   ├── route.ts               # GET all, POST new
│   │   │   └── [id]/
│   │   │       └── route.ts           # GET, PUT, DELETE by ID
│   │   └── hosting-options/
│   │       ├── route.ts               # GET all, POST new
│   │       └── [id]/
│   │           └── route.ts           # GET, PUT, DELETE by ID
│   ├── admin/
│   │   ├── invoice/
│   │   │   └── page.tsx               # Admin invoice editor page
│   │   └── hosting-options/
│   │       └── page.tsx               # Admin hosting options editor page
│   ├── invoice/
│   │   └── [id]/
│   │       └── page.tsx               # Public invoice view page
│   └── hosting-options/
│       └── [id]/
│           └── page.tsx               # Public hosting options view page
├── components/
│   └── admin/
│       ├── InvoiceForm.tsx            # Invoice editor component
│       └── HostingOptionsForm.tsx     # Hosting options editor component
```

---

## API Endpoints

### Invoices

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/invoices` | List all invoices |
| POST | `/api/invoices` | Create new invoice |
| GET | `/api/invoices/[id]` | Get invoice by ID |
| PUT | `/api/invoices/[id]` | Update invoice |
| DELETE | `/api/invoices/[id]` | Delete invoice |

### Hosting Options

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/hosting-options` | List all documents |
| POST | `/api/hosting-options` | Create new document |
| GET | `/api/hosting-options/[id]` | Get document by ID |
| PUT | `/api/hosting-options/[id]` | Update document |
| DELETE | `/api/hosting-options/[id]` | Delete document |

---

## Database Connection

The database client is defined in `lib/db.ts`:

```typescript
import { neon } from '@neondatabase/serverless'

export const sql = neon(process.env.DATABASE_URL!)

export function generateId(prefix: string = '') {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 9)
  return prefix ? `${prefix}-${timestamp}-${random}` : `${timestamp}-${random}`
}
```

Usage in API routes:
```typescript
import { sql, generateId } from '@/lib/db'

// Query example
const invoices = await sql`SELECT * FROM "Invoice" ORDER BY "createdAt" DESC`

// Insert example
const id = generateId('inv')
await sql`INSERT INTO "Invoice" ("id", "invoiceNumber") VALUES (${id}, ${invoiceNumber})`
```

---

## Component Features

### InvoiceForm Component

**Location**: `components/admin/InvoiceForm.tsx`

**Features**:
- Edit/Preview mode toggle
- Save to database
- Load saved invoices
- Create new invoice
- Print document
- Download as PDF (via print dialog)
- Send via email (opens email client)
- Copy shareable link

**State Management**:
```typescript
const [data, setData] = useState<InvoiceData>(defaultInvoiceData)
const [isEditing, setIsEditing] = useState(true)
const [invoiceId, setInvoiceId] = useState<string | null>(null)
const [isSaving, setIsSaving] = useState(false)
const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
const [savedInvoices, setSavedInvoices] = useState<Array<...>>([])
```

### HostingOptionsForm Component

**Location**: `components/admin/HostingOptionsForm.tsx`

**Features**:
- Same as InvoiceForm
- Client email field for sending documents
- Editable hosting options with providers and pricing

---

## Print Functionality

Both forms generate clean HTML for printing:

1. Opens new window with `window.open()`
2. Writes formatted HTML document
3. Uses `@page` CSS for paper size: `size: 8.5in 11in`
4. Auto-triggers print dialog on load
5. Closes window after printing

**Key CSS for print**:
```css
@page {
  size: 8.5in 11in;
  margin: 0.5in 0.6in;
}
@media print {
  html, body {
    width: 8.5in;
    height: 11in;
  }
}
body {
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
}
```

---

## Shareable Links

When "Copy Link" is clicked:

1. Invoice/document is saved to database (if not already saved)
2. Generates URL: `https://yourdomain.com/invoice/[id]`
3. Copies URL to clipboard
4. Shows confirmation

Public pages fetch data from API:
```typescript
const response = await fetch(`/api/invoices/${id}`)
if (response.ok) {
  const data = await response.json()
  setInvoice(data)
}
```

---

## Email Integration

Uses `mailto:` links to open the user's email client:

```typescript
const mailtoLink = `mailto:${clientEmail}?subject=${subject}&body=${body}`
window.open(mailtoLink, '_blank')
```

The email body contains a text summary of the invoice/document.

---

## Adding to Admin Sidebar

In `components/admin/AdminSidebar.tsx`, add navigation items:

```typescript
{ name: 'Invoice', href: '/admin/invoice', icon: '📋' },
{ name: 'Hosting Options', href: '/admin/hosting-options', icon: '🌐' },
```

---

## Future Improvements

Potential enhancements:
- PDF generation server-side (using puppeteer or jspdf)
- Email sending via API (Resend/SendGrid integration)
- Invoice status tracking (draft, sent, paid)
- Payment integration (Stripe)
- Invoice templates
- Client management system
- Recurring invoices

---

## Troubleshooting

### Print paper size defaulting to wrong size
- Use explicit dimensions: `size: 8.5in 11in` instead of `size: letter`
- Add explicit width/height to html and body in print media query

### Database connection errors
- Verify `DATABASE_URL` in `.env.local`
- Check Neon project status in console
- Ensure SSL mode is set: `?sslmode=require`

### Shareable links not working
- Verify API routes are accessible
- Check browser console for fetch errors
- Ensure document ID exists in database

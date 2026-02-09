# Database Schema

Neon PostgreSQL database schema for the AP Designs Portfolio.

## Connection Details

- **Project**: Portfolio-Database (....) 
- **Region**: AWS US-East-1
- **Database**: `neondb`

## Tables Overview

| Table | Description |
|-------|-------------|
| `Invoice` | Client invoices with line items |
| `HostingOption` | Hosting options documents |
| `Admin` | Admin user accounts |
| `ContactMessage` | Contact form submissions |
| `PageView` | Analytics page views |
| `Project` | Portfolio projects |
| `Skill` | Skills/technologies |

---

## Invoice Table

Stores client invoices with line items stored as JSONB.

```sql
CREATE TABLE "Invoice" (
  "id" TEXT PRIMARY KEY,                              -- Unique ID (inv-xxx-xxx)
  "invoiceNumber" TEXT NOT NULL,                      -- Display number (INV-2026-1234)
  "invoiceDate" DATE NOT NULL,                        -- Invoice date
  "dueDate" DATE NOT NULL,                            -- Payment due date

  -- Company Info
  "companyName" TEXT NOT NULL,
  "companyAddress" TEXT,
  "companyCity" TEXT,
  "companyPhone" TEXT,
  "companyEmail" TEXT,
  "companyWebsite" TEXT,

  -- Client Info
  "clientName" TEXT,
  "clientCompany" TEXT,
  "clientAddress" TEXT,
  "clientCity" TEXT,
  "clientEmail" TEXT,
  "clientPhone" TEXT,

  -- Line Items (JSONB array)
  "items" JSONB NOT NULL DEFAULT '[]',

  -- Additional Info
  "notes" TEXT,
  "terms" TEXT,

  -- Financials
  "taxRate" DECIMAL(5,2) DEFAULT 0,
  "subtotal" DECIMAL(10,2) DEFAULT 0,
  "tax" DECIMAL(10,2) DEFAULT 0,
  "total" DECIMAL(10,2) DEFAULT 0,

  -- Status
  "status" TEXT DEFAULT 'draft',                      -- draft, sent, paid

  -- Timestamps
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Items JSONB Structure

```json
[
  {
    "id": "1",
    "description": "Website Design",
    "quantity": 1,
    "rate": 1500.00
  },
  {
    "id": "2",
    "description": "Monthly Hosting",
    "quantity": 12,
    "rate": 20.00
  }
]
```

### Indexes

```sql
CREATE INDEX "idx_invoice_number" ON "Invoice"("invoiceNumber");
CREATE INDEX "idx_invoice_status" ON "Invoice"("status");
CREATE INDEX "idx_invoice_created" ON "Invoice"("createdAt" DESC);
```

---

## HostingOption Table

Stores hosting options documents for clients.

```sql
CREATE TABLE "HostingOption" (
  "id" TEXT PRIMARY KEY,                              -- Unique ID (hosting-xxx-xxx)

  -- Header
  "companyName" TEXT NOT NULL,
  "headerTitle" TEXT NOT NULL,
  "headerSubtitle" TEXT,

  -- Overview Section
  "overviewText" TEXT,
  "requirement1" TEXT,
  "requirement2" TEXT,
  "overviewNote" TEXT,

  -- Hosting Options (JSONB array)
  "options" JSONB NOT NULL DEFAULT '[]',

  -- Domain Section
  "domainTitle" TEXT,
  "domainDescription" TEXT,
  "domainProviders" JSONB DEFAULT '[]',
  "domainPricing" TEXT,

  -- Contact Form Section
  "contactFormTitle" TEXT,
  "contactFormDescription" TEXT,
  "autoReplySubject" TEXT,
  "autoReplyBody" TEXT,
  "autoReplySignature" TEXT,
  "contactFormNote" TEXT,

  -- Footer
  "footerTitle" TEXT,
  "footerText" TEXT,

  -- Client
  "clientEmail" TEXT,

  -- Timestamps
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Options JSONB Structure

```json
[
  {
    "id": "1",
    "letter": "A",
    "title": "Client-Owned Hosting",
    "description": "You purchase and own your hosting plan directly.",
    "isRecommended": true,
    "whatYouDo": ["Purchase hosting", "Share credentials"],
    "providers": [
      { "id": "1", "name": "SiteGround", "description": "Fast, secure" }
    ],
    "pricing": [
      { "id": "1", "label": "Hosting", "value": "$5-12/month" }
    ],
    "whatWeHandle": ["Full setup", "SSL certificate"],
    "idealFor": "Clients who want full ownership"
  }
]
```

### Indexes

```sql
CREATE INDEX "idx_hosting_created" ON "HostingOption"("createdAt" DESC);
```

---

## ID Generation

IDs are generated client-side using timestamp + random string:

```typescript
function generateId(prefix: string = '') {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 9)
  return prefix ? `${prefix}-${timestamp}-${random}` : `${timestamp}-${random}`
}

// Examples:
// generateId('inv')     -> "inv-m5x2abc-def1234"
// generateId('hosting') -> "hosting-m5x2xyz-ghi5678"
```

---

## Migrations

To run migrations, use the Neon MCP tools or the Neon Console.

### Adding a new column

```sql
ALTER TABLE "Invoice" ADD COLUMN "paidAt" TIMESTAMP WITH TIME ZONE;
```

### Adding a new table

```sql
CREATE TABLE "NewTable" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## Querying with Neon Serverless

```typescript
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

// Select all
const invoices = await sql`SELECT * FROM "Invoice" ORDER BY "createdAt" DESC`

// Select by ID
const invoice = await sql`SELECT * FROM "Invoice" WHERE "id" = ${id}`

// Insert
await sql`
  INSERT INTO "Invoice" ("id", "invoiceNumber", "invoiceDate", "dueDate", "companyName")
  VALUES (${id}, ${number}, ${date}, ${dueDate}, ${company})
  RETURNING *
`

// Update
await sql`
  UPDATE "Invoice"
  SET "status" = ${status}, "updatedAt" = NOW()
  WHERE "id" = ${id}
  RETURNING *
`

// Delete
await sql`DELETE FROM "Invoice" WHERE "id" = ${id} RETURNING "id"`
```

---

## Backup & Recovery

Neon provides:
- **Point-in-time recovery**: Restore to any point in the last 7 days (free tier)
- **Branching**: Create database branches for testing
- **History retention**: 6 hours on free tier

To create a backup branch:
```
Neon Console -> Project -> Branches -> Create Branch
```

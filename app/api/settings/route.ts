import { NextRequest, NextResponse } from 'next/server'
import { sql, generateId } from '@/lib/db'

/**
 * Settings API Routes
 *
 * Handles GET (retrieve settings) and PUT (update settings) operations.
 * Settings are stored as key-value pairs in the Settings table.
 */

export interface SettingsData {
  // Company/Profile Settings
  companyName: string
  companyAddress: string
  companyCity: string
  companyPhone: string
  companyEmail: string
  companyWebsite: string
  companyLogo: string

  // Invoice Defaults
  defaultTaxRate: number
  defaultTerms: string
  defaultNotes: string
  invoicePrefix: string
  invoiceStartNumber: number

  // Payment Methods (enabled/disabled + details)
  paypalEnabled: boolean
  paypalEmail: string
  venmoEnabled: boolean
  venmoUsername: string
  cashappEnabled: boolean
  cashappUsername: string
  zelleEnabled: boolean
  zelleEmail: string
  zellePhone: string
  checkEnabled: boolean
  checkPayableTo: string
  checkMailingAddress: string

  // Email Settings
  emailSignature: string
  replyToEmail: string
  sendCopyToSelf: boolean

  // Notification Settings
  notifyOnNewContact: boolean
  notifyOnInvoicePaid: boolean
  notifyOnNewClient: boolean
  notificationEmail: string

  // Appearance
  theme: 'light' | 'dark' | 'system'
  accentColor: string

  // System
  lastBackup: string | null
  autoBackupEnabled: boolean
}

const defaultSettings: SettingsData = {
  // Company/Profile Settings
  companyName: 'AP Designs',
  companyAddress: '',
  companyCity: 'Stockton, CA',
  companyPhone: '(209) 470-2061',
  companyEmail: 'contact@aaronaperez.dev',
  companyWebsite: 'aaronaperez.dev',
  companyLogo: '/AP-Designs-Logo-Indigo-ElectricBlue.webp',

  // Invoice Defaults
  defaultTaxRate: 0,
  defaultTerms: 'Payment is due within 30 days of invoice date. Late payments may incur additional fees.',
  defaultNotes: 'Thank you for your business! Debit cards accepted via PayPal, Venmo, or Cash App.',
  invoicePrefix: 'INV',
  invoiceStartNumber: 1001,

  // Payment Methods
  paypalEnabled: true,
  paypalEmail: 'aaron@aaronaperez.dev',
  venmoEnabled: true,
  venmoUsername: '@AaronAPerez',
  cashappEnabled: true,
  cashappUsername: '$AaronAPerez',
  zelleEnabled: true,
  zelleEmail: 'aaron@aaronaperez.dev',
  zellePhone: '(209) 470-2061',
  checkEnabled: true,
  checkPayableTo: 'Aaron Perez',
  checkMailingAddress: 'Stockton, CA',

  // Email Settings
  emailSignature: 'Best regards,\nAaron Perez\nAP Designs',
  replyToEmail: 'contact@aaronaperez.dev',
  sendCopyToSelf: true,

  // Notification Settings
  notifyOnNewContact: true,
  notifyOnInvoicePaid: true,
  notifyOnNewClient: true,
  notificationEmail: 'contact@aaronaperez.dev',

  // Appearance
  theme: 'dark',
  accentColor: '#0ea5e9',

  // System
  lastBackup: null,
  autoBackupEnabled: false,
}

// GET /api/settings - Retrieve all settings
export async function GET() {
  try {
    const result = await sql`
      SELECT "key", "value" FROM "Settings"
    `

    // Build settings object from database rows
    const settings: Record<string, unknown> = { ...defaultSettings }

    for (const row of result) {
      try {
        // Try to parse JSON values
        settings[row.key] = JSON.parse(row.value)
      } catch {
        // If not JSON, use string value
        settings[row.key] = row.value
      }
    }

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error fetching settings:', error)
    // Return defaults if table doesn't exist or error occurs
    return NextResponse.json(defaultSettings)
  }
}

// PUT /api/settings - Update settings
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()

    // Upsert each setting
    for (const [key, value] of Object.entries(data)) {
      const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value)

      await sql`
        INSERT INTO "Settings" ("id", "key", "value", "updatedAt")
        VALUES (${generateId('set')}, ${key}, ${stringValue}, NOW())
        ON CONFLICT ("key") DO UPDATE SET
          "value" = ${stringValue},
          "updatedAt" = NOW()
      `
    }

    return NextResponse.json({ success: true, message: 'Settings updated successfully' })
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json(
      { error: 'Failed to update settings', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

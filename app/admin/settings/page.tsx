'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import toast, { Toaster } from 'react-hot-toast'

// Settings data interface matching the API
interface SettingsData {
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

  // Payment Methods
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

// Tab configuration
type TabId = 'profile' | 'invoice' | 'payments' | 'email' | 'notifications' | 'appearance' | 'security' | 'system'

interface Tab {
  id: TabId
  label: string
  icon: string
}

const tabs: Tab[] = [
  { id: 'profile', label: 'Profile', icon: '🏢' },
  { id: 'invoice', label: 'Invoice', icon: '📄' },
  { id: 'payments', label: 'Payments', icon: '💳' },
  { id: 'email', label: 'Email', icon: '📧' },
  { id: 'notifications', label: 'Notifications', icon: '🔔' },
  { id: 'appearance', label: 'Appearance', icon: '🎨' },
  { id: 'security', label: 'Security', icon: '🔒' },
  { id: 'system', label: 'System', icon: '⚙️' },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('profile')
  const [settings, setSettings] = useState<SettingsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  // Migration states
  const [migrationStatus, setMigrationStatus] = useState<Record<string, boolean>>({})
  const [isRunningMigration, setIsRunningMigration] = useState<string | null>(null)

  // Load settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch('/api/settings')
        if (response.ok) {
          const data = await response.json()
          setSettings(data)
        }
      } catch (error) {
        console.error('Failed to load settings:', error)
        toast.error('Failed to load settings')
      } finally {
        setIsLoading(false)
      }
    }
    loadSettings()
  }, [])

  // Check migration status on mount
  useEffect(() => {
    const checkMigrations = async () => {
      const endpoints = [
        { key: 'settings', url: '/api/settings/migrate' },
        { key: 'projects', url: '/api/projects/migrate' },
        { key: 'invoices', url: '/api/invoices/migrate' },
      ]

      const status: Record<string, boolean> = {}

      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint.url)
          const data = await response.json()
          status[endpoint.key] = !data.needsMigration && !data.missingColumns?.length
        } catch {
          status[endpoint.key] = false
        }
      }

      setMigrationStatus(status)
    }
    checkMigrations()
  }, [])

  // Update a single setting
  const updateSetting = useCallback(<K extends keyof SettingsData>(key: K, value: SettingsData[K]) => {
    setSettings(prev => prev ? { ...prev, [key]: value } : null)
    setHasChanges(true)
  }, [])

  // Save all settings
  const saveSettings = async () => {
    if (!settings) return

    setIsSaving(true)
    const toastId = toast.loading('Saving settings...')

    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        toast.success('Settings saved successfully', { id: toastId, duration: 3000 })
        setHasChanges(false)
      } else {
        throw new Error('Failed to save settings')
      }
    } catch (error) {
      console.error('Error saving settings:', error)
      toast.error('Failed to save settings', { id: toastId })
    } finally {
      setIsSaving(false)
    }
  }

  // Run a migration
  const runMigration = async (key: string, url: string) => {
    setIsRunningMigration(key)
    const toastId = toast.loading(`Running ${key} migration...`)

    try {
      const response = await fetch(url, { method: 'POST' })
      const data = await response.json()

      if (response.ok) {
        toast.success(data.message || `${key} migration completed`, { id: toastId, duration: 3000 })
        setMigrationStatus(prev => ({ ...prev, [key]: true }))
      } else {
        throw new Error(data.error || 'Migration failed')
      }
    } catch (error) {
      console.error(`Error running ${key} migration:`, error)
      toast.error(`Failed to run ${key} migration`, { id: toastId })
    } finally {
      setIsRunningMigration(null)
    }
  }

  // Change password
  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setIsChangingPassword(true)
    const toastId = toast.loading('Changing password...')

    try {
      const response = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      if (response.ok) {
        toast.success('Password changed successfully', { id: toastId, duration: 3000 })
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      } else {
        const data = await response.json()
        throw new Error(data.error || 'Failed to change password')
      }
    } catch (error) {
      console.error('Error changing password:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to change password', { id: toastId })
    } finally {
      setIsChangingPassword(false)
    }
  }

  // Common input styles
  const inputClass = "w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
  const labelClass = "block text-sm font-medium text-gray-300 mb-1"
  const sectionClass = "space-y-4"
  const sectionTitleClass = "text-lg font-semibold text-white border-b border-gray-700 pb-2 mb-4"

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading settings...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Settings</h1>
            <p className="mt-1 text-sm text-gray-400">
              Manage your application settings and preferences
            </p>
          </div>
          {hasChanges && (
            <Button
              onClick={saveSettings}
              disabled={isSaving}
              className="bg-cyan-600 hover:bg-cyan-700"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          )}
        </div>

        {/* Tabs and Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:w-56 flex-shrink-0">
            <Card className="p-2 bg-gray-900/50 border-gray-800">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                      activeTab === tab.id
                        ? 'bg-cyan-600/20 text-cyan-400 border-l-2 border-cyan-500'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <Card className="p-6 bg-gray-900/50 border-gray-800">
              {/* Profile Tab */}
              {activeTab === 'profile' && settings && (
                <div className={sectionClass}>
                  <h2 className={sectionTitleClass}>Company Profile</h2>
                  <p className="text-gray-400 text-sm mb-6">
                    This information appears on invoices and client communications.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Company Name</label>
                      <input
                        type="text"
                        value={settings.companyName}
                        onChange={(e) => updateSetting('companyName', e.target.value)}
                        className={inputClass}
                        placeholder="Your Company Name"
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Website</label>
                      <input
                        type="text"
                        value={settings.companyWebsite}
                        onChange={(e) => updateSetting('companyWebsite', e.target.value)}
                        className={inputClass}
                        placeholder="yourwebsite.com"
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Email</label>
                      <input
                        type="email"
                        value={settings.companyEmail}
                        onChange={(e) => updateSetting('companyEmail', e.target.value)}
                        className={inputClass}
                        placeholder="contact@example.com"
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Phone</label>
                      <input
                        type="tel"
                        value={settings.companyPhone}
                        onChange={(e) => updateSetting('companyPhone', e.target.value)}
                        className={inputClass}
                        placeholder="(555) 555-5555"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className={labelClass}>Address</label>
                      <input
                        type="text"
                        value={settings.companyAddress}
                        onChange={(e) => updateSetting('companyAddress', e.target.value)}
                        className={inputClass}
                        placeholder="123 Main Street"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className={labelClass}>City, State ZIP</label>
                      <input
                        type="text"
                        value={settings.companyCity}
                        onChange={(e) => updateSetting('companyCity', e.target.value)}
                        className={inputClass}
                        placeholder="City, ST 12345"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className={labelClass}>Logo URL</label>
                      <input
                        type="text"
                        value={settings.companyLogo}
                        onChange={(e) => updateSetting('companyLogo', e.target.value)}
                        className={inputClass}
                        placeholder="/logo.png"
                      />
                      {settings.companyLogo && (
                        <div className="mt-2 p-4 bg-gray-800 rounded-lg inline-block">
                          <img
                            src={settings.companyLogo}
                            alt="Company Logo Preview"
                            className="h-16 w-auto object-contain"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Invoice Tab */}
              {activeTab === 'invoice' && settings && (
                <div className={sectionClass}>
                  <h2 className={sectionTitleClass}>Invoice Defaults</h2>
                  <p className="text-gray-400 text-sm mb-6">
                    Default values used when creating new invoices.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Invoice Prefix</label>
                      <input
                        type="text"
                        value={settings.invoicePrefix}
                        onChange={(e) => updateSetting('invoicePrefix', e.target.value)}
                        className={inputClass}
                        placeholder="INV"
                      />
                      <p className="text-xs text-gray-500 mt-1">e.g., INV-2025-0001</p>
                    </div>

                    <div>
                      <label className={labelClass}>Starting Number</label>
                      <input
                        type="number"
                        value={settings.invoiceStartNumber}
                        onChange={(e) => updateSetting('invoiceStartNumber', parseInt(e.target.value) || 1)}
                        className={inputClass}
                        min={1}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Default Tax Rate (%)</label>
                      <input
                        type="number"
                        value={settings.defaultTaxRate}
                        onChange={(e) => updateSetting('defaultTaxRate', parseFloat(e.target.value) || 0)}
                        className={inputClass}
                        min={0}
                        max={100}
                        step={0.1}
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className={labelClass}>Default Terms</label>
                    <textarea
                      value={settings.defaultTerms}
                      onChange={(e) => updateSetting('defaultTerms', e.target.value)}
                      className={`${inputClass} min-h-[100px]`}
                      placeholder="Payment terms..."
                    />
                  </div>

                  <div className="mt-4">
                    <label className={labelClass}>Default Notes</label>
                    <textarea
                      value={settings.defaultNotes}
                      onChange={(e) => updateSetting('defaultNotes', e.target.value)}
                      className={`${inputClass} min-h-[100px]`}
                      placeholder="Thank you message..."
                    />
                  </div>
                </div>
              )}

              {/* Payments Tab */}
              {activeTab === 'payments' && settings && (
                <div className={sectionClass}>
                  <h2 className={sectionTitleClass}>Payment Methods</h2>
                  <p className="text-gray-400 text-sm mb-6">
                    Configure payment options that appear on your invoices.
                  </p>

                  <div className="space-y-6">
                    {/* PayPal */}
                    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">💰</span>
                          <span className="font-medium text-white">PayPal</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.paypalEnabled}
                            onChange={(e) => updateSetting('paypalEnabled', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-cyan-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                        </label>
                      </div>
                      {settings.paypalEnabled && (
                        <input
                          type="email"
                          value={settings.paypalEmail}
                          onChange={(e) => updateSetting('paypalEmail', e.target.value)}
                          className={inputClass}
                          placeholder="paypal@example.com"
                        />
                      )}
                    </div>

                    {/* Venmo */}
                    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">📱</span>
                          <span className="font-medium text-white">Venmo</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.venmoEnabled}
                            onChange={(e) => updateSetting('venmoEnabled', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-cyan-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                        </label>
                      </div>
                      {settings.venmoEnabled && (
                        <input
                          type="text"
                          value={settings.venmoUsername}
                          onChange={(e) => updateSetting('venmoUsername', e.target.value)}
                          className={inputClass}
                          placeholder="@username"
                        />
                      )}
                    </div>

                    {/* Cash App */}
                    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">💵</span>
                          <span className="font-medium text-white">Cash App</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.cashappEnabled}
                            onChange={(e) => updateSetting('cashappEnabled', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-cyan-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                        </label>
                      </div>
                      {settings.cashappEnabled && (
                        <input
                          type="text"
                          value={settings.cashappUsername}
                          onChange={(e) => updateSetting('cashappUsername', e.target.value)}
                          className={inputClass}
                          placeholder="$cashtag"
                        />
                      )}
                    </div>

                    {/* Zelle */}
                    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">🏦</span>
                          <span className="font-medium text-white">Zelle</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.zelleEnabled}
                            onChange={(e) => updateSetting('zelleEnabled', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-cyan-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                        </label>
                      </div>
                      {settings.zelleEnabled && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="email"
                            value={settings.zelleEmail}
                            onChange={(e) => updateSetting('zelleEmail', e.target.value)}
                            className={inputClass}
                            placeholder="Zelle email"
                          />
                          <input
                            type="tel"
                            value={settings.zellePhone}
                            onChange={(e) => updateSetting('zellePhone', e.target.value)}
                            className={inputClass}
                            placeholder="Zelle phone"
                          />
                        </div>
                      )}
                    </div>

                    {/* Check */}
                    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">📝</span>
                          <span className="font-medium text-white">Check</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.checkEnabled}
                            onChange={(e) => updateSetting('checkEnabled', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-cyan-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                        </label>
                      </div>
                      {settings.checkEnabled && (
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={settings.checkPayableTo}
                            onChange={(e) => updateSetting('checkPayableTo', e.target.value)}
                            className={inputClass}
                            placeholder="Make check payable to..."
                          />
                          <input
                            type="text"
                            value={settings.checkMailingAddress}
                            onChange={(e) => updateSetting('checkMailingAddress', e.target.value)}
                            className={inputClass}
                            placeholder="Mailing address"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Email Tab */}
              {activeTab === 'email' && settings && (
                <div className={sectionClass}>
                  <h2 className={sectionTitleClass}>Email Settings</h2>
                  <p className="text-gray-400 text-sm mb-6">
                    Configure email preferences for invoice delivery.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className={labelClass}>Reply-To Email</label>
                      <input
                        type="email"
                        value={settings.replyToEmail}
                        onChange={(e) => updateSetting('replyToEmail', e.target.value)}
                        className={inputClass}
                        placeholder="reply@example.com"
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Email Signature</label>
                      <textarea
                        value={settings.emailSignature}
                        onChange={(e) => updateSetting('emailSignature', e.target.value)}
                        className={`${inputClass} min-h-[120px]`}
                        placeholder="Best regards,&#10;Your Name"
                      />
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                      <input
                        type="checkbox"
                        id="sendCopyToSelf"
                        checked={settings.sendCopyToSelf}
                        onChange={(e) => updateSetting('sendCopyToSelf', e.target.checked)}
                        className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-cyan-500 focus:ring-cyan-500"
                      />
                      <label htmlFor="sendCopyToSelf" className="text-gray-300">
                        Send a copy of all emails to myself
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && settings && (
                <div className={sectionClass}>
                  <h2 className={sectionTitleClass}>Notification Preferences</h2>
                  <p className="text-gray-400 text-sm mb-6">
                    Choose which events trigger email notifications.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className={labelClass}>Notification Email</label>
                      <input
                        type="email"
                        value={settings.notificationEmail}
                        onChange={(e) => updateSetting('notificationEmail', e.target.value)}
                        className={inputClass}
                        placeholder="notifications@example.com"
                      />
                    </div>

                    <div className="space-y-3 mt-6">
                      <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                        <input
                          type="checkbox"
                          id="notifyOnNewContact"
                          checked={settings.notifyOnNewContact}
                          onChange={(e) => updateSetting('notifyOnNewContact', e.target.checked)}
                          className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-cyan-500 focus:ring-cyan-500"
                        />
                        <div>
                          <label htmlFor="notifyOnNewContact" className="text-gray-200 font-medium">
                            New Contact Form Submission
                          </label>
                          <p className="text-sm text-gray-500">Receive an email when someone fills out the contact form</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                        <input
                          type="checkbox"
                          id="notifyOnInvoicePaid"
                          checked={settings.notifyOnInvoicePaid}
                          onChange={(e) => updateSetting('notifyOnInvoicePaid', e.target.checked)}
                          className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-cyan-500 focus:ring-cyan-500"
                        />
                        <div>
                          <label htmlFor="notifyOnInvoicePaid" className="text-gray-200 font-medium">
                            Invoice Paid
                          </label>
                          <p className="text-sm text-gray-500">Receive an email when an invoice is marked as paid</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                        <input
                          type="checkbox"
                          id="notifyOnNewClient"
                          checked={settings.notifyOnNewClient}
                          onChange={(e) => updateSetting('notifyOnNewClient', e.target.checked)}
                          className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-cyan-500 focus:ring-cyan-500"
                        />
                        <div>
                          <label htmlFor="notifyOnNewClient" className="text-gray-200 font-medium">
                            New Client Added
                          </label>
                          <p className="text-sm text-gray-500">Receive an email when a new client is created</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Tab */}
              {activeTab === 'appearance' && settings && (
                <div className={sectionClass}>
                  <h2 className={sectionTitleClass}>Appearance</h2>
                  <p className="text-gray-400 text-sm mb-6">
                    Customize the look and feel of the admin panel.
                  </p>

                  <div className="space-y-6">
                    <div>
                      <label className={labelClass}>Theme</label>
                      <div className="flex gap-4 mt-2">
                        {['light', 'dark', 'system'].map((theme) => (
                          <button
                            key={theme}
                            onClick={() => updateSetting('theme', theme as 'light' | 'dark' | 'system')}
                            className={`px-4 py-2 rounded-lg border transition-all ${
                              settings.theme === theme
                                ? 'bg-cyan-600 border-cyan-500 text-white'
                                : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'
                            }`}
                          >
                            {theme === 'light' && '☀️ Light'}
                            {theme === 'dark' && '🌙 Dark'}
                            {theme === 'system' && '💻 System'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Accent Color</label>
                      <div className="flex items-center gap-4 mt-2">
                        <input
                          type="color"
                          value={settings.accentColor}
                          onChange={(e) => updateSetting('accentColor', e.target.value)}
                          className="w-12 h-12 rounded-lg border border-gray-700 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={settings.accentColor}
                          onChange={(e) => updateSetting('accentColor', e.target.value)}
                          className={`${inputClass} w-32`}
                          placeholder="#0ea5e9"
                        />
                        <div
                          className="px-4 py-2 rounded-lg text-white font-medium"
                          style={{ backgroundColor: settings.accentColor }}
                        >
                          Preview
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className={sectionClass}>
                  <h2 className={sectionTitleClass}>Security Settings</h2>
                  <p className="text-gray-400 text-sm mb-6">
                    Manage your admin password and security options.
                  </p>

                  <div className="max-w-md space-y-4">
                    <div>
                      <label className={labelClass}>Current Password</label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className={inputClass}
                        placeholder="••••••••"
                      />
                    </div>

                    <div>
                      <label className={labelClass}>New Password</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className={inputClass}
                        placeholder="••••••••"
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Confirm New Password</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={inputClass}
                        placeholder="••••••••"
                      />
                    </div>

                    <Button
                      onClick={handleChangePassword}
                      disabled={isChangingPassword || !currentPassword || !newPassword || !confirmPassword}
                      className="mt-4"
                    >
                      {isChangingPassword ? 'Changing...' : 'Change Password'}
                    </Button>
                  </div>
                </div>
              )}

              {/* System Tab */}
              {activeTab === 'system' && (
                <div className={sectionClass}>
                  <h2 className={sectionTitleClass}>System Tools</h2>
                  <p className="text-gray-400 text-sm mb-6">
                    Database migrations and system maintenance.
                  </p>

                  <div className="space-y-6">
                    {/* Database Migrations */}
                    <div>
                      <h3 className="text-md font-medium text-white mb-4">Database Migrations</h3>
                      <div className="space-y-3">
                        {[
                          { key: 'settings', label: 'Settings Table', url: '/api/settings/migrate' },
                          { key: 'projects', label: 'Projects Table', url: '/api/projects/migrate' },
                          { key: 'invoices', label: 'Invoices Table', url: '/api/invoices/migrate' },
                        ].map((migration) => (
                          <div
                            key={migration.key}
                            className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                          >
                            <div className="flex items-center gap-3">
                              <span className={`w-3 h-3 rounded-full ${
                                migrationStatus[migration.key] ? 'bg-green-500' : 'bg-yellow-500'
                              }`}></span>
                              <span className="text-gray-200">{migration.label}</span>
                              <span className="text-xs text-gray-500">
                                {migrationStatus[migration.key] ? 'Up to date' : 'Needs migration'}
                              </span>
                            </div>
                            <Button
                              onClick={() => runMigration(migration.key, migration.url)}
                              disabled={isRunningMigration === migration.key}
                              variant="outline"
                              className="text-sm"
                            >
                              {isRunningMigration === migration.key ? 'Running...' : 'Run Migration'}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Run All Migrations */}
                    <div className="pt-4 border-t border-gray-700">
                      <Button
                        onClick={async () => {
                          const migrations = [
                            { key: 'settings', url: '/api/settings/migrate' },
                            { key: 'projects', url: '/api/projects/migrate' },
                            { key: 'invoices', url: '/api/invoices/migrate' },
                          ]
                          for (const m of migrations) {
                            await runMigration(m.key, m.url)
                          }
                        }}
                        disabled={isRunningMigration !== null}
                        className="bg-cyan-600 hover:bg-cyan-700"
                      >
                        Run All Migrations
                      </Button>
                    </div>

                    {/* System Info */}
                    <div className="mt-8 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                      <h3 className="text-md font-medium text-white mb-3">System Information</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Framework:</span>
                          <span className="text-gray-300 ml-2">Next.js 16</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Database:</span>
                          <span className="text-gray-300 ml-2">Neon PostgreSQL</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Environment:</span>
                          <span className="text-gray-300 ml-2">{process.env.NODE_ENV || 'development'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Floating Save Button (mobile) */}
        {hasChanges && (
          <div className="fixed bottom-6 right-6 lg:hidden">
            <Button
              onClick={saveSettings}
              disabled={isSaving}
              className="bg-cyan-600 hover:bg-cyan-700 shadow-lg"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        )}
      </div>
    </>
  )
}

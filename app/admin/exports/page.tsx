'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Tooltip from '@/components/admin/Tooltip'

type ExportType = 'messages' | 'waitlist' | 'blog' | 'analytics'
type ExportFormat = 'csv' | 'sheets'

interface ExportStatus {
  type: ExportType
  status: 'idle' | 'loading' | 'success' | 'error'
  message?: string
}

export default function ExportsPage() {
  const [exportStatuses, setExportStatuses] = useState<Record<ExportType, ExportStatus>>({
    messages: { type: 'messages', status: 'idle' },
    waitlist: { type: 'waitlist', status: 'idle' },
    blog: { type: 'blog', status: 'idle' },
    analytics: { type: 'analytics', status: 'idle' },
  })

  const handleExport = async (type: ExportType, format: ExportFormat) => {
    setExportStatuses(prev => ({
      ...prev,
      [type]: { type, status: 'loading' }
    }))

    try {
      const endpoints: Record<ExportType, string> = {
        messages: '/api/admin/messages/export',
        waitlist: '/api/admin/waitlist/export',
        blog: '/api/admin/blog/export',
        analytics: '/api/admin/analytics/export',
      }

      const response = await fetch(`${endpoints[type]}?format=${format}`)

      if (!response.ok) {
        throw new Error('Export failed')
      }

      if (format === 'csv') {
        // Download CSV file
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${type}-${new Date().toISOString()}.csv`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)

        setExportStatuses(prev => ({
          ...prev,
          [type]: { type, status: 'success', message: 'CSV downloaded successfully!' }
        }))
      } else {
        // Google Sheets export
        const data = await response.json()
        setExportStatuses(prev => ({
          ...prev,
          [type]: { type, status: 'success', message: data.message || 'Exported to Google Sheets!' }
        }))
      }

      // Reset status after 3 seconds
      setTimeout(() => {
        setExportStatuses(prev => ({
          ...prev,
          [type]: { type, status: 'idle' }
        }))
      }, 3000)
    } catch (error) {
      setExportStatuses(prev => ({
        ...prev,
        [type]: { type, status: 'error', message: 'Export failed. Please try again.' }
      }))

      setTimeout(() => {
        setExportStatuses(prev => ({
          ...prev,
          [type]: { type, status: 'idle' }
        }))
      }, 3000)
    }
  }

  const exportCards = [
    {
      type: 'messages' as ExportType,
      title: 'Contact Messages',
      description: 'Export all contact form submissions from departments',
      icon: '💬',
      color: 'from-primary-600 to-primary-700',
      tooltip: 'Includes name, email, department, message, and status',
    },
    {
      type: 'waitlist' as ExportType,
      title: 'Waitlist Entries',
      description: 'Export Hacienda Consuelo retreat signup data',
      icon: '📋',
      color: 'from-warrior-gold to-warrior-amber',
      tooltip: 'Includes contact info, interests, and preferences',
    },
    {
      type: 'blog' as ExportType,
      title: 'Blog Posts',
      description: 'Export all blog articles and metadata',
      icon: '📝',
      color: 'from-earth-600 to-earth-700',
      tooltip: 'Includes title, author, status, category, and tags',
    },
    {
      type: 'analytics' as ExportType,
      title: 'Analytics Data',
      description: 'Export website traffic and performance metrics',
      icon: '📊',
      color: 'from-warrior-amber to-warrior-gold',
      tooltip: 'Includes page views, form submissions, and trends',
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-earth-900">Export Data</h1>
          <p className="mt-1 text-sm text-earth-500">
            Export your data to CSV or Google Sheets for backup, analysis, or CRM integration.
          </p>
        </div>
      </div>

      {/* Google Sheets Setup Notice */}
      <Card className="bg-linear-to-r from-earth-50 to-earth-100 border-earth-200">
        <div className="flex items-start">
          <div className="shrink-0">
            <span className="text-3xl">📘</span>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-earth-900">Google Sheets Setup Required</h3>
            <p className="mt-1 text-sm text-earth-700">
              To use Google Sheets export, you need to configure your service account credentials.
            </p>
            <a
              href="/GOOGLE-SHEETS-SETUP.md"
              target="_blank"
              className="mt-2 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              View Setup Guide →
            </a>
          </div>
        </div>
      </Card>

      {/* Export Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {exportCards.map((card) => {
          const status = exportStatuses[card.type]
          return (
            <Card key={card.type} className="hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-12 h-12 bg-linear-to-br ${card.color} rounded-lg mr-4`}
                  >
                    <span className="text-2xl">{card.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-earth-900">{card.title}</h3>
                    <p className="text-sm text-earth-500">{card.description}</p>
                  </div>
                </div>
                <Tooltip content={card.tooltip}>
                  <span className="text-sm text-earth-400">ℹ️</span>
                </Tooltip>
              </div>

              {/* Status Message */}
              {status.status !== 'idle' && (
                <div
                  className={`mb-4 p-3 rounded-lg text-sm ${
                    status.status === 'loading'
                      ? 'bg-earth-100 text-earth-700 border border-earth-300'
                      : status.status === 'success'
                      ? 'bg-warrior-gold/10 text-earth-900 border border-warrior-gold/30'
                      : 'bg-primary-50 text-primary-700 border border-primary-200'
                  }`}
                >
                  {status.status === 'loading' && '⏳ Exporting...'}
                  {status.status === 'success' && `✅ ${status.message}`}
                  {status.status === 'error' && `❌ ${status.message}`}
                </div>
              )}

              {/* Export Buttons */}
              <div className="flex gap-3">
                <Tooltip content="Download as CSV file">
                  <Button
                    onClick={() => handleExport(card.type, 'csv')}
                    disabled={status.status === 'loading'}
                    variant="outline"
                    className="flex-1"
                  >
                    {status.status === 'loading' ? (
                      <span>Exporting...</span>
                    ) : (
                      <>
                        <span className="mr-2">📥</span>
                        Download CSV
                      </>
                    )}
                  </Button>
                </Tooltip>
                <Tooltip content="Export directly to Google Sheets">
                  <Button
                    onClick={() => handleExport(card.type, 'sheets')}
                    disabled={status.status === 'loading'}
                    className="flex-1"
                  >
                    {status.status === 'loading' ? (
                      <span>Exporting...</span>
                    ) : (
                      <>
                        <span className="mr-2">📊</span>
                        Export to Sheets
                      </>
                    )}
                  </Button>
                </Tooltip>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Export Options Info */}
      <Card>
        <h3 className="text-lg font-semibold text-earth-900 mb-4">Export Options</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-earth-900">📥 CSV Download</h4>
            <p className="text-sm text-earth-600 mt-1">
              Downloads a comma-separated values file that you can open in Excel, Google Sheets, or any spreadsheet software.
              Perfect for one-time exports or offline analysis.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-earth-900">📊 Google Sheets Export</h4>
            <p className="text-sm text-earth-600 mt-1">
              Exports data directly to your configured Google Sheet. Creates or updates a sheet with the latest data.
              Perfect for real-time dashboards, team collaboration, or CRM integration.
            </p>
          </div>
        </div>
      </Card>

      {/* Pro Tips */}
      <Card className="bg-linear-to-r from-primary-700/10 to-warrior-gold/10 border-primary-700/20">
        <div className="flex items-start">
          <div className="shrink-0">
            <span className="text-3xl">💡</span>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-earth-900">Pro Tips</h3>
            <ul className="mt-2 space-y-1 text-sm text-earth-700">
              <li>• Export to Google Sheets for automatic updates and team sharing</li>
              <li>• Use CSV exports for importing into CRM systems like Salesforce or HubSpot</li>
              <li>• Schedule regular exports to keep your backup data fresh</li>
              <li>• Filter data before exporting by using the individual management pages</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}

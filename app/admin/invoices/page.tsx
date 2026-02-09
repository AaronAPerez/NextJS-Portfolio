'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface Invoice {
  id: string
  invoiceNumber: string
  invoiceDate: string
  dueDate: string
  clientName: string
  clientCompany: string
  clientEmail: string
  total: number
  status: 'draft' | 'sent' | 'viewed' | 'paid' | 'overdue'
  sentAt: string | null
  paidAt: string | null
  paidAmount: number | null
  paymentMethod: string | null
  createdAt: string
}

type InvoiceStatus = 'all' | 'draft' | 'sent' | 'paid' | 'overdue'

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState<InvoiceStatus>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  // Fetch invoices
  const fetchInvoices = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/invoices')
      if (response.ok) {
        const data = await response.json()
        // Calculate overdue status for invoices
        const today = new Date()
        const processedInvoices = data.map((inv: Invoice) => {
          if (inv.status === 'sent' && new Date(inv.dueDate) < today) {
            return { ...inv, status: 'overdue' as const }
          }
          return inv
        })
        setInvoices(processedInvoices)
      }
    } catch (error) {
      console.error('Error fetching invoices:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchInvoices()
  }, [fetchInvoices])

  // Update invoice status
  const updateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id)
    try {
      const invoice = invoices.find(inv => inv.id === id)
      if (!invoice) return

      const updates: Record<string, unknown> = { status: newStatus }
      if (newStatus === 'sent' && !invoice.sentAt) {
        updates.sentAt = new Date().toISOString()
      }
      if (newStatus === 'paid') {
        updates.paidAt = new Date().toISOString()
        updates.paidAmount = invoice.total
      }

      const response = await fetch(`/api/invoices/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...invoice, ...updates }),
      })

      if (response.ok) {
        fetchInvoices()
      }
    } catch (error) {
      console.error('Error updating invoice:', error)
    } finally {
      setUpdatingId(null)
    }
  }

  // Filter invoices
  const filteredInvoices = invoices.filter(inv => {
    const matchesStatus = selectedStatus === 'all' || inv.status === selectedStatus
    const matchesSearch = searchQuery === '' ||
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.clientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.clientCompany?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  // Calculate stats
  const stats = {
    total: invoices.length,
    draft: invoices.filter(i => i.status === 'draft').length,
    sent: invoices.filter(i => i.status === 'sent').length,
    paid: invoices.filter(i => i.status === 'paid').length,
    overdue: invoices.filter(i => i.status === 'overdue').length,
    totalRevenue: invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + (i.paidAmount || i.total), 0),
    outstanding: invoices.filter(i => i.status === 'sent' || i.status === 'overdue').reduce((sum, i) => sum + i.total, 0),
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const statusColors: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-700 border-gray-300',
    sent: 'bg-blue-100 text-blue-700 border-blue-300',
    viewed: 'bg-purple-100 text-purple-700 border-purple-300',
    paid: 'bg-green-100 text-green-700 border-green-300',
    overdue: 'bg-red-100 text-red-700 border-red-300',
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track and manage all your invoices
          </p>
        </div>
        <Link href="/admin/invoice">
          <Button>+ New Invoice</Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <p className="text-sm text-green-600 font-medium">Total Revenue</p>
          <p className="text-2xl font-bold text-green-700">{formatCurrency(stats.totalRevenue)}</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <p className="text-sm text-blue-600 font-medium">Outstanding</p>
          <p className="text-2xl font-bold text-blue-700">{formatCurrency(stats.outstanding)}</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200">
          <p className="text-sm text-cyan-600 font-medium">Paid Invoices</p>
          <p className="text-2xl font-bold text-cyan-700">{stats.paid}</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <p className="text-sm text-red-600 font-medium">Overdue</p>
          <p className="text-2xl font-bold text-red-700">{stats.overdue}</p>
        </Card>
      </div>

      {/* Status Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-2">
          {(['all', 'draft', 'sent', 'paid', 'overdue'] as const).map((status) => {
            const count = status === 'all' ? stats.total : stats[status]
            return (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedStatus === status
                    ? 'bg-cyan-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
              </button>
            )
          })}
        </div>
      </Card>

      {/* Search */}
      <Card className="p-4">
        <input
          type="text"
          placeholder="Search by invoice number, client name, or company..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </Card>

      {/* Invoices List */}
      {isLoading ? (
        <Card className="p-8 text-center">
          <p className="text-gray-500">Loading invoices...</p>
        </Card>
      ) : filteredInvoices.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-gray-500">No invoices found</p>
          <Link href="/admin/invoice">
            <Button className="mt-4">Create Your First Invoice</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredInvoices.map((invoice) => (
            <Card key={invoice.id} className="p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono font-bold text-gray-900">{invoice.invoiceNumber}</span>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium border ${statusColors[invoice.status]}`}>
                      {invoice.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="font-medium">{invoice.clientName || 'No client'}</span>
                    {invoice.clientCompany && (
                      <>
                        <span className="text-gray-300">|</span>
                        <span>{invoice.clientCompany}</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>Created: {formatDate(invoice.createdAt)}</span>
                    <span>Due: {formatDate(invoice.dueDate)}</span>
                    {invoice.paidAt && <span className="text-green-600">Paid: {formatDate(invoice.paidAt)}</span>}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(invoice.total)}</p>
                    {invoice.status === 'paid' && invoice.paidAmount && invoice.paidAmount !== invoice.total && (
                      <p className="text-sm text-green-600">Paid: {formatCurrency(invoice.paidAmount)}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Status Actions */}
                    {invoice.status === 'draft' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateStatus(invoice.id, 'sent')}
                        disabled={updatingId === invoice.id}
                      >
                        {updatingId === invoice.id ? '...' : 'Mark Sent'}
                      </Button>
                    )}
                    {(invoice.status === 'sent' || invoice.status === 'overdue') && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateStatus(invoice.id, 'paid')}
                        disabled={updatingId === invoice.id}
                        className="text-green-600 hover:bg-green-50"
                      >
                        {updatingId === invoice.id ? '...' : 'Mark Paid'}
                      </Button>
                    )}

                    <Link href={`/admin/invoice?id=${invoice.id}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

interface InvoiceItem {
  id: string
  description: string
  quantity: number
  rate: number
}

interface InvoiceData {
  companyName: string
  companyAddress: string
  companyCity: string
  companyPhone: string
  companyEmail: string
  companyWebsite: string
  invoiceNumber: string
  invoiceDate: string
  dueDate: string
  clientName: string
  clientCompany: string
  clientAddress: string
  clientCity: string
  clientEmail: string
  clientPhone: string
  items: InvoiceItem[]
  notes: string
  terms: string
  taxRate: number
  subtotal: number
  tax: number
  total: number
  savedAt: string
}

export default function PublicInvoicePage() {
  const params = useParams()
  const [invoice, setInvoice] = useState<InvoiceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadInvoice = async () => {
      const id = params.id as string
      if (!id) {
        setError('Invoice ID not provided')
        setLoading(false)
        return
      }

      try {
        // Fetch invoice from API
        const response = await fetch(`/api/invoices/${id}`)
        if (response.ok) {
          const data = await response.json()
          setInvoice({
            ...data,
            invoiceDate: data.invoiceDate?.split('T')[0] || '',
            dueDate: data.dueDate?.split('T')[0] || '',
            taxRate: Number(data.taxRate) || 0,
            subtotal: Number(data.subtotal) || 0,
            tax: Number(data.tax) || 0,
            total: Number(data.total) || 0,
          })
        } else if (response.status === 404) {
          setError('Invoice not found. The link may have expired or been deleted.')
        } else {
          setError('Failed to load invoice')
        }
      } catch (err) {
        console.error('Error loading invoice:', err)
        setError('Failed to load invoice data')
      } finally {
        setLoading(false)
      }
    }

    loadInvoice()
  }, [params.id])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
  }

  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const handlePrint = () => {
    window.print()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading invoice...</div>
      </div>
    )
  }

  if (error || !invoice) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
          <div className="text-6xl mb-4">📄</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Invoice Not Found</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 print:py-0 print:bg-white">
      {/* Print Button - Hidden when printing */}
      <div className="max-w-4xl mx-auto mb-4 px-4 print:hidden">
        <button
          onClick={handlePrint}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2"
        >
          🖨️ Print / Download PDF
        </button>
      </div>

      {/* Invoice Document */}
      <div className="max-w-4xl mx-auto bg-white shadow-xl print:shadow-none print:max-w-none">
        <style jsx global>{`
          @media print {
            @page {
              size: 8.5in 11in;
              margin: 0.5in;
            }
            body {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
          }
        `}</style>

        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8 print:bg-gray-900">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-5">
              <img
                src="/AP-Designs-Logo-Indigo-ElectricBlue.webp"
                alt="Logo"
                className="w-[90px] h-[90px] rounded-xl object-contain"
              />
              <div>
                <h1 className="text-3xl font-bold">{invoice.companyName}</h1>
                <div className="text-gray-200 text-base mt-2 space-y-1 font-medium">
                  <p>{invoice.companyCity}</p>
                  <p>{invoice.companyPhone}</p>
                  <p>{invoice.companyEmail}</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <h2 className="text-4xl font-bold text-cyan-400 mb-4">INVOICE</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-end gap-4">
                  <span className="text-gray-400">Invoice #:</span>
                  <span className="font-semibold">{invoice.invoiceNumber}</span>
                </div>
                <div className="flex justify-end gap-4">
                  <span className="text-gray-400">Date:</span>
                  <span className="font-semibold">{formatDate(invoice.invoiceDate)}</span>
                </div>
                <div className="flex justify-end gap-4">
                  <span className="text-gray-400">Due Date:</span>
                  <span className="font-semibold">{formatDate(invoice.dueDate)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Bill To */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-cyan-400">Bill To</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-cyan-400">
                <p className="font-semibold text-gray-900">{invoice.clientName || 'Client Name'}</p>
                {invoice.clientCompany && <p className="text-gray-600">{invoice.clientCompany}</p>}
                {invoice.clientAddress && <p className="text-gray-600">{invoice.clientAddress}</p>}
                {invoice.clientCity && <p className="text-gray-600">{invoice.clientCity}</p>}
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-cyan-400">
                {invoice.clientEmail && <p className="text-gray-600"><strong>Email:</strong> {invoice.clientEmail}</p>}
                {invoice.clientPhone && <p className="text-gray-600"><strong>Phone:</strong> {invoice.clientPhone}</p>}
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-cyan-400">Services & Items</h3>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="p-3 text-left font-semibold">Description</th>
                  <th className="p-3 text-center font-semibold w-24">Qty</th>
                  <th className="p-3 text-right font-semibold w-32">Rate</th>
                  <th className="p-3 text-right font-semibold w-32">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => (
                  <tr key={item.id} className={`border-b border-gray-200 ${index % 2 === 1 ? 'bg-gray-50' : ''}`}>
                    <td className="p-3">{item.description || '-'}</td>
                    <td className="p-3 text-center">{item.quantity}</td>
                    <td className="p-3 text-right font-mono">{formatCurrency(item.rate)}</td>
                    <td className="p-3 text-right font-semibold font-mono">{formatCurrency(item.quantity * item.rate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div className="w-80 bg-gradient-to-br from-cyan-50 to-indigo-50 p-6 rounded-lg">
              <div className="flex justify-between py-2 border-b border-cyan-200">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-cyan-600 font-semibold font-mono">{formatCurrency(invoice.subtotal)}</span>
              </div>
              {invoice.taxRate > 0 && (
                <div className="flex justify-between py-2 border-b border-cyan-200">
                  <span className="text-gray-600">Tax ({invoice.taxRate}%)</span>
                  <span className="text-cyan-600 font-semibold font-mono">{formatCurrency(invoice.tax)}</span>
                </div>
              )}
              <div className="flex justify-between py-3 text-xl font-bold">
                <span className="text-gray-900">Total</span>
                <span className="text-cyan-600 font-mono">{formatCurrency(invoice.total)}</span>
              </div>
            </div>
          </div>

          {/* Notes & Terms */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b-2 border-cyan-400">Notes</h3>
              <p className="text-gray-600 text-sm">{invoice.notes}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b-2 border-cyan-400">Terms & Conditions</h3>
              <p className="text-gray-600 text-sm">{invoice.terms}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-900 text-white p-6 text-center">
          <h3 className="text-cyan-400 font-semibold mb-2">Thank You for Your Business!</h3>
          <p className="text-gray-400 text-sm">Questions? Contact us at {invoice.companyEmail} | {invoice.companyWebsite}</p>
        </div>
      </div>
    </div>
  )
}

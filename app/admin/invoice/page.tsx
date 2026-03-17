'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { Card } from '@/components/ui/Card'
import InvoiceForm from '@/components/admin/InvoiceForm'

function InvoicePageContent() {
  const searchParams = useSearchParams()
  const invoiceId = searchParams.get('id')

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-earth-900">
            {invoiceId ? 'Edit Invoice' : 'Invoice Generator'}
          </h1>
          <p className="mt-1 text-sm text-earth-500">
            {invoiceId
              ? 'View and edit this invoice'
              : 'Create, edit, and download professional invoices for your clients.'
            }
          </p>
        </div>
      </div>

      {!invoiceId && (
        <Card className="bg-gradient-to-r from-cyan-900/20 to-indigo-900/20 border-cyan-600/30">
          <div className="flex items-start">
            <div className="shrink-0">
              <span className="text-3xl">📋</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-earth-900">How to Use</h3>
              <ul className="mt-2 space-y-1 text-sm text-earth-700">
                <li>1. Fill in your company and client details</li>
                <li>2. Add line items for services or products</li>
                <li>3. Adjust tax rate if applicable</li>
                <li>4. Toggle to Preview Mode to see the final invoice</li>
                <li>5. Click Print or Download PDF to save</li>
              </ul>
            </div>
          </div>
        </Card>
      )}

      {/* Invoice Form */}
      <InvoiceForm initialInvoiceId={invoiceId} />
    </div>
  )
}

export default function InvoicePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading invoice...</div>}>
      <InvoicePageContent />
    </Suspense>
  )
}

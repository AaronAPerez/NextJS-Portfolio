'use client'

import { useState, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/Button'

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
}

const defaultInvoiceData: InvoiceData = {
  companyName: 'AP Designs - Web Development',
  companyAddress: '',
  companyCity: 'Stockton, CA',
  companyPhone: '(209) 470-2061',
  companyEmail: 'contact@aaronaperez.dev',
  companyWebsite: 'aaronaperez.dev',
  invoiceNumber: `INV-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`,
  invoiceDate: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  clientName: '',
  clientCompany: '',
  clientAddress: '',
  clientCity: '',
  clientEmail: '',
  clientPhone: '',
  items: [{ id: '1', description: '', quantity: 1, rate: 0 }],
  notes: 'Thank you for your business!',
  terms: 'Payment is due within 30 days of invoice date. Late payments may incur additional fees.',
  taxRate: 0,
}

export default function InvoiceForm() {
  const [data, setData] = useState<InvoiceData>(defaultInvoiceData)
  const [isEditing, setIsEditing] = useState(true)
  const [linkCopied, setLinkCopied] = useState(false)
  const [invoiceId, setInvoiceId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [savedInvoices, setSavedInvoices] = useState<Array<{ id: string; invoiceNumber: string; clientName: string; total: number; createdAt: string }>>([])

  // Load saved invoices on mount
  useEffect(() => {
    const loadInvoices = async () => {
      try {
        const response = await fetch('/api/invoices')
        if (response.ok) {
          const invoices = await response.json()
          setSavedInvoices(invoices)
        }
      } catch (error) {
        console.error('Failed to load invoices:', error)
      }
    }
    loadInvoices()
  }, [])

  const updateField = useCallback(<K extends keyof InvoiceData>(field: K, value: InvoiceData[K]) => {
    setData(prev => ({ ...prev, [field]: value }))
  }, [])

  const updateItem = useCallback((id: string, field: keyof InvoiceItem, value: string | number) => {
    setData(prev => ({
      ...prev,
      items: prev.items.map(item => item.id === id ? { ...item, [field]: value } : item)
    }))
  }, [])

  const addItem = useCallback(() => {
    setData(prev => ({
      ...prev,
      items: [...prev.items, { id: String(Date.now()), description: '', quantity: 1, rate: 0 }]
    }))
  }, [])

  const removeItem = useCallback((id: string) => {
    setData(prev => ({ ...prev, items: prev.items.filter(item => item.id !== id) }))
  }, [])

  const subtotal = data.items.reduce((sum, item) => sum + item.quantity * item.rate, 0)
  const tax = subtotal * (data.taxRate / 100)
  const total = subtotal + tax

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
  }

  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  // Generate clean print HTML
  const handlePrint = useCallback(() => {
    // Window sized to approximate letter paper proportions (8.5:11 ratio)
    const printWindow = window.open('', '_blank', 'width=850,height=1100,scrollbars=yes')
    if (!printWindow) {
      alert('Please allow popups to print this document')
      return
    }

    const itemsHtml = data.items.map(item => `
      <tr>
        <td>${item.description || '-'}</td>
        <td>${item.quantity}</td>
        <td>${formatCurrency(item.rate)}</td>
        <td>${formatCurrency(item.quantity * item.rate)}</td>
      </tr>
    `).join('')

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Invoice ${data.invoiceNumber}</title>
          <style>
            /* Force Letter paper size (8.5" x 11") */
            @page {
              size: 8.5in 11in !important;
              margin: 0.5in 0.6in;
            }
            /* Fallback for browsers that don't support @page size */
            @media print {
              html {
                width: 8.5in !important;
                height: 11in !important;
              }
              body {
                width: 8.5in !important;
                min-height: 11in !important;
                margin: 0 !important;
                padding: 0.5in 0.6in !important;
              }
            }
            @media print {
              html, body {
                width: 8.5in;
                height: 11in;
              }
            }
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Arial, sans-serif;
              font-size: 11pt;
              line-height: 1.5;
              color: #2d3748;
              background: white;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            /* Header */
            .header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding-bottom: 24px;
              border-bottom: 3px solid #0ea5e9;
              margin-bottom: 24px;
            }
            .company-block { display: flex; align-items: center; gap: 20px; }
            .logo { width: 90px; height: 90px; border-radius: 12px; object-fit: contain; }
            .company-name { font-size: 24pt; font-weight: 700; color: #1e293b; margin-bottom: 6px; letter-spacing: -0.5px; }
            .company-info { color: #475569; font-size: 11pt; line-height: 1.7; font-weight: 500; }
            .invoice-block { text-align: right; }
            .invoice-title { font-size: 36pt; font-weight: 800; color: #0ea5e9; letter-spacing: -1px; }
            .invoice-meta { margin-top: 12px; }
            .invoice-meta .row { display: flex; justify-content: flex-end; gap: 12px; margin: 4px 0; font-size: 10pt; }
            .invoice-meta .label { color: #94a3b8; }
            .invoice-meta .value { font-weight: 600; color: #1e293b; min-width: 100px; text-align: right; }

            /* Bill To Section */
            .bill-to-section { margin-bottom: 24px; }
            .section-header { font-size: 12pt; font-weight: 700; color: #1e293b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; padding-bottom: 6px; border-bottom: 1px solid #e2e8f0; }
            .bill-to-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
            .client-info { background: #f8fafc; padding: 16px; border-radius: 6px; border-left: 3px solid #0ea5e9; }
            .client-name { font-size: 13pt; font-weight: 600; color: #1e293b; margin-bottom: 6px; }
            .client-detail { font-size: 10pt; color: #64748b; line-height: 1.6; }

            /* Table */
            .items-section { margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; }
            thead tr { background: #1e293b; }
            th { padding: 10px 12px; text-align: left; font-weight: 600; color: white; font-size: 10pt; text-transform: uppercase; letter-spacing: 0.3px; }
            th:nth-child(2) { text-align: center; width: 60px; }
            th:nth-child(3), th:nth-child(4) { text-align: right; width: 100px; }
            tbody tr { border-bottom: 1px solid #e2e8f0; }
            tbody tr:nth-child(even) { background: #f8fafc; }
            td { padding: 12px; font-size: 11pt; color: #334155; }
            td:nth-child(2) { text-align: center; }
            td:nth-child(3), td:nth-child(4) { text-align: right; font-family: 'SF Mono', 'Consolas', monospace; }
            td:nth-child(4) { font-weight: 600; }

            /* Totals */
            .totals-wrapper { display: flex; justify-content: flex-end; margin-bottom: 24px; }
            .totals-box { width: 250px; }
            .total-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 11pt; border-bottom: 1px solid #e2e8f0; }
            .total-row:last-child { border-bottom: none; }
            .total-label { color: #64748b; }
            .total-value { font-weight: 600; color: #334155; font-family: 'SF Mono', 'Consolas', monospace; }
            .total-row.grand { background: #0ea5e9; color: white; padding: 12px 16px; margin-top: 10px; border-radius: 6px; font-size: 14pt; }
            .total-row.grand .total-label { color: white; font-weight: 600; }
            .total-row.grand .total-value { color: white; font-weight: 700; }

            /* Notes */
            .notes-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 20px; }
            .notes-box { background: #f8fafc; padding: 16px; border-radius: 6px; }
            .notes-box h4 { font-size: 11pt; font-weight: 600; color: #1e293b; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.3px; }
            .notes-box p { font-size: 10pt; color: #64748b; line-height: 1.6; }

            /* Footer */
            .footer { text-align: center; padding-top: 20px; border-top: 2px solid #e2e8f0; }
            .footer-thanks { font-size: 14pt; font-weight: 600; color: #0ea5e9; margin-bottom: 6px; }
            .footer-contact { font-size: 10pt; color: #94a3b8; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="company-block">
              <img src="${window.location.origin}/AP-Designs-Logo-Indigo-Teal.webp" alt="Logo" class="logo">
              <div>
                <div class="company-name">${data.companyName}</div>
                <div class="company-info">${data.companyCity}<br>${data.companyPhone}<br>${data.companyEmail}</div>
              </div>
            </div>
            <div class="invoice-block">
              <div class="invoice-title">INVOICE</div>
              <div class="invoice-meta">
                <div class="row"><span class="label">Invoice #</span><span class="value">${data.invoiceNumber}</span></div>
                <div class="row"><span class="label">Date</span><span class="value">${formatDate(data.invoiceDate)}</span></div>
                <div class="row"><span class="label">Due Date</span><span class="value">${formatDate(data.dueDate)}</span></div>
              </div>
            </div>
          </div>

          <div class="bill-to-section">
            <div class="section-header">Bill To</div>
            <div class="bill-to-grid">
              <div class="client-info">
                <div class="client-name">${data.clientName || 'Client Name'}</div>
                <div class="client-detail">
                  ${data.clientCompany ? data.clientCompany + '<br>' : ''}
                  ${data.clientAddress ? data.clientAddress + '<br>' : ''}
                  ${data.clientCity || ''}
                </div>
              </div>
              <div class="client-info">
                <div class="client-detail">
                  ${data.clientEmail ? '<strong>Email:</strong> ' + data.clientEmail + '<br>' : ''}
                  ${data.clientPhone ? '<strong>Phone:</strong> ' + data.clientPhone : ''}
                </div>
              </div>
            </div>
          </div>

          <div class="items-section">
            <div class="section-header">Services & Items</div>
            <table>
              <thead><tr><th>Description</th><th>Qty</th><th>Rate</th><th>Amount</th></tr></thead>
              <tbody>${itemsHtml}</tbody>
            </table>
          </div>

          <div class="totals-wrapper">
            <div class="totals-box">
              <div class="total-row"><span class="total-label">Subtotal</span><span class="total-value">${formatCurrency(subtotal)}</span></div>
              ${data.taxRate > 0 ? `<div class="total-row"><span class="total-label">Tax (${data.taxRate}%)</span><span class="total-value">${formatCurrency(tax)}</span></div>` : ''}
              <div class="total-row grand"><span class="total-label">Total Due</span><span class="total-value">${formatCurrency(total)}</span></div>
            </div>
          </div>

          <div class="notes-grid">
            <div class="notes-box"><h4>Notes</h4><p>${data.notes}</p></div>
            <div class="notes-box"><h4>Terms & Conditions</h4><p>${data.terms}</p></div>
          </div>

          <div class="footer">
            <div class="footer-thanks">Thank You for Your Business!</div>
            <div class="footer-contact">${data.companyEmail} | ${data.companyWebsite}</div>
          </div>

          <script>window.onload = function() { window.print(); window.onafterprint = function() { window.close(); }; };</script>
        </body>
      </html>
    `)
    printWindow.document.close()
  }, [data, subtotal, tax, total, formatCurrency, formatDate])

  // Send invoice via email
  const handleSendEmail = useCallback(() => {
    const itemsList = data.items
      .map(item => `  - ${item.description}: ${item.quantity} x ${formatCurrency(item.rate)} = ${formatCurrency(item.quantity * item.rate)}`)
      .join('\n')

    const subject = encodeURIComponent(`Invoice ${data.invoiceNumber} from ${data.companyName}`)
    const body = encodeURIComponent(
`Dear ${data.clientName || 'Client'},

Please find your invoice details below:

INVOICE: ${data.invoiceNumber}
Date: ${formatDate(data.invoiceDate)}
Due Date: ${formatDate(data.dueDate)}

ITEMS:
${itemsList}

Subtotal: ${formatCurrency(subtotal)}
${data.taxRate > 0 ? `Tax (${data.taxRate}%): ${formatCurrency(tax)}\n` : ''}TOTAL DUE: ${formatCurrency(total)}

${data.notes}

${data.terms}

---
${data.companyName}
${data.companyCity}
${data.companyPhone}
${data.companyEmail}
${data.companyWebsite}
`
    )

    const mailtoLink = `mailto:${data.clientEmail}?subject=${subject}&body=${body}`
    window.open(mailtoLink, '_blank')
  }, [data, subtotal, tax, total, formatCurrency, formatDate])

  // Save invoice to database
  const handleSave = useCallback(async () => {
    setIsSaving(true)
    setSaveStatus('saving')

    const invoiceData = {
      ...data,
      subtotal,
      tax,
      total,
    }

    try {
      let response
      if (invoiceId) {
        // Update existing invoice
        response = await fetch(`/api/invoices/${invoiceId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(invoiceData),
        })
      } else {
        // Create new invoice
        response = await fetch('/api/invoices', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(invoiceData),
        })
      }

      if (response.ok) {
        const savedInvoice = await response.json()
        setInvoiceId(savedInvoice.id)
        setSaveStatus('saved')
        // Refresh invoice list
        const listResponse = await fetch('/api/invoices')
        if (listResponse.ok) {
          setSavedInvoices(await listResponse.json())
        }
        setTimeout(() => setSaveStatus('idle'), 2000)
      } else {
        setSaveStatus('error')
      }
    } catch (error) {
      console.error('Failed to save invoice:', error)
      setSaveStatus('error')
    } finally {
      setIsSaving(false)
    }
  }, [data, subtotal, tax, total, invoiceId])

  // Load an existing invoice
  const loadInvoice = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/invoices/${id}`)
      if (response.ok) {
        const invoice = await response.json()
        setData({
          companyName: invoice.companyName,
          companyAddress: invoice.companyAddress || '',
          companyCity: invoice.companyCity || '',
          companyPhone: invoice.companyPhone || '',
          companyEmail: invoice.companyEmail || '',
          companyWebsite: invoice.companyWebsite || '',
          invoiceNumber: invoice.invoiceNumber,
          invoiceDate: invoice.invoiceDate?.split('T')[0] || '',
          dueDate: invoice.dueDate?.split('T')[0] || '',
          clientName: invoice.clientName || '',
          clientCompany: invoice.clientCompany || '',
          clientAddress: invoice.clientAddress || '',
          clientCity: invoice.clientCity || '',
          clientEmail: invoice.clientEmail || '',
          clientPhone: invoice.clientPhone || '',
          items: invoice.items || [],
          notes: invoice.notes || '',
          terms: invoice.terms || '',
          taxRate: Number(invoice.taxRate) || 0,
        })
        setInvoiceId(id)
      }
    } catch (error) {
      console.error('Failed to load invoice:', error)
    }
  }, [])

  // Create new invoice
  const handleNewInvoice = useCallback(() => {
    setData({
      ...defaultInvoiceData,
      invoiceNumber: `INV-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`,
      invoiceDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    })
    setInvoiceId(null)
    setSaveStatus('idle')
  }, [])

  // Generate shareable link (saves to DB first)
  const handleCopyLink = useCallback(async () => {
    setIsSaving(true)

    const invoiceData = {
      ...data,
      subtotal,
      tax,
      total,
    }

    try {
      let id = invoiceId

      // Save to database first
      if (!id) {
        const response = await fetch('/api/invoices', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(invoiceData),
        })
        if (response.ok) {
          const savedInvoice = await response.json()
          id = savedInvoice.id
          setInvoiceId(id)
        }
      } else {
        // Update existing
        await fetch(`/api/invoices/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(invoiceData),
        })
      }

      if (id) {
        // Generate shareable link
        const shareableLink = `${window.location.origin}/invoice/${id}`

        // Copy to clipboard
        await navigator.clipboard.writeText(shareableLink)
        setLinkCopied(true)
        setTimeout(() => setLinkCopied(false), 3000)
      }
    } catch (error) {
      console.error('Failed to save and copy link:', error)
    } finally {
      setIsSaving(false)
    }
  }, [data, subtotal, tax, total, invoiceId])

  return (
    <div className="space-y-6">
      {/* Saved Invoices Bar */}
      {savedInvoices.length > 0 && (
        <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-gray-400 text-sm">Saved Invoices:</span>
            <Button variant="outline" onClick={handleNewInvoice} className="text-sm py-1 px-3">
              + New Invoice
            </Button>
            {savedInvoices.slice(0, 5).map((inv) => (
              <button
                key={inv.id}
                onClick={() => loadInvoice(inv.id)}
                className={`text-sm px-3 py-1 rounded-md transition-colors ${
                  invoiceId === inv.id
                    ? 'bg-cyan-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {inv.invoiceNumber} - {inv.clientName || 'No client'}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-4 border border-gray-700 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Button variant={isEditing ? 'primary' : 'outline'} onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? '✏️ Editing Mode' : '👁️ Preview Mode'}
          </Button>
          <Button
            variant="outline"
            onClick={handleSave}
            disabled={isSaving}
          >
            {saveStatus === 'saving' ? '💾 Saving...' : saveStatus === 'saved' ? '✓ Saved!' : '💾 Save'}
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleSendEmail} disabled={!data.clientEmail}>
            📧 Send Email
          </Button>
          <Button variant="outline" onClick={handleCopyLink}>
            {linkCopied ? '✓ Link Copied!' : '🔗 Copy Link'}
          </Button>
          <Button variant="outline" onClick={handlePrint}>🖨️ Print</Button>
          <Button onClick={handlePrint}>📥 Download PDF</Button>
        </div>
      </div>

      {/* Invoice Preview/Edit */}
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="document-container">
          {/* Header */}
          <div className="document-header bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-5">
                <img src="/AP-Designs-Logo-Indigo-ElectricBlue.webp" alt="AP Designs Logo" className="logo w-[90px] h-[90px] rounded-xl object-contain" />
                <div className="text-left">
                  {isEditing ? (
                    <input type="text" value={data.companyName} onChange={(e) => updateField('companyName', e.target.value)}
                      className="bg-transparent border-b border-cyan-400/50 text-3xl font-bold text-white w-full focus:outline-none focus:border-cyan-400" />
                  ) : (
                    <h1 className="text-3xl font-bold">{data.companyName}</h1>
                  )}
                  <div className="text-gray-200 text-base mt-2 space-y-1 font-medium">
                    {isEditing ? (
                      <>
                        <input type="text" value={data.companyCity} onChange={(e) => updateField('companyCity', e.target.value)}
                          className="bg-transparent border-b border-gray-600 w-full focus:outline-none focus:border-cyan-400" placeholder="City, State" />
                        <input type="text" value={data.companyPhone} onChange={(e) => updateField('companyPhone', e.target.value)}
                          className="bg-transparent border-b border-gray-600 w-full focus:outline-none focus:border-cyan-400" placeholder="Phone" />
                        <input type="email" value={data.companyEmail} onChange={(e) => updateField('companyEmail', e.target.value)}
                          className="bg-transparent border-b border-gray-600 w-full focus:outline-none focus:border-cyan-400" placeholder="Email" />
                      </>
                    ) : (
                      <><p>{data.companyCity}</p><p>{data.companyPhone}</p><p>{data.companyEmail}</p></>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <h2 className="text-4xl font-bold text-cyan-400 mb-4">INVOICE</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-end gap-4">
                    <span className="text-gray-400">Invoice #:</span>
                    {isEditing ? (
                      <input type="text" value={data.invoiceNumber} onChange={(e) => updateField('invoiceNumber', e.target.value)}
                        className="bg-transparent border-b border-gray-600 text-right w-40 focus:outline-none focus:border-cyan-400" />
                    ) : (
                      <span className="font-semibold">{data.invoiceNumber}</span>
                    )}
                  </div>
                  <div className="flex justify-end gap-4">
                    <span className="text-gray-400">Date:</span>
                    {isEditing ? (
                      <input type="date" value={data.invoiceDate} onChange={(e) => updateField('invoiceDate', e.target.value)}
                        className="bg-transparent border-b border-gray-600 text-right w-40 focus:outline-none focus:border-cyan-400" />
                    ) : (
                      <span className="font-semibold">{formatDate(data.invoiceDate)}</span>
                    )}
                  </div>
                  <div className="flex justify-end gap-4">
                    <span className="text-gray-400">Due Date:</span>
                    {isEditing ? (
                      <input type="date" value={data.dueDate} onChange={(e) => updateField('dueDate', e.target.value)}
                        className="bg-transparent border-b border-gray-600 text-right w-40 focus:outline-none focus:border-cyan-400" />
                    ) : (
                      <span className="font-semibold">{formatDate(data.dueDate)}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="document-content p-8">
            {/* Bill To */}
            <div className="section mb-8">
              <h3 className="section-title text-xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-cyan-400">Bill To</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="form-group">
                    <label className="form-label text-sm font-medium text-gray-600">Client Name</label>
                    {isEditing ? (
                      <input type="text" value={data.clientName} onChange={(e) => updateField('clientName', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400" placeholder="John Doe" />
                    ) : (
                      <p className="form-value p-2 bg-gray-50 rounded">{data.clientName || '-'}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="form-label text-sm font-medium text-gray-600">Company</label>
                    {isEditing ? (
                      <input type="text" value={data.clientCompany} onChange={(e) => updateField('clientCompany', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400" placeholder="Company Name" />
                    ) : (
                      <p className="form-value p-2 bg-gray-50 rounded">{data.clientCompany || '-'}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="form-label text-sm font-medium text-gray-600">Address</label>
                    {isEditing ? (
                      <input type="text" value={data.clientAddress} onChange={(e) => updateField('clientAddress', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400" placeholder="123 Main St" />
                    ) : (
                      <p className="form-value p-2 bg-gray-50 rounded">{data.clientAddress || '-'}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="form-group">
                    <label className="form-label text-sm font-medium text-gray-600">City, State ZIP</label>
                    {isEditing ? (
                      <input type="text" value={data.clientCity} onChange={(e) => updateField('clientCity', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400" placeholder="City, State 12345" />
                    ) : (
                      <p className="form-value p-2 bg-gray-50 rounded">{data.clientCity || '-'}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="form-label text-sm font-medium text-gray-600">Email</label>
                    {isEditing ? (
                      <input type="email" value={data.clientEmail} onChange={(e) => updateField('clientEmail', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400" placeholder="client@email.com" />
                    ) : (
                      <p className="form-value p-2 bg-gray-50 rounded">{data.clientEmail || '-'}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="form-label text-sm font-medium text-gray-600">Phone</label>
                    {isEditing ? (
                      <input type="tel" value={data.clientPhone} onChange={(e) => updateField('clientPhone', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400" placeholder="(555) 123-4567" />
                    ) : (
                      <p className="form-value p-2 bg-gray-50 rounded">{data.clientPhone || '-'}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="section mb-8">
              <h3 className="section-title text-xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-cyan-400">Services & Items</h3>
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left font-semibold text-gray-700">Description</th>
                    <th className="p-3 text-center font-semibold text-gray-700 w-24">Qty</th>
                    <th className="p-3 text-right font-semibold text-gray-700 w-32">Rate</th>
                    <th className="p-3 text-right font-semibold text-gray-700 w-32">Amount</th>
                    {isEditing && <th className="p-3 w-12"></th>}
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200">
                      <td className="p-3">
                        {isEditing ? (
                          <input type="text" value={item.description} onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400" placeholder="Service description" />
                        ) : (
                          <span>{item.description || '-'}</span>
                        )}
                      </td>
                      <td className="p-3 text-center">
                        {isEditing ? (
                          <input type="number" min="1" value={item.quantity} onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                            className="w-full p-2 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-cyan-400" />
                        ) : (
                          <span>{item.quantity}</span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        {isEditing ? (
                          <input type="number" min="0" step="0.01" value={item.rate} onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                            className="w-full p-2 border border-gray-300 rounded text-right focus:outline-none focus:ring-2 focus:ring-cyan-400" />
                        ) : (
                          <span>{formatCurrency(item.rate)}</span>
                        )}
                      </td>
                      <td className="p-3 text-right font-semibold">{formatCurrency(item.quantity * item.rate)}</td>
                      {isEditing && (
                        <td className="p-3">
                          {data.items.length > 1 && (
                            <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 p-1">✕</button>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              {isEditing && (
                <button onClick={addItem} className="mt-4 text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-2">
                  <span>+</span> Add Item
                </button>
              )}
            </div>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="totals-section w-80 bg-gradient-to-br from-cyan-50 to-indigo-50 p-6 rounded-lg">
                <div className="total-row flex justify-between py-2 border-b border-cyan-200">
                  <span className="total-label text-gray-600">Subtotal</span>
                  <span className="total-value text-cyan-600 font-semibold">{formatCurrency(subtotal)}</span>
                </div>
                <div className="total-row flex justify-between py-2 border-b border-cyan-200">
                  <span className="total-label text-gray-600 flex items-center gap-2">
                    Tax
                    {isEditing && (
                      <input type="number" min="0" max="100" step="0.1" value={data.taxRate} onChange={(e) => updateField('taxRate', parseFloat(e.target.value) || 0)}
                        className="w-16 p-1 border border-gray-300 rounded text-center text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400" />
                    )}
                    ({data.taxRate}%)
                  </span>
                  <span className="total-value text-cyan-600 font-semibold">{formatCurrency(tax)}</span>
                </div>
                <div className="total-row flex justify-between py-3 text-xl font-bold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-cyan-600">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>

            {/* Notes & Terms */}
            <div className="grid grid-cols-2 gap-8 mt-8">
              <div className="section">
                <h3 className="section-title text-lg font-semibold text-gray-900 mb-3 pb-2 border-b-2 border-cyan-400">Notes</h3>
                {isEditing ? (
                  <textarea value={data.notes} onChange={(e) => updateField('notes', e.target.value)} rows={3}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400" placeholder="Additional notes..." />
                ) : (
                  <p className="text-gray-600 text-sm">{data.notes}</p>
                )}
              </div>
              <div className="section">
                <h3 className="section-title text-lg font-semibold text-gray-900 mb-3 pb-2 border-b-2 border-cyan-400">Terms & Conditions</h3>
                {isEditing ? (
                  <textarea value={data.terms} onChange={(e) => updateField('terms', e.target.value)} rows={3}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400" placeholder="Payment terms..." />
                ) : (
                  <p className="text-gray-600 text-sm">{data.terms}</p>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="document-footer bg-gray-900 text-white p-6 text-center">
            <h3 className="text-cyan-400 font-semibold mb-2">Thank You for Your Business!</h3>
            <p className="text-gray-400 text-sm">Questions? Contact us at {data.companyEmail} | {data.companyWebsite}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

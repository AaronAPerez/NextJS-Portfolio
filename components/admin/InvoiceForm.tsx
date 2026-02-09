'use client'

import { useState, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { PayPalIcon, VenmoIcon

} from '@/components/admin/PaymentIcons'
import ClientSelector from '@/components/admin/ClientSelector'

interface InvoiceItem {
  id: string
  description: string
  quantity: number
  rate: number
}

interface PaymentMethods {
  paypalEnabled: boolean
  paypalEmail: string
  venmoEnabled: boolean
  venmoUsername: string
  cashappEnabled: boolean
  cashappUsername: string
  checkEnabled: boolean
  checkPayableTo: string
  checkMailingAddress: string
  achEnabled: boolean
  bankName: string
  bankAccountName: string
  bankRoutingNumber: string
  bankAccountLast4: string
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
  paymentMethods: PaymentMethods
}

const defaultPaymentMethods: PaymentMethods = {
  paypalEnabled: true,
  paypalEmail: 'aaperez06@gmail.com',
  venmoEnabled: true,
  venmoUsername: 'aaperez06@gmail.com',
  cashappEnabled: true,
  cashappUsername: 'aaperez06@gmail.com',
  checkEnabled: false,
  checkPayableTo: 'Aaron Perez',
  checkMailingAddress: '',
  achEnabled: true,
  bankName: 'Self Help Federal Credit Union',
  bankAccountName: 'Aaron Perez',
  bankRoutingNumber: '322273696',
  bankAccountLast4: '8885',
}

const defaultInvoiceData: InvoiceData = {
  companyName: 'AP Designs',
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
  notes: 'Thank you for your business! Debit cards accepted via PayPal, Venmo, or Cash App.',
  terms: 'Payment is due within 30 days of invoice date. Late payments may incur additional fees.',
  taxRate: 0,
  paymentMethods: defaultPaymentMethods,
}

export default function InvoiceForm() {
  const [data, setData] = useState<InvoiceData>(defaultInvoiceData)
  const [isEditing, setIsEditing] = useState(true)
  const [linkCopied, setLinkCopied] = useState(false)
  const [invoiceId, setInvoiceId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [savedInvoices, setSavedInvoices] = useState<Array<{ id: string; invoiceNumber: string; clientName: string; total: number; createdAt: string }>>([])
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [emailError, setEmailError] = useState<string | null>(null)
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null)

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

  const updatePaymentMethod = useCallback(<K extends keyof PaymentMethods>(field: K, value: PaymentMethods[K]) => {
    setData(prev => ({ ...prev, paymentMethods: { ...prev.paymentMethods, [field]: value } }))
  }, [])

  // Handle client selection - auto-fill client info
  const handleClientSelect = useCallback((client: { id: string; name: string; company: string; email: string; phone: string; address: string; city: string; state: string; zipCode: string } | null) => {
    if (client) {
      setSelectedClientId(client.id)
      setData(prev => ({
        ...prev,
        clientName: client.name,
        clientCompany: client.company || '',
        clientEmail: client.email || '',
        clientPhone: client.phone || '',
        clientAddress: client.address || '',
        clientCity: [client.city, client.state, client.zipCode].filter(Boolean).join(', '),
      }))
    } else {
      setSelectedClientId(null)
    }
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
              align-items: flex-center;
              padding-bottom: 24px;
              border-bottom: 3px solid #0ea5e9;
              margin-bottom: 24px;
            }
            .company-block { display: flex; align-items: flex-start; gap: 20px; }
            .logo { width: 100px; height: 100px; border-radius: 50%; object-fit: contain; background: rgba(30, 58, 138, 0.9); padding: 2px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); backdrop-filter: blur(8px); }
            .company-name { font-size: 24pt; font-weight: 700; color: #1e293b; margin-bottom: 6px; letter-spacing: -0.5px; margin-top: 8px; }
            .company-info { color: #475569; font-size: 11pt; line-height: 1.7; font-weight: 500; }
            .invoice-block { text-align: right; }
            .invoice-title { font-size: 36pt; font-weight: 800; color: #0ea5e9; letter-spacing: -1px; margin-top: 0; }
            .invoice-meta { margin-top: 12px; }
            .invoice-meta .row { display: flex; justify-content: flex-end; gap: 12px; margin: 4px 0; font-size: 10pt; }
            .invoice-meta .label { color: #64748b; font-weight: 500; }
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
            .total-row { display: flex; justify-content: space-between; padding: 8px 16px; font-size: 11pt; border-bottom: 1px solid #e2e8f0; }
            .total-row:last-child { border-bottom: none; }
            .total-label { color: #64748b; text-align: left; }
            .total-value { font-weight: 600; color: #334155; font-family: 'SF Mono', 'Consolas', monospace; text-align: right; min-width: 80px; }
            .total-row.grand { background: #0ea5e9; color: white; padding: 12px 16px; margin-top: 10px; border-radius: 6px; font-size: 14pt; }
            .total-row.grand .total-label { color: white; font-weight: 600; }
            .total-row.grand .total-value { color: white; font-weight: 700; }

            /* Notes */
            .notes-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 20px; }
            .notes-box { background: #f8fafc; padding: 16px; border-radius: 6px; }
            .notes-box h4 { font-size: 11pt; font-weight: 600; color: #1e293b; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.3px; }
            .notes-box p { font-size: 10pt; color: #64748b; line-height: 1.6; }

            /* Payment Methods */
            .payment-section { margin-bottom: 20px; }
            .payment-send-to { background: #f8fafc; padding: 14px 18px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 16px; }
            .payment-send-to p { font-size: 11pt; color: #334155; margin: 0; }
            .payment-send-to .email { font-weight: 700; color: #0f172a; font-size: 13pt; }
            .payment-icons { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; margin-top: 8px; }
            .payment-icon { display: flex; align-items: center; }
            .payment-icon svg { height: auto; }
            .payment-box { padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0; margin-top: 12px; background: #f8fafc; }
            .payment-box.check { border-color: #d1d5db; }
            .payment-box h5 { font-size: 10pt; font-weight: 600; color: #1e293b; margin-bottom: 6px; }
            .payment-box p { font-size: 9pt; color: #64748b; line-height: 1.4; margin: 2px 0; }
            .payment-box .label { font-weight: 600; color: #475569; }

            /* Footer */
            .footer { text-align: center; padding-top: 20px; border-top: 2px solid #e2e8f0; }
            .footer-thanks { font-size: 14pt; font-weight: 600; color: #0ea5e9; margin-bottom: 6px; }
            .footer-contact { font-size: 10pt; color: #94a3b8; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="company-block">
              <img src="${window.location.origin}/AP-Designs-Logo-Indigo-ElectricBlue.webp" alt="Logo" class="logo">
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

          ${(data.paymentMethods.paypalEnabled || data.paymentMethods.venmoEnabled || data.paymentMethods.cashappEnabled || data.paymentMethods.checkEnabled) ? `
          <div class="payment-section">
            <div class="section-header">Payment Methods</div>

            ${(data.paymentMethods.paypalEnabled || data.paymentMethods.venmoEnabled || data.paymentMethods.cashappEnabled) ? `
            <div class="payment-send-to">
              <p>Send payment to: <span class="email">${data.paymentMethods.paypalEmail || data.paymentMethods.venmoUsername || data.paymentMethods.cashappUsername}</span></p>
            </div>
            <div class="payment-icons">
              ${data.paymentMethods.paypalEnabled ? `
              <div class="payment-icon paypal">
                <svg viewBox="0 0 124 33" width="80" height="22"><path fill="#253B80" d="M46.211 6.749h-6.839a.95.95 0 0 0-.939.802l-2.766 17.537a.57.57 0 0 0 .564.658h3.265a.95.95 0 0 0 .939-.803l.746-4.73a.95.95 0 0 1 .938-.803h2.165c4.505 0 7.105-2.18 7.784-6.5.306-1.89.013-3.375-.872-4.415-.972-1.142-2.696-1.746-4.985-1.746zM47 13.154c-.374 2.454-2.249 2.454-4.062 2.454h-1.032l.724-4.583a.57.57 0 0 1 .563-.481h.473c1.235 0 2.4 0 3.002.704.359.42.469 1.044.332 1.906zM66.654 13.075h-3.275a.57.57 0 0 0-.563.481l-.145.916-.229-.332c-.709-1.029-2.29-1.373-3.868-1.373-3.619 0-6.71 2.741-7.312 6.586-.313 1.918.132 3.752 1.22 5.031.998 1.176 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 0 0 .562.66h2.95a.95.95 0 0 0 .939-.803l1.77-11.209a.568.568 0 0 0-.561-.658zm-4.565 6.374c-.316 1.871-1.801 3.127-3.695 3.127-.951 0-1.711-.305-2.199-.883-.484-.574-.668-1.391-.514-2.301.295-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.499.589.697 1.411.554 2.317zM84.096 13.075h-3.291a.954.954 0 0 0-.787.417l-4.539 6.686-1.924-6.425a.953.953 0 0 0-.912-.678h-3.234a.57.57 0 0 0-.541.754l3.625 10.638-3.408 4.811a.57.57 0 0 0 .465.9h3.287a.949.949 0 0 0 .781-.408l10.946-15.8a.57.57 0 0 0-.468-.895z"/><path fill="#179BD7" d="M94.992 6.749h-6.84a.95.95 0 0 0-.938.802l-2.766 17.537a.569.569 0 0 0 .562.658h3.51a.665.665 0 0 0 .656-.562l.785-4.971a.95.95 0 0 1 .938-.803h2.164c4.506 0 7.105-2.18 7.785-6.5.307-1.89.012-3.375-.873-4.415-.971-1.142-2.694-1.746-4.983-1.746zm.789 6.405c-.373 2.454-2.248 2.454-4.062 2.454h-1.031l.725-4.583a.568.568 0 0 1 .562-.481h.473c1.234 0 2.4 0 3.002.704.359.42.468 1.044.331 1.906zM115.434 13.075h-3.273a.567.567 0 0 0-.562.481l-.145.916-.23-.332c-.709-1.029-2.289-1.373-3.867-1.373-3.619 0-6.709 2.741-7.311 6.586-.312 1.918.131 3.752 1.219 5.031 1 1.176 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 0 0 .564.66h2.949a.95.95 0 0 0 .938-.803l1.771-11.209a.571.571 0 0 0-.565-.658zm-4.565 6.374c-.314 1.871-1.801 3.127-3.695 3.127-.949 0-1.711-.305-2.199-.883-.484-.574-.666-1.391-.514-2.301.297-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.501.589.699 1.411.554 2.317zM119.295 7.23l-2.807 17.858a.569.569 0 0 0 .562.658h2.822c.469 0 .867-.34.939-.803l2.768-17.536a.57.57 0 0 0-.562-.659h-3.16a.571.571 0 0 0-.562.482z"/></svg>
              </div>
              ` : ''}
              ${data.paymentMethods.venmoEnabled ? `
              <div class="payment-icon venmo">
               <img src="https://www.paypalobjects.com/webstatic/mktg/logo/AM_mc_vs_dc_ae.jpg" border="0" alt="PayPal Acceptance Mark">
              </div>
              ` : ''}
              ${data.paymentMethods.cashappEnabled ? `
              <div class="payment-icon cashapp">
                <svg viewBox="0 0 512 512" width="24" height="24"><path fill="#00D632" d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm79.9 178.3l-23.4 24.9c-5.9 6.3-15.6 6.6-21.9.7-13.2-12.4-29.9-19.3-47.4-19.3-21.2 0-34.6 9.4-34.6 22.5 0 11.5 9.4 18 30.7 23.9l14.5 3.8c43 11 69.9 28.3 69.9 65.8 0 44.3-36.2 73.9-87.3 76.6v25c0 6.7-5.4 12.2-12.2 12.2h-22.8c-6.7 0-12.2-5.4-12.2-12.2v-25.5c-29.3-3-55.1-14.8-72.1-33.1-5.8-6.3-5.6-16.1.5-22.2l25.5-23.9c6.1-5.7 15.8-5.4 21.7.6 14 14.8 31.4 22.6 52.9 22.6 24.1 0 38.9-10.8 38.9-25.6 0-12.9-9.4-19.6-33.5-26.1l-14.8-4c-38.7-10.2-65.8-27.4-65.8-64 0-39.8 32.2-69.4 81.9-73.4v-23.6c0-6.7 5.4-12.2 12.2-12.2h22.8c6.7 0 12.2 5.4 12.2 12.2v24.2c24.4 3.3 45.1 13.5 59.6 28.5 6 6.2 5.8 16.1-.4 22.1z"/></svg>
              </div>
              ` : ''}
            </div>
            ` : ''}

            ${data.paymentMethods.checkEnabled ? `
            <div class="payment-box check">
              <h5>Check</h5>
              <p>Make payable to: <span class="label">${data.paymentMethods.checkPayableTo}</span></p>
              ${data.paymentMethods.checkMailingAddress ? `<p style="font-size: 8pt; margin-top: 4px;">Mail to: ${data.paymentMethods.checkMailingAddress}</p>` : ''}
            </div>
            ` : ''}
          </div>
          ` : ''}

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

  // Send invoice via email (with clickable payment links)
  const handleSendEmail = useCallback(async () => {
    if (!data.clientEmail) {
      setEmailError('Client email is required')
      return
    }

    setEmailStatus('sending')
    setEmailError(null)

    try {
      const response = await fetch('/api/invoices/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setEmailStatus('sent')
        setTimeout(() => setEmailStatus('idle'), 3000)
      } else {
        setEmailStatus('error')
        setEmailError(result.message || 'Failed to send email')
        setTimeout(() => setEmailStatus('idle'), 5000)
      }
    } catch (error) {
      console.error('Failed to send invoice email:', error)
      setEmailStatus('error')
      setEmailError('Network error. Please try again.')
      setTimeout(() => setEmailStatus('idle'), 5000)
    }
  }, [data])

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
          paymentMethods: invoice.paymentMethods || defaultPaymentMethods,
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
          <Button
            variant="outline"
            onClick={handleSendEmail}
            disabled={!data.clientEmail || emailStatus === 'sending'}
            className={emailStatus === 'sent' ? 'bg-green-100 border-green-500 text-green-700' : emailStatus === 'error' ? 'bg-red-100 border-red-500 text-red-700' : ''}
          >
            {emailStatus === 'sending' ? '📧 Sending...' :
             emailStatus === 'sent' ? '✓ Email Sent!' :
             emailStatus === 'error' ? '✗ Failed' : '📧 Send Email'}
          </Button>
          {emailError && emailStatus === 'error' && (
            <span className="text-red-500 text-sm">{emailError}</span>
          )}
          <Button variant="outline" onClick={handleCopyLink}>
            {linkCopied ? '✓ Link Copied!' : '🔗 Copy Link'}
          </Button>
          <Button onClick={handlePrint}>📥 Download PDF</Button>
        </div>
      </div>

      {/* Invoice Preview/Edit */}
      <div className="bg-white outline shadow-xl overflow-hidden">
        <div className="document-container">
          {/* Header */}
          <div className="document-header
         p-8">
            <div className="flex justify-between items-center">
              <div className="flex gap-5">
                <img src="/AP-Designs-Logo-Indigo-ElectricBlue.webp" alt="AP Designs Logo" className="logo w-[90px] h-[90px] rounded-full object-contain" />
                <div className="text-left">
                  {isEditing ? (
                    <input type="text" value={data.companyName} onChange={(e) => updateField('companyName', e.target.value)}
                      className="bg-transparent border-b border-cyan-400/50 text-3xl font-bold w-full focus:outline-none focus:border-cyan-400" />
                  ) : (
                    <h1 className="text-3xl font-bold">{data.companyName}</h1>
                  )}
                  <div className="text-gray-500 text-base mt-2 space-y-1 font-medium">
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
                    <span className="text-gray-500">Invoice #:</span>
                    {isEditing ? (
                      <input type="text" value={data.invoiceNumber} onChange={(e) => updateField('invoiceNumber', e.target.value)}
                        className="bg-transparent border-b border-gray-600 text-right w-40 focus:outline-none focus:border-cyan-400" />
                    ) : (
                      <span className="font-semibold">{data.invoiceNumber}</span>
                    )}
                  </div>
                  <div className="flex justify-end gap-4">
                    <span className="text-gray-500">Date:</span>
                    {isEditing ? (
                      <input type="date" value={data.invoiceDate} onChange={(e) => updateField('invoiceDate', e.target.value)}
                        className="bg-transparent border-b border-gray-600 text-right w-40 focus:outline-none focus:border-cyan-400" />
                    ) : (
                      <span className="font-semibold">{formatDate(data.invoiceDate)}</span>
                    )}
                  </div>
                  <div className="flex justify-end gap-4">
                    <span className="text-gray-500">Due Date:</span>
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

              {/* Client Selector - only show when editing */}
              {isEditing && (
                <div className="mb-4">
                  <ClientSelector
                    onSelect={handleClientSelect}
                    selectedClientId={selectedClientId}
                  />
                  <p className="text-xs text-gray-500 mt-1">Select an existing client or enter details manually below</p>
                </div>
              )}

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

            {/* Payment Methods */}
            <div className="section mt-8">
              <h3 className="section-title text-xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-cyan-400">Payment Methods</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* PayPal */}
                <div className={`p-4 rounded-lg border-2 transition-all ${data.paymentMethods.paypalEnabled ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <PayPalIcon size={28} />
                      <span className="font-semibold text-gray-900">PayPal</span>
                    </div>
                    {isEditing && (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={data.paymentMethods.paypalEnabled} onChange={(e) => updatePaymentMethod('paypalEnabled', e.target.checked)} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                      </label>
                    )}
                  </div>
                  {data.paymentMethods.paypalEnabled && (
                    <div>
                      {isEditing ? (
                        <input type="email" value={data.paymentMethods.paypalEmail} onChange={(e) => updatePaymentMethod('paypalEmail', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="paypal@email.com" />
                      ) : (
                        <p className="text-gray-600 text-sm">Send to: <span className="font-medium">{data.paymentMethods.paypalEmail}</span></p>
                      )}
                    </div>
                  )}
                </div>

                {/* Venmo */}
                <div className={`p-4 rounded-lg border-2 transition-all ${data.paymentMethods.venmoEnabled ? 'border-sky-500 bg-sky-50' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <VenmoIcon size={28} />
                      <span className="font-semibold text-gray-900">Venmo</span>
                    </div>
                    {isEditing && (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={data.paymentMethods.venmoEnabled} onChange={(e) => updatePaymentMethod('venmoEnabled', e.target.checked)} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500"></div>
                      </label>
                    )}
                  </div>
                  {data.paymentMethods.venmoEnabled && (
                    <div>
                      {isEditing ? (
                        <input type="text" value={data.paymentMethods.venmoUsername} onChange={(e) => updatePaymentMethod('venmoUsername', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" placeholder="@username" />
                      ) : (
                        <p className="text-gray-600 text-sm">Send to: <span className="font-medium">{data.paymentMethods.venmoUsername || 'Contact for username'}</span></p>
                      )}
                    </div>
                  )}
                </div>

                {/* Cash App */}
                {/* <div className={`p-4 rounded-lg border-2 transition-all ${data.paymentMethods.cashappEnabled ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <CashAppIcon size={28} />
                      <span className="font-semibold text-gray-900">Cash App</span>
                    </div>
                    {isEditing && (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={data.paymentMethods.cashappEnabled} onChange={(e) => updatePaymentMethod('cashappEnabled', e.target.checked)} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                      </label>
                    )}
                  </div>
                  {data.paymentMethods.cashappEnabled && (
                    <div>
                      {isEditing ? (
                        <input type="text" value={data.paymentMethods.cashappUsername} onChange={(e) => updatePaymentMethod('cashappUsername', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="$cashtag" />
                      ) : (
                        <p className="text-gray-600 text-sm">Send to: <span className="font-medium">{data.paymentMethods.cashappUsername || 'Contact for $cashtag'}</span></p>
                      )}
                    </div>
                  )}
                </div> */}

                {/* Check */}
                {/* <div className={`p-4 rounded-lg border-2 transition-all ${data.paymentMethods.checkEnabled ? 'border-gray-500 bg-gray-100' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <CheckIcon size={28} />
                      <span className="font-semibold text-gray-900">Check</span>
                    </div>
                    {isEditing && (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={data.paymentMethods.checkEnabled} onChange={(e) => updatePaymentMethod('checkEnabled', e.target.checked)} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-500"></div>
                      </label>
                    )}
                  </div>
                  {data.paymentMethods.checkEnabled && (
                    <div className="space-y-2">
                      {isEditing ? (
                        <>
                          <input type="text" value={data.paymentMethods.checkPayableTo} onChange={(e) => updatePaymentMethod('checkPayableTo', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-400" placeholder="Make payable to..." />
                          <input type="text" value={data.paymentMethods.checkMailingAddress} onChange={(e) => updatePaymentMethod('checkMailingAddress', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-400" placeholder="Mailing address (optional)" />
                        </>
                      ) : (
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>Make payable to: <span className="font-medium">{data.paymentMethods.checkPayableTo}</span></p>
                          {data.paymentMethods.checkMailingAddress && <p className="text-xs">{data.paymentMethods.checkMailingAddress}</p>}
                        </div>
                      )}
                    </div>
                  )}
                </div> */}

                {/* ACH/Bank Transfer */}
                {/* <div className={`p-4 rounded-lg border-2 transition-all ${data.paymentMethods.achEnabled ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <BankIcon size={28} />
                      <span className="font-semibold text-gray-900">Bank Transfer</span>
                    </div>
                    {isEditing && (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={data.paymentMethods.achEnabled} onChange={(e) => updatePaymentMethod('achEnabled', e.target.checked)} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                      </label>
                    )}
                  </div>
                  {data.paymentMethods.achEnabled && (
                    <div className="space-y-2">
                      {isEditing ? (
                        <>
                          <input type="text" value={data.paymentMethods.bankName} onChange={(e) => updatePaymentMethod('bankName', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="Bank Name" />
                          <input type="text" value={data.paymentMethods.bankAccountName} onChange={(e) => updatePaymentMethod('bankAccountName', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="Account Name" />
                          <div className="grid grid-cols-2 gap-2">
                            <input type="text" value={data.paymentMethods.bankRoutingNumber} onChange={(e) => updatePaymentMethod('bankRoutingNumber', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="Routing #" />
                            <input type="text" value={data.paymentMethods.bankAccountLast4} onChange={(e) => updatePaymentMethod('bankAccountLast4', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="Account # (last 4)" />
                          </div>
                        </>
                      ) : (
                        <div className="text-sm text-gray-600 space-y-1">
                          {data.paymentMethods.bankName && <p><span className="font-medium">Bank:</span> {data.paymentMethods.bankName}</p>}
                          {data.paymentMethods.bankAccountName && <p><span className="font-medium">Name:</span> {data.paymentMethods.bankAccountName}</p>}
                          {data.paymentMethods.bankRoutingNumber && <p><span className="font-medium">Routing:</span> {data.paymentMethods.bankRoutingNumber}</p>}
                          {data.paymentMethods.bankAccountLast4 && <p><span className="font-medium">Account:</span> ****{data.paymentMethods.bankAccountLast4}</p>}
                          {!data.paymentMethods.bankName && !data.paymentMethods.bankRoutingNumber && <p className="italic text-gray-500">Contact for bank details</p>}
                        </div>
                      )}
                    </div>
                  )}
                </div> */}
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

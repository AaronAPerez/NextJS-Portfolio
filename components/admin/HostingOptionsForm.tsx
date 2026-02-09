'use client'

import { useState, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/Button'

interface Provider {
  id: string
  name: string
  description: string
}

interface PriceItem {
  id: string
  label: string
  value: string
}

interface HostingOption {
  id: string
  letter: string
  title: string
  description: string
  isRecommended: boolean
  whatYouDo: string[]
  providers: Provider[]
  pricing: PriceItem[]
  whatWeHandle: string[]
  idealFor: string
}

interface HostingData {
  companyName: string
  headerTitle: string
  headerSubtitle: string
  overviewText: string
  requirement1: string
  requirement2: string
  overviewNote: string
  options: HostingOption[]
  domainTitle: string
  domainDescription: string
  domainProviders: Provider[]
  domainPricing: string
  updatesTitle: string
  updatesDescription: string
  updatesRate: string
  updatesNote: string
  contactFormTitle: string
  contactFormDescription: string
  autoReplySubject: string
  autoReplyBody: string
  autoReplySignature: string
  contactFormNote: string
  footerTitle: string
  footerText: string
}

const defaultHostingData: HostingData = {
  companyName: 'AP Designs',
  headerTitle: 'Website Hosting Options',
  headerSubtitle: 'Professional Hosting Solutions for Your Business',
  overviewText: 'Every website needs two essential components to go live and be accessible to your customers:',
  requirement1: 'A domain — Your website address (e.g., yourcompany.com)',
  requirement2: 'Hosting — The server where your website files are stored and served',
  overviewNote: 'Below are the two hosting options available through AP Designs, along with recommended providers if you prefer to manage hosting yourself.',
  options: [
    {
      id: '1', letter: 'A', title: 'Client-Owned Hosting (Self-Managed)',
      description: 'You purchase and own your hosting plan directly. Lower upfront cost with promotional pricing, but requires ongoing technical management on your end.',
      isRecommended: false,
      whatYouDo: ['Purchase hosting from a provider (requires 1-4 year upfront commitment for promo pricing)', 'Share access credentials for initial AP Designs setup', 'Manage your own renewals, billing, and account security', 'Handle technical issues: server errors, downtime, SSL renewals, PHP updates, database issues', 'Contact hosting support for troubleshooting (often overseas call centers)', 'Monitor for security vulnerabilities and malware'],
      providers: [
        { id: '1', name: 'SiteGround', description: 'Fast, secure, excellent support — from $1.99/mo (promo)' },
        { id: '2', name: 'Hostinger', description: 'Most affordable option — from $1.79/mo (promo)' },
        { id: '3', name: 'Bluehost', description: 'Simple setup, widely used — from $1.99/mo (promo)' }
      ],
      pricing: [{ id: '1', label: 'Hosting (promo)', value: '$2–$4/month' }, { id: '2', label: 'Hosting (renewal)', value: '$9–$18/month' }, { id: '3', label: 'Domain', value: '$10–$20/year' }],
      whatWeHandle: ['Initial hosting setup and configuration', 'Domain connection and DNS management', 'SSL security certificate (https)', 'Website installation and deployment', 'Contact form configuration', 'Launch preparation and testing'],
      idealFor: 'Tech-savvy clients comfortable with hosting dashboards, DNS settings, and troubleshooting technical issues independently.'
    },
    {
      id: '2', letter: 'B', title: 'Fully Managed by AP Designs',
      description: 'Zero technical hassle. Your website is hosted on premium infrastructure and professionally managed by the same person who built it. Predictable pricing with no surprise renewal increases.',
      isRecommended: true,
      whatYouDo: ['Nothing technical — just run your business', 'One simple annual payment, no surprise price hikes', 'Direct support from your developer (not a call center)'],
      providers: [],
      pricing: [{ id: '1', label: 'Monthly', value: '$25/month' }, { id: '2', label: 'Yearly (Save 20%)', value: '$240/year' }, { id: '3', label: 'Compare', value: 'Self-managed renewals: $108–216/yr + your time' }],
      whatWeHandle: ['Website hosting on premium cloud infrastructure', 'SSL security certificate (auto-renewed)', 'Daily automated backups with 30-day retention', 'Server maintenance, security patches & updates', 'Uptime monitoring (99.9% guarantee)', 'Priority technical support from your developer', 'Performance optimization & speed tuning', 'Security monitoring & malware protection', 'PHP, database, and server updates'],
      idealFor: 'Business owners who value their time and want a worry-free experience with direct access to professional support.'
    }
  ],
  domainTitle: 'Domain Name (Required for Both Options)',
  domainDescription: 'Your domain is your website address (e.g., yourcompany.com). You will always own your domain, regardless of which hosting option you choose.',
  domainProviders: [
    { id: '1', name: 'Namecheap', description: 'Affordable and simple interface' },
    { id: '2', name: 'GoDaddy', description: 'Very common and beginner-friendly' }
  ],
  domainPricing: '$10–$20/year',
  updatesTitle: 'Website Updates & Changes',
  updatesDescription: 'Need changes to your website after launch? AP Designs offers ongoing website updates and maintenance at an hourly rate. This service is separate from your hosting plan and available on-demand.',
  updatesRate: '$75/hour',
  updatesNote: 'Common updates include: text/image changes, adding new pages, feature additions, design tweaks, and bug fixes. Most small updates take less than 1 hour.',
  contactFormTitle: 'Contact Form Auto-Reply Example',
  contactFormDescription: 'If you choose the contact form add-on, here is a sample auto-reply message that will be sent to visitors who submit your contact form:',
  autoReplySubject: 'Thank you for contacting us',
  autoReplyBody: 'Thank you for reaching out. We\'ve received your message and will get back to you as soon as possible.',
  autoReplySignature: '— Your Company Name',
  contactFormNote: 'This message can be customized to match your brand\'s tone and communication style.',
  footerTitle: 'Questions?',
  footerText: 'AP Designs is here to guide you through the entire setup process and ensure your website launches smoothly and professionally. Contact us to discuss which hosting option is the best fit for your business needs.'
}

export default function HostingOptionsForm() {
  const [data, setData] = useState<HostingData>(defaultHostingData)
  const [isEditing, setIsEditing] = useState(true)
  const [linkCopied, setLinkCopied] = useState(false)
  const [docId, setDocId] = useState<string | null>(null)
  const [clientEmail, setClientEmail] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [savedDocs, setSavedDocs] = useState<Array<{ id: string; headerTitle: string; clientEmail: string; createdAt: string }>>([])

  // Load saved documents on mount
  useEffect(() => {
    const loadDocs = async () => {
      try {
        const response = await fetch('/api/hosting-options')
        if (response.ok) {
          const docs = await response.json()
          setSavedDocs(docs)
        }
      } catch (error) {
        console.error('Failed to load hosting options:', error)
      }
    }
    loadDocs()
  }, [])

  const updateField = useCallback(<K extends keyof HostingData>(field: K, value: HostingData[K]) => {
    setData(prev => ({ ...prev, [field]: value }))
  }, [])

  const updateOption = useCallback((optionId: string, field: keyof HostingOption, value: unknown) => {
    setData(prev => ({
      ...prev,
      options: prev.options.map(opt => opt.id === optionId ? { ...opt, [field]: value } : opt)
    }))
  }, [])

  const updateOptionListItem = useCallback((optionId: string, listField: 'whatYouDo' | 'whatWeHandle', index: number, value: string) => {
    setData(prev => ({
      ...prev,
      options: prev.options.map(opt => {
        if (opt.id !== optionId) return opt
        const newList = [...opt[listField]]
        newList[index] = value
        return { ...opt, [listField]: newList }
      })
    }))
  }, [])

  const addOptionListItem = useCallback((optionId: string, listField: 'whatYouDo' | 'whatWeHandle') => {
    setData(prev => ({
      ...prev,
      options: prev.options.map(opt => opt.id !== optionId ? opt : { ...opt, [listField]: [...opt[listField], ''] })
    }))
  }, [])

  const removeOptionListItem = useCallback((optionId: string, listField: 'whatYouDo' | 'whatWeHandle', index: number) => {
    setData(prev => ({
      ...prev,
      options: prev.options.map(opt => opt.id !== optionId ? opt : { ...opt, [listField]: opt[listField].filter((_, i) => i !== index) })
    }))
  }, [])

  const updateProvider = useCallback((optionId: string, providerId: string, field: keyof Provider, value: string) => {
    setData(prev => ({
      ...prev,
      options: prev.options.map(opt => opt.id !== optionId ? opt : {
        ...opt, providers: opt.providers.map(p => p.id === providerId ? { ...p, [field]: value } : p)
      })
    }))
  }, [])

  const updatePricing = useCallback((optionId: string, priceId: string, field: keyof PriceItem, value: string) => {
    setData(prev => ({
      ...prev,
      options: prev.options.map(opt => opt.id !== optionId ? opt : {
        ...opt, pricing: opt.pricing.map(p => p.id === priceId ? { ...p, [field]: value } : p)
      })
    }))
  }, [])

  const updateDomainProvider = useCallback((providerId: string, field: keyof Provider, value: string) => {
    setData(prev => ({
      ...prev,
      domainProviders: prev.domainProviders.map(p => p.id === providerId ? { ...p, [field]: value } : p)
    }))
  }, [])

  // Generate clean print HTML
  const handlePrint = useCallback(() => {
    const printWindow = window.open('', '_blank', 'width=800,height=600')
    if (!printWindow) {
      alert('Please allow popups to print this document')
      return
    }

    const generateOptionHtml = (opt: HostingOption) => `
      <div class="option-card ${opt.isRecommended ? 'recommended' : ''}">
        ${opt.isRecommended ? '<span class="badge">Best Value</span>' : ''}
        <div class="option-letter">${opt.letter}</div>
        <h3 class="option-title">${opt.title}</h3>
        <p class="option-desc">${opt.description}</p>

        <div class="section">
          <h4>What You Do</h4>
          <ul>${opt.whatYouDo.map(item => `<li>${item}</li>`).join('')}</ul>
        </div>

        ${opt.providers.length > 0 ? `
          <div class="section">
            <h4>Recommended Providers</h4>
            ${opt.providers.map(p => `<div class="provider"><strong>${p.name}</strong><span>${p.description}</span></div>`).join('')}
          </div>
        ` : ''}

        <div class="section">
          <h4>${opt.providers.length > 0 ? 'Typical Cost' : 'Cost'}</h4>
          <div class="pricing">${opt.pricing.map(p => `<div class="price-row"><span>${p.label}</span><span class="price-value">${p.value}</span></div>`).join('')}</div>
        </div>

        <div class="section">
          <h4>What AP Designs Handles</h4>
          <ul>${opt.whatWeHandle.map(item => `<li>${item}</li>`).join('')}</ul>
        </div>

        <p class="ideal-for"><strong>Ideal for:</strong> ${opt.idealFor}</p>
      </div>
    `

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>${data.headerTitle}</title>
          <style>
            @page { size: letter portrait; margin: 0.4in; }
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              font-size: 9px;
              line-height: 1.35;
              color: #333;
              background: white;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .container { width: 100%; }

            /* Header */
            .header {
              background: #1a1a2e;
              color: white;
              padding: 16px 20px;
              text-align: center;
            }
            .logo { width: 45px; height: 45px; border-radius: 50%; margin-bottom: 6px; }
            .header h1 { font-size: 18px; font-weight: 700; margin-bottom: 2px; }
            .header p { color: #00D4FF; font-size: 11px; }

            /* Content */
            .content { padding: 12px 20px; }

            /* Overview */
            .overview {
              background: linear-gradient(135deg, #00a0c0, #4361ee);
              color: white;
              padding: 12px;
              border-radius: 6px;
              margin-bottom: 12px;
            }
            .overview h2 { font-size: 12px; font-weight: 600; margin-bottom: 6px; }
            .overview p { font-size: 9px; margin-bottom: 4px; }
            .overview ul { list-style: none; margin: 8px 0; }
            .overview li { display: flex; align-items: flex-start; gap: 6px; margin: 4px 0; font-size: 9px; }
            .overview .num { background: rgba(255,255,255,0.2); border-radius: 50%; width: 16px; height: 16px; display: flex; align-items: center; justify-content: center; font-size: 8px; font-weight: 700; flex-shrink: 0; }

            /* Options Grid */
            .options-grid { display: flex; gap: 12px; margin-bottom: 12px; }
            .option-card {
              flex: 1;
              border: 1px solid #ddd;
              border-radius: 6px;
              padding: 10px;
              position: relative;
              font-size: 8px;
            }
            .option-card.recommended { border-color: #00a0c0; border-width: 2px; }
            .badge {
              position: absolute;
              top: 6px;
              right: 6px;
              background: linear-gradient(135deg, #00a0c0, #4361ee);
              color: white;
              padding: 2px 6px;
              border-radius: 3px;
              font-size: 7px;
              font-weight: 600;
              text-transform: uppercase;
            }
            .option-letter { font-size: 20px; font-weight: 700; color: #00a0c0; }
            .option-title { font-size: 11px; font-weight: 600; color: #1a1a2e; margin: 4px 0; }
            .option-desc { color: #4b5563; font-size: 8px; margin-bottom: 8px; }

            .section { margin: 8px 0; }
            .section h4 { font-size: 9px; font-weight: 600; color: #1a1a2e; margin-bottom: 4px; padding-bottom: 2px; border-bottom: 1px solid #00a0c0; }
            .section ul { list-style: none; }
            .section li { padding: 2px 0; padding-left: 12px; position: relative; }
            .section li::before { content: "✓"; position: absolute; left: 0; color: #00a0c0; font-weight: 700; }

            .provider { background: #f5f5f5; border-left: 2px solid #00a0c0; padding: 4px 6px; margin: 3px 0; border-radius: 2px; }
            .provider strong { display: block; font-size: 8px; color: #333; }
            .provider span { font-size: 7px; color: #4b5563; }

            .pricing { background: #f8f9fa; padding: 6px; border-radius: 4px; }
            .price-row { display: flex; justify-content: space-between; padding: 2px 0; border-bottom: 1px solid #e0e0e0; }
            .price-row:last-child { border-bottom: none; }
            .price-value { color: #00a0c0; font-weight: 600; }

            .ideal-for { margin-top: 8px; padding-top: 6px; border-top: 1px solid #e5e7eb; font-size: 8px; color: #374151; }

            /* Domain Section */
            .standalone-section {
              border: 1px solid #00a0c0;
              border-radius: 6px;
              padding: 10px;
              margin-bottom: 10px;
            }
            .standalone-section h2 { font-size: 11px; font-weight: 600; color: #1a1a2e; margin-bottom: 6px; }
            .standalone-section > p { font-size: 8px; color: #374151; margin-bottom: 6px; }
            .standalone-section h3 { font-size: 9px; font-weight: 600; color: #1a1a2e; margin: 6px 0 4px; }

            /* Code Block */
            .code-block {
              background: #1a1a2e;
              color: #00D4FF;
              padding: 8px;
              border-radius: 4px;
              font-family: monospace;
              font-size: 8px;
              margin: 6px 0;
            }
            .code-block strong { color: white; }
            .code-note { font-size: 7px; color: #4b5563; font-style: italic; margin-top: 4px; }

            /* Footer */
            .footer {
              background: #1a1a2e;
              color: white;
              padding: 12px 20px;
              text-align: center;
            }
            .footer h2 { color: #00D4FF; font-size: 12px; font-weight: 600; margin-bottom: 4px; }
            .footer p { font-size: 8px; color: #d1d5db; max-width: 500px; margin: 0 auto; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="${window.location.origin}/AP-Designs-Logo-Indigo-ElectricBlue.webp" alt="Logo" class="logo">
              <h1>${data.headerTitle}</h1>
              <p>${data.headerSubtitle}</p>
            </div>

            <div class="content">
              <div class="overview">
                <h2>Overview</h2>
                <p>${data.overviewText}</p>
                <ul>
                  <li><span class="num">1</span>${data.requirement1}</li>
                  <li><span class="num">2</span>${data.requirement2}</li>
                </ul>
                <p>${data.overviewNote}</p>
              </div>

              <div class="options-grid">
                ${data.options.map(generateOptionHtml).join('')}
              </div>

              <div class="standalone-section">
                <h2>${data.domainTitle}</h2>
                <p>${data.domainDescription}</p>
                <h3>Recommended Domain Registrars</h3>
                ${data.domainProviders.map(p => `<div class="provider"><strong>${p.name}</strong><span>${p.description}</span></div>`).join('')}
                <div class="pricing" style="margin-top: 8px;">
                  <div class="price-row"><span>Typical Domain Cost</span><span class="price-value">${data.domainPricing}</span></div>
                </div>
              </div>

              <div class="standalone-section" style="border-color: #f59e0b; background: #fffbeb;">
                <h2 style="color: #b45309;">⚡ ${data.updatesTitle}</h2>
                <p>${data.updatesDescription}</p>
                <div class="pricing" style="margin-top: 8px; background: #fef3c7;">
                  <div class="price-row"><span>Hourly Rate</span><span class="price-value" style="color: #d97706; font-size: 10px;">${data.updatesRate}</span></div>
                </div>
                <p class="code-note" style="margin-top: 6px;">${data.updatesNote}</p>
                <p style="color: #b45309; font-size: 7px; margin-top: 4px; font-weight: 600;">⚠️ This fee is separate from hosting and billed only when you request changes.</p>
              </div>

              <div class="standalone-section">
                <h2>${data.contactFormTitle}</h2>
                <p>${data.contactFormDescription}</p>
                <div class="code-block">
                  <strong>Subject:</strong> ${data.autoReplySubject}<br><br>
                  ${data.autoReplyBody}<br><br>
                  ${data.autoReplySignature}
                </div>
                <p class="code-note">${data.contactFormNote}</p>
              </div>
            </div>

            <div class="footer">
              <h2>${data.footerTitle}</h2>
              <p>${data.footerText}</p>
            </div>
          </div>
          <script>window.onload = function() { window.print(); window.onafterprint = function() { window.close(); }; };</script>
        </body>
      </html>
    `)
    printWindow.document.close()
  }, [data])

  // Send hosting options via email
  const handleSendEmail = useCallback(() => {
    const optionsSummary = data.options.map(opt =>
      `${opt.letter}. ${opt.title}\n   ${opt.description}\n   Cost: ${opt.pricing.map(p => `${p.label}: ${p.value}`).join(', ')}`
    ).join('\n\n')

    const subject = encodeURIComponent(`Website Hosting Options from ${data.companyName}`)
    const body = encodeURIComponent(
`Hello,

Here are your website hosting options:

${optionsSummary}

Domain Name: ${data.domainPricing}

${data.footerText}

---
${data.companyName}
`
    )

    const mailtoLink = `mailto:${clientEmail}?subject=${subject}&body=${body}`
    window.open(mailtoLink, '_blank')
  }, [data, clientEmail])

  // Save document to database
  const handleSave = useCallback(async () => {
    setIsSaving(true)
    setSaveStatus('saving')

    const docData = { ...data, clientEmail }

    try {
      let response
      if (docId) {
        response = await fetch(`/api/hosting-options/${docId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(docData),
        })
      } else {
        response = await fetch('/api/hosting-options', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(docData),
        })
      }

      if (response.ok) {
        const savedDoc = await response.json()
        setDocId(savedDoc.id)
        setSaveStatus('saved')
        const listResponse = await fetch('/api/hosting-options')
        if (listResponse.ok) {
          setSavedDocs(await listResponse.json())
        }
        setTimeout(() => setSaveStatus('idle'), 2000)
      } else {
        setSaveStatus('error')
      }
    } catch (error) {
      console.error('Failed to save:', error)
      setSaveStatus('error')
    } finally {
      setIsSaving(false)
    }
  }, [data, clientEmail, docId])

  // Load an existing document
  const loadDoc = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/hosting-options/${id}`)
      if (response.ok) {
        const doc = await response.json()
        setData({
          companyName: doc.companyName,
          headerTitle: doc.headerTitle,
          headerSubtitle: doc.headerSubtitle || '',
          overviewText: doc.overviewText || '',
          requirement1: doc.requirement1 || '',
          requirement2: doc.requirement2 || '',
          overviewNote: doc.overviewNote || '',
          options: doc.options || [],
          domainTitle: doc.domainTitle || '',
          domainDescription: doc.domainDescription || '',
          domainProviders: doc.domainProviders || [],
          domainPricing: doc.domainPricing || '',
          updatesTitle: doc.updatesTitle || 'Website Updates & Changes',
          updatesDescription: doc.updatesDescription || '',
          updatesRate: doc.updatesRate || '$75/hour',
          updatesNote: doc.updatesNote || '',
          contactFormTitle: doc.contactFormTitle || '',
          contactFormDescription: doc.contactFormDescription || '',
          autoReplySubject: doc.autoReplySubject || '',
          autoReplyBody: doc.autoReplyBody || '',
          autoReplySignature: doc.autoReplySignature || '',
          contactFormNote: doc.contactFormNote || '',
          footerTitle: doc.footerTitle || '',
          footerText: doc.footerText || '',
        })
        setClientEmail(doc.clientEmail || '')
        setDocId(id)
      }
    } catch (error) {
      console.error('Failed to load document:', error)
    }
  }, [])

  // Create new document
  const handleNewDoc = useCallback(() => {
    setData(defaultHostingData)
    setDocId(null)
    setClientEmail('')
    setSaveStatus('idle')
  }, [])

  // Generate shareable link (saves to DB first)
  const handleCopyLink = useCallback(async () => {
    setIsSaving(true)

    const docData = { ...data, clientEmail }

    try {
      let id = docId

      if (!id) {
        const response = await fetch('/api/hosting-options', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(docData),
        })
        if (response.ok) {
          const savedDoc = await response.json()
          id = savedDoc.id
          setDocId(id)
        }
      } else {
        await fetch(`/api/hosting-options/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(docData),
        })
      }

      if (id) {
        const shareableLink = `${window.location.origin}/hosting-options/${id}`
        await navigator.clipboard.writeText(shareableLink)
        setLinkCopied(true)
        setTimeout(() => setLinkCopied(false), 3000)
      }
    } catch (error) {
      console.error('Failed to save and copy link:', error)
    } finally {
      setIsSaving(false)
    }
  }, [data, clientEmail, docId])

  const EditableText = ({ value, onChange, multiline = false, className = '' }: {
    value: string; onChange: (value: string) => void; multiline?: boolean; className?: string
  }) => {
    if (!isEditing) return <span className={className}>{value}</span>
    if (multiline) {
      return <textarea value={value} onChange={(e) => onChange(e.target.value)}
        className={`w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white text-gray-900 ${className}`} rows={3} />
    }
    return <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
      className={`w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white text-gray-900 ${className}`} />
  }

  return (
    <div className="space-y-6">
      {/* Saved Documents Bar */}
      {savedDocs.length > 0 && (
        <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-gray-400 text-sm">Saved Documents:</span>
            <Button variant="outline" onClick={handleNewDoc} className="text-sm py-1 px-3">
              + New Document
            </Button>
            {savedDocs.slice(0, 5).map((doc) => (
              <button
                key={doc.id}
                onClick={() => loadDoc(doc.id)}
                className={`text-sm px-3 py-1 rounded-md transition-colors ${
                  docId === doc.id
                    ? 'bg-cyan-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {doc.clientEmail || 'No client'}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-4 border border-gray-700 flex-wrap gap-4">
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
          <div className="flex items-center gap-2">
            <label htmlFor="client-email" className="sr-only">Client email address</label>
            <input
              id="client-email"
              type="email"
              placeholder="Client email..."
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              aria-label="Client email address"
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 w-48"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleSendEmail} disabled={!clientEmail}>
            📧 Send Email
          </Button>
          <Button variant="outline" onClick={handleCopyLink}>
            {linkCopied ? '✓ Link Copied!' : '🔗 Copy Link'}
          </Button>
          <Button onClick={handlePrint}>📥 Download PDF</Button>
        </div>
      </div>

      {/* Document Preview/Edit */}
      <main role="main" aria-label="Hosting Options Document" className="bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 text-center">
          <img src="/AP-Designs-Logo-Indigo-ElectricBlue.webp" alt="AP Designs Logo" className="w-28 h-28 rounded-full mx-auto mb-4" style={{ filter: 'drop-shadow(0 0 20px rgba(0, 212, 255, 0.3))' }} />
          {isEditing ? (
            <>
              <input type="text" value={data.headerTitle} onChange={(e) => updateField('headerTitle', e.target.value)}
                aria-label="Document title"
                className="bg-transparent border-b border-cyan-400/50 text-3xl font-bold text-white text-center w-full focus:outline-none focus:ring-2 focus:ring-cyan-400" />
              <input type="text" value={data.headerSubtitle} onChange={(e) => updateField('headerSubtitle', e.target.value)}
                aria-label="Document subtitle"
                className="bg-transparent border-b border-gray-600 text-lg text-cyan-400 text-center w-full mt-2 focus:outline-none focus:ring-2 focus:ring-cyan-400" />
            </>
          ) : (
            <><h1 className="text-3xl font-bold mb-2">{data.headerTitle}</h1><p className="text-cyan-400 text-lg">{data.headerSubtitle}</p></>
          )}
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Overview */}
          <div className="bg-gradient-to-r from-cyan-500 to-indigo-500 p-6 rounded-lg text-white mb-8">
            <h2 className="text-xl font-bold mb-3">Overview</h2>
            <EditableText value={data.overviewText} onChange={(v) => updateField('overviewText', v)} className="mb-4 text-white" />
            <ul className="space-y-2 mt-4">
              <li className="flex items-start gap-3">
                <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shrink-0">1</span>
                <EditableText value={data.requirement1} onChange={(v) => updateField('requirement1', v)} className="text-white" />
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shrink-0">2</span>
                <EditableText value={data.requirement2} onChange={(v) => updateField('requirement2', v)} className="text-white" />
              </li>
            </ul>
            <EditableText value={data.overviewNote} onChange={(v) => updateField('overviewNote', v)} multiline className="mt-4 text-white/90" />
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {data.options.map((option) => (
              <div key={option.id} className={`border-2 rounded-lg p-6 relative ${option.isRecommended ? 'border-cyan-400' : 'border-gray-200'}`}>
                {option.isRecommended && (
                  <span className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-3 py-1 rounded text-xs font-bold uppercase">Best Value</span>
                )}
                <span className="text-4xl font-bold text-cyan-400">{option.letter}</span>
                {isEditing ? (
                  <>
                    <input type="text" value={option.title} onChange={(e) => updateOption(option.id, 'title', e.target.value)}
                      className="block w-full p-2 border border-gray-300 rounded mt-2 text-xl font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-400" />
                    <textarea value={option.description} onChange={(e) => updateOption(option.id, 'description', e.target.value)}
                      className="block w-full p-2 border border-gray-300 rounded mt-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400" rows={2} />
                  </>
                ) : (
                  <><h2 className="text-xl font-semibold text-gray-900 mt-2">{option.title}</h2><p className="text-gray-600 mt-1">{option.description}</p></>
                )}

                {/* What You Do */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200 flex items-center">
                    <span className="text-cyan-400 mr-2">▸</span> What You Do
                  </h3>
                  <ul className="space-y-2">
                    {option.whatYouDo.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold shrink-0">✓</span>
                        {isEditing ? (
                          <div className="flex-1 flex gap-2">
                            <input type="text" value={item} onChange={(e) => updateOptionListItem(option.id, 'whatYouDo', index, e.target.value)}
                              className="flex-1 p-2 border border-gray-300 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400" />
                            <button onClick={() => removeOptionListItem(option.id, 'whatYouDo', index)} className="text-red-500 hover:text-red-700 px-2">✕</button>
                          </div>
                        ) : <span className="text-gray-700">{item}</span>}
                      </li>
                    ))}
                  </ul>
                  {isEditing && <button onClick={() => addOptionListItem(option.id, 'whatYouDo')} className="mt-2 text-cyan-600 hover:text-cyan-700 text-sm font-medium">+ Add Item</button>}
                </div>

                {/* Providers */}
                {option.providers.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200 flex items-center">
                      <span className="text-cyan-400 mr-2">▸</span> Recommended Hosting Providers
                    </h3>
                    {option.providers.map((provider) => (
                      <div key={provider.id} className="bg-gray-100 border-l-4 border-cyan-400 p-3 mb-2 rounded">
                        {isEditing ? (
                          <>
                            <input type="text" value={provider.name} onChange={(e) => updateProvider(option.id, provider.id, 'name', e.target.value)}
                              className="w-full p-1 border border-gray-300 rounded font-semibold text-gray-900 mb-1 focus:outline-none focus:ring-2 focus:ring-cyan-400" />
                            <input type="text" value={provider.description} onChange={(e) => updateProvider(option.id, provider.id, 'description', e.target.value)}
                              className="w-full p-1 border border-gray-300 rounded text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400" />
                          </>
                        ) : (
                          <><div className="font-semibold text-gray-900">{provider.name}</div><div className="text-sm text-gray-600">{provider.description}</div></>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Pricing */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200 flex items-center">
                    <span className="text-cyan-400 mr-2">▸</span> {option.providers.length > 0 ? 'Typical Cost' : 'Cost'}
                  </h3>
                  <div className="bg-gradient-to-br from-cyan-50 to-indigo-50 p-4 rounded">
                    {option.pricing.map((price) => (
                      <div key={price.id} className="flex justify-between py-2 border-b border-cyan-200 last:border-b-0">
                        {isEditing ? (
                          <>
                            <input type="text" value={price.label} onChange={(e) => updatePricing(option.id, price.id, 'label', e.target.value)}
                              className="w-1/2 p-1 border border-gray-300 rounded text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400" />
                            <input type="text" value={price.value} onChange={(e) => updatePricing(option.id, price.id, 'value', e.target.value)}
                              className="w-1/3 p-1 border border-gray-300 rounded text-right text-cyan-600 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400" />
                          </>
                        ) : (
                          <><span className="text-gray-600">{price.label}</span><span className="text-cyan-600 font-semibold">{price.value}</span></>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* What We Handle */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200 flex items-center">
                    <span className="text-cyan-400 mr-2">▸</span> What AP Designs Handles
                  </h3>
                  <ul className="space-y-2">
                    {option.whatWeHandle.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold shrink-0">✓</span>
                        {isEditing ? (
                          <div className="flex-1 flex gap-2">
                            <input type="text" value={item} onChange={(e) => updateOptionListItem(option.id, 'whatWeHandle', index, e.target.value)}
                              className="flex-1 p-2 border border-gray-300 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400" />
                            <button onClick={() => removeOptionListItem(option.id, 'whatWeHandle', index)} className="text-red-500 hover:text-red-700 px-2">✕</button>
                          </div>
                        ) : <span className="text-gray-700">{item}</span>}
                      </li>
                    ))}
                  </ul>
                  {isEditing && <button onClick={() => addOptionListItem(option.id, 'whatWeHandle')} className="mt-2 text-cyan-600 hover:text-cyan-700 text-sm font-medium">+ Add Item</button>}
                </div>

                {/* Ideal For */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <span className="font-semibold text-gray-700">Ideal for: </span>
                  {isEditing ? (
                    <input type="text" value={option.idealFor} onChange={(e) => updateOption(option.id, 'idealFor', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400" />
                  ) : <span className="text-gray-600">{option.idealFor}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Domain Name Section */}
          <div className="border-2 border-cyan-400 rounded-lg p-6 mb-6">
            {isEditing ? (
              <input type="text" value={data.domainTitle} onChange={(e) => updateField('domainTitle', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-xl font-semibold text-gray-900 mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-400" />
            ) : (
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center"><span className="text-cyan-400 mr-2">⬢</span> {data.domainTitle}</h2>
            )}
            <EditableText value={data.domainDescription} onChange={(v) => updateField('domainDescription', v)} multiline className="text-gray-700 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center"><span className="text-cyan-400 mr-2">▸</span> Recommended Domain Registrars</h3>
            {data.domainProviders.map((provider) => (
              <div key={provider.id} className="bg-gray-100 border-l-4 border-cyan-400 p-3 mb-2 rounded">
                {isEditing ? (
                  <>
                    <input type="text" value={provider.name} onChange={(e) => updateDomainProvider(provider.id, 'name', e.target.value)}
                      className="w-full p-1 border border-gray-300 rounded font-semibold text-gray-900 mb-1 focus:outline-none focus:ring-2 focus:ring-cyan-400" />
                    <input type="text" value={provider.description} onChange={(e) => updateDomainProvider(provider.id, 'description', e.target.value)}
                      className="w-full p-1 border border-gray-300 rounded text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400" />
                  </>
                ) : (
                  <><div className="font-semibold text-gray-900">{provider.name}</div><div className="text-sm text-gray-600">{provider.description}</div></>
                )}
              </div>
            ))}
            <div className="bg-gradient-to-br from-cyan-50 to-indigo-50 p-4 rounded mt-4">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Typical Domain Cost</span>
                {isEditing ? (
                  <input type="text" value={data.domainPricing} onChange={(e) => updateField('domainPricing', e.target.value)}
                    className="w-32 p-1 border border-gray-300 rounded text-right text-cyan-600 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400" />
                ) : <span className="text-cyan-600 font-semibold">{data.domainPricing}</span>}
              </div>
            </div>
          </div>

          {/* Website Updates Section */}
          <div className="border-2 border-amber-400 rounded-lg p-6 mb-6 bg-amber-50/30">
            {isEditing ? (
              <input type="text" value={data.updatesTitle} onChange={(e) => updateField('updatesTitle', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-xl font-semibold text-gray-900 mb-4 focus:outline-none focus:ring-2 focus:ring-amber-400" />
            ) : (
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center"><span className="text-amber-500 mr-2">⚡</span> {data.updatesTitle}</h2>
            )}
            <EditableText value={data.updatesDescription} onChange={(v) => updateField('updatesDescription', v)} multiline className="text-gray-700 mb-4" />
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-4 rounded-lg border border-amber-300">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700 font-medium">Hourly Rate for Updates</span>
                {isEditing ? (
                  <input type="text" value={data.updatesRate} onChange={(e) => updateField('updatesRate', e.target.value)}
                    className="w-32 p-1 border border-gray-300 rounded text-right text-amber-600 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-amber-400" />
                ) : <span className="text-amber-600 font-bold text-lg">{data.updatesRate}</span>}
              </div>
            </div>
            <p className="text-gray-600 text-sm mt-4 bg-white p-3 rounded border border-gray-200">
              {isEditing ? (
                <textarea value={data.updatesNote} onChange={(e) => updateField('updatesNote', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-400" rows={2} />
              ) : <><span className="font-semibold">Note:</span> {data.updatesNote}</>}
            </p>
            <p className="text-amber-700 text-sm mt-3 font-medium">⚠️ This fee is separate from your hosting plan and billed only when you request changes.</p>
          </div>

          {/* Contact Form Section */}
          <div className="border-2 border-cyan-400 rounded-lg p-6 mb-6">
            {isEditing ? (
              <input type="text" value={data.contactFormTitle} onChange={(e) => updateField('contactFormTitle', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-xl font-semibold text-gray-900 mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-400" />
            ) : (
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center"><span className="text-cyan-400 mr-2">⬢</span> {data.contactFormTitle}</h2>
            )}
            <EditableText value={data.contactFormDescription} onChange={(v) => updateField('contactFormDescription', v)} multiline className="text-gray-700 mb-4" />
            <div className="bg-gray-900 text-cyan-400 p-4 rounded font-mono text-sm mt-4 border border-cyan-400">
              <div className="mb-2">
                <span className="text-white font-bold">Subject: </span>
                {isEditing ? (
                  <input type="text" value={data.autoReplySubject} onChange={(e) => updateField('autoReplySubject', e.target.value)}
                    className="bg-transparent border-b border-cyan-400/50 w-full focus:outline-none" />
                ) : <span>{data.autoReplySubject}</span>}
              </div>
              <div className="my-4">
                {isEditing ? (
                  <textarea value={data.autoReplyBody} onChange={(e) => updateField('autoReplyBody', e.target.value)}
                    className="bg-transparent border border-cyan-400/30 w-full p-2 rounded focus:outline-none" rows={3} />
                ) : <p>{data.autoReplyBody}</p>}
              </div>
              <div>
                {isEditing ? (
                  <input type="text" value={data.autoReplySignature} onChange={(e) => updateField('autoReplySignature', e.target.value)}
                    className="bg-transparent border-b border-cyan-400/50 w-full focus:outline-none" />
                ) : <p>{data.autoReplySignature}</p>}
              </div>
            </div>
            <p className="text-gray-600 text-sm italic mt-4">
              {isEditing ? (
                <input type="text" value={data.contactFormNote} onChange={(e) => updateField('contactFormNote', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded italic text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400" />
              ) : data.contactFormNote}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-br from-gray-900 to-black text-white p-8 text-center">
          {isEditing ? (
            <>
              <input type="text" value={data.footerTitle} onChange={(e) => updateField('footerTitle', e.target.value)}
                className="bg-transparent border-b border-cyan-400/50 text-2xl font-bold text-cyan-400 text-center w-full mb-4 focus:outline-none" />
              <textarea value={data.footerText} onChange={(e) => updateField('footerText', e.target.value)}
                className="bg-transparent border border-gray-700 w-full p-3 rounded text-gray-300 text-center focus:outline-none" rows={3} />
            </>
          ) : (
            <><h2 className="text-2xl font-bold text-cyan-400 mb-4">{data.footerTitle}</h2><p className="text-gray-300 max-w-2xl mx-auto">{data.footerText}</p></>
          )}
        </div>
      </main>
    </div>
  )
}

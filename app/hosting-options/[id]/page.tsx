'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

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
  contactFormTitle: string
  contactFormDescription: string
  autoReplySubject: string
  autoReplyBody: string
  autoReplySignature: string
  contactFormNote: string
  footerTitle: string
  footerText: string
  savedAt: string
}

export default function PublicHostingOptionsPage() {
  const params = useParams()
  const [data, setData] = useState<HostingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadDocument = async () => {
      const id = params.id as string
      if (!id) {
        setError('Document ID not provided')
        setLoading(false)
        return
      }

      try {
        // Fetch from API
        const response = await fetch(`/api/hosting-options/${id}`)
        if (response.ok) {
          const doc = await response.json()
          setData(doc)
        } else if (response.status === 404) {
          setError('Document not found. The link may have expired or been deleted.')
        } else {
          setError('Failed to load document')
        }
      } catch (err) {
        console.error('Error loading document:', err)
        setError('Failed to load document data')
      } finally {
        setLoading(false)
      }
    }

    loadDocument()
  }, [params.id])

  const handlePrint = () => {
    window.print()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
          <div className="text-6xl mb-4">🌐</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Document Not Found</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 print:py-0 print:bg-white">
      {/* Print Button */}
      <div className="max-w-4xl mx-auto mb-4 px-4 print:hidden">
        <button
          onClick={handlePrint}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2"
        >
          🖨️ Print / Download PDF
        </button>
      </div>

      {/* Document */}
      <div className="max-w-4xl mx-auto bg-white shadow-xl print:shadow-none print:max-w-none">
        <style jsx global>{`
          @media print {
            @page { size: 8.5in 11in; margin: 0.4in; }
            body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          }
        `}</style>

        {/* Header */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 text-center print:bg-gray-900">
          <img src="/AP-Designs-Logo-Indigo-ElectricBlue.webp" alt="Logo" className="w-28 h-28 rounded-full mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">{data.headerTitle}</h1>
          <p className="text-cyan-400 text-lg">{data.headerSubtitle}</p>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Overview */}
          <div className="bg-gradient-to-r from-cyan-500 to-indigo-500 p-6 rounded-lg text-white mb-8 print:bg-cyan-600">
            <h2 className="text-xl font-bold mb-3">Overview</h2>
            <p className="mb-4">{data.overviewText}</p>
            <ul className="space-y-2 mt-4">
              <li className="flex items-start gap-2">
                <span className="font-bold">1.</span>
                <span>{data.requirement1}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">2.</span>
                <span>{data.requirement2}</span>
              </li>
            </ul>
            <p className="mt-4 text-sm opacity-90">{data.overviewNote}</p>
          </div>

          {/* Hosting Options */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {data.options.map((opt) => (
              <div key={opt.id} className={`border-2 rounded-lg p-6 ${opt.isRecommended ? 'border-cyan-400' : 'border-gray-200'}`}>
                {opt.isRecommended && (
                  <span className="bg-gradient-to-r from-cyan-500 to-indigo-500 text-white text-xs px-3 py-1 rounded-full font-semibold uppercase">
                    Recommended
                  </span>
                )}
                <div className="text-4xl font-bold text-cyan-500 my-2">{opt.letter}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{opt.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{opt.description}</p>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">What You Do:</h4>
                  <ul className="space-y-1">
                    {opt.whatYouDo.map((item, i) => (
                      <li key={i} className="text-gray-600 text-sm flex items-start gap-2">
                        <span className="text-cyan-500">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {opt.providers.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Recommended Providers:</h4>
                    {opt.providers.map((p) => (
                      <div key={p.id} className="bg-gray-50 p-2 rounded mb-1 border-l-4 border-cyan-400">
                        <span className="font-semibold text-gray-900">{p.name}</span>
                        <span className="text-gray-500 text-sm ml-2">{p.description}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Cost:</h4>
                  <div className="bg-gradient-to-r from-cyan-50 to-indigo-50 p-3 rounded">
                    {opt.pricing.map((p) => (
                      <div key={p.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">{p.label}</span>
                        <span className="text-cyan-600 font-semibold">{p.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">What We Handle:</h4>
                  <ul className="space-y-1">
                    {opt.whatWeHandle.map((item, i) => (
                      <li key={i} className="text-gray-600 text-sm flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-100 p-3 rounded text-sm">
                  <span className="font-semibold text-gray-900">Ideal For: </span>
                  <span className="text-gray-600">{opt.idealFor}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Domain Section */}
          <div className="border-2 border-cyan-400 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-3">{data.domainTitle}</h3>
            <p className="text-gray-600 mb-4">{data.domainDescription}</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Recommended Providers:</h4>
                {data.domainProviders.map((p) => (
                  <div key={p.id} className="bg-gray-50 p-2 rounded mb-1 border-l-4 border-cyan-400">
                    <span className="font-semibold text-gray-900">{p.name}</span>
                    <span className="text-gray-500 text-sm ml-2">{p.description}</span>
                  </div>
                ))}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Typical Cost:</h4>
                <div className="bg-gradient-to-r from-cyan-50 to-indigo-50 p-3 rounded">
                  <span className="text-cyan-600 font-semibold text-lg">{data.domainPricing}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-3">{data.contactFormTitle}</h3>
            <p className="text-gray-600 mb-4">{data.contactFormDescription}</p>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="text-gray-500 text-sm mb-2">Subject: {data.autoReplySubject}</p>
              <p className="text-gray-700 mb-2">{data.autoReplyBody}</p>
              <p className="text-gray-600 italic">{data.autoReplySignature}</p>
            </div>
            <p className="text-gray-500 text-sm mt-3 italic">{data.contactFormNote}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-900 text-white p-6 text-center">
          <h3 className="text-cyan-400 font-semibold mb-2">{data.footerTitle}</h3>
          <p className="text-gray-300 text-sm max-w-2xl mx-auto">{data.footerText}</p>
        </div>
      </div>
    </div>
  )
}

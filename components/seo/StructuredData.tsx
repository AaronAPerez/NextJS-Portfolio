'use client'

import Script from 'next/script'

type StructuredDataProps = {
  type?: string
  data: Record<string, any>
}

export function StructuredData({ type, data }: StructuredDataProps) {
  if (!data) {
    return null
  }

  // If data already has @context and @type, use it directly
  if ('@context' in data && '@type' in data) {
    return (
      <Script
        id={`structured-data-${type || 'custom'}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(data)
        }}
        strategy="afterInteractive"
      />
    )
  }

  let schema = null

  try {
    if (type === 'person' && 'jobTitle' in data) {
      schema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: data.name,
        jobTitle: data.jobTitle,
        description: data.description,
        url: data.url,
        email: data.email
      }
    } else if (type === 'localBusiness') {
      schema = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: data.name,
        description: data.description,
      }
    }
  } catch (error) {
    console.warn('Error generating schema:', error)
    return null
  }

  if (!schema) return null

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
      strategy="afterInteractive"
    />
  )
}
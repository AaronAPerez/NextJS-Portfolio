'use client'

import { useCallback, useRef } from 'react'

interface PrintOptions {
  filename?: string
  title?: string
  onBeforePrint?: () => void
  onAfterPrint?: () => void
}

/**
 * Hook for printing and downloading documents as PDF
 * Uses browser's native print functionality with print-specific CSS
 */
export function usePrintDocument(options: PrintOptions = {}) {
  const printRef = useRef<HTMLDivElement>(null)

  const handlePrint = useCallback(() => {
    if (!printRef.current) return

    options.onBeforePrint?.()

    // Create a new window for printing
    const printWindow = window.open('', '_blank', 'width=800,height=600')
    if (!printWindow) {
      alert('Please allow popups to print this document')
      return
    }

    // Get the content to print
    const content = printRef.current.innerHTML

    // Write the print document
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${options.title || 'Document'}</title>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
          <style>
            /* Reset */
            *, *::before, *::after {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }

            /* Variables */
            :root {
              --color-primary: #00D4FF;
              --color-primary-dark: #0096C7;
              --color-secondary: #4361EE;
              --color-black: #000000;
              --color-gray-900: #0F172A;
              --color-gray-800: #1E293B;
              --color-gray-700: #334155;
              --color-gray-600: #475569;
              --color-gray-100: #F1F5F9;
              --color-white: #FFFFFF;
            }

            /* Base styles */
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              font-size: 14px;
              line-height: 1.6;
              color: #334155;
              background: white;
              padding: 0;
              margin: 0;
            }

            /* Print content wrapper */
            .print-content {
              max-width: 100%;
              margin: 0;
              padding: 0;
            }

            /* Print-specific styles */
            @media print {
              body {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }

              .no-print {
                display: none !important;
              }

              .page-break {
                page-break-before: always;
              }

              .avoid-break {
                page-break-inside: avoid;
              }
            }

            /* Document styles */
            .document-container {
              max-width: 800px;
              margin: 0 auto;
              background: white;
            }

            /* Header */
            .document-header {
              background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
              padding: 2rem;
              text-align: center;
              color: white;
            }

            .document-header h1 {
              font-family: 'Space Grotesk', sans-serif;
              font-size: 1.75rem;
              font-weight: 700;
              margin-bottom: 0.5rem;
            }

            .document-header p {
              color: #00D4FF;
              font-size: 1rem;
            }

            .logo {
              max-width: 120px;
              margin-bottom: 1rem;
              border-radius: 50%;
            }

            /* Content */
            .document-content {
              padding: 2rem;
            }

            /* Tables */
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 1rem 0;
            }

            th, td {
              padding: 0.75rem;
              text-align: left;
              border-bottom: 1px solid #E2E8F0;
            }

            th {
              background: #F8FAFC;
              font-weight: 600;
              color: #0F172A;
            }

            /* Form fields */
            .form-row {
              display: flex;
              gap: 1rem;
              margin-bottom: 1rem;
            }

            .form-group {
              flex: 1;
            }

            .form-label {
              display: block;
              font-size: 0.875rem;
              font-weight: 500;
              color: #475569;
              margin-bottom: 0.25rem;
            }

            .form-value {
              padding: 0.5rem;
              background: #F8FAFC;
              border: 1px solid #E2E8F0;
              border-radius: 0.25rem;
              min-height: 2rem;
            }

            /* Section styles */
            .section {
              margin-bottom: 2rem;
            }

            .section-title {
              font-family: 'Space Grotesk', sans-serif;
              font-size: 1.25rem;
              font-weight: 600;
              color: #0F172A;
              margin-bottom: 1rem;
              padding-bottom: 0.5rem;
              border-bottom: 2px solid #00D4FF;
            }

            /* Totals */
            .totals-section {
              background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(67, 97, 238, 0.1));
              padding: 1.5rem;
              border-radius: 0.5rem;
              margin-top: 2rem;
            }

            .total-row {
              display: flex;
              justify-content: space-between;
              padding: 0.5rem 0;
              border-bottom: 1px solid rgba(0, 212, 255, 0.2);
            }

            .total-row:last-child {
              border-bottom: none;
              font-weight: 700;
              font-size: 1.25rem;
              color: #0F172A;
            }

            .total-label {
              color: #475569;
            }

            .total-value {
              color: #00D4FF;
              font-weight: 600;
            }

            /* Footer */
            .document-footer {
              background: #0F172A;
              color: white;
              padding: 1.5rem;
              text-align: center;
              margin-top: 2rem;
            }

            .document-footer h3 {
              color: #00D4FF;
              margin-bottom: 0.5rem;
            }

            /* Options grid */
            .options-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 1.5rem;
              margin: 1.5rem 0;
            }

            @media print {
              .options-grid {
                grid-template-columns: repeat(2, 1fr);
              }
            }

            .option-card {
              border: 2px solid #E2E8F0;
              border-radius: 0.5rem;
              padding: 1.5rem;
              background: white;
            }

            .option-card.recommended {
              border-color: #00D4FF;
            }

            .badge {
              display: inline-block;
              background: linear-gradient(135deg, #00D4FF, #4361EE);
              color: white;
              padding: 0.25rem 0.75rem;
              border-radius: 0.25rem;
              font-size: 0.75rem;
              font-weight: 600;
              text-transform: uppercase;
              margin-bottom: 0.5rem;
            }

            .option-title {
              font-family: 'Space Grotesk', sans-serif;
              font-size: 1.25rem;
              font-weight: 600;
              color: #0F172A;
              margin-bottom: 0.5rem;
            }

            .option-description {
              color: #64748B;
              font-size: 0.875rem;
              line-height: 1.5;
            }

            /* Provider cards */
            .provider-card {
              background: #F8FAFC;
              border-left: 4px solid #00D4FF;
              padding: 0.75rem 1rem;
              margin-bottom: 0.5rem;
              border-radius: 0.25rem;
            }

            .provider-name {
              font-weight: 600;
              color: #0F172A;
            }

            .provider-desc {
              font-size: 0.875rem;
              color: #64748B;
            }

            /* Pricing */
            .pricing-box {
              background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(67, 97, 238, 0.1));
              padding: 1rem;
              border-radius: 0.5rem;
              margin: 1rem 0;
            }

            .price-row {
              display: flex;
              justify-content: space-between;
              padding: 0.5rem 0;
              border-bottom: 1px solid rgba(0, 212, 255, 0.2);
            }

            .price-row:last-child {
              border-bottom: none;
            }

            .price-label {
              color: #475569;
            }

            .price-value {
              color: #00D4FF;
              font-weight: 600;
            }

            /* List styles */
            .info-list {
              list-style: none;
              padding: 0;
              margin: 1rem 0;
            }

            .info-list li {
              padding: 0.5rem 0;
              padding-left: 1.5rem;
              position: relative;
              color: #475569;
            }

            .info-list li::before {
              content: '✓';
              position: absolute;
              left: 0;
              color: #00D4FF;
              font-weight: 700;
            }

            /* Overview box */
            .overview-box {
              background: linear-gradient(135deg, #00D4FF, #4361EE);
              padding: 1.5rem;
              border-radius: 0.5rem;
              color: white;
              margin-bottom: 2rem;
            }

            .overview-box h2 {
              font-family: 'Space Grotesk', sans-serif;
              font-size: 1.25rem;
              margin-bottom: 0.75rem;
            }

            .overview-box p {
              margin-bottom: 0.5rem;
              line-height: 1.6;
            }

            /* Standalone section */
            .standalone-section {
              border: 2px solid #00D4FF;
              border-radius: 0.5rem;
              padding: 1.5rem;
              margin: 1.5rem 0;
            }

            .standalone-title {
              font-family: 'Space Grotesk', sans-serif;
              font-size: 1.25rem;
              font-weight: 600;
              color: #0F172A;
              margin-bottom: 1rem;
            }
          </style>
        </head>
        <body>
          <div class="print-content">
            ${content}
          </div>
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              };
            };
          </script>
        </body>
      </html>
    `)

    printWindow.document.close()
    options.onAfterPrint?.()
  }, [options])

  const handleDownloadPDF = useCallback(() => {
    // For PDF download, we use the same print mechanism
    // The user can choose "Save as PDF" from the print dialog
    handlePrint()
  }, [handlePrint])

  return {
    printRef,
    handlePrint,
    handleDownloadPDF,
  }
}

export default usePrintDocument

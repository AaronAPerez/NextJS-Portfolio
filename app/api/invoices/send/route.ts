'use server'

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const getResendClient = () => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured')
  }
  return new Resend(process.env.RESEND_API_KEY)
}

const invoiceItemSchema = z.object({
  id: z.string(),
  description: z.string(),
  quantity: z.number(),
  rate: z.number(),
})

const paymentMethodsSchema = z.object({
  paypalEnabled: z.boolean(),
  paypalEmail: z.string(),
  venmoEnabled: z.boolean(),
  venmoUsername: z.string(),
  cashappEnabled: z.boolean(),
  cashappUsername: z.string(),
  checkEnabled: z.boolean(),
  checkPayableTo: z.string(),
  checkMailingAddress: z.string(),
  achEnabled: z.boolean(),
  bankName: z.string(),
  bankAccountName: z.string(),
  bankRoutingNumber: z.string(),
  bankAccountLast4: z.string(),
})

const invoiceEmailSchema = z.object({
  companyName: z.string(),
  companyAddress: z.string(),
  companyCity: z.string(),
  companyPhone: z.string(),
  companyEmail: z.string(),
  companyWebsite: z.string(),
  invoiceNumber: z.string(),
  invoiceDate: z.string(),
  dueDate: z.string(),
  clientName: z.string(),
  clientCompany: z.string(),
  clientAddress: z.string(),
  clientCity: z.string(),
  clientEmail: z.string().email(),
  clientPhone: z.string(),
  items: z.array(invoiceItemSchema),
  notes: z.string(),
  terms: z.string(),
  taxRate: z.number(),
  paymentMethods: paymentMethodsSchema,
})

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

const getInvoiceEmailTemplate = (data: z.infer<typeof invoiceEmailSchema>, subtotal: number, tax: number, total: number) => {
  const itemsHtml = data.items.map(item => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #374151;">${item.description}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #374151; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #374151; text-align: right;">${formatCurrency(item.rate)}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #111827; text-align: right; font-weight: 600;">${formatCurrency(item.quantity * item.rate)}</td>
    </tr>
  `).join('')

  // Build payment methods HTML with clickable links
  const paymentMethodsHtml: string[] = []

  if (data.paymentMethods.paypalEnabled && data.paymentMethods.paypalEmail) {
    const paypalLink = `https://paypal.me/${data.paymentMethods.paypalEmail.split('@')[0]}`
    paymentMethodsHtml.push(`
      <div style="background: #f0f7ff; border: 2px solid #0070ba; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <span style="font-size: 20px; margin-right: 8px;">💳</span>
          <strong style="color: #0070ba; font-size: 16px;">PayPal</strong>
        </div>
        <p style="margin: 0 0 8px; color: #374151; font-size: 14px;">Send payment to:</p>
        <p style="margin: 0 0 12px; color: #111827; font-weight: 600;">${data.paymentMethods.paypalEmail}</p>
        <a href="${paypalLink}" target="_blank" style="display: inline-block; background: #0070ba; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">
          Pay with PayPal →
        </a>
      </div>
    `)
  }

  if (data.paymentMethods.venmoEnabled && data.paymentMethods.venmoUsername) {
    // Venmo username can be email or @username
    const venmoId = data.paymentMethods.venmoUsername.startsWith('@')
      ? data.paymentMethods.venmoUsername.slice(1)
      : data.paymentMethods.venmoUsername.includes('@')
        ? data.paymentMethods.venmoUsername.split('@')[0]
        : data.paymentMethods.venmoUsername
    const venmoLink = `https://venmo.com/${venmoId}?txn=pay&amount=${total.toFixed(2)}&note=Invoice%20${encodeURIComponent(data.invoiceNumber)}`
    paymentMethodsHtml.push(`
      <div style="background: #f0f9ff; border: 2px solid #008CFF; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <span style="font-size: 20px; margin-right: 8px;">📱</span>
          <strong style="color: #008CFF; font-size: 16px;">Venmo</strong>
        </div>
        <p style="margin: 0 0 8px; color: #374151; font-size: 14px;">Send payment to:</p>
        <p style="margin: 0 0 12px; color: #111827; font-weight: 600;">${data.paymentMethods.venmoUsername}</p>
        <a href="${venmoLink}" target="_blank" style="display: inline-block; background: #008CFF; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">
          Pay with Venmo →
        </a>
      </div>
    `)
  }

  if (data.paymentMethods.cashappEnabled && data.paymentMethods.cashappUsername) {
    // Cash App username - extract $cashtag or use email prefix
    const cashtag = data.paymentMethods.cashappUsername.startsWith('$')
      ? data.paymentMethods.cashappUsername.slice(1)
      : data.paymentMethods.cashappUsername.includes('@')
        ? data.paymentMethods.cashappUsername.split('@')[0]
        : data.paymentMethods.cashappUsername
    const cashappLink = `https://cash.app/$${cashtag}/${total.toFixed(2)}`
    paymentMethodsHtml.push(`
      <div style="background: #f0fff4; border: 2px solid #00D632; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <span style="font-size: 20px; margin-right: 8px;">💵</span>
          <strong style="color: #00D632; font-size: 16px;">Cash App</strong>
        </div>
        <p style="margin: 0 0 8px; color: #374151; font-size: 14px;">Send payment to:</p>
        <p style="margin: 0 0 12px; color: #111827; font-weight: 600;">$${cashtag}</p>
        <a href="${cashappLink}" target="_blank" style="display: inline-block; background: #00D632; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">
          Pay with Cash App →
        </a>
      </div>
    `)
  }

  if (data.paymentMethods.checkEnabled && data.paymentMethods.checkPayableTo) {
    paymentMethodsHtml.push(`
      <div style="background: #f9fafb; border: 2px solid #6b7280; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <span style="font-size: 20px; margin-right: 8px;">📝</span>
          <strong style="color: #374151; font-size: 16px;">Check</strong>
        </div>
        <p style="margin: 0 0 4px; color: #374151; font-size: 14px;">Make payable to:</p>
        <p style="margin: 0; color: #111827; font-weight: 600;">${data.paymentMethods.checkPayableTo}</p>
        ${data.paymentMethods.checkMailingAddress ? `<p style="margin: 8px 0 0; color: #6b7280; font-size: 12px;">Mail to: ${data.paymentMethods.checkMailingAddress}</p>` : ''}
      </div>
    `)
  }

  if (data.paymentMethods.achEnabled && (data.paymentMethods.bankName || data.paymentMethods.bankRoutingNumber)) {
    paymentMethodsHtml.push(`
      <div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <span style="font-size: 20px; margin-right: 8px;">🏦</span>
          <strong style="color: #16a34a; font-size: 16px;">Bank Transfer (ACH)</strong>
        </div>
        <table style="width: 100%; font-size: 14px;">
          ${data.paymentMethods.bankName ? `<tr><td style="color: #374151; padding: 4px 0;">Bank:</td><td style="color: #111827; font-weight: 600; padding: 4px 0;">${data.paymentMethods.bankName}</td></tr>` : ''}
          ${data.paymentMethods.bankAccountName ? `<tr><td style="color: #374151; padding: 4px 0;">Account Name:</td><td style="color: #111827; font-weight: 600; padding: 4px 0;">${data.paymentMethods.bankAccountName}</td></tr>` : ''}
          ${data.paymentMethods.bankRoutingNumber ? `<tr><td style="color: #374151; padding: 4px 0;">Routing #:</td><td style="color: #111827; font-weight: 600; padding: 4px 0;">${data.paymentMethods.bankRoutingNumber}</td></tr>` : ''}
          ${data.paymentMethods.bankAccountLast4 ? `<tr><td style="color: #374151; padding: 4px 0;">Account #:</td><td style="color: #111827; font-weight: 600; padding: 4px 0;">****${data.paymentMethods.bankAccountLast4}</td></tr>` : ''}
        </table>
        <p style="margin: 12px 0 0; color: #6b7280; font-size: 12px; font-style: italic;">Contact for full account number</p>
      </div>
    `)
  }

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice ${data.invoiceNumber}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); padding: 32px; text-align: center;">
              <h1 style="margin: 0 0 8px; color: #ffffff; font-size: 32px; font-weight: bold;">INVOICE</h1>
              <p style="margin: 0; color: rgba(255,255,255,0.9); font-size: 16px;">${data.invoiceNumber}</p>
            </td>
          </tr>

          <!-- Company & Client Info -->
          <tr>
            <td style="padding: 32px;">
              <table role="presentation" style="width: 100%; margin-bottom: 24px;">
                <tr>
                  <td style="vertical-align: top; width: 50%;">
                    <h3 style="margin: 0 0 12px; color: #0ea5e9; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">From</h3>
                    <p style="margin: 0; color: #111827; font-weight: 600; font-size: 16px;">${data.companyName}</p>
                    ${data.companyAddress ? `<p style="margin: 4px 0 0; color: #6b7280; font-size: 14px;">${data.companyAddress}</p>` : ''}
                    <p style="margin: 4px 0 0; color: #6b7280; font-size: 14px;">${data.companyCity}</p>
                    <p style="margin: 4px 0 0; color: #6b7280; font-size: 14px;">${data.companyPhone}</p>
                    <p style="margin: 4px 0 0; color: #6b7280; font-size: 14px;">${data.companyEmail}</p>
                  </td>
                  <td style="vertical-align: top; width: 50%; text-align: right;">
                    <h3 style="margin: 0 0 12px; color: #0ea5e9; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Bill To</h3>
                    <p style="margin: 0; color: #111827; font-weight: 600; font-size: 16px;">${data.clientName}</p>
                    ${data.clientCompany ? `<p style="margin: 4px 0 0; color: #6b7280; font-size: 14px;">${data.clientCompany}</p>` : ''}
                    ${data.clientAddress ? `<p style="margin: 4px 0 0; color: #6b7280; font-size: 14px;">${data.clientAddress}</p>` : ''}
                    ${data.clientCity ? `<p style="margin: 4px 0 0; color: #6b7280; font-size: 14px;">${data.clientCity}</p>` : ''}
                    <p style="margin: 4px 0 0; color: #6b7280; font-size: 14px;">${data.clientEmail}</p>
                  </td>
                </tr>
              </table>

              <!-- Dates -->
              <table role="presentation" style="width: 100%; background: #f9fafb; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 8px 16px; text-align: center; border-right: 1px solid #e5e7eb;">
                    <p style="margin: 0; color: #6b7280; font-size: 12px; text-transform: uppercase;">Invoice Date</p>
                    <p style="margin: 4px 0 0; color: #111827; font-weight: 600; font-size: 14px;">${formatDate(data.invoiceDate)}</p>
                  </td>
                  <td style="padding: 8px 16px; text-align: center; border-right: 1px solid #e5e7eb;">
                    <p style="margin: 0; color: #6b7280; font-size: 12px; text-transform: uppercase;">Due Date</p>
                    <p style="margin: 4px 0 0; color: #111827; font-weight: 600; font-size: 14px;">${formatDate(data.dueDate)}</p>
                  </td>
                  <td style="padding: 8px 16px; text-align: center;">
                    <p style="margin: 0; color: #6b7280; font-size: 12px; text-transform: uppercase;">Amount Due</p>
                    <p style="margin: 4px 0 0; color: #0ea5e9; font-weight: 700; font-size: 18px;">${formatCurrency(total)}</p>
                  </td>
                </tr>
              </table>

              <!-- Items Table -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <thead>
                  <tr style="background: #1e293b;">
                    <th style="padding: 12px; text-align: left; color: white; font-size: 12px; text-transform: uppercase;">Description</th>
                    <th style="padding: 12px; text-align: center; color: white; font-size: 12px; text-transform: uppercase;">Qty</th>
                    <th style="padding: 12px; text-align: right; color: white; font-size: 12px; text-transform: uppercase;">Rate</th>
                    <th style="padding: 12px; text-align: right; color: white; font-size: 12px; text-transform: uppercase;">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>

              <!-- Totals -->
              <table role="presentation" style="width: 100%; margin-bottom: 24px;">
                <tr>
                  <td style="width: 60%;"></td>
                  <td style="width: 40%;">
                    <table role="presentation" style="width: 100%;">
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280;">Subtotal</td>
                        <td style="padding: 8px 0; text-align: right; color: #111827; font-weight: 500;">${formatCurrency(subtotal)}</td>
                      </tr>
                      ${data.taxRate > 0 ? `
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280;">Tax (${data.taxRate}%)</td>
                        <td style="padding: 8px 0; text-align: right; color: #111827; font-weight: 500;">${formatCurrency(tax)}</td>
                      </tr>
                      ` : ''}
                      <tr>
                        <td style="padding: 12px 0; border-top: 2px solid #e5e7eb; color: #111827; font-weight: 700; font-size: 16px;">Total Due</td>
                        <td style="padding: 12px 0; border-top: 2px solid #e5e7eb; text-align: right; color: #0ea5e9; font-weight: 700; font-size: 20px;">${formatCurrency(total)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              ${paymentMethodsHtml.length > 0 ? `
              <!-- Payment Methods -->
              <div style="margin-bottom: 24px;">
                <h3 style="margin: 0 0 16px; color: #111827; font-size: 18px; font-weight: 600; border-bottom: 2px solid #0ea5e9; padding-bottom: 8px;">Payment Options</h3>
                <p style="margin: 0 0 16px; color: #6b7280; font-size: 14px;">Click any button below to pay instantly:</p>
                ${paymentMethodsHtml.join('')}
              </div>
              ` : ''}

              <!-- Notes & Terms -->
              ${data.notes || data.terms ? `
              <table role="presentation" style="width: 100%; margin-bottom: 24px;">
                <tr>
                  ${data.notes ? `
                  <td style="vertical-align: top; width: 50%; padding-right: 12px;">
                    <div style="background: #f9fafb; padding: 16px; border-radius: 8px;">
                      <h4 style="margin: 0 0 8px; color: #374151; font-size: 14px; font-weight: 600;">Notes</h4>
                      <p style="margin: 0; color: #6b7280; font-size: 13px; line-height: 1.5;">${data.notes}</p>
                    </div>
                  </td>
                  ` : ''}
                  ${data.terms ? `
                  <td style="vertical-align: top; width: 50%; padding-left: 12px;">
                    <div style="background: #f9fafb; padding: 16px; border-radius: 8px;">
                      <h4 style="margin: 0 0 8px; color: #374151; font-size: 14px; font-weight: 600;">Terms & Conditions</h4>
                      <p style="margin: 0; color: #6b7280; font-size: 13px; line-height: 1.5;">${data.terms}</p>
                    </div>
                  </td>
                  ` : ''}
                </tr>
              </table>
              ` : ''}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: #1e293b; padding: 24px; text-align: center;">
              <p style="margin: 0 0 8px; color: #0ea5e9; font-weight: 600; font-size: 16px;">Thank You for Your Business!</p>
              <p style="margin: 0; color: #94a3b8; font-size: 14px;">
                Questions? Contact us at
                <a href="mailto:${data.companyEmail}" style="color: #0ea5e9; text-decoration: none;">${data.companyEmail}</a>
                ${data.companyWebsite ? ` | <a href="https://${data.companyWebsite}" style="color: #0ea5e9; text-decoration: none;">${data.companyWebsite}</a>` : ''}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validationResult = invoiceEmailSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { message: 'Validation failed', errors: validationResult.error.issues },
        { status: 400 }
      )
    }

    const data = validationResult.data

    if (!data.clientEmail) {
      return NextResponse.json(
        { message: 'Client email is required to send invoice' },
        { status: 400 }
      )
    }

    // Calculate totals
    const subtotal = data.items.reduce((sum, item) => sum + item.quantity * item.rate, 0)
    const tax = subtotal * (data.taxRate / 100)
    const total = subtotal + tax

    const resend = getResendClient()

    // Send invoice to client
    const result = await resend.emails.send({
      from: `${data.companyName} <noreply@aaronaperez.dev>`,
      to: data.clientEmail,
      replyTo: data.companyEmail,
      subject: `Invoice ${data.invoiceNumber} - ${formatCurrency(total)} Due ${formatDate(data.dueDate)}`,
      html: getInvoiceEmailTemplate(data, subtotal, tax, total),
    })

    if (result.error) {
      console.error('Failed to send invoice email:', result.error)
      return NextResponse.json(
        { message: 'Failed to send email. Please try again.', error: result.error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: `Invoice sent successfully to ${data.clientEmail}`,
      success: true,
      emailId: result.data?.id,
    })

  } catch (error) {
    console.error('Invoice email error:', error)
    return NextResponse.json(
      { message: 'Failed to send invoice email', success: false },
      { status: 500 }
    )
  }
}

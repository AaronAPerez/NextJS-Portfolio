import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

// Lazy initialization of Resend to avoid build-time errors
const getResendClient = () => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured');
  }
  return new Resend(process.env.RESEND_API_KEY);
};

// Validation schema
const contactFormSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().min(5).max(100).refine(
    (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    { message: 'Invalid email address' }
  ),
  subject: z.string().min(5).max(100),
  message: z.string().min(10).max(1000),
});

// Professional HTML email template for admin notification
const getAdminEmailTemplate = (name: string, email: string, subject: string, message: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 32px; border-radius: 16px 16px 0 0; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                ✉️ New Contact Form Submission
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px;">
              <p style="margin: 0 0 24px; color: #374151; font-size: 16px; line-height: 1.5;">
                You've received a new message from your portfolio website:
              </p>

              <!-- Contact Info Card -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="background-color: #f9fafb; padding: 20px; border-radius: 12px;">
                    <table role="presentation" style="width: 100%;">
                      <tr>
                        <td style="padding: 8px 0;">
                          <strong style="color: #4b5563; font-size: 14px;">👤 Name:</strong>
                          <p style="margin: 4px 0 0; color: #111827; font-size: 16px;">${name}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <strong style="color: #4b5563; font-size: 14px;">📧 Email:</strong>
                          <p style="margin: 4px 0 0;">
                            <a href="mailto:${email}" style="color: #6366f1; text-decoration: none; font-size: 16px;">${email}</a>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <strong style="color: #4b5563; font-size: 14px;">📝 Subject:</strong>
                          <p style="margin: 4px 0 0; color: #111827; font-size: 16px;">${subject}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message Card -->
              <div style="background-color: #f9fafb; padding: 20px; border-radius: 12px; border-left: 4px solid #6366f1; margin-bottom: 24px;">
                <strong style="color: #4b5563; font-size: 14px; display: block; margin-bottom: 12px;">💬 Message:</strong>
                <p style="margin: 0; color: #111827; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>

              <!-- Action Button -->
              <table role="presentation" style="width: 100%;">
                <tr>
                  <td style="text-align: center; padding: 24px 0;">
                    <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}"
                       style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                      Reply to ${name}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #f9fafb; border-radius: 0 0 16px 16px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 12px; text-align: center; line-height: 1.5;">
                This email was sent from your portfolio contact form at <a href="https://aaronaperez.dev" style="color: #6366f1; text-decoration: none;">aaronaperez.dev</a>
              </p>
              <p style="margin: 8px 0 0; color: #6b7280; font-size: 12px; text-align: center;">
                Received on ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// User confirmation email template
const getUserConfirmationTemplate = (name: string, subject: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Message Received - Aaron A. Perez</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; border-radius: 16px 16px 0 0; text-align: center;">
              <div style="margin-bottom: 16px; font-size: 48px;">✅</div>
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                Message Received!
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 32px;">
              <p style="margin: 0 0 16px; color: #111827; font-size: 18px; font-weight: 600;">
                Hi ${name},
              </p>

              <p style="margin: 0 0 24px; color: #374151; font-size: 16px; line-height: 1.6;">
                Thank you for reaching out! I've received your message regarding "<strong>${subject}</strong>" and I'll get back to you as soon as possible.
              </p>

              <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 20px; border-radius: 12px; border-left: 4px solid #0ea5e9; margin-bottom: 24px;">
                <p style="margin: 0; color: #0c4a6e; font-size: 14px; line-height: 1.6;">
                  <strong>💡 What happens next?</strong><br>
                  I typically respond within 24-48 hours. In the meantime, feel free to check out my portfolio and recent projects at <a href="https://aaronaperez.dev" style="color: #0284c7; text-decoration: none;">aaronaperez.dev</a>.
                </p>
              </div>

              <!-- Quick Links -->
              <table role="presentation" style="width: 100%; margin-top: 32px;">
                <tr>
                  <td style="padding: 8px; text-align: center;">
                    <a href="https://aaronaperez.dev" style="color: #6366f1; text-decoration: none; font-size: 14px; font-weight: 500;">🌐 Visit Portfolio</a>
                  </td>
                  <td style="padding: 8px; text-align: center;">
                    <a href="https://github.com/AaronAPerez" style="color: #6366f1; text-decoration: none; font-size: 14px; font-weight: 500;">👨‍💻 GitHub</a>
                  </td>
                  <td style="padding: 8px; text-align: center;">
                    <a href="https://linkedin.com/in/aaron-a-perez" style="color: #6366f1; text-decoration: none; font-size: 14px; font-weight: 500;">💼 LinkedIn</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #f9fafb; border-radius: 0 0 16px 16px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px; color: #111827; font-size: 14px; font-weight: 600; text-align: center;">
                Aaron A. Perez
              </p>
              <p style="margin: 0; color: #6b7280; font-size: 12px; text-align: center; line-height: 1.5;">
                Full Stack Developer | React • TypeScript • Next.js • .NET • C#
              </p>
              <p style="margin: 12px 0 0; color: #6b7280; font-size: 11px; text-align: center;">
                This is an automated confirmation email. Please do not reply to this message.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();

    // Validate with Zod
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: 'Validation failed',
          errors: validationResult.error.issues
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = validationResult.data;

    // Rate limiting headers (optional - implement rate limiting if needed)
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    console.log(`Contact form submission from IP: ${ip}, Email: ${email}`);

    // Get Resend client
    const resend = getResendClient();

    // Send email to admin
    const adminEmailResult = await resend.emails.send({
      from: 'Portfolio Contact <noreply@aaronaperez.dev>',
      to: 'contact@aaronaperez.dev',
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: getAdminEmailTemplate(name, email, subject, message),
    });

    if (adminEmailResult.error) {
      console.error('Failed to send admin email:', adminEmailResult.error);
      throw new Error('Failed to send notification email');
    }

    // Send confirmation email to user
    const userEmailResult = await resend.emails.send({
      from: 'Aaron A. Perez <noreply@aaronaperez.dev>',
      to: email,
      subject: `Message Received: ${subject}`,
      html: getUserConfirmationTemplate(name, subject),
    });

    if (userEmailResult.error) {
      console.error('Failed to send user confirmation:', userEmailResult.error);
      // Don't fail the request if confirmation email fails
      // Admin email is more important
    }

    return NextResponse.json(
      {
        message: 'Message sent successfully! Check your email for confirmation.',
        success: true
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);

    // Return appropriate error response
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: 'Invalid form data',
          errors: error.issues
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: 'Failed to send message. Please try again later.',
        success: false
      },
      { status: 500 }
    );
  }
}

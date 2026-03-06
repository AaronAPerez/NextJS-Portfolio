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
  // Honeypot fields - should be empty for legitimate submissions
  website: z.string().max(0).optional(),
  _gotcha: z.string().max(0).optional(),
  // Form load timestamp for timing validation
  formLoadTime: z.number().optional(),
});

// Minimum time (ms) a human needs to fill out the form (3 seconds)
const MIN_FORM_FILL_TIME = 3000;

/**
 * Spam detection utilities - detects gibberish/random strings
 */

// Calculate consonant to vowel ratio (gibberish has high consonant ratio)
function getConsonantVowelRatio(text: string): number {
  const vowels = text.match(/[aeiouAEIOU]/g)?.length || 0;
  const consonants = text.match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g)?.length || 0;
  if (vowels === 0) return consonants > 0 ? 10 : 0;
  return consonants / vowels;
}

// Detect random case mixing patterns like "xWpqXWL" (unusual in normal text)
function hasRandomCaseMixing(text: string): boolean {
  // Count case transitions (lower->upper or upper->lower)
  let transitions = 0;
  for (let i = 1; i < text.length; i++) {
    const prevIsUpper = /[A-Z]/.test(text[i - 1]);
    const currIsUpper = /[A-Z]/.test(text[i]);
    const prevIsLetter = /[a-zA-Z]/.test(text[i - 1]);
    const currIsLetter = /[a-zA-Z]/.test(text[i]);
    if (prevIsLetter && currIsLetter && prevIsUpper !== currIsUpper) {
      transitions++;
    }
  }
  // High transition rate indicates random casing
  const letterCount = (text.match(/[a-zA-Z]/g)?.length || 0);
  if (letterCount < 5) return false;
  return transitions / letterCount > 0.3;
}

// Check if text looks like gibberish
function isGibberish(text: string): boolean {
  // Remove spaces and check the raw character patterns
  const cleaned = text.replace(/\s+/g, '');

  if (cleaned.length < 5) return false;

  // Check consonant-vowel ratio (normal English is ~1.5-2, gibberish is often 3+)
  const cvRatio = getConsonantVowelRatio(cleaned);
  if (cvRatio > 3.5) return true;

  // Check for random case mixing
  if (hasRandomCaseMixing(cleaned)) return true;

  // Check for unusual character sequences (3+ consonants in a row is rare in English)
  const hasLongConsonantRun = /[bcdfghjklmnpqrstvwxyz]{5,}/i.test(cleaned);
  if (hasLongConsonantRun) return true;

  // Check for repeated unusual patterns
  const hasRepeatedPattern = /(.{2,3})\1{2,}/i.test(cleaned);
  if (hasRepeatedPattern && cvRatio > 2.5) return true;

  return false;
}

// Validate that a name looks legitimate
function isValidName(name: string): boolean {
  // Real names typically have a space (first + last name)
  // Single names are allowed but scrutinized more
  const trimmed = name.trim();

  // Must have at least one space for first/last name OR be a reasonable single name
  const hasSpace = /\s/.test(trimmed);

  if (!hasSpace) {
    // Single word name - be more strict
    // Check if it looks like gibberish
    if (isGibberish(trimmed)) return false;
    // Single names should be reasonable length (3-15 chars)
    if (trimmed.length > 15) return false;
  } else {
    // Has space - check each part
    const parts = trimmed.split(/\s+/);
    for (const part of parts) {
      if (isGibberish(part)) return false;
    }
  }

  return true;
}

// Main spam check function
function isSpamSubmission(name: string, subject: string, message: string): { isSpam: boolean; reason: string } {
  // Check name
  if (!isValidName(name)) {
    return { isSpam: true, reason: 'Invalid name pattern detected' };
  }

  // Check subject for gibberish
  if (isGibberish(subject)) {
    return { isSpam: true, reason: 'Gibberish subject detected' };
  }

  // Check message for gibberish (be a bit more lenient since messages can be short)
  if (message.length < 50 && isGibberish(message)) {
    return { isSpam: true, reason: 'Gibberish message detected' };
  }

  return { isSpam: false, reason: '' };
}

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
                    <a href="https://www.linkedin.com/in/aaronaperezdev" style="color: #6366f1; text-decoration: none; font-size: 14px; font-weight: 500;">💼 LinkedIn</a>
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

    const { name, email, subject, message, website, _gotcha, formLoadTime } = validationResult.data;

    // Honeypot check - if these fields have values, it's a bot
    if (website || _gotcha) {
      console.log('Spam detected: honeypot field filled');
      // Return success to not alert the bot, but don't send email
      return NextResponse.json(
        { message: 'Message sent successfully!', success: true },
        { status: 200 }
      );
    }

    // Timing check - if form was submitted too quickly, likely a bot
    if (formLoadTime) {
      const timeToFill = Date.now() - formLoadTime;
      if (timeToFill < MIN_FORM_FILL_TIME) {
        console.log(`Spam detected: form filled too quickly (${timeToFill}ms)`);
        // Return success to not alert the bot, but don't send email
        return NextResponse.json(
          { message: 'Message sent successfully!', success: true },
          { status: 200 }
        );
      }
    }

    // Gibberish/spam content detection
    const spamCheck = isSpamSubmission(name, subject, message);
    if (spamCheck.isSpam) {
      console.log(`Spam detected: ${spamCheck.reason} - Name: "${name}", Subject: "${subject}"`);
      // Return success to not alert the bot, but don't send email
      return NextResponse.json(
        { message: 'Message sent successfully!', success: true },
        { status: 200 }
      );
    }

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

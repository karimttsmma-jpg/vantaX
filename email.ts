import { Resend } from "resend";
import type { ContactFormData, AuditFormData } from "./validations";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY ?? "placeholder");
}

const FROM = process.env.RESEND_FROM_EMAIL ?? "hello@vantax.agency";
const TO = process.env.RESEND_TO_EMAIL ?? "team@vantax.agency";

const AD_SPEND_LABELS: Record<string, string> = {
  "under-1k": "Under $1,000/mo",
  "1k-5k": "$1,000 – $5,000/mo",
  "5k-10k": "$5,000 – $10,000/mo",
  "10k-25k": "$10,000 – $25,000/mo",
  "25k-50k": "$25,000 – $50,000/mo",
  "50k-plus": "$50,000+/mo",
  "": "Not specified",
};

export async function sendContactNotification(data: ContactFormData) {
  const adSpendLabel = AD_SPEND_LABELS[data.adSpend ?? ""] ?? "Not specified";

  await getResend().emails.send({
    from: FROM,
    to: TO,
    subject: `New Contact Form Submission — ${data.name} @ ${data.company}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><title>New Contact</title></head>
      <body style="font-family: system-ui, sans-serif; background: #09090b; color: #fafafa; padding: 40px 20px; margin: 0;">
        <div style="max-width: 600px; margin: 0 auto;">
          <div style="background: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 32px;">
            <div style="margin-bottom: 24px;">
              <span style="background: #3b82f6; color: white; font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 20px; letter-spacing: 0.05em; text-transform: uppercase;">New Lead</span>
            </div>
            <h1 style="font-size: 24px; font-weight: 700; margin: 0 0 8px 0; color: #fafafa;">Contact Form Submission</h1>
            <p style="color: #71717a; margin: 0 0 32px 0; font-size: 14px;">A new inquiry has been submitted via vantax.agency</p>

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #71717a; font-size: 13px; width: 140px; vertical-align: top;">Full Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #fafafa; font-size: 14px; font-weight: 500;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #71717a; font-size: 13px; vertical-align: top;">Company</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #fafafa; font-size: 14px; font-weight: 500;">${data.company}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #71717a; font-size: 13px; vertical-align: top;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #27272a; font-size: 14px;"><a href="mailto:${data.email}" style="color: #3b82f6; text-decoration: none;">${data.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #71717a; font-size: 13px; vertical-align: top;">Phone</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #fafafa; font-size: 14px;">${data.phone || "—"}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #71717a; font-size: 13px; vertical-align: top;">Website</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #27272a; font-size: 14px;">${data.website ? `<a href="${data.website}" style="color: #3b82f6; text-decoration: none;">${data.website}</a>` : "—"}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #71717a; font-size: 13px; vertical-align: top;">Monthly Ad Spend</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #fafafa; font-size: 14px; font-weight: 600;">${adSpendLabel}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #71717a; font-size: 13px; vertical-align: top;">Message</td>
                <td style="padding: 12px 0; color: #fafafa; font-size: 14px; line-height: 1.6;">${data.message}</td>
              </tr>
            </table>

            <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #27272a;">
              <a href="mailto:${data.email}" style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600;">Reply to ${data.name}</a>
            </div>
          </div>
          <p style="text-align: center; color: #52525b; font-size: 12px; margin-top: 24px;">VantaX Agency · vantax.agency</p>
        </div>
      </body>
      </html>
    `,
  });
}

export async function sendContactConfirmation(data: ContactFormData) {
  await getResend().emails.send({
    from: FROM,
    to: data.email,
    subject: `We received your message — VantaX`,
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><title>Message Received</title></head>
      <body style="font-family: system-ui, sans-serif; background: #09090b; color: #fafafa; padding: 40px 20px; margin: 0;">
        <div style="max-width: 560px; margin: 0 auto;">
          <div style="background: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 40px 32px;">
            <h1 style="font-size: 22px; font-weight: 700; margin: 0 0 16px 0; color: #fafafa;">Thanks, ${data.name}.</h1>
            <p style="color: #a1a1aa; line-height: 1.7; margin: 0 0 16px 0;">We've received your message and will review it shortly. You can expect to hear back from our team within <strong style="color: #fafafa;">1 business day</strong>.</p>
            <p style="color: #a1a1aa; line-height: 1.7; margin: 0 0 32px 0;">In the meantime, if you'd like to book a strategy call directly, you can use the link below.</p>
            <a href="${process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/vantax"}" style="display: inline-block; background: #fafafa; color: #09090b; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 700;">Book a Strategy Call →</a>
          </div>
          <p style="text-align: center; color: #52525b; font-size: 12px; margin-top: 24px;">VantaX Agency · vantax.agency</p>
        </div>
      </body>
      </html>
    `,
  });
}

export async function sendAuditNotification(data: AuditFormData) {
  const adSpendLabel = AD_SPEND_LABELS[data.adSpend ?? ""] ?? "Not specified";

  await getResend().emails.send({
    from: FROM,
    to: TO,
    subject: `New Audit Request — ${data.name} @ ${data.company}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><title>Audit Request</title></head>
      <body style="font-family: system-ui, sans-serif; background: #09090b; color: #fafafa; padding: 40px 20px; margin: 0;">
        <div style="max-width: 600px; margin: 0 auto;">
          <div style="background: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 32px;">
            <div style="margin-bottom: 24px;">
              <span style="background: #10b981; color: white; font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 20px; letter-spacing: 0.05em; text-transform: uppercase;">Audit Request</span>
            </div>
            <h1 style="font-size: 24px; font-weight: 700; margin: 0 0 8px 0; color: #fafafa;">Free Growth Audit Request</h1>
            <p style="color: #71717a; margin: 0 0 32px 0; font-size: 14px;">A business has requested a free growth audit.</p>

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #71717a; font-size: 13px; width: 140px;">Full Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #fafafa; font-size: 14px; font-weight: 500;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #71717a; font-size: 13px;">Company</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #fafafa; font-size: 14px; font-weight: 500;">${data.company}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #71717a; font-size: 13px;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #27272a; font-size: 14px;"><a href="mailto:${data.email}" style="color: #10b981; text-decoration: none;">${data.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #71717a; font-size: 13px;">Website</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #27272a; font-size: 14px;">${data.website ? `<a href="${data.website}" style="color: #10b981; text-decoration: none;">${data.website}</a>` : "—"}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #71717a; font-size: 13px;">Monthly Ad Spend</td>
                <td style="padding: 12px 0; color: #fafafa; font-size: 14px; font-weight: 600;">${adSpendLabel}</td>
              </tr>
            </table>

            <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #27272a;">
              <a href="mailto:${data.email}" style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600;">Contact ${data.name}</a>
            </div>
          </div>
          <p style="text-align: center; color: #52525b; font-size: 12px; margin-top: 24px;">VantaX Agency · vantax.agency</p>
        </div>
      </body>
      </html>
    `,
  });
}

export async function sendAuditConfirmation(data: AuditFormData) {
  await getResend().emails.send({
    from: FROM,
    to: data.email,
    subject: `Your Free Growth Audit is Confirmed — VantaX`,
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><title>Audit Confirmed</title></head>
      <body style="font-family: system-ui, sans-serif; background: #09090b; color: #fafafa; padding: 40px 20px; margin: 0;">
        <div style="max-width: 560px; margin: 0 auto;">
          <div style="background: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 40px 32px;">
            <h1 style="font-size: 22px; font-weight: 700; margin: 0 0 16px 0; color: #fafafa;">Your audit request is confirmed.</h1>
            <p style="color: #a1a1aa; line-height: 1.7; margin: 0 0 16px 0;">Hi ${data.name}, we've received your request for a free growth audit of <strong style="color: #fafafa;">${data.company}</strong>.</p>
            <p style="color: #a1a1aa; line-height: 1.7; margin: 0 0 16px 0;">Our team will review your ad account, landing pages, funnel, and follow-up systems. We'll identify the highest-leverage opportunities and deliver clear recommendations.</p>
            <p style="color: #a1a1aa; line-height: 1.7; margin: 0 0 32px 0;">Expect to hear from us within <strong style="color: #fafafa;">1–2 business days</strong> to schedule a call and share the audit findings.</p>
            <div style="background: #27272a; border-radius: 8px; padding: 20px; margin-bottom: 32px;">
              <p style="font-size: 13px; color: #71717a; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.05em;">What we'll audit</p>
              <ul style="margin: 0; padding: 0 0 0 16px; color: #a1a1aa; font-size: 14px; line-height: 1.8;">
                <li>Ad Account Structure & Performance</li>
                <li>Funnel Architecture</li>
                <li>Landing Page Conversion Rate</li>
                <li>Follow-Up & Automation Sequences</li>
                <li>Overall Conversion Flow</li>
              </ul>
            </div>
            <a href="${process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/vantax"}" style="display: inline-block; background: #fafafa; color: #09090b; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 700;">Book a Strategy Call →</a>
          </div>
          <p style="text-align: center; color: #52525b; font-size: 12px; margin-top: 24px;">VantaX Agency · vantax.agency</p>
        </div>
      </body>
      </html>
    `,
  });
}

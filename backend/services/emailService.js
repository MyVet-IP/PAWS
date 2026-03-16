// Sends emails via Gmail SMTP using Nodemailer.
const nodemailer = require('nodemailer');

function createTransporter() {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
        return null;
    }
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD
        }
    });
}

// ─── HTML template for the contact notification email ─────────────────────────
// This is what PAWS team receives when a user submits the contact form
function buildContactNotificationHTML({ name, email, topic, message }) {
    const date = new Date().toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });

    const topicColors = {
        'General Question': { bg: '#EDE9FE', text: '#6A4C93' },
        'Clinic Support': { bg: '#DCFCE7', text: '#166534' },
        'Bug Report': { bg: '#FEE2E2', text: '#991B1B' },
        'Partnership': { bg: '#FEF9C3', text: '#854D0E' },
        'Other': { bg: '#F1F5F9', text: '#475569' },
    };
    const tc = topicColors[topic] || topicColors['Other'];

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>New Contact Message — PAWS</title>
</head>
<body style="margin:0;padding:0;background:#F3F4F6;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F3F4F6;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0"
             style="max-width:600px;width:100%;border-radius:20px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.10);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#6A4C93 0%,#8B5FBF 60%,#7A3FA0 100%);
                     padding:36px 40px;text-align:center;position:relative;">
            <!-- Decorative circles -->
            <div style="position:absolute;width:120px;height:120px;border-radius:50%;
                        background:rgba(185,251,192,0.15);top:-30px;right:-20px;"></div>
            <div style="position:absolute;width:80px;height:80px;border-radius:50%;
                        background:rgba(241,192,232,0.15);bottom:-20px;left:-10px;"></div>
            <!-- Logo + name -->
            <table cellpadding="0" cellspacing="0" style="margin:0 auto 12px;">
              <tr>
                <td style="background:rgba(185,251,192,0.22);border-radius:12px;
                           padding:8px 12px;text-align:center;">
                  <span style="font-size:22px;">🐾</span>
                </td>
                <td style="padding-left:10px;vertical-align:middle;">
                  <span style="font-size:22px;font-weight:700;color:#ffffff;
                               letter-spacing:0.18em;font-family:'Helvetica Neue',sans-serif;">
                    PAWS
                  </span>
                </td>
              </tr>
            </table>
            <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.75);
                      letter-spacing:0.08em;text-transform:uppercase;font-weight:500;">
              New Contact Message
            </p>
          </td>
        </tr>

        <!-- Alert banner -->
        <tr>
          <td style="background:#F1C0E8;padding:12px 40px;text-align:center;">
            <p style="margin:0;font-size:13px;font-weight:600;color:#6A4C93;font-family:'Helvetica Neue',sans-serif;">
              📬 Someone sent you a message through the contact form
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:40px 40px 32px;">

            <!-- Sender info -->
            <table width="100%" cellpadding="0" cellspacing="0"
                   style="background:#F9FAFB;border-radius:14px;margin-bottom:28px;">
              <tr>
                <td style="padding:24px;">
                  <p style="margin:0 0 16px;font-size:11px;font-weight:700;color:#9CA3AF;
                             text-transform:uppercase;letter-spacing:0.08em;">Sender</p>
                  <table cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td style="padding:6px 0;font-size:13px;color:#6B7280;width:80px;">Name</td>
                      <td style="padding:6px 0;font-size:14px;font-weight:600;color:#1F2937;">
                        ${name}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0;font-size:13px;color:#6B7280;">Email</td>
                      <td style="padding:6px 0;">
                        <a href="mailto:${email}"
                           style="font-size:14px;font-weight:600;color:#6A4C93;text-decoration:none;">
                          ${email}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0;font-size:13px;color:#6B7280;">Date</td>
                      <td style="padding:6px 0;font-size:13px;color:#4B5563;">${date}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Topic badge -->
            <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#9CA3AF;
                       text-transform:uppercase;letter-spacing:0.08em;">Topic</p>
            <div style="margin-bottom:24px;">
              <span style="display:inline-block;background:${tc.bg};color:${tc.text};
                           padding:6px 18px;border-radius:999px;font-size:13px;
                           font-weight:600;font-family:'Helvetica Neue',sans-serif;">
                ${topic}
              </span>
            </div>

            <!-- Message -->
            <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#9CA3AF;
                       text-transform:uppercase;letter-spacing:0.08em;">Message</p>
            <div style="background:#FAFAFA;border-left:4px solid #6A4C93;border-radius:0 12px 12px 0;
                        padding:20px 24px;margin-bottom:32px;">
              <p style="margin:0;font-size:14px;color:#374151;line-height:1.7;white-space:pre-wrap;">
                ${message}
              </p>
            </div>

            <!-- Reply CTA -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center">
                  <a href="mailto:${email}?subject=Re: ${topic} — PAWS"
                     style="display:inline-block;background:#6A4C93;color:#ffffff;
                            padding:14px 36px;border-radius:12px;font-size:14px;
                            font-weight:700;text-decoration:none;
                            font-family:'Helvetica Neue',sans-serif;">
                    ↩ Reply to ${name}
                  </a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#F9FAFB;padding:24px 40px;text-align:center;
                     border-top:1px solid #F3F4F6;">
            <p style="margin:0 0 4px;font-size:12px;color:#9CA3AF;
                      font-family:'Helvetica Neue',sans-serif;">
              This message was sent through the PAWS contact form
            </p>
            <p style="margin:0;font-size:12px;color:#9CA3AF;">
              🐾 PAWS — Medellín, Antioquia, Colombia
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
    `.trim();
}

// ─── Send contact notification to PAWS team ──────────────────────────────────
async function sendContactNotification({ name, email, topic, message }) {
    const transporter = createTransporter();
    if (!transporter) {
        throw new Error('Email service not configured. Add GMAIL_USER and GMAIL_APP_PASSWORD to .env');
    }

    await transporter.sendMail({
        from: `"PAWS Contact Form" <${process.env.GMAIL_USER}>`,
        to: 'riwi.paws@gmail.com',
        replyTo: email,
        subject: `[PAWS Contact] ${topic} — ${name}`,
        html: buildContactNotificationHTML({ name, email, topic, message }),
        text: `New message from ${name} (${email})\nTopic: ${topic}\n\n${message}`
    });
}

module.exports = { sendContactNotification };
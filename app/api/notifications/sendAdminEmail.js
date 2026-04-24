import nodemailer from "nodemailer";

const MAIL_USER = process.env.MAIL_USER || "ramshamzamop@gmail.com";
const MAIL_PASS = process.env.MAIL_PASS || "denl xlhu orci ydcm";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "hi@soul-sighted.com";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: MAIL_USER, pass: MAIL_PASS },
});

/**
 * Send email to admin
 * @param {string} subject - Email subject
 * @param {string} html - HTML body
 * @param {object} options - Additional options (cc, replyTo, etc)
 */
export async function sendAdminEmail(subject, html, options = {}) {
  try {
    const mailOptions = {
      from: `"Soul-Sighted Notifications" <${MAIL_USER}>`,
      to: options.to || ADMIN_EMAIL,
      subject,
      html,
      ...options,
    };

    let lastError;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        await transporter.sendMail(mailOptions);
        lastError = null;
        break;
      } catch (err) {
        lastError = err;
        console.warn(
          `[sendAdminEmail] Attempt ${attempt} failed:`,
          err.message
        );
      }
    }

    if (lastError) throw lastError;
    console.log("[sendAdminEmail] Email sent successfully:", subject);
    return { success: true };
  } catch (error) {
    console.error("[sendAdminEmail] Error:", error.message);
    throw error;
  }
}

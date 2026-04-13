import nodemailer from "nodemailer";

const MAIL_USER = process.env.MAIL_USER || "ramshamzamop@gmail.com";
const MAIL_PASS = process.env.MAIL_PASS || "denl xlhu orci ydcm";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, html_b64, deep } = body;

    // Klaviyo preview sends literal template vars — skip silently
    if (!email || !email.includes("@")) {
      return Response.json({ success: true, skipped: "preview mode" });
    }
    if (!html_b64 || html_b64.startsWith("{{")) {
      return Response.json({ success: true, skipped: "preview mode" });
    }

    const html = Buffer.from(html_b64, "base64").toString("utf8");
    const subject = deep ? "Deep summary" : "Summary";

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: MAIL_USER, pass: MAIL_PASS },
    });

    await transporter.sendMail({
      from: `"Soul-Sighted" <${MAIL_USER}>`,
      to: email,
      subject,
      html,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Send Email Webhook Error:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

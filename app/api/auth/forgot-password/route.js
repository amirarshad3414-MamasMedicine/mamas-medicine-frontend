import nodemailer from "nodemailer";
import { generateOtp } from "../_lib/otpStore";

const XANO_BASE = "https://xnrw-fohw-scw8.a2.xano.io/api:uUEiFEze/";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function createTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ramshamzamop@gmail.com",
      pass: "nooh osop cqzh gmdg",
    },
  });
}

function buildOtpEmailHtml(otp, email) {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#D8DFFF;padding:30px 10px;font-family:'Segoe UI',Arial,sans-serif;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;">

            <!-- Header -->
            <tr>
              <td style="background:#1F1A17;padding:32px 40px;border-radius:12px 12px 0 0;">
                <div style="font-size:26px;font-weight:700;color:#FABD96;letter-spacing:-0.5px;">
                  Soul Sighted
                </div>
                <div style="font-size:14px;color:#a0948a;margin-top:4px;">
                  Password Reset
                </div>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="background:#ffffff;padding:40px;">

                <div style="font-size:22px;font-weight:700;color:#1F1A17;margin-bottom:12px;">
                  Your One-Time Password
                </div>

                <div style="width:50px;height:4px;background:#FABD96;margin-bottom:24px;"></div>

                <p style="font-size:16px;color:#4a4a4a;line-height:1.6;margin:0 0 28px;">
                  Hi there 👋,<br/><br/>
                  We received a request to reset the password for the account associated with
                  <strong>${email}</strong>.
                  Use the code below to verify your identity. It expires in
                  <strong>5 minutes</strong>.
                </p>

                <!-- OTP Box -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
                  <tr>
                    <td align="center">
                      <div style="
                        display:inline-block;
                        background:#FFF9F6;
                        border:2px solid #FABD96;
                        border-radius:12px;
                        padding:20px 40px;
                        font-size:42px;
                        font-weight:800;
                        letter-spacing:10px;
                        color:#1F1A17;
                      ">
                        ${otp}
                      </div>
                    </td>
                  </tr>
                </table>

                <!-- Key Tip -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
                  <tr>
                    <td style="background:#FCE4D6;border-left:4px solid #FABD96;padding:14px;border-radius:0 8px 8px 0;">
                      <div style="font-weight:700;color:#1F1A17;margin-bottom:6px;">💡 Keep it safe</div>
                      <div style="font-size:14px;color:#4a4a4a;line-height:1.5;">
                        Never share this code with anyone. Mama's Medicine staff will never ask for your OTP.
                      </div>
                    </td>
                  </tr>
                </table>

                <p style="font-size:14px;color:#888;line-height:1.6;margin:0;">
                  If you didn't request a password reset, you can safely ignore this email.
                  Your account remains secure.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#FFF9F6;padding:24px 40px;border-radius:0 0 12px 12px;text-align:center;">
                <div style="font-size:13px;color:#888;">
                  © ${new Date().getFullYear()} Mama's Medicine. All rights reserved.
                </div>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  `;
}

async function storeOtpInXano(email, otp) {
  const res = await fetch("https://xnrw-fohw-scw8.a2.xano.io/api:uUEiFEze/otp/store", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp, expiresIn: 300 }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.message || "Failed to store OTP in Xano");
  }

  return res.json();
}

export async function POST(req) {
  try {
    const body = await req.json();
    const email = (body?.email || "").trim().toLowerCase();

    if (!email) {
      return Response.json({ error: "Email is required." }, { status: 400 });
    }
    if (!EMAIL_REGEX.test(email)) {
      return Response.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const otp = generateOtp();

    await storeOtpInXano(email, otp);

    const transporter = createTransporter();
    console.log("env", process.env.SMTP_USER);
    await transporter.sendMail({
      from: `"Soul Sighted" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "🔐 Your Password Reset OTP",
      html: buildOtpEmailHtml(otp, email),
    });

    return Response.json({ success: true, message: "OTP sent to your email." });
  } catch (error) {
    console.error("[forgot-password] Error:", error);
    return Response.json(
      { error: "Failed to send OTP. Please try again." },
      { status: 500 }
    );
  }
}

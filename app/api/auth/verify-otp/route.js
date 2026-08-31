import { generateSessionToken } from "../_lib/otpStore";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// NEXT_PUBLIC_API_BASE points this at the local backend for testing; default Xano.
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://xnrw-fohw-scw8.a2.xano.io/api:uUEiFEze/";

async function verifyOtpInXano(email, otp) {
  const res = await fetch(`${API_BASE}verify_otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });

  const contentType = res.headers.get("content-type");
  const data = contentType?.includes("application/json")
    ? await res.json()
    : { message: "Verification failed" };

  if (!res.ok) {
    return { valid: false, reason: data?.message || "Invalid or expired OTP." };
  }

  return { valid: true };
}

export async function POST(req) {
  try {
    const body = await req.json();
    const email = (body?.email || "").trim().toLowerCase();
    const otp = (body?.otp || "").trim();

    if (!email || !EMAIL_REGEX.test(email)) {
      return Response.json({ error: "A valid email is required." }, { status: 400 });
    }
    if (!otp || !/^\d{4}$/.test(otp)) {
      return Response.json({ error: "OTP must be a 4-digit number." }, { status: 400 });
    }

    const result = await verifyOtpInXano(email, otp);
    if (!result.valid) {
      return Response.json({ error: result.reason }, { status: 400 });
    }

    const sessionToken = generateSessionToken(email);

    return Response.json({
      success: true,
      token: sessionToken,
      message: "OTP verified. You may now reset your password.",
    });
  } catch (error) {
    console.error("[verify-otp] Error:", error);
    return Response.json({ error: "Verification failed. Please try again." }, { status: 500 });
  }
}

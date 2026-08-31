import { consumeSessionToken } from "../_lib/otpStore";

// NEXT_PUBLIC_API_BASE overrides the API base; unset falls back to the deployed API; default is the deployed API.
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://soulsighted.bytescripterz.com/";

export async function POST(req) {
  try {
    const body = await req.json();
    const token       = (body?.token       || "").trim();
    const newPassword = (body?.newPassword || "").trim();

    // ── Validation ─────────────────────────────────────────────
    if (!token) {
      return Response.json({ error: "Reset token is required." }, { status: 400 });
    }
    if (!newPassword) {
      return Response.json({ error: "New password is required." }, { status: 400 });
    }
    if (newPassword.length < 8) {
      return Response.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    // ── Verify & consume the OTP session token ──────────────────
    const session = consumeSessionToken(token);
    if (!session.valid) {
      return Response.json(
        { error: "Your reset session has expired. Please request a new OTP." },
        { status: 401 }
      );
    }

    // Forward to Xano using the new update_password endpoint
    const xanoRes = await fetch(`${API_BASE}update_password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: session.email, newPassword }),
    });

    const contentType = xanoRes.headers.get("content-type");
    const xanoData = contentType?.includes("application/json")
      ? await xanoRes.json()
      : await xanoRes.text();

    if (!xanoRes.ok) {
      return Response.json(
        { error: xanoData?.message || "Password reset failed. Please try again." },
        { status: xanoRes.status }
      );
    }

    return Response.json({ success: true, message: "Password reset successfully." });
  } catch (error) {
    console.error("[reset-password] Error:", error);
    return Response.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}

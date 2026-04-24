import { sendAdminEmail } from "../sendAdminEmail.js";

/**
 * POST /api/notifications/onboarding
 * Sends an onboarding completion notification email
 * 
 * Expected body:
 * {
 *   parentName: string,
 *   childName: string,
 *   parentEmail: string,
 *   parentDob: string (YYYY-MM-DD),
 *   parentTimeOfBirth: string (HH:MM),
 *   parentPlaceOfBirth: string,
 *   childDob: string (YYYY-MM-DD),
 *   childTimeOfBirth: string (HH:MM),
 *   childPlaceOfBirth: string,
 *   additionalContext?: string,
 *   tonePreferences?: string,
 *   otherPreferences?: object
 * }
 */
export async function POST(req) {
  try {
    console.log("[onboarding-notification] Webhook received");
    const body = await req.json();

    const {
      parentName,
      childName,
      parentEmail,
      parentDob,
      parentTimeOfBirth,
      parentPlaceOfBirth,
      childDob,
      childTimeOfBirth,
      childPlaceOfBirth,
      additionalContext,
      tonePreferences,
      otherPreferences,
    } = body;

    // Validate required fields
    if (!parentName || !childName) {
      console.warn("[onboarding-notification] Missing required fields");
      return Response.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Build email subject
    const subject = `PD – ONBOARDING COMPLETE – ${parentName} – ${childName}`;

    // Build HTML email body
    const html = `
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
    .section { margin-bottom: 20px; }
    .section-title { font-weight: bold; color: #1F1A17; margin-top: 20px; margin-bottom: 10px; font-size: 14px; text-transform: uppercase; border-bottom: 2px solid #eee; padding-bottom: 5px; }
    .field { margin: 10px 0; display: flex; }
    .label { font-weight: bold; min-width: 160px; color: #1F1A17; }
    .value { flex: 1; }
    .subsection { margin-left: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0; color: #1F1A17;">Onboarding Submission Complete</h2>
    </div>

    <div class="section">
      <div class="section-title">Parent Details</div>
      <div class="subsection">
        <div class="field">
          <div class="label">Name:</div>
          <div class="value">${parentName}</div>
        </div>
        ${parentEmail ? `
        <div class="field">
          <div class="label">Email:</div>
          <div class="value"><a href="mailto:${parentEmail}">${parentEmail}</a></div>
        </div>
        ` : ""}
        ${parentDob ? `
        <div class="field">
          <div class="label">Date of Birth:</div>
          <div class="value">${parentDob}</div>
        </div>
        ` : ""}
        ${parentTimeOfBirth ? `
        <div class="field">
          <div class="label">Time of Birth:</div>
          <div class="value">${parentTimeOfBirth}</div>
        </div>
        ` : ""}
        ${parentPlaceOfBirth ? `
        <div class="field">
          <div class="label">Place of Birth:</div>
          <div class="value">${parentPlaceOfBirth}</div>
        </div>
        ` : ""}
      </div>
    </div>

    <div class="section">
      <div class="section-title">Child Details</div>
      <div class="subsection">
        <div class="field">
          <div class="label">Name:</div>
          <div class="value">${childName}</div>
        </div>
        ${childDob ? `
        <div class="field">
          <div class="label">Date of Birth:</div>
          <div class="value">${childDob}</div>
        </div>
        ` : ""}
        ${childTimeOfBirth ? `
        <div class="field">
          <div class="label">Time of Birth:</div>
          <div class="value">${childTimeOfBirth}</div>
        </div>
        ` : ""}
        ${childPlaceOfBirth ? `
        <div class="field">
          <div class="label">Place of Birth:</div>
          <div class="value">${childPlaceOfBirth}</div>
        </div>
        ` : ""}
      </div>
    </div>

    ${additionalContext ? `
    <div class="section">
      <div class="section-title">Additional Context</div>
      <div style="margin: 10px 0; padding: 10px; background: #f9f9f9; border-radius: 4px;">
        ${additionalContext.split("\n").map(line => `<p style="margin: 5px 0;">${line}</p>`).join("")}
      </div>
    </div>
    ` : ""}

    ${tonePreferences ? `
    <div class="section">
      <div class="section-title">Tone & Preferences</div>
      <div style="margin: 10px 0;">
        ${tonePreferences}
      </div>
    </div>
    ` : ""}

    ${otherPreferences && Object.keys(otherPreferences).length > 0 ? `
    <div class="section">
      <div class="section-title">Other Preferences</div>
      <div class="subsection">
        ${Object.entries(otherPreferences)
          .map(
            ([key, value]) => `
        <div class="field">
          <div class="label">${key}:</div>
          <div class="value">${typeof value === "object" ? JSON.stringify(value) : value}</div>
        </div>
        `
          )
          .join("")}
      </div>
    </div>
    ` : ""}

    <div class="section" style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
      <p style="font-size: 12px; color: #999;">
        This is an automated notification from Soul-Sighted. 
        Timestamp: ${new Date().toISOString()}
      </p>
    </div>
  </div>
</body>
</html>
    `;

    // Send email to admin
    await sendAdminEmail(subject, html);

    console.log("[onboarding-notification] Email sent successfully");
    return Response.json({ success: true });
  } catch (error) {
    console.error("[onboarding-notification] Error:", error.message, error.stack);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

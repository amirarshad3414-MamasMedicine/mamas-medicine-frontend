import { sendAdminEmail } from "../sendAdminEmail.js";

/**
 * POST /api/notifications/issue-flag
 * Sends an issue/error notification email
 * 
 * Expected body:
 * {
 *   stage: "purchase" | "onboarding" | "generation",
 *   parentName?: string,
 *   childName?: string,
 *   customerEmail?: string,
 *   errorMessage: string,
 *   relevantData?: object,
 *   stackTrace?: string
 * }
 */
export async function POST(req) {
  try {
    console.log("[issue-flag] Webhook received");
    const body = await req.json();

    const {
      stage,
      parentName,
      childName,
      customerEmail,
      errorMessage,
      relevantData,
      stackTrace,
    } = body;

    // Validate required fields
    if (!stage || !errorMessage) {
      console.warn("[issue-flag] Missing required fields");
      return Response.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Build email subject
    const subject = `PD – ISSUE FLAG – ${parentName || "N/A"} – ${childName || "N/A"}`;

    // Format stage
    const stageDisplay = {
      purchase: "Purchase",
      onboarding: "Onboarding",
      generation: "Insight Generation",
    }[stage] || stage;

    // Build HTML email body
    const html = `
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #fee; border-left: 4px solid #c00; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
    .section { margin-bottom: 20px; }
    .section-title { font-weight: bold; color: #c00; margin-top: 20px; margin-bottom: 10px; font-size: 14px; text-transform: uppercase; }
    .field { margin: 10px 0; display: flex; }
    .label { font-weight: bold; min-width: 160px; color: #1F1A17; }
    .value { flex: 1; }
    .error-box { background-color: #fff3cd; border: 1px solid #ffc107; padding: 12px; border-radius: 4px; margin: 10px 0; font-family: monospace; font-size: 12px; white-space: pre-wrap; word-break: break-word; }
    .data-box { background-color: #f5f5f5; border: 1px solid #ddd; padding: 12px; border-radius: 4px; margin: 10px 0; font-family: monospace; font-size: 12px; white-space: pre-wrap; word-break: break-word; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0; color: #c00;">⚠️ Issue Flag Alert</h2>
      <p style="margin: 10px 0 0 0; font-size: 14px;">Action required</p>
    </div>

    <div class="section">
      <div class="section-title">Issue Details</div>
      <div class="field">
        <div class="label">Stage Failed:</div>
        <div class="value"><strong>${stageDisplay}</strong></div>
      </div>
      ${customerEmail ? `
      <div class="field">
        <div class="label">Customer Email:</div>
        <div class="value"><a href="mailto:${customerEmail}">${customerEmail}</a></div>
      </div>
      ` : ""}
      ${parentName ? `
      <div class="field">
        <div class="label">Parent Name:</div>
        <div class="value">${parentName}</div>
      </div>
      ` : ""}
      ${childName ? `
      <div class="field">
        <div class="label">Child Name:</div>
        <div class="value">${childName}</div>
      </div>
      ` : ""}
    </div>

    <div class="section">
      <div class="section-title">Error Message</div>
      <div class="error-box">${escapeHtml(errorMessage)}</div>
    </div>

    ${relevantData && Object.keys(relevantData).length > 0 ? `
    <div class="section">
      <div class="section-title">Relevant Data</div>
      <div class="data-box">${escapeHtml(JSON.stringify(relevantData, null, 2))}</div>
    </div>
    ` : ""}

    ${stackTrace ? `
    <div class="section">
      <div class="section-title">Stack Trace</div>
      <div class="data-box">${escapeHtml(stackTrace)}</div>
    </div>
    ` : ""}

    <div class="section" style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
      <p style="font-size: 12px; color: #999;">
        This is an automated issue notification from Soul-Sighted. 
        Please investigate and resolve as soon as possible.
        <br/>
        Timestamp: ${new Date().toISOString()}
      </p>
    </div>
  </div>
</body>
</html>
    `;

    // Send email to admin
    await sendAdminEmail(subject, html);

    console.log("[issue-flag] Email sent successfully");
    return Response.json({ success: true });
  } catch (error) {
    console.error("[issue-flag] Error:", error.message, error.stack);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Helper function to escape HTML
function escapeHtml(unsafe) {
  return (unsafe || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

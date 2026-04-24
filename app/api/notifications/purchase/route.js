import { sendAdminEmail } from "../sendAdminEmail.js";

/**
 * POST /api/notifications/purchase
 * Sends a purchase notification email
 *
 * Expected body:
 * {
 *   parentName: string,
 *   childName: string,
 *   customerEmail: string,
 *   productName: string,‘What is soul-sighted’ page
 *   amount: number | "coupon",
 *   orderId: string,
 *   customerId: string,
 *   paymentType: "paid" | "coupon"
 * }
 */
export async function POST(req) {
  try {
    console.log("[purchase-notification] Webhook received");
    const body = await req.json();

    const {
      parentName,
      childName,
      customerEmail,
      productName,
      amount,
      orderId,
      customerId,
      paymentType,
    } = body;

    // Validate required fields
    if (!parentName || !customerEmail) {
      console.warn("[purchase-notification] Missing required fields");
      return Response.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Format amount
    const amountDisplay =
      paymentType === "coupon"
        ? "Coupon/Free"
        : amount
        ? `$${amount.toFixed(2)}`
        : "N/A";

    // Build email subject
    const subject = `PD – NEW PURCHASE – ${parentName} – ${
      childName || "N/A"
    } – ${amountDisplay}`;

    // Build HTML email body
    const html = `
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
    .section { margin-bottom: 20px; }
    .section-title { font-weight: bold; color: #1F1A17; margin-top: 20px; margin-bottom: 10px; font-size: 14px; text-transform: uppercase; }
    .field { margin: 10px 0; display: flex; }
    .label { font-weight: bold; min-width: 150px; }
    .value { flex: 1; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0; color: #1F1A17;">New Purchase Notification</h2>
    </div>

    <div class="section">
      <div class="section-title">Customer Details</div>
      <div class="field">
        <div class="label">Name:</div>
        <div class="value">${parentName}</div>
      </div>
      <div class="field">
        <div class="label">Email:</div>
        <div class="value"><a href="mailto:${customerEmail}">${customerEmail}</a></div>
      </div>
      ${
        customerId
          ? `
      <div class="field">
        <div class="label">Customer ID:</div>
        <div class="value">${customerId}</div>
      </div>
      `
          : ""
      }
    </div>

    <div class="section">
      <div class="section-title">Child Information</div>
      <div class="field">
        <div class="label">Child Name:</div>
        <div class="value">${childName || "Not provided"}</div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Purchase Details</div>
      <div class="field">
        <div class="label">Product:</div>
        <div class="value">${productName || "Parenting Dynamic"}</div>
      </div>
      <div class="field">
        <div class="label">Amount:</div>
        <div class="value">${amountDisplay}</div>
      </div>
      <div class="field">
        <div class="label">Payment Type:</div>
        <div class="value">${
          paymentType === "coupon" ? "Coupon/Free" : "Paid"
        }</div>
      </div>
      ${
        orderId
          ? `
      <div class="field">
        <div class="label">Order ID:</div>
        <div class="value">${orderId}</div>
      </div>
      `
          : ""
      }
    </div>

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

    console.log("[purchase-notification] Email sent successfully");
    return Response.json({ success: true });
  } catch (error) {
    console.error("[purchase-notification] Error:", error.message, error.stack);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

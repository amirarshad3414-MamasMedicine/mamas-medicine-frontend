import nodemailer from "nodemailer";

const MAIL_USER = process.env.MAIL_USER || "ramshamzamop@gmail.com";
const MAIL_PASS = process.env.MAIL_PASS || "denl xlhu orci ydcm";
const NOTIFY_TO = "hi@soul-sighted.com";

function formatAddress(address) {
  if (!address) return "";
  const parts = [
    address.line1,
    address.line2,
    [address.city, address.state, address.postal_code].filter(Boolean).join(", "),
    address.country,
  ].filter(Boolean);
  return parts.join("<br/>");
}

function row(label, value) {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:6px 12px 6px 0;font-weight:bold;vertical-align:top;">${label}</td>
      <td style="padding:6px 0;">${value}</td>
    </tr>`;
}

function buildHtml({ customer, productPurchase, childName, purchaseId }) {
  return `
<div style="font-family:Arial, Helvetica, sans-serif;font-size:14px;color:#333;line-height:1.6;">
  <h2 style="margin:0 0 16px;">New Purchase</h2>
  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
    ${row("Customer name", customer?.name)}
    ${row("Customer email", customer?.email)}
    ${row("Customer phone", customer?.phone)}
    ${row("Billing address", formatAddress(customer?.address))}
    ${row("Product purchased", productPurchase)}
    ${row("Child name", childName)}
    ${row("Purchase ID", purchaseId)}
  </table>
</div>
`;
}

export async function POST(req) {
  try {
    const raw = await req.json();
    // Xano wraps the body under `data`; support flat payloads too.
    const payload = raw?.data ?? raw;

    // Xano forwards Stripe's full customer_details under `customer`.
    const customer = payload?.customer || payload?.customer_details || {};

    const customerEmail = customer?.email || "";
    const productPurchase = payload?.product_purchase || "";
    const purchaseId = payload?.purchase_id || "";
    const childName = payload?.child_name || "—";

    if (!customerEmail) {
      return Response.json(
        { success: false, error: "customer.email is required" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: MAIL_USER, pass: MAIL_PASS },
    });

    const info = await transporter.sendMail({
      from: `"Soul-Sighted" <${MAIL_USER}>`,
      to: NOTIFY_TO,
      subject: `New purchase: ${productPurchase} (${customerEmail})`,
      html: buildHtml({ customer, productPurchase, childName, purchaseId }),
    });

    return Response.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error("send-purchase-email Error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

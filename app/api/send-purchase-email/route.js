import nodemailer from "nodemailer";

const MAIL_USER = process.env.MAIL_USER || "abdulahadsaleemt124@gmail.com";
const MAIL_PASS = process.env.MAIL_PASS || "pbma ujnj zmyk jdld";
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

function pickCustomerName(customer) {
  return (
    customer?.name ||
    customer?.individual_name ||
    customer?.business_name ||
    ""
  );
}

function formatPrice(amount, currency) {
  if (amount == null || amount === "") return "";
  const num = Number(amount);
  if (!Number.isFinite(num)) return "";
  const code = (currency || "USD").toString().toUpperCase();
  // Stripe sends the smallest currency unit (e.g. cents) — convert to major units.
  const major = num / 100;
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: code,
    }).format(major);
  } catch {
    return `${major.toFixed(2)} ${code}`;
  }
}

function buildHtml({ customer, customerName, pricePaid, productPurchase, childName, purchaseId }) {
  return `
<div style="font-family:Arial, Helvetica, sans-serif;font-size:14px;color:#333;line-height:1.6;">
  <h2 style="margin:0 0 16px;">New Purchase</h2>
  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
    ${row("Customer name", customerName)}
    ${row("Customer email", customer?.email)}
    ${row("Customer phone", customer?.phone)}
    ${row("Billing address", formatAddress(customer?.address))}
    ${row("Product purchased", productPurchase)}
    ${row("Amount paid", pricePaid)}
    ${row("Child name", childName)}
    ${row("Purchase ID", purchaseId)}
  </table>
</div>
`;
}

function setDeep(obj, keys, value) {
  let cur = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i] === "" ? cur.length : keys[i];
    if (cur[k] == null || typeof cur[k] !== "object") {
      cur[k] = keys[i + 1] === "" || /^\d+$/.test(keys[i + 1]) ? [] : {};
    }
    cur = cur[k];
  }
  const last = keys[keys.length - 1] === "" ? cur.length : keys[keys.length - 1];
  cur[last] = value;
}

function parseBracketedForm(params) {
  const out = {};
  for (const [rawKey, value] of params.entries()) {
    const match = rawKey.match(/^([^\[]+)((?:\[[^\]]*\])*)$/);
    if (!match) {
      out[rawKey] = value;
      continue;
    }
    const head = match[1];
    const rest = match[2]
      ? [...match[2].matchAll(/\[([^\]]*)\]/g)].map((m) => m[1])
      : [];
    setDeep(out, [head, ...rest], value);
  }
  return out;
}

async function readBody(req) {
  const ctype = (req.headers.get("content-type") || "").toLowerCase();
  if (ctype.includes("application/json")) {
    return req.json();
  }
  if (
    ctype.includes("application/x-www-form-urlencoded") ||
    ctype.includes("multipart/form-data")
  ) {
    const form = await req.formData();
    return parseBracketedForm(form);
  }
  // Fallback: try JSON, then form-encoded.
  const text = await req.text();
  try {
    return JSON.parse(text);
  } catch {
    return parseBracketedForm(new URLSearchParams(text));
  }
}

export async function POST(req) {
  try {
    const raw = await readBody(req);
    // Xano wraps the body under `data`; support flat payloads too.
    const payload = raw?.data ?? raw;

    // Xano forwards Stripe's full customer_details under `customer`.
    const customer = payload?.customer || payload?.customer_details || {};

    const customerEmail = customer?.email || "";
    const customerName = pickCustomerName(customer);
    const productPurchase = payload?.product_purchase || "";
    const purchaseId = payload?.purchase_id || "";
    const childName = payload?.child_name || "—";

    // Accept either a pre-formatted price string or Stripe's amount_total (+ currency).
    const pricePaid =
      payload?.price_paid ||
      payload?.amount_display ||
      formatPrice(payload?.amount_total, payload?.currency);

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
      html: buildHtml({ customer, customerName, pricePaid, productPurchase, childName, purchaseId }),
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

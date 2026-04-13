import nodemailer from "nodemailer";
import getDeepEmail from "../api/send-insight/deep";

const MAIL_USER = process.env.MAIL_USER || "ramshamzamop@gmail.com";
const MAIL_PASS = process.env.MAIL_PASS || "denl xlhu orci ydcm";

// --- HTML rendering ---

function preprocess(text) {
  return text
    .replace(/^#{1,6}\s*/gm, "")
    .replace(/^\s*[-*]\s+/gm, "• ")
    .replace(/^\s*\d+\.\s+/gm, "• ")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`+/g, "")
    .trim();
}

const isSectionHeader = (b) =>
  /^(?:🌿|🔆|💫|🌱|🌞|:herb:|:sun_with_face:|:dizzy:|:seedling:)/.test(b);
const isClusterHeader = (b) =>
  /^(?:[0-9]|[0-9]\uFE0F\u20E3|:nine:|:one:|:two:|:three:|:four:|:five:|:six:|:seven:|:eight:)/.test(b);
const isKeyTip = (b) =>
  b.startsWith("💡 Key Tip") || b.startsWith(":bulb: Key Tip");
const isList = (b) => b.startsWith("•");

function renderList(block) {
  const items = block
    .split("\n")
    .map((line) => line.replace(/^•\s*/, "").trim())
    .filter(Boolean)
    .map(
      (item) => `
<tr>
<td style="padding:4px 0;font-size:16px;line-height:1.6;color:#2F2A26;">
• ${item}
</td>
</tr>`
    )
    .join("");
  return `<table width="100%" cellpadding="0" cellspacing="0">${items}</table>`;
}

function renderKeyTip(block) {
  const content = block
    .replace(/^(?:💡|:bulb:) Key Tip[:–\s🌟💖⚖️🔍]*/i, "")
    .trim();
  return `
<table width="100%" cellpadding="0" cellspacing="0" align="left" style="margin:18px 0 28px;">
  <tr>
    <td style="background:#FCE4D6;border-left:4px solid #FABD96;padding:16px;border-radius:12px;">
      <div style="font-weight:bold;margin-bottom:6px;color:#1F1A17;">💡 Key Tip</div>
      <div style="font-size:16px;line-height:1.7;color:#2F2A26;">${content}</div>
    </td>
  </tr>
</table>`;
}

function renderBlock(block) {
  if (isKeyTip(block)) return renderKeyTip(block);
  if (isSectionHeader(block)) {
    return `<tr><td style="font-size:24px;font-weight:bold;color:#1F1A17;padding:30px 0 10px;">${block}</td></tr>`;
  }
  if (isClusterHeader(block)) {
    return `<tr><td style="font-size:20px;font-weight:bold;color:#1F1A17;padding:20px 0 8px;">${block}</td></tr>`;
  }
  if (isList(block)) {
    return `<tr><td>${renderList(block)}</td></tr>`;
  }
  return `<tr><td style="font-size:16px;line-height:1.7;color:#2F2A26;padding:8px 0;">${block}</td></tr>`;
}

function buildDeepEmailHTML(insight) {
  const deepContent = insight?.deep_text || "";
  const deepBlocks = preprocess(deepContent)
    .split("\n\n")
    .map((b) => b.trim())
    .filter(Boolean);

  const deepHTML = `
<table width="100%" cellpadding="0" cellspacing="0" align="left">
  <tr>
    <td align="left">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:16px;">
        <tr>
          <td style="padding:28px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${deepBlocks.map((block) => renderBlock(block)).join("")}
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;

  return getDeepEmail(deepHTML);
}

// --- Webhook handler ---

export async function POST(req) {
  try {
    const body = await req.json();

    // Klaviyo sends: { email, insight_id, deep }
    const { email, insight_id, deep } = body;

    if (!email || !email.includes("@")) {
      // Klaviyo preview sends literal "{{ person.real_email }}" — skip silently
      return Response.json({ success: true, skipped: "preview mode" });
    }

    if (!deep) {
      return Response.json({ success: false, error: "No email type specified" }, { status: 400 });
    }

    if (!insight_id || insight_id.toString().startsWith("{{")) {
      // Klaviyo preview — no real insight_id yet
      return Response.json({ success: true, skipped: "preview mode" });
    }

    // Fetch the insight from Xano by ID
    const xanoRes = await fetch(
      `https://xnrw-fohw-scw8.a2.xano.io/api:uUEiFEze/insights/${insight_id}`
    );
    if (!xanoRes.ok) {
      const err = await xanoRes.text();
      throw new Error(`Failed to fetch insight: ${err}`);
    }
    const insightObj = await xanoRes.json();

    if (!insightObj?.deep_text) {
      return Response.json({ success: true, skipped: "no deep_text" });
    }

    const html = buildDeepEmailHTML(insightObj);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: MAIL_USER, pass: MAIL_PASS },
    });

    await transporter.sendMail({
      from: `"Soul-Sighted" <${MAIL_USER}>`,
      to: email,
      subject: "Deep summary",
      html,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Send Email Webhook Error:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

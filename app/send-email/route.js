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
    // Read raw body first — Klaviyo may send malformed JSON if insight has special chars
    const rawBody = await req.text();
    console.log("Klaviyo webhook raw body:", rawBody.slice(0, 500));

    // DEBUG: remove this after inspecting
    return Response.json({ debug: true, rawBody });

    let body;
    try {
      body = JSON.parse(rawBody);
    } catch (parseErr) {
      console.error("Failed to parse webhook body:", parseErr.message);
      return Response.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
    }

    console.log("Klaviyo webhook parsed body keys:", Object.keys(body));

    // Klaviyo sends: { childName, parentName, email, insight, deep }
    const { email, insight, deep } = body;

    if (!email) {
      return Response.json({ success: false, error: "Email is required" }, { status: 400 });
    }

    if (!deep) {
      return Response.json({ success: false, error: "No email type specified" }, { status: 400 });
    }

    // insight may come as a stringified object from Klaviyo
    let insightObj;
    try {
      insightObj = typeof insight === "string" ? JSON.parse(insight) : insight;
    } catch (e) {
      // Klaviyo preview sends literal "{{ person.insight }}" — not real data, skip silently
      console.log("Preview mode or invalid insight, skipping:", e.message);
      return Response.json({ success: true, skipped: "no valid insight" });
    }

    if (!insightObj?.deep_text) {
      console.log("No deep_text in insight, skipping.");
      return Response.json({ success: true, skipped: "no deep_text" });
    }

    console.log("insight keys:", Object.keys(insightObj));

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

import nodemailer from "nodemailer";
import getDeepEmail from "../api/send-insight/deep";
import getSummary from "../api/send-insight/summary";

const MAIL_USER = process.env.MAIL_USER || "abdulahadsaleemt124@gmail.com";
const MAIL_PASS = process.env.MAIL_PASS || "pbma ujnj zmyk jdld";
const KLAVIYO_API_KEY = process.env.KLAVIYO_API_KEY;

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
    const lines = block.split("\n");
    const header = lines[0];
    const rest = lines.slice(1).join("\n").trim();
    const headerHtml = `<tr><td style="font-size:24px;font-weight:bold;color:#1F1A17;padding:30px 0 10px;">${header}</td></tr>`;
    return rest ? headerHtml + renderBlock(rest) : headerHtml;
  }

  if (isClusterHeader(block)) {
    const lines = block.split("\n");
    const header = lines[0];
    const rest = lines.slice(1).join("\n").trim();
    const headerHtml = `<tr><td style="font-size:20px;font-weight:bold;color:#1F1A17;padding:20px 0 8px;">${header}</td></tr>`;
    return rest ? headerHtml + renderBlock(rest) : headerHtml;
  }

  if (isList(block)) {
    return `<tr><td>${renderList(block)}</td></tr>`;
  }

  return `<tr><td style="font-size:16px;line-height:1.7;color:#2F2A26;padding:8px 0;">${block}</td></tr>`;
}

function buildSummaryEmailHTML(insight) {
  const summaryContent = insight?.summary_text || "";
  const childName = insight?.insights_api_payload?.childName || "";

  const summaryItems = summaryContent
    ? summaryContent
      .split("\n")
      .map((line) =>
        line
          .replace(/^[-•]\s*/, "")
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          .replace(/\*(.*?)\*/g, "<em>$1</em>")
          .trim()
      )
      .filter(Boolean)
    : [];

  const summaryHTML = summaryItems.length > 0
    ? `
<table width="100%" cellpadding="0" cellspacing="0" align="left" style="margin-bottom:32px;">
  <tr>
    <td align="left">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFF9F6;border-radius:16px;">
        <tr>
          <td style="padding:24px;">
            <div style="font-size:26px;font-weight:bold;color:#1F1A17;margin-bottom:18px;">
              🌟 Soul Snapshot — You + ${childName}
            </div>
            <table width="100%" cellpadding="0" cellspacing="0">
              ${summaryItems.map((item) => `
              <tr>
                <td style="font-size:16px;line-height:1.7;color:#2F2A26;padding-bottom:12px;">
                  • ${item}
                </td>
              </tr>`).join("")}
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`
    : "";

  return getSummary(childName, summaryHTML);
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
    console.log("[send-email] Webhook received");
    const body = await req.json();
    console.log("[send-email] Body parsed:", {
      email: body.email,
      deep: body.deep,
      child_name: body.child_name,
      has_deep_text: !!body.deep_text,
      has_summary_text: !!body.summary_text,
      deep_text_length: body.deep_text?.length ?? 0,
      summary_text_length: body.summary_text?.length ?? 0,
    });

    // Klaviyo sends: { email, deep_text, summary_text, child_name, parent_name, deep }
    const { email, deep_text, summary_text, deep } = body;
    const parent_name = body.parent_name || body.parentName;
    const child_name = body.child_name || body.childName;
    const journey_type = body.journey_type || body.journeyType;

    // Klaviyo preview sends literal "{{ person.email }}" — skip silently
    if (!email || !email.includes("@")) {
      console.log("[send-email] Skipping — preview mode, email:", email);
      return Response.json({ success: true, skipped: "preview mode" });
    }

    // Reconstruct insight shape expected by builders
    const insightObj = {
      deep_text: deep_text || "",
      summary_text: summary_text || "",
      insights_api_payload: { childName: child_name || "" },
    };

    console.log("[send-email] Building HTML, type:", deep ? "deep" : "summary");
    const html = deep ? buildDeepEmailHTML(insightObj) : buildSummaryEmailHTML(insightObj);
    const subject = deep
      ? `The Living energy between ${parent_name} and ${child_name}`
      : `The snap shot of ${parent_name} and ${child_name}`;

    console.log("[send-email] Sending email to:", email, "subject:", subject);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: MAIL_USER, pass: MAIL_PASS },
    });

    let lastError;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        await transporter.sendMail({
          from: `"Soul-Sighted" <${MAIL_USER}>`,
          to: email,
          subject,
          html,
        });
        lastError = null;
        break;
      } catch (err) {
        lastError = err;
        console.warn(`[send-email] Attempt ${attempt} failed:`, err.message);
      }
    }
    if (lastError) throw lastError;

    console.log("[send-email] Email sent successfully to:", email);

    // Fire Klaviyo tracking event after email is sent
    const eventName = deep ? "parenting_dynamic_deep_ready" : "parenting_dynamic_summary_ready";
    await fetch("https://a.klaviyo.com/api/events/", {
      method: "POST",
      headers: {
        Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        "Content-Type": "application/json",
        Revision: "2024-02-15",
      },
      body: JSON.stringify({
        data: {
          type: "event",
          attributes: {
            metric: { data: { type: "metric", attributes: { name: eventName } } },
            profile: {
              data: {
                type: "profile",
                attributes: {
                  email,
                  properties: {
                    Email: email,
                    parent_name,
                    child_name,
                    Journey_type: journey_type || "parenting_dynamic",
                    marketing_opt_in: "soft",
                    signup_source: "purchase",
                  },
                },
              },
            },
            properties: {},
            value: 1,
          },
        },
      }),
    });
    console.log("[send-email] Klaviyo event fired:", eventName);

    return Response.json({ success: true });
  } catch (error) {
    console.error("[send-email] Error:", error.message, error.stack);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
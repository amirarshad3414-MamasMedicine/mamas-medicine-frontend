import nodemailer from "nodemailer";
import teaserFormat from "./teaser";

const MAIL_USER = process.env.MAIL_USER || "ramshamzamop@gmail.com";
const MAIL_PASS = process.env.MAIL_PASS || "roxb vpso ojxu awng";

// --- markdown-ish text -> email-safe HTML (same approach /send-email uses for deep) ---

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

function renderBlock(block) {
  if (isSectionHeader(block)) {
    const lines = block.split("\n");
    const header = lines[0];
    const rest = lines.slice(1).join("\n").trim();
    const headerHtml = `<tr><td style="font-size:22px;font-weight:bold;color:#1F1A17;padding:24px 0 8px;">${header}</td></tr>`;
    return rest ? headerHtml + renderBlock(rest) : headerHtml;
  }

  if (isList(block)) {
    return `<tr><td>${renderList(block)}</td></tr>`;
  }

  return `<tr><td style="font-size:16px;line-height:1.7;color:#2F2A26;padding:8px 0;">${block.replace(
    /\r?\n/g,
    "<br/>"
  )}</td></tr>`;
}

// Wrap the raw teaser text in a white content card, then drop it into the
// full teaser email layout (teaserFormat provides header logo, hero image, footer).
function buildTeaserEmailHTML(teaserText) {
  const blocks = preprocess(teaserText || "")
    .split("\n\n")
    .map((b) => b.trim())
    .filter(Boolean);

  const inner = `
<table width="100%" cellpadding="0" cellspacing="0" align="left">
  <tr>
    <td align="left">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:16px;">
        <tr>
          <td style="padding:8px 4px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${blocks.map((block) => renderBlock(block)).join("")}
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;

  return teaserFormat(inner);
}

export async function POST(req) {
  try {
    const body = await req.json();

    const email = body.email;
    const teaser_text = body.teaser_text || body.teaser || "";
    const parent_name = body.parent_name || body.parentName || "";
    const child_name = body.child_name || body.childName || "";

    // Klaviyo/test previews may send a literal placeholder — skip silently.
    if (!email || !email.includes("@")) {
      return Response.json(
        { success: false, error: "A valid email is required" },
        { status: 400 }
      );
    }
    if (!teaser_text) {
      return Response.json(
        { success: false, error: "teaser_text is required" },
        { status: 400 }
      );
    }

    const html = buildTeaserEmailHTML(teaser_text);
    const subject = `The hidden story between ${parent_name || "you"} and ${
      child_name || "your loved one"
    }`;

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
        console.warn(`[send-teaser] Attempt ${attempt} failed:`, err.message);
      }
    }
    if (lastError) throw lastError;

    console.log("[send-teaser] Teaser email sent to:", email);
    return Response.json({ success: true });
  } catch (error) {
    console.error("[send-teaser] Error:", error.message);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

import getDeepEmail from "./deep";
import getSummary from "./summary";

const KLAVIYO_API_KEY = process.env.KLAVIYO_API_KEY || "pk_ab8d15bcfa308fb2790a4ea13c34b277e2";
const KLAVIYO_LIST_ID = process.env.KLAVIYO_LIST_ID || "R3qHaV";

// --- HTML rendering ---

function preprocess(text) {
  return text
    .normalize("NFC")
    .replace(/[\uD800-\uDBFF](?![\uDC00-\uDFFF])/g, "")
    .replace(/(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g, "")
    .replace(/[\u2010-\u2015]/g, "-")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
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
      <div style="font-weight:bold;margin-bottom:6px;color:#1F1A17;">
        💡 Key Tip
      </div>
      <div style="font-size:16px;line-height:1.7;color:#2F2A26;">
        ${content}
      </div>
    </td>
  </tr>
</table>`;
}

function renderBlock(block) {
  if (isKeyTip(block)) return renderKeyTip(block);
  if (isSectionHeader(block))
    return `<tr><td style="font-size:24px;font-weight:bold;color:#1F1A17;padding:30px 0 10px;">${block}</td></tr>`;
  if (isClusterHeader(block))
    return `<tr><td style="font-size:20px;font-weight:bold;color:#1F1A17;padding:20px 0 8px;">${block}</td></tr>`;
  if (isList(block))
    return `<tr><td>${renderList(block)}</td></tr>`;
  return `<tr><td style="font-size:16px;line-height:1.7;color:#2F2A26;padding:8px 0;">${block}</td></tr>`;
}

function buildDeepHTML(insight) {
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

function buildSummaryHTML(insight) {
  const summaryContent = insight?.summary_text || "";
  const childName = insight?.insights_api_payload?.childName || "";

  const summaryItems = summaryContent
    ? summaryContent
        .split("\n")
        .map((line) => line.replace(/^[-•]\s*/, "").trim())
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
            <div style="font-size:26px;font-weight:bold;color:#1F1A17;margin-bottom:10px;">
              🌟 Soul Snapshot — You + ${childName}
            </div>
            <div style="width:50px;height:4px;background:#FABD96;margin-bottom:18px;"></div>
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

// --- Klaviyo ---

async function triggerKlaviyoFlow({ email, childName, parentName, insight }) {
  const headers = {
    Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
    "Content-Type": "application/json",
    Revision: "2024-02-15",
  };

  // Pre-render both emails and Base64 encode them
  // Base64 is pure ASCII — never breaks Klaviyo's webhook JSON
  const deepHtmlB64 = Buffer.from(buildDeepHTML(insight), "utf8").toString("base64");
  const summaryHtmlB64 = Buffer.from(buildSummaryHTML(insight), "utf8").toString("base64");

  const profileAttributes = {
    email,
    first_name: parentName,
    properties: {
      child_name: childName,
      parent_name: parentName,
      real_email: email,
      deep_html_b64: deepHtmlB64,
      summary_html_b64: summaryHtmlB64,
    },
  };

  // 1. Create profile
  const profileRes = await fetch("https://a.klaviyo.com/api/profiles/", {
    method: "POST",
    headers,
    body: JSON.stringify({ data: { type: "profile", attributes: profileAttributes } }),
  });

  const profileJson = await profileRes.json();

  let profileId;
  if (profileRes.status === 409) {
    // Profile already exists — update it with new data
    profileId = profileJson.errors?.[0]?.meta?.duplicate_profile_id;
    if (!profileId) throw new Error("Duplicate profile but no ID returned");

    await fetch(`https://a.klaviyo.com/api/profiles/${profileId}/`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        data: { type: "profile", id: profileId, attributes: profileAttributes },
      }),
    });
  } else if (!profileRes.ok) {
    throw new Error(JSON.stringify(profileJson));
  } else {
    profileId = profileJson.data.id;
  }

  // 2. Add to list — fires the Klaviyo Flow
  const listRes = await fetch(
    `https://a.klaviyo.com/api/lists/${KLAVIYO_LIST_ID}/relationships/profiles/`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({ data: [{ type: "profile", id: profileId }] }),
    }
  );

  if (!listRes.ok) {
    const err = await listRes.text();
    throw new Error(err);
  }

  return { success: true, profileId };
}

// --- Route handler ---

export async function POST(req) {
  try {
    const { email, insight, childName, parentName } = await req.json();

    if (!email) {
      return Response.json({ success: false, error: "Email is required" }, { status: 400 });
    }

    await triggerKlaviyoFlow({ email, childName, parentName, insight });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Klaviyo Error:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

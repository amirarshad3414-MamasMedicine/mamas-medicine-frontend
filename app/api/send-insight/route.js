import nodemailer from "nodemailer";

function cleanAndEscape(str = "") {
  return str
    .normalize("NFC")
    .replace(/[​-‍﻿]/g, "")
    .replace(/[‐-―]/g, "-")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\\/g, "\\\\")  // escape backslashes first
    .replace(/"/g, '\\"')    // escape double quotes
    .replace(/\n/g, "\\n")  // newlines → \n
    .replace(/\r/g, "\\r")  // carriage returns → \r
    .replace(/\t/g, "\\t"); // tabs → \t
}

const KLAVIYO_API_KEY = process.env.KLAVIYO_API_KEY;
const MAIL_USER = process.env.MAIL_USER || "ramshamzamop@gmail.com";
const MAIL_PASS = process.env.MAIL_PASS || "denl xlhu orci ydcm";
const NOTIFY_TO = "hi@soul-sighted.com";

function escapeHtml(value) {
  if (value == null) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function nl2br(value) {
  return escapeHtml(value).replace(/\r?\n/g, "<br/>");
}

function formatTimestamp(ts) {
  if (ts == null || ts === "") return "";
  const num = Number(ts);
  if (!Number.isFinite(num)) return String(ts);
  // Heuristic: < 10^12 → seconds, else milliseconds.
  const ms = num < 1e12 ? num * 1000 : num;
  try {
    return new Date(ms).toISOString();
  } catch {
    return String(ts);
  }
}

function row(label, value) {
  if (value === "" || value == null) return "";
  return `
    <tr>
      <td style="padding:6px 12px 6px 0;font-weight:bold;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td>
      <td style="padding:6px 0;vertical-align:top;">${value}</td>
    </tr>`;
}

function section(title, innerRowsHtml) {
  if (!innerRowsHtml.trim()) return "";
  return `
  <h3 style="margin:24px 0 8px;border-bottom:1px solid #ddd;padding-bottom:4px;">${escapeHtml(title)}</h3>
  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;">
    ${innerRowsHtml}
  </table>`;
}

function buildInsightHtml(body) {
  const insight = body?.insight || {};
  const apiPayload = insight?.insights_api_payload || {};
  const tone = apiPayload?.tone_inputs || {};
  const p1 = apiPayload?.person_1 || {};
  const p2 = apiPayload?.person_2 || {};

  const top = [
    row("Parent name", escapeHtml(body?.parentName || body?.parent_name)),
    row("Child name", escapeHtml(body?.childName || body?.child_name)),
    row("Email", escapeHtml(body?.email)),
    row("User ID", escapeHtml(body?.userId || body?.user_id)),
    row("Journey type", escapeHtml(body?.journey_type || body?.journeyType)),
  ].join("");

  const meta = [
    row("Insight ID", escapeHtml(insight?.id)),
    row("Created at", escapeHtml(formatTimestamp(insight?.created_at))),
    row("Status", escapeHtml(insight?.status)),
    row("Real user ID", escapeHtml(insight?.real_user_id)),
    row("Child ID", escapeHtml(insight?.child_id)),
    row("Journey ID", escapeHtml(insight?.journey_id)),
    row("Request ID", escapeHtml(insight?.request_id)),
    row("Last error", escapeHtml(insight?.last_error)),
  ].join("");

  const parentBirthday = apiPayload?.p1Birthday ?? p1?.birthday ?? "";
  const childBirthday = apiPayload?.p2Birthday ?? p2?.birthday ?? "";
  const parentLat = apiPayload?.p1Lat ?? p1?.lat ?? "";
  const parentLon = apiPayload?.p1Lon ?? p1?.lon ?? "";
  const childLat = apiPayload?.p2Lat ?? p2?.lat ?? "";
  const childLon = apiPayload?.p2Lon ?? p2?.lon ?? "";

  const parentSection = [
    row("Parent name", escapeHtml(body?.parentName || body?.parent_name || apiPayload?.parentName)),
    row("Parent pronouns", escapeHtml(apiPayload?.parentPronouns)),
    row("Parent date of birth", escapeHtml(parentBirthday)),
    row("Parent latitude", escapeHtml(parentLat)),
    row("Parent longitude", escapeHtml(parentLon)),
  ].join("");

  const childSection = [
    row("Child name", escapeHtml(body?.childName || body?.child_name || apiPayload?.childName)),
    row("Child pronouns", escapeHtml(apiPayload?.childPronouns)),
    row("Child date of birth", escapeHtml(childBirthday)),
    row("Child latitude", escapeHtml(childLat)),
    row("Child longitude", escapeHtml(childLon)),
  ].join("");

  const inputs = [
    row("Climate (q1)", escapeHtml(tone?.q1_climate)),
    row("Activation (q2)", escapeHtml(tone?.q2_activation)),
    row("Closeness (q3)", escapeHtml(tone?.q3_closeness)),
    row("Posture (q4)", escapeHtml(tone?.q4_posture)),
    row("Raw parent message", nl2br(apiPayload?.rawParentMessage)),
  ].join("");

  const summary = insight?.summary_text
    ? `<div style="background:#fafafa;border:1px solid #eee;padding:12px;border-radius:6px;">${nl2br(insight.summary_text)}</div>`
    : "";

  const deep = insight?.deep_text
    ? `<div style="background:#fafafa;border:1px solid #eee;padding:12px;border-radius:6px;">${nl2br(insight.deep_text)}</div>`
    : "";

  return `
<div style="font-family:Arial, Helvetica, sans-serif;font-size:14px;color:#333;line-height:1.6;max-width:760px;">
  <h2 style="margin:0 0 8px;">New Insight Generated</h2>
  ${section("Request", top)}
  ${section("Insight metadata", meta)}
  ${section("Parent details", parentSection)}
  ${section("Child details", childSection)}
  ${section("Tone inputs", inputs)}
  ${insight?.summary_text ? `<h3 style="margin:24px 0 8px;border-bottom:1px solid #ddd;padding-bottom:4px;">Summary</h3>${summary}` : ""}
  ${insight?.deep_text ? `<h3 style="margin:24px 0 8px;border-bottom:1px solid #ddd;padding-bottom:4px;">Deep text</h3>${deep}` : ""}
</div>
`;
}

async function sendInsightNotification(body) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: MAIL_USER, pass: MAIL_PASS },
  });

  const parentName = body?.parentName || body?.parent_name || "";
  const childName = body?.childName || body?.child_name || "";
  const email = body?.email || "";

  await transporter.sendMail({
    from: `"Soul-Sighted" <${MAIL_USER}>`,
    to: NOTIFY_TO,
    subject: `New insight: ${parentName} + ${childName} (${email})`,
    html: buildInsightHtml(body),
  });
}

async function triggerKlaviyoFlow({ email, childName, parentName, insight, journey_type }) {
  const headers = {
    Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
    "Content-Type": "application/json",
    Revision: "2024-02-15",
  };

  // Single call — track event with insight data in event properties (not profile).
  // Event properties are immutable per event, so two children onboarding at the same
  // time will never overwrite each other's data.
  const eventRes = await fetch("https://a.klaviyo.com/api/events/", {
    method: "POST",
    headers,
    body: JSON.stringify({
      data: {
        type: "event",
        attributes: {
          profile: {
            data: {
              type: "profile",
              attributes: {
                email,
                properties: {
                  Email: email,
                  parent_name: parentName,
                  child_name: childName,
                  Journey_type: journey_type || "parenting_dynamic",
                  marketing_opt_in: "soft",
                  signup_source: "purchase",
                },
              },
            },
          },
          metric: {
            data: {
              type: "metric",
              attributes: { name: "Insight Ready" },
            },
          },
          properties: {
            child_name: childName,
            deep_text: cleanAndEscape(insight?.deep_text || ""),
            summary_text: cleanAndEscape(insight?.summary_text || ""),
          },
          value: 1,
        },
      },
    }),
  });

  if (!eventRes.ok) {
    const err = await eventRes.text();
    throw new Error(err);
  }

  return { success: true };
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, insight } = body;
    const userId = body?.userId || body?.user_id || null;
    const childName = body.childName || body.child_name;
    const parentName = body.parentName || body.parent_name;
    const journey_type = body.journey_type || body.journeyType;

    if (!email) {
      return Response.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    const [klaviyoResult, mailResult] = await Promise.allSettled([
      triggerKlaviyoFlow({ email, childName, parentName, insight, journey_type }),
      sendInsightNotification(body),
    ]);

    if (mailResult.status === "rejected") {
      console.error("send-insight notification email failed:", mailResult.reason);
    }
    if (klaviyoResult.status === "rejected") {
      throw klaviyoResult.reason;
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Klaviyo Error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

const nodemailer = require("nodemailer");

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE || "https://soulsighted.bytescripterz.com/";
const ONE_HOUR_MS = 60 * 60 * 1000;
const GET_PENDING_EMAILS_ENDPOINT = "get_pending_emails";
const DELIVER_EMAIL_ENDPOINT = "deliver_email";

const MAIL_USER = process.env.MAIL_USER || "ramshamzamop@gmail.com";
const MAIL_PASS = process.env.MAIL_PASS || "roxb vpso ojxu awng";

let isRunning = false;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

async function callApi(endpoint, method = "GET", body) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const contentType = res.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await res.json()
    : await res.text();

  if (!res.ok) {
    throw new Error(
      `API ${endpoint} failed (${res.status}): ${
        typeof data === "string" ? data : JSON.stringify(data)
      }`
    );
  }

  return data;
}

async function getUnsentEmails() {
  const currentTime = Date.now();
  const data = await callApi(
    `${GET_PENDING_EMAILS_ENDPOINT}?current_time=${currentTime}`,
    "GET"
  );
  return Array.isArray(data) ? data : [];
}

async function markDelivered(id) {
  await callApi(DELIVER_EMAIL_ENDPOINT, "POST", { email_id: id });
}

async function sendPendingEmails() {
  if (isRunning) {
    console.log(
      "[email-cron] Previous run still in progress, skipping this tick."
    );
    return;
  }

  isRunning = true;

  try {
    const unsentEmails = await getUnsentEmails();
    console.log(`[email-cron] Found ${unsentEmails.length} unsent emails.`);

    for (const emailRow of unsentEmails) {
      const id = emailRow?.id;
      const to = emailRow?.email;
      const subject = emailRow?.subject || "";
      const html = emailRow?.html_content || emailRow?.body || "";

      if (!id || !to || !subject || !html) {
        console.error(
          `[email-cron] Skipping row due to missing fields: ${JSON.stringify({
            id,
            to,
            subject: Boolean(subject),
            html: Boolean(html),
          })}`
        );
        continue;
      }

      try {
        await transporter.sendMail({
          from: `"Soul-Sighted" <${MAIL_USER}>`,
          to,
          subject,
          html,
        });

        await markDelivered(id);
        console.log(`[email-cron] Delivered and marked email id=${id}`);
      } catch (error) {
        console.error(`[email-cron] Failed processing email id=${id}:`, error);
      }
    }
  } catch (error) {
    console.error("[email-cron] Run failed:", error);
  } finally {
    isRunning = false;
  }
}

export async function GET() {
    await sendPendingEmails()
    .then(() => {
        console.log("[email-cron] Completed sendPendingEmails run.");
    })
    .catch((error) => {
        console.error("[email-cron] Unhandled error in sendPendingEmails:", error);
    })
    return Response.json({ success: true });
}
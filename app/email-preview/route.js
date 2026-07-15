// Dev-only preview of the transactional emails, rendered with THIS server's
// assets (its public/ folder holds the fixed images) so you can verify the
// email fixes in development before deploying to production. Returns 404 in a
// production build.
import teaser from "../api/send-teaser/teaser";
import deep from "../api/send-insight/deep";
import summary from "../api/send-insight/summary";
import { getPurchaseFullInsight } from "../api/send-insight/purchase-full-insight";

const SAMPLES = {
  teaser: () =>
    teaser(
      "<p><strong>You and Dad</strong></p>" +
        "<p>It’s like your dad’s energy has always taken up a lot of space in your life — even when he’s not physically there. You may feel yourself orbiting around him in some way.</p>"
    ),
  deep: () =>
    deep(
      "<p><strong>🌿 Opening Story — The Heart of This Bond</strong></p>" +
        "<p>Sarah, the field between you and Aria is big-hearted and full-on. There’s this sense of, “When she sets her mind to something, she really goes.”</p>"
    ),
  summary: () =>
    summary(
      "Aria",
      "<p><strong>✨ Sarah + Aria — Big Hearts, High Standards, Deep Bond</strong></p>" +
        "<ul><li>💗 A strong Moon-Saturn and Moon-Chiron mix means feelings and “doing the right thing” are tightly linked.</li>" +
        "<li>🫂 A gentle Sun-Mercury-Venus blend gives you soft, affectionate closeness.</li></ul>"
    ),
  purchase: () => getPurchaseFullInsight(),
};

export async function GET(req) {
  if (process.env.NODE_ENV === "production") {
    return new Response("Not found", { status: 404 });
  }
  const name = new URL(req.url).searchParams.get("name");

  if (!name || !SAMPLES[name]) {
    const links = Object.keys(SAMPLES)
      .map(
        (n) =>
          `<li style="margin:8px 0"><a href="/email-preview?name=${n}">${n} email</a></li>`
      )
      .join("");
    return new Response(
      `<div style="font-family:system-ui;padding:24px"><h2>Email previews (dev only)</h2><p>Rendered with this server's assets so you can verify before deploying.</p><ul>${links}</ul></div>`,
      { headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  // Point every hosted asset/link at THIS origin (relative) so the preview uses
  // the local, already-fixed public/ images instead of the old production ones.
  const html = SAMPLES[name]().split("https://parenting-insights.soul-sighted.com").join("");

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

const KLAVIYO_API_KEY = process.env.KLAVIYO_API_KEY || "pk_ab8d15bcfa308fb2790a4ea13c34b277e2";
const MARKETING_LIST_ID = "XPSdCW";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || !email.includes("@")) {
      return Response.json({ subscribed: false });
    }

    const url = `https://a.klaviyo.com/api/lists/${MARKETING_LIST_ID}/profiles/?filter=equals(email,"${encodeURIComponent(email)}")`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        "Content-Type": "application/json",
        Revision: "2024-02-15",
      },
    });

    if (!res.ok) {
      return Response.json({ subscribed: false });
    }

    const data = await res.json();
    const subscribed = data?.data?.length > 0;

    return Response.json({ subscribed });
  } catch (error) {
    console.error("[check-marketing] Error:", error.message);
    return Response.json({ subscribed: false });
  }
}

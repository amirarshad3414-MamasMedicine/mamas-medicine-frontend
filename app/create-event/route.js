const KLAVIYO_API_KEY = process.env.KLAVIYO_API_KEY || "pk_ab8d15bcfa308fb2790a4ea13c34b277e2";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, event_name } = body;
    const parent_name = body.parent_name || body.parentName;
    const child_name = body.child_name || body.childName;
    const journey_type = body.journey_type || body.journeyType;

    console.log("[create-event] Received:", { email, event_name, parent_name, child_name });

    if (!email || !email.includes("@")) {
      console.log("[create-event] Skipping — preview mode, email:", email);
      return Response.json({ success: true, skipped: "preview mode" });
    }

    if (!event_name) {
      return Response.json({ success: false, error: "event_name is required" }, { status: 400 });
    }

    const res = await fetch("https://a.klaviyo.com/api/events/", {
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
            metric: { data: { type: "metric", attributes: { name: event_name } } },
            profile: {
              data: {
                type: "profile",
                attributes: {
                  email,
                  properties: {
                    email,
                    parent_name,
                    child_name,
                    Journey_type: journey_type || "parenting_dynamic",
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

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err);
    }

    console.log("[create-event] Klaviyo event fired:", event_name, "for:", email);
    return Response.json({ success: true });
  } catch (error) {
    console.error("[create-event] Error:", error.message);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

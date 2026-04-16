const KLAVIYO_API_KEY = process.env.KLAVIYO_API_KEY || "pk_ab8d15bcfa308fb2790a4ea13c34b277e2";
const MARKETING_LIST_ID = "XPSdCW";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email } = body;

    console.log("[subscribe-marketing] Received:", { email });

    if (!email || !email.includes("@")) {
      return Response.json({ success: false, error: "Valid email is required" }, { status: 400 });
    }

    // Subscribe profile to marketing list with consent properties
    const res = await fetch("https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/", {
      method: "POST",
      headers: {
        Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        "Content-Type": "application/json",
        Revision: "2024-02-15",
      },
      body: JSON.stringify({
        data: {
          type: "profile-subscription-bulk-create-job",
          attributes: {
            profiles: {
              data: [
                {
                  type: "profile",
                  attributes: {
                    email,
                    properties: {
                      marketing_opt_in: true,
                      signup_source: "stripe_checkout",
                    },
                  },
                },
              ],
            },
            historical_import: false,
          },
          relationships: {
            list: {
              data: {
                type: "list",
                id: MARKETING_LIST_ID,
              },
            },
          },
        },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err);
    }

    console.log("[subscribe-marketing] Subscribed to marketing list:", email);
    return Response.json({ success: true });
  } catch (error) {
    console.error("[subscribe-marketing] Error:", error.message);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}


// https://xnrw-fohw-scw8.a2.xano.io/api:UQuTJ3vx/webhooks
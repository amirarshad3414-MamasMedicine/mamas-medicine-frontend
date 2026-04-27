const KLAVIYO_API_KEY =
  process.env.KLAVIYO_API_KEY || "pk_b161288f56f3898d3b017a1d36528b1ded";
const MARKETING_LIST_ID = "XPSdCW";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email } = body;
    const parent_name = body.parent_name || body.parentName;
    const child_name = body.child_name || body.childName;
    const journey_type = body.journey_type || body.journeyType;

    console.log("[subscribe-marketing] Received:", {
      email,
      parent_name,
      child_name,
    });

    if (!email || !email.includes("@")) {
      return Response.json(
        { success: false, error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Subscribe profile to marketing list with consent properties
    const res = await fetch(
      "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/",
      {
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
                        Email: email,
                        parent_name,
                        child_name,
                        Journey_type: journey_type || "parenting_dynamic",
                        marketing_opt_in: "soft",
                        signup_source: "purchase",
                      },
                    },
                  },
                ],
              },
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
      }
    );

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err);
    }

    console.log("[subscribe-marketing] Subscribed to marketing list:", email);
    return Response.json({ success: true });
  } catch (error) {
    console.error("[subscribe-marketing] Error:", error.message);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

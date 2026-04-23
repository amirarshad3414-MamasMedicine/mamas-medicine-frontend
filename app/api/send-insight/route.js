function cleanAndEscape(str = "") {
  return str
    .normalize("NFC")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/[\u2010-\u2015]/g, "-")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\\/g, "\\\\")  // escape backslashes first
    .replace(/"/g, '\\"')    // escape double quotes
    .replace(/\n/g, "\\n")  // newlines → \n
    .replace(/\r/g, "\\r")  // carriage returns → \r
    .replace(/\t/g, "\\t"); // tabs → \t
}

const KLAVIYO_API_KEY = process.env.KLAVIYO_API_KEY || "pk_ab8d15bcfa308fb2790a4ea13c34b277e2";

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
                  parent_name: parentName,
                  child_name: childName,
                  Journey_type: journey_type || "parenting_dynamic",
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
    const childName = body.childName || body.child_name;
    const parentName = body.parentName || body.parent_name;
    const journey_type = body.journey_type || body.journeyType;

    if (!email) {
      return Response.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    await triggerKlaviyoFlow({ email, childName, parentName, insight, journey_type });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Klaviyo Error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

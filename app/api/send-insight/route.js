const KLAVIYO_API_KEY = process.env.KLAVIYO_API_KEY;
const KLAVIYO_LIST_ID = process.env.KLAVIYO_LIST_ID;

async function triggerKlaviyoFlow({ email, childName, parentName, insight }) {
  const headers = {
    Authorization: `Klaviyo-API-Key pk_ab8d15bcfa308fb2790a4ea13c34b277e2`,
    "Content-Type": "application/json",
    Revision: "2024-02-15",
  };

  // 1. Create/update profile — store everything the webhook will need
  const profileRes = await fetch("https://a.klaviyo.com/api/profiles/", {
    method: "POST",
    headers,
    body: JSON.stringify({
      data: {
        type: "profile",
        attributes: {
          email,
          first_name: parentName,
          properties: {
            child_name: childName,
            parent_name: parentName,
            real_email: email,
            insight: {
              deep_text: insight?.deep_text,
              summary_text: insight?.summary_text,
              insights_api_payload: insight?.insights_api_payload,
            },
          },
        },
      },
    }),
  });

  const profileJson = await profileRes.json();
  if (!profileRes.ok) throw new Error(JSON.stringify(profileJson));

  const profileId = profileJson.data.id;

  // 2. Add to list — this fires the Klaviyo Flow
  const listRes = await fetch(
    `https://a.klaviyo.com/api/lists/R3qHaV/relationships/profiles/`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        data: [{ type: "profile", id: profileId }],
      }),
    }
  );

  if (!listRes.ok) {
    const err = await listRes.text();
    throw new Error(err);
  }

  return { success: true, profileId };
}

export async function POST(req) {
  try {
    const { email, insight, childName, parentName } = await req.json();

    if (!email) {
      return Response.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    await triggerKlaviyoFlow({ email, childName, parentName, insight });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Klaviyo Error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

function cleanForJSON(str = "") {
  return str
    .normalize("NFC")
    .replace(/[\uD800-\uDBFF](?![\uDC00-\uDFFF])/g, "")
    .replace(/(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g, "")
    .replace(/[\u2010-\u2015]/g, "-")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u200B-\u200D\uFEFF]/g, "");
}

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
              deep_text: cleanForJSON(insight?.deep_text || ""),
              summary_text: cleanForJSON(insight?.summary_text || ""),
              insights_api_payload: insight?.insights_api_payload,
            },
          },
        },
      },
    }),
  });

  const profileJson = await profileRes.json();

  let profileId;
  if (profileRes.status === 409) {
    // Profile already exists — extract its ID from the error and update it
    profileId = profileJson.errors?.[0]?.meta?.duplicate_profile_id;
    if (!profileId) throw new Error("Duplicate profile but no ID returned");

    await fetch(`https://a.klaviyo.com/api/profiles/${profileId}/`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        data: {
          type: "profile",
          id: profileId,
          attributes: {
            first_name: parentName,
            properties: {
              child_name: childName,
              parent_name: parentName,
              real_email: email,
              insight: {
                deep_text: cleanForJSON(insight?.deep_text || ""),
                summary_text: cleanForJSON(insight?.summary_text || ""),
                insights_api_payload: insight?.insights_api_payload,
              },
            },
          },
        },
      }),
    });
  } else if (!profileRes.ok) {
    throw new Error(JSON.stringify(profileJson));
  } else {
    profileId = profileJson.data.id;
  }

  // 2. Track event — this fires the Klaviyo Flow
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
              attributes: { email },
            },
          },
          metric: {
            data: {
              type: "metric",
              attributes: { name: "Insight Ready" },
            },
          },
          properties: {},
          value: 1,
        },
      },
    }),
  });

  if (!eventRes.ok) {
    const err = await eventRes.text();
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
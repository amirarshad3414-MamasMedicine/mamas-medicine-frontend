// See devlinkModified/env.js — NEXT_PUBLIC_API_BASE overrides, default is Xano.
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE || "https://xnrw-fohw-scw8.a2.xano.io/api:uUEiFEze/"

export async function request({ method, endpoint, body = null, headers = {} }) {
  console.log(method, endpoint)
  try {
    // Clean join — see devlinkModified/env.js: a leading-slash endpoint plus a
    // trailing-slash base made "…//endpoint", which Xano tolerated but FastAPI 404s.
    const url = BASE_URL.replace(/\/+$/, "") + "/" + endpoint.replace(/^\/+/, "");
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
    });

    const contentType = res.headers.get("content-type");

    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await res.json();
    } else {
      data = await res.text();
    }

    if (!res.ok) {
      throw {
        status: res.status,
        message: data?.message || "Request failed",
        data,
      };
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

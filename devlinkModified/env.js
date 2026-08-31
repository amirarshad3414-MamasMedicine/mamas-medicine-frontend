// Point this at the local FastAPI backend for testing by setting
// NEXT_PUBLIC_API_BASE in .env.local (e.g. http://localhost:8000/). Unset, it
// falls back to live Xano — so removing that line reverts to production.
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE || "https://xnrw-fohw-scw8.a2.xano.io/api:uUEiFEze/";

export async function request({ method, endpoint, body = null, headers = {} }) {
  console.log(method, endpoint);
  try {
    // Join cleanly: some callers pass a leading slash ("/get_children"), and
    // with BASE_URL ending in "/" that produced "…//get_children". Xano
    // tolerated the double slash; FastAPI/Starlette does not and 404s it.
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
    throw error;
  }
}

const BASE_URL = "https://xnrw-fohw-scw8.a2.xano.io/api:uUEiFEze/";

export async function request({ method, endpoint, body = null, headers = {} }) {
  console.log(method, endpoint);
  try {
    const res = await fetch(BASE_URL + endpoint, {
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

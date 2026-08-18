const BACKEND_API_URL =
  process.env.BACKEND_API_URL ||
  "http://localhost:5000/api";

const tunnelHeaders = {
  "bypass-tunnel-reminder": "true",
};

async function proxyRequest(request, context) {
  const { path = [] } = await context.params;
  const url = new URL(request.url);
  const backendUrl = new URL(
    `${BACKEND_API_URL}/${path.join("/")}`
  );

  backendUrl.search = url.search;

  const headers = {
    ...tunnelHeaders,
    "Content-Type":
      request.headers.get("Content-Type") ||
      "application/json",
  };

  const hasBody =
    request.method !== "GET" &&
    request.method !== "HEAD";

  const response = await fetch(backendUrl, {
    method: request.method,
    headers,
    body: hasBody ? await request.text() : undefined,
  });

  return new Response(await response.text(), {
    status: response.status,
    headers: {
      "Content-Type":
        response.headers.get("Content-Type") ||
        "application/json",
    },
  });
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const DELETE = proxyRequest;

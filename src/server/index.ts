export interface AdkProxyOptions {
  /**
   * The base URL of the remote ADK service.
   * Defaults to process.env.ADK_URL or process.env.ADK_BASE_URL.
   */
  baseUrl?: string;

  /**
   * The API endpoint prefix to strip from the request path.
   * @default "/api/chat"
   */
  apiPrefix?: string;

  /**
   * Optional header middleware to inject custom authorization or metadata headers.
   */
  headers?: (
    req: Request
  ) => Record<string, string> | Promise<Record<string, string>>;
}

/**
 * Creates a secure, transparent proxy to forward frontend requests to a remote ADK service.
 */
export function createAdkProxy(options: AdkProxyOptions = {}) {
  const baseUrl =
    options.baseUrl ?? process.env.ADK_URL ?? process.env.ADK_BASE_URL ?? "";
  const apiPrefix = options.apiPrefix ?? "/api/chat";

  const handler = async (req: Request): Promise<Response> => {
    try {
      const url = new URL(req.url);
      const targetPath = url.pathname.replace(new RegExp(`^${apiPrefix}`), "");
      const targetUrl = `${baseUrl.replace(/\/$/, "")}${targetPath}${url.search}`;

      const headers = new Headers(req.headers);
      headers.delete("host");

      if (options.headers) {
        const customHeaders = await options.headers(req);
        for (const [key, value] of Object.entries(customHeaders)) {
          headers.set(key, value);
        }
      }

      const fetchOptions: RequestInit = {
        method: req.method,
        headers,
      };

      if (req.method !== "GET" && req.method !== "HEAD") {
        fetchOptions.body = await req.blob();
      }

      const response = await fetch(targetUrl, fetchOptions);

      return new Response(response.body, {
        status: response.status,
        headers: response.headers,
      });
    } catch (error: any) {
      console.error("Proxy request failed:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  };

  return {
    GET: handler,
    POST: handler,
    PUT: handler,
    DELETE: handler,
  };
}


import { AsyncLocalStorage } from "node:async_hooks";

type SsrCookieState = {
  context: AsyncLocalStorage<string>;
};

const cookieKey = Symbol.for("turnoment.ssrCookies");
const shared = globalThis as typeof globalThis & {
  [cookieKey]?: SsrCookieState;
};

if (!shared[cookieKey]) {
  const state: SsrCookieState = {
    context: new AsyncLocalStorage<string>(),
  };
  const originalFetch = globalThis.fetch.bind(globalThis);

  globalThis.fetch = async (input, init) => {
    const cookie = state.context.getStore();
    const configured = import.meta.env.VITE_API_BASE_URL?.trim();
    const url = new URL(
      input instanceof Request ? input.url : String(input),
    );

    if (cookie && configured &&
        url.origin === new URL(configured).origin &&
        url.pathname.startsWith("/api/v1/")) {
      const headers = new Headers(
        init?.headers ?? (input instanceof Request ? input.headers : undefined),
      );
      headers.set("Cookie", cookie);
      return originalFetch(input, { ...init, headers });
    }

    return originalFetch(input, init);
  };
  shared[cookieKey] = state;
}

const ssrCookieContext = shared[cookieKey]!.context;

import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();
      const response = await ssrCookieContext.run(request.headers.get("cookie") ?? "", () => handler.fetch(request, env, ctx));
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};

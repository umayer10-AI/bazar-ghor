import { NextRequest, NextResponse } from "next/server";

const OAUTH_COOKIE_NAMES = new Set([
  "better-auth.state",
  "better-auth.oauth_state",
  "__Secure-better-auth.state",
  "__Secure-better-auth.oauth_state",
]);

function clearOAuthCookies(request: NextRequest) {
  const response = NextResponse.json({ ok: true });

  for (const cookie of request.cookies.getAll()) {
    if (
      OAUTH_COOKIE_NAMES.has(cookie.name) ||
      cookie.name.startsWith("better-auth.state.") ||
      cookie.name.startsWith("better-auth.oauth_state.") ||
      cookie.name.startsWith("__Secure-better-auth.state.") ||
      cookie.name.startsWith("__Secure-better-auth.oauth_state.")
    ) {
      response.cookies.set(cookie.name, "", {
        path: "/",
        maxAge: 0,
      });
    }
  }

  return response;
}

export function POST(request: NextRequest) {
  return clearOAuthCookies(request);
}

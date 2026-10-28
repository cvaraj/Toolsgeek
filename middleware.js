import { NextResponse } from "next/server";

export function middleware(request) {
  const url = new URL(request.url);
  let redirect = false;

  // Let Vercel's Domains setting choose the canonical host. Redirecting hosts
  // here as well can conflict with Vercel's automatic domain redirect and loop.
  if (url.pathname !== "/" && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.replace(/\/+$/, "");
    redirect = true;
  }
  if (url.pathname.replace(/\/+$/, "") === "/background-generator") {
    url.pathname = "/tools/background-generator";
    redirect = true;
  }

  return redirect ? NextResponse.redirect(url, 301) : NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

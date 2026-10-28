import { NextResponse } from "next/server";

export function middleware(request) {
  const host = request.headers.get("host")?.toLowerCase().split(":")[0];
  const url = new URL(request.url);
  let redirect = false;

  if (host === "www.toolsgeek.online") {
    url.hostname = "toolsgeek.online";
    url.protocol = "https:";
    url.port = "";
    redirect = true;
  }
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

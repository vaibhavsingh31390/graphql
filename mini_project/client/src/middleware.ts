import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getValidSession } from "./lib/helpers";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
  const validity = await getValidSession();
  const res = NextResponse.next();
  if (validity) {
    validity.auth = true;
    res.headers.set("x-auth-state", JSON.stringify(validity));
  } else {
    (await cookies()).delete("session-token");
  }

  if (!validity && req.nextUrl.pathname === "/post") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

export const config = {
  matcher: "/:path*",
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getValidSession } from "./lib/utils";

export async function middleware(req: NextRequest) {
  try {
    const validity = await getValidSession();
    if (!validity) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    const res = NextResponse.next();
    res.headers.set("x-auth-state", "valid");
    return res;
  } catch (error) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/post"],
};

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  const response = NextResponse.json(
    { success: true },
    {
      headers: {
        "Clear-Site-Data": '"cache", "cookies", "storage"',
      },
    }
  );

  response.cookies.set("cache-buster", Date.now().toString());

  return response;
}

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const CUSTOM_DOMAINS = {
  "houseofgnars.wtf": "gnars",
  "gnars.house": "gnars",
  "houseofnouns.wtf": "nouns",
  "houseofnouns.xyz": "nouns",
  "houseoflilnouns.wtf": "lil-nouns",
  "houseoflilnouns.xyz": "lil-nouns",
};

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get("host");
  const subdomain = getSubdomain(hostname);

  const slug = CUSTOM_DOMAINS[hostname] || subdomain;

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next|images|[\\w-]+\\.\\w+).*)",
};

function getSubdomain(hostname: string): string | null {
  if (process.env.VERCEL === "1" && process.env.VERCEL_ENV === "preview") {
    return "nouns";
  }

  return hostname.includes(".") ? hostname.split(".")[0] : null;
}

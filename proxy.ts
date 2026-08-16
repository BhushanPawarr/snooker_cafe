import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/lib/auth.config";

// Uses the edge-safe config only — the full config in lib/auth.ts pulls in
// Prisma (native query engine + libSQL adapter), which can't run in the
// Proxy/Middleware edge runtime.
const { auth } = NextAuth(authConfig);

export const proxy = auth((request) => {
  if (!request.auth) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin", "/admin/((?!login).*)"],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  const pathname = req.nextUrl.pathname;

  // Super Admin only routes
  if (pathname.startsWith("/admin/actions") || pathname.startsWith("/admin/userlists")) {
    if (!["ADMIN", "MODERATOR"].includes(token.role)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // apply middleware to all admin routes
};

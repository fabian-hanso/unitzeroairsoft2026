import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Erstmal nur durchlassen, keine Auth-Checks
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Protect admin routes
    if (path.startsWith("/dashboard/admin")) {
      const allowedRoles = ["SUPER_ADMIN", "ADMIN", "ACCOUNTANT"];
      if (!token || !allowedRoles.includes(token.role as string)) {
        return NextResponse.redirect(new URL("/dashboard/student", req.url));
      }
    }

    // Protect student routes
    if (path.startsWith("/dashboard/student")) {
      if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default withAuth(
  function middleware(req) {
    console.log(req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const { pathname } = req.nextUrl;
        if (pathname === "/examples") {
          return !!token; // If there is a token, the user is authenticated
        }
        return true;
      },
    },
  }
);
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

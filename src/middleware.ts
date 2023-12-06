import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default withAuth(
  function middleware(req) {
    // console.log("🚀 ~ file: middleware.ts:7 ~ middleware ~ req:", req)
    // console.log(req.nextauth.token);
    // console.log("🚀 ~ file: middleware.ts:8 ~ middleware ~ req:", req)
  },
  {
    callbacks: {
      authorized: ({ req,token }) => {
        return !!token; // If there is a token, the user is authenticated
      },
    },
  }
);
export const config = {
  matcher: "/examples/authentication",
};

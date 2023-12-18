import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
const publicRouter = ["/"];
export default withAuth(
  async function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = await getToken({ req });
    // console.log(token)
    if (token && pathname === "/") {
      return NextResponse.redirect(new URL("/music", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const { pathname } = req.nextUrl;
        if (publicRouter.includes(pathname)) {
          return true;
        }
        return !!token;
      },
    },
    pages: {
      // signIn: "/",
    },
  }
);
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

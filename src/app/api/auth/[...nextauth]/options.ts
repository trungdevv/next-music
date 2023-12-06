import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === "/middleware-example") {
        console.log(1);
        return !!auth
      }
      return true
    },
  },
};

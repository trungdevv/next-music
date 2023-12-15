import type { DefaultUser, NextAuthOptions, Session } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

type SessionConfig = Session & {
  accessToken: string;
  user: DefaultUser & {
    id: string;
  };
};
export const options: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_ID as string,
      clientSecret: process.env.SPOTIFY_SECRET as string,
      authorization: { params: { scope: "user-top-read" } },
    }),
  ],

  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.id = (profile as any).id;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      const sessionConfig: SessionConfig = {
        ...session,
        accessToken: token.accessToken as string,
        user: {
          ...session.user,
          id: token.id as string,
        },
      };
      return sessionConfig;
    },
  },
  // adapter: SupabaseAdapter({
  //   url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  //   secret: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  // }) as Adapter,
  // pages: {
  //   signIn: "/auth/signin",
  //   signOut: "/auth/signout",
  //   error: "/auth/error",
  //   verifyRequest: "/auth/verify-request",
  //   newUser: "/auth/new-user",
  // },
};

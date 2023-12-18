import type { DefaultUser, NextAuthOptions, Session } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

type SessionConfig = Session & {
  accessToken: string;
  user: DefaultUser & {
    id: string;
  };
};
const addSeconds = (date: Date, seconds: number) => {
  date.setSeconds(date.getSeconds() + seconds);
  return date;
};
const expires = 60 * 60;
async function refreshAccessToken(token: any) {
  console.log("refreshing access token");
  try {
    const url = `https://accounts.spotify.com/api/token`;
    const data = {
      client_id: process.env.SPOTIFY_ID,
      client_secret: process.env.SPOTIFY_SECRET,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken,
    };

    // https://github.com/github/fetch/issues/263
    const searchParams = Object.keys(data)
      .map((key) => {
        return encodeURIComponent(key) + "=" + encodeURIComponent((data as any)[key]);
      })
      .join("&");

    const response = await fetch(url, {
      body: searchParams,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshToken = await response.json();

    if (!response.ok) {
      throw refreshToken;
    }

    // Give a 10 sec buffer
    const accessTokenExpires = addSeconds(
      new Date(),
      refreshToken.expires_in - 10
    ).toISOString();
    console.log(
      "accessTokenExpires: ",
      new Date(accessTokenExpires).toLocaleTimeString("en-US")
    );

    return {
      ...token,
      accessToken: refreshToken.access_token,
      accessTokenExpires: accessTokenExpires,
      refreshToken: token.refreshToken,
    };
  } catch (error) {
    console.log("error refreshing: ", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
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
        token.refreshToken = account.refresh_token;
        token.accessToken = account.access_token;
        token.expires_at = addSeconds(new Date(), expires - 10); // set initial expire time
        token.id = (profile as any).id;
        return token;
      } else if (new Date().toISOString() < (token as any).expires_at) {
        return token;
      } else {
        return refreshAccessToken(token);
      }
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      console.log(token);
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

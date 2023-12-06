import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
export const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          className : "text-red",
          placeholder: "Enter your name",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials,req) {
        const user = { id: 12, name: "admin", password: "admin" };
        if (
          credentials?.username === user.name && credentials?.password === user.password
        ) {
          return user;
        }else{
            return null
        }
        
      },
    }),
  ],
};

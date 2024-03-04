import axios from "axios";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshToken(token: any): Promise<JWT> {
  const res = await fetch(process.env.API_URL + "/auth/refresh", {
    method: "POST",
    headers: {
      authorization: `Refresh ${token.backendTokens.refreshToken}`,
    },
  });
  console.log("refreshed");

  const response = await res.json();

  return {
    ...token,
    backendTokens: response,
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;

        const res = await axios.post(
          process.env.NEXT_PUBLIC_API_URL + "/auth/login",
          {
            email: email,
            password: password,
          }
        );

        const { access_token } = await res.data;

        const resUser = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + "/users/me",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        
        const user = await resUser.data;
        user.name = user.firstName;
        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: any) {
      // if (user) return { ...token, ...user };

      // if (new Date().getTime() < token.backendTokens.expiresIn) return token;

      // return await refreshToken(token);

      if (user) token.user = user
			return token
    },

    async session({ token, session }) {
      
      session.user = token.user;
      // session.backendTokens = token.backendTokens;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

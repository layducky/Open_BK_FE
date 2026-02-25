import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from 'axios';
import { oAuth2Verify } from "@/services/auth/oAuth2";

const server_url = process.env.NEXT_PUBLIC_API_URL || "http://backendd:5000/api/v1";
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || "";

const SESSION_MAX_AGE = 24 * 60 * 60;

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: SESSION_MAX_AGE,
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        try {
          const response = await axios.post(`${server_url}/auth/login`, {
            email: credentials.email,
              password: credentials.password,
            }, {
                headers: { "Content-Type": "application/json" }
            });

          const data = response.data;
          return {
            id: data.userID,
            name: data.name,
            role: data.role,
            image: data.image,
            accessToken: data.accessToken,
          };
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            console.error("Login failed (Backend response error):", error.response.data);
            return null;
          }
          console.error("Login failed (Network or Unknown Error):", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        if (!profile?.email) {
          throw new Error('No account or profile email');
        }
        return true;
      }
      return !!account?.providerAccountId || true;
    },
    async jwt({token, account, profile, user }) {
      if (account?.provider === "google" && profile) {
        const payload = {
          email: profile.email || "",
          name: profile.name || "",
          picture: profile.picture || "",
          provider: "google",
          providerId: profile.sub || "",
        };

        try {
          const { userID, name, role, image, accessToken } = await oAuth2Verify(payload);
          token.accessToken = accessToken;
          token.id = userID;
          token.role = role;
          token.image = image;
          token.name = name;

        } catch (error) {
          console.error("oAuth2Verify failed:", error);
          throw new Error("Backend verification failed");
        }
      } else if (account?.provider === "credentials" && user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
        token.role = user.role;
        token.image = user.image;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (!token || !session.user) {
        throw new Error('No token or session user');
      }
      session.accessToken = token.accessToken as string;
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      session.user.image = token.image as string;
      session.user.name = token.name as string;

      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    }
  },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
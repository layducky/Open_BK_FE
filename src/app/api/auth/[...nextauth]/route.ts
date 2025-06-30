import NextAuth from "next-auth/next";
import { NextAuthOptions, DefaultSession } from "next-auth";
import { oAuth2Verify } from "@/services/auth/oAuth2";
import GoogleProvider from "next-auth/providers/google";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || "";

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt' 
  },
  providers: [
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
      if (!account || !profile?.email) {
        throw new Error('No account or profile email');
      }
      return true;
    },
    async jwt({token, account, profile }) {
      if (account && profile) {
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
      // if (url.startsWith("/")) return `${baseUrl}${url}`
      // else if (new URL(url).origin === baseUrl) return url
    // return baseUrl
      return '/';
    }
  },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
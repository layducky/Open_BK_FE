import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken: string;
    refreshToken: string;
    user: User;
  }
  interface User {
    id: string;
    accessToken: string;
    role?: string;
    image?: string;
    name?: string;
  }
  interface AdapterUser {
    id: string;
    accessToken: string;
    role?: string;
    image?: string;
    name?: string;
  }
  interface Profile {
    picture?: string;
  }
}

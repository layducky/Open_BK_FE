// src/app/providers.tsx
'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (!browserQueryClient) {
    browserQueryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
        },
      },
    });
  }
  return browserQueryClient;
}

export default function Providers({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
}

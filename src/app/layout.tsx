// app/layout.tsx (Client Component)
"use client";

import React from 'react';
import { Inter } from 'next/font/google';
import { QueryClient, QueryClientProvider } from 'react-query';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = React.useRef<any | null>(new QueryClient());

  return (
    <html lang="en">
      <QueryClientProvider client={queryClient.current}>
        <body className={inter.className}>{children}</body>
      </QueryClientProvider>
    </html>
  );
}

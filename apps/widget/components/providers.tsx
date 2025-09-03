"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ConvexProvider, ConvexReactClient } from "convex/react"

export function Providers({ children }: { children: React.ReactNode }) {

  const client = new ConvexReactClient(
    process.env.NEXT_PUBLIC_CONVEX_URL ?? ""
  );
  return (
    <ConvexProvider
      client={client}
    >
      {children}
    </ConvexProvider>
  )
}

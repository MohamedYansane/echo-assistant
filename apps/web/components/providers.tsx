"use client"
import { ConvexProvider, ConvexReactClient } from "convex/react"
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function Providers({ children }: { children: React.ReactNode }) {

  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? "")
  return (
    <ConvexProvider
     client={convex}
    >
      {children}
    </ConvexProvider>
  )
}

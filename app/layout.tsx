import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import { NextUIProvider } from "@nextui-org/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Email Template Editor",
  description: "Create beautiful email templates with centralized data management",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  )
}

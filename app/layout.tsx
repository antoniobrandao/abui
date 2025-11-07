import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"
import { Providers } from "@/components/providers"
import { Toaster } from "@/components/ui/sonner"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Geist, Geist_Mono } from "next/font/google"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const title = "ABUI"
const description = "Components, blocks, and utilities by Antonio Brandao."

export const metadata: Metadata = {
  title: {
    default: `${title} | ${description}`,
    template: "%s | ABUI",
  },
  description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  manifest: "/site.webmanifest",
  // manifest: `${process.env.NEXT_PUBLIC_BASE_URL}/site.webmanifest`,
  openGraph: {
    images: [
      {
        url: `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <Providers>
          <SidebarProvider>
            <AppSidebar />
            <div className="h-screen overflow-x-hidden flex-1 gap-4">{children}</div>
          </SidebarProvider>
          <Toaster position="top-center" />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}

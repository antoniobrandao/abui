import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"
import { RootProvider } from 'fumadocs-ui/provider'
import { Toaster } from "@/registry/abui/ui/sonner"

const fontSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
})

const title = "Abui"
const description = "A custom UI component registry built with shadcn."

export const metadata: Metadata = {
  title: {
    default: `${title} | ${description}`,
    template: "%s | Abui",
  },
  description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  manifest: "/site.webmanifest",
  openGraph: {
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          title
        )}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          title
        )}&description=${encodeURIComponent(description)}`,
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
      <body className={`${fontSans.variable} font-sans antialiased`}>
        <RootProvider>
          {children}
          <Toaster position="top-center" />
        </RootProvider>
        <Analytics />
      </body>
    </html>
  )
}
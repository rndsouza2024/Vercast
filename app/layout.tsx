import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import type React from "react" // Import React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vercast Video - Share and Watch Videos",
  description: "Upload, share and watch videos online. High quality video hosting platform.",
  keywords: "video upload, video sharing, watch videos, streaming platform",
  openGraph: {
    title: "Vercast Video - Share and Watch Videos",
    description: "Upload, share and watch videos online. High quality video hosting platform.",
    type: "website",
    url: process.env.NEXT_PUBLIC_API_URL,
    siteName: "Vercast Video",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vercast Video - Share and Watch Videos",
    description: "Upload, share and watch videos online. High quality video hosting platform.",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'Dr Trailer'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}


import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import type React from "react" // Import React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Video Uploader - Share and Watch Videos",
  description: "Upload, share and watch videos online. High quality video hosting platform.",
  keywords: "video upload, video sharing, watch videos, streaming platform",
  openGraph: {
    title: "Video Uploader - Share and Watch Videos",
    description: "Upload, share and watch videos online. High quality video hosting platform.",
    type: "website",
    url: process.env.NEXT_PUBLIC_API_URL,
    siteName: "Video Uploader",
  },
  twitter: {
    card: "summary_large_image",
    title: "Video Uploader - Share and Watch Videos",
    description: "Upload, share and watch videos online. High quality video hosting platform.",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
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



// import './globals.css'
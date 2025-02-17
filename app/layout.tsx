// import type { Metadata } from "next"
// import { Inter } from "next/font/google"
// import "./globals.css"
// import type React from "react" // Import React

// const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "Vercast Video - Share and Watch Videos",
//   description: "Upload, share and watch videos online. High quality video hosting platform.",
//   keywords: "video upload, video sharing, watch videos, streaming platform",
//   openGraph: {
//     title: "Vercast Video - Share and Watch Videos",
//     description: "Upload, share and watch videos online. High quality video hosting platform.",
//     type: "website",
//     url: process.env.NEXT_PUBLIC_API_URL,
//     siteName: "Vercast Video",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Vercast Video - Share and Watch Videos",
//     description: "Upload, share and watch videos online. High quality video hosting platform.",
//   },
//   robots: {
//     index: true,
//     follow: true,
//   },
//     generator: 'Dr Trailer'
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>{children}</body>
//     </html>
//   )
// }








// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import Navbar from "../components/Navbar"; // Import the Navbar component
// import Footer from "../components/Footer"; // Import the Footer component
// import "./globals.css";
// import type React from "react";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Vercast Video - Share and Watch Videos",
//   description: "Upload, share and watch videos online. High quality video hosting platform.",
//   keywords: "video upload, video sharing, watch videos, streaming platform",
//   openGraph: {
//     title: "Vercast Video - Share and Watch Videos",
//     description: "Upload, share and watch videos online. High quality video hosting platform.",
//     type: "website",
//     url: process.env.NEXT_PUBLIC_API_URL,
//     siteName: "Vercast Video",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Vercast Video - Share and Watch Videos",
//     description: "Upload, share and watch videos online. High quality video hosting platform.",
//   },
//   robots: {
//     index: true,
//     follow: true,
//   },
//   generator: "Dr Trailer",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <Navbar /> {/* Place the Navbar here */}
//         {children} {/* Render the page content */}
//         <Footer /> {/* Footer added here */}
//       </body>
//     </html>
//   );
// }




import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar"; // Import the Navbar component
import Footer from "../components/Footer"; // Import the Footer component
import GoogleAnalytics from '@bradgarropy/next-google-analytics';
import "./globals.css";
import type React from "react";

const inter = Inter({ subsets: ["latin"] });

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
  generator: "Dr Trailer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Favicon and icon links */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="googlebot" content="index, follow" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta
          name="google-site-verification"
          content="4gdbnCGat0T4Ow3Y_RYzPM4vwtsXvhUel5Q-2yULK6k"
        />
        <meta
          property='og:image'
          content='https://vercast.vercel.app/og_image.jpg'
        />
        <meta property='og:image:width' content='1280' />
        <meta property='og:image:height' content='720' />
        <meta property='og:image:type' content='image/jpg' />
      </head>
      <body className={inter.className}>
        <Navbar /> {/* Place the Navbar here */}
        <GoogleAnalytics measurementId="G-Q23HGX0T74" />
        {children} {/* Render the page content */}
        <Footer /> {/* Footer added here */}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MindfulBlogAI | Discover the Best AI Tools for Productivity",
  description: "Find and compare the best AI tools for writing, coding, image generation, video creation, and business automation. Expert reviews, comparisons, and exclusive deals.",
  keywords: ["AI tools", "AI software", "productivity AI", "AI comparison", "best AI tools", "AI reviews"],
  authors: [{ name: "MindfulBlogAI" }],
  creator: "MindfulBlogAI",
  publisher: "MindfulBlogAI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mindfulblogai.com",
    siteName: "MindfulBlogAI",
    title: "MindfulBlogAI | Discover the Best AI Tools",
    description: "Find and compare the best AI tools for productivity, creativity, and business.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MindfulBlogAI - AI Tools Directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MindfulBlogAI | Discover the Best AI Tools",
    description: "Find and compare the best AI tools for productivity, creativity, and business.",
    images: ["/og-image.jpg"],
    creator: "@mindfulblogai",
  },
  alternates: {
    canonical: "https://mindfulblogai.com",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6867328086411956"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} antialiased bg-gray-50 min-h-screen`}>
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

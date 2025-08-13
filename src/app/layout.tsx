import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import AdSenseLoader from '@/components/AdSenseLoader'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'AI Insights - Latest AI Tools, News & Reviews 2025',
    template: '%s | AI Insights'
  },
  description: 'Discover the best AI tools, latest artificial intelligence news, and expert reviews. Your trusted source for AI technology insights, tutorials, and industry analysis.',
  keywords: [
    'AI tools',
    'artificial intelligence',
    'machine learning',
    'AI news',
    'ChatGPT',
    'AI reviews',
    'tech news',
    'AI tutorials',
    'automation tools',
    'AI trends 2025'
  ],
  authors: [{ name: 'AI Insights Team' }],
  creator: 'AI Insights',
  publisher: 'AI Insights',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mindfulblogai.com',
    siteName: 'AI Insights',
    title: 'AI Insights - Latest AI Tools & Technology News',
    description: 'Discover cutting-edge AI tools, stay updated with the latest artificial intelligence news, and explore comprehensive reviews from industry experts.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Insights - Your Source for AI News and Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Insights - Latest AI Tools & Technology News',
    description: 'Discover cutting-edge AI tools, stay updated with the latest artificial intelligence news, and explore comprehensive reviews from industry experts.',
    images: ['/twitter-image.jpg'],
    creator: '@aiinsights',
  },
  verification: {
    google: 'your-google-verification-code', // Add your actual verification code
  },
  alternates: {
    canonical: 'https://mindfulblogai.com',
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense Account Verification */}
        <meta name="google-adsense-account" content="ca-pub-6867328086411956" />
        
        {/* Additional SEO Meta Tags */}
        <link rel="canonical" href="https://mindfulblogai.com" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'AI Insights',
              url: 'https://mindfulblogai.com',
              description: 'Your trusted source for AI news, tool reviews, and industry analysis',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://mindfulblogai.com/blog?q={search_term_string}',
                'query-input': 'required name=search_term_string'
              },
              publisher: {
                '@type': 'Organization',
                name: 'AI Insights',
                url: 'https://mindfulblogai.com',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://mindfulblogai.com/logo.png'
                }
              }
            })
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <AuthProvider>
          {children}
        </AuthProvider>
        
        {/* AdSense Script Loader */}
        <AdSenseLoader />
      </body>
    </html>
  )
}
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import AdSenseLoader from '@/components/AdSenseLoader'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'World News Network - Breaking News, Latest Updates & Headlines 2025',
    template: '%s | World News Network'
  },
  description: 'Stay informed with breaking news, latest updates, and in-depth coverage from around the world. World News Network delivers verified news from trusted sources across Politics, Business, Technology, Sports, Health, Science, and Entertainment.',
  keywords: [
    'world news',
    'breaking news',
    'latest news',
    'news headlines',
    'global news',
    'international news',
    'business news',
    'technology news',
    'sports news',
    'political news',
    'health news',
    'entertainment news',
    'science news',
    'news updates 2025',
    'current events'
  ],
  authors: [{ name: 'World News Network Editorial Team' }],
  creator: 'World News Network',
  publisher: 'World News Network',
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
    siteName: 'World News Network',
    title: 'World News Network - Breaking News & Latest Headlines',
    description: 'Stay informed with breaking news, latest updates, and comprehensive coverage from around the globe. Your trusted source for verified news 24/7.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'World News Network - Your Source for Breaking News',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'World News Network - Breaking News & Latest Headlines',
    description: 'Stay informed with breaking news, latest updates, and comprehensive coverage from around the globe. Your trusted source for verified news 24/7.',
    images: ['/twitter-image.jpg'],
    creator: '@worldnewsnet',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://mindfulblogai.com',
  },
  category: 'news',
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
        <meta name="theme-color" content="#dc2626" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'NewsMediaOrganization',
              name: 'World News Network',
              url: 'https://mindfulblogai.com',
              description: 'Breaking news, latest updates, and comprehensive coverage from around the world',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://mindfulblogai.com/news?q={search_term_string}',
                'query-input': 'required name=search_term_string'
              },
              publisher: {
                '@type': 'Organization',
                name: 'World News Network',
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
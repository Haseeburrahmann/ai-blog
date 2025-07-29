import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Insights - Latest AI Developments & Tool Recommendations',
  description: 'Stay updated with the newest artificial intelligence trends, breakthroughs, and discover the best AI tools to boost your productivity.',
  keywords: 'AI, artificial intelligence, machine learning, AI tools, technology news, AI reviews',
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
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <AuthProvider>
          {children}
        </AuthProvider>
        
        {/* Google AdSense Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6867328086411956"
          crossOrigin="anonymous"
          strategy="afterInteractive"
          onLoad={() => {
            console.log('✅ AdSense script loaded successfully')
            // Initialize page-level ads
            try {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ;(window as any).adsbygoogle = (window as any).adsbygoogle || []
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ;(window as any).adsbygoogle.push({
                google_ad_client: "ca-pub-6867328086411956",
                enable_page_level_ads: true
              })
              console.log('✅ AdSense page-level ads initialized')
            } catch (error) {
              console.error('❌ AdSense initialization error:', error)
            }
          }}
          onError={(error) => {
            console.error('❌ AdSense script failed to load:', error)
          }}
        />
      </body>
    </html>
  )
}
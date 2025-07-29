import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import AdSenseLoader from '@/components/AdSenseLoader'

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
        
        {/* AdSense Script Loader */}
        <AdSenseLoader />
      </body>
    </html>
  )
}
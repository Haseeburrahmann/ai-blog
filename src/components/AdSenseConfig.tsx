'use client'

import { useEffect } from 'react'
import Script from 'next/script'

interface AdSenseConfigProps {
  publisherId: string
}

export default function AdSenseConfig({ publisherId }: AdSenseConfigProps) {
  useEffect(() => {
    // Enable auto ads
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const adsbygoogle = (window as any).adsbygoogle || []
      adsbygoogle.push({
        google_ad_client: publisherId,
        enable_page_level_ads: true
      })
    } catch (error) {
      console.error('AdSense auto ads error:', error)
    }
  }, [publisherId])

  return (
    <>
      <Script
        id="adsense-script"
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('AdSense script loaded')
        }}
        onError={(error) => {
          console.error('AdSense script failed to load:', error)
        }}
      />
    </>
  )
}
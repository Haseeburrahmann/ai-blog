'use client'

import Script from 'next/script'

export default function AdSenseLoader() {
  const handleScriptLoad = () => {
    console.log('✅ AdSense script loaded successfully')
    // Initialize page-level ads
    try {
      if (typeof window !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(window as any).adsbygoogle = (window as any).adsbygoogle || []
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(window as any).adsbygoogle.push({
          google_ad_client: "ca-pub-6867328086411956",
          enable_page_level_ads: true
        })
        console.log('✅ AdSense page-level ads initialized')
      }
    } catch (error) {
      console.error('❌ AdSense initialization error:', error)
    }
  }

  const handleScriptError = () => {
    console.error('❌ AdSense script failed to load')
  }

  return (
    <Script
      id="adsense-script"
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6867328086411956"
      crossOrigin="anonymous"
      strategy="afterInteractive"
      onLoad={handleScriptLoad}
      onError={handleScriptError}
    />
  )
}
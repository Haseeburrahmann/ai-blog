'use client'

import Script from 'next/script'

export default function AdSenseLoader() {
  const publisherId = 'ca-pub-6867328086411956'

  const handleScriptLoad = () => {
    console.log('✅ AdSense script loaded successfully')
    
    try {
      if (typeof window !== 'undefined') {
        // Initialize adsbygoogle array
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(window as any).adsbygoogle = (window as any).adsbygoogle || []
        console.log('✅ AdSense array initialized')
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
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
      onLoad={handleScriptLoad}
      onError={handleScriptError}
    />
  )
}
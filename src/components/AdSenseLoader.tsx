'use client'

import Script from 'next/script'

export default function AdSenseLoader() {
  const handleScriptLoad = () => {
    console.log('✅ AdSense script loaded successfully')
    
    try {
      if (typeof window !== 'undefined') {
        // Initialize adsbygoogle array
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(window as any).adsbygoogle = (window as any).adsbygoogle || []
        
        // DO NOT initialize page-level ads here - let AdSense handle it automatically
        console.log('✅ AdSense array initialized (page-level ads will be handled automatically)')
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
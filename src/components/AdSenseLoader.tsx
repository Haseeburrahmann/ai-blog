'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

export default function AdSenseLoader() {
  const [scriptLoaded, setScriptLoaded] = useState(false)

  const handleScriptLoad = () => {
    console.log('✅ AdSense script loaded successfully')
    setScriptLoaded(true)
    
    // Initialize page-level ads only once
    try {
      if (typeof window !== 'undefined') {
        // Check if already initialized
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (!(window as any).adsenseInitialized) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(window as any).adsbygoogle = (window as any).adsbygoogle || []
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(window as any).adsbygoogle.push({
            google_ad_client: "ca-pub-6867328086411956",
            enable_page_level_ads: true
          })
          
          // Mark as initialized to prevent duplicate calls
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(window as any).adsenseInitialized = true
          console.log('✅ AdSense page-level ads initialized')
        } else {
          console.log('ℹ️ AdSense already initialized, skipping')
        }
      }
    } catch (error) {
      console.error('❌ AdSense initialization error:', error)
    }
  }

  const handleScriptError = () => {
    console.error('❌ AdSense script failed to load')
  }

  // Also initialize ads for any existing ad elements on the page
  useEffect(() => {
    if (scriptLoaded && typeof window !== 'undefined') {
      const initializeAds = () => {
        const adElements = document.querySelectorAll('.adsbygoogle')
        adElements.forEach((adElement) => {
          if (!adElement.hasAttribute('data-adsbygoogle-status')) {
            try {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ;(window as any).adsbygoogle = (window as any).adsbygoogle || []
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ;(window as any).adsbygoogle.push({})
              console.log('✅ Ad element initialized')
            } catch (error) {
              console.error('❌ Ad element initialization failed:', error)
            }
          }
        })
      }

      // Wait a bit for DOM to be ready
      setTimeout(initializeAds, 1000)
    }
  }, [scriptLoaded])

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
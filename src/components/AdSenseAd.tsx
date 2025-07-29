'use client'

import { useEffect, useRef, useState } from 'react'
import ClientOnly from './ClientOnly'

interface AdSenseAdProps {
  adSlot?: string
  width?: number
  height?: number
  className?: string
  format?: 'auto' | 'rectangle' | 'leaderboard' | 'banner'
}

function AdSenseAdComponent({
  adSlot,
  width = 728,
  height = 90,
  className = '',
  format = 'auto'
}: AdSenseAdProps) {
  const adRef = useRef<HTMLModElement>(null)
  const [initialized, setInitialized] = useState(false)
  const publisherId = 'ca-pub-6867328086411956'

  useEffect(() => {
    if (initialized) return

    let attempts = 0
    const maxAttempts = 20

    const initializeAd = () => {
      attempts++

      // Check if AdSense is loaded
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!(window as any).adsbygoogle) {
        if (attempts < maxAttempts) {
          setTimeout(initializeAd, 500)
          return
        } else {
          console.error('AdSense not loaded after 10 seconds')
          return
        }
      }

      // Check if ad element exists
      if (!adRef.current) {
        console.error('Ad element not found')
        return
      }

      // Check if already initialized
      if (adRef.current.hasAttribute('data-adsbygoogle-status')) {
        console.log('Ad already initialized')
        setInitialized(true)
        return
      }

      try {
        // Initialize the ad
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(window as any).adsbygoogle.push({})
        setInitialized(true)
        console.log('✅ Ad initialized successfully')
      } catch (error) {
        console.error('❌ Ad initialization failed:', error)
      }
    }

    // Start initialization after a delay
    const timer = setTimeout(initializeAd, 1000)
    
    return () => clearTimeout(timer)
  }, [initialized])

  const adStyle: React.CSSProperties = {
    display: 'block',
    width: format === 'auto' ? '100%' : width,
    height: format === 'auto' ? 'auto' : height
  }

  return (
    <div className={className}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={adStyle}
        data-ad-client={publisherId}
        {...(adSlot && { 'data-ad-slot': adSlot })}
        data-ad-format={format}
        data-full-width-responsive={format === 'auto' ? 'true' : 'false'}
        suppressHydrationWarning={true}
      />
    </div>
  )
}

export default function AdSenseAd(props: AdSenseAdProps) {
  return (
    <ClientOnly
      fallback={
        <div 
          className={`bg-gray-100 border border-gray-300 rounded p-4 ${props.className}`} 
          style={{ width: props.width || '100%', height: props.height || 250 }}
        >
          <div className="flex items-center justify-center h-full text-gray-500 text-sm">
            Loading Ad...
          </div>
        </div>
      }
    >
      <AdSenseAdComponent {...props} />
    </ClientOnly>
  )
}
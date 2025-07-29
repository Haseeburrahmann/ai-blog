'use client'

import { useEffect, useRef } from 'react'

interface SimpleAdSenseAdProps {
  adSlot?: string
  width?: number
  height?: number
  className?: string
  format?: 'auto' | 'rectangle' | 'leaderboard' | 'banner'
}

export default function SimpleAdSenseAd({
  adSlot,
  width = 728,
  height = 90,
  className = '',
  format = 'auto'
}: SimpleAdSenseAdProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const publisherId = 'ca-pub-6867328086411956'

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const adsbygoogle = (window as any).adsbygoogle || []
        
        // Only push if the ad element exists and hasn't been initialized
        const adElement = adRef.current?.querySelector('.adsbygoogle')
        if (adElement && !adElement.hasAttribute('data-adsbygoogle-status')) {
          adsbygoogle.push({})
        }
      } catch (error) {
        console.error('AdSense error:', error)
      }
    }
  }, [])

  // If AdSense is not available, show placeholder
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (typeof window !== 'undefined' && !(window as any).adsbygoogle) {
    return (
      <div 
        className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500 text-sm ${className}`}
        style={{ width, height }}
      >
        AdSense Loading... ({width} x {height})
      </div>
    )
  }

  const adStyle: React.CSSProperties = {
    display: 'block',
    width: format === 'auto' ? '100%' : width,
    height: format === 'auto' ? 'auto' : height
  }

  return (
    <div ref={adRef} className={className}>
      <ins
        className="adsbygoogle"
        style={adStyle}
        data-ad-client={publisherId}
        {...(adSlot && { 'data-ad-slot': adSlot })}
        data-ad-format={format}
        data-full-width-responsive={format === 'auto' ? 'true' : 'false'}
      />
    </div>
  )
}
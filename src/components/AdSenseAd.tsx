'use client'

import { useEffect } from 'react'

interface AdSenseAdProps {
  adSlot: string
  adFormat?: string
  width?: number
  height?: number
  className?: string
  responsive?: boolean
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    adsbygoogle: any[]
  }
}

export default function AdSenseAd({
  adSlot,
  adFormat = 'auto',
  width,
  height,
  className = '',
  responsive = true
}: AdSenseAdProps) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID

  useEffect(() => {
    if (typeof window !== 'undefined' && clientId) {
      try {
        // Initialize adsbygoogle array if it doesn't exist
        window.adsbygoogle = window.adsbygoogle || []
        // Push the ad configuration
        window.adsbygoogle.push({})
      } catch (err) {
        console.error('AdSense error:', err)
      }
    }
  }, [clientId])

  // Don't render if no client ID is provided
  if (!clientId) {
    return (
      <div className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500 text-sm ${className}`}
           style={{ width: width || '100%', height: height || 250 }}>
        AdSense Ad Space ({width || 'auto'} x {height || 'auto'})
      </div>
    )
  }

  const adStyle: React.CSSProperties = {
    display: 'block',
    width: width || '100%',
    height: height || 'auto'
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={adStyle}
        data-ad-client={clientId}
        data-ad-slot={adSlot}
        data-ad-format={responsive ? 'auto' : adFormat}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  )
}
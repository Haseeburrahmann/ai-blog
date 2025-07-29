'use client'

import { useEffect, useRef, useState } from 'react'

interface WorkingAdSenseAdProps {
  adSlot?: string
  width?: number
  height?: number
  className?: string
  format?: 'auto' | 'rectangle' | 'leaderboard' | 'banner' | 'square'
  responsive?: boolean
}

export default function WorkingAdSenseAd({
  adSlot,
  width = 300,
  height = 250,
  className = '',
  format = 'auto',
  responsive = true
}: WorkingAdSenseAdProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const [adLoaded, setAdLoaded] = useState(false)
  const [error, setError] = useState<string>('')
  const publisherId = 'ca-pub-6867328086411956'

  useEffect(() => {
    const loadAd = () => {
      try {
        // Check if AdSense script is loaded
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (!(window as any).adsbygoogle) {
          setError('AdSense script not loaded yet')
          // Retry after a delay
          setTimeout(loadAd, 1000)
          return
        }

        // Get the ad element
        const adElement = adRef.current?.querySelector('.adsbygoogle')
        if (!adElement) {
          setError('Ad element not found')
          return
        }

        // Check if already initialized
        if (adElement.hasAttribute('data-adsbygoogle-status')) {
          console.log('Ad already initialized')
          return
        }

        // Initialize the ad
        console.log('Initializing AdSense ad...')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(window as any).adsbygoogle.push({})
        setAdLoaded(true)
        console.log('✅ AdSense ad initialized')
        
      } catch (error) {
        console.error('❌ AdSense ad error:', error)
        setError(`Ad initialization failed: ${error}`)
      }
    }

    // Start loading after component mounts
    const timer = setTimeout(loadAd, 500)
    
    return () => clearTimeout(timer)
  }, [])

  // Show placeholder while loading or if there's an error
  if (!adLoaded || error) {
    return (
      <div 
        className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 text-sm p-4 ${className}`}
        style={{ width: responsive ? '100%' : width, height: height, minHeight: 100 }}
      >
        <div className="text-center">
          <div className="mb-2">
            {error ? '⚠️ AdSense Error' : '🔄 Loading Ad...'}
          </div>
          <div className="text-xs">
            {responsive ? 'Responsive' : `${width} x ${height}`}
          </div>
          {error && (
            <div className="text-xs text-red-500 mt-1 max-w-xs">
              {error}
            </div>
          )}
        </div>
      </div>
    )
  }

  const adStyle: React.CSSProperties = {
    display: 'block',
    width: responsive ? '100%' : width,
    height: responsive ? 'auto' : height
  }

  return (
    <div ref={adRef} className={className}>
      <ins
        className="adsbygoogle"
        style={adStyle}
        data-ad-client={publisherId}
        {...(adSlot && { 'data-ad-slot': adSlot })}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  )
}
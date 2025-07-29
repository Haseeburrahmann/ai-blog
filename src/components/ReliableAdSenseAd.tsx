'use client'

import { useEffect, useRef, useState } from 'react'

interface ReliableAdSenseAdProps {
  adSlot?: string
  width?: number
  height?: number
  className?: string
  format?: 'auto' | 'rectangle' | 'leaderboard' | 'banner'
  style?: React.CSSProperties
}

export default function ReliableAdSenseAd({
  adSlot,
  width = 728,
  height = 90,
  className = '',
  format = 'auto',
  style = {}
}: ReliableAdSenseAdProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const [adLoaded, setAdLoaded] = useState(false)
  const [error, setError] = useState<string>('')
  const publisherId = 'ca-pub-6867328086411956'

  useEffect(() => {
    let retryCount = 0
    const maxRetries = 10

    const initializeAd = () => {
      try {
        // Check if AdSense is available
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (!(window as any).adsbygoogle) {
          if (retryCount < maxRetries) {
            retryCount++
            console.log(`Waiting for AdSense... attempt ${retryCount}`)
            setTimeout(initializeAd, 1000)
            return
          } else {
            setError('AdSense script not loaded after 10 seconds')
            return
          }
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
          setAdLoaded(true)
          return
        }

        // Initialize the ad
        console.log('Initializing AdSense ad...')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(window as any).adsbygoogle.push({})
        setAdLoaded(true)
        setError('')
        console.log('✅ AdSense ad initialized successfully')
        
      } catch (error) {
        console.error('❌ AdSense ad error:', error)
        setError(`Ad initialization failed: ${error}`)
      }
    }

    // Start initialization after a small delay
    const timer = setTimeout(initializeAd, 500)
    
    return () => clearTimeout(timer)
  }, [])

  const combinedStyle: React.CSSProperties = {
    display: 'block',
    width: format === 'auto' ? '100%' : width,
    height: format === 'auto' ? 'auto' : height,
    ...style
  }

  return (
    <div ref={adRef} className={className}>
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4 text-center">
          <p className="text-yellow-800 text-sm">⚠️ {error}</p>
          <p className="text-yellow-600 text-xs mt-1">
            This might be normal for new AdSense accounts (24-48 hour delay)
          </p>
        </div>
      )}
      
      <ins
        className="adsbygoogle"
        style={combinedStyle}
        data-ad-client={publisherId}
        {...(adSlot && { 'data-ad-slot': adSlot })}
        data-ad-format={format}
        data-full-width-responsive={format === 'auto' ? 'true' : 'false'}
      />
    </div>
  )
}
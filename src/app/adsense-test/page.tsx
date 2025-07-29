'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function AdSenseTest() {
  const [adsLoaded, setAdsLoaded] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    // Check if AdSense script is already loaded
    if (document.querySelector('script[src*="adsbygoogle.js"]')) {
      setAdsLoaded(true)
      initializeAds()
      return
    }

    // Load AdSense script
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6867328086411956'
    script.crossOrigin = 'anonymous'
    
    script.onload = () => {
      console.log('AdSense script loaded successfully')
      setAdsLoaded(true)
      initializeAds()
    }
    
    script.onerror = (error) => {
      console.error('Failed to load AdSense script:', error)
      setErrors(prev => [...prev, 'Failed to load AdSense script'])
    }
    
    document.head.appendChild(script)

    return () => {
      // Cleanup - don't remove script as it might be used elsewhere
    }
  }, [])

  const initializeAds = () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const adsbygoogle = (window as any).adsbygoogle || []
      
      // Initialize each ad unit
      const adElements = document.querySelectorAll('.adsbygoogle')
      adElements.forEach((adElement, index) => {
        if (!adElement.hasAttribute('data-adsbygoogle-status')) {
          try {
            adsbygoogle.push({})
            console.log(`Initialized ad unit ${index + 1}`)
          } catch (error) {
            console.error(`Error initializing ad unit ${index + 1}:`, error)
            setErrors(prev => [...prev, `Error initializing ad unit ${index + 1}: ${error}`])
          }
        }
      })
    } catch (error) {
      console.error('AdSense initialization error:', error)
      setErrors(prev => [...prev, `AdSense initialization error: ${error}`])
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Home
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold mb-8">AdSense Test Page</h1>
        
        {/* Status Information */}
        <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded">
          <h3 className="font-bold text-blue-800 mb-2">Status:</h3>
          <p className="text-blue-700">
            AdSense Script: {adsLoaded ? '✅ Loaded' : '⏳ Loading...'}
          </p>
          <p className="text-sm text-blue-600 mt-2">
            Publisher ID: ca-pub-6867328086411956
          </p>
        </div>

        {/* Error Messages */}
        {errors.length > 0 && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded">
            <h3 className="font-bold text-red-800 mb-2">Errors:</h3>
            <ul className="text-red-700 space-y-1">
              {errors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="space-y-8">
          {/* Auto Ad - No specific slot needed */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Auto Ad (No Slot Required)</h2>
            <ins 
              className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client="ca-pub-6867328086411956"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>

          {/* Display Ad - Generic */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Display Ad (Generic)</h2>
            <ins 
              className="adsbygoogle"
              style={{ display: 'block', width: '728px', height: '90px' }}
              data-ad-client="ca-pub-6867328086411956"
              data-ad-format="auto"
            />
          </div>

          {/* Rectangle Ad */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Rectangle Ad</h2>
            <ins 
              className="adsbygoogle"
              style={{ display: 'inline-block', width: '300px', height: '250px' }}
              data-ad-client="ca-pub-6867328086411956"
              data-ad-format="auto"
            />
          </div>
        </div>

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <h3 className="font-bold text-yellow-800 mb-2">Troubleshooting Tips:</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• <strong>400 Error</strong>: Usually means ad slots aren&apos;t created in AdSense dashboard</li>
            <li>• <strong>New Account</strong>: May take 24-48 hours for ads to show</li>
            <li>• <strong>Site Review</strong>: Google needs to approve your site first</li>
            <li>• <strong>Content Policy</strong>: Ensure content meets AdSense guidelines</li>
            <li>• <strong>Traffic</strong>: Some regions require minimum traffic levels</li>
            <li>• Check browser console (F12) for detailed error messages</li>
            <li>• Verify ads.txt file is accessible at: <a href="/ads.txt" target="_blank" className="text-blue-600 hover:underline">/ads.txt</a></li>
          </ul>
        </div>

        {/* AdSense Account Status Check */}
        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded">
          <h3 className="font-bold text-green-800 mb-2">Next Steps:</h3>
          <ol className="text-sm text-green-700 space-y-2 list-decimal list-inside">
            <li>Go to <a href="https://www.google.com/adsense/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google AdSense Dashboard</a></li>
            <li>Check if your site is approved under &quot;Sites&quot;</li>
            <li>Create ad units under &quot;Ads&quot; → &quot;By ad unit&quot;</li>
            <li>Replace generic ads above with specific ad slot IDs</li>
            <li>Wait for approval if account is still under review</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
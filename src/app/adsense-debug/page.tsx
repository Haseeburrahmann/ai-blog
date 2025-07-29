/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import WorkingAdSenseAd from '@/components/WorkingAdSenseAd'

interface NetworkRequest {
  url: string
  timestamp: string
  status?: number
}

export default function AdSenseDebug() {
  const [debugInfo, setDebugInfo] = useState({
    scriptLoaded: false,
    adsbygoogleExists: false,
    scriptElement: null as HTMLScriptElement | null,
    errors: [] as string[],
    networkRequests: [] as NetworkRequest[]
  })

  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    const checkStatus = () => {
      const scriptElement = document.querySelector('script[src*="adsbygoogle.js"]') as HTMLScriptElement
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const adsbygoogleExists = !!(window as any).adsbygoogle
      
      setDebugInfo(prev => ({
        ...prev,
        scriptLoaded: !!scriptElement,
        adsbygoogleExists,
        scriptElement
      }))
    }

    // Initial check
    checkStatus()

    // Check periodically
    const interval = setInterval(checkStatus, 1000)

    // Listen for console errors
    const originalError = console.error
    console.error = (...args) => {
      const errorMsg = args.join(' ')
      if (errorMsg.includes('ads') || errorMsg.includes('adsbygoogle')) {
        setDebugInfo(prev => ({
          ...prev,
          errors: [...prev.errors, errorMsg]
        }))
      }
      originalError.apply(console, args)
    }

    return () => {
      clearInterval(interval)
      console.error = originalError
    }
  }, [refreshKey])

  const forceReload = () => {
    window.location.reload()
  }

  const manuallyLoadScript = () => {
    // Remove existing script if any
    const existingScript = document.querySelector('script[src*="adsbygoogle.js"]')
    if (existingScript) {
      existingScript.remove()
    }

    // Create new script
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6867328086411956'
    script.crossOrigin = 'anonymous'
    
    script.onload = () => {
      console.log('✅ Manual script load successful')
      // Initialize adsbygoogle
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(window as any).adsbygoogle = (window as any).adsbygoogle || []
        setRefreshKey(prev => prev + 1)
      } catch (error) {
        console.error('❌ Manual initialization error:', error)
      }
    }
    
    script.onerror = (error) => {
      console.error('❌ Manual script load failed:', error)
      setDebugInfo(prev => ({
        ...prev,
        errors: [...prev.errors, `Manual script load failed: ${error}`]
      }))
    }
    
    document.head.appendChild(script)
  }

  const testAdSenseAccount = async () => {
    try {
      // Test with a simple image request to check if the domain is blocked
      const testUrl = 'https://pagead2.googlesyndication.com/pagead/show_ads.js'
      const response = await fetch(testUrl, { 
        method: 'HEAD',
        mode: 'no-cors'
      })
      console.log('✅ AdSense domain is accessible')
      alert('✅ AdSense domain is accessible. If ads still don\'t show, check your account status.')
    } catch (error) {
      console.error('❌ AdSense domain test failed:', error)
      alert('❌ Cannot reach AdSense servers. This could be due to:\n• Ad blocker\n• Network restrictions\n• Firewall blocking\n• DNS issues')
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
        
        <h1 className="text-3xl font-bold mb-8">AdSense Debug Dashboard</h1>
        
        {/* Real-time Status */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className={`p-6 rounded-lg shadow border ${debugInfo.scriptLoaded ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <h3 className="font-bold mb-2">Script Status</h3>
            <p className={`text-lg ${debugInfo.scriptLoaded ? 'text-green-700' : 'text-red-700'}`}>
              {debugInfo.scriptLoaded ? '✅ Loaded' : '❌ Not Loaded'}
            </p>
            {debugInfo.scriptElement && (
              <p className="text-xs text-gray-600 mt-2">
                Found at: {debugInfo.scriptElement.src}
              </p>
            )}
          </div>

          <div className={`p-6 rounded-lg shadow border ${debugInfo.adsbygoogleExists ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <h3 className="font-bold mb-2">AdsByGoogle Array</h3>
            <p className={`text-lg ${debugInfo.adsbygoogleExists ? 'text-green-700' : 'text-red-700'}`}>
              {debugInfo.adsbygoogleExists ? '✅ Available' : '❌ Not Available'}
            </p>
            {debugInfo.adsbygoogleExists && (
              <p className="text-xs text-gray-600 mt-2">
                Length: {typeof window !== 'undefined' ? ((window as any).adsbygoogle?.length || 0) : 0}
              </p>
            )}
          </div>

          <div className="p-6 rounded-lg shadow border border-blue-200 bg-blue-50">
            <h3 className="font-bold mb-2">Publisher ID</h3>
            <p className="text-sm text-blue-700 font-mono">
              ca-pub-6867328086411956
            </p>
            <p className="text-xs text-gray-600 mt-2">
              Verify this matches your AdSense account
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <button
            onClick={manuallyLoadScript}
            className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            🔄 Load Script Manually
          </button>
          <button
            onClick={testAdSenseAccount}
            className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            🧪 Test AdSense Domain
          </button>
          <button
            onClick={forceReload}
            className="bg-orange-600 text-white px-4 py-3 rounded-lg hover:bg-orange-700 transition-colors text-sm"
          >
            🔄 Force Reload Page
          </button>
          <a
            href="https://www.google.com/adsense/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors text-center text-sm"
          >
            📊 AdSense Dashboard
          </a>
        </div>

        {/* Test Ad */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow">
          <h3 className="font-bold text-gray-900 mb-4">Test Ad Display</h3>
          <div className="border-2 border-dashed border-gray-300 p-4 rounded">
            <WorkingAdSenseAd
              width={728}
              height={90}
              format="auto"
              responsive={true}
              className="mx-auto"
            />
          </div>
        </div>

        {/* Errors */}
        {debugInfo.errors.length > 0 && (
          <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="font-bold text-red-800 mb-4">Errors Detected</h3>
            <div className="space-y-2">
              {debugInfo.errors.map((error, index) => (
                <div key={index} className="text-red-700 text-sm font-mono bg-red-100 p-2 rounded">
                  {error}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Troubleshooting Guide */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-bold text-gray-900 mb-4">Troubleshooting Steps</h3>
          <div className="space-y-4 text-sm">
            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400">
              <h4 className="font-bold text-yellow-800">If Script Won&apos;t Load:</h4>
              <ul className="text-yellow-700 mt-2 space-y-1 list-disc ml-6">
                <li>Disable ad blockers (uBlock Origin, AdBlock Plus, etc.)</li>
                <li>Check browser console for network errors</li>
                <li>Try incognito/private browsing mode</li>
                <li>Check if your firewall/network blocks Google ads</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-50 border-l-4 border-blue-400">
              <h4 className="font-bold text-blue-800">If Script Loads but No Ads:</h4>
              <ul className="text-blue-700 mt-2 space-y-1 list-disc ml-6">
                <li>Your AdSense account may still be under review</li>
                <li>You need to add your website to your AdSense account</li>
                <li>Create ad units in your AdSense dashboard</li>
                <li>Wait 24-48 hours for new accounts to start serving ads</li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 border-l-4 border-green-400">
              <h4 className="font-bold text-green-800">AdSense Account Requirements:</h4>
              <ul className="text-green-700 mt-2 space-y-1 list-disc ml-6">
                <li>Website must have original, high-quality content</li>
                <li>Site must be fully functional and navigable</li>
                <li>Must comply with AdSense content policies</li>
                <li>Some regions require minimum traffic levels</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Browser Info */}
        <div className="mt-8 bg-gray-100 p-6 rounded-lg">
          <h3 className="font-bold text-gray-900 mb-4">Browser Information</h3>
          <div className="text-sm text-gray-700 space-y-1">
            <p><strong>User Agent:</strong> {typeof window !== 'undefined' ? navigator.userAgent : 'N/A'}</p>
            <p><strong>Current URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'N/A'}</p>
            <p><strong>Referrer:</strong> {typeof window !== 'undefined' ? (document.referrer || 'None') : 'N/A'}</p>
            <p><strong>Cookies Enabled:</strong> {typeof window !== 'undefined' ? (navigator.cookieEnabled ? 'Yes' : 'No') : 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function AdSenseDebug() {
  const [debugInfo, setDebugInfo] = useState<any>({
    scriptLoaded: false,
    adsbygoogleExists: false,
    errors: [],
    networkRequests: []
  })

  useEffect(() => {
    const info: any = {
      scriptLoaded: false,
      adsbygoogleExists: false,
      errors: [],
      networkRequests: []
    }

    // Check if AdSense script is loaded
    const adsenseScript = document.querySelector('script[src*="adsbygoogle.js"]')
    info.scriptLoaded = !!adsenseScript

    // Check if adsbygoogle array exists
    info.adsbygoogleExists = !!(window as any).adsbygoogle

    // Listen for console errors
    const originalError = console.error
    console.error = (...args) => {
      if (args.some(arg => String(arg).includes('ads') || String(arg).includes('adsbygoogle'))) {
        info.errors.push(args.join(' '))
        setDebugInfo({...info})
      }
      originalError.apply(console, args)
    }

    // Monitor network requests
    const originalFetch = window.fetch
    window.fetch = async (...args) => {
      const url = String(args[0])
      if (url.includes('googlesyndication') || url.includes('adsystem')) {
        info.networkRequests.push({
          url,
          timestamp: new Date().toISOString()
        })
        setDebugInfo({...info})
      }
      return originalFetch.apply(window, args)
    }

    setDebugInfo(info)

    return () => {
      console.error = originalError
      window.fetch = originalFetch
    }
  }, [])

  const testAdSenseAccount = async () => {
    try {
      const response = await fetch(`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6867328086411956`)
      console.log('AdSense account test response:', response.status)
      
      if (response.status === 200) {
        alert('✅ AdSense account is valid and accessible')
      } else if (response.status === 400) {
        alert('❌ AdSense account error (400) - Account may not be approved or ad slots not created')
      } else {
        alert(`⚠️ Unexpected response: ${response.status}`)
      }
    } catch (error) {
      alert(`❌ Network error: ${error}`)
    }
  }

  const checkAdsenseStatus = () => {
    // Open AdSense dashboard
    window.open('https://www.google.com/adsense/', '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Home
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold mb-8">AdSense Debug Information</h1>
        
        {/* Status Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className={`p-6 rounded-lg shadow ${debugInfo.scriptLoaded ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border`}>
            <h3 className="font-bold mb-2">AdSense Script Status</h3>
            <p className={debugInfo.scriptLoaded ? 'text-green-700' : 'text-red-700'}>
              {debugInfo.scriptLoaded ? '✅ Loaded' : '❌ Not Loaded'}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Script URL: https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6867328086411956
            </p>
          </div>

          <div className={`p-6 rounded-lg shadow ${debugInfo.adsbygoogleExists ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border`}>
            <h3 className="font-bold mb-2">AdsByGoogle Array</h3>
            <p className={debugInfo.adsbygoogleExists ? 'text-green-700' : 'text-red-700'}>
              {debugInfo.adsbygoogleExists ? '✅ Available' : '❌ Not Available'}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Array length: {debugInfo.adsbygoogleExists ? (window as any).adsbygoogle?.length || 0 : 'N/A'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <button
            onClick={testAdSenseAccount}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Test AdSense Account Status
          </button>
          <button
            onClick={checkAdsenseStatus}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Check AdSense Dashboard
          </button>
        </div>

        {/* Errors Section */}
        {debugInfo.errors.length > 0 && (
          <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="font-bold text-red-800 mb-4">JavaScript Errors</h3>
            <ul className="space-y-2">
              {debugInfo.errors.map((error: string, index: number) => (
                <li key={index} className="text-red-700 text-sm font-mono bg-red-100 p-2 rounded">
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Network Requests */}
        {debugInfo.networkRequests.length > 0 && (
          <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-bold text-blue-800 mb-4">AdSense Network Requests</h3>
            <ul className="space-y-2">
              {debugInfo.networkRequests.map((request: any, index: number) => (
                <li key={index} className="text-blue-700 text-sm">
                  <span className="font-mono bg-blue-100 p-1 rounded">{request.timestamp}</span>
                  <br />
                  <span className="text-xs">{request.url}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Manual Troubleshooting */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="font-bold text-gray-900 mb-4">Manual Troubleshooting Steps</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded font-bold">1</span>
              <div>
                <h4 className="font-medium">Check AdSense Account Status</h4>
                <p className="text-sm text-gray-600">
                  Go to your <a href="https://www.google.com/adsense/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">AdSense Dashboard</a> and verify:
                </p>
                <ul className="text-sm text-gray-600 ml-4 mt-1 list-disc">
                  <li>Your site is approved</li>
                  <li>Your account is not under review</li>
                  <li>No policy violations</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded font-bold">2</span>
              <div>
                <h4 className="font-medium">Create Ad Units</h4>
                <p className="text-sm text-gray-600">
                  In AdSense dashboard, go to &quot;Ads&quot; → &quot;By ad unit&quot; and create:
                </p>
                <ul className="text-sm text-gray-600 ml-4 mt-1 list-disc">
                  <li>Display ads (various sizes)</li>
                  <li>Auto ads (recommended for new sites)</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded font-bold">3</span>
              <div>
                <h4 className="font-medium">Verify ads.txt</h4>
                <p className="text-sm text-gray-600">
                  Check that your ads.txt file is accessible: 
                  <a href="/ads.txt" target="_blank" className="text-blue-600 hover:underline ml-1">yourdomain.com/ads.txt</a>
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded font-bold">4</span>
              <div>
                <h4 className="font-medium">Wait for Approval</h4>
                <p className="text-sm text-gray-600">
                  New AdSense accounts can take 24-48 hours (sometimes longer) for:
                </p>
                <ul className="text-sm text-gray-600 ml-4 mt-1 list-disc">
                  <li>Site approval</li>
                  <li>Ads to start showing</li>
                  <li>Policy review completion</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Common Error Solutions */}
        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
          <h3 className="font-bold text-yellow-800 mb-4">Common 400 Error Solutions</h3>
          <div className="space-y-3 text-sm text-yellow-700">
            <div>
              <strong>Account Not Approved:</strong> Your AdSense account may still be under review. Check your email and AdSense dashboard for approval status.
            </div>
            <div>
              <strong>No Ad Units Created:</strong> You need to create ad units in your AdSense dashboard before ads will show.
            </div>
            <div>
              <strong>Invalid Publisher ID:</strong> Verify your publisher ID (ca-pub-6867328086411956) is correct in your AdSense dashboard.
            </div>
            <div>
              <strong>Site Not Added:</strong> Make sure you&apos;ve added your website domain to your AdSense account under &quot;Sites&quot;.
            </div>
            <div>
              <strong>Policy Violations:</strong> Check for any policy violations that might prevent ads from showing.
            </div>
            <div>
              <strong>Geographic Restrictions:</strong> Some regions have different requirements for AdSense approval.
            </div>
          </div>
        </div>

        {/* Browser Console Instructions */}
        <div className="mt-8 bg-gray-100 p-6 rounded-lg">
          <h3 className="font-bold text-gray-900 mb-4">Browser Console Debug</h3>
          <p className="text-sm text-gray-700 mb-3">
            Open your browser&apos;s developer console (F12) and look for:
          </p>
          <ul className="text-sm text-gray-600 space-y-1 list-disc ml-6">
            <li>Any red error messages related to &quot;ads&quot; or &quot;adsbygoogle&quot;</li>
            <li>Network tab: Failed requests to googlesyndication.com</li>
            <li>Console warnings about ad blocking or policy violations</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
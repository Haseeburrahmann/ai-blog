/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function SimpleAdTest() {
  const [status, setStatus] = useState('Loading...')

  useEffect(() => {
    // Wait for the page to fully load
    const timer = setTimeout(() => {
      if (document.querySelector('script[src*="adsbygoogle.js"]')) {
        setStatus('✅ Script element found in DOM')
        
        if ((window as any).adsbygoogle) {
          setStatus('✅ Script loaded and adsbygoogle array available')
          
          // Try to initialize an ad
          setTimeout(() => {
            try {
              const adElement = document.querySelector('.adsbygoogle')
              if (adElement && !(window as any).adsbygoogle.loaded) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ;(window as any).adsbygoogle.push({})
                setStatus('✅ Ad initialization attempted')
              }
            } catch (error) {
              setStatus(`❌ Ad initialization failed: ${error}`)
            }
          }, 1000)
        } else {
          setStatus('⚠️ Script element found but adsbygoogle not available')
        }
      } else {
        setStatus('❌ No AdSense script found')
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Home
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold mb-8">Simple AdSense Test</h1>
        
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold mb-4">Status Check</h2>
          <p className="text-lg mb-4">{status}</p>
          
          <div className="text-sm text-gray-600 space-y-2">
            <p><strong>Expected Script URL:</strong></p>
            <p className="font-mono text-xs bg-gray-100 p-2 rounded break-all">
              https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6867328086411956
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold mb-4">Test Ad Space</h2>
          <div className="border-2 border-dashed border-gray-300 p-4 rounded">
            <ins 
              className="adsbygoogle"
              style={{ display: 'block', width: '100%', height: '280px' }}
              data-ad-client="ca-pub-6867328086411956"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Ad should appear above if everything is working correctly
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
          <h3 className="font-bold text-yellow-800 mb-2">Important Notes:</h3>
          <ul className="text-yellow-700 text-sm space-y-1 list-disc ml-6">
            <li>Disable all ad blockers while testing</li>
            <li>New AdSense accounts can take 24-48 hours to serve ads</li>
            <li>Make sure your site is added to your AdSense account</li>
            <li>Check your AdSense dashboard for approval status</li>
            <li>Open browser console (F12) to see any error messages</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
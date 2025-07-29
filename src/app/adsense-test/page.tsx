'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function AdSenseTest() {
  useEffect(() => {
    // Load AdSense script
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6867328086411956'
    script.crossOrigin = 'anonymous'
    document.head.appendChild(script)

    // Initialize ads after script loads
    script.onload = () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const adsbygoogle = (window as any).adsbygoogle || []
        adsbygoogle.push({})
      } catch (e) {
        console.error('AdSense initialization error:', e)
      }
    }

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Home
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold mb-8">AdSense Test Page</h1>
        
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Test Ad Unit 1 - Auto Size</h2>
            <ins 
              className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client="ca-pub-6867328086411956"
              data-ad-slot="6551556707"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Test Ad Unit 2 - Rectangle</h2>
            <ins 
              className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client="ca-pub-6867328086411956"
              data-ad-slot="1885886529"
              data-ad-format="rectangle"
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Test Ad Unit 3 - Large Rectangle</h2>
            <ins 
              className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client="ca-pub-6867328086411956"
              data-ad-slot="9756304549"
              data-ad-format="rectangle"
            />
          </div>
        </div>

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <h3 className="font-bold text-yellow-800 mb-2">Debugging Information:</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Check browser console for AdSense errors</li>
            <li>• Ads may take 10-30 seconds to load</li>
            <li>• New sites may take 24-48 hours for ads to appear</li>
            <li>• Make sure your site is live and accessible</li>
            <li>• Ensure ads.txt file is accessible at /ads.txt</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
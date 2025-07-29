'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function AdSenseStatus() {
  const [mounted, setMounted] = useState(false)
  const [status, setStatus] = useState({
    scriptLoaded: false,
    arrayExists: false,
    errors: [] as string[]
  })

  useEffect(() => {
    setMounted(true)
    
    const checkStatus = () => {
      const script = document.querySelector('script[src*="adsbygoogle.js"]')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const arrayExists = !!(window as any).adsbygoogle
      
      setStatus({
        scriptLoaded: !!script,
        arrayExists,
        errors: []
      })
    }

    // Check every 2 seconds
    checkStatus()
    const interval = setInterval(checkStatus, 2000)
    
    return () => clearInterval(interval)
  }, [])

  const loadScriptManually = () => {
    const script = document.createElement('script')
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6867328086411956'
    script.async = true
    script.crossOrigin = 'anonymous'
    
    script.onload = () => {
      console.log('Script loaded manually')
      setStatus(prev => ({ ...prev, scriptLoaded: true }))
    }
    
    script.onerror = () => {
      console.error('Manual script load failed')
      setStatus(prev => ({ 
        ...prev, 
        errors: [...prev.errors, 'Manual script load failed'] 
      }))
    }
    
    document.head.appendChild(script)
  }

  if (!mounted) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p>Loading...</p>
    </div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Home
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold mb-8">AdSense Status Check</h1>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className={`p-6 rounded-lg shadow border ${
            status.scriptLoaded ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
          }`}>
            <h3 className="font-bold mb-2">Script Status</h3>
            <p className={`text-lg ${status.scriptLoaded ? 'text-green-700' : 'text-red-700'}`}>
              {status.scriptLoaded ? '✅ Loaded' : '❌ Not Loaded'}
            </p>
          </div>

          <div className={`p-6 rounded-lg shadow border ${
            status.arrayExists ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
          }`}>
            <h3 className="font-bold mb-2">AdsByGoogle Array</h3>
            <p className={`text-lg ${status.arrayExists ? 'text-green-700' : 'text-red-700'}`}>
              {status.arrayExists ? '✅ Available' : '❌ Not Available'}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <button
            onClick={loadScriptManually}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mr-4"
          >
            Load Script Manually
          </button>
          
          <a
            href="https://www.google.com/adsense/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors inline-block"
          >
            Open AdSense Dashboard
          </a>
        </div>

        {status.errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-red-800 mb-4">Errors:</h3>
            <ul className="text-red-700">
              {status.errors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-bold mb-4">Test Ad Space</h3>
          <div className="border-2 border-dashed border-gray-300 p-8 text-center">
            <ins 
              className="adsbygoogle"
              style={{ display: 'block', width: '100%', height: '250px' }}
              data-ad-client="ca-pub-6867328086411956"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
            <p className="text-gray-500 mt-4">Ad should appear above if working</p>
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
          <h3 className="font-bold text-yellow-800 mb-2">Troubleshooting:</h3>
          <ul className="text-yellow-700 text-sm space-y-1 list-disc ml-6">
            <li>Disable ad blockers</li>
            <li>Check AdSense account approval status</li>
            <li>Ensure your site is added to AdSense</li>
            <li>Wait 24-48 hours for new accounts</li>
            <li>Open browser console (F12) for errors</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
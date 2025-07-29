// AdSense Error Handler Utility
export interface AdSenseError {
    type: 'network' | 'config' | 'policy' | 'account'
    message: string
    solution: string
  }
  
  export class AdSenseErrorHandler {
    private static errors: AdSenseError[] = []
  
    static logError(error: unknown): void {
      const errorString = String(error)
      
      if (errorString.includes('400')) {
        this.errors.push({
          type: 'account',
          message: 'HTTP 400 Error - Bad Request',
          solution: 'Your AdSense account may not be approved yet, or ad units haven\'t been created. Check your AdSense dashboard.'
        })
      } else if (errorString.includes('403')) {
        this.errors.push({
          type: 'policy',
          message: 'HTTP 403 Error - Forbidden',
          solution: 'Your site may have policy violations. Review AdSense policies and check for any violations in your dashboard.'
        })
      } else if (errorString.includes('network')) {
        this.errors.push({
          type: 'network',
          message: 'Network Error',
          solution: 'Check your internet connection and ensure ad blockers are disabled for testing.'
        })
      } else if (errorString.includes('adsbygoogle')) {
        this.errors.push({
          type: 'config',
          message: 'AdSense Configuration Error',
          solution: 'Verify your publisher ID and ad slot configuration.'
        })
      }
    }
  
    static getErrors(): AdSenseError[] {
      return this.errors
    }
  
    static clearErrors(): void {
      this.errors = []
    }
  
    static async testAdSenseConnection(publisherId: string): Promise<boolean> {
      try {
        await fetch(`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`, {
          method: 'HEAD',
          mode: 'no-cors'
        })
        return true
      } catch (error) {
        this.logError(error)
        return false
      }
    }
  
    static diagnoseAdSenseIssues(): string[] {
      const issues: string[] = []
      
      // Check if script is loaded
      const scriptLoaded = document.querySelector('script[src*="adsbygoogle.js"]')
      if (!scriptLoaded) {
        issues.push('AdSense script not loaded')
      }
  
      // Check if adsbygoogle array exists
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!(window as any).adsbygoogle) {
        issues.push('AdsByGoogle array not initialized')
      }
  
      // Check for ad elements
      const adElements = document.querySelectorAll('.adsbygoogle')
      if (adElements.length === 0) {
        issues.push('No ad elements found on page')
      }
  
      // Check for ad blocker
      const testDiv = document.createElement('div')
      testDiv.innerHTML = '&nbsp;'
      testDiv.className = 'adsbox'
      document.body.appendChild(testDiv)
      
      setTimeout(() => {
        if (testDiv.offsetHeight === 0) {
          issues.push('Ad blocker detected')
        }
        document.body.removeChild(testDiv)
      }, 100)
  
      return issues
    }
  }
  
  // Global error listener for AdSense
  if (typeof window !== 'undefined') {
    window.addEventListener('error', (event) => {
      if (event.message.includes('ads') || event.message.includes('adsbygoogle')) {
        AdSenseErrorHandler.logError(event.message)
      }
    })
  
    // Monitor network requests for AdSense
    const originalFetch = window.fetch
    window.fetch = async (...args) => {
      const url = String(args[0])
      if (url.includes('googlesyndication')) {
        try {
          const response = await originalFetch.apply(window, args)
          if (!response.ok) {
            AdSenseErrorHandler.logError(`Network error: ${response.status} - ${url}`)
          }
          return response
        } catch (error) {
          AdSenseErrorHandler.logError(`Fetch error: ${error} - ${url}`)
          throw error
        }
      }
      return originalFetch.apply(window, args)
    }
  }
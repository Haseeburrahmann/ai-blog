import Script from 'next/script'

interface AdSenseHeadProps {
  clientId: string
}

export default function AdSenseHead({ clientId }: AdSenseHeadProps) {
  if (!clientId) return null

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  )
}
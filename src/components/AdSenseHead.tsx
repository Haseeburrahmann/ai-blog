import Script from 'next/script'

interface AdSenseHeadProps {
  clientId: string
}

export default function AdSenseHead({ clientId }: AdSenseHeadProps) {
  if (!clientId) return null

  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <Script
        id="adsense-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (window.adsbygoogle = window.adsbygoogle || []).push({
              google_ad_client: "${clientId}",
              enable_page_level_ads: true
            });
          `
        }}
      />
    </>
  )
}
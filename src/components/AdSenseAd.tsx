'use client';

import { useEffect, useRef, useState } from 'react';

interface AdSenseAdProps {
  adSlot?: string;
  width?: number;
  height?: number;
  className?: string;
  format?: 'auto' | 'rectangle' | 'leaderboard' | 'banner';
  style?: React.CSSProperties;
}

export default function AdSenseAd({
  adSlot,
  width = 728,
  height = 90,
  className = '',
  format = 'auto',
  style = {},
}: AdSenseAdProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [adInitialized, setAdInitialized] = useState(false);
  const publisherId = 'ca-pub-6867328086411956';

  useEffect(() => {
    if (typeof window !== 'undefined' && adRef.current && !adInitialized) {
      try {
        const adsbygoogle = (window as any).adsbygoogle || [];
        const adElement = adRef.current.querySelector('.adsbygoogle');
        if (adElement && !adElement.hasAttribute('data-adsbygoogle-status')) {
          adsbygoogle.push({});
          setAdInitialized(true);
          console.log('✅ Ad initialized');
        }
      } catch (error) {
        console.error('❌ AdSense error:', error);
      }
    }
  }, [adInitialized]);

  const adStyle: React.CSSProperties = {
    display: 'block',
    width: format === 'auto' ? '100%' : width,
    height: format === 'auto' ? 'auto' : height,
    ...style,
  };

  return (
    <div ref={adRef} className={className}>
      <ins
        className="adsbygoogle"
        style={adStyle}
        data-ad-client={publisherId}
        {...(adSlot && { 'data-ad-slot': adSlot })}
        data-ad-format={format}
        data-full-width-responsive={format === 'auto' ? 'true' : 'false'}
        suppressHydrationWarning={true}
      />
    </div>
  );
}

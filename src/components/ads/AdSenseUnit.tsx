'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { ADSENSE_PUB_ID } from '@/lib/constants';

interface AdSenseUnitProps {
  adSlot?: string;
  format?: 'auto' | 'rectangle' | 'leaderboard' | 'fluid';
  className?: string;
  style?: React.CSSProperties;
}

export default function AdSenseUnit({
  adSlot,
  format = 'auto',
  className = '',
  style = {},
}: AdSenseUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pathname = usePathname();
  const initialized = useRef(false);

  useEffect(() => {
    initialized.current = false;
  }, [pathname]);

  useEffect(() => {
    if (initialized.current) return;
    if (!adRef.current) return;

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const win = window as any;
      const adsbygoogle = win.adsbygoogle || [];
      win.adsbygoogle = adsbygoogle;

      if (!adRef.current.hasAttribute('data-adsbygoogle-status')) {
        adsbygoogle.push({});
        initialized.current = true;
      }
    } catch {
      // AdSense not loaded
    }
  }, [pathname]);

  const adStyle: React.CSSProperties = {
    display: 'block',
    ...(format === 'auto' && { width: '100%', height: 'auto' }),
    ...(format === 'rectangle' && { width: '336px', height: '280px' }),
    ...(format === 'leaderboard' && { width: '728px', height: '90px', maxWidth: '100%' }),
    ...style,
  };

  return (
    <div className={className}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={adStyle}
        data-ad-client={ADSENSE_PUB_ID}
        {...(adSlot && { 'data-ad-slot': adSlot })}
        data-ad-format={format === 'fluid' ? 'fluid' : format === 'auto' ? 'auto' : undefined}
        data-full-width-responsive={format === 'auto' ? 'true' : 'false'}
        {...(format === 'fluid' && { 'data-ad-layout': 'in-article', 'data-ad-layout-key': '-6t+ed+2i-1n-4w' })}
        suppressHydrationWarning
      />
    </div>
  );
}

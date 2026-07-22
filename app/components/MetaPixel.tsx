'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

// Soul Sighted Meta Pixel
const PIXEL_ID = '1771804873792757';

export default function MetaPixel() {
  const pathname = usePathname();
  // The init script below fires the very first PageView on hard load. Skip the
  // effect's first run so we don't send a duplicate PageView for the landing
  // page; from then on the effect fires exactly one PageView per client-side
  // (SPA) route change.
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    if (window.fbq) {
      window.fbq('track', 'PageView');
      console.log('Meta Pixel PageView tracked for:', pathname);
    }
  }, [pathname]);

  return (
    <>
      {/* Meta Pixel Library */}
      <Script
        id="fb-pixel-lib"
        src="https://connect.facebook.net/en_US/fbevents.js"
        strategy="afterInteractive"
        onLoad={() => console.log('Meta Pixel Library (fbevents.js) successfully loaded')}
        onError={() => console.error('Meta Pixel Library (fbevents.js) failed to load')}
      />
      {/* Meta Pixel Initialization */}
      <Script
        id="fb-pixel-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${PIXEL_ID}');
            fbq('track', 'PageView');
            console.log('Meta Pixel Initialized (Soul Sighted ${PIXEL_ID})');
          `,
        }}
      />
    </>
  );
}

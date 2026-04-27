'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function MetaPixel() {
  const pathname = usePathname();

  useEffect(() => {
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
            fbq('init', '1879374959400355');
            fbq('track', 'PageView');
            console.log('Meta Pixel Initialized');
          `,
        }}
      />
    </>
  );
}

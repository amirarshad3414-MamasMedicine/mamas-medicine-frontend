import './globals.css';
import "../devlink/global.css";
import { DevLinkProvider } from '../devlink/DevLinkProvider';
import Script from 'next/script';
import { Providers } from './providers';
import MetaPixel from './components/MetaPixel';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <MetaPixel />
      </head>
      <body>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1771804873792757&ev=PageView&noscript=1"
          />
        </noscript>
        <Providers>
          <DevLinkProvider>{children}</DevLinkProvider>
        </Providers>
      </body>
    </html>
  );
}

'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { resetPixelEvents } from '@/lib/metaPixel';

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Reset tracked events on route change to allow re-firing if user returns
    resetPixelEvents();
  }, [pathname]);

  return <>{children}</>;
}

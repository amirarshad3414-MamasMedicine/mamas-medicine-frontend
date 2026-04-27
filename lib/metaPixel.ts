// Use sessionStorage to track fired events across page reloads in the same session
const getFiredEvents = (): Set<string> => {
  if (typeof window === 'undefined') return new Set();
  const stored = sessionStorage.getItem('pixel_fired_events');
  return stored ? new Set(JSON.parse(stored)) : new Set();
};

const saveFiredEvents = (events: Set<string>) => {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem('pixel_fired_events', JSON.stringify(Array.from(events)));
};

declare global {
  interface Window {
    fbq: any;
  }
}

export const trackPixelEvent = (eventName: string, eventData?: Record<string, any>) => {
  if (typeof window === 'undefined') return;
  
  const firedEvents = getFiredEvents();
  
  // Use unique key to prevent duplicate firing
  const eventKey = `${eventName}-${JSON.stringify(eventData || {})}`;
  
  if (firedEvents.has(eventKey)) {
    console.warn(`Event ${eventName} already fired, skipping duplicate`);
    return;
  }

  if (window.fbq) {
    window.fbq('track', eventName, eventData);
    firedEvents.add(eventKey);
    saveFiredEvents(firedEvents);
  }
};

// Reset events on route change if needed (optional, depends on tracking strategy)
export const resetPixelEvents = () => {
  // If we want to allow re-firing on different pages, we'd clear here.
  // But for things like 'Purchase' or 'CompleteRegistration', usually once per session is safer.
  // However, PageView should always fire. (PageView is handled directly in Providers)
};

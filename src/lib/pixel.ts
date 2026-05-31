// Meta Pixel Event Helper
declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}

export const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    if (params) {
      window.fbq('track', eventName, params);
    } else {
      window.fbq('track', eventName);
    }
  }
};

// Standard Meta Pixel Events
export const pixelEvents = {
  // Quote form interactions
  initiateQuote: () => trackEvent('InitiateCheckout'),
  submitLead: (data?: { full_name?: string; phone?: string; email?: string }) =>
    trackEvent('Lead', data),
  completeRegistration: () => trackEvent('CompleteRegistration'),

  // Homepage interactions
  clickGetQuote: () => trackEvent('InitiateCheckout'),
  clickLearnMore: () => trackEvent('ViewContent', { content_name: 'Features' }),
  viewFeatures: () => trackEvent('ViewContent', { content_name: 'Features Section' }),

  // WhatsApp
  clickWhatsApp: () => trackEvent('Contact'),

  // General
  viewContent: (name: string) => trackEvent('ViewContent', { content_name: name }),
};

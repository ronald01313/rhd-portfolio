// Google Analytics Measurement ID (replace with yours)
export const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";

/**
 * Tracks a page view in Google Analytics.
 * @param url The URL of the page being viewed.
 */
export const trackPageView = (url: string) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

/**
 * Tracks a custom event in Google Analytics.
 * @param action The event action (e.g., 'click').
 * @param category The event category (e.g., 'Contact', 'Portfolio').
 * @param label The event label (e.g., 'GitHub Link Clicked').
 * @param value An optional numerical value.
 */
export const trackEvent = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

/**
 * Specific tracker for external link clicks.
 * @param linkName Name of the link clicked (e.g., 'GitHub').
 * @param url Destination URL.
 */
export const trackExternalLinkClick = (linkName: string, url: string) => {
  trackEvent({
    action: "click_external_link",
    category: "External Link",
    label: linkName,
    value: 1,
  });
};

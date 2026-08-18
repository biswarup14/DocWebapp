import ReactGA from 'react-ga4';

const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID || 'G-XXXXXXXXXX';

export const initAnalytics = () => {
  if (GA_TRACKING_ID && GA_TRACKING_ID !== 'G-XXXXXXXXXX') {
    ReactGA.initialize(GA_TRACKING_ID);
  }
};

export const trackPageView = (path) => {
  ReactGA.send({ hitType: 'pageview', page: path });
};

export const trackEvent = (category, action, label) => {
  ReactGA.event({ category, action, label });
};

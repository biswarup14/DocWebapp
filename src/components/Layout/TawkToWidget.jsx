import { useEffect } from 'react';

const TAWK_TO_ID = import.meta.env.VITE_TAWK_TO_ID || '';

export default function TawkToWidget() {
  useEffect(() => {
    if (!TAWK_TO_ID) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://embed.tawk.to/${TAWK_TO_ID}`;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}

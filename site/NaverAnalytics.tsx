import Script from 'next/script';

const NAVER_WA_ID = '25ee1fea47d82c0';

declare global {
  interface Window {
    wcs?: unknown;
    wcs_add?: { wa?: string };
    wcs_do?: () => void;
  }
}

function initNaverAnalytics() {
  window.wcs_add = window.wcs_add || {};
  window.wcs_add.wa = NAVER_WA_ID;
  window.wcs_do?.();
}

export function NaverAnalytics() {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <Script
      src="https://wcs.pstatic.net/wcslog.js"
      strategy="afterInteractive"
      onLoad={initNaverAnalytics}
    />
  );
}

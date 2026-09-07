import '../site/styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { AppProps } from 'next/app';
import { GoogleAnalytics } from '../site/GoogleAnalytics';

config.autoAddCss = false;

export default function YosumeApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <GoogleAnalytics />
    </>
  );
}

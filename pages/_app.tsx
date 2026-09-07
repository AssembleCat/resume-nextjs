import '../site/styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { AppProps } from 'next/app';
import { NaverAnalytics } from '../site/NaverAnalytics';

config.autoAddCss = false;

export default function YosumeApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <NaverAnalytics />
    </>
  );
}

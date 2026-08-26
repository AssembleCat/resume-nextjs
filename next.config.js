/* eslint-disable no-console */
const { homepage } = require('./package.json');

const { NODE_ENV } = process.env;

function getBasePath() {
  if (NODE_ENV === 'production' && homepage) {
    try {
      console.log('> Detected homepage url in package.json');
      const { pathname } = new URL(homepage);
      if (pathname && pathname !== '/') {
        const normalized = pathname.replace(/\/$/, '');
        console.log(`> Apply '${normalized}' to basePath/assetPrefix`);
        return normalized;
      }
      return '';
    } catch (error) {
      console.log('> Can not parse homepage URL, skip basePath');
      return '';
    }
  }
  return '';
}

const basePath = getBasePath();

/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath || undefined,
  reactStrictMode: true,
};

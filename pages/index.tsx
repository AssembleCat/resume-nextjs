import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import Payload from '../payload';
import { applyResumeView, parseResumeViewQuery } from '../payload/views';
import { isBlindQuery, assetSrc } from '../site/lib/format';
import { PortfolioPage } from '../site/PortfolioPage';

function Yosume() {
  const router = useRouter();
  const resume = applyResumeView(Payload, parseResumeViewQuery(router.query));
  const isBlind = isBlindQuery(router.query.blind);

  return (
    <>
      <NextSeo {...resume._global.seo} />
      <Head>
        <title>{resume._global.headTitle}</title>
        <link rel="shortcut icon" href={assetSrc(resume._global.favicon)} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <PortfolioPage resume={resume} isBlind={isBlind} />
    </>
  );
}

export default Yosume;

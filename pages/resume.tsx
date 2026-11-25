import Head from 'next/head';
import { useRouter } from 'next/router';
import Payload from '../payload';
import { applyResumeView, parseResumeViewQuery } from '../payload/views';
import { isBlindQuery } from '../site/lib/format';
import { ResumeDocument } from '../site/resume/ResumeDocument';

export default function ResumePage() {
  const router = useRouter();
  const resume = applyResumeView(Payload, parseResumeViewQuery(router.query));
  const isBlind = isBlindQuery(router.query.blind);
  return (
    <div className="resume-shell">
      <Head>
        <title>{`${resume.profile.name.title}_이력서${isBlind ? '_학교명비공개' : ''}`}</title>
        <meta name="robots" content="noindex,follow" />
      </Head>
      <ResumeDocument resume={resume} isBlind={isBlind} detailed={false} />
    </div>
  );
}

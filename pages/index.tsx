/* eslint-disable react/jsx-props-no-spreading */
import { Container } from 'reactstrap';

import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { Education } from '../component/education';
import { Etc } from '../component/etc';
import { Experience } from '../component/experience';
import { Introduce } from '../component/introduce';
import { OpenSource } from '../component/openSource';
import { Presentation } from '../component/presentation';
import { Profile } from '../component/profile';
import { Project } from '../component/project';
import { Skill } from '../component/skill';
import { Style } from '../component/common/Style';
import Payload from '../payload';
import { applyResumeView, parseResumeViewQuery } from '../payload/views';
import { Article } from '../component/article';

function Yosume() {
  const router = useRouter();
  const resume = applyResumeView(Payload, parseResumeViewQuery(router.query));

  return (
    <>
      <NextSeo {...resume._global.seo} />
      <Head>
        <title>{resume._global.headTitle}</title>
        <link rel="shortcut icon" href={resume._global.favicon} />
      </Head>
      <Container style={Style.global}>
        <Profile.Component payload={resume.profile} />
        <Introduce.Component payload={resume.introduce} />
        <Skill.Component payload={resume.skill} />
        <Experience.Component payload={resume.experience} />
        <Project.Component payload={resume.project} />
        <OpenSource.Component payload={resume.openSource} />
        <Presentation.Component payload={resume.presentation} />
        <Article.Component payload={resume.article} />
        <Education.Component payload={resume.education} />
        <Etc.Component payload={resume.etc} />
      </Container>
    </>
  );
}

export default Yosume;

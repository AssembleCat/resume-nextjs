import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faBlogger, faGithub } from '@fortawesome/free-brands-svg-icons';

import { faBell } from '@fortawesome/free-regular-svg-icons';
import { IProfile } from '../component/profile/IProfile';

const profile: IProfile.Payload = {
  disable: false,

  image: 'https://resume.yowu.dev/static/image/profile_2019.png',
  name: {
    title: '천신영',
    small: '(Tibe)',
  },
  contact: [
    {
      title: 'groove.csy.1226@gmail.com',
      link: 'mailto:groove.csy.1226@gmail.com',
      icon: faEnvelope,
    },
    {
      title: 'Please contact me by email',
      icon: faPhone,
      badge: true,
    },
    {
      link: 'https://github.com/AssembleCat',
      icon: faGithub,
    },
    {
      link: 'https://recondite-orange-10c.notion.site/In-My-Brain-6048496dc81b453aa9aeee5ab859802a?pvs=74',
      icon: faBlogger,
    },
  ],
  notice: {
    title:
      "The content below is all fictitious and is just a sample from 'https://github.com/uyu423/resume-nextjs'.",
    icon: faBell,
  },
};

export default profile;

import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faBlogger, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { IProfile } from '../component/profile/IProfile';
import image from '../asset/profile.jpg';

const profile: IProfile.Payload = {
  disable: false,

  image,
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
      title: '010-2623-9283',
      icon: faPhone,
    },
    {
      link: 'https://github.com/AssembleCat',
      icon: faGithub,
    },
    {
      link:
        'https://recondite-orange-10c.notion.site/In-My-Brain-6048496dc81b453aa9aeee5ab859802a?pvs=74',
      icon: faBlogger,
    },
  ],
  notice: {
    title: '웹/앱 기반의 외주 프로젝트도 진행하고 있습니다. 이메일 or 전화번호로 연락바랍니다.',
    icon: faBell,
  },
};

export default profile;

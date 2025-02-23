import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faBlogger, faGithub } from '@fortawesome/free-brands-svg-icons';
import { IProfile } from '../component/profile/IProfile';
import image from '../asset/avatar.jpg';

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
      link: 'https://titibebe.tistory.com/',
      icon: faBlogger,
    },
  ],
};

export default profile;

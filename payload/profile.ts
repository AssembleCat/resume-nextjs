import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
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
      title: '이력서 (PDF) 다운로드',
      link: './천신영_이력서.pdf',
      icon: faFilePdf,
      download: true,
    },
  ],
};

export default profile;

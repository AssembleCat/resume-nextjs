import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { IProfile } from './types';
import image from '../asset/avatar-square.jpg';

const profile: IProfile.Payload = {
  disable: false,
  image,
  role: 'Backend Engineer',
  headline: '서비스의 경계와 실패 복구를 설계하는 백엔드 개발자입니다.',
  summary: '문서 추론·결제·온프레미스 환경에서 설계와 구현, 운영을 이어 왔습니다.',
  name: {
    title: '천신영',
    small: '',
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
  ],
};

export default profile;

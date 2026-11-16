import favicon from '../asset/favicon.ico';
import previewImage from '../asset/preview.jpg';
import { IGlobal } from './types';

const title = '포트폴리오 | 천신영';
const description =
  '백엔드를 중심으로 시스템을 설계하고 운영까지 연결하는 개발자 천신영의 포트폴리오. 문서 추론, 결제, 온프레미스 환경의 설계·구현 경험을 소개합니다.';

export const _global: IGlobal.Payload = {
  favicon,
  headTitle: title,
  seo: {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: previewImage.src,
          width: 800,
          height: 600,
          alt: 'OpenGraph Image Sample.png',
        },
      ],
      type: 'profile',
      profile: {
        firstName: 'shin young',
        lastName: 'cheon',
        username: 'assemblecat',
        gender: 'male',
      },
    },
  },
};

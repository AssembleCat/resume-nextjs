import { IExperience } from '../component/experience/IExperience';

const experience: IExperience.Payload = {
  disable: false,
  disableTotalPeriod: false,
  list: [
    {
      title: '프리페이지',
      positions: [
        {
          title: 'Backend Engineer',
          startedAt: '2024-06',
          endedAt: '2024-07',
          descriptions: [
            '동시접속자 1만명을 수용하는 티켓팅 서비스**(랜딩 페이지, 백오피스, 티켓팅 페이지) 구축',
            'AWS SQS, Lambda를 이용하여 집중된 트래픽을 소화하고, S3에 정적 랜딩 페이지를 제공하여 트래픽을 분산',
            'AWS CloudFront(CDN)으로 북미지역 트래픽에 빠르게 응답하고 서버의 부하를 낮춤',
          ],
          skillKeywords: ['Spring', 'Kotlin', 'Redis', 'MySQL', 'Docker', 'AWS(SQS, CDN, S3, Lambda)'],
        },
      ],
    },
    {
      title: '테너시티즈',
      positions: [
        {
          title: 'Backend Engineer',
          startedAt: '2024-03',
          endedAt: '2024-12',
          descriptions: [
            '첫번째  웹 개발자로 합류하여 테너시티즈에 필요한 IT 서비스(인프라, 웹사이트, 백오피스)를 개발/배포/운영',
            '메타버스와 웹 서비스 공통으로 접근가능하도록 유저정보 통합시스템 구축, 서비스간의 통합된 보안으로 조회, 생성, 수정',
            '채팅기능을 분리하여 API서버를 AutoScaling 가능하도록 개선',
          ],
          skillKeywords: ['Spring', 'Kotlin', 'MySQL', 'Docker', 'AWS'],
        },
      ],
    },
    {
      title: '아이엠티소프트',
      positions: [
        {
          title: 'KIOSK Team Backend Engineer',
          startedAt: '2021-09',
          endedAt: '2023-08',
          descriptions: [
            'ASP, KIOSK 프로그램 개발 및 UI/UX 개선',
            '1개월간 혼자서 AWS, 온프레미스 인프라 모니터링 시스템을 구축하여 ASP서버 다운타임의 원인 발견 및 예방',
            'AWS Lambda, CloudWatch를 이용해 서버장애 및 이벤트 메세지, 이메일 전송 자동화',
            'KIOSK 데이터 문제를 현장에서 파악할 수 있도록 자가진단 프로그램 개발',
            '일관된 신규팀원 채용을 위한 기술면접 문서/자료 작성, 실제 오류상황을 도식하여 면접자에게 제공',
          ],
          skillKeywords: ['Spring', 'Java', 'React', 'JavaScript', 'MySQL', 'Nginx', 'AWS'],
        },
      ],
    },
  ],
};

export default experience;

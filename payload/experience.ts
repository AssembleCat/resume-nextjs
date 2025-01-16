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
            '동시접속자 1만명을 수용하는 티켓팅 서비스(랜딩 페이지, 백오피스, 티켓팅 페이지) 구축',
            'AWS SQS, Lambda를 이용하여 트래픽을 소화, S3에 정적 랜딩 페이지를 제공하여 트래픽을 분산',
            'AWS CloudFront(CDN)로 북미지역 트래픽에 빠르게 응답하고 부하를 낮춤',
            'MySQL / NoSQL 데이터베이스 설계 및 관리',
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
            '첫번째  웹 개발자로 합류하여 IT 서비스(인프라, 웹사이트, 백오피스)를 개발, 배포, 운영',
            '메타버스와 웹 서비스 공통으로 접근가능하도록 유저보안 통합시스템 구축, 서비스간의 통일된 보안으로 조회',
            'AWS 인프라 및 NoSQL 데이터베이스 유지보수 및 관리',
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
            '요식업 운영을 위한 POS/KIOSK 및 매출관리 시스템 제공기업(50명~, 개발팀 20명~)',
            'ASP, KIOSK 프로그램 개발 및 UI개선',
            '레거시 청산 및 기존 비즈니스 로직 유지보수',
            'AWS Lambda, CloudWatch를 이용해 서버장애 및 이벤트 메세지, 이메일 전송 자동화',
            'KIOSK 오류를 현장에서 파악할 수 있도록 자가진단 프로그램 개발',
            '결제데이터 전용서버 개발하여 일관된 데이터 수집',
            '일관된 신규팀원 채용을 위한 기술면접 문서/자료 작성, 실제 오류상황을 도식하여 면접자에게 제공',
          ],
          skillKeywords: ['Spring', 'Java', 'React', 'JavaScript', 'MySQL', 'Nginx', 'AWS'],
        },
      ],
    },
  ],
};

export default experience;

import { IExperience } from '../component/experience/IExperience';

const experience: IExperience.Payload = {
  disable: false,
  disableTotalPeriod: false,
  list: [
    {
      title: '아이엠티소프트',
      positions: [
        {
          title: 'Freelancer Backend Engineer',
          startedAt: '2024-11',
          descriptions: [
            '결제 시스템 통합 모듈 개발: 다양한 VAN사(결제 대행사)와의 연동을 통해 유연한 통합 결제 모듈 설계 및 개발',
            '포인트 적립 및 사용 시스템 개발: POS 및 KIOSK 환경에서 사용 가능한 포인트 시스템 설계 및 구현',
          ],
          skillKeywords: ['Spring', 'Kotlin', 'RDBMS', 'Docker', 'AWS'],
        },
      ],
    },
    {
      title: '테너시티즈',
      positions: [
        {
          title: 'Backend Engineer',
          startedAt: '2023-09',
          endedAt: '2024-11',
          descriptions: [
            '두번째 웹 개발자로 합류하여 IT 서비스(인프라, 웹사이트, 백오피스)를 개발, 배포, 운영',
            '메타버스와 웹 서비스 공통으로 접근가능하도록 유저보안 통합시스템 구축, 서비스간의 통일된 보안으로 조회',
            'AWS 인프라 및 NoSQL 데이터베이스 유지보수 및 관리',
          ],
          skillKeywords: ['Spring', 'Kotlin', 'RDB', 'NoSQL', 'Docker', 'AWS'],
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
            '요식업 운영을 위한 POS/KIOSK 및 매출관리 시스템 제공기업',
            '레거시 청산 및 ASP, KIOSK 유지보수',
            '결제데이터 전용서버 개발하여 일관된 데이터 수집',
            'KIOSK 오류를 현장에서 파악할 수 있도록 자가진단 프로그램 개발',
            'AWS Lambda, CloudWatch를 이용해 서버장애 및 이벤트 메세지, 이메일 전송 자동화',
            '일관된 신규팀원 채용을 위한 기술면접 문서 작성, 실제 오류상황을 도식하여 면접자에게 제공',
          ],
          skillKeywords: ['Spring', 'Java', 'React', 'JavaScript', 'RDB', 'AWS'],
        },
      ],
    },
  ],
};

export default experience;

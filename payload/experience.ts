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
          endedAt: '2025-03',
          descriptions: [
            {
              content:
                '돈이 오가는 시스템을 다루며, 다양한 케이스를 고려하는 태도와 설계 습관을 갖게 되었습니다',
              weight: 'MEDIUM',
            },
            {
              content:
                '결제 시스템 통합 모듈 개발: 다양한 VAN사(결제 대행사)와의 연동을 통해 유연한 통합 결제 모듈 설계 및 개발',
            },
            { content: '포인트 적립 및 사용 시스템 개발' },
          ],
          skillKeywords: ['Spring', 'Kotlin', 'Docker', 'AWS', 'RDB'],
        },
      ],
    },
    {
      title: '테너시티즈(스페이스비앤비)',
      positions: [
        {
          title: 'Backend Engineer',
          startedAt: '2023-09',
          endedAt: '2024-08',
          descriptions: [
            {
              content:
                '작은 팀 특유의 빠른 의사결정 사황에서, 문제보다 해결에 집중하는 태도를 배웠습니다 ',
              weight: 'MEDIUM',
            },
            {
              content:
                '두번째 웹 개발자로 합류하여 IT 서비스(인프라, 웹사이트, 백오피스)를 개발, 배포, 운영',
            },
            {
              content:
                '메타버스와 웹 서비스 공통으로 접근가능하도록 유저보안 통합시스템 구축, 서비스간의 통일된 보안으로 조회',
            },
            { content: 'AWS 인프라 및 NoSQL 데이터베이스 유지보수 및 관리' },
          ],
          skillKeywords: ['Spring', 'Kotlin', 'Docker', 'AWS', 'RDB', 'NoSQL'],
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
            {
              content:
                'Spring, Java 기반의 백엔드 개발에 익숙해지는 한편, 개발자에게 코드 외적 역량 또한 필수적임을 배웠습니다',
              weight: 'MEDIUM',
            },
            { content: '요식업 운영을 위한 POS/KIOSK 및 매출관리 시스템 제공기업' },
            { content: '레거시 청산 및 ASP, KIOSK 유지보수' },
            { content: '결제데이터 전용서버 개발하여 일관된 데이터 수집' },
            { content: 'KIOSK 오류를 현장에서 파악할 수 있도록 자가진단 프로그램 개발' },
            {
              content:
                '일관된 신규팀원 채용을 위한 기술면접 문서 작성, 실제 오류상황을 도식하여 면접자에게 제공',
            },
          ],
          skillKeywords: ['Spring', 'Java', 'React', 'JavaScript', 'AWS', 'RDB'],
        },
      ],
    },
  ],
};

export default experience;

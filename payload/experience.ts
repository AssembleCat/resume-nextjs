import { IExperience } from '../component/experience/IExperience';

const experience: IExperience.Payload = {
  disable: false,
  disableTotalPeriod: false,
  list: [
    {
      title: '로민(Lomin)',
      id: 'lomin',
      href: 'https://www.lomin.ai/',
      positions: [
        {
          title: 'Backend Engineer',
          startedAt: '2025-11',
          descriptions: [
            {
              content:
                '문서 추론 파이프라인과 금융권 온프레미스 연동을 맡았고, 현장의 배치·재처리 요구를 고객사 맞춤이 아닌 솔루션 기능으로 흡수했습니다',
              weight: 'MEDIUM',
            },
            {
              content:
                '요구를 못 맞추면 타임아웃과 제품 신뢰 문제로 이어져, 실패를 서버에서 가드·복구하며 운영했습니다',
            },
          ],
          skillKeywords: [
            'Python',
            'FastAPI',
            'Kotlin',
            'Spring',
            'Docker',
            'RDB',
            'Redis',
            'Celery',
            'MinIO',
          ],
        },
      ],
    },
    {
      title: '아이엠티소프트',
      id: 'imt-freelance',
      href: 'https://www.imtsoft.co.kr/',
      positions: [
        {
          title: 'Freelancer Backend Engineer',
          startedAt: '2024-11',
          endedAt: '2025-03',
          descriptions: [
            {
              content: '기존 KIOSK 팀 요청으로 VAN 확장과 자사 포인트에 합류했습니다',
              weight: 'MEDIUM',
            },
            {
              content:
                '개발 리드 설계 아래 자사 적립·사용 구현 방향을 보태며, 잔액 정합성(트랜잭션·멱등)을 성능보다 우선했습니다',
            },
          ],
          skillKeywords: ['Spring', 'Kotlin', 'Docker', 'AWS', 'RDB'],
        },
      ],
    },
    {
      title: '테너시티즈(스페이스비앤비)',
      id: 'tenacity',
      positions: [
        {
          title: 'Backend Engineer',
          startedAt: '2023-09',
          endedAt: '2024-08',
          descriptions: [
            {
              content:
                '웹·백오피스 백엔드를 맡았습니다. 배포와 AWS 운영을 백엔드와 한 흐름으로 붙여, 작은 팀의 개발·운영 포인트를 줄였습니다',
              weight: 'MEDIUM',
            },
            {
              content:
                '서비스 서버와 NoSQL 저장소를 직접 운영하며 장애와 배포를 백엔드 업무로 처리했습니다',
            },
          ],
          skillKeywords: ['Spring', 'Kotlin', 'Docker', 'AWS', 'RDB', 'NoSQL'],
        },
      ],
    },
    {
      title: '아이엠티소프트',
      id: 'imt-kiosk',
      href: 'https://www.imtsoft.co.kr/',
      positions: [
        {
          title: 'KIOSK Team Web Developer',
          startedAt: '2021-09',
          endedAt: '2023-08',
          descriptions: [
            {
              content:
                '레거시 ASP·KIOSK를 유지보수하며 결제 수집 경로를 전용 서버로 통일했습니다',
              weight: 'MEDIUM',
            },
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

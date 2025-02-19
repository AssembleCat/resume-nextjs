import { IProject } from '../component/project/IProject';

const project: IProject.Payload = {
  disable: false,
  list: [
    {
      title: '대규모 콘서트 티켓팅 시스템 구축',
      startedAt: '2024-07',
      endedAt: '2024-08',
      where: '프리페이지',
      descriptions: [
        {
          content: '아키텍처 다이어그램',
          href: 'https://recondite-orange-10c.notion.site/17f28cd4a9f2809da47ff987155ebf1c?pvs=4',
        },
        {
          weight: 'MEDIUM',
          content:
            '동시접속자 10,000명 이상을 처리할 수 있는 고가용성 티켓팅 시스템을 설계 및 개발했습니다.',
        },
        {
          content:
            '결제 프로세스를 메시지 큐 기반 비동기 처리로 빠르고 안정적인 티켓 구매 경험을 제공했습니다.',
        },
        {
          content:
            'CDN + 로드 밸런서를 적용하여 트래픽 부하를 분산하고, 오토스케일링을 통해 동적 확장성을 확보했습니다.',
        },
        {
          content:
            'Redis 기반의 가상 대기열 시스템을 구축하여 동시 요청 폭주에도 안정적인 티켓팅 프로세스를 보장했습니다.',
        },
        {
          content:
            '데이터베이스 읽기/쓰기 분리 및 캐싱(Redis) 적용으로 성능을 최적화하고, 분산 락을 통해 중복 티켓 구매를 방지했습니다.',
        },
      ],
    },
    {
      title: '통합 인증 및 보안 서비스 구축',
      startedAt: '2024-04',
      endedAt: '2024-06',
      where: '테너시티즈',
      descriptions: [
        {
          content: '아키텍처 다이어그램',
          href: 'https://recondite-orange-10c.notion.site/17f28cd4a9f28027b0a5f069a42c8b88?pvs=4',
        },
        {
          weight: 'MEDIUM',
          content:
            '하나의 계정으로 모든 서비스를 이용할 수 있도록 SSO 기반의 통합 인증 시스템을 설계 및 구현했습니다.',
        },
        {
          content:
            '[중앙인증서버] Google, Kakao, Facebook의 OAuth인증을 대신하는 프록시서버를 구현했습니다.',
        },
        {
          content:
            '[신규서비스 확장] 새로운 서비스는 직접 OAuth 인증서버와 통신하지않고 중앙인증서버를 통해 유연하게 확장할 수 있습니다.',
        },
        {
          content:
            '[토큰 기반 통합 로그인] 통합 로그아웃 및 보안 강화를 통해 편리하면서도 안전한 인증 환경을 제공했습니다',
        },
      ],
    },
    {
      title: '다중 브랜드 대응 KIOSK 시스템 개발',
      startedAt: '2023-04',
      endedAt: '2023-08',
      where: '아이엠티소프트',
      descriptions: [
        {
          weight: 'MEDIUM',
          content:
            '브랜드별로 개별 KIOSK 프로젝트를 개발하여 유지보수 및 확장이 어려운 문제가 있었습니다. 이를 해결하기 위해 여러 브랜드에서 공통으로 사용할 수 있는 통합 KIOSK 시스템을 설계하고 개발했습니다.',
        },
        {
          content:
            '[설정기반] 레거시 KIOSK의 핵심 기능 및 자주 사용하는 기능을 선별하여 재설계하고, 브랜드별 커스터마이징이 가능하도록 설정 기반의 유연한 구조를 도입했습니다.',
        },
        {
          content:
            '[공통기능 모듈화] 브랜드마다 요구사항이 다르므로, 공통 모듈을 유지하면서도 브랜드별로 환경설정으로 확장이 가능한 구조로 개발했습니다.',
        },
        {
          content:
            '[유지보수 효율 증가] 단일 코드베이스로 수십개의 브랜드에 적용할 수 있도록 하여 개발/배포 효율성을 향상시켰고, 신규 브랜드의 도입 속도를 단축할 수 있었습니다.',
        },
      ],
    },
    {
      title: '결제데이터 저장 시스템 개발',
      startedAt: '2023-01',
      endedAt: '2023-03',
      where: '아이엠티소프트',
      descriptions: [
        {
          content: '아키텍처 다이어그램',
          href: 'https://recondite-orange-10c.notion.site/17f28cd4a9f2807785e5f4f261641bf4?pvs=4',
        },
        {
          weight: 'MEDIUM',
          content:
            'KIOSK에서 생성된 20만여개 결제 데이터를 큐 기반의 비동기 아키텍처로 워커 서버에 전송하는 시스템을 설계 및 구현했습니다.',
        },
        {
          content:
            '[실시간 처리] KIOSK가 1분마다 미전송 데이터를 확인 후 전송하는 Push 방식이었으나, 큐를 도입하여 실시간 처리 방식으로 개선했습니다.',
        },
        {
          content:
            '[비동기 아키텍처] 큐를 통해 KIOSK는 데이터를 즉시 전송하고, 워커 서버가 DB에 저장하는 구조로 변경하여 전송과 저장을 비동기적으로 구현했습니다.',
        },
        {
          content:
            '[데이터유실 Zero] 확인 응답 기반의 장애 대응, 검증 로직 및 DLQ를 사용하여 데이터 신뢰성을 향상시켰습니다.',
        },
        {
          content:
            '[모니터링] 저장 성공률, 큐/DLQ 적재량, 워커 서버 상태 등을 실시간으로 관찰할 수 있도록 했습니다.',
        },
      ],
    },
  ],
};

export default project;

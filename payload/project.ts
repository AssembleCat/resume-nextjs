import { IProject } from '../component/project/IProject';

const project: IProject.Payload = {
  disable: false,
  list: [
    {
      title: 'Stock Agent / Destiny Stock',
      startedAt: '2025-07',
      endedAt: '2025-10',
      where: '미래에셋AI 페스티벌 공모전',
      descriptions: [
        {
          weight: 'MEDIUM',
          href: 'https://github.com/AssembleCat/stock-agent-blinded',
          content:
            '[Stock Agent] 최근 3개년 한국 주식시장 데이터를 수집, 자연어 질의에 LLM, AI Agent, RAG로 응답하는 주식 에이전트를 구현했습니다.',
        },
        {
          weight: 'MEDIUM',
          href:
            'https://github.com/AssembleCat/stock-agent-blinded/blob/main/2025%20%EB%AF%B8%EB%9E%98%EC%97%90%EC%85%8B%EC%A6%9D%EA%B6%8C%20AI%20%ED%8E%98%EC%8A%A4%ED%8B%B0%EB%B2%8C_%EC%98%A4%EC%98%AC%EB%A0%88%EB%93%9C.pdf',
          content:
            '[Destiny Stock] Stock Agent 기능을 사주데이터와 확장하여 주식/운세 정보를 해석하는 에이전트로 발전시켰습니다.',
        },
        {
          content:
            '[데이터] 최근 3개년 일/분 시계열(OHLCV)과 종목 메타데이터를 정제·정규화하여 분석 가능한 단일 스키마로 통합했습니다.',
        },
        {
          content:
            '[질의 해석] 자연어에서 종목, 기간, 지표(가격·거래량)를 파싱해 정량 쿼리로 변환했습니다.',
        },
        {
          content:
            '"삼성전자 2024년 거래량 급등일 알려줘", "카카오 최근 3년 수익률과 최대 낙폭" 등의 질의에 근거와 수치로 답변합니다.',
        },
      ],
    },
    {
      title: 'Prismedia',
      startedAt: '2025-03',
      endedAt: '2025-06',
      where: '캡스톤 프로젝트',
      href: 'https://github.com/Prismedia',
      descriptions: [
        {
          weight: 'MEDIUM',
          content:
            '언론사별 정치적 편향성을 분석하고 균형 잡힌 기사 추천을 제공하는 웹 서비스를 개발했습니다.',
        },
        {
          content:
            '단순 기사 큐레이션이 아닌, 사용자가 편향을 인지하고 스스로 판단할 수 있도록 돕는 것을 목표로 했습니다.',
        },
        {
          content:
            'Ground News를 모티브로 언론의 사회적 영향력에 대한 문제의식에서 출발해 기획과 개발을 함께 진행했습니다.',
        },
      ],
    },
    {
      title: 'Analyze the Spire',
      startedAt: '2025-01',
      endedAt: '2025-01',
      where: '개인 프로젝트',
      href: 'https://github.com/AssembleCat/analyze-the-spire',
      descriptions: [
        {
          weight: 'MEDIUM',
          content:
            'Slay the Spire 카드게임의 약 3,200만건 플레이 로그를 수집하고 딥러닝으로 분석했습니다.',
        },
        {
          content:
            "2.2 패치 기준으로 '곡예'는 사일런트에게 가장 가치가 높은 카드임을 확인했습니다.",
        },
        {
          content:
            "좋아하는 게임을 '데이터로 다시 플레이'하며, 플레이 데이터 기반 분석의 인사이트를 얻었습니다.",
        },
      ],
    },
    /*     {
      title: '통합 인증 및 보안 서비스 구축',
      startedAt: '2024-04',
      endedAt: '2024-06',
      where: '테너시티즈',
      descriptions: [
        {
          weight: 'MEDIUM',
          content:
            '하나의 계정으로 모든 서비스를 이용할 수 있도록 SSO 기반의 통합 인증 시스템을 설계 및 구현했습니다.',
        },
        {
          content:
            '[중앙인증서버] Google, Kakao, Facebook의 OAuth를 대신하는 프록시서버를 구현했습니다.',
        },
        {
          content:
            '[신규서비스 확장] 새로운 서비스는 직접 OAuth 인증서버와 통신하지않고 프록시서버를 통해 유연하게 확장할 수 있습니다.',
        },
        {
          content:
            '[토큰 기반 통합 로그인] 통합 로그아웃 및 보안 강화를 통해 편리하면서도 안전한 인증 환경을 제공했습니다.',
        },
      ],
    }, */
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
      href: 'https://recondite-orange-10c.notion.site/17f28cd4a9f2807785e5f4f261641bf4?pvs=4',
      descriptions: [
        {
          weight: 'MEDIUM',
          content:
            'KIOSK에서 생성된 40만여개 결제 데이터를 큐 기반의 비동기 아키텍처로 워커 서버에 전송하는 시스템을 설계 및 구현했습니다.',
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

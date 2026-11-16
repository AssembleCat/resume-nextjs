import { IProject } from './types';

const project: IProject.Payload = {
  disable: false,
  list: [
    {
      id: 'onprem',
      title: '온프레미스 사이트 운영 플랫폼',
      startedAt: '2025-11',
      where: '로민',
      descriptions: [
        {
          weight: 'MEDIUM',
          content:
            '100개가 넘는 프로젝트의 버전 기록이 Slack·Confluence·SharePoint에 흩어져 설정 불일치와 휴먼 에러가 발생했습니다. 운영 구성을 단일 플랫폼으로 전산화하고, 기록된 버전 조합으로 납품 환경을 구성하게 했습니다.',
        },
        {
          content:
            '[기여] 백엔드 2인이 설계부터 함께했고, 서버사이드 Image Registry, Git 연동, Lomin CLI를 주로 맡았습니다.',
        },
        {
          content:
            '[버전 묶음] Pipeline, Triton, Model Factory, Core, Wrapper 등 서비스 이미지 버전과 DB·Storage·NoSQL 오픈소스 버전을 분리한 뒤, 솔루션 조합별로 묶어 고객사 단위로 추적·구성하게 했습니다.',
        },
        {
          content:
            '[환경 구성] 온프레미스 납품 시 해당 버전 조합으로 환경을 구성할 수 있게 해, 솔루션 코드를 늘리는 대신 운영 구성의 단일화로 납품·운영 안정성을 높였습니다.',
        },
      ],
    },
    {
      id: 'lomin-backend',
      featured: true,
      title: 'Lomin 솔루션 백엔드 및 금융권 연동',
      startedAt: '2025-11',
      where: '로민 · 금융권',
      overview: [
        {
          weight: 'MEDIUM',
          content: '[문제] GPU 대기열의 타임아웃으로 실패한 문서를 다시 처리해야 했습니다.',
        },
        {
          content: '[기여] 기존 분산 처리를 강화하고, 작업 상태 관리·재처리를 직접 추가했습니다.',
        },
        {
          content: '[변화] 전체 배치 재시작 없이 실패 지점부터 재처리하도록 했습니다.',
        },
        {
          content: '[선택] 타입 관리와 ORM 활용을 위해 일부 기능을 Spring Kotlin으로 분리했습니다.',
        },
      ],
      descriptions: [
        {
          content:
            '[설계 선택] 기존 Python·FastAPI 백엔드에서 타입을 일관되게 관리하기 어려웠습니다. 일부 기능을 Spring Kotlin으로 분리해 정적 타입 검사와 ORM을 활용하는 방향으로 설계·구현했습니다.',
        },
        {
          content:
            '[기존 기능 강화] 기존 워커 분산·병렬 처리 기능을 강화했습니다. 작업 상태를 서버에 남기는 기능과 실패 지점부터 재투입하는 기능을 추가해, 실패 건 때문에 전체 배치를 다시 시작하지 않도록 했습니다.',
        },
        {
          content:
            '[실패 모드] 암호·손상 PDF는 렌더 전에 Fast Fail로 원인을 상태에 남기고, 스토리지 순간 장애처럼 복구 가능한 건은 Recovery Success 경로로 재처리했습니다. 타임아웃 하나로 뭉개면 재처리 입구가 사라졌습니다.',
        },
        {
          content:
            '[별도 금융권 연동 프로젝트] 망이 나뉜 환경에서 반입·추론·적재 경로가 곧 허용된 포트와 저장소였습니다. 고객 보안·SI·내부 운영과 구간을 맞추고, NAS·S3·API 어댑터로 고객별 입수 경로의 차이를 처리했습니다.',
        },
      ],
    },
    {
      id: 'stock-agent',
      title: 'Stock Agent / Destiny Stock',
      startedAt: '2025-07',
      endedAt: '2025-10',
      where: '미래에셋AI 페스티벌 공모전',
      descriptions: [
        {
          weight: 'MEDIUM',
          href: 'https://github.com/AssembleCat/stock-agent-blinded',
          content:
            '[Stock Agent] RAG 기반 공모전에서 최근 3개년 한국 주식 데이터로 자연어 질의에 답하는 에이전트를 설계·구현했습니다. 다른 팀원이 아이디어를 구체화했습니다.',
        },
        {
          weight: 'MEDIUM',
          href: 'https://github.com/AssembleCat/stock-agent-blinded/blob/main/2025%20%EB%AF%B8%EB%9E%98%EC%97%90%EC%85%8B%EC%A6%9D%EA%B6%8C%20AI%20%ED%8E%98%EC%8A%A4%ED%8B%B0%EB%B2%8C_%EC%98%A4%EC%98%AC%EB%A0%88%EB%93%9C.pdf',
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
      id: 'spire',
      title: 'Analyze the Spire',
      startedAt: '2025-01',
      endedAt: '2025-01',
      where: '개인 프로젝트',
      href: 'https://github.com/AssembleCat/analyze-the-spire',
      descriptions: [
        {
          weight: 'MEDIUM',
          content:
            'Slay the Spire 공개 플레이 로그 약 3,200만 건을 모아, 덱·유물·적 조합에 따른 기대 피해를 추정하는 분석 파이프를 만들었습니다. 2.2 패치 기준으로 사일런트에게 가장 가치 높은 카드가 곡예임을 확인했습니다.',
        },
        {
          content:
            '[적재] 런 로그를 Parquet으로 쌓고, 캐릭터·승천·층수와 베타/무한 모드를 걸러 분석 가능한 코호트만 남겼습니다.',
        },
        {
          content:
            '[재현] 필수 필드와 HP 기록이 깨진 런은 제외하고, 층마다 카드 선택·유물·이벤트를 시뮬레이터로 되감아 전투 시점의 덱 스냅샷을 만들었습니다.',
        },
        {
          content:
            '[분석] 카드·유물·적 타입을 특성으로 넣어 기대 피해를 학습했습니다. 좋아하는 게임을 데이터로 다시 플레이하며 인사이트를 뽑았습니다.',
        },
      ],
    },
    {
      id: 'van-switch',
      title: 'VAN 확장 및 결제수단 전환',
      startedAt: '2024-11',
      endedAt: '2025-03',
      where: '아이엠티소프트',
      descriptions: [
        {
          weight: 'MEDIUM',
          content:
            '기존 KIOSK 팀 요청으로 VAN 확장에 합류했습니다. 결제 모듈을 1개사에서 4개사로 늘렸고, 페이 포함 결제수단을 설정만으로 전환할 수 있게 했습니다.',
        },
        {
          content:
            '[공통 동작] 통합 전에는 같은 기능의 키오스크도 계약 VAN마다 배포·운영 비용이 갈렸습니다. 결제·환불·조회를 공통 동작으로 두고 Factory·Strategy로 구현체를 교체했습니다.',
        },
        {
          content: '[비동기] 피크타임 결제 부하와 유실을 막기 위해 VAN 연동을 비동기로 두었습니다.',
        },
      ],
    },
    {
      id: 'inhouse-point',
      title: '자사 포인트 적립·사용',
      startedAt: '2024-11',
      endedAt: '2025-03',
      where: '아이엠티소프트',
      descriptions: [
        {
          weight: 'MEDIUM',
          content:
            '외부 포인트 연동 수수료를 줄이려 자사 적립·사용을 만들었습니다. 개발 리드 설계 아래 구현 방향을 보태며 잔액 정합성(트랜잭션·멱등)을 성능보다 우선했습니다.',
        },
        {
          content: '[멱등] 같은 적립·사용 요청이 재시도되어도 잔액을 두 번 바꾸지 않게 했습니다.',
        },
        {
          content:
            '[트랜잭션] 잔액 변경을 한 단위로 묶어, 동시 사용에도 잔액이 어긋나지 않게 했습니다.',
        },
      ],
    },
    {
      id: 'kiosk-multi',
      title: '다중 브랜드 대응 KIOSK 시스템 개발',
      startedAt: '2023-04',
      endedAt: '2023-08',
      where: '아이엠티소프트',
      descriptions: [
        {
          weight: 'MEDIUM',
          content:
            '브랜드마다 DB·API가 달랐지만 역할은 같아서 반복 작업이 많았습니다. 중앙 마스터 서버를 기준으로 공통 설계를 다시 해, 신규 브랜드 도입과 기존 고객사 KIOSK 흡수가 설정으로 되게 했습니다.',
        },
        {
          content:
            '[설정 기반] 특정 브랜드 전용 요구가 아니면 환경설정으로 전환할 수 있게 해, 브랜드별 개별 배포를 없앴습니다.',
        },
        {
          content:
            '[흡수] 고객사별로 나가 있던 기존 KIOSK도 다중 브랜드 대응 코드베이스로 다시 넣었습니다.',
        },
      ],
    },
    {
      id: 'payment',
      featured: true,
      title: '결제데이터 저장 시스템 개발',
      startedAt: '2023-01',
      endedAt: '2023-03',
      where: '아이엠티소프트',
      href: 'https://recondite-orange-10c.notion.site/17f28cd4a9f2807785e5f4f261641bf4?pvs=4',
      overview: [
        {
          weight: 'MEDIUM',
          content:
            '[기여] 저장 시스템을 설계하고 서버사이드를 단독 구현했습니다. 클라이언트는 프론트 팀과 협업했습니다.',
        },
        {
          content: '[구조] SQS 기반 비동기 처리로 데이터 전송과 DB 저장을 분리했습니다.',
        },
        {
          content:
            '[복구] 통신이 끊기면 로컬에 보관한 뒤 재전송하고, 반복 처리 실패 메시지는 DLQ로 분리했습니다.',
        },
      ],
      descriptions: [
        {
          content:
            '[전환 전후] KIOSK가 1분마다 미전송 분을 Push하던 방식에서 SQS 기반 비동기 처리로 전환했습니다.',
        },
        {
          content:
            '[모니터링] 저장 성공률, 큐/DLQ 적재량, 워커 서버 상태를 관찰할 수 있게 했습니다.',
        },
      ],
    },
  ],
};

export default project;

export type FlowDiagramId = 'inference' | 'onprem' | 'payment' | 'van' | 'point' | 'kiosk' | 'stock' | 'spire';

export interface PipelineNodeSeed {
  id: string;
  label: string;
  caption: string;
  x: number;
  y: number;
  tone?: 'ember' | 'mute' | 'danger' | 'ok';
}

export interface PipelineEdgeSeed {
  id: string;
  source: string;
  target: string;
  label?: string;
  animated?: boolean;
  kind?: 'flow' | 'fail' | 'retry';
}

export interface PipelineGroupSeed {
  id: string;
  label: string;
  caption?: string;
  nodeIds: string[];
}

export interface PipelineDiagram {
  id: FlowDiagramId;
  title: string;
  subtitle: string;
  projectId?: string;
  groups: PipelineGroupSeed[];
  nodes: PipelineNodeSeed[];
  edges: PipelineEdgeSeed[];
}

export const PIPELINE_DIAGRAMS: PipelineDiagram[] = [
  {
    id: 'inference',
    title: '문서 추론',
    subtitle:
      '고객사마다 파일이 들어오는 곳이 달라서 어댑터만 바꾸고, Spring이 진행 상태를 남긴 뒤 GPU 워커가 추론한다.',
    projectId: 'lomin-backend',
    groups: [
      { id: 'inf-g-in', label: 'Ingest', nodeIds: ['inf-nas', 'inf-s3', 'inf-api'] },
      { id: 'inf-g-ad', label: 'Adapter', nodeIds: ['inf-adapter'] },
      { id: 'inf-g-or', label: 'State', nodeIds: ['inf-spring', 'inf-redis'] },
      { id: 'inf-g-inf', label: 'Inference', nodeIds: ['inf-fastfail', 'inf-workers', 'inf-retry'] },
      { id: 'inf-g-st', label: 'Store', nodeIds: ['inf-minio', 'inf-rdb'] },
    ],
    nodes: [
      { id: 'inf-nas', label: 'NAS', caption: '온프레미스 파일 반입', x: 0, y: 40, tone: 'mute' },
      { id: 'inf-s3', label: 'S3', caption: '클라우드 파일 반입', x: 0, y: 160, tone: 'mute' },
      { id: 'inf-api', label: 'API', caption: '업로드 반입', x: 0, y: 280, tone: 'mute' },
      {
        id: 'inf-adapter',
        label: 'Inbound Adapter',
        caption: '출처만 맞추고 이후 파이프는 같음',
        x: 260,
        y: 160,
        tone: 'ember',
      },
      {
        id: 'inf-spring',
        label: 'Spring Kotlin',
        caption: '작업 상태와 외부 연동',
        x: 540,
        y: 100,
        tone: 'ember',
      },
      { id: 'inf-redis', label: 'Redis', caption: '진행 체크포인트', x: 540, y: 260, tone: 'mute' },
      {
        id: 'inf-fastfail',
        label: 'Invalid PDF',
        caption: '암호·깨진 파일은 렌더 전에 중단',
        x: 820,
        y: 20,
        tone: 'danger',
      },
      {
        id: 'inf-workers',
        label: 'GPU Workers',
        caption: 'FastAPI로 렌더·추론. 하루 약 8만 건',
        x: 820,
        y: 140,
        tone: 'ok',
      },
      {
        id: 'inf-retry',
        label: 'Retry',
        caption: '스토리지 순간 장애 시 체크포인트부터',
        x: 820,
        y: 280,
        tone: 'ok',
      },
      { id: 'inf-minio', label: 'MinIO', caption: '렌더 결과 파일', x: 1100, y: 80, tone: 'mute' },
      { id: 'inf-rdb', label: 'RDB', caption: '상태와 결과 메타', x: 1100, y: 240, tone: 'mute' },
    ],
    edges: [
      { id: 'e-nas', source: 'inf-nas', target: 'inf-adapter' },
      { id: 'e-s3', source: 'inf-s3', target: 'inf-adapter' },
      { id: 'e-api', source: 'inf-api', target: 'inf-adapter' },
      { id: 'e-ad-spring', source: 'inf-adapter', target: 'inf-spring', animated: true },
      { id: 'e-st', source: 'inf-spring', target: 'inf-redis', label: 'checkpoint' },
      { id: 'e-wk', source: 'inf-spring', target: 'inf-workers', animated: true },
      { id: 'e-ff', source: 'inf-workers', target: 'inf-fastfail', label: 'reject', kind: 'fail' },
      { id: 'e-out-m', source: 'inf-workers', target: 'inf-minio', animated: true },
      { id: 'e-out-r', source: 'inf-workers', target: 'inf-rdb', animated: true },
      { id: 'e-redis-retry', source: 'inf-redis', target: 'inf-retry', label: 'checkpoint', kind: 'retry' },
      { id: 'e-rt', source: 'inf-spring', target: 'inf-retry', kind: 'retry' },
      { id: 'e-re', source: 'inf-retry', target: 'inf-workers', label: 'resume', kind: 'retry' },
    ],
  },
  {
    id: 'onprem',
    title: '온프렘 구성',
    subtitle:
      '100곳이 넘는 고객사에 깔린 서비스 버전과 DB 버전을 나눠 적어 두고, 그 조합 그대로 다시 설치한다.',
    projectId: 'onprem',
    groups: [
      { id: 'op-g-src', label: 'Legacy', nodeIds: ['op-prev'] },
      { id: 'op-g-plat', label: 'Platform', nodeIds: ['op-platform'] },
      { id: 'op-g-art', label: 'Artifacts', nodeIds: ['op-registry', 'op-git', 'op-cli'] },
      { id: 'op-g-ver', label: 'Versions', nodeIds: ['op-svc', 'op-oss'] },
      { id: 'op-g-site', label: 'Site', nodeIds: ['op-site'] },
    ],
    nodes: [
      {
        id: 'op-prev',
        label: 'Legacy Records',
        caption: '슬랙·위키·파일에 버전이 흩어져 있었음',
        x: 0,
        y: 140,
        tone: 'mute',
      },
      {
        id: 'op-platform',
        label: 'Ops Platform',
        caption: '백엔드 2명이 설계. 환경 구성을 선택',
        x: 260,
        y: 140,
        tone: 'ember',
      },
      {
        id: 'op-registry',
        label: 'Image Registry',
        caption: 'Pipeline, Triton, Core 등',
        x: 540,
        y: 20,
        tone: 'ok',
      },
      { id: 'op-git', label: 'Git', caption: '고객사별 구성 이력', x: 540, y: 150, tone: 'ok' },
      { id: 'op-cli', label: 'Lomin CLI', caption: '현장에서 설치 실행', x: 540, y: 280, tone: 'ok' },
      {
        id: 'op-svc',
        label: 'Service Bundle',
        caption: '서비스 이미지 버전',
        x: 820,
        y: 60,
        tone: 'ember',
      },
      {
        id: 'op-oss',
        label: 'OSS Bundle',
        caption: 'DB · 스토리지 · NoSQL 버전',
        x: 820,
        y: 220,
        tone: 'ember',
      },
      {
        id: 'op-site',
        label: 'Customer Site',
        caption: '그 조합으로 다시 설치',
        x: 1100,
        y: 140,
        tone: 'mute',
      },
    ],
    edges: [
      { id: 'e-prev', source: 'op-prev', target: 'op-platform', label: 'legacy', kind: 'fail' },
      { id: 'e-reg', source: 'op-platform', target: 'op-registry', animated: true },
      { id: 'e-git', source: 'op-platform', target: 'op-git' },
      { id: 'e-cli', source: 'op-platform', target: 'op-cli' },
      { id: 'e-svc', source: 'op-registry', target: 'op-svc', animated: true },
      { id: 'e-oss', source: 'op-git', target: 'op-oss' },
      { id: 'e-git-site', source: 'op-git', target: 'op-site', label: 'config' },
      { id: 'e-cli-site', source: 'op-cli', target: 'op-site' },
      { id: 'e-svc-site', source: 'op-svc', target: 'op-site', animated: true },
      { id: 'e-oss-site', source: 'op-oss', target: 'op-site' },
    ],
  },
  {
    id: 'payment',
    title: '결제 적재',
    subtitle:
      '키오스크 결제 내역을 큐로 보내고 서버가 DB에 넣는다. 망이 끊겨도 단말에 남겨 두었다가 다시 보낸다.',
    projectId: 'payment',
    groups: [
      { id: 'pay-g-edge', label: 'Edge', nodeIds: ['pay-kiosk'] },
      { id: 'pay-g-q', label: 'Queue', nodeIds: ['pay-local', 'pay-sqs'] },
      { id: 'pay-g-w', label: 'Process', nodeIds: ['pay-dlq', 'pay-worker'] },
      { id: 'pay-g-st', label: 'Store', nodeIds: ['pay-monitor', 'pay-rdb'] },
    ],
    nodes: [
      {
        id: 'pay-kiosk',
        label: 'KIOSK',
        caption: '예전엔 1분마다 미전송 분을 Push',
        x: 40,
        y: 160,
        tone: 'mute',
      },
      {
        id: 'pay-local',
        label: 'Local Buffer',
        caption: '네트워크가 끊겨도 단말에 보관',
        x: 300,
        y: 140,
        tone: 'ok',
      },
      {
        id: 'pay-sqs',
        label: 'SQS',
        caption: '전송과 DB 저장을 분리',
        x: 520,
        y: 140,
        tone: 'ember',
      },
      {
        id: 'pay-dlq',
        label: 'DLQ',
        caption: '여러 번 실패한 메시지',
        x: 760,
        y: 40,
        tone: 'danger',
      },
      {
        id: 'pay-worker',
        label: 'Worker',
        caption: '서버에서 저장. 같은 건 한 번만',
        x: 760,
        y: 200,
        tone: 'ember',
      },
      {
        id: 'pay-monitor',
        label: 'Monitor',
        caption: '성공률, 큐 길이, 워커 상태',
        x: 1000,
        y: 40,
        tone: 'ok',
      },
      { id: 'pay-rdb', label: 'RDB', caption: '하루 최대 약 40만 건', x: 1000, y: 200, tone: 'mute' },
    ],
    edges: [
      { id: 'e-kiosk-local', source: 'pay-kiosk', target: 'pay-local', animated: true },
      { id: 'e-local-sqs', source: 'pay-local', target: 'pay-sqs', animated: true },
      { id: 'e-sqs-worker', source: 'pay-sqs', target: 'pay-worker', animated: true },
      { id: 'e-worker-rdb', source: 'pay-worker', target: 'pay-rdb', animated: true },
      { id: 'e-worker-dlq', source: 'pay-worker', target: 'pay-dlq', label: 'fail', kind: 'fail' },
      { id: 'e-worker-mon', source: 'pay-worker', target: 'pay-monitor' },
      { id: 'e-dlq-mon', source: 'pay-dlq', target: 'pay-monitor', kind: 'fail' },
    ],
  },
  {
    id: 'kiosk',
    title: '다중 브랜드 KIOSK',
    subtitle: '브랜드마다 DB와 API가 달라도, 설정만 바꿔 같은 키오스크를 돌린다.',
    projectId: 'kiosk-multi',
    groups: [
      { id: 'kio-g-cfg', label: 'Config', nodeIds: ['kio-config', 'kio-common'] },
      { id: 'kio-g-app', label: 'App', nodeIds: ['kio-runtime'] },
      { id: 'kio-g-core', label: 'Server', nodeIds: ['kio-master'] },
      { id: 'kio-g-br', label: 'Brand', nodeIds: ['kio-brands'] },
    ],
    nodes: [
      {
        id: 'kio-config',
        label: 'Env Config',
        caption: '브랜드 전용이 아니면 설정으로',
        x: 0,
        y: 40,
        tone: 'ok',
      },
      {
        id: 'kio-common',
        label: 'Common Modules',
        caption: '주문 · 결제 · 메뉴',
        x: 0,
        y: 220,
        tone: 'ok',
      },
      {
        id: 'kio-runtime',
        label: 'KIOSK',
        caption: '주문 · 결제 · 메뉴 코드는 하나. 예전 고객사 코드도 이쪽으로 옮김',
        x: 280,
        y: 130,
        tone: 'ember',
      },
      {
        id: 'kio-master',
        label: 'Master Server',
        caption: '키오스크가 붙는 중앙 API',
        x: 560,
        y: 130,
        tone: 'ember',
      },
      {
        id: 'kio-brands',
        label: 'Brand DB / API',
        caption: '저장소와 외부 API만 다름',
        x: 840,
        y: 130,
        tone: 'mute',
      },
    ],
    edges: [
      { id: 'e-cfg', source: 'kio-config', target: 'kio-runtime', animated: true },
      { id: 'e-com', source: 'kio-common', target: 'kio-runtime', animated: true },
      { id: 'e-run', source: 'kio-runtime', target: 'kio-master', animated: true },
      { id: 'e-br', source: 'kio-master', target: 'kio-brands', animated: true },
    ],
  },
  {
    id: 'van',
    title: 'VAN 전환',
    subtitle: '결제·환불·조회 코드는 그대로 두고, 어느 VAN을 쓸지만 설정으로 고른다.',
    projectId: 'van-switch',
    groups: [
      { id: 'van-g-edge', label: 'Edge', nodeIds: ['van-kiosk'] },
      { id: 'van-g-api', label: 'API', nodeIds: ['van-api'] },
      { id: 'van-g-sw', label: 'Integration', nodeIds: ['van-config', 'van-async'] },
      { id: 'van-g-van', label: 'VAN', nodeIds: ['van-vendors'] },
      { id: 'van-g-io', label: 'Store', nodeIds: ['van-rdb'] },
    ],
    nodes: [
      {
        id: 'van-kiosk',
        label: 'KIOSK',
        caption: '브랜드와 상관없이 같은 결제 호출',
        x: 0,
        y: 140,
        tone: 'mute',
      },
      {
        id: 'van-api',
        label: 'Payment API',
        caption: '결제 · 환불 · 조회',
        x: 260,
        y: 140,
        tone: 'ember',
      },
      {
        id: 'van-config',
        label: 'Config',
        caption: '어느 VAN·페이를 쓸지',
        x: 540,
        y: 40,
        tone: 'ok',
      },
      {
        id: 'van-async',
        label: 'Async I/O',
        caption: '피크에 호출이 쌓여도 결과가 안 사라지게',
        x: 540,
        y: 220,
        tone: 'ok',
      },
      {
        id: 'van-vendors',
        label: 'VAN Providers',
        caption: '기존 1곳 + 확장 3곳, 페이 포함',
        x: 820,
        y: 140,
        tone: 'mute',
      },
      { id: 'van-rdb', label: 'RDB', caption: '승인 · 환불 결과', x: 1100, y: 140, tone: 'mute' },
    ],
    edges: [
      { id: 'e-van-kiosk', source: 'van-kiosk', target: 'van-api', animated: true },
      { id: 'e-van-cfg', source: 'van-api', target: 'van-config' },
      { id: 'e-van-async', source: 'van-api', target: 'van-async', animated: true },
      { id: 'e-van-cfg-async', source: 'van-config', target: 'van-async', label: 'select' },
      { id: 'e-van-io', source: 'van-async', target: 'van-vendors', animated: true },
      { id: 'e-van-store', source: 'van-vendors', target: 'van-rdb', animated: true },
    ],
  },
  {
    id: 'point',
    title: '자사 포인트',
    subtitle:
      '외부 포인트 수수료를 줄이려고 직접 만들었다. 같은 요청이 두 번 와도 잔액은 한 번만 바뀐다.',
    projectId: 'inhouse-point',
    groups: [
      { id: 'pt-g-edge', label: 'Edge', nodeIds: ['pt-kiosk'] },
      { id: 'pt-g-old', label: 'Legacy', nodeIds: ['pt-ext'] },
      { id: 'pt-g-api', label: 'API', nodeIds: ['pt-api'] },
      { id: 'pt-g-st', label: 'Store', nodeIds: ['pt-bal'] },
    ],
    nodes: [
      {
        id: 'pt-kiosk',
        label: 'KIOSK',
        caption: '주문에서 적립·사용 요청',
        x: 0,
        y: 140,
        tone: 'mute',
      },
      {
        id: 'pt-ext',
        label: 'External Point',
        caption: '이전에 수수료가 붙던 연동',
        x: 280,
        y: 20,
        tone: 'danger',
      },
      {
        id: 'pt-api',
        label: 'Point API',
        caption: '잔액 변경은 트랜잭션. 같은 요청은 한 번만',
        x: 560,
        y: 140,
        tone: 'ember',
      },
      {
        id: 'pt-bal',
        label: 'Balance Store',
        caption: '잔액이 어긋나지 않게 저장',
        x: 840,
        y: 140,
        tone: 'mute',
      },
    ],
    edges: [
      { id: 'e-pt-old', source: 'pt-kiosk', target: 'pt-ext', kind: 'fail', label: 'legacy' },
      { id: 'e-pt-req', source: 'pt-kiosk', target: 'pt-api', animated: true },
      { id: 'e-pt-bal', source: 'pt-api', target: 'pt-bal', animated: true },
    ],
  },
  {
    id: 'stock',
    title: 'Stock Agent',
    subtitle: '3년치 일·분 시세를 한 형태로 모아 두고, 질문에서 종목·기간·지표를 읽어 숫자로 답한다.',
    projectId: 'stock-agent',
    groups: [
      { id: 'st-g-data', label: 'Market', nodeIds: ['st-ohlcv', 'st-meta'] },
      { id: 'st-g-sch', label: 'Store', nodeIds: ['st-schema'] },
      { id: 'st-g-q', label: 'Parse', nodeIds: ['st-parser'] },
      { id: 'st-g-ag', label: 'Answer', nodeIds: ['st-lookup', 'st-llm'] },
    ],
    nodes: [
      { id: 'st-ohlcv', label: 'OHLCV', caption: '일봉 · 분봉', x: 0, y: 40, tone: 'mute' },
      { id: 'st-meta', label: 'Stock Meta', caption: '종목 · 시장', x: 0, y: 200, tone: 'mute' },
      {
        id: 'st-schema',
        label: 'Analytics Schema',
        caption: '정제해서 한 형태로',
        x: 260,
        y: 120,
        tone: 'ember',
      },
      {
        id: 'st-parser',
        label: 'Query Parser',
        caption: '질문에서 종목 · 기간 · 가격·거래량',
        x: 540,
        y: 240,
        tone: 'ember',
      },
      {
        id: 'st-lookup',
        label: 'Lookup',
        caption: '테이블에서 해당 구간 숫자만',
        x: 820,
        y: 120,
        tone: 'ok',
      },
      {
        id: 'st-llm',
        label: 'LLM',
        caption: '그 숫자로 문장을 만듦',
        x: 1080,
        y: 120,
        tone: 'ember',
      },
    ],
    edges: [
      { id: 'e-oh', source: 'st-ohlcv', target: 'st-schema' },
      { id: 'e-meta', source: 'st-meta', target: 'st-schema' },
      { id: 'e-sch-lookup', source: 'st-schema', target: 'st-lookup', animated: true },
      { id: 'e-p-lookup', source: 'st-parser', target: 'st-lookup', animated: true },
      { id: 'e-out', source: 'st-lookup', target: 'st-llm', animated: true },
    ],
  },
  {
    id: 'spire',
    title: 'Spire 분석',
    subtitle:
      '플레이 로그 약 3,200만 건에서 깨진 런을 버리고, 층마다 덱을 다시 만들어 기대 피해를 계산한다.',
    projectId: 'spire',
    groups: [
      { id: 'sp-g-in', label: 'Logs', nodeIds: ['sp-runs'] },
      { id: 'sp-g-st', label: 'Store', nodeIds: ['sp-parquet'] },
      { id: 'sp-g-f', label: 'Filter', nodeIds: ['sp-filter', 'sp-drop'] },
      { id: 'sp-g-sim', label: 'Replay', nodeIds: ['sp-sim', 'sp-battle'] },
      { id: 'sp-g-ml', label: 'Model', nodeIds: ['sp-model', 'sp-insight'] },
    ],
    nodes: [
      {
        id: 'sp-runs',
        label: 'Run Logs',
        caption: '약 3,200만 런',
        x: 0,
        y: 140,
        tone: 'mute',
      },
      {
        id: 'sp-parquet',
        label: 'Parquet',
        caption: '런 단위로 컬럼 저장',
        x: 260,
        y: 140,
        tone: 'ember',
      },
      {
        id: 'sp-filter',
        label: 'Cohort',
        caption: '4캐릭터, 승천 0–20. 베타·무한 제외',
        x: 540,
        y: 40,
        tone: 'ok',
      },
      {
        id: 'sp-drop',
        label: 'Invalid Run',
        caption: '필드 빠짐, HP가 안 맞는 런',
        x: 540,
        y: 240,
        tone: 'danger',
      },
      {
        id: 'sp-sim',
        label: 'Floor Simulator',
        caption: '카드·유물·이벤트로 층마다 덱을 재구성',
        x: 840,
        y: 40,
        tone: 'ember',
      },
      {
        id: 'sp-battle',
        label: 'Battle Snapshot',
        caption: '그때의 덱 · 유물 · 적',
        x: 840,
        y: 240,
        tone: 'ok',
      },
      {
        id: 'sp-model',
        label: 'Expected Damage',
        caption: '덱·유물·적 타입으로 학습',
        x: 1140,
        y: 40,
        tone: 'ember',
      },
      {
        id: 'sp-insight',
        label: 'Card Value',
        caption: '2.2 사일런트 기준 곡예가 가장 높았음',
        x: 1140,
        y: 240,
        tone: 'ok',
      },
    ],
    edges: [
      { id: 'e-sp-runs', source: 'sp-runs', target: 'sp-parquet', animated: true },
      { id: 'e-sp-f', source: 'sp-parquet', target: 'sp-filter', animated: true },
      { id: 'e-sp-drop', source: 'sp-parquet', target: 'sp-drop', kind: 'fail', label: 'drop' },
      { id: 'e-sp-sim', source: 'sp-filter', target: 'sp-sim', animated: true },
      { id: 'e-sp-battle', source: 'sp-sim', target: 'sp-battle', animated: true },
      { id: 'e-sp-model', source: 'sp-battle', target: 'sp-model', animated: true },
      { id: 'e-sp-insight', source: 'sp-model', target: 'sp-insight', animated: true },
    ],
  },
];

export const DIAGRAM_TABS: { id: FlowDiagramId; label: string }[] = [
  { id: 'inference', label: '문서 추론' },
  { id: 'onprem', label: '온프렘 구성' },
  { id: 'payment', label: '결제 적재' },
  { id: 'van', label: 'VAN 전환' },
  { id: 'point', label: '자사 포인트' },
  { id: 'kiosk', label: '다중 브랜드' },
  { id: 'stock', label: 'Stock Agent' },
  { id: 'spire', label: 'Spire 분석' },
];

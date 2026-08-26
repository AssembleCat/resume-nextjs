export type FlowDiagramId = 'career' | 'inference' | 'payment' | 'onprem';

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
}

export interface PipelineDiagram {
  id: Exclude<FlowDiagramId, 'career'>;
  title: string;
  subtitle: string;
  projectId?: string;
  nodes: PipelineNodeSeed[];
  edges: PipelineEdgeSeed[];
}

export const PIPELINE_DIAGRAMS: PipelineDiagram[] = [
  {
    id: 'inference',
    title: '문서 추론 파이프',
    subtitle: '출처는 어댑터로 흡수하고, 실패는 상태로 남겨 재처리 입구를 지킵니다.',
    projectId: 'lomin-backend',
    nodes: [
      { id: 'nas', label: 'NAS', caption: '온프레미스 입수', x: 0, y: 40, tone: 'mute' },
      { id: 's3', label: 'S3', caption: '클라우드 입수', x: 0, y: 160, tone: 'mute' },
      { id: 'api', label: 'API', caption: '실시간 입수', x: 0, y: 280, tone: 'mute' },
      { id: 'adapter', label: 'Ingest Adapter', caption: '출처 매핑 · 본체 분리', x: 260, y: 160, tone: 'ember' },
      { id: 'fastfail', label: 'Fast Fail', caption: '암호·손상 PDF 차단', x: 520, y: 40, tone: 'danger' },
      { id: 'fastapi', label: 'FastAPI', caption: '추론 인접 Python', x: 520, y: 160, tone: 'ember' },
      { id: 'spring', label: 'Spring Kotlin', caption: '상태머신 · 연동 경계', x: 780, y: 160, tone: 'ember' },
      { id: 'workers', label: 'GPU Workers', caption: '분산 병렬 추론', x: 1040, y: 80, tone: 'ok' },
      { id: 'retry', label: 'Recovery', caption: '실패 지점부터 재투입', x: 1040, y: 240, tone: 'ok' },
      { id: 'store', label: 'Result Store', caption: 'RDB · MinIO', x: 1300, y: 160, tone: 'mute' },
    ],
    edges: [
      { id: 'e-nas', source: 'nas', target: 'adapter' },
      { id: 'e-s3', source: 's3', target: 'adapter' },
      { id: 'e-api', source: 'api', target: 'adapter' },
      { id: 'e-ff', source: 'adapter', target: 'fastfail', label: '손상 문서' },
      { id: 'e-inf', source: 'adapter', target: 'fastapi', animated: true },
      { id: 'e-kt', source: 'fastapi', target: 'spring', animated: true },
      { id: 'e-wk', source: 'spring', target: 'workers', label: '분산' },
      { id: 'e-rt', source: 'spring', target: 'retry', label: '재처리' },
      { id: 'e-out-w', source: 'workers', target: 'store' },
      { id: 'e-out-r', source: 'retry', target: 'store' },
    ],
  },
  {
    id: 'payment',
    title: '결제 적재 파이프',
    subtitle: '전송과 저장을 분리하고, 끊겨도 로컬에 들고 있다가 다시 밀어 넣습니다.',
    projectId: 'payment',
    nodes: [
      { id: 'kiosk', label: 'KIOSK', caption: '현장 단말', x: 40, y: 140, tone: 'mute' },
      { id: 'local', label: 'Local Buffer', caption: '네트워크 단절 대비', x: 300, y: 40, tone: 'ok' },
      { id: 'sqs', label: 'SQS', caption: '비동기 적재', x: 300, y: 200, tone: 'ember' },
      { id: 'worker', label: 'Worker', caption: '서버사이드 단독 구현', x: 580, y: 200, tone: 'ember' },
      { id: 'dlq', label: 'DLQ', caption: '유실 경로 가시화', x: 580, y: 40, tone: 'danger' },
      { id: 'rdb', label: 'RDB', caption: '일 40만 건', x: 860, y: 200, tone: 'mute' },
      { id: 'monitor', label: 'Monitor', caption: '성공률 · 적재량 · 워커', x: 860, y: 40, tone: 'ok' },
    ],
    edges: [
      { id: 'e-kiosk-local', source: 'kiosk', target: 'local', label: '단절 시' },
      { id: 'e-kiosk-sqs', source: 'kiosk', target: 'sqs', animated: true },
      { id: 'e-local-sqs', source: 'local', target: 'sqs', label: '복구 후' },
      { id: 'e-sqs-worker', source: 'sqs', target: 'worker', animated: true },
      { id: 'e-sqs-dlq', source: 'sqs', target: 'dlq' },
      { id: 'e-worker-rdb', source: 'worker', target: 'rdb' },
      { id: 'e-worker-mon', source: 'worker', target: 'monitor' },
    ],
  },
  {
    id: 'onprem',
    title: '온프레미스 구성',
    subtitle: '흩어진 버전 기록을 묶고, 납품 환경을 설정으로 재현합니다.',
    projectId: 'onprem',
    nodes: [
      { id: 'slack', label: 'Slack', caption: '대화에 남은 버전', x: 0, y: 0, tone: 'mute' },
      { id: 'confluence', label: 'Confluence', caption: '문서에 남은 설정', x: 0, y: 140, tone: 'mute' },
      { id: 'sharepoint', label: 'SharePoint', caption: '파일에 남은 조합', x: 0, y: 280, tone: 'mute' },
      { id: 'platform', label: 'Ops Platform', caption: '환경 구성 전산화', x: 280, y: 140, tone: 'ember' },
      { id: 'registry', label: 'Image Registry', caption: '서버사이드 레지스트리', x: 560, y: 20, tone: 'ok' },
      { id: 'git', label: 'Git', caption: '구성 이력', x: 560, y: 140, tone: 'ok' },
      { id: 'cli', label: 'Lomin CLI', caption: '현장 구성 진입점', x: 560, y: 260, tone: 'ok' },
      { id: 'bundle', label: 'Version Bundle', caption: '솔루션 + OSS 조합', x: 840, y: 140, tone: 'ember' },
      { id: 'site', label: 'Customer Site', caption: '고객사 단위 추적', x: 1120, y: 140, tone: 'mute' },
    ],
    edges: [
      { id: 'e-slack', source: 'slack', target: 'platform' },
      { id: 'e-conf', source: 'confluence', target: 'platform' },
      { id: 'e-sp', source: 'sharepoint', target: 'platform' },
      { id: 'e-reg', source: 'platform', target: 'registry' },
      { id: 'e-git', source: 'platform', target: 'git', animated: true },
      { id: 'e-cli', source: 'platform', target: 'cli' },
      { id: 'e-b1', source: 'registry', target: 'bundle' },
      { id: 'e-b2', source: 'git', target: 'bundle', animated: true },
      { id: 'e-b3', source: 'cli', target: 'bundle' },
      { id: 'e-site', source: 'bundle', target: 'site' },
    ],
  },
];

export const DIAGRAM_TABS: { id: FlowDiagramId; label: string }[] = [
  { id: 'inference', label: '문서 추론' },
  { id: 'payment', label: '결제 파이프' },
  { id: 'onprem', label: '온프렘 구성' },
  { id: 'career', label: '커리어 맵' },
];

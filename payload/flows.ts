export type FlowDiagramId =
  'inference' | 'onprem' | 'payment' | 'van' | 'point' | 'kiosk' | 'stock' | 'spire' | 'pension';

export interface PipelineNodeSeed {
  id: string;
  label: string;
  caption: string;
  description?: string;
  x: number;
  y: number;
  tone?: 'ember' | 'mute' | 'danger' | 'ok';
}

export interface PipelineEdgeSeed {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
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
  contributions?: { label: string; description: string }[];
  groups: PipelineGroupSeed[];
  nodes: PipelineNodeSeed[];
  edges: PipelineEdgeSeed[];
}

export const PIPELINE_DIAGRAMS: PipelineDiagram[] = [
  {
    id: 'pension',
    title: '퇴직연금 비동기 처리 · 설계안',
    projectId: 'samsung-pension',
    subtitle:
      '실제 적용 여부 확인 전의 비동기 설계안입니다. 화살표는 논리적 작업 전달을, 각 노드는 처리·복구 경계를 설명합니다.',
    contributions: [
      { label: '작업 원장', description: 'PostgreSQL · 상태·결과·Outbox' },
      { label: '실행 전달', description: 'Redis Streams · Consumer Group · ACK' },
      { label: '연동 경계', description: '전송과 업무 완료 분리 · 조회·대사' },
    ],
    groups: [
      { id: 'pen-g-input', label: '접수 · 상태 영속화', nodeIds: ['pen-upload', 'pen-ledger'] },
      {
        id: 'pen-g-async',
        label: '비동기 전달 · 추론 연계',
        nodeIds: ['pen-stream', 'pen-inference', 'pen-ml'],
      },
      {
        id: 'pen-g-process',
        label: '가공 · 업무 검증',
        nodeIds: ['pen-process', 'pen-validation', 'pen-review'],
      },
      {
        id: 'pen-g-business',
        label: '연동 · 결과 확인',
        nodeIds: ['pen-integrate', 'pen-payment', 'pen-reconcile'],
      },
    ],
    nodes: [
      {
        id: 'pen-upload',
        label: '접수 API',
        caption: '파일 확보 후 작업 ID 반환',
        description:
          '설계안: 파일 저장을 확인하고 요청 메타데이터와 작업을 영속화한 뒤 접수 응답을 반환합니다. 추론부터 연동 완료까지 HTTP 요청을 유지하지 않습니다. 파일 저장과 DB 커밋의 경계에서는 누락·고아 파일 정리를 고려합니다.',
        x: 0,
        y: 0,
        tone: 'ember',
      },
      {
        id: 'pen-ledger',
        label: 'PostgreSQL 작업 원장',
        caption: '상태·결과·Outbox / 로컬 TX',
        description:
          '설계안: 작업·단계·입력 버전·결과·연동 이력을 관리합니다. 상태 변경과 다음 이벤트를 같은 트랜잭션에 저장하고 발행기가 Outbox를 Redis Streams로 전달합니다. 단계별 워커도 이 원장을 갱신하며, 장기 미완료 작업은 원장과 실행 상태를 대조해 복구합니다.',
        x: 0,
        y: 240,
        tone: 'ember',
      },
      {
        id: 'pen-stream',
        label: 'Redis Streams',
        caption: '작업 분배 · ACK · 미처리 회수',
        description:
          '설계안: Consumer Group으로 작업을 분배하고, DB 결과 커밋 뒤 ACK합니다. 발행·처리 중복을 허용하는 대신 작업 ID와 단계·입력 버전으로 멱등 처리합니다. 미완료 메시지 회수, 보존·영속화 설정, DB 원장 기반 복구가 함께 필요합니다. 단계별 스트림은 논리적으로 묶어 표시했습니다.',
        x: 300,
        y: 0,
        tone: 'ember',
      },
      {
        id: 'pen-inference',
        label: '추론 연계 워커',
        caption: '요청 · 콜백 또는 상태 조회',
        description:
          '설계안: ML 엔진에 추론을 요청하고, 엔진 계약에 따라 콜백이나 주기 조회로 결과를 수집합니다. 작업 ID와 실행 버전을 대조해 중복·지연 결과를 구분하며, 추론 대기 중 DB 트랜잭션이나 락을 유지하지 않습니다.',
        x: 300,
        y: 240,
        tone: 'ember',
      },
      {
        id: 'pen-ml',
        label: '분류·AI-OCR 엔진',
        caption: '별도 ML 담당 영역',
        description:
          '17종·200개 이상 서식을 처리하는 문서 분류·추론 영역입니다. 추론 엔진 등 머신러닝 개발은 별도 담당자가 맡았습니다. 이 설계안에서는 외부 처리 경계로 구분합니다.',
        x: 300,
        y: 480,
        tone: 'mute',
      },
      {
        id: 'pen-process',
        label: '서식별 가공 워커',
        caption: '추론 원본 → 공통 문서 모델',
        description:
          '설계안: 추론 원본을 보존하고 서식별 변환기로 필드 명칭·형식 차이를 공통 문서 모델로 정규화합니다. 입력과 변환 규칙의 버전을 결과에 남겨 문서 정정 시 영향받는 후속 단계만 다시 실행할 수 있도록 합니다.',
        x: 600,
        y: 0,
        tone: 'ember',
      },
      {
        id: 'pen-validation',
        label: '업무별 집계·검증',
        caption: '문서 완료 ≠ 업무 완료',
        description:
          '설계안: 업무 건에 필요한 문서가 모였는지 확인하고 필수값·형식·문서 간 일치 여부 등을 검증합니다. 통과한 데이터만 연동 대상으로 확정하며, 입력 오류는 기술 장애의 재시도와 구분합니다. 구체적인 규칙은 현업 요구와 실제 구현을 대조해야 합니다.',
        x: 600,
        y: 240,
        tone: 'ember',
      },
      {
        id: 'pen-review',
        label: '담당자 확인·재처리',
        caption: '데이터 수정 · 새 입력 버전',
        description:
          '설계안: 누락·불일치 등 업무 데이터 오류는 담당자 확인이나 반려로 분리합니다. 문서가 수정되면 새 입력 버전으로 필요한 가공·검증 단계를 다시 실행하며, 이전 결과와 처리 이력을 보존합니다.',
        x: 600,
        y: 480,
        tone: 'danger',
      },
      {
        id: 'pen-integrate',
        label: '연동 워커',
        caption: '전송 의도·시도·결과 기록',
        description:
          '설계안: 검증 완료 데이터의 전송을 앞단 처리와 분리합니다. 전송·상대 접수·업무 완료를 각각 기록하고, 외부 시스템의 지연과 장애가 문서 가공 워커를 점유하지 않게 합니다. 단계 결과와 후속 작업은 DB에 커밋한 뒤 ACK합니다.',
        x: 900,
        y: 0,
        tone: 'ember',
      },
      {
        id: 'pen-payment',
        label: '고객 업무 시스템',
        caption: '지급 업무 / Oracle 역할 가정',
        description:
          '설계안: Oracle을 고객 업무 DB로 가정한 논리적 연동 경계입니다. 합의된 API·인터페이스를 통해 처리 결과를 연결하며, 실제 DB 역할과 연동 방식은 확인 대상입니다. 로컬 전송 성공과 실제 지급 업무 완료를 동일하게 취급하지 않습니다.',
        x: 900,
        y: 240,
        tone: 'mute',
      },
      {
        id: 'pen-reconcile',
        label: '조회·대사·복구',
        caption: '성공 여부 불명 · 재시도 소진',
        description:
          '설계안: 응답 유실은 즉시 실패로 확정하지 않고 요청 ID로 상대 결과를 확인합니다. 상대가 멱등키를 지원할 때 같은 키로 재전송하고, 그렇지 않으면 결과 확인 또는 수동 조치가 필요합니다. 일시 장애는 제한된 재시도, 장기 미완료·소진 건은 운영 확인으로 분리합니다.',
        x: 900,
        y: 480,
        tone: 'danger',
      },
    ],
    edges: [
      {
        id: 'pen-e-accept',
        source: 'pen-upload',
        target: 'pen-ledger',
        sourceHandle: 'bottom',
        targetHandle: 'top',
        label: '작업 저장',
      },
      {
        id: 'pen-e-publish',
        source: 'pen-ledger',
        target: 'pen-stream',
        label: 'Outbox 발행',
        animated: true,
      },
      {
        id: 'pen-e-request',
        source: 'pen-stream',
        target: 'pen-inference',
        sourceHandle: 'bottom',
        targetHandle: 'top',
        label: '작업 분배',
      },
      {
        id: 'pen-e-ml',
        source: 'pen-inference',
        target: 'pen-ml',
        sourceHandle: 'bottom',
        targetHandle: 'top',
        label: '추론 요청',
      },
      { id: 'pen-e-result', source: 'pen-ml', target: 'pen-process', label: '결과 수집 후 가공' },
      {
        id: 'pen-e-normalize',
        source: 'pen-process',
        target: 'pen-validation',
        sourceHandle: 'bottom',
        targetHandle: 'top',
        label: '공통 모델',
      },
      {
        id: 'pen-e-validated',
        source: 'pen-validation',
        target: 'pen-integrate',
        label: '검증 통과',
        animated: true,
      },
      {
        id: 'pen-e-review',
        source: 'pen-validation',
        target: 'pen-review',
        sourceHandle: 'bottom',
        targetHandle: 'top',
        label: '확인 필요',
        kind: 'fail',
      },
      {
        id: 'pen-e-reprocess',
        source: 'pen-review',
        target: 'pen-process',
        targetHandle: 'right',
        label: '수정 후 재처리',
        kind: 'retry',
      },
      {
        id: 'pen-e-business',
        source: 'pen-integrate',
        target: 'pen-payment',
        sourceHandle: 'bottom',
        targetHandle: 'top',
        label: '업무 연동',
      },
      {
        id: 'pen-e-unknown',
        source: 'pen-payment',
        target: 'pen-reconcile',
        sourceHandle: 'bottom',
        targetHandle: 'top',
        label: '결과 확인',
        kind: 'fail',
      },
      {
        id: 'pen-e-retry',
        source: 'pen-reconcile',
        target: 'pen-integrate',
        targetHandle: 'right',
        label: '확인 후 복구',
        kind: 'retry',
      },
    ],
  },
  {
    id: 'inference',
    title: '문서 추론',
    subtitle:
      '추론·상태 관리·연동의 구조를 요약한 도식. 기존 분산 처리를 강화하고 상태 관리·재처리를 추가했으며, 특정 기능을 Spring으로 분리했다. 금융권 연동은 별도 프로젝트에서 진행했다.',
    projectId: 'lomin-backend',
    contributions: [
      { label: '기존 기능 강화', description: '워커 분산·병렬 처리' },
      { label: '직접 추가', description: '작업 상태 관리·실패 지점 재처리' },
    ],
    groups: [
      { id: 'inf-g-in', label: 'Ingest', nodeIds: ['inf-nas', 'inf-s3', 'inf-api'] },
      { id: 'inf-g-ad', label: 'Adapter', nodeIds: ['inf-adapter'] },
      { id: 'inf-g-or', label: 'State', nodeIds: ['inf-spring', 'inf-redis'] },
      {
        id: 'inf-g-inf',
        label: 'Inference',
        nodeIds: ['inf-fastfail', 'inf-workers', 'inf-retry'],
      },
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
        description:
          '기존 Python·FastAPI 백엔드의 일부 기능을 직접 분리했습니다. 타입을 일관되게 관리하기 위해 정적 타입 검사와 ORM을 활용했습니다.',
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
        caption: 'FastAPI · 일 추론 대상 약 8만 문서',
        description:
          '기존에 있던 워커 분산·병렬 처리 기능을 강화했습니다. 작업 상태 관리와 재처리는 별도로 추가한 기능입니다.',
        x: 820,
        y: 140,
        tone: 'ok',
      },
      {
        id: 'inf-retry',
        label: 'Retry',
        caption: '스토리지 순간 장애 시 체크포인트부터',
        description:
          '작업 상태 관리와 함께 직접 추가한 재처리 기능입니다. 실패 지점부터 다시 투입해 전체 배치를 재시작하지 않도록 했습니다.',
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
      {
        id: 'e-redis-retry',
        source: 'inf-redis',
        target: 'inf-retry',
        label: 'checkpoint',
        kind: 'retry',
      },
      { id: 'e-rt', source: 'inf-spring', target: 'inf-retry', kind: 'retry' },
      { id: 'e-re', source: 'inf-retry', target: 'inf-workers', label: 'resume', kind: 'retry' },
    ],
  },
  {
    id: 'onprem',
    title: '온프렘 구성',
    subtitle:
      '100개가 넘는 프로젝트의 서비스 버전과 DB 버전을 구분해 기록하고, 그 조합으로 납품 환경을 구성한다.',
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
      {
        id: 'op-cli',
        label: 'Lomin CLI',
        caption: '현장에서 설치 실행',
        x: 540,
        y: 280,
        tone: 'ok',
      },
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
    contributions: [
      { label: '직접 설계·구현', description: '저장 시스템 설계·서버사이드 단독 구현' },
      { label: '협업', description: '클라이언트는 프런트 팀과 협업' },
    ],
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
        description:
          '통신이 끊기면 결제 데이터를 로컬에 보관한 뒤 재전송하도록 구성했습니다. 클라이언트 구현은 프런트 팀과 협업했습니다.',
        x: 300,
        y: 140,
        tone: 'ok',
      },
      {
        id: 'pay-sqs',
        label: 'SQS',
        caption: '전송과 DB 저장을 분리',
        description:
          'KIOSK가 1분마다 미전송분을 Push하던 방식에서 큐 기반 비동기 처리로 전환했습니다. 서버가 큐의 데이터를 받아 DB에 저장합니다.',
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
        caption: '큐에서 받아 DB에 저장',
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
      {
        id: 'pay-rdb',
        label: 'RDB',
        caption: '운영 관측 · 일 최대 40만 건',
        x: 1000,
        y: 200,
        tone: 'mute',
      },
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
    subtitle:
      '3년치 일·분 시세를 한 형태로 모아 두고, 질문에서 종목·기간·지표를 읽어 숫자로 답한다.',
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

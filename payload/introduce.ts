import { IIntroduce } from '../component/introduce/IIntroduce';

const introduce: IIntroduce.Payload = {
  disable: false,

  contents: [
    'Document AI 기업 로민에서 추론 엔진을 중심으로 NAS·S3·API 출처 문서의 배치·분산 처리와 결과 적재를 설계·운영하고 있습니다. FastAPI는 추론에 가까운 Python 레이어에 두고, 오케스트레이션·연동·상태 재처리처럼 계약이 깨지면 재처리 입구가 사라지는 구간은 Spring Kotlin으로 옮겼습니다. 이 경계에서는 런타임 검증(Pydantic)보다 컴파일 타임 계약이 유지보수 비용이 낮았습니다.',
    '그 이전에는 스타트업에 합류해 서비스 구축을 주도했고, 결제·POS 도메인에서 Spring/Kotlin 백엔드 운영 경험을 쌓았습니다. 백엔드를 중심으로 문제를 풀되, AI 추론처럼 새로운 영역을 기존 서비스에 녹여내는 일을 좋아합니다.',
  ],
  sign: '',
  latestUpdated: '2026-08-19',
};

export default introduce;

# 천신영 포트폴리오

백엔드 개발자 천신영의 경력과 프로젝트를 소개하는 정적 웹사이트입니다.
경력 타임라인, 도메인별 필터, 프로젝트 상세 패널과 인터랙티브 아키텍처 다이어그램을 제공합니다.
소개된 AI·결제 서비스의 실제 백엔드 구현은 이 저장소에 포함되지 않습니다.

- 사이트: https://assemblecat.github.io/resume-nextjs/
- Next.js 14 Pages Router, React 18, TypeScript
- Tailwind CSS, Motion, React Flow (`@xyflow/react`)
- `next-seo`, Google Analytics, Luxon

## 설치와 개발

Node.js 버전은 `.nvmrc`의 `20.15.1`을 기준으로 합니다.

```bash
npm ci
npm run dev
```

개발 서버는 기본적으로 http://localhost:3000 에서 실행됩니다.
`.npmrc`의 `legacy-peer-deps=true`는 잠금 파일과 동일한 의존성 설치 방식을 사용하기 위한 설정입니다.

## 구조

```text
pages/
  index.tsx             URL 옵션 해석, SEO, PortfolioPage 렌더링
  _app.tsx              전역 스타일과 Google Analytics
  _document.tsx         문서 언어와 외부 폰트
payload/
  index.ts              현재 화면에서 사용하는 데이터 집합
  types.ts              프로필·경력·프로젝트·기록의 공유 타입
  profile.ts            이름, 사진, 연락처
  experience.ts         회사별 경력과 기술 키워드
  project.ts            업무 및 사이드 프로젝트
  education.ts          학력
  etc.ts                수상 및 자격
  _global.ts            SEO, Open Graph, 파비콘
  views.ts              URL 기반 표시 프리셋과 필터
  flows.ts              프로젝트 다이어그램의 노드·연결·설명
  introduce.ts          보존한 자기소개 편집 원문 (현재 화면에 미연결)
site/
  PortfolioPage.tsx      화면 구성과 선택·필터·이동 상태 관리
  sections/             프로필, 경력, 프로젝트, 기록, 상세 패널 등
  flow/                 React Flow 캔버스와 파이프라인·영역 노드
  lib/                  날짜 계산, 관계 매핑, 그래프 변환, 표시 유틸리티
  styles/globals.css    전역 스타일
  GoogleAnalytics.tsx   방문 분석 스크립트
asset/                  프로필·회사 이미지, 미리보기, 파비콘
public/                 일반·블라인드 이력서 PDF
docs/                  GitHub Pages에 배포할 정적 산출물
shellwork.js            out/ 결과를 docs/에 복사하고 배포 파일 생성
```

데이터 흐름은 `payload → pages/index.tsx → applyResumeView → PortfolioPage → sections / flow`입니다.
현재 UI와 공유 타입은 각각 `site/`, `payload/types.ts`에서 관리합니다.

화면은 내비게이션, 프로필, 대표 프로젝트, 경력 타임라인, 회사별 경력·다른 업무 프로젝트,
아키텍처, 사이드 프로젝트, 학력·수상·자격, 푸터 순서로 구성됩니다.
회사·프로젝트의 상세 버튼이나 그래프 노드를 선택하면 상세 패널이 열립니다.
프로젝트 요약은 목록에 바로 표시하며, 상세 패널에서 처리 흐름을 선택하면 패널을 닫고 해당 다이어그램으로 이동합니다.
다이어그램은 브라우저에서 동적으로 로드하며 확대·이동·미니맵을 지원합니다.
대표 프로젝트는 PC에서 2열(1024px 이상), 작은 화면에서 1열로 표시합니다.
중복 하이라이트 구역은 대표 프로젝트와 각 프로젝트 요약에 통합했습니다.

## 콘텐츠 수정

- 기본 정보, 경력, 프로젝트, 학력·수상은 해당 `payload/*.ts` 파일에서 수정합니다.
- 현재 업무 소개, 상단 기술 태그의 우선순위, 프로젝트와 회사의 관계, 도메인 분류,
  성과 배지는 `site/lib/career.ts`에서 관리합니다.
- 대표 프로젝트 구역은 `site/sections/FeaturedProjects.tsx`에서 관리합니다.
- 다이어그램은 `payload/flows.ts`, 화면 구역 순서는 `site/PortfolioPage.tsx`에서 수정합니다.
- 브라우저 제목과 공유 미리보기는 `payload/_global.ts`, 방문 분석 ID는
  `site/GoogleAnalytics.tsx`에서 설정합니다.
- PDF는 `public/`의 파일을 직접 교체합니다. 웹 콘텐츠에서 자동 생성되지 않습니다.
- `payload/introduce.ts`는 실제 자기소개 원문을 보존한 파일이며 화면용 `Payload`에는
  포함되지 않습니다. 현재 소개를 바꾸려면 `site/lib/career.ts`와 `Hero.tsx`를 확인합니다.

새 프로젝트는 `id`를 정하고 `project.ts`에 추가한 뒤 `career.ts`의 `PROJECT_PARENT`를
설정합니다. 매핑이 없는 프로젝트는 사이드 프로젝트로 분류됩니다.
업무 프로젝트의 `featured: true`는 소개 바로 다음의 대표 프로젝트로 표시합니다.
대표 프로젝트는 경력 구역의 도메인 필터와 독립적으로 표시합니다.
`overview`는 목록과 상세 패널이 공유하는 핵심 설명이며, 없으면 `descriptions`의 대표 문장을 목록에 표시합니다.
`descriptions`에는 요약 이후의 세부 설명을 작성합니다.
필요에 따라 도메인·성과·다이어그램과 `views.ts`의 프리셋도 함께 갱신합니다.
기술 태그는 별도 기술 예시 데이터가 아니라 경력의 `skillKeywords`에서 추립니다.

프로젝트 수와 고객사 수, 추론 대상량과 실제 처리량, 운영 관측값과 시험값을 구분해 작성합니다.
개선율은 비교 기준이 확인되는 경우에만 사용하고, 복구 기능을 데이터 무유실 보장으로 표현하지 않습니다.
본인 기여는 기존 기능 강화·신규 구현·부분 분리·별도 연동 프로젝트를 구분합니다.

## URL 옵션

- `?view=core`: 기본 프리셋.
- `?view=full`: 모든 목록 항목을 포함합니다.
- `?view=game`: 현재 `core`와 동일한 별칭입니다.
- `?hide=spire,stock-agent`: 지정한 ID를 목록에서 제외합니다.
- `?show=spire`: 프리셋에서 제외한 ID를 추가합니다. 같은 ID는 `hide`가 우선합니다.
- `?blind=true`: 학력의 학교명만 가립니다. 이름·사진·연락처·SEO는 유지됩니다.

옵션은 `?view=core&hide=spire&blind=true`처럼 조합할 수 있습니다.
현재 데이터에서는 `core`, `full`, `game`에 포함되는 목록 항목이 같습니다.
`hide`와 `show`는 경력·대표 프로젝트·프로젝트·학력·수상 목록에 적용되며, 별도로 정의된
다이어그램은 필터링하지 않습니다. 이 옵션은 공개 범위를 제한하는 접근 제어가 아닙니다.

## 검증

```bash
npm run lint
npm run typecheck
npm run build
```

- `lint`: `pages/`, `site/`, `payload/`의 TypeScript 코드를 검사합니다.
- `typecheck`: TypeScript 타입을 검사합니다.
- `build`: `prebuild`의 lint를 실행한 뒤 Next.js 프로덕션 정적 빌드를 수행합니다.
- 별도의 자동화 테스트는 아직 없으며, `npm test`는 미구현 상태를 알리고 실패합니다.

CircleCI는 의존성 설치, lint·타입 검사, 정적 내보내기를 실행하도록 구성되어 있습니다.
이전 이력서 UI의 TypeDoc 생성 명령은 제거했습니다.

## 정적 배포

```bash
npm run export
```

1. `preexport`가 `docs/`, `.next/`, `out/`을 정리합니다.
2. `output: 'export'` 설정으로 Next.js가 `out/`에 정적 사이트를 생성합니다.
3. `postexport`의 `shellwork.js`가 결과를 `docs/`로 복사하고 `.nojekyll`을 생성합니다.
4. `homepage`가 사용자 도메인으로 판단되면 `docs/CNAME`도 생성합니다.

`docs/`는 생성 파일이므로 직접 수정하지 않습니다. 콘텐츠 변경 후 내보내기를 실행하고
배포 브랜치의 `docs/`를 GitHub Pages 배포 대상으로 사용합니다.
`npm run build`만 실행하면 `out/`은 생성되지만 `docs/`는 갱신되지 않습니다.
`npm run export`는 별도 lint 명령을 선행하지 않으므로 배포 전 위 검증 명령을 실행합니다.

`package.json`의 `homepage`에서 프로덕션 `basePath`와 `assetPrefix`를 계산합니다.
현재 값은 `/resume-nextjs`이며, 개발 서버에서는 이 접두 경로를 사용하지 않습니다.
호스팅 위치를 바꾸면 `homepage`를 수정하고 다시 빌드해야 합니다.
`npm start`의 `next start`는 이 정적 내보내기 설정의 미리보기 용도가 아닙니다.
미리보기에는 정적 파일 서버를 사용하고, `/resume-nextjs/`가 산출물 디렉터리를 가리키도록 설정합니다.

## 라이선스와 원본

MIT 라이선스입니다. 원본 [uyu423/resume-nextjs](https://github.com/uyu423/resume-nextjs)를 기반으로
개인 포트폴리오 UI를 구성했습니다. 원저작자와 기여자의 저작권 고지는 `LICENSE`를 따릅니다.

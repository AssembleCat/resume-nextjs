# 천신영 포트폴리오

경력 백엔드 개발자의 문제 해결 경험을 소개하는 Next.js 정적 사이트입니다.
업무 시스템의 실제 백엔드 구현은 이 저장소에 포함되지 않습니다.

## 실행과 검증

`.nvmrc` 기준 Node.js 20.15.1을 사용합니다.

```bash
npm ci
npm run dev
npm test
npm run lint
npm run typecheck
npm run build
```

개발 주소는 `http://localhost:3000`, 이력서는 `http://localhost:3000/resume`입니다.
`npm test`는 실제 이력서 HTML을 렌더링해 프로젝트 추가·수정·삭제, 프리셋,
필터, 학교명 비공개와 요약/상세 출력을 검증합니다.
`.npmrc`의 `legacy-peer-deps=true`는 기존 잠금 파일의 설치 방식을 유지합니다.

## 화면 구조

소개 → 경력 타임라인 → 업무 프로젝트 → 사이드 프로젝트 → 학력·수상 순서입니다.
프로젝트의 문제, 요약, 성과는 목록에서 바로 읽을 수 있습니다.
`featured: true`인 대표 프로젝트는 상단에 배치하고 `overview`도 바로 표시합니다.
프로젝트의 “상세 설명과 구조 보기”를 눌러야 상세 구현과 그 프로젝트의 도식이 열립니다.
도식을 선택하는 공통 드롭다운은 없습니다. 도식 데이터가 없는 새 프로젝트도 표시됩니다.
도식은 상세를 펼칠 때 동적으로 로드하고, 노드 설명은 도식 아래에 표시합니다.

경력 타임라인의 회사 버튼은 기본 HTML dialog를 엽니다.
열릴 때 닫기 버튼으로 초점을 이동하고, 배경을 비활성화하며,
Escape/닫기 후 원래 버튼으로 초점을 복귀시킵니다.
패널의 프로젝트를 선택하면 해당 프로젝트 설명을 펼치고 선택 버튼으로 이동합니다.

## 이력서와 PDF 내보내기

소개 영역의 이메일·전화번호·GitHub와 나란히 있는 **이력서** 링크로 이동합니다.
PDF가 필요하면 브라우저 인쇄 메뉴(`Ctrl+P`)에서 **PDF로 저장**을 선택합니다.
A4 용지이며 브라우저의 머리글·바닥글은 끄는 것을 권장합니다.
이력서 화면에는 별도의 표시 옵션이나 PDF 저장 버튼이 없습니다.

- 이력서는 요약으로 표시하며 상세 구현 설명은 포함하지 않습니다.
- `blind` 옵션은 학교명만 가립니다. 이름과 연락처는 그대로 포함됩니다.
- 웹사이트에서 사용한 `view`, `hide`, `show`, `blind` 옵션은 이력서로 이동할 때 유지합니다.
- 도식과 조작 버튼은 이력서 본문에 들어가지 않습니다. 링크는 PDF에서도 자료로 연결됩니다.
- 기존 `public/`의 PDF는 이전에 작성된 독립 파일이며 자동 갱신하지 않습니다.
  새 이력서 경로는 기존 PDF를 읽지 않고 현재 데이터를 렌더링합니다.
- 이미 다운로드한 PDF는 해당 시점의 사본입니다. 데이터를 바꾼 뒤 다시 내보내야 합니다.
- 배포 사이트에 데이터 변경을 반영하려면 다시 빌드·배포해야 합니다.

## 한 번만 수정하는 콘텐츠

`payload`를 포트폴리오와 이력서가 공동으로 사용합니다.

- `payload/profile.ts`: 이름, 직무, 소개 문구, 연락처
- `payload/experience.ts`: 회사·재직 기간·역할·기술
- `payload/project.ts`: 프로젝트 본문, 소속 회사, 성과
- `payload/education.ts`, `payload/etc.ts`: 학력·수상·자격
- `payload/flows.ts`: 선택적으로 제공할 상세 다이어그램

프로젝트 예시:

```ts
{
  id: 'project-id',
  companyId: 'lomin', // experience의 ID. 생략하면 사이드 프로젝트
  title: '프로젝트명',
  where: '회사명',
  startedAt: '2026-11',
  summary: '맡은 역할과 결과를 설명하는 한 문장',
  outcomes: ['근거가 확인된 성과 또는 운영 규모'],
  featured: false,
  descriptions: [{ content: '[구현] 실제 구현 내용' }],
}
```

프로젝트의 추가·수정·삭제는 `payload/project.ts`에서 한 번만 합니다.
회사 연결용 별도 매핑이나 이력서용 허용 목록을 수정할 필요가 없습니다.
성과는 프로젝트의 `outcomes`에 두며 포트폴리오와 이력서가 함께 읽습니다.
소속 회사를 삭제·숨겨도 프로젝트가 남아 있다면 이력서의 기타 프로젝트에 표시합니다.
프로젝트까지 제외하려면 해당 프로젝트를 삭제하거나 `hide`에 지정합니다.

`core`, `full`, `game` 프리셋은 현재 모두 전체 목록을 포함합니다.
`?hide=spire`는 항목 제외, `?show=spire`는 프리셋에서 제외한 항목 추가이며 `hide`가 우선합니다.
`?blind=true`는 학교명만 가리는 표시 옵션으로 접근 제어 기능이 아닙니다.

## 주요 구현 파일

- `pages/index.tsx`: 포트폴리오 진입과 표시 필터
- `pages/resume.tsx`: 요약 이력서 진입과 URL 표시 옵션 적용
- `site/sections/ProjectSection.tsx`: 프로젝트 요약과 펼침 UI
- `site/sections/GraphPlayground.tsx`: 프로젝트 하나의 상세 도식
- `site/sections/DetailDrawer.tsx`: 경력 모달
- `site/lib/resume.ts`: 회사별 프로젝트 분류와 누락 방지
- `site/resume/ResumeDocument.tsx`: 화면·인쇄 공통 문서
- `site/styles/resume.css`: A4 인쇄 서식과 페이지 나눔
- `tests/resume.test.cjs`: 데이터 변경과 문서 반영 회귀 검증

## 배포

```bash
npm run lint
npm run typecheck
npm test
npm run export
```

`npm run build`는 `out/`에 정적 산출물을 생성합니다.
`npm run export`는 기존 `docs/`, `.next/`, `out/`을 정리한 후 빌드하고
`shellwork.js`로 `docs/`에 복사합니다. `docs/`는 직접 수정하지 않습니다.
GitHub Pages는 `docs/`를 배포 대상으로 사용합니다.

`homepage`에 따라 프로덕션 `basePath`는 `/resume-nextjs`이며
이력서 주소는 `/resume-nextjs/resume/`입니다.
개발 서버에서는 접두 경로를 사용하지 않습니다.
정적 산출물 확인에는 정적 서버를 사용합니다. `next start`는 사용하지 않습니다.

## 라이선스

MIT. [uyu423/resume-nextjs](https://github.com/uyu423/resume-nextjs)를 기반으로 구성했습니다.
저작권 고지는 `LICENSE`를 따릅니다.

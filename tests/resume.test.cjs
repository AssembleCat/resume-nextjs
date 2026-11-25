const assert = require('node:assert/strict');
const test = require('node:test');
const fs = require('node:fs');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

// 기존 TypeScript/React 의존성만 사용해 실제 문서 렌더링까지 검증한다.
require.extensions['.ts'] = require.extensions['.tsx'] = (module, filename) => {
  const result = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  });
  module._compile(result.outputText, filename);
};
const { applyResumeView, parseResumeViewQuery } = require('../payload/views.ts');
const { buildResumeModel } = require('../site/lib/resume.ts');
const { ResumeDocument } = require('../site/resume/ResumeDocument.tsx');
const project = require('../payload/project.ts').default;
const experience = require('../payload/experience.ts').default;
const education = require('../payload/education.ts').default;
const etc = require('../payload/etc.ts').default;
function source() {
  return structuredClone({
    profile: { name: { title: '테스트' }, role: 'Backend Engineer', headline: '소개', summary: '요약', contact: [] },
    project, experience, education, etc,
  });
}
function render(data, options = {}) {
  return renderToStaticMarkup(React.createElement(ResumeDocument, { resume: data, isBlind: false, detailed: true, ...options }));
}
function visible(data, query = {}) { return applyResumeView(data, parseResumeViewQuery(query)); }

test('현재 모든 프로젝트가 회사별 경력 또는 독립 프로젝트에 한 번씩 포함된다', () => {
  const data = visible(source());
  const model = buildResumeModel(data);
  const ids = [...model.companies.flatMap((company) => company.projects), ...model.independentProjects].map((item) => item.id);
  assert.deepEqual(ids.slice().sort(), data.project.list.map((item) => item.id).sort());
  const html = render(data);
  for (const id of ids) assert.equal(html.split(`data-project-id="${id}"`).length - 1, 1);
});

test('새 프로젝트는 프리셋·다이어그램 수정 없이 기본 이력서에 나타난다', () => {
  const data = source();
  data.project.list.push({ id: 'new-project', companyId: 'lomin', title: '새 프로젝트', where: '로민', startedAt: '2026-11', summary: '새 요약', outcomes: ['새 성과'], descriptions: [{ content: '새 구현 설명' }] });
  for (const view of ['core', 'full', 'game']) {
    const html = render(visible(data, { view }));
    for (const text of ['새 프로젝트', '새 요약', '새 성과', '새 구현 설명']) assert.ok(html.includes(text));
  }
});

test('수정·삭제가 이력서에 반영되고 오래된 성과가 남지 않는다', () => {
  const data = source();
  const target = data.project.list.find((item) => item.id === 'payment');
  target.title = '수정한 결제 프로젝트';
  target.outcomes = ['수정한 성과'];
  target.descriptions = [{ content: '수정한 상세' }];
  let html = render(visible(data));
  assert.ok(html.includes('수정한 결제 프로젝트') && html.includes('수정한 성과') && html.includes('수정한 상세'));
  assert.ok(!html.includes('일 최대 40만 건'));
  data.project.list = data.project.list.filter((item) => item.id !== 'payment');
  html = render(visible(data));
  assert.ok(!html.includes('data-project-id="payment"'));
  assert.ok(!html.includes('수정한 결제 프로젝트'));
});

test('필터·비활성화를 존중하고 소속 경력을 숨겨도 프로젝트를 누락하지 않는다', () => {
  const data = visible(source(), { hide: 'lomin,spire' });
  const model = buildResumeModel(data);
  assert.ok(model.independentProjects.some((item) => item.id === 'lomin-backend'));
  assert.ok(!render(data).includes('data-project-id="spire"'));
  data.project.disable = true;
  assert.ok(!render(data).includes('data-project-id='));
});

test('학교명 비공개와 요약/상세 출력이 실제 문서에 반영된다', () => {
  const data = source();
  const full = render(data, { isBlind: true });
  assert.ok(!full.includes('한신대학교'));
  assert.ok(full.includes('***대학교'));
  const compact = render(data, { detailed: false });
  assert.ok(full.includes('허용된 포트와 저장소'));
  assert.ok(!compact.includes('허용된 포트와 저장소'));
});

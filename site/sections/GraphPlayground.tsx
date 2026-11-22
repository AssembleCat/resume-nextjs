import dynamic from 'next/dynamic';
import { DIAGRAM_TABS, FlowDiagramId, PipelineDiagram } from '../../payload/flows';
import { IProject } from '../../payload/types';
import { periodLabel } from '../lib/date';

const FlowStage = dynamic(() => import('../flow/FlowStage').then((mod) => mod.FlowStage), {
  ssr: false,
  loading: () => (
    <div className="flex h-[clamp(520px,68vh,760px)] items-center justify-center bg-ink-900 text-sm text-zinc-400">
      그래프를 불러오는 중
    </div>
  ),
});

interface GraphPlaygroundProps {
  diagram: FlowDiagramId;
  diagrams: PipelineDiagram[];
  project: IProject.Payload;
  onDiagramChange: (id: FlowDiagramId) => void;
  nodes: import('../lib/graph').PortfolioNode[];
  edges: import('@xyflow/react').Edge[];
  selectedId?: string;
  onSelect: (id?: string) => void;
  onOpenProject: (id: string) => void;
}

export function GraphPlayground({
  diagram,
  diagrams,
  project,
  onDiagramChange,
  nodes,
  edges,
  selectedId,
  onSelect,
  onOpenProject,
}: GraphPlaygroundProps) {
  const pipeline = diagrams.find((item) => item.id === diagram);
  const currentProject = project.list.find((item) => item.id === pipeline?.projectId);
  const featuredIds = project.list.filter((item) => item.featured).map((item) => item.id);
  const primary = diagrams.filter((item) => featuredIds.includes(item.projectId));
  const other = diagrams.filter((item) => !featuredIds.includes(item.projectId));
  const labelFor = (id: FlowDiagramId) => DIAGRAM_TABS.find((tab) => tab.id === id)?.label || id;
  return (
    <section id="architecture" className="pb-12 pt-6 md:pb-16">
      <div className="mx-auto mb-6 flex max-w-6xl flex-col gap-5 px-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember-400">
            Architecture
          </p>
          <h2
            id="architecture-title"
            tabIndex={-1}
            className="mt-2 font-display text-3xl tracking-tight outline-none md:text-4xl"
          >
            설계와 구현
          </h2>
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex flex-wrap gap-2" aria-label="설계 사례 선택">
            {primary.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={diagram === item.id}
                onClick={() => onDiagramChange(item.id)}
                className={`min-h-11 px-4 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-ember-400 ${diagram === item.id ? 'bg-white text-black' : 'border border-white/20 text-zinc-300'}`}
              >
                {labelFor(item.id)}
              </button>
            ))}
          </div>
          {other.length > 0 ? (
            <div className="flex flex-col gap-1 text-xs text-zinc-400">
              <span id="other-diagram-label">다른 프로젝트 구조</span>
              <select
                id="other-diagram"
                aria-labelledby="other-diagram-label"
                value={other.some((item) => item.id === diagram) ? diagram : ''}
                onChange={(event) => {
                  const next = other.find((item) => item.id === event.target.value);
                  if (next) onDiagramChange(next.id);
                }}
                className="min-h-11 border border-white/20 bg-ink-800 px-3 py-2 text-sm text-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ember-400"
              >
                <option value="" disabled>
                  프로젝트 선택
                </option>
                {other.map((item) => (
                  <option key={item.id} value={item.id}>
                    {labelFor(item.id)}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
        </div>
      </div>
      {currentProject ? (
        <div className="mx-auto mb-6 grid max-w-6xl gap-5 px-5 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
          <div>
            <p className="text-xs text-zinc-400">
              {currentProject.where} ·{' '}
              {periodLabel(currentProject.startedAt, currentProject.endedAt)}
            </p>
            <h3 className="mt-3 max-w-xl break-keep text-2xl font-semibold leading-snug">
              {currentProject.headline || currentProject.title}
            </h3>
            {!pipeline?.contributions && currentProject.summary ? (
              <p className="mt-3 max-w-xl break-keep text-[15px] leading-7 text-zinc-300">
                {currentProject.summary}
              </p>
            ) : null}
            {currentProject.id ? (
              <button
                type="button"
                onClick={() => currentProject.id && onOpenProject(currentProject.id)}
                aria-label={`${currentProject.title} 설계·구현 내용 보기`}
                aria-expanded={selectedId === `project:${currentProject.id}`}
                aria-controls={
                  selectedId === `project:${currentProject.id}` ? 'project-detail' : undefined
                }
                className="mt-2 min-h-11 text-sm text-zinc-300 underline decoration-white/20 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ember-400"
              >
                설계·구현 내용
              </button>
            ) : null}
          </div>
          {pipeline?.contributions ? (
            <dl className="grid content-start gap-4 lg:pt-1" aria-label="본인 기여">
              {pipeline.contributions.map((item) => (
                <div key={item.label} className="border-l-2 border-ember-500/60 pl-3">
                  <dt className="text-xs text-ember-400">{item.label}</dt>
                  <dd className="mt-1 break-keep text-[15px] leading-6 text-zinc-100">
                    {item.description}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      ) : null}
      <p className="mx-auto mb-3 max-w-6xl px-5 text-xs leading-6 text-zinc-400">
        {pipeline?.title} 구조 요약 · 노드 선택으로 설명 보기 · +/− 버튼으로 확대·축소 · 드래그로
        이동
      </p>
      <div className="mx-auto max-w-[1440px] overflow-hidden border-y border-white/10">
        <FlowStage
          key={diagram}
          nodes={nodes}
          edges={edges}
          selectedId={selectedId}
          onSelect={onSelect}
          hint={labelFor(diagram)}
        />
      </div>
      <details
        key={diagram}
        className="mx-auto mt-3 max-w-6xl px-5 text-sm leading-7 text-zinc-400"
      >
        <summary className="w-fit cursor-pointer py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ember-400">
          도식 범위와 프로젝트 설명
        </summary>
        <p className="mt-2 max-w-3xl">{pipeline?.subtitle}</p>
      </details>
    </section>
  );
}

import { IProject } from '../../payload/types';
import { FlowDiagramId } from '../../payload/flows';
import { workProjects } from '../lib/career';
import { periodLabel } from '../lib/date';
import { findPipelineByProjectId } from '../lib/graph';

export function FeaturedProjects({
  project,
  selectedId,
  onOpenDetail,
  onOpenDiagram,
}: {
  project: IProject.Payload;
  selectedId?: string;
  onOpenDetail: (id: string) => void;
  onOpenDiagram: (id: FlowDiagramId) => void;
}) {
  const featured = workProjects(project.list).filter((item) => item.featured);
  if (project.disable || featured.length === 0) return null;
  return (
    <section id="featured" className="mx-auto max-w-6xl px-5 pb-10 pt-8 md:pb-12 md:pt-10">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember-400">Selected work</p>
      <h2 className="mt-2 font-display text-3xl tracking-tight md:text-4xl">대표 경험</h2>
      <div className="mt-7 grid gap-6 lg:grid-cols-2">
        {featured.map((item) => {
          const pipeline = findPipelineByProjectId(item.id);
          const selected = selectedId === `project:${item.id}`;
          return (
            <article
              key={item.id || item.title}
              id={`project-${item.id}`}
              className={`card-frame flex flex-col bg-ink-800 p-6 md:p-7 ${selected ? 'is-active' : ''}`}
            >
              <p className="text-sm text-zinc-400">
                {item.where} · {periodLabel(item.startedAt, item.endedAt)}
              </p>
              <h3 className="mt-4 max-w-lg break-keep text-2xl font-semibold leading-snug lg:min-h-16">
                {item.headline || item.title}
              </h3>
              <p className="mb-6 mt-4 max-w-lg break-keep text-base leading-7 text-zinc-300">
                {item.summary}
              </p>
              <div className="mt-auto flex flex-wrap items-center gap-3">
                {pipeline ? (
                  <button
                    type="button"
                    onClick={() => onOpenDiagram(pipeline.id)}
                    aria-label={`${item.title} 아키텍처 보기`}
                    className="min-h-11 bg-white px-4 py-2 text-sm font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember-400"
                  >
                    아키텍처 보기 <span aria-hidden>↓</span>
                  </button>
                ) : null}
                {item.id ? (
                  <button
                    type="button"
                    onClick={() => item.id && onOpenDetail(item.id)}
                    aria-label={`${item.title} 상세 ${selected ? '닫기' : '보기'}`}
                    aria-expanded={selected}
                    aria-controls={selected ? 'project-detail' : undefined}
                    className="min-h-11 px-3 py-2 text-sm text-zinc-300 underline decoration-white/20 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ember-400"
                  >
                    {selected ? '상세 닫기' : '경험 자세히 보기'}
                  </button>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

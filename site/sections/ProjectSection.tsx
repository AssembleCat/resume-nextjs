import { IProject } from '../../payload/types';
import { sideProjects } from '../lib/career';
import { periodLabel } from '../lib/date';

export function ProjectRow({
  item,
  selected,
  onOpenDetail,
}: {
  item: IProject.Item;
  selected?: boolean;
  onOpenDetail: (id: string) => void;
}) {
  return (
    <article
      id={item.id ? `project-${item.id}` : undefined}
      className={`grid gap-3 border-t border-white/10 py-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-8 ${selected ? 'bg-white/5' : ''}`}
    >
      <div>
        <h3 className="break-keep text-lg font-semibold">{item.title}</h3>
        <p className="mt-1 text-xs text-zinc-400">
          {item.where} · {periodLabel(item.startedAt, item.endedAt)}
        </p>
        <p className="mt-2 max-w-3xl break-keep text-[15px] leading-7 text-zinc-300">
          {item.summary || item.overview?.[0]?.content || item.descriptions[0]?.content}
        </p>
      </div>
      {item.id ? (
        <button
          type="button"
          aria-label={`${item.title} 상세 ${selected ? '닫기' : '보기'}`}
          aria-expanded={Boolean(selected)}
          aria-controls={selected ? 'project-detail' : undefined}
          onClick={() => item.id && onOpenDetail(item.id)}
          className="min-h-11 justify-self-start px-1 text-sm text-zinc-300 underline decoration-white/20 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ember-400"
        >
          {selected ? '상세 닫기' : '자세히 보기'} <span aria-hidden>↗</span>
        </button>
      ) : null}
    </article>
  );
}

export function ProjectSection({
  project,
  selectedId,
  onOpenDetail,
}: {
  project: IProject.Payload;
  selectedId?: string;
  onOpenDetail: (id: string) => void;
}) {
  const side = sideProjects(project.list);
  if (project.disable || side.length === 0) return null;
  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-12 md:py-16">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember-400">Side projects</p>
      <h2 className="mt-2 font-display text-3xl tracking-tight md:text-4xl">
        관심에서 시작한 프로젝트
      </h2>
      <div className="mt-7">
        {side.map((item) => (
          <ProjectRow
            key={item.id || item.title}
            item={item}
            selected={selectedId === `project:${item.id}`}
            onOpenDetail={onOpenDetail}
          />
        ))}
      </div>
    </section>
  );
}

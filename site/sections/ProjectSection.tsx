import { motion } from 'motion/react';
import { IProject } from '../../payload/types';
import { sideProjects, outcomesFor } from '../lib/career';
import { periodLabel } from '../lib/date';
import { DescriptionList } from './DescriptionList';

export function ProjectCard({
  item,
  index,
  selected,
  onOpenDetail,
}: {
  item: IProject.Item;
  index: number;
  selected?: boolean;
  onOpenDetail: (id: string) => void;
}) {
  const outcomes = outcomesFor(item.id);
  const lead = item.descriptions.find((desc) => desc.weight === 'MEDIUM') || item.descriptions[0];
  const fallbackOverview = lead ? [lead] : [];
  const overview = item.overview?.length ? item.overview : fallbackOverview;

  return (
    <motion.article
      id={item.id ? `project-${item.id}` : undefined}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: index * 0.04 }}
      className={`card-frame bg-ink-800 p-5 md:p-6 ${selected ? 'is-active' : ''}`}
    >
      <p className="text-sm text-zinc-400">{item.where}</p>
      <h3 className="mt-2 break-keep text-xl font-semibold leading-snug">{item.title}</h3>
      <p className="mt-2 font-mono text-xs text-zinc-400">{periodLabel(item.startedAt, item.endedAt)}</p>
      {outcomes.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {outcomes.map((outcome) => (
            <span key={outcome} className="bg-ember-500/15 px-3 py-1.5 text-sm text-ember-400">
              {outcome}
            </span>
          ))}
        </div>
      ) : null}
      {overview.length > 0 ? (
        <div className="mt-6 max-w-3xl">
          <DescriptionList items={overview} />
        </div>
      ) : null}
      {item.id ? (
        <button
          type="button"
          aria-label={`${item.title} 상세 ${selected ? '닫기' : '보기'}`}
          aria-expanded={Boolean(selected)}
          aria-controls={selected ? 'project-detail' : undefined}
          onClick={() => item.id && onOpenDetail(item.id)}
          className="chip-frame mt-6 min-h-11 px-4 py-2 text-sm text-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ember-400"
        >
          {selected ? '상세 닫기' : '설계·구현 상세 보기'}
        </button>
      ) : null}
    </motion.article>
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
  if (project.disable) {
    return null;
  }

  const side = sideProjects(project.list);
  if (side.length === 0) {
    return null;
  }

  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-20">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember-400">Side</p>
      <h2 className="mt-2 font-display text-3xl tracking-tight md:text-5xl">사이드 프로젝트</h2>
      <p className="mt-3 text-sm text-zinc-400">프로젝트 요약과 설계·구현 기록</p>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {side.map((item, index) => (
          <ProjectCard
            key={item.id || item.title}
            item={item}
            index={index}
            selected={Boolean(item.id) && selectedId === `project:${item.id}`}
            onOpenDetail={onOpenDetail}
          />
        ))}
      </div>
    </section>
  );
}

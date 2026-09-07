import { motion } from 'motion/react';
import { IProject } from '../../component/project/IProject';
import { sideProjects, outcomesFor } from '../lib/career';
import { periodLabel } from '../lib/date';
import { parseBracketTag } from '../lib/description';

export function ProjectCard({
  item,
  index,
  selected,
  onOpenDetail,
  hideWhere,
}: {
  item: IProject.Item;
  index: number;
  selected?: boolean;
  onOpenDetail: (id: string) => void;
  hideWhere?: boolean;
}) {
  const outcomes = outcomesFor(item.id);
  const lead = item.descriptions.find((desc) => desc.weight === 'MEDIUM') || item.descriptions[0];
  const parsedLead = lead ? parseBracketTag(lead.content) : undefined;

  return (
    <motion.article
      id={item.id ? `project-${item.id}` : undefined}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: index * 0.04 }}
      onClick={() => item.id && onOpenDetail(item.id)}
      className={`card-frame cursor-pointer p-5 md:p-6 ${
        hideWhere ? 'bg-ink-950' : 'bg-ink-800'
      } ${selected ? 'is-active' : ''}`}
    >
      {hideWhere ? null : (
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">{item.where}</p>
      )}
      <h3 className={`text-xl font-semibold leading-snug ${hideWhere ? '' : 'mt-2'}`}>{item.title}</h3>
      <p className="mt-1 font-mono text-xs text-zinc-500">{periodLabel(item.startedAt, item.endedAt)}</p>
      {outcomes.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {outcomes.map((outcome) => (
            <span key={outcome} className="bg-ember-500/15 px-3 py-1.5 text-sm text-ember-400">
              {outcome}
            </span>
          ))}
        </div>
      ) : null}
      {outcomes.length === 0 && parsedLead ? (
        <div className="mt-4">
          {parsedLead.tag ? (
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ember-400">
              {parsedLead.tag}
            </p>
          ) : null}
          <p className={`text-sm leading-relaxed text-zinc-300 ${parsedLead.tag ? 'mt-1' : ''}`}>
            {parsedLead.body}
          </p>
        </div>
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
      <p className="mt-3 font-mono text-xs text-zinc-500">카드를 누르면 상세</p>
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

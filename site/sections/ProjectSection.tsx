import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { IProject } from '../../component/project/IProject';
import { sideProjects } from '../lib/career';
import { findPipelineByProjectId } from '../lib/graph';
import { periodLabel } from '../lib/date';
import { FlowDiagramId } from '../../payload/flows';

export function ProjectCard({
  item,
  index,
  onOpenDiagram,
  hideWhere,
}: {
  item: IProject.Item;
  index: number;
  onOpenDiagram: (id: FlowDiagramId, nodeId?: string) => void;
  hideWhere?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const pipeline = findPipelineByProjectId(item.id);
  const lead = item.descriptions.find((desc) => desc.weight === 'MEDIUM') || item.descriptions[0];
  const rest = item.descriptions.filter((desc) => desc !== lead);

  return (
    <motion.article
      id={item.id ? `project-${item.id}` : undefined}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: index * 0.04 }}
      className={`card-frame flex flex-col p-6 ${hideWhere ? 'bg-ink-950' : 'bg-ink-800'}`}
    >
      {hideWhere ? null : (
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">{item.where}</p>
      )}
      <h3 className={`text-xl font-semibold leading-snug ${hideWhere ? '' : 'mt-2'}`}>{item.title}</h3>
      <p className="mt-1 font-mono text-xs text-zinc-500">{periodLabel(item.startedAt, item.endedAt)}</p>
      {lead ? <p className="mt-4 text-sm leading-relaxed text-zinc-300">{lead.content}</p> : null}
      <AnimatePresence initial={false}>
        {open && rest.length > 0 ? (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.26, 0.02, 0.23, 0.94] }}
            className="mt-3 space-y-2 overflow-hidden text-sm leading-relaxed text-zinc-400"
          >
            {rest.map((desc) => (
              <li key={desc.content}>{desc.content}</li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
      <div className="mt-5 flex flex-wrap gap-2">
        {pipeline ? (
          <button
            type="button"
            onClick={() => onOpenDiagram(pipeline.id, item.id ? `project:${item.id}` : undefined)}
            className="bg-white px-3 py-1.5 text-xs font-semibold text-black"
          >
            처리 흐름
          </button>
        ) : null}
        {rest.length > 0 ? (
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="chip-frame px-3 py-1.5 text-xs text-zinc-300"
          >
            {open ? '접기' : '더 보기'}
          </button>
        ) : null}
        {item.href ? (
          <a
            href={item.href}
            className="chip-frame px-3 py-1.5 text-xs text-zinc-300"
          >
            링크
          </a>
        ) : null}
      </div>
    </motion.article>
  );
}

export function ProjectSection({
  project,
  onOpenDiagram,
}: {
  project: IProject.Payload;
  onOpenDiagram: (id: FlowDiagramId, nodeId?: string) => void;
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
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {side.map((item, index) => (
          <ProjectCard key={item.id || item.title} item={item} index={index} onOpenDiagram={onOpenDiagram} />
        ))}
      </div>
    </section>
  );
}

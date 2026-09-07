import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { IExperience } from '../../component/experience/IExperience';
import { IProject } from '../../component/project/IProject';
import { IEtc } from '../../component/etc/IEtc';
import { IRow } from '../../component/common/IRow';
import { FlowDiagramId, PIPELINE_DIAGRAMS } from '../../payload/flows';
import { happenedAt, periodLabel } from '../lib/date';
import { findPipelineByProjectId } from '../lib/graph';
import { outcomesFor, projectsForCompany } from '../lib/career';
import { CompanyName } from './CompanyName';
import { DescriptionList } from './DescriptionList';

interface Related {
  id: string;
  title: string;
}

interface Detail {
  kicker: string;
  title: string;
  caption?: string;
  summary?: string;
  items: IRow.Description[];
  href?: string;
  tags?: string[];
  outcomes?: string[];
  related?: Related[];
  relatedKicker?: string;
  diagramId?: FlowDiagramId;
  linkLabel?: string;
}

export function parseSelection(
  selectedId: string | undefined,
  experience: IExperience.Payload,
  project: IProject.Payload,
  etc: IEtc.Payload,
): Detail | undefined {
  if (!selectedId) {
    return undefined;
  }
  if (selectedId.startsWith('exp:')) {
    const id = selectedId.slice(4);
    const company = experience.list.find((item) => item.id === id);
    const position = company?.positions[0];
    if (!company || !position) {
      return undefined;
    }
    return {
      kicker: 'Experience',
      title: company.title,
      caption: `${position.title} · ${periodLabel(position.startedAt, position.endedAt)}`,
      items: position.descriptions,
      href: company.href,
      tags: position.skillKeywords,
      outcomes: outcomesFor(id),
      related: projectsForCompany(project.list, id)
        .filter((item) => item.id)
        .map((item) => ({ id: `project:${item.id}`, title: item.title })),
      relatedKicker: 'Projects',
      linkLabel: '회사 홈페이지',
    };
  }
  if (selectedId.startsWith('project:')) {
    const id = selectedId.slice(8);
    const item = project.list.find((entry) => entry.id === id);
    if (!item) {
      return undefined;
    }
    const pipeline = findPipelineByProjectId(item.id);
    return {
      kicker: 'Project',
      title: item.title,
      caption: `${item.where} · ${periodLabel(item.startedAt, item.endedAt)}`,
      items: item.descriptions,
      href: item.href,
      outcomes: outcomesFor(id),
      diagramId: pipeline?.id,
      linkLabel: '관련 링크',
    };
  }
  if (selectedId.startsWith('award:')) {
    const id = selectedId.slice(6);
    const item = etc.list.find((entry) => entry.id === id);
    if (!item) {
      return undefined;
    }
    return {
      kicker: 'Award',
      title: item.title,
      caption: `${item.subTitle} · ${happenedAt(item.startedAt, item.endedAt)}`,
      items: [],
    };
  }
  const pipeline = PIPELINE_DIAGRAMS.find((diagram) =>
    diagram.nodes.some((node) => node.id === selectedId),
  );
  if (pipeline) {
    const node = pipeline.nodes.find((entry) => entry.id === selectedId);
    return {
      kicker: pipeline.title,
      title: node?.label || pipeline.title,
      caption: node?.caption,
      summary: pipeline.subtitle,
      items: [],
    };
  }
  return undefined;
}

export function DetailDrawer({
  selectedId,
  experience,
  project,
  etc,
  onSelect,
  onOpenDiagram,
}: {
  selectedId?: string;
  experience: IExperience.Payload;
  project: IProject.Payload;
  etc: IEtc.Payload;
  onSelect: (id?: string) => void;
  onOpenDiagram: (id: FlowDiagramId, nodeId?: string) => void;
}) {
  const detail = parseSelection(selectedId, experience, project, etc);

  useEffect(() => {
    if (!detail) {
      return undefined;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onSelect(undefined);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [detail, onSelect]);

  return (
    <AnimatePresence mode="wait">
      {detail ? (
        <motion.aside
          key={detail.title}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
          className="fixed inset-y-0 right-0 z-50 w-full max-w-md overflow-y-auto border-l border-white/10 bg-ink-800 p-6 shadow-2xl shadow-black/50"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ember-400">
                {detail.kicker}
              </p>
              <h3 className="mt-2 text-xl font-semibold leading-snug">
                <CompanyName title={detail.title} href={detail.href} />
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onSelect(undefined)}
              className="chip-frame px-3 py-1.5 text-xs text-zinc-400"
            >
              닫기
            </button>
          </div>
          {detail.caption ? <p className="mt-3 text-xs text-zinc-500">{detail.caption}</p> : null}
          {detail.outcomes && detail.outcomes.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {detail.outcomes.map((item) => (
                <span key={item} className="bg-ember-500/15 px-2.5 py-1 text-[11px] text-ember-400">
                  {item}
                </span>
              ))}
            </div>
          ) : null}
          {detail.summary ? (
            <p className="mt-6 text-sm leading-relaxed text-zinc-300">{detail.summary}</p>
          ) : null}
          {detail.items.length > 0 ? (
            <div className="mt-6">
              <DescriptionList items={detail.items} />
            </div>
          ) : null}
          {detail.tags && detail.tags.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-1.5">
              {detail.tags.map((tag) => (
                <span key={tag} className="bg-white/5 px-2 py-1 text-[11px] text-zinc-300">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
          {detail.related && detail.related.length > 0 ? (
            <div className="mt-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                {detail.relatedKicker || 'Related'}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {detail.related.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelect(item.id)}
                    className="chip-frame px-2.5 py-1 text-left text-[11px] text-zinc-300"
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
          <div className="mt-5 flex flex-wrap gap-2">
            {detail.diagramId ? (
              <button
                type="button"
                onClick={() => {
                  if (!detail.diagramId) {
                    return;
                  }
                  onOpenDiagram(detail.diagramId, selectedId);
                }}
                className="bg-white px-3 py-1.5 text-xs font-semibold text-black"
              >
                처리 흐름
              </button>
            ) : null}
            {detail.href ? (
              <a
                href={detail.href}
                className="chip-frame px-3 py-1.5 text-xs text-ember-400"
              >
                {detail.linkLabel || '관련 링크'}
              </a>
            ) : null}
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}

import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import dynamic from 'next/dynamic';
import { IExperience } from '../../component/experience/IExperience';
import { IProject } from '../../component/project/IProject';
import { IEtc } from '../../component/etc/IEtc';
import { IRow } from '../../component/common/IRow';
import { DIAGRAM_TABS, FlowDiagramId, PIPELINE_DIAGRAMS } from '../../payload/flows';
import { happenedAt, periodLabel } from '../lib/date';
import { CompanyName } from './CompanyName';

const FlowStage = dynamic(() => import('../flow/FlowStage').then((mod) => mod.FlowStage), {
  ssr: false,
  loading: () => (
    <div className="flex h-[clamp(620px,78vh,900px)] items-center justify-center border-y border-white/10 bg-ink-900 text-sm text-zinc-500">
      그래프를 불러오는 중
    </div>
  ),
});

interface Detail {
  kicker: string;
  title: string;
  caption?: string;
  summary?: string;
  items: IRow.Description[];
  href?: string;
  tags?: string[];
}

function parseSelection(
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
    };
  }
  if (selectedId.startsWith('project:')) {
    const id = selectedId.slice(8);
    const item = project.list.find((entry) => entry.id === id);
    if (!item) {
      return undefined;
    }
    return {
      kicker: 'Project',
      title: item.title,
      caption: `${item.where} · ${periodLabel(item.startedAt, item.endedAt)}`,
      items: item.descriptions,
      href: item.href,
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

function DescriptionList({ items }: { items: IRow.Description[] }) {
  if (items.length === 0) {
    return null;
  }
  return (
    <ul className="space-y-2.5 text-sm leading-relaxed text-zinc-300">
      {items.map((item) => (
        <li key={item.content} className={item.weight === 'MEDIUM' ? 'text-zinc-100' : ''}>
          {item.href ? (
            <a href={item.href} className="underline decoration-white/20 underline-offset-4">
              {item.content}
            </a>
          ) : (
            item.content
          )}
        </li>
      ))}
    </ul>
  );
}

interface GraphPlaygroundProps {
  diagram: FlowDiagramId;
  onDiagramChange: (id: FlowDiagramId) => void;
  nodes: import('../lib/graph').PortfolioNode[];
  edges: import('@xyflow/react').Edge[];
  selectedId?: string;
  onSelect: (id?: string) => void;
  experience: IExperience.Payload;
  project: IProject.Payload;
  etc: IEtc.Payload;
}

export function GraphPlayground({
  diagram,
  onDiagramChange,
  nodes,
  edges,
  selectedId,
  onSelect,
  experience,
  project,
  etc,
}: GraphPlaygroundProps) {
  const detail = parseSelection(selectedId, experience, project, etc);
  const meta = DIAGRAM_TABS.find((tab) => tab.id === diagram);
  const pipeline = PIPELINE_DIAGRAMS.find((item) => item.id === diagram);

  return (
    <section id="architecture" className="w-full py-16">
      <div className="mx-auto mb-8 flex max-w-6xl flex-col gap-4 px-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember-400">
            Architecture
          </p>
          <h2 className="mt-2 font-display text-3xl tracking-tight md:text-5xl">
            아키텍쳐로 보기
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
            {pipeline?.subtitle || '프로젝트별 처리 흐름입니다.'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
        <LayoutGroup>
          {DIAGRAM_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                onDiagramChange(tab.id);
                onSelect(undefined);
              }}
              className={`group relative px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] ${
                diagram === tab.id ? 'text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {diagram === tab.id ? (
                <motion.span
                  layoutId="diagram-tab"
                  className="absolute inset-0 bg-white"
                />
              ) : (
                <span className="absolute inset-0 border border-white/10 transition-colors duration-200 group-hover:border-ember-500/50" />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </LayoutGroup>
        </div>
      </div>
      <div className="w-full">
        <FlowStage
          key={diagram}
          nodes={nodes}
          edges={edges}
          selectedId={selectedId}
          onSelect={onSelect}
          hint={meta?.label || 'drag · zoom · click'}
        />
      </div>
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
            {detail.summary ? (
              <p className="mt-6 text-sm leading-relaxed text-zinc-300">{detail.summary}</p>
            ) : null}
            {detail.items.length > 0 ? (
              <div className="mt-6">
                <DescriptionList items={detail.items} />
              </div>
            ) : null}
            {detail.tags ? (
              <div className="mt-6 flex flex-wrap gap-1.5">
                {detail.tags.map((tag) => (
                  <span key={tag} className="bg-white/5 px-2 py-1 text-[11px]">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
            {detail.href ? (
              <a
                href={detail.href}
                className="mt-5 inline-block text-sm text-ember-400 underline-offset-4 hover:underline"
              >
                {detail.kicker === 'Experience' ? '회사 홈페이지' : '관련 링크'}
              </a>
            ) : null}
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

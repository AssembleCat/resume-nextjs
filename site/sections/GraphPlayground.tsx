import { LayoutGroup, motion } from 'motion/react';
import dynamic from 'next/dynamic';
import { DIAGRAM_TABS, FlowDiagramId, PIPELINE_DIAGRAMS } from '../../payload/flows';

const FlowStage = dynamic(() => import('../flow/FlowStage').then((mod) => mod.FlowStage), {
  ssr: false,
  loading: () => (
    <div className="flex h-[clamp(620px,78vh,900px)] items-center justify-center border-y border-white/10 bg-ink-900 text-sm text-zinc-500">
      그래프를 불러오는 중
    </div>
  ),
});

interface GraphPlaygroundProps {
  diagram: FlowDiagramId;
  onDiagramChange: (id: FlowDiagramId) => void;
  nodes: import('../lib/graph').PortfolioNode[];
  edges: import('@xyflow/react').Edge[];
  selectedId?: string;
  onSelect: (id?: string) => void;
}

export function GraphPlayground({
  diagram,
  onDiagramChange,
  nodes,
  edges,
  selectedId,
  onSelect,
}: GraphPlaygroundProps) {
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
    </section>
  );
}

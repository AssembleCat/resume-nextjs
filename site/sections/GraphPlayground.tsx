import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { PipelineDiagram } from '../../payload/flows';
import { buildPipelineGraph } from '../lib/graph';

const FlowStage = dynamic(() => import('../flow/FlowStage').then((mod) => mod.FlowStage), {
  ssr: false,
  loading: () => (
    <p className="flex h-96 items-center justify-center text-zinc-400" role="status">
      구조를 불러오는 중입니다.
    </p>
  ),
});

/** 하나의 프로젝트에만 속하는 보조 설명. 목록에서 펼친 경우에만 마운트한다. */
export function GraphPlayground({ pipeline }: { pipeline: PipelineDiagram }) {
  const graph = useMemo(() => buildPipelineGraph(pipeline), [pipeline]);
  const [selectedId, setSelectedId] = useState<string>();
  const node = pipeline.nodes.find((item) => item.id === selectedId);
  return (
    <div className="mt-8 border-t border-white/10 pt-6">
      <h4 className="text-lg font-semibold">처리 구조와 구성 요소</h4>
      <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">{pipeline.subtitle}</p>
      {pipeline.contributions ? (
        <dl className="my-5 flex flex-wrap gap-x-10 gap-y-3">
          {pipeline.contributions.map((item) => (
            <div key={item.label}>
              <dt className="text-sm text-ember-400">{item.label}</dt>
              <dd className="mt-1 text-sm text-zinc-200">{item.description}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      <p className="mb-3 text-sm text-zinc-400">
        구성 요소를 선택하면 아래에 설명이 표시됩니다. 확대·축소 버튼과 드래그로 살펴볼 수 있습니다.
      </p>
      <FlowStage
        nodes={graph.nodes}
        edges={graph.edges}
        selectedId={selectedId}
        onSelect={setSelectedId}
        hint={pipeline.title}
      />
      <div aria-live="polite" aria-atomic="true">
        {node ? (
          <div className="mt-4 border-l-2 border-ember-500 pl-4">
            <h5 className="font-semibold">{node.label}</h5>
            <p className="mt-2 text-sm leading-7 text-zinc-300">
              {node.description || node.caption}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

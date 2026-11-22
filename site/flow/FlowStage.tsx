import { Edge, ReactFlowProvider } from '@xyflow/react';
import { FlowCanvas } from './FlowCanvas';
import { PortfolioNode } from '../lib/graph';

interface Props {
  nodes: PortfolioNode[];
  edges: Edge[];
  selectedId?: string;
  onSelect: (id?: string) => void;
  hint: string;
}

export function FlowStage({ nodes, edges, selectedId, onSelect, hint }: Props) {
  return (
    <div className="h-[clamp(520px,68vh,760px)] w-full overflow-hidden bg-ink-900">
      <ReactFlowProvider>
        <FlowCanvas
          nodes={nodes}
          edges={edges}
          selectedId={selectedId}
          onSelect={onSelect}
          hint={hint}
        />
      </ReactFlowProvider>
    </div>
  );
}

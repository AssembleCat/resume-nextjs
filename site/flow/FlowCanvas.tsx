import { useEffect, useMemo } from 'react';
import {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  MiniMap,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { portfolioNodeTypes } from './nodeTypes';
import { PortfolioNode } from '../lib/graph';

interface FlowCanvasProps {
  nodes: PortfolioNode[];
  edges: Edge[];
  selectedId?: string;
  onSelect: (id?: string) => void;
  hint: string;
}

export function FlowCanvas({ nodes, edges, selectedId, onSelect, hint }: FlowCanvasProps) {
  const { fitView } = useReactFlow();
  const markedNodes = useMemo(
    () =>
      nodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          selected: node.id === selectedId,
        },
      })),
    [nodes, selectedId],
  );
  const [rfNodes, setRfNodes, onNodesChange] = useNodesState(markedNodes);
  const [rfEdges, setRfEdges, onEdgesChange] = useEdgesState(edges);

  useEffect(() => {
    setRfNodes(markedNodes);
  }, [markedNodes, setRfNodes]);

  useEffect(() => {
    setRfEdges(edges);
    const timer = window.setTimeout(() => {
      fitView({ padding: 0.08, duration: 400 });
    }, 50);
    return () => window.clearTimeout(timer);
  }, [edges, fitView, setRfEdges]);

  return (
    <ReactFlow
      nodes={rfNodes}
      edges={rfEdges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={portfolioNodeTypes}
      onNodeClick={(_, node) => onSelect(node.id)}
      onPaneClick={() => onSelect(undefined)}
      fitView
      minZoom={0.25}
      maxZoom={1.45}
      colorMode="dark"
      proOptions={{ hideAttribution: true }}
      nodesConnectable={false}
      elevateNodesOnSelect={false}
    >
      <Background variant={BackgroundVariant.Dots} gap={22} size={1} color="#2a2a2a" />
      <Controls showInteractive={false} />
      <MiniMap
        pannable
        zoomable
        maskColor="rgba(0,0,0,0.55)"
        nodeColor={() => '#ff4d00'}
        bgColor="#111"
      />
      <Panel position="top-left">
        <p className="border border-white/10 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-400">
          {hint}
        </p>
      </Panel>
    </ReactFlow>
  );
}

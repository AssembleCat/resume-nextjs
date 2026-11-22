import { Handle, Node, NodeProps, Position } from '@xyflow/react';
import { PortfolioNodeData } from '../lib/graph';

type FlowNodeProps = NodeProps<Node<PortfolioNodeData>>;

function selectedRing(selected?: boolean) {
  return selected
    ? 'shadow-ember ring-1 ring-ember-500/70'
    : 'ring-1 ring-white/10 transition-[box-shadow] duration-200 hover:ring-ember-500/50';
}

const TONE_CLASS: Record<string, string> = {
  ember: 'border-ember-500/50 bg-ember-500/10',
  mute: 'border-white/10 bg-ink-800',
  danger: 'border-red-500/40 bg-red-500/10',
  ok: 'border-emerald-400/30 bg-emerald-400/10',
};

export function PipelineNode({ data }: FlowNodeProps) {
  const tone = TONE_CLASS[data.tone || 'mute'];
  return (
    <div
      className={`w-[210px] border px-4 py-3 transition-colors duration-200 hover:border-ember-500/50 ${tone} ${selectedRing(data.selected)}`}
    >
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <p className="text-base font-semibold leading-snug">{data.label}</p>
      <p className="mt-1 break-keep text-[13px] leading-5 text-zinc-300">{data.caption}</p>
    </div>
  );
}

const REGION_FILL: Record<string, string> = {
  ember: 'border-ember-500/25 bg-ember-500/[0.06]',
  mute: 'border-white/10 bg-white/[0.035]',
};

export function RegionNode({ data }: FlowNodeProps) {
  const fill = REGION_FILL[data.tone || 'mute'];
  return (
    <div className={`relative h-full w-full ${fill}`}>
      <div
        className={`absolute inset-y-0 left-0 w-[3px] ${
          data.tone === 'ember' ? 'bg-ember-500/70' : 'bg-white/25'
        }`}
      />
      <div className="px-4 pt-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-400">
          {data.label}
        </p>
      </div>
    </div>
  );
}

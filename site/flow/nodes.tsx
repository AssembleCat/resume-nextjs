import { Handle, Node, NodeProps, Position } from '@xyflow/react';
import { PortfolioNodeData } from '../lib/graph';

type FlowNodeProps = NodeProps<Node<PortfolioNodeData>>;

function selectedRing(selected?: boolean) {
  return selected ? 'shadow-ember ring-1 ring-ember-500/70' : 'ring-1 ring-white/10';
}

export function PersonNode({ data }: FlowNodeProps) {
  return (
    <div
      className={`w-[240px] bg-ink-800 px-3 py-3 ${selectedRing(data.selected)}`}
    >
      <Handle type="source" position={Position.Bottom} />
      <div className="flex items-center gap-3">
        {data.imageSrc ? (
          <img
            src={data.imageSrc}
            alt={data.label}
            className="h-12 w-12 object-cover ring-1 ring-white/10"
          />
        ) : null}
        <div>
          <p className="font-display text-base leading-tight">{data.label}</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">
            {data.caption}
          </p>
        </div>
      </div>
    </div>
  );
}

export function CompanyNode({ data }: FlowNodeProps) {
  return (
    <div className={`w-[250px] bg-ink-700 px-4 py-3 ${selectedRing(data.selected)}`}>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <Handle type="source" position={Position.Bottom} />
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ember-400">Company</p>
      <p className="mt-1 text-[15px] font-semibold leading-snug">{data.label}</p>
      <p className="mt-1 text-xs leading-relaxed text-zinc-400">{data.caption}</p>
      {data.tags && data.tags.length > 0 ? (
        <div className="mt-2 flex flex-wrap gap-1">
          {data.tags.map((tag) => (
            <span key={tag} className="bg-white/5 px-2 py-0.5 text-[10px] text-zinc-300">
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function ProjectNode({ data }: FlowNodeProps) {
  return (
    <div className={`w-[236px] bg-ink-800 px-4 py-3 ${selectedRing(data.selected)}`}>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">Project</p>
      <p className="mt-1 text-sm font-semibold leading-snug">{data.label}</p>
      <p className="mt-1 text-[11px] leading-relaxed text-zinc-400">{data.caption}</p>
    </div>
  );
}

export function AwardNode({ data }: FlowNodeProps) {
  return (
    <div
      className={`w-[236px] bg-ember-500/10 px-4 py-3 ${
        data.selected ? 'shadow-ember ring-1 ring-ember-500' : 'ring-1 ring-ember-500/40'
      }`}
    >
      <Handle type="target" position={Position.Top} />
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ember-400">Award</p>
      <p className="mt-1 text-sm font-semibold leading-snug">{data.label}</p>
      <p className="mt-1 text-[11px] text-ember-300/80">{data.caption}</p>
    </div>
  );
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
    <div className={`w-[210px] border px-4 py-3 ${tone} ${selectedRing(data.selected)}`}>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <p className="text-sm font-semibold leading-snug">{data.label}</p>
      <p className="mt-1 text-[11px] leading-relaxed text-zinc-400">{data.caption}</p>
    </div>
  );
}

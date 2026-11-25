import { Edge, Node } from '@xyflow/react';
import { PIPELINE_DIAGRAMS, PipelineDiagram } from '../../payload/flows';

export type PortfolioNodeType = 'pipeline' | 'region';

export interface PortfolioNodeData {
  [key: string]: unknown;
  kind: PortfolioNodeType;
  label: string;
  caption?: string;
  selected?: boolean;
  tone?: 'ember' | 'mute' | 'danger' | 'ok';
  entityId?: string;
}

export type PortfolioNode = Node<PortfolioNodeData, PortfolioNodeType>;

const PIPE_NODE_WIDTH = 210;
const GROUP_PAD_X = 22;
const GROUP_PAD_TOP = 36;
const GROUP_PAD_BOTTOM = 22;

function estimatedNodeHeight(caption?: string): number {
  const lines = Math.max(3, Math.ceil((caption || '').length / 26));
  return Math.max(108, 48 + lines * 17);
}

export function buildPipelineGraph(diagram: PipelineDiagram): {
  nodes: PortfolioNode[];
  edges: Edge[];
} {
  const byId = new Map(diagram.nodes.map((node) => [node.id, node]));
  const groupedIds = new Set<string>();
  const nodes: PortfolioNode[] = [];

  diagram.groups.forEach((group, index) => {
    const members = group.nodeIds
      .map((id) => byId.get(id))
      .filter((item): item is NonNullable<typeof item> => Boolean(item));
    if (members.length === 0) {
      return;
    }
    members.forEach((member) => groupedIds.add(member.id));

    const minX = Math.min(...members.map((member) => member.x));
    const minY = Math.min(...members.map((member) => member.y));
    const maxX = Math.max(...members.map((member) => member.x + PIPE_NODE_WIDTH));
    const maxY = Math.max(
      ...members.map((member) => member.y + estimatedNodeHeight(member.caption)),
    );
    const originX = minX - GROUP_PAD_X;
    const originY = minY - GROUP_PAD_TOP;
    const width = maxX - minX + GROUP_PAD_X * 2;
    const height = maxY - minY + GROUP_PAD_TOP + GROUP_PAD_BOTTOM;

    nodes.push({
      id: group.id,
      type: 'region',
      position: { x: originX, y: originY },
      draggable: false,
      selectable: false,
      focusable: false,
      connectable: false,
      style: { width, height },
      data: {
        kind: 'region',
        label: group.label,
        caption: group.caption,
        tone: index % 2 === 0 ? 'mute' : 'ember',
      },
    });

    members.forEach((member) => {
      nodes.push({
        id: member.id,
        type: 'pipeline',
        parentId: group.id,
        extent: 'parent',
        position: { x: member.x - originX, y: member.y - originY },
        data: {
          kind: 'pipeline',
          label: member.label,
          caption: member.caption,
          tone: member.tone,
          entityId: diagram.projectId,
        },
      });
    });
  });

  diagram.nodes.forEach((node) => {
    if (groupedIds.has(node.id)) {
      return;
    }
    nodes.push({
      id: node.id,
      type: 'pipeline',
      position: { x: node.x, y: node.y },
      data: {
        kind: 'pipeline',
        label: node.label,
        caption: node.caption,
        tone: node.tone,
        entityId: diagram.projectId,
      },
    });
  });

  return {
    nodes,
    edges: diagram.edges.map((edge) => {
      const sidePath = edge.kind === 'fail' || edge.kind === 'retry';
      return {
        id: edge.id,
        source: edge.source,
        target: edge.target,
        label: edge.label,
        animated: !sidePath && Boolean(edge.animated),
        className: edge.kind,
      };
    }),
  };
}

export function findPipelineByProjectId(projectId?: string): PipelineDiagram | undefined {
  if (!projectId) {
    return undefined;
  }
  return PIPELINE_DIAGRAMS.find((diagram) => diagram.projectId === projectId);
}

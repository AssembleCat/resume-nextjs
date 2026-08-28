import { Edge, Node } from '@xyflow/react';
import { IExperience } from '../../component/experience/IExperience';
import { IProject } from '../../component/project/IProject';
import { IEtc } from '../../component/etc/IEtc';
import { IProfile } from '../../component/profile/IProfile';
import { PROJECT_PARENT } from './career';
import { periodLabel } from './date';
import { assetSrc } from './format';
import { PIPELINE_DIAGRAMS, PipelineDiagram } from '../../payload/flows';

export type PortfolioNodeType = 'person' | 'company' | 'project' | 'award' | 'pipeline' | 'region';

export interface PortfolioNodeData {
  [key: string]: unknown;
  kind: PortfolioNodeType;
  label: string;
  caption?: string;
  tags?: string[];
  href?: string;
  imageSrc?: string;
  selected?: boolean;
  tone?: 'ember' | 'mute' | 'danger' | 'ok';
  entityId?: string;
}

export type PortfolioNode = Node<PortfolioNodeData, PortfolioNodeType>;

export function buildCareerGraph(input: {
  profile: IProfile.Payload;
  experience: IExperience.Payload;
  project: IProject.Payload;
  etc: IEtc.Payload;
}): { nodes: PortfolioNode[]; edges: Edge[] } {
  const nodes: PortfolioNode[] = [];
  const edges: Edge[] = [];
  const companies = [...input.experience.list].reverse();
  const columnGap = 360;
  const companyY = 240;
  const projectY = 540;
  const projectRowGap = 220;

  nodes.push({
    id: 'person',
    type: 'person',
    position: { x: 60, y: 50 },
    data: {
      kind: 'person',
      label: input.profile.name.title,
      caption: 'Backend Engineer',
      imageSrc: assetSrc(input.profile.image),
    },
  });

  companies.forEach((company, index) => {
    const companyId = company.id || `exp-${index}`;
    const position = company.positions[0];
    const x = 60 + index * columnGap;
    nodes.push({
      id: `exp:${companyId}`,
      type: 'company',
      position: { x, y: companyY },
      data: {
        kind: 'company',
        label: company.title,
        caption: position
          ? `${position.title} · ${periodLabel(position.startedAt, position.endedAt)}`
          : company.title,
        tags: position?.skillKeywords?.slice(0, 4),
        href: company.href,
        entityId: companyId,
      },
    });

    if (index === 0) {
      edges.push({
        id: 'e-person-first',
        source: 'person',
        target: `exp:${companyId}`,
      });
    } else {
      const prev = companies[index - 1];
      const prevId = prev.id || `exp-${index - 1}`;
      edges.push({
        id: `e-exp-${prevId}-${companyId}`,
        source: `exp:${prevId}`,
        target: `exp:${companyId}`,
        animated: index === companies.length - 1,
      });
    }
  });

  const grouped = new Map<string, IProject.Item[]>();
  input.project.list.forEach((project) => {
    const parent = (project.id && PROJECT_PARENT[project.id]) || 'side';
    const list = grouped.get(parent) || [];
    list.push(project);
    grouped.set(parent, list);
  });

  companies.forEach((company) => {
    const companyId = company.id || '';
    const projects = grouped.get(companyId) || [];
    const companyIndex = companies.findIndex((item) => item.id === companyId);
    projects.forEach((project, projectIndex) => {
      const projectId = project.id || project.title;
      const x = 60 + Math.max(companyIndex, 0) * columnGap + 18;
      const y = projectY + projectIndex * projectRowGap;
      nodes.push({
        id: `project:${projectId}`,
        type: 'project',
        position: { x, y },
        data: {
          kind: 'project',
          label: project.title,
          caption: `${project.where} · ${periodLabel(project.startedAt, project.endedAt)}`,
          href: project.href,
          entityId: projectId,
        },
      });
      edges.push({
        id: `e-${companyId}-${projectId}`,
        source: `exp:${companyId}`,
        target: `project:${projectId}`,
      });
    });
  });

  const sideProjects = grouped.get('side') || [];
  const sideX = 60 + companies.length * columnGap;
  sideProjects.forEach((project, index) => {
    const projectId = project.id || project.title;
    nodes.push({
      id: `project:${projectId}`,
      type: 'project',
      position: { x: sideX, y: companyY + index * 280 },
      data: {
        kind: 'project',
        label: project.title,
        caption: `${project.where} · ${periodLabel(project.startedAt, project.endedAt)}`,
        href: project.href,
        entityId: projectId,
      },
    });
  });

  if (sideProjects.length > 0) {
    edges.push({
      id: 'e-side-anchor',
      source: 'person',
      target: `project:${sideProjects[0].id || sideProjects[0].title}`,
    });
  }

  input.etc.list.forEach((item, index) => {
    const awardId = item.id || `award-${index}`;
    const nearProject =
      awardId === 'miraeasset'
        ? sideProjects.find((project) => project.id === 'stock-agent')
        : undefined;
    nodes.push({
      id: `award:${awardId}`,
      type: 'award',
      position: {
        x: nearProject ? sideX : sideX + columnGap,
        y: nearProject ? projectY + sideProjects.length * 220 : 50 + index * 220,
      },
      data: {
        kind: 'award',
        label: item.title,
        caption: item.subTitle,
        entityId: awardId,
      },
    });
    if (nearProject?.id) {
      edges.push({
        id: `e-award-${awardId}`,
        source: `project:${nearProject.id}`,
        target: `award:${awardId}`,
        animated: true,
      });
    }
  });

  return { nodes, edges };
}

const PIPE_NODE_WIDTH = 210;
const GROUP_PAD_X = 22;
const GROUP_PAD_TOP = 48;
const GROUP_PAD_BOTTOM = 22;

function estimatedNodeHeight(caption?: string): number {
  const lines = Math.max(3, Math.ceil((caption || '').length / 26));
  return Math.max(108, 48 + lines * 17);
}

export function buildPipelineGraph(diagram: PipelineDiagram): { nodes: PortfolioNode[]; edges: Edge[] } {
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
    const maxY = Math.max(...members.map((member) => member.y + estimatedNodeHeight(member.caption)));
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

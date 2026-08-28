import { NodeTypes } from '@xyflow/react';
import { AwardNode, CompanyNode, PersonNode, PipelineNode, ProjectNode, RegionNode } from './nodes';

export const portfolioNodeTypes: NodeTypes = {
  person: PersonNode,
  company: CompanyNode,
  project: ProjectNode,
  award: AwardNode,
  pipeline: PipelineNode,
  region: RegionNode,
};

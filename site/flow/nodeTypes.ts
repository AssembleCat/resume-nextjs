import { NodeTypes } from '@xyflow/react';
import { AwardNode, CompanyNode, PersonNode, PipelineNode, ProjectNode } from './nodes';

export const portfolioNodeTypes: NodeTypes = {
  person: PersonNode,
  company: CompanyNode,
  project: ProjectNode,
  award: AwardNode,
  pipeline: PipelineNode,
};

import { useMemo, useState } from 'react';
import { Payload } from '../payload';
import { DIAGRAM_TABS, FlowDiagramId, PIPELINE_DIAGRAMS } from '../payload/flows';
import {
  buildTimeline,
  CareerDomainId,
  parentOfProject,
  totalPeriodLabel,
  uniqueSkills,
  TimelineSegment,
} from './lib/career';
import { scrollToId } from './lib/date';
import { buildPipelineGraph } from './lib/graph';
import { CareerStrip } from './sections/CareerStrip';
import { DetailDrawer } from './sections/DetailDrawer';
import { ExperienceSection } from './sections/ExperienceSection';
import { GraphPlayground } from './sections/GraphPlayground';
import { Hero } from './sections/Hero';
import { HighlightTarget, Highlights } from './sections/Highlights';
import { ProjectSection } from './sections/ProjectSection';
import { RecordsSection } from './sections/RecordsSection';
import { SiteFooter } from './sections/SiteFooter';
import { SiteNav } from './sections/SiteNav';

export function PortfolioPage({ resume, isBlind }: { resume: Payload; isBlind: boolean }) {
  const [diagram, setDiagram] = useState<FlowDiagramId>('inference');
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [expandedExp, setExpandedExp] = useState<string | undefined>('lomin');
  const [domain, setDomain] = useState<CareerDomainId | undefined>();

  const lomin = resume.experience.list.find((item) => item.id === 'lomin');
  const timeline = useMemo(() => buildTimeline(resume.experience), [resume.experience]);
  const totalLabel = useMemo(() => totalPeriodLabel(resume.experience), [resume.experience]);
  const skills = useMemo(() => uniqueSkills(resume.experience), [resume.experience]);

  const graph = useMemo(() => {
    const pipeline = PIPELINE_DIAGRAMS.find((item) => item.id === diagram);
    if (!pipeline) {
      return { nodes: [], edges: [] };
    }
    return buildPipelineGraph(pipeline);
  }, [diagram]);

  const clearCareerFilters = () => {
    setDomain(undefined);
  };

  const openDiagram = (id: FlowDiagramId, nodeId?: string) => {
    setDiagram(id);
    setSelectedId(nodeId);
    window.setTimeout(() => scrollToId('architecture'), 50);
  };

  const openExperience = (id: string, options?: { toggle?: boolean; keepFilters?: boolean }) => {
    if (!options?.keepFilters) {
      clearCareerFilters();
    }
    setExpandedExp(id);
    const nextId = `exp:${id}`;
    if (options?.toggle && selectedId === nextId) {
      setSelectedId(undefined);
      return;
    }
    setSelectedId(nextId);
    window.setTimeout(() => scrollToId(`exp-${id}`), 50);
  };

  const openProject = (id: string, options?: { toggle?: boolean; keepFilters?: boolean }) => {
    if (!options?.keepFilters) {
      clearCareerFilters();
    }
    const parent = parentOfProject(id);
    if (parent !== 'side') {
      setExpandedExp(parent);
    }
    const nextId = `project:${id}`;
    if (options?.toggle && selectedId === nextId) {
      setSelectedId(undefined);
      return;
    }
    setSelectedId(nextId);
    window.setTimeout(() => scrollToId(`project-${id}`), 50);
  };

  const handleHighlight = (target: HighlightTarget) => {
    if (target.kind === 'diagram') {
      openDiagram(target.id);
      return;
    }
    if (target.kind === 'experience') {
      openExperience(target.id);
      return;
    }
    openProject(target.id);
  };

  const handleTimelineSelect = (segment: TimelineSegment) => {
    if (segment.kind === 'aside') {
      openProject(segment.id);
      return;
    }
    openExperience(segment.id);
  };

  return (
    <div className="min-h-screen bg-ink-950 text-zinc-100">
      <SiteNav />
      <Hero
        profile={resume.profile}
        totalLabel={totalLabel}
        skills={skills}
        currentCompanyHref={lomin?.href}
      />
      <CareerStrip
        segments={timeline}
        totalLabel={totalLabel}
        activeId={expandedExp}
        onSelect={handleTimelineSelect}
      />
      <Highlights onOpen={handleHighlight} />
      <ExperienceSection
        experience={resume.experience}
        project={resume.project}
        totalLabel={totalLabel}
        activeId={expandedExp}
        selectedId={selectedId}
        domain={domain}
        onDomainChange={setDomain}
        onSelectExperience={(id) => openExperience(id, { toggle: true, keepFilters: true })}
        onSelectProject={(id) => openProject(id, { toggle: true, keepFilters: true })}
      />
      <GraphPlayground
        diagram={diagram}
        onDiagramChange={(id) => {
          if (DIAGRAM_TABS.some((tab) => tab.id === id)) {
            setDiagram(id);
          }
        }}
        nodes={graph.nodes}
        edges={graph.edges}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
      <ProjectSection
        project={resume.project}
        selectedId={selectedId}
        onOpenDetail={(id) => openProject(id, { toggle: true, keepFilters: true })}
      />
      <RecordsSection
        education={resume.education}
        etc={resume.etc}
        isBlind={isBlind}
      />
      <SiteFooter profile={resume.profile} />
      <DetailDrawer
        selectedId={selectedId}
        experience={resume.experience}
        project={resume.project}
        etc={resume.etc}
        onSelect={setSelectedId}
        onOpenDiagram={openDiagram}
      />
    </div>
  );
}

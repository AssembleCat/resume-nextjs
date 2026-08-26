import { useMemo, useState } from 'react';
import { Payload } from '../payload';
import { DIAGRAM_TABS, FlowDiagramId, PIPELINE_DIAGRAMS } from '../payload/flows';
import { buildTimeline, totalPeriodLabel, uniqueSkills } from './lib/career';
import { scrollToId } from './lib/date';
import { buildCareerGraph, buildPipelineGraph } from './lib/graph';
import { CareerStrip } from './sections/CareerStrip';
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

  const timeline = useMemo(() => buildTimeline(resume.experience), [resume.experience]);
  const totalLabel = useMemo(() => totalPeriodLabel(resume.experience), [resume.experience]);
  const skills = useMemo(() => uniqueSkills(resume.experience), [resume.experience]);

  const graph = useMemo(() => {
    if (diagram === 'career') {
      return buildCareerGraph({
        profile: resume.profile,
        experience: resume.experience,
        project: resume.project,
        etc: resume.etc,
      });
    }
    const pipeline = PIPELINE_DIAGRAMS.find((item) => item.id === diagram);
    if (!pipeline) {
      return { nodes: [], edges: [] };
    }
    return buildPipelineGraph(pipeline);
  }, [diagram, resume]);

  const openDiagram = (id: FlowDiagramId, nodeId?: string) => {
    setDiagram(id);
    setSelectedId(nodeId);
    scrollToId('map');
  };

  const openExperience = (id: string) => {
    setExpandedExp(id);
    scrollToId(`exp-${id}`);
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
    scrollToId(`project-${target.id}`);
  };

  return (
    <div className="min-h-screen bg-ink-950 text-zinc-100">
      <SiteNav />
      <Hero
        profile={resume.profile}
        totalLabel={totalLabel}
        skills={skills}
        onOpenPipe={() => openDiagram('inference')}
      />
      <CareerStrip
        segments={timeline}
        totalLabel={totalLabel}
        activeId={expandedExp}
        onSelect={openExperience}
      />
      <Highlights onOpen={handleHighlight} />
      <ExperienceSection
        experience={resume.experience}
        totalLabel={totalLabel}
        expandedId={expandedExp}
        onToggle={(id) => setExpandedExp((current) => (current === id ? undefined : id))}
      />
      <ProjectSection project={resume.project} onOpenDiagram={openDiagram} />
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
        experience={resume.experience}
        project={resume.project}
        etc={resume.etc}
      />
      <RecordsSection
        education={resume.education}
        etc={resume.etc}
        introduce={resume.introduce}
        isBlind={isBlind}
      />
      <SiteFooter profile={resume.profile} />
    </div>
  );
}

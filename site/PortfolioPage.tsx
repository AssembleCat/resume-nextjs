import { useMemo, useState } from 'react';
import { Payload } from '../payload';
import { FlowDiagramId, PIPELINE_DIAGRAMS } from '../payload/flows';
import { totalPeriodLabel, uniqueSkills } from './lib/career';
import { scrollToId } from './lib/date';
import { buildPipelineGraph } from './lib/graph';
import { DetailDrawer } from './sections/DetailDrawer';
import { ExperienceSection } from './sections/ExperienceSection';
import { GraphPlayground } from './sections/GraphPlayground';
import { Hero } from './sections/Hero';
import { ProjectSection } from './sections/ProjectSection';
import { RecordsSection } from './sections/RecordsSection';
import { SiteFooter } from './sections/SiteFooter';
import { SiteNav } from './sections/SiteNav';

export function PortfolioPage({ resume, isBlind }: { resume: Payload; isBlind: boolean }) {
  const [diagram, setDiagram] = useState<FlowDiagramId>('inference');
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const lomin = resume.experience.list.find((item) => item.id === 'lomin');
  const totalLabel = useMemo(() => totalPeriodLabel(resume.experience), [resume.experience]);
  const skills = useMemo(() => uniqueSkills(resume.experience), [resume.experience]);
  const availableDiagrams = useMemo(
    () =>
      PIPELINE_DIAGRAMS.filter(
        (item) =>
          !resume.project.disable &&
          resume.project.list.some((project) => project.id === item.projectId),
      ),
    [resume.project],
  );
  const activeDiagram =
    availableDiagrams.find((item) => item.id === diagram) || availableDiagrams[0];
  const graph = useMemo(
    () => (activeDiagram ? buildPipelineGraph(activeDiagram) : { nodes: [], edges: [] }),
    [activeDiagram],
  );

  const openDiagram = (id: FlowDiagramId) => {
    setDiagram(id);
    setSelectedId(undefined);
    window.setTimeout(() => {
      document.getElementById('architecture-title')?.focus({ preventScroll: true });
      scrollToId('architecture');
    }, 50);
  };

  const openDetail = (kind: 'exp' | 'project', id: string) => {
    const nextId = `${kind}:${id}`;
    setSelectedId(selectedId === nextId ? undefined : nextId);
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
      <ExperienceSection
        experience={resume.experience}
        totalLabel={totalLabel}
        selectedId={selectedId}
        onSelectExperience={(id) => openDetail('exp', id)}
      />
      {activeDiagram ? (
        <GraphPlayground
          diagram={activeDiagram.id}
          diagrams={availableDiagrams}
          project={resume.project}
          onDiagramChange={(id) => {
            setDiagram(id);
            setSelectedId(undefined);
          }}
          nodes={graph.nodes}
          edges={graph.edges}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onOpenProject={(id) => openDetail('project', id)}
        />
      ) : null}
      <ProjectSection
        project={resume.project}
        selectedId={selectedId}
        onOpenDetail={(id) => openDetail('project', id)}
      />
      <RecordsSection education={resume.education} etc={resume.etc} isBlind={isBlind} />
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

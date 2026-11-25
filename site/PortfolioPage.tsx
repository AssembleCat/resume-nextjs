import { useMemo, useState } from 'react';
import { Payload } from '../payload';
import { FlowDiagramId, PIPELINE_DIAGRAMS } from '../payload/flows';
import { totalPeriodLabel, uniqueSkills } from './lib/career';
import { DetailDrawer } from './sections/DetailDrawer';
import { ExperienceSection } from './sections/ExperienceSection';
import { Hero } from './sections/Hero';
import { ProjectSection } from './sections/ProjectSection';
import { RecordsSection } from './sections/RecordsSection';
import { SiteFooter } from './sections/SiteFooter';
import { SiteNav } from './sections/SiteNav';

export function PortfolioPage({ resume, isBlind }: { resume: Payload; isBlind: boolean }) {
  const [expandedId, setExpandedId] = useState<string>();
  const [selectedId, setSelectedId] = useState<string>();
  const totalLabel = useMemo(() => totalPeriodLabel(resume.experience), [resume.experience]);
  const skills = useMemo(() => uniqueSkills(resume.experience), [resume.experience]);
  const openProject = (id: string) => {
    setSelectedId(undefined);
    setExpandedId(id);
    window.requestAnimationFrame(() => {
      const trigger = document.getElementById(`project-toggle-${id}`);
      trigger?.focus({ preventScroll: true });
      document
        .getElementById(`project-${id}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };
  const openDiagram = (id: FlowDiagramId) => {
    const target = PIPELINE_DIAGRAMS.find((item) => item.id === id)?.projectId;
    if (target) openProject(target);
  };
  const selectDetail = (id?: string) => {
    if (id?.startsWith('project:')) openProject(id.slice(8));
    else setSelectedId(id);
  };
  return (
    <div className="min-h-screen bg-ink-950 text-zinc-100">
      <SiteNav />
      <main id="main-content" tabIndex={-1}>
        <Hero
          profile={resume.profile}
          totalLabel={totalLabel}
          skills={skills}
          currentCompanyHref={resume.experience.list.find((item) => item.id === 'lomin')?.href}
        />
        <ExperienceSection
          experience={resume.experience}
          totalLabel={totalLabel}
          selectedId={selectedId}
          onSelectExperience={(id) => setSelectedId(`exp:${id}`)}
        />
        <ProjectSection
          project={resume.project}
          kind="work"
          expandedId={expandedId}
          onToggle={(id) => setExpandedId(expandedId === id ? undefined : id)}
        />
        <ProjectSection
          project={resume.project}
          kind="side"
          expandedId={expandedId}
          onToggle={(id) => setExpandedId(expandedId === id ? undefined : id)}
        />
        <RecordsSection education={resume.education} etc={resume.etc} isBlind={isBlind} />
      </main>
      <SiteFooter profile={resume.profile} />
      <DetailDrawer
        selectedId={selectedId}
        experience={resume.experience}
        project={resume.project}
        etc={resume.etc}
        onSelect={selectDetail}
        onOpenDiagram={openDiagram}
      />
    </div>
  );
}

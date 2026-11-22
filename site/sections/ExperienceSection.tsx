import { IExperience, IProject } from '../../payload/types';
import { buildTimeline, outcomesFor, workProjects } from '../lib/career';
import { periodLabel } from '../lib/date';
import { CareerStrip } from './CareerStrip';
import { CompanyName } from './CompanyName';
import { ProjectRow } from './ProjectSection';

export function ExperienceSection({
  experience,
  project,
  totalLabel,
  selectedId,
  onSelectExperience,
  onSelectProject,
}: {
  experience: IExperience.Payload;
  project: IProject.Payload;
  totalLabel: string;
  selectedId?: string;
  onSelectExperience: (id: string) => void;
  onSelectProject: (id: string) => void;
}) {
  if (experience.disable) return null;
  const otherProjects = project.disable
    ? []
    : workProjects(project.list).filter((item) => !item.featured);
  return (
    <section id="experience" className="mx-auto max-w-6xl px-5 py-12 md:py-16">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember-400">Experience</p>
          <h2 className="mt-2 font-display text-3xl tracking-tight md:text-4xl">경력</h2>
        </div>
        {!experience.disableTotalPeriod ? (
          <p className="text-sm text-zinc-400">총 재직 기간 {totalLabel}</p>
        ) : null}
      </div>
      <CareerStrip
        segments={buildTimeline(experience)}
        activeId={selectedId?.startsWith('exp:') ? selectedId.slice(4) : undefined}
        onSelect={onSelectExperience}
      />
      <div className="mt-7 border-b border-white/10">
        {experience.list.map((company) => {
          const position = company.positions[0];
          const companyId = company.id || company.title;
          if (!position) return null;
          const selected = selectedId === `exp:${companyId}`;
          return (
            <article
              key={companyId}
              id={`exp-${companyId}`}
              className={`grid gap-3 border-t border-white/10 py-6 md:grid-cols-[12rem_minmax(0,1fr)_auto] md:items-center md:gap-8 ${selected ? 'bg-white/5' : ''}`}
            >
              <div className="text-sm text-zinc-400">
                <p>{periodLabel(position.startedAt, position.endedAt)}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">
                  <CompanyName title={company.title} href={company.href} />
                </h3>
                <p className="mt-1 text-sm text-zinc-400">{position.title}</p>
                <p className="mt-2 text-[15px] text-zinc-300">
                  {outcomesFor(company.id).join(' · ')}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onSelectExperience(companyId)}
                aria-label={`${company.title} ${periodLabel(position.startedAt, position.endedAt)} 경력 상세 ${selected ? '닫기' : '보기'}`}
                aria-expanded={selected}
                aria-controls={selected ? 'project-detail' : undefined}
                className="min-h-11 justify-self-start px-1 text-sm text-zinc-300 underline decoration-white/20 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ember-400"
              >
                {selected ? '상세 닫기' : '경력 상세'}
              </button>
            </article>
          );
        })}
      </div>
      {otherProjects.length > 0 ? (
        <div className="mt-12">
          <h3 className="text-xl font-semibold">함께 살펴볼 업무 경험</h3>
          <div className="mt-5">
            {otherProjects.map((item) => (
              <ProjectRow
                key={item.id || item.title}
                item={item}
                selected={selectedId === `project:${item.id}`}
                onOpenDetail={onSelectProject}
              />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

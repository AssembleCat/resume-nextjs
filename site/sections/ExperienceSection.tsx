import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { useMemo } from 'react';
import { IExperience, IProject } from '../../payload/types';
import {
  CAREER_DOMAINS,
  CareerDomainId,
  entityMatchesDomain,
  outcomesFor,
  projectsForCompany,
  workProjects,
} from '../lib/career';
import { formatMonths, monthCount, periodLabel } from '../lib/date';
import { CompanyName } from './CompanyName';
import { ProjectCard } from './ProjectSection';

function FilterChip({
  label,
  active,
  layoutId,
  onClick,
}: {
  label: string;
  active: boolean;
  layoutId: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] ${
        active ? 'text-black' : 'text-zinc-400 hover:text-white'
      }`}
    >
      {active ? (
        <motion.span layoutId={layoutId} className="absolute inset-0 bg-white" />
      ) : (
        <span className="absolute inset-0 border border-white/10 transition-colors duration-200 group-hover:border-ember-500/50" />
      )}
      <span className="relative z-10">{label}</span>
    </button>
  );
}

function OutcomeMarks({ items }: { items: string[] }) {
  if (items.length === 0) {
    return null;
  }
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className="bg-ember-500/15 px-3 py-1.5 text-sm text-ember-400">
          {item}
        </span>
      ))}
    </div>
  );
}

export function ExperienceSection({
  experience,
  project,
  totalLabel,
  activeId,
  selectedId,
  domain,
  onDomainChange,
  onSelectExperience,
  onSelectProject,
}: {
  experience: IExperience.Payload;
  project: IProject.Payload;
  totalLabel: string;
  activeId?: string;
  selectedId?: string;
  domain?: CareerDomainId;
  onDomainChange: (next?: CareerDomainId) => void;
  onSelectExperience: (id: string) => void;
  onSelectProject: (id: string) => void;
}) {
  const companies = useMemo(
    () => experience.list.filter((company) => entityMatchesDomain(company.id, domain)),
    [experience.list, domain],
  );

  const projects = useMemo(
    () => workProjects(project.list).filter((item) => entityMatchesDomain(item.id, domain)),
    [project.list, domain],
  );
  const otherProjects = projects.filter((item) => !item.featured);

  if (experience.disable) {
    return null;
  }

  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember-400">Experience</p>
      <h2 className="mt-2 font-display text-3xl tracking-tight md:text-5xl">경험과 경력</h2>
      <p className="mt-3 text-sm text-zinc-400">총 {totalLabel} · 프로젝트 요약과 회사별 경력</p>
      <div className="mt-6 flex flex-wrap gap-2">
        <LayoutGroup>
          <FilterChip
            label="전체"
            active={!domain}
            layoutId="domain-tab"
            onClick={() => onDomainChange(undefined)}
          />
          {CAREER_DOMAINS.map((item) => (
            <FilterChip
              key={item.id}
              label={item.label}
              active={domain === item.id}
              layoutId="domain-tab"
              onClick={() => onDomainChange(domain === item.id ? undefined : item.id)}
            />
          ))}
        </LayoutGroup>
      </div>
      <AnimatePresence initial={false}>
        {companies.length === 0 && projects.length === 0 ? (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10 text-sm text-zinc-500"
          >
            이 조건에 해당하는 경력이 없습니다.
          </motion.p>
        ) : null}
      </AnimatePresence>
      {companies.length > 0 ? (
        <div className="mt-10 space-y-3">
          <h3 className="text-xl font-semibold">회사별 경력</h3>
          {companies.map((company, index) => {
            const position = company.positions[0];
            const companyId = company.id || company.title;
            if (!position) {
              return null;
            }
            const selected = selectedId === `exp:${companyId}` || activeId === companyId;
            const nested = projectsForCompany(project.list, companyId).filter((item) =>
              entityMatchesDomain(item.id, domain),
            );
            const outcomes = outcomesFor(company.id);
            return (
              <motion.article
                key={companyId}
                id={`exp-${companyId}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.04 }}
                className={`card-frame bg-ink-800 p-5 md:p-6 ${selected ? 'is-active' : ''}`}
              >
                <div
                  className={
                    nested.length > 0
                      ? 'grid gap-5 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-start md:gap-8'
                      : 'space-y-4'
                  }
                >
                  <div className="min-w-0">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                      <h3 className="text-2xl font-semibold">
                        <CompanyName title={company.title} href={company.href} />
                      </h3>
                      <p className="shrink-0 font-mono text-xs text-zinc-500">
                        {periodLabel(position.startedAt, position.endedAt)} ·{' '}
                        {formatMonths(monthCount(position.startedAt, position.endedAt))}
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-zinc-400">{position.title}</p>
                    <div className="mt-4">
                      <OutcomeMarks items={outcomes} />
                    </div>
                    <button
                      type="button"
                      onClick={() => onSelectExperience(companyId)}
                      aria-label={`${company.title} 경력 상세 보기`}
                      aria-expanded={selectedId === `exp:${companyId}`}
                      className="chip-frame mt-4 min-h-11 px-3 py-2 text-sm text-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ember-400"
                    >
                      경력 상세 보기
                    </button>
                  </div>
                  {nested.length > 0 ? (
                    <div className="grid min-w-0 gap-2">
                      {nested.map((item) => (
                        <button
                          key={item.id || item.title}
                          type="button"
                          onClick={() => item.id && onSelectProject(item.id)}
                          className={`chip-frame w-full px-4 py-3 text-left text-sm leading-snug ${
                            selectedId === `project:${item.id}`
                              ? 'border-ember-500/50 text-white'
                              : 'text-zinc-300'
                          }`}
                        >
                          {item.title}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </motion.article>
            );
          })}
        </div>
      ) : null}
      {otherProjects.length > 0 ? (
        <div className="mt-12">
          <h3 className="text-xl font-semibold">다른 업무 프로젝트</h3>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {otherProjects.map((item, index) => (
              <ProjectCard
                key={item.id || item.title}
                item={item}
                index={index}
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

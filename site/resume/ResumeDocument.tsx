import type { Payload } from '../../payload';
import { IProject, IRow } from '../../payload/types';
import { totalPeriodLabel, uniqueSkills } from '../lib/career';
import { happenedAt, periodLabel } from '../lib/date';
import { parseBracketTag } from '../lib/description';
import { maskSchoolName } from '../lib/format';
import { buildResumeModel } from '../lib/resume';

function ResumeDescriptions({ items }: { items: IRow.Description[] }) {
  if (!items.length) return null;
  return (
    <ul className="resume-descriptions">
      {items.map((item) => {
        const { tag, body } = parseBracketTag(item.content);
        return (
          <li key={item.content}>
            {tag ? <strong>{tag} · </strong> : null}
            {item.href ? <a href={item.href}>{body}</a> : body}
            {item.descriptions?.length ? <ResumeDescriptions items={item.descriptions} /> : null}
          </li>
        );
      })}
    </ul>
  );
}

function ResumeProject({ item, detailed }: { item: IProject.Item; detailed: boolean }) {
  return (
    <article className="resume-project" data-project-id={item.id}>
      <div className="resume-entry-heading">
        <h4>{item.title}</h4>
        <span>{periodLabel(item.startedAt, item.endedAt)}</span>
      </div>
      <p className="resume-project-summary">{item.summary || item.headline}</p>
      {item.outcomes?.length ? (
        <p className="resume-outcomes">{item.outcomes.join(' / ')}</p>
      ) : null}
      <ResumeDescriptions
        items={
          detailed
            ? [...(item.overview || []), ...item.descriptions]
            : item.overview || item.descriptions.slice(0, 1)
        }
      />
      {item.href ? (
        <a className="resume-source" href={item.href}>
          프로젝트 자료
        </a>
      ) : null}
    </article>
  );
}

export function ResumeDocument({
  resume,
  isBlind,
  detailed,
}: {
  resume: Payload;
  isBlind: boolean;
  detailed: boolean;
}) {
  const model = buildResumeModel(resume);
  return (
    <main className="resume-paper" id="resume-document">
      <header className="resume-header">
        <p className="resume-role">{model.profile.role}</p>
        <h1>{model.profile.name.title}</h1>
        <p className="resume-headline">{model.profile.headline}</p>
        <p>{model.profile.summary}</p>
        <div className="resume-contacts">
          {model.profile.contact.map((contact) =>
            contact.link ? (
              <a key={contact.link} href={contact.link}>
                {contact.title || contact.link.replace('https://', '')}
              </a>
            ) : (
              <span key={contact.title}>{contact.title}</span>
            ),
          )}
        </div>
        {!resume.experience.disable ? (
          <p className="resume-skills">
            {!resume.experience.disableTotalPeriod
              ? `총 재직 기간 ${totalPeriodLabel(resume.experience)} · `
              : ''}
            {uniqueSkills(resume.experience).join(' · ')}
          </p>
        ) : null}
      </header>
      {model.companies.length ? (
        <section>
          <h2>경력 및 프로젝트</h2>
          {model.companies.map((company) => (
            <section className="resume-company" key={company.id || company.title}>
              <h3>{company.title}</h3>
              {company.positions.map((position) => (
                <div className="resume-position" key={`${position.title}-${position.startedAt}`}>
                  <div className="resume-entry-heading">
                    <strong>{position.title}</strong>
                    <span>{periodLabel(position.startedAt, position.endedAt)}</span>
                  </div>
                  <ResumeDescriptions items={position.descriptions} />
                  {position.skillKeywords?.length ? (
                    <p className="resume-tech">{position.skillKeywords.join(' · ')}</p>
                  ) : null}
                </div>
              ))}
              {company.projects.map((item) => (
                <ResumeProject key={item.id || item.title} item={item} detailed={detailed} />
              ))}
            </section>
          ))}
        </section>
      ) : null}
      {model.independentProjects.length ? (
        <section>
          <h2>
            {model.independentProjects.some((item) => item.companyId)
              ? '기타 프로젝트'
              : '사이드 프로젝트'}
          </h2>
          {model.independentProjects.map((item) => (
            <ResumeProject key={item.id || item.title} item={item} detailed={detailed} />
          ))}
        </section>
      ) : null}
      {model.education.length ? (
        <section className="resume-records">
          <h2>학력</h2>
          {model.education.map((item) => (
            <div className="resume-record" key={item.id || item.title}>
              <div className="resume-entry-heading">
                <h3>{isBlind ? maskSchoolName(item.title) : item.title}</h3>
                <span>{periodLabel(item.startedAt, item.endedAt)}</span>
              </div>
              <p>{item.subTitle}</p>
            </div>
          ))}
        </section>
      ) : null}
      {model.records.length ? (
        <section className="resume-records">
          <h2>수상 및 자격</h2>
          {model.records.map((item) => (
            <div className="resume-record" key={item.id || item.title}>
              <div className="resume-entry-heading">
                <h3>{item.title}</h3>
                <span>{happenedAt(item.startedAt, item.endedAt)}</span>
              </div>
              <p>{item.subTitle}</p>
            </div>
          ))}
        </section>
      ) : null}
    </main>
  );
}

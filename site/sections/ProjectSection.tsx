import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { IProject } from '../../payload/types';
import { periodLabel } from '../lib/date';
import { findPipelineByProjectId } from '../lib/graph';
import { DescriptionList } from './DescriptionList';
import { GraphPlayground } from './GraphPlayground';

function ProjectRow({
  item,
  expanded,
  onToggle,
}: {
  item: IProject.Item;
  expanded: boolean;
  onToggle: (id: string) => void;
}) {
  const key = item.id || item.title;
  const panelId = `project-body-${key}`;
  const pipeline = findPipelineByProjectId(item.id);
  return (
    <article id={`project-${key}`} className="border-t border-white/15">
      <div className="group relative grid gap-5 py-8 transition-colors hover:bg-white/[0.025] lg:grid-cols-[0.8fr_1.7fr] lg:gap-12 [&_a]:relative [&_a]:z-20">
        <div>
          <p className="text-sm text-zinc-400">{item.where}</p>
          <p className="mt-1 text-xs text-zinc-500">{periodLabel(item.startedAt, item.endedAt)}</p>
          <p className="mt-3 text-sm leading-6 text-zinc-400">{item.title}</p>
          {item.outcomes?.length ? (
            <ul className="mt-4 space-y-2 text-sm text-ember-400">
              {item.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          ) : null}
        </div>
        <div>
          <div className="flex items-start justify-between gap-3">
            <h3 className="break-keep text-xl font-semibold leading-snug lg:text-2xl">
              {item.headline || item.title}
            </h3>
            <span
              aria-hidden="true"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center text-zinc-300 transition-colors group-hover:text-ember-400 group-focus-within:text-ember-400"
            >
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
              />
            </span>
          </div>
          <p className="mt-3 text-base leading-7 text-zinc-300">
            {item.summary || item.overview?.[0]?.content || item.descriptions[0]?.content}
          </p>
          {item.featured && item.overview?.length ? (
            <div className="mt-5">
              <DescriptionList items={item.overview} />
            </div>
          ) : null}
        </div>
        <button
          id={`project-toggle-${key}`}
          type="button"
          aria-label={`${item.title} 상세 ${expanded ? '접기' : '펼치기'}`}
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={() => onToggle(key)}
          className="absolute inset-0 z-10 cursor-pointer"
        />
      </div>
      <div id={panelId} hidden={!expanded} className="pb-8">
        {expanded ? (
          <div className="bg-white/[0.025] p-5 lg:p-8">
            <h4 className="mb-5 text-lg font-semibold">설계·구현 상세</h4>
            <DescriptionList
              items={
                item.featured ? item.descriptions : [...(item.overview || []), ...item.descriptions]
              }
            />
            {item.href ? (
              <a
                className="mt-5 inline-block text-sm text-ember-400 underline underline-offset-4"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                프로젝트 자료 보기
              </a>
            ) : null}
            {pipeline ? <GraphPlayground pipeline={pipeline} /> : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function ProjectSection({
  project,
  kind,
  expandedId,
  onToggle,
}: {
  project: IProject.Payload;
  kind: 'work' | 'side';
  expandedId?: string;
  onToggle: (id: string) => void;
}) {
  const list = project.list
    .filter((item) => (kind === 'work' ? Boolean(item.companyId) : !item.companyId))
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  if (project.disable || !list.length) return null;
  return (
    <section
      id={kind === 'work' ? 'architecture' : 'projects'}
      className="mx-auto max-w-6xl px-5 py-12"
    >
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember-400">
        {kind === 'work' ? 'Selected experience' : 'Side projects'}
      </p>
      <h2 className="mt-2 font-display text-3xl tracking-tight md:text-4xl">
        {kind === 'work' ? '문제와 해결, 그리고 기여' : '관심에서 시작한 프로젝트'}
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-400">
        {kind === 'work'
          ? '실제 업무에서 해결한 문제와 맡은 역할을 정리했습니다. 설계 과정과 처리 구조는 프로젝트별 상세 설명에서 확인할 수 있습니다.'
          : '관심사를 데이터와 서비스로 구현한 경험입니다.'}
      </p>
      <div className="mt-8">
        {list.map((item) => (
          <ProjectRow
            key={item.id || item.title}
            item={item}
            expanded={expandedId === (item.id || item.title)}
            onToggle={onToggle}
          />
        ))}
      </div>
    </section>
  );
}

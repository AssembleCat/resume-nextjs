import { IProject } from '../../payload/types';
import { workProjects } from '../lib/career';
import { ProjectCard } from './ProjectSection';

export function FeaturedProjects({
  project,
  selectedId,
  onOpenDetail,
}: {
  project: IProject.Payload;
  selectedId?: string;
  onOpenDetail: (id: string) => void;
}) {
  const featured = workProjects(project.list).filter((item) => item.featured);
  if (project.disable || featured.length === 0) {
    return null;
  }

  return (
    <section id="featured" className="mx-auto max-w-6xl px-5 pb-16 pt-8 md:pb-20 md:pt-10">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember-400">Selected work</p>
      <h2 className="mt-2 font-display text-3xl tracking-tight md:text-4xl">대표 프로젝트</h2>
      <div className="mt-6 grid items-stretch gap-5 lg:grid-cols-2">
        {featured.map((item, index) => (
          <ProjectCard
            key={item.id || item.title}
            item={item}
            index={index}
            featured
            selected={selectedId === `project:${item.id}`}
            onOpenDetail={onOpenDetail}
          />
        ))}
      </div>
    </section>
  );
}

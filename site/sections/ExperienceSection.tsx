import { IExperience } from '../../payload/types';
import { buildTimeline } from '../lib/career';
import { CareerStrip } from './CareerStrip';

export function ExperienceSection({
  experience,
  totalLabel,
  selectedId,
  onSelectExperience,
}: {
  experience: IExperience.Payload;
  totalLabel: string;
  selectedId?: string;
  onSelectExperience: (id: string) => void;
}) {
  if (experience.disable || experience.list.length === 0) return null;
  return (
    <section id="experience" className="mx-auto max-w-6xl px-5 pb-10 pt-6 md:pb-12 md:pt-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="font-display text-2xl tracking-tight">경력</h2>
        {!experience.disableTotalPeriod ? (
          <p className="text-sm text-zinc-400">총 재직 기간 {totalLabel}</p>
        ) : null}
      </div>
      <CareerStrip
        segments={buildTimeline(experience)}
        activeId={selectedId?.startsWith('exp:') ? selectedId.slice(4) : undefined}
        onSelect={onSelectExperience}
      />
    </section>
  );
}

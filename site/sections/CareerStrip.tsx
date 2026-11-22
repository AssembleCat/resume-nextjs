import { motion } from 'motion/react';
import { TimelineSegment } from '../lib/career';
import { formatMonths, formatShortYearMonth, periodLabel } from '../lib/date';

function segmentClass(segment: TimelineSegment, active: boolean): string {
  if (active) return 'bg-ember-500/15 shadow-[inset_0_0_0_1px_rgba(255,77,0,0.5)]';
  return segment.current ? 'bg-ember-500/10' : 'bg-ink-800';
}

export function CareerStrip({
  segments,
  activeId,
  onSelect,
}: {
  segments: TimelineSegment[];
  activeId?: string;
  onSelect: (id: string) => void;
}) {
  if (segments.length === 0) return null;

  return (
    <div className="mt-7">
      <p className="mb-3 text-xs text-zinc-400">
        재직 기간별 흐름 · 회사명을 선택하면 경력 상세를 볼 수 있습니다.
      </p>
      <div className="overflow-x-auto pb-2" role="region" aria-label="재직 기간별 가로 타임라인">
        <div className="min-w-[640px]">
          <div className="flex h-16 border border-white/10">
            {segments.map((segment, index) => (
              <motion.a
                key={segment.id}
                href={`#exp-${segment.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  onSelect(segment.id);
                }}
                aria-label={`${segment.label} ${periodLabel(segment.startedAt, segment.endedAt)} 경력 상세`}
                aria-expanded={activeId === segment.id}
                aria-controls={activeId === segment.id ? 'project-detail' : undefined}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                style={{ flexGrow: segment.months, flexBasis: 0, minWidth: '6rem' }}
                className={`block border-r border-white/10 px-3 py-2 text-left last:border-r-0 hover:shadow-[inset_0_0_0_1px_rgba(255,77,0,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-ember-400 ${segmentClass(segment, activeId === segment.id)}`}
              >
                <p className="font-mono text-[10px] text-ember-400">
                  {formatMonths(segment.months)}
                </p>
                <p className="mt-1 truncate text-sm font-medium">{segment.short}</p>
              </motion.a>
            ))}
          </div>
          <div className="mt-2 flex">
            {segments.map((segment) => (
              <div
                key={segment.id}
                style={{ flexGrow: segment.months, flexBasis: 0, minWidth: '6rem' }}
                className="px-3 font-mono text-[10px] tabular-nums text-zinc-400"
              >
                {formatShortYearMonth(segment.startedAt)} – {formatShortYearMonth(segment.endedAt)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

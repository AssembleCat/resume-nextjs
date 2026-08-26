import { CSSProperties } from 'react';
import { motion } from 'motion/react';
import { formatMonths, formatShortYearMonth } from '../lib/date';
import { TimelineSegment } from '../lib/career';

function segmentClass(active: boolean, current: boolean): string {
  if (active) {
    return 'bg-ember-500/15';
  }
  if (current) {
    return 'bg-ember-500/10 hover:bg-ember-500/15';
  }
  return 'bg-ink-800 hover:bg-ink-700';
}

function segmentFlex(months: number): CSSProperties {
  return {
    flexGrow: months,
    flexBasis: 0,
    minWidth: '5.5rem',
  };
}

export function CareerStrip({
  segments,
  totalLabel,
  activeId,
  onSelect,
}: {
  segments: TimelineSegment[];
  totalLabel: string;
  activeId?: string;
  onSelect: (id: string) => void;
}) {
  const total = segments.reduce((sum, item) => sum + item.months, 0);
  const origin = segments[0] ? formatShortYearMonth(segments[0].startedAt) : '';

  return (
    <section className="mx-auto max-w-6xl px-5 pb-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember-400">Timeline</p>
          <h2 className="mt-2 font-display text-2xl tracking-tight md:text-3xl">일한 기간</h2>
        </div>
        <p className="font-mono text-xs text-zinc-500">
          총 {totalLabel} · {origin} – 현재
        </p>
      </div>
      <div className="mt-5 flex h-16 overflow-hidden border border-white/10">
        {segments.map((segment, index) => {
          const active = activeId === segment.id;
          return (
            <motion.button
              key={segment.id}
              type="button"
              onClick={() => onSelect(segment.id)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              style={segmentFlex(segment.months)}
              className={`border-r border-white/10 px-3 py-2 text-left last:border-r-0 ${segmentClass(
                active,
                segment.current,
              )}`}
            >
              <p className="truncate font-mono text-[10px] uppercase tracking-[0.14em] text-ember-400">
                {formatMonths(segment.months)}
              </p>
              <p className="mt-1 truncate text-sm font-medium">{segment.short}</p>
            </motion.button>
          );
        })}
      </div>
      <div className="mt-2 hidden md:flex">
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          return (
            <div
              key={segment.id}
              style={segmentFlex(segment.months)}
              className={`flex font-mono text-[10px] tabular-nums text-zinc-500 ${
                isLast ? 'justify-between' : ''
              }`}
            >
              <span>{formatShortYearMonth(segment.startedAt)}</span>
              {isLast ? <span>현재</span> : null}
            </div>
          );
        })}
      </div>
      <p className="sr-only">재직 기간 합 {total}개월</p>
    </section>
  );
}

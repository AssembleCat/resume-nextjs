import { CSSProperties } from 'react';
import { motion } from 'motion/react';
import { formatMonths, formatShortYearMonth } from '../lib/date';
import { TimelineSegment } from '../lib/career';

function segmentClass(segment: TimelineSegment, active: boolean): string {
  if (segment.kind === 'aside') {
    if (active) {
      return 'bg-white/5 text-zinc-300 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.28)]';
    }
    return 'bg-ink-950 text-zinc-400 transition-shadow duration-200 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]';
  }
  if (active) {
    return 'bg-ember-500/15 shadow-[inset_0_0_0_1px_rgba(255,77,0,0.5)]';
  }
  if (segment.current) {
    return 'bg-ember-500/10 transition-shadow duration-200 hover:shadow-[inset_0_0_0_1px_rgba(255,77,0,0.5)]';
  }
  return 'bg-ink-800 transition-shadow duration-200 hover:shadow-[inset_0_0_0_1px_rgba(255,77,0,0.5)]';
}

function segmentHref(segment: TimelineSegment): string {
  if (segment.kind === 'aside') {
    return `#project-${segment.id}`;
  }
  return `#exp-${segment.id}`;
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
  onSelect: (segment: TimelineSegment) => void;
}) {
  const workMonths = segments
    .filter((item) => item.kind === 'work')
    .reduce((sum, item) => sum + item.months, 0);
  const hasAside = segments.some((item) => item.kind === 'aside');
  const origin = segments[0] ? formatShortYearMonth(segments[0].startedAt) : '';

  return (
    <section className="mx-auto max-w-6xl px-5 pb-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember-400">Timeline</p>
          <h2 className="mt-2 font-display text-2xl tracking-tight md:text-3xl">재직 이력</h2>
        </div>
        <p className="font-mono text-xs text-zinc-500">
          총 {totalLabel} · {origin} – 현재
          {hasAside ? ' · 재직 합. 공모전 기간은 별도' : ''}
        </p>
      </div>
      <div className="mt-5 flex h-16 overflow-hidden border border-white/10">
        {segments.map((segment, index) => {
          const active = activeId === segment.id;
          return (
            <motion.a
              key={segment.id}
              href={segmentHref(segment)}
              onClick={() => onSelect(segment)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              style={segmentFlex(segment.months)}
              className={`block border-r border-white/10 px-3 py-2 text-left last:border-r-0 ${segmentClass(
                segment,
                active,
              )}`}
            >
              <p
                className={`truncate font-mono text-[10px] uppercase tracking-[0.14em] ${
                  segment.kind === 'aside' ? 'text-zinc-500' : 'text-ember-400'
                }`}
              >
                {formatMonths(segment.months)}
              </p>
              <p className="mt-1 truncate text-sm font-medium">{segment.short}</p>
            </motion.a>
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
      <p className="sr-only">재직 기간 합 {workMonths}개월</p>
    </section>
  );
}

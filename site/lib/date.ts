import { DateTime } from 'luxon';

const MONTH_FORMAT = 'yyyy-LL';

export function formatYearMonth(value?: string): string {
  if (!value) {
    return '현재';
  }
  return DateTime.fromFormat(value, MONTH_FORMAT).toFormat('yyyy. LL');
}

export function periodLabel(startedAt: string, endedAt?: string): string {
  return `${formatYearMonth(startedAt)} – ${endedAt ? formatYearMonth(endedAt) : '현재'}`;
}

export function happenedAt(startedAt: string, endedAt?: string): string {
  if (!endedAt) {
    return formatYearMonth(startedAt);
  }
  return periodLabel(startedAt, endedAt);
}

export function monthCount(startedAt: string, endedAt?: string): number {
  const start = DateTime.fromFormat(startedAt, MONTH_FORMAT).startOf('month');
  const end = (endedAt ? DateTime.fromFormat(endedAt, MONTH_FORMAT) : DateTime.local()).startOf(
    'month',
  );
  return Math.max(1, end.diff(start, 'months').months + 1);
}

export function formatMonths(months: number): string {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  if (years > 0 && rest > 0) {
    return `${years}년 ${rest}개월`;
  }
  if (years > 0) {
    return `${years}년`;
  }
  return `${rest}개월`;
}

export function scrollToId(id: string) {
  if (typeof document === 'undefined') {
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

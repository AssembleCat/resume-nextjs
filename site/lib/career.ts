import { IExperience } from '../../component/experience/IExperience';
import { formatMonths, monthCount } from './date';

export const DOMAIN_LINE = 'Document AI · Payments · On-prem';

export const NOW_FACTS = [
  'Document AI · 추론 파이프 운영',
  'FastAPI는 추론, Spring Kotlin은 상태·연동',
  '온프레미스에서 실패를 상태로 재처리',
];

const STACK_ORDER = [
  'Kotlin',
  'Spring',
  'FastAPI',
  'Python',
  'AWS',
  'Docker',
  'Redis',
  'Celery',
  'RDB',
];

const SHORT_NAME: Record<string, string> = {
  lomin: '로민',
  'imt-freelance': 'IMT 프리랜스',
  'imt-kiosk': 'IMT',
  tenacity: '테너시티즈',
};

export interface TimelineSegment {
  id: string;
  label: string;
  short: string;
  role: string;
  startedAt: string;
  endedAt?: string;
  months: number;
  current: boolean;
}

export function buildTimeline(experience: IExperience.Payload): TimelineSegment[] {
  const segments: TimelineSegment[] = [];
  experience.list.forEach((company) => {
    const position = company.positions[0];
    if (!position || !company.id) {
      return;
    }
    segments.push({
      id: company.id,
      label: company.title,
      short: SHORT_NAME[company.id] || company.title,
      role: position.title,
      startedAt: position.startedAt,
      endedAt: position.endedAt,
      months: monthCount(position.startedAt, position.endedAt),
      current: !position.endedAt,
    });
  });
  return segments.sort((a, b) => a.startedAt.localeCompare(b.startedAt));
}

export function totalMonths(experience: IExperience.Payload): number {
  return experience.list.reduce(
    (sum, company) =>
      sum +
      company.positions.reduce((inner, position) => inner + monthCount(position.startedAt, position.endedAt), 0),
    0,
  );
}

export function totalPeriodLabel(experience: IExperience.Payload): string {
  return formatMonths(totalMonths(experience));
}

export function uniqueSkills(experience: IExperience.Payload): string[] {
  const seen = new Set<string>();
  experience.list.forEach((company) => {
    company.positions.forEach((position) => {
      position.skillKeywords?.forEach((tag) => seen.add(tag));
    });
  });
  const ordered = STACK_ORDER.filter((tag) => seen.has(tag));
  const rest = Array.from(seen).filter((tag) => !STACK_ORDER.includes(tag));
  return [...ordered, ...rest].slice(0, 8);
}

import { IExperience } from '../../component/experience/IExperience';
import { IProject } from '../../component/project/IProject';
import { formatMonths, monthCount } from './date';

export const DOMAIN_LINE = 'KIOSK · Payments · Document AI · On-prem';

export const LOMIN_PRODUCT_HREF = 'https://beta.zixy.io/';

export const NOW_FACTS = [
  'Document AI Agent Lomin을 운영합니다.',
  '주로 Python, Kotlin으로 SaaS, On-prem 환경의 고민점을 해결하고 있습니다.',
];

const STACK_ORDER = [
  'Kotlin',
  'Spring',
  'Python',
  'FastAPI',
  'Redis',
  'Docker',
  'AWS',
  'RDB',
];

const SHORT_NAME: Record<string, string> = {
  lomin: '로민',
  'imt-freelance': 'IMT',
  'imt-kiosk': 'IMT',
  tenacity: '테너시티즈',
};

export const PROJECT_PARENT: Record<string, string> = {
  onprem: 'lomin',
  'lomin-backend': 'lomin',
  'van-switch': 'imt-freelance',
  'inhouse-point': 'imt-freelance',
  'kiosk-multi': 'imt-kiosk',
  payment: 'imt-kiosk',
  'stock-agent': 'side',
  spire: 'side',
};

export function parentOfProject(id?: string): string {
  if (!id) {
    return 'side';
  }
  return PROJECT_PARENT[id] || 'side';
}

export function projectsForCompany(list: IProject.Item[], companyId: string): IProject.Item[] {
  return list.filter((item) => parentOfProject(item.id) === companyId);
}

export function sideProjects(list: IProject.Item[]): IProject.Item[] {
  return list.filter((item) => parentOfProject(item.id) === 'side');
}

export function workProjects(list: IProject.Item[]): IProject.Item[] {
  return list.filter((item) => parentOfProject(item.id) !== 'side');
}

export type CareerDomainId = 'document-ai' | 'onprem' | 'payments' | 'kiosk';

export const CAREER_DOMAINS: { id: CareerDomainId; label: string }[] = [
  { id: 'document-ai', label: 'Document AI' },
  { id: 'onprem', label: 'On-prem' },
  { id: 'payments', label: 'Payments' },
  { id: 'kiosk', label: 'KIOSK' },
];

const ENTITY_DOMAINS: Record<string, CareerDomainId[]> = {
  lomin: ['document-ai', 'onprem'],
  onprem: ['onprem', 'document-ai'],
  'lomin-backend': ['document-ai', 'onprem'],
  'imt-freelance': ['payments', 'kiosk'],
  'van-switch': ['payments', 'kiosk'],
  'inhouse-point': ['payments', 'kiosk'],
  'imt-kiosk': ['kiosk', 'payments'],
  'kiosk-multi': ['kiosk'],
  payment: ['kiosk', 'payments'],
};

export const COMPANY_OUTCOMES: Record<string, string[]> = {
  lomin: ['추론 파이프', '온프렘 연동'],
  'imt-freelance': ['VAN 4사', '자사 포인트'],
  tenacity: ['웹·백오피스', '배포·AWS'],
  'imt-kiosk': ['결제 수집 통일'],
};

export const PROJECT_OUTCOMES: Record<string, string[]> = {
  onprem: ['고객사 100+', '수일 → 30분'],
  'lomin-backend': ['일 8만 건', '타임아웃 70%'],
  'stock-agent': ['RAG 질의', '근거·수치 답변'],
  spire: ['3,200만 Run', '카드 가치'],
  'van-switch': ['VAN 4사', '설정 전환'],
  'inhouse-point': ['멱등', '잔액 정합성'],
  'kiosk-multi': ['설정 기반', '브랜드 흡수'],
  payment: ['일 40만 건', '유실 Zero'],
};

export function outcomesFor(id?: string): string[] {
  if (!id) {
    return [];
  }
  return PROJECT_OUTCOMES[id] || COMPANY_OUTCOMES[id] || [];
}

export function entityMatchesDomain(id: string | undefined, domain?: CareerDomainId): boolean {
  if (!domain) {
    return true;
  }
  if (!id) {
    return false;
  }
  return (ENTITY_DOMAINS[id] || []).includes(domain);
}

export type TimelineKind = 'work' | 'aside';

export interface TimelineSegment {
  id: string;
  label: string;
  short: string;
  role: string;
  startedAt: string;
  endedAt?: string;
  months: number;
  current: boolean;
  kind: TimelineKind;
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
      kind: 'work',
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
  return ordered;
}

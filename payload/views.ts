/**
 * 한 payload로 이력서 형태를 나눈다.
 *
 * - `/?view=core`  백엔드 핵심 (기본값, Spire 포함)
 * - `/?view=full`  전체
 * - `/?view=game`  핵심과 동일. 게임 데이터 강조용 별칭
 * - `/?view=core&hide=stock-agent`  추가로 숨김
 * - `/?view=core&hide=spire`        Spire만 숨김
 * - `/?blind=true` 와 함께 쓸 수 있다
 */

export const RESUME_VIEWS = ['core', 'full', 'game'] as const;

export type ResumeView = typeof RESUME_VIEWS[number];

export const DEFAULT_RESUME_VIEW: ResumeView = 'core';

type IdList = string[] | 'all';

export interface ResumeViewPreset {
  experience: IdList;
  project: IdList;
  education: IdList;
  etc: IdList;
}

export interface ResumeViewQuery {
  view: ResumeView;
  hide: string[];
  show: string[];
}

export const VIEW_PRESETS: Record<ResumeView, ResumeViewPreset> = {
  core: {
    experience: 'all',
    project: [
      'onprem',
      'lomin-backend',
      'stock-agent',
      'spire',
      'van-switch',
      'inhouse-point',
      'kiosk-multi',
      'payment',
    ],
    education: ['hanshin'],
    etc: 'all',
  },
  full: {
    experience: 'all',
    project: 'all',
    education: 'all',
    etc: 'all',
  },
  game: {
    experience: 'all',
    project: [
      'onprem',
      'lomin-backend',
      'stock-agent',
      'spire',
      'van-switch',
      'inhouse-point',
      'kiosk-multi',
      'payment',
    ],
    education: ['hanshin'],
    etc: 'all',
  },
};

export function isResumeView(value: string | undefined): value is ResumeView {
  return value !== undefined && (RESUME_VIEWS as readonly string[]).indexOf(value) !== -1;
}

interface Identifiable {
  id?: string;
}

interface FilterableSection<T extends Identifiable> {
  disable?: boolean;
  list: T[];
}

function isVisible(id: string | undefined, allowed: IdList, show: string[], hide: string[]) {
  if (!id) {
    return true;
  }
  if (hide.indexOf(id) !== -1) {
    return false;
  }
  if (show.indexOf(id) !== -1) {
    return true;
  }
  if (allowed === 'all') {
    return true;
  }
  return allowed.indexOf(id) !== -1;
}

function filterSection<T extends Identifiable, S extends FilterableSection<T>>(
  section: S,
  allowed: IdList,
  show: string[],
  hide: string[],
): S {
  const list = section.list.filter((item) => isVisible(item.id, allowed, show, hide));
  return {
    ...section,
    list,
    disable: section.disable || list.length === 0,
  };
}

export function applyResumeView<
  T extends {
    experience: FilterableSection<Identifiable>;
    project: FilterableSection<Identifiable>;
    education: FilterableSection<Identifiable>;
    etc: FilterableSection<Identifiable>;
  }
>(payload: T, query: ResumeViewQuery): T {
  const preset = VIEW_PRESETS[query.view];
  return {
    ...payload,
    experience: filterSection(payload.experience, preset.experience, query.show, query.hide),
    project: filterSection(payload.project, preset.project, query.show, query.hide),
    education: filterSection(payload.education, preset.education, query.show, query.hide),
    etc: filterSection(payload.etc, preset.etc, query.show, query.hide),
  };
}

function firstQueryValue(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

function csvQueryValue(value: string | string[] | undefined): string[] {
  const raw = Array.isArray(value) ? value.join(',') : value;
  if (!raw) {
    return [];
  }
  return raw
    .split(',')
    .map((token) => token.trim())
    .filter((token) => token.length > 0);
}

export function parseResumeViewQuery(query: {
  [key: string]: string | string[] | undefined;
}): ResumeViewQuery {
  const viewRaw = firstQueryValue(query.view);
  return {
    view: isResumeView(viewRaw) ? viewRaw : DEFAULT_RESUME_VIEW,
    hide: csvQueryValue(query.hide),
    show: csvQueryValue(query.show),
  };
}

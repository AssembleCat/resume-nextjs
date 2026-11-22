import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { NextSeoProps } from 'next-seo';

/** 목록 섹션의 표시 여부. */
export declare namespace ICommon {
  export interface Payload {
    disable?: boolean;
  }
}

/** 상세 패널에서 렌더링하는 설명. */
export declare namespace IRow {
  export type FontWeightType =
    | 'DEFAULT'
    | 'THIN'
    | 'EXTRA_LIGHT'
    | 'LIGHT'
    | 'REGULAR'
    | 'MEDIUM'
    | 'SEMI_BOLD'
    | 'BOLD'
    | 'EXTRA_BOLD'
    | 'BLACK';

  export interface Description {
    content: string;
    weight?: FontWeightType;
    href?: string;
    postImage?: string;
    postHref?: string;
    descriptions?: Description[];
  }
}

export declare namespace IGlobal {
  export interface Payload {
    headTitle: string;
    favicon: string | { src: string };
    seo: NextSeoProps;
  }
}

export declare namespace IProfile {
  export interface Contact {
    icon: IconDefinition;
    title?: string;
    link?: string;
  }

  export interface Payload extends ICommon.Payload {
    image: string | { src: string };
    name: { title: string; small?: string };
    contact: Contact[];
  }
}

export declare namespace IExperience {
  export interface Position {
    title: string;
    /** YYYY-MM. 종료일 생략 시 현재까지의 경력으로 계산. */
    startedAt: string;
    endedAt?: string;
    descriptions: IRow.Description[];
    skillKeywords?: string[];
  }

  export interface Item {
    id?: string;
    title: string;
    href?: string;
    positions: Position[];
  }

  export interface Payload extends ICommon.Payload {
    list: Item[];
    disableTotalPeriod?: boolean;
  }
}

export declare namespace IProject {
  export interface Item {
    id?: string;
    title: string;
    where: string;
    href?: string;
    /** YYYY-MM. */
    startedAt: string;
    endedAt?: string;
    /** 목록에서 우선 소개할 대표 프로젝트. */
    featured?: boolean;
    /** 첫 화면에서 보여줄 문제 중심 제목과 짧은 소개. */
    headline?: string;
    summary?: string;
    /** 상세 패널의 핵심 설명. summary가 없으면 목록의 대체 소개로 사용. */
    overview?: IRow.Description[];
    descriptions: IRow.Description[];
  }

  export interface Payload extends ICommon.Payload {
    list: Item[];
  }
}

export declare namespace IEducation {
  export interface Item {
    id?: string;
    title: string;
    subTitle: string;
    /** YYYY-MM. */
    startedAt: string;
    endedAt?: string;
  }

  export interface Payload extends ICommon.Payload {
    list: Item[];
  }
}

export declare namespace IEtc {
  export interface Item {
    id?: string;
    title: string;
    subTitle: string;
    /** YYYY-MM. */
    startedAt: string;
    endedAt?: string;
  }

  export interface Payload extends ICommon.Payload {
    list: Item[];
  }
}

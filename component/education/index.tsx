import { DateTime } from 'luxon';
import { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import { CommonSection } from '../common/CommonSection';
import { EmptyRowCol } from '../common';
import { CommonRows } from '../common/CommonRow';
import { IEducation } from './IEducation';
import { IRow } from '../common/IRow';
import Util from '../common/Util';
import { PreProcessingComponent } from '../common/PreProcessingComponent';

type Payload = IEducation.Payload;
type Item = IEducation.Item;

export const Education = {
  Component: ({ payload }: PropsWithChildren<{ payload: Payload }>) => {
    return PreProcessingComponent<Payload>({
      payload,
      component: Component,
    });
  },
};

function Component({ payload }: PropsWithChildren<{ payload: Payload }>) {
  const router = useRouter();
  const blindParam = router?.query?.blind;
  const isBlind = Array.isArray(blindParam)
    ? (blindParam[0] ?? '').toString().toLowerCase() === 'true'
    : ((blindParam as string | undefined) ?? '').toString().toLowerCase() === 'true';

  return (
    <CommonSection title="EDUCATION">
      <EducationRow payload={payload} isBlind={isBlind} />
    </CommonSection>
  );
}

function EducationRow({
  payload,
  isBlind,
}: PropsWithChildren<{ payload: Payload; isBlind?: boolean }>) {
  return (
    <EmptyRowCol>
      {payload.list.map((item, index) => {
        const itemForRender: Item = isBlind ? { ...item, title: maskSchoolName(item.title) } : item;
        return (
          <CommonRows key={index.toString()} payload={serialize(itemForRender)} index={index} />
        );
      })}
    </EmptyRowCol>
  );
}

function serialize(item: Item): IRow.Payload {
  const DATE_FORMAT = Util.LUXON_DATE_FORMAT;
  const [startedAt] = [item.startedAt].map((at) =>
    DateTime.fromFormat(at, DATE_FORMAT.YYYY_LL).toFormat(DATE_FORMAT.YYYY_DOT_LL),
  );

  const endedAt =
    item.endedAt === undefined
      ? ' '
      : [item.endedAt].map((at) =>
          DateTime.fromFormat(at, DATE_FORMAT.YYYY_LL).toFormat(DATE_FORMAT.YYYY_DOT_LL),
        );

  return {
    left: { title: `${startedAt} ~ ${endedAt}` },
    right: {
      ...item,
    },
  };
}

function maskSchoolName(name: string): string {
  if (!name) return name;
  const keywords = ['대학교', '고등학교'];
  const found = keywords.find((keyword) => name.indexOf(keyword) !== -1);
  if (found) {
    const idx = name.indexOf(found);
    return `***${name.slice(idx)}`;
  }
  return '***';
}

import { motion } from 'motion/react';
import { FlowDiagramId } from '../../payload/flows';

export type HighlightTarget =
  | { kind: 'diagram'; id: FlowDiagramId }
  | { kind: 'experience'; id: string }
  | { kind: 'project'; id: string };

const HIGHLIGHTS: {
  kicker: string;
  title: string;
  body: string;
  span: string;
  titleClass: string;
  target: HighlightTarget;
}[] = [
  {
    kicker: 'Lomin',
    title: '1인 백엔드',
    body: '추론·온프렘 연동을 솔루션 기능으로 흡수했습니다.',
    span: 'sm:col-span-2 md:col-span-2 md:row-span-2',
    titleClass: 'text-3xl md:text-5xl',
    target: { kind: 'experience', id: 'lomin' },
  },
  {
    kicker: 'Throughput',
    title: '일 8만 건',
    body: '분산 처리로 타임아웃을 약 70% 줄였습니다.',
    span: '',
    titleClass: 'text-2xl md:text-3xl',
    target: { kind: 'diagram', id: 'inference' },
  },
  {
    kicker: 'On-prem',
    title: '고객사 100+',
    body: '환경 구성을 한 플랫폼으로 전산화했습니다.',
    span: '',
    titleClass: 'text-2xl md:text-3xl',
    target: { kind: 'project', id: 'onprem' },
  },
  {
    kicker: 'KIOSK',
    title: '일 40만 건',
    body: '결제를 SQS로 옮기고 유실 경로를 닫았습니다.',
    span: '',
    titleClass: 'text-2xl md:text-3xl',
    target: { kind: 'diagram', id: 'payment' },
  },
  {
    kicker: 'VAN',
    title: '결제 4사',
    body: 'VAN을 설정만으로 전환되게 했습니다.',
    span: '',
    titleClass: 'text-2xl md:text-3xl',
    target: { kind: 'experience', id: 'imt-freelance' },
  },
  {
    kicker: 'Award',
    title: '미래에셋 우수상',
    body: '442팀 중 최종 6팀. RAG 주식 에이전트를 구현했습니다.',
    span: 'sm:col-span-2 md:col-span-2',
    titleClass: 'text-2xl md:text-4xl',
    target: { kind: 'project', id: 'stock-agent' },
  },
  {
    kicker: 'Startup',
    title: '두 번째 개발자',
    body: '웹·백오피스와 AWS 운영을 한 흐름으로 붙였습니다.',
    span: '',
    titleClass: 'text-2xl md:text-3xl',
    target: { kind: 'experience', id: 'tenacity' },
  },
  {
    kicker: 'KIOSK',
    title: '다중 브랜드',
    body: '브랜드별 KIOSK를 설정 기반 코드베이스로 흡수했습니다.',
    span: '',
    titleClass: 'text-2xl md:text-3xl',
    target: { kind: 'project', id: 'kiosk-multi' },
  },
];

export function Highlights({ onOpen }: { onOpen: (target: HighlightTarget) => void }) {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-8">
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 md:auto-rows-[minmax(9.5rem,auto)]">
        {HIGHLIGHTS.map((card, index) => (
          <motion.button
            key={card.title}
            type="button"
            onClick={() => onOpen(card.target)}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delay: index * 0.04 }}
            whileHover={{ y: -4 }}
            className={`border border-white/10 bg-ink-800 p-5 text-left md:p-6 ${card.span}`}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ember-400">
              {card.kicker}
            </p>
            <h2 className={`mt-2 font-display tracking-tight ${card.titleClass}`}>{card.title}</h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-400">{card.body}</p>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

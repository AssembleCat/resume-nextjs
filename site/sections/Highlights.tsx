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
  target: HighlightTarget;
}[] = [
  {
    kicker: 'Lomin',
    title: '1인 백엔드',
    body: '추론 엔진을 중심으로 배치·분산·재처리를 솔루션 기능으로 흡수했습니다.',
    span: 'md:col-span-2 md:row-span-2',
    target: { kind: 'experience', id: 'lomin' },
  },
  {
    kicker: 'Throughput',
    title: '일 8만 건',
    body: '단일 GPU 타임아웃을 워커 분산과 상태 기반 재처리로 풀었습니다.',
    span: '',
    target: { kind: 'diagram', id: 'inference' },
  },
  {
    kicker: 'Payments',
    title: '일 40만 건',
    body: 'KIOSK 결제를 SQS 파이프로 옮기고 유실 경로를 닫았습니다.',
    span: '',
    target: { kind: 'diagram', id: 'payment' },
  },
  {
    kicker: 'Award',
    title: '미래에셋 AI 우수상',
    body: '442팀 중 최종 6팀. RAG 주식 에이전트를 설계·구현했습니다.',
    span: 'md:col-span-2',
    target: { kind: 'project', id: 'stock-agent' },
  },
];

export function Highlights({ onOpen }: { onOpen: (target: HighlightTarget) => void }) {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-8">
      <div className="grid gap-3 md:grid-cols-4">
        {HIGHLIGHTS.map((card, index) => (
          <motion.button
            key={card.title}
            type="button"
            onClick={() => onOpen(card.target)}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -4 }}
            className={`border border-white/10 bg-ink-800 p-6 text-left ${card.span}`}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ember-400">
              {card.kicker}
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">{card.title}</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-400">{card.body}</p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
              눌러서 근거 보기
            </p>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

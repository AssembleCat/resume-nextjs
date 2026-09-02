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
    title: '문서 추론 파이프',
    body: '추론·온프렘 연동을 솔루션 기능으로 흡수했습니다.',
    span: 'sm:col-span-2 md:col-span-1 md:col-start-2 md:row-start-1 md:row-span-2',
    titleClass: 'text-3xl md:text-5xl',
    target: { kind: 'experience', id: 'lomin' },
  },
  {
    kicker: 'GPU',
    title: '워커 분산',
    body: '단일 GPU 대기열을 워커로 나눠, 하드웨어를 병렬로 최대로 쓰게 했습니다.',
    span: 'md:col-start-1 md:row-start-1',
    titleClass: 'text-2xl md:text-3xl',
    target: { kind: 'diagram', id: 'inference' },
  },
  {
    kicker: 'KIOSK',
    title: '유실 없는 적재',
    body: '결제를 SQS로 옮기고, 끊겨도 로컬에 들고 다시 밀어 넣었습니다.',
    span: 'md:col-start-1 md:row-start-2',
    titleClass: 'text-2xl md:text-3xl',
    target: { kind: 'diagram', id: 'payment' },
  },
  {
    kicker: 'On-prem',
    title: '고객사 100+',
    body: '환경 구성을 한 플랫폼으로 전산화했습니다.',
    span: 'md:col-start-3 md:row-start-1',
    titleClass: 'text-2xl md:text-3xl',
    target: { kind: 'project', id: 'onprem' },
  },
  {
    kicker: 'RAG · LLM',
    title: '주식 에이전트',
    body: '공모전이지만 자연어 질의에 근거와 수치로 답하는 서비스를 만들었습니다.',
    span: 'md:col-start-3 md:row-start-2',
    titleClass: 'text-2xl md:text-3xl',
    target: { kind: 'project', id: 'stock-agent' },
  },
  {
    kicker: 'VAN',
    title: '결제 4사',
    body: 'VAN을 설정만으로 전환되게 했습니다.',
    span: 'md:col-start-1 md:row-start-3',
    titleClass: 'text-2xl md:text-3xl',
    target: { kind: 'project', id: 'van-switch' },
  },
  {
    kicker: 'Spire',
    title: '3,200만 Run',
    body: 'Slay the Spire 로그를 모아 전투를 재현하고, 카드 가치를 데이터로 확인했습니다.',
    span: 'md:col-start-2 md:row-start-3',
    titleClass: 'text-2xl md:text-3xl',
    target: { kind: 'project', id: 'spire' },
  },
  {
    kicker: 'KIOSK',
    title: '다중 브랜드',
    body: '브랜드별 KIOSK를 설정 기반 코드베이스로 흡수했습니다.',
    span: 'md:col-start-3 md:row-start-3',
    titleClass: 'text-2xl md:text-3xl',
    target: { kind: 'project', id: 'kiosk-multi' },
  },
];

export function Highlights({ onOpen }: { onOpen: (target: HighlightTarget) => void }) {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-8">
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 md:auto-rows-[minmax(10rem,auto)]">
        {HIGHLIGHTS.map((card, index) => (
          <motion.button
            key={card.title}
            type="button"
            onClick={() => onOpen(card.target)}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delay: index * 0.04 }}
            className={`card-frame bg-ink-800 p-5 text-left md:p-6 ${card.span}`}
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

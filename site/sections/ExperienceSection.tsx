import { AnimatePresence, motion } from 'motion/react';
import { IExperience } from '../../component/experience/IExperience';
import { formatMonths, monthCount, periodLabel } from '../lib/date';

export function ExperienceSection({
  experience,
  totalLabel,
  expandedId,
  onToggle,
}: {
  experience: IExperience.Payload;
  totalLabel: string;
  expandedId?: string;
  onToggle: (id: string) => void;
}) {
  if (experience.disable) {
    return null;
  }

  return (
    <section id="experience" className="mx-auto max-w-6xl px-5 py-20">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember-400">Experience</p>
      <h2 className="mt-2 font-display text-3xl tracking-tight md:text-5xl">일한 자리</h2>
      <p className="mt-3 font-mono text-xs text-zinc-500">총 {totalLabel}</p>
      <div className="mt-10 space-y-4">
        {experience.list.map((company, index) => {
          const position = company.positions[0];
          const companyId = company.id || company.title;
          if (!position) {
            return null;
          }
          const expanded = expandedId === companyId;
          const lead = position.descriptions.find((item) => item.weight === 'MEDIUM') || position.descriptions[0];
          const rest = position.descriptions.filter((item) => item !== lead);
          return (
            <motion.article
              key={companyId}
              id={`exp-${companyId}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.04 }}
              className={`border bg-ink-800 p-6 md:p-8 ${
                expanded ? 'border-ember-500/40' : 'border-white/10'
              }`}
            >
              <button type="button" onClick={() => onToggle(companyId)} className="w-full text-left">
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold">{company.title}</h3>
                    <p className="mt-1 text-sm text-zinc-400">{position.title}</p>
                  </div>
                  <p className="font-mono text-xs text-zinc-500">
                    {periodLabel(position.startedAt, position.endedAt)} ·{' '}
                    {formatMonths(monthCount(position.startedAt, position.endedAt))}
                  </p>
                </div>
                {lead ? (
                  <p className="mt-5 text-sm leading-relaxed text-zinc-300">{lead.content}</p>
                ) : null}
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                  {expanded ? '접기' : '근거 더 보기'}
                </p>
              </button>
              <AnimatePresence initial={false}>
                {expanded ? (
                  <motion.div
                    key="body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.26, 0.02, 0.23, 0.94] }}
                    className="overflow-hidden"
                  >
                    {rest.length > 0 ? (
                      <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-zinc-400">
                        {rest.map((item) => (
                          <li key={item.content}>{item.content}</li>
                        ))}
                      </ul>
                    ) : null}
                    {position.skillKeywords ? (
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {position.skillKeywords.map((tag) => (
                          <span
                            key={tag}
                            className="border border-white/10 px-2.5 py-1 text-[11px] text-zinc-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

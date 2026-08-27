import { motion } from 'motion/react';
import { IEducation } from '../../component/education/IEducation';
import { IEtc } from '../../component/etc/IEtc';
import { happenedAt, periodLabel } from '../lib/date';
import { maskSchoolName } from '../lib/format';

export function RecordsSection({
  education,
  etc,
  isBlind,
}: {
  education: IEducation.Payload;
  etc: IEtc.Payload;
  isBlind: boolean;
}) {
  return (
    <section id="records" className="mx-auto max-w-6xl px-5 py-20">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember-400">Records</p>
      <h2 className="mt-2 font-display text-3xl tracking-tight md:text-5xl">기록</h2>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {education.disable ? null : (
          <motion.article
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-frame bg-ink-800 p-6"
          >
            <h3 className="font-display text-2xl">Education</h3>
            <div className="mt-5 space-y-4">
              {education.list.map((item) => (
                <div key={item.id || item.title}>
                  <p className="font-medium">
                    {isBlind ? maskSchoolName(item.title) : item.title}
                  </p>
                  {item.subTitle ? (
                    <p className="text-sm text-zinc-400">{item.subTitle}</p>
                  ) : null}
                  <p className="mt-1 font-mono text-xs text-zinc-500">
                    {periodLabel(item.startedAt, item.endedAt)}
                  </p>
                </div>
              ))}
            </div>
          </motion.article>
        )}
        {etc.disable ? null : (
          <motion.article
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-frame bg-ink-800 p-6"
          >
            <h3 className="font-display text-2xl">Awards & Certs</h3>
            <div className="mt-5 space-y-4">
              {etc.list.map((item) => (
                <div key={item.id || item.title}>
                  <p className="font-medium">{item.title}</p>
                  {item.subTitle ? (
                    <p className="text-sm text-zinc-400">{item.subTitle}</p>
                  ) : null}
                  <p className="mt-1 font-mono text-xs text-zinc-500">
                    {happenedAt(item.startedAt, item.endedAt)}
                  </p>
                </div>
              ))}
            </div>
          </motion.article>
        )}
      </div>
    </section>
  );
}

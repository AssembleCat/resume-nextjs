import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'motion/react';
import { IProfile } from '../../component/profile/IProfile';
import { assetSrc } from '../lib/format';
import { DOMAIN_LINE, NOW_FACTS } from '../lib/career';
import { CompanyName } from './CompanyName';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export function Hero({
  profile,
  totalLabel,
  skills,
  currentCompanyHref,
}: {
  profile: IProfile.Payload;
  totalLabel: string;
  skills: string[];
  currentCompanyHref?: string;
}) {
  return (
    <section id="intro" className="relative overflow-hidden site-grid">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[4%] top-10 z-0 h-36 w-36 bg-ember-500"
        animate={{ x: 22, y: -18, rotate: 10 }}
        transition={{ duration: 4.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        style={{ boxShadow: '0 0 120px rgba(255,77,0,0.45)', willChange: 'transform' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[10%] top-44 z-0 h-16 w-16 border border-white/20 bg-white/5"
        animate={{ rotate: -12, x: ['0%', '-30%'] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror' }}
      />
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1.3fr_0.7fr] md:py-24">
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.p
            variants={item}
            className="font-mono text-[11px] uppercase tracking-[0.28em] text-ember-400"
          >
            Backend Engineer
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-5 font-display text-5xl leading-[0.95] tracking-tight md:text-7xl"
          >
            {profile.name.title}
          </motion.h1>
          <motion.p variants={item} className="mt-6 font-mono text-xs tracking-[0.12em] text-zinc-500">
            {totalLabel} · {DOMAIN_LINE}
          </motion.p>
          <motion.div variants={item} className="mt-4 flex flex-wrap gap-1.5">
            {skills.map((tag) => (
              <span
                key={tag}
                className="border border-white/10 px-2.5 py-1 text-[11px] text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </motion.div>
          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            {profile.contact.map((contact) => {
              const label = contact.title || contact.link || '';
              if (!contact.link && !contact.title) {
                return null;
              }
              return contact.link ? (
                <a
                  key={label}
                  href={contact.link}
                  className="chip-frame inline-flex items-center gap-2 px-4 py-2.5 text-sm text-zinc-300"
                >
                  <FontAwesomeIcon icon={contact.icon} />
                  <span>{label.replace('https://github.com/', 'github/')}</span>
                </a>
              ) : (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 border border-white/15 px-4 py-2.5 text-sm text-zinc-300"
                >
                  <FontAwesomeIcon icon={contact.icon} />
                  {label}
                </span>
              );
            })}
          </motion.div>
        </motion.div>
        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="card-frame relative z-10 bg-ink-800/80 p-5"
        >
          <img
            src={assetSrc(profile.image)}
            alt={profile.name.title}
            width={176}
            height={176}
            className="mx-auto mb-5 block h-36 w-36 object-cover object-top ring-1 ring-white/10 md:h-44 md:w-44"
          />
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">Now</p>
          <p className="mt-2 text-lg font-semibold">
            <CompanyName title="로민" href={currentCompanyHref} />
            {' · 백엔드챕터'}
          </p>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-zinc-400">
            {NOW_FACTS.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </motion.aside>
      </div>
    </section>
  );
}

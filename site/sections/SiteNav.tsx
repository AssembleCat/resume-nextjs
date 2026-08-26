import { motion } from 'motion/react';

const LINKS = [
  { href: '#intro', label: '소개' },
  { href: '#experience', label: '경력' },
  { href: '#map', label: '맵' },
  { href: '#records', label: '기록' },
];

export function SiteNav() {
  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-30 border-b border-white/10 bg-black/70 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#intro" className="font-display text-sm tracking-tight">
          AssembleCat
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="mailto:groove.csy.1226@gmail.com"
          className="bg-ember-500 px-3 py-1.5 text-xs font-semibold text-black"
        >
          Contact
        </a>
      </div>
    </motion.header>
  );
}

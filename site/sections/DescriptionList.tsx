import { IRow } from '../../payload/types';
import { parseBracketTag } from '../lib/description';

export function DescriptionList({
  items,
  compact = false,
}: {
  items: IRow.Description[];
  compact?: boolean;
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <ul className={compact ? 'space-y-3' : 'space-y-4'}>
      {items.map((item) => {
        const { tag, body } = parseBracketTag(item.content);
        return (
          <li
            key={item.content}
            className={
              compact && tag
                ? 'grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-3'
                : undefined
            }
          >
            {tag ? (
              <p
                className={
                  compact
                    ? 'text-xs font-medium text-zinc-400'
                    : 'font-mono text-[11px] uppercase tracking-[0.16em] text-ember-400'
                }
              >
                {tag}
              </p>
            ) : null}
            <p
              className={`${compact ? 'break-keep text-[15px] leading-7' : 'text-sm leading-relaxed'} ${
                item.weight === 'MEDIUM' ? 'text-zinc-100' : 'text-zinc-300'
              } ${tag && !compact ? 'mt-1' : ''}`}
            >
              {item.href ? (
                <a href={item.href} className="underline decoration-white/20 underline-offset-4">
                  {body}
                </a>
              ) : (
                body
              )}
            </p>
          </li>
        );
      })}
    </ul>
  );
}

import { IRow } from '../../component/common/IRow';
import { parseBracketTag } from '../lib/description';

export function DescriptionList({ items }: { items: IRow.Description[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <ul className="space-y-4">
      {items.map((item) => {
        const { tag, body } = parseBracketTag(item.content);
        return (
          <li key={item.content}>
            {tag ? (
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ember-400">{tag}</p>
            ) : null}
            <p
              className={`text-sm leading-relaxed ${
                item.weight === 'MEDIUM' ? 'text-zinc-100' : 'text-zinc-300'
              } ${tag ? 'mt-1' : ''}`}
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

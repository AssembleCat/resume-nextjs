import { MouseEvent } from 'react';

export function CompanyName({
  title,
  href,
  className,
}: {
  title: string;
  href?: string;
  className?: string;
}) {
  if (!href) {
    return <span className={className}>{title}</span>;
  }

  const stopToggle = (event: MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={stopToggle}
      className={`underline-offset-4 transition hover:text-ember-400 hover:underline ${className ?? ''}`}
    >
      {title}
    </a>
  );
}

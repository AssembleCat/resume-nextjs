import { assetSrc } from '../lib/format';

export function CompanyLogo({
  logo,
  name,
  size = 'md',
}: {
  logo?: string | { src: string };
  name: string;
  size?: 'sm' | 'md';
}) {
  const src = assetSrc(logo);
  if (!src) {
    return null;
  }
  const box = size === 'sm' ? 'h-10 w-10 p-1' : 'h-14 w-14 p-1.5';
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center bg-white ${box}`}
    >
      <img src={src} alt={`${name} 로고`} className="h-full w-full object-contain" />
    </span>
  );
}

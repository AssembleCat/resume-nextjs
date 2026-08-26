export function assetSrc(value: unknown): string {
  if (typeof value === 'string') {
    return value;
  }
  if (value && typeof value === 'object' && 'src' in value) {
    return String((value as { src: string }).src);
  }
  return '';
}

export function isBlindQuery(value: string | string[] | undefined): boolean {
  const raw = Array.isArray(value) ? value[0] : value;
  return (raw ?? '').toString().toLowerCase() === 'true';
}

export function maskSchoolName(name: string): string {
  if (!name) {
    return name;
  }
  const keywords = ['대학교', '고등학교'];
  const found = keywords.find((keyword) => name.indexOf(keyword) !== -1);
  if (found) {
    const idx = name.indexOf(found);
    return `***${name.slice(idx)}`;
  }
  return '***';
}

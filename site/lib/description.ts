export function parseBracketTag(content: string): { tag?: string; body: string } {
  const match = content.match(/^\[([^\]]+)\]\s*(.*)$/);
  if (!match) {
    return { body: content };
  }
  return { tag: match[1], body: match[2] };
}

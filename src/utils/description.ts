export function getDescription(text: string): string {
  const pattern = /"text":"(.*?)"}/g;
  const matches = [...text.matchAll(pattern)];

  return matches.reduce(
    (description, match) => (description += match[1] + ' '),
    ''
  );
}

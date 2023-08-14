import { DESCRIPTION_MAX_LENGTH } from '@/utils/const';

export function getDescription(text: string): string {
  const pattern = /"text":"(.*?)"/g;
  const matches = [...text.matchAll(pattern)];

  let description = '';

  if (matches.length > 0) {
    for (let i = 0; i < matches.length; i++) {
      if (description.length > DESCRIPTION_MAX_LENGTH) {
        description = description.substring(0, DESCRIPTION_MAX_LENGTH);
        break;
      }
      if (!matches[i][1].includes('\\n')) description += matches[i][1] + ' ';
    }
  }

  return description;
}

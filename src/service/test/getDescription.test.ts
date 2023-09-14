import { getDescription } from '@/service/description';

describe('getDescription', () => {
  it("should combine each (text + ' ')", () => {
    const object = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: '안녕하세요',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'dongree입니다',
            },
          ],
        },
      ],
    };

    expect(getDescription(JSON.stringify(object))).toBe(
      '안녕하세요 dongree입니다 '
    );
  });
});

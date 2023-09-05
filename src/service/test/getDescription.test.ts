import { getDescription } from '@/service/description';
import { DESCRIPTION_MAX_LENGTH } from '@/utils/const';

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

  it("should ignore the content text when the content text contains '\\n'", () => {
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
          type: 'codeBlock',
          attrs: {
            language: null,
          },
          content: [
            {
              type: 'text',
              text: 'hello\nhello',
            },
          ],
        },
      ],
    };

    expect(getDescription(JSON.stringify(object))).toBe('안녕하세요 ');
  });

  it('descrption length should be less than DESCRIPTION_MAX_LENGTH + 1', () => {
    const object = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: '안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: '안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요',
            },
          ],
        },
      ],
    };

    expect(getDescription(JSON.stringify(object)).length).toBeLessThan(
      DESCRIPTION_MAX_LENGTH + 1
    );
  });
});

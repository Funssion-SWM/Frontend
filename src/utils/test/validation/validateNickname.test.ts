import { validateNickname } from '@/utils/validation';

describe('validateNickname', () => {
  it('invalid when nickname includes thigns exepct English, Korean, and number', () => {
    const nickname = 'dongree!';

    expect(validateNickname(nickname)).toBe(false);
  });

  it('invalid when nickname total weight is less than 4 (1)', () => {
    const nickname = 'abc'; // totalweight = 3;

    expect(validateNickname(nickname)).toBe(false);
  });

  it('invalid when nickname total weight is less than 4 (2)', () => {
    const nickname = '하e'; // totalweight = 3;

    expect(validateNickname(nickname)).toBe(false);
  });

  it('invalid when nickname total weight is more than 14 (1)', () => {
    const nickname = 'abcdefghi123456'; // totalweight = 15;

    expect(validateNickname(nickname)).toBe(false);
  });

  it('invalid when nickname total weight is more than 14 (2)', () => {
    const nickname = '가나다라마바사아'; // totalweight = 16;

    expect(validateNickname(nickname)).toBe(false);
  });

  it('valid when nickname requirements are met', () => {
    const nickname = 'dongree'; // totalweight = 7

    expect(validateNickname(nickname)).toBe(true);
  });
});

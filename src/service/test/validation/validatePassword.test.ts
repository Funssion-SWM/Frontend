import { validatePassword } from '@/service/validation';

describe('validatePassword', () => {
  it('invalid when password length is less than 8', () => {
    const pw = 'abc123!';

    expect(validatePassword(pw)).toBe(false);
  });

  it('invalid when password length is more than 15', () => {
    const pw = 'abcdefghi12345!!';

    expect(validatePassword(pw)).toBe(false);
  });

  it("invalid when password doesn't include alphabet", () => {
    const pw = '111111!!';

    expect(validatePassword(pw)).toBe(false);
  });

  it("invalid when password doesn't include number", () => {
    const pw = 'abcdefg!';

    expect(validatePassword(pw)).toBe(false);
  });

  it("invalid when password doesn't include (@$!%*#?&)", () => {
    const pw = 'abcdefg123';

    expect(validatePassword(pw)).toBe(false);
  });

  it('invalid when password includes special characters except (@$!%*#?&)', () => {
    const pw = 'abcdefg123^';

    expect(validatePassword(pw)).toBe(false);
  });

  it('valid when password requirements are met', () => {
    const pw = 'abcd1234?';

    expect(validatePassword(pw)).toBe(true);
  });
});

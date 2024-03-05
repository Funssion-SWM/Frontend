import { validateEmail } from '@/utils/validation';

describe('validateEmail', () => {
  // email : local-part | @ | domain
  it("invalid when email doesn't include @", () => {
    const email = 'abc123&nave.com';

    expect(validateEmail(email)).toBe(false);
  });

  it("invalid when email doesn't include local-part", () => {
    const email = '@naver.com';

    expect(validateEmail(email)).toBe(false);
  });

  it("invalid when email doesn't include domain", () => {
    const email = 'abc123';

    expect(validateEmail(email)).toBe(false);
  });

  it("invalid when there is no part like '.com' in domain", () => {
    const email = 'abc123@naver';

    expect(validateEmail(email)).toBe(false);
  });

  it('valid when email requirements are met', () => {
    const email = 'abc123@naver.com';

    expect(validateEmail(email)).toBe(true);
  });
  it('valid when email requirements are met', () => {
    const email = 'abc123@hanyang.ac.kr';

    expect(validateEmail(email)).toBe(true);
  });
});

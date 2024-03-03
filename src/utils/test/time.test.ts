import { extractYMDHM, formatDate } from '@/utils//time';

describe('time', () => {
  it('check extractYMDHM length', () => {
    const date = '2023-09-30T18:11:29.497277';

    expect(extractYMDHM(date)).toHaveLength(16);
    expect(extractYMDHM(date)[10]).toBe(' ');
  });

  it('check formatDate wben type is YMD', () => {
    const date = '2023-09-20T18:11:29.497277';

    expect(formatDate(date, 'YMD')).toHaveLength(10);
  });

  it('check formatDate wben type is YMDHM', () => {
    const date = '2023-09-20T18:11:29.497277';

    expect(formatDate(date, 'YMD')).toHaveLength(16);
    expect(extractYMDHM(date)[10]).toBe(' ');
  });
});

import { toFixed } from '../src/common';

test('8440.55 被toFixed 格式化为 8440.6.', () => {
  expect(toFixed(8440.55, 1)).toBe('8440.6');
});

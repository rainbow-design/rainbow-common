import { checkType } from '../src';

test('"13312345678" is phone type.', () => {
  expect(checkType('13312345678', 'phone')).toBe(true);
});
